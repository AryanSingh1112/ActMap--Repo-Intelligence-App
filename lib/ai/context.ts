import { UNCLASSIFIED, genericRoleOfKind } from "../../parser/taxonomy/categories";

import { LIMITS } from "./config";
import { cacheKey } from "./key";
import { shownPaths } from "./types";

import type {
  ClassifyFileInput,
  ExplainFileInput,
  ExplainFolderInput,
  FolderFile,
  Neighbour,
  Outsider,
} from "./types";

/**
 * Turns the stored graph into what a model is told. Nothing here calls a
 * model, and nothing here invents a connection: every neighbour comes from an
 * edge the parser stored.
 */

export type GraphFile = {
  id: string;
  path: string;
  hash: string | null;
  /** Convention's role, or null when no adapter could identify the file. */
  role: string | null;
  kind: string | null;
  extension: string;
  language: string | null;
  lineCount: number;
  exports: string[];
};

export type GraphEdge = { source: string; target: string; kinds: string[] };

export type Graph = {
  files: GraphFile[];
  byPath: Map<string, GraphFile>;
  imports: Map<string, GraphEdge[]>;
  importedBy: Map<string, GraphEdge[]>;
};

export function buildGraph(files: GraphFile[], edges: GraphEdge[]): Graph {
  const byPath = new Map(files.map((file) => [file.path, file]));
  const imports = new Map<string, GraphEdge[]>();
  const importedBy = new Map<string, GraphEdge[]>();

  for (const edge of edges) {
    if (edge.source === edge.target || !byPath.has(edge.source) || !byPath.has(edge.target)) continue;
    imports.set(edge.source, [...(imports.get(edge.source) ?? []), edge]);
    importedBy.set(edge.target, [...(importedBy.get(edge.target) ?? []), edge]);
  }

  return { files, byPath, imports, importedBy };
}

/** The role convention gave, or null. Matches how the explorer decides "Unclassified". */
export function conventionRole(role: string | null | undefined, kind: string | null | undefined): string | null {
  const category = role ?? genericRoleOfKind(kind ?? undefined);
  return category && category !== UNCLASSIFIED ? category : null;
}

const fanIn = (graph: Graph, path: string) => graph.importedBy.get(path)?.length ?? 0;

function neighbour(graph: Graph, path: string, kinds: string[]): Neighbour {
  const file = graph.byPath.get(path)!;
  return { path, role: file.role, exports: file.exports, kinds };
}

function rankedNeighbours(graph: Graph, edges: GraphEdge[], pick: "source" | "target", limit: number) {
  const ranked = [...edges].sort(
    (a, b) =>
      fanIn(graph, b[pick]) - fanIn(graph, a[pick]) || (a[pick] < b[pick] ? -1 : a[pick] > b[pick] ? 1 : 0),
  );

  return {
    shown: ranked.slice(0, limit).map((edge) => neighbour(graph, edge[pick], edge.kinds)),
    omitted: Math.max(0, ranked.length - limit),
  };
}

export function buildFileInput(graph: Graph, path: string): { input: ExplainFileInput; key: Record<string, unknown> } | null {
  const file = graph.byPath.get(path);
  if (!file) return null;

  const imports = rankedNeighbours(graph, graph.imports.get(path) ?? [], "target", LIMITS.neighbours);
  const importedBy = rankedNeighbours(graph, graph.importedBy.get(path) ?? [], "source", LIMITS.neighbours);

  const input: ExplainFileInput = {
    path,
    role: file.role,
    language: file.language,
    lineCount: file.lineCount,
    // Filled in by whoever fetches the source. The cache key does not need it:
    // the file's content hash stands for it.
    source: "",
    truncated: false,
    imports: imports.shown,
    importedBy: importedBy.shown,
    omitted: { imports: imports.omitted, importedBy: importedBy.omitted },
  };

  const hashed = (list: Neighbour[]) =>
    list.map((n) => `${n.path}@${graph.byPath.get(n.path)?.hash ?? ""}`).sort();

  return {
    input,
    key: {
      kind: "file",
      path,
      hash: file.hash,
      imports: hashed(input.imports),
      importedBy: hashed(input.importedBy),
    },
  };
}

