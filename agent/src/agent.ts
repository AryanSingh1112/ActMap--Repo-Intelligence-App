
import { ChatGoogle } from "@langchain/google/node";
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
import { createDeepAgent } from "deepagents";
import { modelFallbackMiddleware } from "langchain";

import { SYSTEM_PROMPT } from "./prompt";
import { TOOLS } from "./tools";

const MOVING = /(^|[-_:/])(latest|auto|default)$/i;

function required(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Set ${name}.`);
  }

  return value;
}

function pinned(model: string, name: string): string {
  if (MOVING.test(model)) {
    throw new Error(`${name} must use a pinned model name.`);
  }

  return model;
}

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Set GEMINI_API_KEY or GOOGLE_API_KEY.");
}

function chat(model: string) {
  return new ChatGoogle({ model, apiKey, maxRetries: 0 });
}

const primary = pinned(required("ACTMAP_AI_MODEL"), "ACTMAP_AI_MODEL");
const fallback = process.env.ACTMAP_AI_FALLBACK_MODEL?.trim();

const checkpointer = PostgresSaver.fromConnString(
  required("SUPABASE_DB_URL"),
);

export const agent = createDeepAgent({
  name: "actmap-agent",
  model: chat(primary),
  tools: TOOLS,
  systemPrompt: SYSTEM_PROMPT,
  checkpointer,
  middleware: fallback
    ? [modelFallbackMiddleware(
        chat(pinned(fallback, "ACTMAP_AI_FALLBACK_MODEL")),
      )]
    : [],
});

let setupPromise: Promise<void> | undefined;

export async function getAgent() {
  if (!setupPromise) {
    setupPromise = checkpointer.setup();
  }

  await setupPromise;
  return agent;
}
