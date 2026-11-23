import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import { UNCLASSIFIED, genericRoleOfKind } from "../../parser/taxonomy/categories";
import { ROLE_LABEL, isClassifierRole } from "../ai/roles";

import type {
  CoverageSummary,
  RepositoryData,
  RepositoryEdge,
  RepositoryFile,
  RepositoryRoute,
} from "../../types/actmap";

// PostgREST returns at most 1000 rows per request, so everything is paged.
const PAGE = 1000;

type FileRow = {
  id: string;
  path: string;
  language: string | null;
  folder_path: string | null;
  extension: string | null;
  kind: string | null;
  line_count: number | null;
  metadata: { name?: string; role?: string | null } | null;
};

type RouteRow = {
  id: string;
  entry_file_id: string | null;
  metadata: { method?: string; pattern?: string; line?: number } | null;
};

type EdgeRow = {
  source_file_id: string;
  target_file_id: string;
  edge_type: string;
  metadata: { kinds?: string[]; occurrenceCount?: number } | null;
};

export async function readAll<T>(
  count: number,
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: { message: string } | null }>,
): Promise<T[]> {
  const ranges: [number, number][] = [];

  for (let from = 0; from < count; from += PAGE) {
    ranges.push([from, Math.min(from + PAGE, count) - 1]);
  }

  const rows: T[] = [];

  // A few pages at a time keeps a large repository quick without flooding the API.
  for (let index = 0; index < ranges.length; index += 4) {
    const batch = await Promise.all(
      ranges.slice(index, index + 4).map(([from, to]) => fetchPage(from, to)),
    );

    for (const page of batch) {
      if (page.error) throw new Error(page.error.message);
      rows.push(...(page.data ?? []));
    }
  }

  return rows;
}

function basename(path: string) {
  return path.slice(path.lastIndexOf("/") + 1);
}

/**
 * Reads one analysis back out of the stored rows, through the signed-in
 * client, so row-level security decides whether any of it is visible.
 */
export async function loadRepositoryData(
  supabase: SupabaseClient,
  options: {
    analysisId: string;
    name: string;
    commitSha: string | null;
    adapter: string;
    coverage: CoverageSummary | null;
    detection?: { confidence: string; evidence: string[] } | null;
    /** True once the model has been asked to label the files convention could not. */
    rolesLabelled?: boolean;
  },
): Promise<RepositoryData> {
  const { analysisId } = options;

  const [fileCount, edgeCount, routeResult, modelRoles] = await Promise.all([
    supabase
      .from("files")
      .select("id", { count: "exact", head: true })
      .eq("analysis_id", analysisId),
    supabase
      .from("edges")
      .select("id", { count: "exact", head: true })
      .eq("analysis_id", analysisId),
    supabase
      .from("routes")
      .select("id, entry_file_id, metadata")
      .eq("analysis_id", analysisId)
      .limit(1000),
    // Roles a model gave to files no adapter could identify. Never routable ones.
    supabase
      .from("file_roles")
      .select("file_id, role")
      .eq("analysis_id", analysisId)
      .eq("evidence->>source", "model")
      .limit(1000),
  ]);

  if (routeResult.error) throw new Error(routeResult.error.message);
  // A missing roles table or row is not fatal: the map just has no model labels.
  const modelRole = new Map<string, string>(
    (modelRoles.data ?? []).flatMap((row: { file_id: string; role: string }) =>
      isClassifierRole(row.role) ? [[row.file_id, ROLE_LABEL[row.role]] as [string, string]] : [],
    ),
  );
  if (fileCount.error) throw new Error(fileCount.error.message);
  if (edgeCount.error) throw new Error(edgeCount.error.message);

  const [fileRows, edgeRows] = await Promise.all([
    readAll<FileRow>(fileCount.count ?? 0, (from, to) =>
      supabase
        .from("files")
        .select("id, path, language, folder_path, extension, kind, line_count, metadata")
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

  const files: RepositoryFile[] = fileRows.map((row) => {
    pathById.set(row.id, row.path);

    const conventional = row.metadata?.role ?? undefined;
    const unidentified = !conventional && genericRoleOfKind(row.kind ?? undefined) === UNCLASSIFIED;
    const labelled = unidentified ? modelRole.get(row.id) : undefined;

    return {
      id: row.id,
      path: row.path,
      name: row.metadata?.name ?? basename(row.path),
      extension: row.extension ?? "",
      folderPath: row.folder_path ?? ".",
      language: row.language ?? undefined,
      kind: row.kind ?? undefined,
      role: conventional ?? labelled,
      roleSource: labelled ? ("model" as const) : undefined,
      lineCount: row.line_count ?? 0,
      fanIn: 0,
      fanOut: 0,
    };
  });

  const edges: RepositoryEdge[] = [];

  for (const row of edgeRows) {
    const sourceFile = pathById.get(row.source_file_id);
    const targetFile = pathById.get(row.target_file_id);

    // An edge whose end is missing would be an invented one. Skip, never guess.
    if (!sourceFile || !targetFile) continue;

    edges.push({
      sourceFile,
      targetFile,
      occurrenceCount: row.metadata?.occurrenceCount ?? 1,
      kinds: row.metadata?.kinds ?? [row.edge_type],
    });
  }

  const routes: RepositoryRoute[] = [];

  for (const row of (routeResult.data ?? []) as RouteRow[]) {
    const file = row.entry_file_id ? pathById.get(row.entry_file_id) : undefined;
    const method = row.metadata?.method;
    const pattern = row.metadata?.pattern;

    // A route missing any of its parts is dropped, never filled in.
    if (!file || !method || !pattern) continue;

    routes.push({ id: row.id, method, pattern, file, line: row.metadata?.line ?? 0 });
  }

  routes.sort(
    (a, b) =>
      a.pattern.localeCompare(b.pattern) ||
      a.method.localeCompare(b.method) ||
      a.file.localeCompare(b.file),
  );

  return {
    name: options.name,
    commitSha: options.commitSha,
    adapter: options.adapter,
    files,
    edges,
    coverage: options.coverage,
    detection: options.detection ?? null,
    routes,
    rolesLabelled: options.rolesLabelled ?? false,
  };
}
