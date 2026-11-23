/**
 * Everything about which model runs, in one place.
 *
 * The model is pinned to a dated snapshot, never to an alias that moves under
 * you. The name is part of every cache key, so re-pinning it starts a fresh
 * cache for the new model and leaves the old model's answers alone.
 */
export const DEFAULT_MODEL = "gemini-3.8-flash";

/** Where the OpenAI-compatible API lives. Gemini by default; any compatible provider works. */
export const DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/";

// Aliases move under you. An exact model name does not.
const MOVING = /(^|[-_:/])(latest|auto|default)$/i;

export function assertPinned(model: string, source: string): string {
  if (!model.trim() || MOVING.test(model.trim())) {
    throw new Error(
      `${source} is "${model}", which is a moving alias. Set an exact model name, such as ${DEFAULT_MODEL}.`,
    );
  }

  return model.trim();
}

/** The model that explains and labels. Set ACTMAP_AI_MODEL to an exact name. */
export function pinnedModel(): string {
  const configured = process.env.ACTMAP_AI_MODEL?.trim();
  return assertPinned(configured || DEFAULT_MODEL, configured ? "ACTMAP_AI_MODEL" : "DEFAULT_MODEL");
}

export function aiBaseUrl(): string {
  return process.env.AI_BASE_URL?.trim() || DEFAULT_BASE_URL;
}

/** The key for whichever provider is configured. OPENAI_API_KEY still works. */
export function aiApiKey(): string | undefined {
  return process.env.AI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim() || undefined;
}

/** Output budget. Reasoning models spend part of it thinking, so it is generous. */
export const MAX_OUTPUT_TOKENS = 3000;

/** Limits on what is handed to the model, so a huge file or folder stays affordable. */
export const LIMITS = {
  sourceChars: 40_000,
  neighbours: 60,
  folderFiles: 80,
  folderNeighbours: 40,
  classifyBatch: 25,
  classifyMaxFiles: 200,
  classifyNeighbours: 8,
} as const;
