import "server-only";

import OpenAI from "openai";
import { Client } from "langsmith";
import { traceable } from "langsmith/traceable";
import { wrapOpenAI } from "langsmith/wrappers";

import {
  MAX_OUTPUT_TOKENS,
  aiApiKey,
  aiBaseUrl,
  fallbackModels,
} from "./config";

/**
 * The one place in the codebase that builds the AI client.
 *
 * Everything that talks to a model goes through getAiClient(), and the client
 * it hands back is wrapped so every call is traced.
 */

export type TracingStatus = {
  enabled: boolean;
  project: string;
  reason: string | null;
};

export function tracingStatus(): TracingStatus {
  const project =
    process.env.LANGSMITH_PROJECT?.trim() || "actmap";

  if (!process.env.LANGSMITH_API_KEY?.trim()) {
    return {
      enabled: false,
      project,
      reason:
        "Tracing is off: LANGSMITH_API_KEY is not set. Calls still work, but nothing is recorded.",
    };
  }

  if (
    process.env.LANGSMITH_TRACING?.trim().toLowerCase() ===
    "false"
  ) {
    return {
      enabled: false,
      project,
      reason:
        "Tracing is off: LANGSMITH_TRACING is set to false. Calls still work, but nothing is recorded.",
    };
  }

  return {
    enabled: true,
    project,
    reason: null,
  };
}

export function aiConfigured(): boolean {
  return Boolean(aiApiKey());
}

let langsmith: Client | null | undefined;

function getLangSmith(): Client | null {
  if (langsmith !== undefined) {
    return langsmith;
  }

  langsmith = tracingStatus().enabled
    ? new Client({
        apiKey: process.env.LANGSMITH_API_KEY,
      })
    : null;

  return langsmith;
}

let warned = false;

function warnIfUntraced() {
  if (warned) {
    return;
  }

  warned = true;

  const status = tracingStatus();

  if (!status.enabled) {
    console.warn(`[ai] ${status.reason}`);
  }
}

let client: OpenAI | undefined;

export function getAiClient(): OpenAI {
  if (client) {
    return client;
  }

  const apiKey = aiApiKey();

  if (!apiKey) {
    throw new Error(
      "AI_API_KEY is not set. Add your Gemini key to .env.local to use explanations.",
    );
  }

  warnIfUntraced();

  const status = tracingStatus();

  client = wrapOpenAI(
    new OpenAI({
      apiKey,
      baseURL: aiBaseUrl(),

      /*
       * We handle fallback models ourselves.
       *
       * Keeping this at 0 prevents OpenAI's internal retry mechanism from
       * wasting several attempts against an overloaded Gemini model before
       * Actmap gets a chance to use the fallback.
       */
      maxRetries: 0,

      timeout: 30_000,
    }),
    {
      client: getLangSmith() ?? undefined,
      tracingEnabled: status.enabled,
      project_name: status.project,
    },
  ) as unknown as OpenAI;

  return client;
}

export type Usage = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export const NO_USAGE: Usage = {
  promptTokens: 0,
  completionTokens: 0,
  totalTokens: 0,
};

type ProviderError = {
  status?: number;
  message?: string;
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
};

function getErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== "object") {
    return undefined;
  }

  const candidate = error as ProviderError;

  if (typeof candidate.status === "number") {
    return candidate.status;
  }

  if (
    candidate.error &&
    typeof candidate.error.code === "number"
  ) {
    return candidate.error.code;
  }

  return undefined;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown AI provider error.";
  }
}

