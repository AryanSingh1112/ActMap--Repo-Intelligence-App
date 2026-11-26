import { ChatGoogle } from "@langchain/google/node";
import { createDeepAgent } from "deepagents";
import { modelFallbackMiddleware } from "langchain";

import { SYSTEM_PROMPT } from "./prompt";
import { createTools, type Lookup } from "./tools";

import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

/**
 * The one definition of the ActMap agent. It has no side effects at import, so
 * both hosts can use it:
 *  - agent/src/agent.ts   -> `langgraphjs dev` (local development, LangSmith Studio)
 *  - lib/agent/runtime.ts -> the Next.js server (Vercel), in-process
 * The host supplies how lookups reach the repository; everything else is shared.
 */
const MOVING = /(^|[-_:/])(latest|auto|default)$/i;

function pinned(model: string | undefined, name: string): string {
  const value = model?.trim();

  if (!value) {
    throw new Error(`${name} is not set.`);
  }

  if (MOVING.test(value)) {
    throw new Error(
      `${name} is "${value}", a moving alias. Use an exact model name.`,
    );
  }

  return value;
}

export type AgentOptions = {
  lookup: Lookup;
  /** Tests inject a fake model; production builds the Gemini models from the environment. */
  model?: BaseChatModel;
};

export function createActmapAgent({ lookup, model }: AgentOptions) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  const chat = (name: string) =>
    new ChatGoogle({ model: name, apiKey, maxRetries: 0 });

  let primary: BaseChatModel;
  let fallback: string | undefined;

  if (model) {
    primary = model;
  } else {
    if (!apiKey) {
      throw new Error("Set GEMINI_API_KEY.");
    }

    primary = chat(pinned(process.env.ACTMAP_AI_MODEL, "ACTMAP_AI_MODEL"));
    fallback = process.env.ACTMAP_AI_FALLBACK_MODEL?.trim() || undefined;
  }

  return createDeepAgent({
    name: "actmap-agent",
    model: primary,
    tools: createTools(lookup),
    systemPrompt: SYSTEM_PROMPT,
    middleware: fallback
      ? [
          modelFallbackMiddleware(
            chat(pinned(fallback, "ACTMAP_AI_FALLBACK_MODEL")),
          ),
        ]
      : [],
  });
}
