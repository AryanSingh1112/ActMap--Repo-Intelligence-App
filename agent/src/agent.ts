
import { ChatGoogle } from "@langchain/google/node";
import { createDeepAgent } from "deepagents";
import { modelFallbackMiddleware } from "langchain";

import { SYSTEM_PROMPT } from "./prompt";
import { TOOLS } from "./tools";

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

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Set GEMINI_API_KEY in agent/.env.");
}

function chat(model: string) {
  return new ChatGoogle({
    model,
    apiKey,
    maxRetries: 0,
  });
}

const primary = pinned(
  process.env.ACTMAP_AI_MODEL,
  "ACTMAP_AI_MODEL",
);

const fallback = process.env.ACTMAP_AI_FALLBACK_MODEL?.trim();

export const agent = createDeepAgent({
  name: "actmap-agent",
  model: chat(primary),
  tools: TOOLS,
  systemPrompt: SYSTEM_PROMPT,
  middleware: fallback
    ? [
        modelFallbackMiddleware(
          chat(pinned(fallback, "ACTMAP_AI_FALLBACK_MODEL")),
        ),
      ]
    : [],
});
