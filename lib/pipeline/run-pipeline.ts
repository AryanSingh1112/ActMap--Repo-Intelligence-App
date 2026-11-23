import "server-only";

import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { parseRepository } from "../../parser/src/repository-parser";
import { createSupabaseServiceClient } from "../supabase/service";

import { PipelineError, downloadArchive } from "./github";
import { storeRepositoryMap, summariseCoverage } from "./store";
import type { StageId } from "./stages";

export type PipelineInput = {
  analysisId: string;
  organizationId: string;
  owner: string;
  repo: string;
};

/**
 * fetch -> select -> parse -> store.
 *
 * Each stage is written to the analysis row as it begins; a trigger in the
 * database publishes that change to anyone subscribed. Whatever goes wrong,
 * the catch at the top writes a failed state naming the stage and the reason,
 * so a row is never left saying "running" because of an exception.
 */
export async function runPipeline(input: PipelineInput): Promise<void> {
  const { analysisId, organizationId, owner, repo } = input;

  let supabase: ReturnType<typeof createSupabaseServiceClient>;

  try {
    supabase = createSupabaseServiceClient();
  } catch (error) {
    // Without the secret key nothing can be written, so the run cannot even be
    // marked failed. Say so loudly in the terminal instead of hanging quietly.
    console.error(
      `[pipeline] ${owner}/${repo} could not start:`,
      error instanceof Error ? error.message : error,
    );
    return;
  }

  console.log(`[pipeline] ${owner}/${repo} starting (analysis ${analysisId})`);

  let stage: StageId = "fetch";
  let workDirectory: string | null = null;

  async function update(values: Record<string, unknown>) {
    const { error } = await supabase
      .from("analyses")
      .update(values)
      .eq("id", analysisId)
      .eq("organization_id", organizationId);

    if (error) throw new Error(`Could not update the analysis: ${error.message}`);
  }

  // Progress is written in order but never waited on, so a slow round trip to
  // the database does not slow the work down. Everything that matters (the
  // result, the failure) waits for it to drain first.
  let writes: Promise<void> = Promise.resolve();
  let writeError: unknown = null;

  function queue(values: Record<string, unknown>) {
    writes = writes
      .then(() => update(values))
      .catch((error) => {
        writeError ??= error;
      });
  }

  async function drain() {
    await writes;
    if (writeError) {
      const error = writeError;
      writeError = null;
      throw error;
    }
  }

  function enter(next: StageId, message: string, extra: Record<string, unknown> = {}) {
    stage = next;
    queue({ status: "running", stage: next, stage_message: message, ...extra });
  }

  try {
    // The first write is awaited, so the row says "running" before any work.
    stage = "fetch";
    await update({
      status: "running",
      stage: "fetch",
      stage_message: `Downloading ${owner}/${repo}`,
      started_at: new Date().toISOString(),
      completed_at: null,
      error_message: null,
      failed_stage: null,
    });

    workDirectory = await mkdtemp(path.join(os.tmpdir(), "actmap-"));

    // The archive carries the commit it was cut from, so there is no separate
    // lookup to wait for, and the commit always matches the files.
    const { commitSha } = await downloadArchive({
      owner,
      repo,
      commitSha: null,
      destination: workDirectory,
    });

    if (commitSha) queue({ commit_sha: commitSha });

    const map = await parseRepository({
      rootPath: workDirectory,
      onStage: (next, message) => {
        enter(next, message);
      },
    });

    if (map.files.length === 0) {
      throw new PipelineError(
        `${owner}/${repo} has no files this tool can read, so there is nothing to map`,
      );
    }

    enter(
      "store",
      `Storing ${map.files.length} files and ${map.edges.length} edges`,
    );

    const stored = await storeRepositoryMap(supabase, {
      analysisId,
      organizationId,
      map,
    });

    const skippedByReason: Record<string, number> = {};
    for (const skipped of map.skippedFiles) {
      skippedByReason[skipped.reason] = (skippedByReason[skipped.reason] ?? 0) + 1;
    }

    await drain();

    await update({
      status: "complete",
      stage: "store",
      stage_message: `Mapped ${stored.files} files and ${stored.edges} edges`,
      summary: `Mapped ${stored.files} files and ${stored.edges} edges`,
      coverage: summariseCoverage(map),
      stats: {
        ...map.statistics,
        adapter: map.framework,
        detection: map.frameworkDetection,
        routes: stored.routes,
        parserVersion: map.repository.parserVersion,
        schemaVersion: map.schemaVersion,
        skippedByReason,
      },
      completed_at: new Date().toISOString(),
    });
  } catch (error) {
    const message =
      error instanceof PipelineError
        ? error.message
        : error instanceof Error
          ? `Unexpected error: ${error.message}`.slice(0, 400)
          : "Unexpected error";

    console.error(`[pipeline] ${owner}/${repo} failed during ${stage}:`, error);

    try {
      await writes;
      await update({
        status: "failed",
        stage,
        failed_stage: stage,
        error_message: message,
        completed_at: new Date().toISOString(),
      });
    } catch (writeError) {
      console.error("[pipeline] could not record the failure:", writeError);
    }
  } finally {
    if (workDirectory) {
      await rm(workDirectory, { recursive: true, force: true }).catch(() => {});
    }
  }
}