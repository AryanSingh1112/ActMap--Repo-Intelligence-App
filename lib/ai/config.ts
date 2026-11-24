/**
 * Everything about which model runs, in one place.
 *
 * The primary model is pinned to an exact name.
 * If the primary provider is temporarily unavailable, the AI client can
 * fall back to another exact model.
 */

export const DEFAULT_MODEL = "gemini-3.1-flash-lite";

export const FALLBACK_MODELS = [
  "gemini-3.5-flash-lite",
] as const;

export const DEFAULT_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/openai/";

const MOVING = /(^|[-_:/])(latest|auto|default)$/i;

export function assertPinned(model: string, source: string): string {
  if (!model.trim() || MOVING.test(model.trim())) {
    throw new Error(
      `${source} is "${model}", which is a moving alias. Set an exact model name, such as ${DEFAULT_MODEL}.`,
    );
  }

  return model.trim();
}

/**
 * The primary model used for explanations and labels.
 */
export function pinnedModel(): string {
  const configured = process.env.ACTMAP_AI_MODEL?.trim();

  return assertPinned(
    configured || DEFAULT_MODEL,
    configured ? "ACTMAP_AI_MODEL" : "DEFAULT_MODEL",
  );
}

/**
 * Models that can be tried if the primary model is temporarily unavailable.
 *
 * ACTMAP_AI_FALLBACK_MODEL can override the built-in fallback.
 */
export function fallbackModels(): string[] {
  const configured = process.env.ACTMAP_AI_FALLBACK_MODEL?.trim();

  const models = configured
    ? [configured]
    : [...FALLBACK_MODELS];

  return models
    .map((model) => model.trim())
    .filter(Boolean)
    .map((model) => assertPinned(model, "ACTMAP_AI_FALLBACK_MODEL"));
}

export function aiBaseUrl(): string {
  return (
    process.env.AI_BASE_URL?.trim() ||
    DEFAULT_BASE_URL
  );
}

/**
 * The key for whichever provider is configured.
 * Gemini first, while keeping compatibility with OpenAI.
 */
export function aiApiKey(): string | undefined {
  return (
    process.env.AI_API_KEY?.trim() ||
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.OPENAI_API_KEY?.trim() ||
    undefined
  );
}

export const MAX_OUTPUT_TOKENS = 3000;

export const LIMITS = {
  sourceChars: 40_000,
  neighbours: 60,
  folderFiles: 80,
  folderNeighbours: 40,
  classifyBatch: 25,
  classifyMaxFiles: 200,
  classifyNeighbours: 8,
} as const;