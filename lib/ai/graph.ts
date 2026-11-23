import "server-only";

import { readAll } from "../actmap/load";

import { buildGraph, type Graph, type GraphEdge, type GraphFile } from "./context";

import type { SupabaseClient } from "@supabase/supabase-js";

type FileRow = {
  id: string;
  path: string;
  language: string | null;
  kind: string | null;
  extension: string | null;
  line_count: number | null;
  content_hash: string | null;
  metadata: { role?: string | null; exports?: unknown } | null;
};

type EdgeRow = {
  source_file_id: string;
  target_file_id: string;
  edge_type: string;
  metadata: { kinds?: string[] } | null;
};

function exportNames(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => (typeof item === "string" ? item : (item as { name?: unknown } | null)?.name))
    .filter((name): name is string => typeof name === "string")
    .slice(0, 20);
}

/** Reads one analysis's files and edges back as a graph, through whichever client it is given. */
export async function loadGraph(supabase: SupabaseClient, analysisId: string): Promise<Graph> {
  const [fileCount, edgeCount] = await Promise.all([
    supabase.from("files").select("id", { count: "exact", head: true }).eq("analysis_id", analysisId),
    supabase.from("edges").select("id", { count: "exact", head: true }).eq("analysis_id", analysisId),
  ]);

  if (fileCount.error) throw new Error(fileCount.error.message);
  if (edgeCount.error) throw new Error(edgeCount.error.message);

  const [fileRows, edgeRows] = await Promise.all([
    readAll<FileRow>(fileCount.count ?? 0, (from, to) =>
      supabase
        .from("files")
        .select("id, path, language, kind, extension, line_count, content_hash, metadata")
        .eq("analysis_id", analysisId)
        .order("path")
        .range(from, to),
    ),
    readAll<EdgeRow>(edgeCount.count ?? 0, (from, to) =>
      supabase
        .from("edges")
        .select("source_file_id, target_file_id, edge_type, metadata")
        .eq("analysis_id", analysisId)
        .order("id")
        .range(from, to),
    ),
  ]);

  const pathById = new Map<string, string>();

  const files: GraphFile[] = fileRows.map((row) => {
    pathById.set(row.id, row.path);

    return {
      id: row.id,
      path: row.path,
      hash: row.content_hash,
      role: row.metadata?.role ?? null,
      kind: row.kind,
      extension: row.extension ?? "",
      language: row.language,
      lineCount: row.line_count ?? 0,
      exports: exportNames(row.metadata?.exports),
    };
  });

  const edges: GraphEdge[] = [];

  for (const row of edgeRows) {
    const source = pathById.get(row.source_file_id);
    const target = pathById.get(row.target_file_id);
    if (source && target) edges.push({ source, target, kinds: row.metadata?.kinds ?? [row.edge_type] });
  }

  return buildGraph(files, edges);
}
