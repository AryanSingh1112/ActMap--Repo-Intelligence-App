import "server-only";

import { getCurrentRunTree } from "langsmith/traceable";

import { readCache, writeCache, type CacheKind } from "./cache";
import { NO_USAGE, scoreRun, traced, type Usage } from "./client";
import { cacheKey } from "./key";
import { checkPaths } from "./paths";

import type { SupabaseClient } from "@supabase/supabase-js";

export type RunResult = {
  text: string;
  cached: boolean;
  model: string;
  promptVersion: string;
  createdAt: string;
  allowedPaths: string[];
  /** Tokens this call spent. A cache hit spends none. */
  usage: Usage;
  /** Path-shaped tokens in the text that were never shown to the model. */
  invented: string[];
  runId: string | null;
};

export type RunRequest = {
  name: "explain-file" | "explain-folder" | "classify-roles";
  kind: CacheKind;
  subject: string;
  /** What the answer depends on, apart from the model and the prompt. */
  keyParts: Record<string, unknown>;
  model: string;
  promptVersion: string;
  /** Exactly the paths the model will be shown. */
  allowedPaths: string[];
  supabase: SupabaseClient;
  organizationId: string;
  /** Makes a new answer. Only ever called on a cache miss. */
  produce: () => Promise<{ text: string; usage: Usage }>;
};

/**
 * Reads the cache, and on a miss asks the model, all inside ONE traced run.
 *
 * The cache read sits inside the traced call on purpose. A hit then appears in
 * the traces as a recorded run with no model call under it and zero tokens;
 * a cache that runs before the trace leaves nothing to tell it from a cache
 * that never worked.
 */
export async function runCached(request: RunRequest): Promise<RunResult> {
  const key = cacheKey({ ...request.keyParts, model: request.model, prompt: request.promptVersion });

  const meta = {
    kind: request.kind,
    subject: request.subject,
    cacheKey: key,
    model: request.model,
    promptVersion: request.promptVersion,
    pathsShown: request.allowedPaths.length,
  };

  const run = traced(
    request.name,
    async (_inputs: typeof meta): Promise<RunResult> => {
      const tree = getCurrentRunTree(false);
      const runId = tree?.id ?? null;

      const hit = await readCache(request.supabase, request.organizationId, key);

      if (hit) {
        tree?.tags?.push("cache:hit");

        return {
          text: hit.content,
          cached: true,
          model: hit.model,
          promptVersion: hit.prompt_version,
          createdAt: hit.created_at,
          allowedPaths: hit.allowed_paths,
          usage: NO_USAGE,
          invented: request.kind === "role" ? [] : checkPaths(hit.content, hit.allowed_paths).invented,
          runId,
        };
      }

      tree?.tags?.push("cache:miss");

      const made = await request.produce();
      const createdAt = new Date().toISOString();

      await writeCache(request.supabase, request.organizationId, {
        cache_key: key,
        kind: request.kind,
        subject: request.subject,
        model: request.model,
        prompt_version: request.promptVersion,
        content: made.text,
        allowed_paths: request.allowedPaths,
        usage: made.usage,
      });

      return {
        text: made.text,
        cached: false,
        model: request.model,
        promptVersion: request.promptVersion,
        createdAt,
        allowedPaths: request.allowedPaths,
        usage: made.usage,
        invented: request.kind === "role" ? [] : checkPaths(made.text, request.allowedPaths).invented,
        runId,
      };
    },
    { metadata: { kind: request.kind, model: request.model, promptVersion: request.promptVersion } },
  );

  const result = await run(meta);

  // The live evaluator: the same deterministic check the evals use, run on real
  // traffic and recorded against the run it judged.
  if (request.kind !== "role" && result.runId) {
    await scoreRun(
      result.runId,
      "invented_paths",
      result.invented.length === 0 ? 1 : 0,
      result.invented.length ? `Not shown to the model: ${result.invented.join(", ")}` : undefined,
    );
  }

  return result;
}
