import { createHash } from "node:crypto";

/**
 * The cache key is a hash of everything the answer depends on: the content of
 * the thing being explained (and of the neighbours it was written from), the
 * prompt version, and the model. Change any one and it is a different key; the
 * old row stays, belonging to the old model and the old prompt.
 */
export function cacheKey(parts: Record<string, unknown>): string {
  return createHash("sha256").update(stable(parts)).digest("hex");
}

function stable(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stable).join(",")}]`;

  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([key, inner]) => `${JSON.stringify(key)}:${stable(inner)}`)
      .join(",")}}`;
  }

  return JSON.stringify(value) ?? "null";
}
