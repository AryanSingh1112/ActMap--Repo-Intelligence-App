
import "server-only";

import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { parseRepository } from "../../parser/src/repository-parser";
import { createSupabaseServiceClient } from "../supabase/service";

import { PipelineError, downloadArchive } from "./github";
import { storeRepositoryMap, summariseCoverage } from "./store";
import { storeFileContents } from "./source";
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
 * Stores repository structure and source contents separately.
 * The temporary repository directory remains available until
 * both storage operations have completed.
 */
export async function runPipeline(input: PipelineInput): Promise<void> {
  const { analysisId, organizationId, owner, repo } = input;

  let supabase: ReturnType<typeof createSupabaseServiceClient>;

  try {
    supabase = createSupabaseServiceClient();
  } catch (error) {
    console.error(
      `[pipeline] ${owner}/${repo} could not start:`,
      error instanceof Error ? error.message : error,
    );
    return;
  }

  console.log(
    `[pipeline] ${owner}/${repo} starting (analysis ${analysisId})`,
  );

  let stage: StageId = "fetch";
  let workDirectory: string | null = null;

  async function update(values: Record<string, unknown>) {
    const { error } = await supabase
      .from("analyses")
      .update(values)
      .eq("id", analysisId)
      .eq("organization_id", organizationId);

    if (error) {
      throw new Error(
        `Could not update the analysis: ${error.message}`,
      );
    }
  }

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

  function enter(
    next: StageId,
    message: string,
    extra: Record<string, unknown> = {},
  ) {
    stage = next;

    queue({
      status: "running",
      stage: next,
      stage_message: message,
      ...extra,
    });
  }

  try {
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

    workDirectory = await mkdtemp(
      path.join(os.tmpdir(), "actmap-"),
    );

    const { commitSha } = await downloadArchive({
      owner,
      repo,
      commitSha: null,
      destination: workDirectory,
    });

    if (commitSha) {
      queue({ commit_sha: commitSha });
    }

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

    // Store repository structure and relationships.
    const stored = await storeRepositoryMap(supabase, {
      analysisId,
      organizationId,
      map,
    });

    // Store source contents while the downloaded repository
    // is still available on disk.
    const source = await storeFileContents(supabase, {
      rootPath: workDirectory,
      analysisId,
      organizationId,
      map,
    });

    const skippedByReason: Record<string, number> = {};

    for (const skipped of map.skippedFiles) {
      skippedByReason[skipped.reason] =
        (skippedByReason[skipped.reason] ?? 0) + 1;
    }

    await drain();

    await update({
      status: "complete",
      stage: "store",
      stage_message:
        `Mapped ${stored.files} files, stored ${source.stored} source files and ${stored.edges} edges`,
      summary:
        `Mapped ${stored.files} files and ${stored.edges} edges`,
      coverage: summariseCoverage(map),
      stats: {
        ...map.statistics,
        adapter: map.framework,
        routes: stored.routes,
        sourceFilesStored: source.stored,
        sourceFilesSkipped: source.skipped,
        parserVersion: map.repository.parserVersion,
        schemaVersion: map.schemaVersion,
        skippedByReason,
      },
      completed_at: new Date().toISOString(),
    });

    console.log("[pipeline] completed", {
      analysisId,
      files: stored.files,
      sourceFiles: source.stored,
      sourceFilesSkipped: source.skipped,
      edges: stored.edges,
      routes: stored.routes,
    });
  } catch (error) {
    const message =
      error instanceof PipelineError
        ? error.message
        : error instanceof Error
          ? `Unexpected error: ${error.message}`.slice(0, 400)
          : "Unexpected error";

    console.error(
      `[pipeline] ${owner}/${repo} failed during ${stage}:`,
      error,
    );

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
      console.error(
        "[pipeline] could not record the failure:",
        writeError,
      );
    }
  } finally {
    if (workDirectory) {
      await rm(workDirectory, {
        recursive: true,
        force: true,
      }).catch(() => {});
    }
  }
}
