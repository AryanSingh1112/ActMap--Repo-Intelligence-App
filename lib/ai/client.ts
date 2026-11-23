import "server-only";

import OpenAI from "openai";
import { Client } from "langsmith";
import { traceable } from "langsmith/traceable";
import { wrapOpenAI } from "langsmith/wrappers";

import { MAX_OUTPUT_TOKENS, aiApiKey, aiBaseUrl } from "./config";

/**
 * The one place in the codebase that builds the AI client.
 *
 * Everything that talks to a model goes through getAiClient(), and the client
 * it hands back is wrapped so every call is traced. Evals import this too, so
 * a number measured there is a number about the same client the app uses.
 */

export type TracingStatus = {
  enabled: boolean;
  project: string;
  /** Why tracing is off, in words fit for the screen. Null when it is on. */
  reason: string | null;
};

export function tracingStatus(): TracingStatus {
  const project = process.env.LANGSMITH_PROJECT?.trim() || "actmap";

  if (!process.env.LANGSMITH_API_KEY?.trim()) {
    return {
      enabled: false,
      project,
      reason: "Tracing is off: LANGSMITH_API_KEY is not set. Calls still work, but nothing is recorded.",
    };
  }

  if (process.env.LANGSMITH_TRACING?.trim().toLowerCase() === "false") {
    return {
      enabled: false,
      project,
      reason: "Tracing is off: LANGSMITH_TRACING is set to false. Calls still work, but nothing is recorded.",
    };
  }

  return { enabled: true, project, reason: null };
}

export function aiConfigured(): boolean {
  return Boolean(aiApiKey());
}

let langsmith: Client | null | undefined;

function getLangSmith(): Client | null {
  if (langsmith !== undefined) return langsmith;

  langsmith = tracingStatus().enabled
    ? new Client({ apiKey: process.env.LANGSMITH_API_KEY })
    : null;

  return langsmith;
}

let warned = false;

function warnIfUntraced() {
  if (warned) return;
  warned = true;

  const status = tracingStatus();
  if (!status.enabled) console.warn(`[ai] ${status.reason}`);
}

let client: OpenAI | undefined;

export function getAiClient(): OpenAI {
  if (client) return client;

  const apiKey = aiApiKey();
  if (!apiKey) {
    throw new Error("AI_API_KEY is not set. Add your Gemini key to .env.local to use explanations.");
  }

  warnIfUntraced();

  const status = tracingStatus();

  // maxRetries backs off and retries on rate limits, which free tiers hit.
  client = wrapOpenAI(new OpenAI({ apiKey, baseURL: aiBaseUrl(), maxRetries: 6 }), {
    client: getLangSmith() ?? undefined,
    tracingEnabled: status.enabled,
    project_name: status.project,
  }) as unknown as OpenAI;

  return client;
}

export type Usage = { promptTokens: number; completionTokens: number; totalTokens: number };

export const NO_USAGE: Usage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };

/** One model call, through the traced client. */
export async function complete(options: {
  model: string;
  system: string;
  user: string;
  schema?: { name: string; strict: boolean; schema: Record<string, unknown> };
}): Promise<{ text: string; usage: Usage }> {
  const response = await getAiClient().chat.completions.create({
    model: options.model,
    max_completion_tokens: MAX_OUTPUT_TOKENS,
    messages: [
      { role: "system", content: options.system },
      { role: "user", content: options.user },
    ],
    ...(options.schema
      ? { response_format: { type: "json_schema" as const, json_schema: options.schema } }
      : {}),
  });

  const text = response.choices[0]?.message?.content?.trim() ?? "";
  if (!text) throw new Error("The model returned an empty answer.");

  return {
    text,
    usage: {
      promptTokens: response.usage?.prompt_tokens ?? 0,
      completionTokens: response.usage?.completion_tokens ?? 0,
      totalTokens: response.usage?.total_tokens ?? 0,
    },
  };
}

/** Wraps a function in a traced run. With tracing unconfigured it just runs. */
export function traced<Args extends unknown[], Result>(
  name: string,
  fn: (...args: Args) => Promise<Result>,
  options: { metadata?: Record<string, unknown>; tags?: string[]; processInputs?: (inputs: never) => Record<string, unknown> } = {},
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
    ...(options.processInputs ? { processInputs: options.processInputs as never } : {}),
  });
}

/** Sends any traces still queued. Serverless work can end before the batch goes out. */
export async function flushTraces(): Promise<void> {
  await getLangSmith()?.awaitPendingTraceBatches();
}

/** Attaches a score to a run, so it shows up beside the trace in the dashboard. */
export async function scoreRun(runId: string, key: string, score: number, comment?: string) {
  const ls = getLangSmith();
  if (!ls) return;

  try {
    await ls.awaitPendingTraceBatches();
    await ls.createFeedback(runId, key, { score, comment });
  } catch (error) {
    console.warn(`[ai] could not record ${key} for run ${runId}:`, error instanceof Error ? error.message : error);
  }
}