function isTemporaryProviderError(error: unknown): boolean {
  const status = getErrorStatus(error);

  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function isAuthenticationError(error: unknown): boolean {
  const status = getErrorStatus(error);

  return status === 401 || status === 403;
}

function isBadRequestError(error: unknown): boolean {
  const status = getErrorStatus(error);

  return status === 400;
}

function formatProviderError(
  error: unknown,
  model: string,
): Error {
  const status = getErrorStatus(error);
  const message = getErrorMessage(error);

  if (status === 429) {
    return new Error(
      `The AI provider rate limit was reached for ${model}. Please try again in a moment.`,
    );
  }

  if (status === 503 || status === 502 || status === 504) {
    return new Error(
      `The AI provider is temporarily unavailable for ${model}. Please try again in a moment.`,
    );
  }

  if (status === 500) {
    return new Error(
      `The AI provider returned a temporary server error for ${model}. Please try again.`,
    );
  }

  if (isAuthenticationError(error)) {
    return new Error(
      "The AI provider rejected the API key. Check GEMINI_API_KEY in .env.local.",
    );
  }

  if (isBadRequestError(error)) {
    return new Error(
      `The AI provider rejected the request for ${model}: ${message}`,
    );
  }

  return new Error(
    `AI request failed for ${model}: ${message}`,
  );
}

/**
 * One model call, through the traced client.
 *
 * If the selected model is temporarily unavailable, Actmap tries the
 * configured fallback model(s).
 */
export async function complete(options: {
  model: string;
  system: string;
  user: string;
  schema?: {
    name: string;
    strict: boolean;
    schema: Record<string, unknown>;
  };
}): Promise<{
  text: string;
  usage: Usage;
}> {
  const primaryModel = options.model.trim();

  const models = [
    primaryModel,
    ...fallbackModels().filter(
      (model) => model !== primaryModel,
    ),
  ];

  let lastError: unknown = null;

  for (let index = 0; index < models.length; index += 1) {
    const model = models[index];

    try {
      console.info(
        `[ai] explanation request using ${model}`,
      );

      const response =
        await getAiClient().chat.completions.create({
          model,
          max_completion_tokens: MAX_OUTPUT_TOKENS,
          messages: [
            {
              role: "system",
              content: options.system,
            },
            {
              role: "user",
              content: options.user,
            },
          ],
          ...(options.schema
            ? {
                response_format: {
                  type: "json_schema" as const,
                  json_schema: options.schema,
                },
              }
            : {}),
        });

      const text =
        response.choices[0]?.message?.content?.trim() ?? "";

      if (!text) {
        throw new Error(
          `The model ${model} returned an empty answer.`,
        );
      }

      if (index > 0) {
        console.warn(
          `[ai] primary model ${primaryModel} was unavailable; fallback ${model} succeeded.`,
        );
      }

      return {
        text,
        usage: {
          promptTokens:
            response.usage?.prompt_tokens ?? 0,
          completionTokens:
            response.usage?.completion_tokens ?? 0,
          totalTokens:
            response.usage?.total_tokens ?? 0,
        },
      };
    } catch (error) {
      lastError = error;

      const temporary =
        isTemporaryProviderError(error);

      const hasFallback =
        index < models.length - 1;

      if (temporary && hasFallback) {
        console.warn(
          `[ai] ${model} unavailable (${getErrorStatus(error)}). Trying fallback ${models[index + 1]}.`,
        );

        continue;
      }

      throw formatProviderError(error, model);
    }
  }

  throw formatProviderError(
    lastError,
    primaryModel,
  );
}

/**
 * Wraps a function in a traced run.
 */
export function traced<
  Args extends unknown[],
  Result,
>(
  name: string,
  fn: (...args: Args) => Promise<Result>,
  options: {
    metadata?: Record<string, unknown>;
    tags?: string[];
    processInputs?: (
      inputs: never,
    ) => Record<string, unknown>;
  } = {},
) {
  const status = tracingStatus();

  return traceable(fn, {
    name,
    run_type: "chain",
    client: getLangSmith() ?? undefined,
    tracingEnabled: status.enabled,
    project_name: status.project,
    metadata: options.metadata,
    tags: ["actmap", ...(options.tags ?? [])],
    ...(options.processInputs
      ? {
          processInputs:
            options.processInputs as never,
        }
      : {}),
  });
}

/**
 * Sends traces still queued before serverless execution ends.
 */
export async function flushTraces(): Promise<void> {
  await getLangSmith()?.awaitPendingTraceBatches();
}

/**
 * Attaches a score to a LangSmith run.
 */
export async function scoreRun(
  runId: string,
  key: string,
  score: number,
  comment?: string,
) {
  const ls = getLangSmith();

  if (!ls) {
    return;
  }

  try {
    await ls.awaitPendingTraceBatches();

    await ls.createFeedback(runId, key, {
      score,
      comment,
    });
  } catch (error) {
    console.warn(
      `[ai] could not record ${key} for run ${runId}:`,
      error instanceof Error
        ? error.message
        : error,
    );
  }
}