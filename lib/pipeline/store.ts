import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { CoverageSummary } from "../../types/actmap";
import type { RepositoryMap } from "../../parser/src/types";

const CHUNK = 500;
const MAX_EXAMPLES = 20;

type StoreInput = {
  analysisId: string;
  organizationId: string;
  map: RepositoryMap;
};

export type StoreResult = {
  files: number;
  edges: number;
  routes: number;
};

function chunks<T>(items: T[], size = CHUNK): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

function fail(what: string, error: { message: string }): never {
  throw new Error(`Could not store ${what}: ${error.message}`);
}

/**
 * Writes one parsed repository into files, edges and routes.
 *
 * Runs with the service client, which bypasses row-level security, so every
 * row carries the organization_id that came from the verified session.
 *
 * Safe to run again for the same analysis: earlier rows are cleared first.
 * Deleting files cascades to their edges, routes and file_roles.
 */
export async function storeRepositoryMap(
  supabase: SupabaseClient,
  { analysisId, organizationId, map }: StoreInput,
): Promise<StoreResult> {
  // 1. Clear anything from an earlier run of this analysis.
  {
    const { error } = await supabase
      .from("files")
      .delete()
      .eq("analysis_id", analysisId)
      .eq("organization_id", organizationId);

    if (error) fail("the previous map", error);
  }

  // 2. Files. The returned ids are needed to wire up edges and routes.
  const idByPath = new Map<string, string>();

  for (const batch of chunks(map.files)) {
    const { data, error } = await supabase
      .from("files")
      .insert(
        batch.map((file) => ({
          organization_id: organizationId,
          analysis_id: analysisId,
          path: file.path,
          language: file.language,
          size_bytes: file.sizeBytes,
          content_hash: file.contentHash,
          is_binary: false,
          folder_path: file.folderPath,
          extension: file.extension,
          kind: file.kind,
          line_count: file.lineCount,
          // load.ts reads name and role from here.
          metadata: {
            name: file.name,
            role: file.role ?? null,
            exports: file.exports ?? null,
            fanIn: file.fanIn,
            fanOut: file.fanOut,
          },
        })),
      )
      .select("id, path");

    if (error) fail("files", error);

    for (const row of data ?? []) idByPath.set(row.path, row.id);
  }

  // 3. Edges. One row per (source, target) pair.
  const edgeRows: Record<string, unknown>[] = [];

  for (const edge of map.edges) {
    const source = idByPath.get(edge.sourceFile);
    const target = idByPath.get(edge.targetFile);

    // An edge with a missing end would be invented. The table also forbids
    // a file pointing at itself.
    if (!source || !target || source === target) continue;

    edgeRows.push({
      organization_id: organizationId,
      analysis_id: analysisId,
      source_file_id: source,
      target_file_id: target,
      edge_type: "import",
      metadata: {
        kinds: edge.kinds,
        occurrenceCount: edge.occurrenceCount,
        lines: edge.occurrences.map((o) => o.line),
      },
    });
  }

  for (const batch of chunks(edgeRows)) {
    const { error } = await supabase.from("edges").insert(batch);
    if (error) fail("edges", error);
  }

  // 4. Routes. A route whose file is unknown is dropped, never guessed.
  const routeRows: Record<string, unknown>[] = [];

  for (const route of map.routes) {
    const entry = idByPath.get(route.sourceFile);
    if (!entry) continue;

    routeRows.push({
      organization_id: organizationId,
      analysis_id: analysisId,
      entry_file_id: entry,
      route_type: route.method,
      path: [route.pattern],
      metadata: {
        method: route.method,
        pattern: route.pattern,
        line: route.line,
      },
    });
  }

  for (const batch of chunks(routeRows)) {
    const { error } = await supabase.from("routes").insert(batch);
    if (error) fail("routes", error);
  }

  return {
    files: idByPath.size,
    edges: edgeRows.length,
    routes: routeRows.length,
  };
}

/**
 * The compact summary kept on the analysis row and shown in the coverage
 * banner. The full per-import entries stay out of the database.
 */
export function summariseCoverage(map: RepositoryMap): CoverageSummary {
  const { coverage } = map;
  const unresolvedByReason: Record<string, number> = {};

  for (const entry of coverage.entries) {
    if (entry.status !== "unresolved") continue;
    unresolvedByReason[entry.reason] = (unresolvedByReason[entry.reason] ?? 0) + 1;
  }

  return {
    total: coverage.total,
    resolved: coverage.resolved,
    external: coverage.external,
    excluded: coverage.excluded,
    unresolved: coverage.unresolved,
    unresolvedByReason,
    examples: coverage.unresolvedExamples.slice(0, MAX_EXAMPLES).map((entry) => ({
      sourceFile: entry.occurrence.sourceFile,
      specifier: entry.occurrence.specifier,
      line: entry.occurrence.line,
      reason: entry.reason,
      message: entry.message,
    })),
  };
}