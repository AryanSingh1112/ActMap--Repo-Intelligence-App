import "server-only";

import { aiConfigured, tracingStatus } from "./client";
import { DEFAULT_MODEL } from "./config";

import type { AiStatus } from "../../types/actmap";

/** What the screen needs to know about the AI setup. Never includes a key. */
export function aiStatus(): AiStatus {
  return {
    configured: aiConfigured(),
    model: process.env.ACTMAP_AI_MODEL?.trim() || DEFAULT_MODEL,
    tracing: tracingStatus(),
  };
}
