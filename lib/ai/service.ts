import "server-only";

import { parseGitHubUrl } from "../pipeline/github";

import { aiConfigured, complete } from "./client";
import { LIMITS, pinnedModel } from "./config";
import {
  buildClassifyInput,
  buildFileInput,
  buildFolderInput,
  classifyBatchKey,
  unclassifiedFiles,
  type Graph,
} from "./context";
import { loadGraph } from "./graph";
import { CLASSIFY_SCHEMA, classifyRolePrompt } from "./prompts/classify-role";
import { explainFilePrompt } from "./prompts/explain-file";
import { explainFolderPrompt } from "./prompts/explain-folder";
import { NO_ROLE, isClassifierRole, type ClassifierRole } from "./roles";
import { runCached, type RunResult } from "./run";
import { changedBetween, fetchSource, hashAt, headCommit } from "./source";
import { shownPaths } from "./types";

import type { SupabaseClient } from "@supabase/supabase-js";

export class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export type Ctx = { supabase: SupabaseClient; organizationId: string; analysisId: string };

type AnalysisInfo = { commitSha: string | null; owner: string; repo: string; stats: Record<string, unknown> };

async function loadAnalysis(ctx: Ctx): Promise<AnalysisInfo> {
  const { data, error } = await ctx.supabase
    .from("analyses")
    .select("commit_sha, stats, project:projects ( repository_url )")
    .eq("id", ctx.analysisId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new HttpError(404, "Analysis not found.");

  const project = Array.isArray(data.project) ? data.project[0] : data.project;
  const reference = parseGitHubUrl(project?.repository_url ?? "");
  if (!reference) throw new HttpError(422, "This analysis has no GitHub repository to read from.");

  return {
    commitSha: data.commit_sha,
    owner: reference.owner,
    repo: reference.repo,
    stats: (data.stats as Record<string, unknown> | null) ?? {},
  };
}

function requireAi() {
  if (!aiConfigured()) throw new HttpError(503, "No AI key is set. Add AI_API_KEY to .env.local.");
}

export async function explainFile(ctx: Ctx, path: string): Promise<RunResult> {
  requireAi();

  const [analysis, graph] = await Promise.all([loadAnalysis(ctx), loadGraph(ctx.supabase, ctx.analysisId)]);
  const built = buildFileInput(graph, path);
  if (!built) throw new HttpError(404, `${path} is not in this analysis.`);

  const model = pinnedModel();

  return runCached({
    name: "explain-file",
    kind: "file",
    subject: path,
    keyParts: built.key,
    model,
    promptVersion: explainFilePrompt.version,
    allowedPaths: shownPaths(built.input),
    supabase: ctx.supabase,
    organizationId: ctx.organizationId,
    produce: async () => {
      // The source is fetched only on a miss, so a cache hit never touches GitHub.
      const source = await fetchSource({
        owner: analysis.owner,
        repo: analysis.repo,
        ref: analysis.commitSha ?? "HEAD",
        path,
      });

      const input = { ...built.input, source: source.text, truncated: source.truncated };
      return complete({ model, system: explainFilePrompt.system, user: explainFilePrompt.user(input) });
    },
  });
}

export async function explainFolder(ctx: Ctx, folder: string, paths: string[]): Promise<RunResult> {
  requireAi();

  const graph = await loadGraph(ctx.supabase, ctx.analysisId);
  const built = buildFolderInput(graph, folder, paths);
  if (!built) throw new HttpError(404, "None of those files are in this analysis.");

  const model = pinnedModel();

  return runCached({
    name: "explain-folder",
    kind: "folder",
    subject: folder,
    keyParts: built.key,
    model,
    promptVersion: explainFolderPrompt.version,
    allowedPaths: shownPaths(built.input),
    supabase: ctx.supabase,
    organizationId: ctx.organizationId,
    produce: () =>
      complete({ model, system: explainFolderPrompt.system, user: explainFolderPrompt.user(built.input) }),
  });
}

// ---- Roles -----------------------------------------------------------------

/** Reads the classifier's JSON, keeping only paths it was given and roles it may use. */
export function parseRoles(text: string, given: Set<string>): Map<string, ClassifierRole> {
  const roles = new Map<string, ClassifierRole>();

  try {
    const parsed = JSON.parse(text) as { roles?: { path?: unknown; role?: unknown }[] };

    for (const item of parsed.roles ?? []) {
      if (typeof item.path !== "string" || !given.has(item.path)) continue;
      if (item.role === NO_ROLE || !isClassifierRole(item.role)) continue;
      roles.set(item.path, item.role);
    }
  } catch {
    // An answer that is not valid JSON labels nothing.
  }

  return roles;
}

export async function classifyBatch(
  ctx: Pick<Ctx, "supabase" | "organizationId">,
  graph: Graph,
  paths: string[],
  model: string,
): Promise<{ roles: Map<string, ClassifierRole>; result: RunResult }> {
  const inputs = paths.map((path) => buildClassifyInput(graph, path)!).filter(Boolean);

  const result = await runCached({
    name: "classify-roles",
    kind: "role",
    subject: `${inputs.length} files`,
    keyParts: classifyBatchKey(graph, inputs),
    model,
    promptVersion: classifyRolePrompt.version,
    allowedPaths: inputs.map((input) => input.path),
    supabase: ctx.supabase,
    organizationId: ctx.organizationId,
    produce: () =>
      complete({
        model,
        system: classifyRolePrompt.system,
        user: classifyRolePrompt.user(inputs),
        schema: CLASSIFY_SCHEMA as never,
      }),
  });

  return { roles: parseRoles(result.text, new Set(paths)), result };
}

export async function labelUnclassified(
  ctx: Ctx,
  options: { force?: boolean } = {},
): Promise<{ considered: number; labelled: number; skipped: boolean }> {
  requireAi();

  const analysis = await loadAnalysis(ctx);
  if (analysis.stats.rolesLabelled && !options.force) return { considered: 0, labelled: 0, skipped: true };

  const graph = await loadGraph(ctx.supabase, ctx.analysisId);
  const targets = unclassifiedFiles(graph).slice(0, LIMITS.classifyMaxFiles);
  const model = pinnedModel();

  const batches: string[][] = [];
  for (let i = 0; i < targets.length; i += LIMITS.classifyBatch) {
    batches.push(targets.slice(i, i + LIMITS.classifyBatch).map((file) => file.path));
  }

  const rows: Record<string, unknown>[] = [];

  // Two at a time keeps a free tier's rate limit happy.
  for (let i = 0; i < batches.length; i += 2) {
    const done = await Promise.all(batches.slice(i, i + 2).map((paths) => classifyBatch(ctx, graph, paths, model)));

    for (const { roles } of done) {
      for (const [path, role] of roles) {
        rows.push({
          organization_id: ctx.organizationId,
          analysis_id: ctx.analysisId,
          file_id: graph.byPath.get(path)!.id,
          role,
          confidence: null,
          evidence: { source: "model", model, promptVersion: classifyRolePrompt.version },
        });
      }
    }
  }

  const cleared = await ctx.supabase
    .from("file_roles")
    .delete()
    .eq("analysis_id", ctx.analysisId)
    .eq("evidence->>source", "model");
  if (cleared.error) throw new Error(cleared.error.message);

  if (rows.length) {
    const inserted = await ctx.supabase.from("file_roles").insert(rows);
    if (inserted.error) throw new Error(inserted.error.message);
  }

  const marked = await ctx.supabase
    .from("analyses")
    .update({
      stats: {
        ...analysis.stats,
        rolesLabelled: { at: new Date().toISOString(), model, considered: targets.length, labelled: rows.length },
      },
    })
    .eq("id", ctx.analysisId);
  if (marked.error) throw new Error(marked.error.message);

  return { considered: targets.length, labelled: rows.length, skipped: false };
}

// ---- Staleness -------------------------------------------------------------

export type Staleness = {
  /** stale: a file changed. moved: the repository has newer commits, the files are the same. */
  status: "fresh" | "moved" | "stale" | "unknown";
  analysedSha: string | null;
  headSha: string | null;
  changed: string[];
  deleted: string[];
  partial: boolean;
  reason?: string;
};

const HASH_CHECK_LIMIT = 5;

export async function checkStaleness(ctx: Ctx, paths: string[]): Promise<Staleness> {
  const analysis = await loadAnalysis(ctx);
  const base: Staleness = {
    status: "unknown",
    analysedSha: analysis.commitSha,
    headSha: null,
    changed: [],
    deleted: [],
    partial: false,
  };

  if (!analysis.commitSha) return { ...base, reason: "This analysis did not record its commit." };

  try {
    const head = await headCommit(analysis.owner, analysis.repo);
    if (head === analysis.commitSha) return { ...base, status: "fresh", headSha: head };

    const graph = await loadGraph(ctx.supabase, ctx.analysisId);
    const known = paths.filter((path) => graph.byPath.has(path));
    const changed: string[] = [];
    const deleted: string[] = [];
    let partial = false;

    if (known.length <= HASH_CHECK_LIMIT) {
      // A file's stored content hash is compared with the file as it is now.
      for (const path of known) {
        const now = await hashAt({ owner: analysis.owner, repo: analysis.repo, ref: head, path });
        if (now === null) deleted.push(path);
        else if (now !== graph.byPath.get(path)!.hash) changed.push(path);
      }
    } else {
      const diff = await changedBetween(analysis.owner, analysis.repo, analysis.commitSha, head);
      partial = diff.partial;
      const inside = new Set(known);

      for (const file of diff.files) {
        if (!inside.has(file.filename)) continue;
        (file.status === "removed" ? deleted : changed).push(file.filename);
      }
    }

    return {
      ...base,
      headSha: head,
      changed,
      deleted,
      partial,
      status: changed.length || deleted.length ? "stale" : "moved",
    };
  } catch (error) {
    return { ...base, reason: error instanceof Error ? error.message : "Could not reach GitHub." };
  }
}