export function buildFolderInput(
  graph: Graph,
  folder: string,
  paths: string[],
): { input: ExplainFolderInput; key: Record<string, unknown> } | null {
  const inside = new Set(paths.filter((path) => graph.byPath.has(path)));
  if (inside.size === 0) return null;

  const files: FolderFile[] = [...inside]
    .map((path) => {
      const file = graph.byPath.get(path)!;
      return { path, role: file.role, lineCount: file.lineCount, fanIn: fanIn(graph, path), exports: file.exports };
    })
    .sort((a, b) => b.fanIn - a.fanIn || (a.path < b.path ? -1 : 1));

  const group = (edgesOf: (path: string) => GraphEdge[], outside: "source" | "target", own: "source" | "target") => {
    const grouped = new Map<string, Set<string>>();
    let total = 0;

    for (const path of inside) {
      for (const edge of edgesOf(path)) {
        if (inside.has(edge[outside])) continue;
        total++;
        grouped.set(edge[outside], (grouped.get(edge[outside]) ?? new Set()).add(edge[own]));
      }
    }

    const all: Outsider[] = [...grouped]
      .map(([path, touches]) => ({ path, touches: [...touches].sort() }))
      .sort((a, b) => b.touches.length - a.touches.length || (a.path < b.path ? -1 : 1));

    return { all, total };
  };

  const incoming = group((path) => graph.importedBy.get(path) ?? [], "source", "target");
  const outgoing = group((path) => graph.imports.get(path) ?? [], "target", "source");

  const input: ExplainFolderInput = {
    folder,
    files: files.slice(0, LIMITS.folderFiles),
    importers: incoming.all.slice(0, LIMITS.folderNeighbours),
    imports: outgoing.all.slice(0, LIMITS.folderNeighbours),
    omitted: {
      files: Math.max(0, files.length - LIMITS.folderFiles),
      importers: Math.max(0, incoming.all.length - LIMITS.folderNeighbours),
      imports: Math.max(0, outgoing.all.length - LIMITS.folderNeighbours),
    },
    inboundTotal: incoming.total,
    outboundTotal: outgoing.total,
  };

  const hashed = (paths: string[]) => paths.map((p) => `${p}@${graph.byPath.get(p)?.hash ?? ""}`).sort();

  return {
    input,
    key: {
      kind: "folder",
      folder,
      files: hashed(input.files.map((f) => f.path)),
      importers: hashed(input.importers.map((o) => o.path)),
      imports: hashed(input.imports.map((o) => o.path)),
      counts: [files.length, incoming.total, outgoing.total],
    },
  };
}

/** Files no adapter could identify, in a stable order. */
export function unclassifiedFiles(graph: Graph): GraphFile[] {
  return graph.files
    .filter((file) => conventionRole(file.role, file.kind) === null)
    .sort((a, b) => (a.path < b.path ? -1 : 1));
}

/**
 * What the classifier is told about a file. It carries no role of any kind,
 * its own or its neighbours', so the same input works for the files convention
 * could not identify and for the held-out set the evals score.
 */
export function buildClassifyInput(graph: Graph, path: string): ClassifyFileInput | null {
  const file = graph.byPath.get(path);
  if (!file) return null;

  const names = (edges: GraphEdge[] | undefined, pick: "source" | "target") =>
    (edges ?? [])
      .map((edge) => edge[pick])
      .sort()
      .slice(0, LIMITS.classifyNeighbours);

  return {
    path,
    extension: file.extension,
    kind: file.kind,
    exports: file.exports,
    imports: names(graph.imports.get(path), "target"),
    importedBy: names(graph.importedBy.get(path), "source"),
  };
}

export function classifyBatchKey(graph: Graph, inputs: ClassifyFileInput[]): Record<string, unknown> {
  return {
    kind: "role",
    files: inputs.map((input) => ({
      ...input,
      hash: graph.byPath.get(input.path)?.hash ?? "",
    })),
  };
}

export { cacheKey, shownPaths };
