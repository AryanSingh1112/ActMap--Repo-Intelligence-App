import { verifyCredential, type Credential } from "./credential";
import { TOOL_NAMES, runTool, type ToolName } from "./tools";

import type { RepositoryData } from "../../types/actmap";
import type { FileContentResult } from "../../parser/src/types/file-content";

/**
 * The single implementation of an agent lookup, shared by the HTTP tool API
 * (used by `npm run agent:dev`) and by the in-process agent (production).
 * Every call verifies the signed credential first, so a lookup can only ever
 * read the one analysis and organization the credential names.
 *
 * Data access is injected so this file stays pure and testable.
 */
export type LookupDeps = {
  load: (credential: Credential) => Promise<RepositoryData | null>;
  source: (credential: Credential, paths: string[]) => Promise<FileContentResult[]>;
};

export type LookupOutcome =
  | { ok: true; body: unknown }
  | { ok: false; status: number; message: string };

const fail = (status: number, message: string): LookupOutcome => ({ ok: false, status, message });

export const LOOKUP_NAMES = [...TOOL_NAMES, "source"] as const;

export async function executeLookup(
  tool: string,
  rawInput: unknown,
  token: string | null | undefined,
  deps: LookupDeps,
): Promise<LookupOutcome> {
  if (!(LOOKUP_NAMES as readonly string[]).includes(tool)) {
    return fail(404, "Unknown lookup.");
  }

  let credential: Credential | null;

  try {
    credential = verifyCredential(token);
  } catch (error) {
    console.error("[agent lookup]", error instanceof Error ? error.message : error);
    return fail(503, "Lookups are not configured.");
  }

  if (!credential) {
    return fail(401, "This credential is invalid or has expired.");
  }

  if (!rawInput || typeof rawInput !== "object" || Array.isArray(rawInput)) {
    return fail(400, "Invalid request body.");
  }

  const input = rawInput as Record<string, unknown>;

  let sourcePaths: string[] | null = null;

  if (tool === "source") {
    const paths = input.paths;

    if (
      !Array.isArray(paths) ||
      paths.length === 0 ||
      paths.length > 8 ||
      !paths.every((p): p is string => typeof p === "string" && p.trim().length > 0)
    ) {
      return fail(400, "paths must contain between 1 and 8 valid file paths.");
    }

    sourcePaths = paths;
  }

  try {
    const data = await deps.load(credential);

    if (!data) {
      return fail(404, "That analysis is not available.");
    }

    if (sourcePaths) {
      const files = await deps.source(credential, sourcePaths);
      return { ok: true, body: { total: files.length, files } };
    }

    const result = runTool(tool as ToolName, input, data);

    return result.ok === true
      ? { ok: true, body: result.body }
      : fail(result.status, result.message);
  } catch (error) {
    console.error("[agent lookup]", error);
    return fail(500, "The lookup failed.");
  }
}
