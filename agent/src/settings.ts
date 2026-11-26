/** Names of required model settings that are missing. Values are never returned. */
export function missingModelSettings(): string[] {
  const missing: string[] = [];

  if (!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)) {
    missing.push("GEMINI_API_KEY");
  }

  if (!process.env.ACTMAP_AI_MODEL?.trim()) {
    missing.push("ACTMAP_AI_MODEL");
  }

  return missing;
}
