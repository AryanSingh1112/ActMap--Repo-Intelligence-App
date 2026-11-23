import {
  UNCLASSIFIED,
  genericRoleOfKind,
  taxonomyFor,
} from "../../parser/taxonomy/categories";

import type { RepositoryEdge, RepositoryFile } from "../../types/actmap";

export type Category = { name: string; count: number };

export type RepositoryModel = {
  files: RepositoryFile[];
  edges: RepositoryEdge[];
  fileMap: Map<string, RepositoryFile>;
  imports: Map<string, string[]>;
  importedBy: Map<string, string[]>;
  edgeMap: Map<string, RepositoryEdge>;
  categories: Category[];
  totalLines: number;
};

/** The rail category a file counts under. Older analyses have no stored role. */
export function categoryOf(file: RepositoryFile): string {
  return file.role ?? genericRoleOfKind(file.kind) ?? UNCLASSIFIED;
}

export function edgeKey(source: string, target: string): string {
  return `${source}\u0000${target}`;
}

/**
 * Indexes the stored rows once. Nothing here reshapes the parser's output;
 * everything the canvas needs is derived from it.
 */
export function buildModel(
  inputFiles: RepositoryFile[],
  inputEdges: RepositoryEdge[],
  adapter = "generic",
): RepositoryModel {
  const fileMap = new Map(inputFiles.map((file) => [file.path, file]));

  const edges = inputEdges.filter(
    (edge) =>
      edge.sourceFile !== edge.targetFile &&
      fileMap.has(edge.sourceFile) &&
      fileMap.has(edge.targetFile),
  );

  const imports = new Map<string, string[]>();
  const importedBy = new Map<string, string[]>();
  const edgeMap = new Map<string, RepositoryEdge>();

  for (const file of inputFiles) {
    imports.set(file.path, []);
    importedBy.set(file.path, []);
  }

  for (const edge of edges) {
    const key = edgeKey(edge.sourceFile, edge.targetFile);
    if (edgeMap.has(key)) continue;

    edgeMap.set(key, edge);
    imports.get(edge.sourceFile)!.push(edge.targetFile);
    importedBy.get(edge.targetFile)!.push(edge.sourceFile);
  }

  const files = inputFiles.map((file) => ({
    ...file,
    fanIn: importedBy.get(file.path)!.length,
    fanOut: imports.get(file.path)!.length,
  }));

  const filesByPath = new Map(files.map((file) => [file.path, file]));

  // The list and its order come from the framework, never from the counts, so
  // the same repository always shows its categories in the same places.
  const counts = new Map<string, number>();
  for (const file of files) {
    counts.set(categoryOf(file), (counts.get(categoryOf(file)) ?? 0) + 1);
  }

  const known = taxonomyFor(adapter).categories;
  const categories: Category[] = known.map((name) => ({ name, count: counts.get(name) ?? 0 }));

  // A role the list does not know (an older analysis) still shows, at the end.
  for (const [name, count] of counts) {
    if (!known.includes(name)) categories.push({ name, count });
  }

  return {
    files,
    edges: [...edgeMap.values()],
    fileMap: filesByPath,
    imports,
    importedBy,
    edgeMap,
    categories,
    totalLines: files.reduce((sum, file) => sum + file.lineCount, 0),
  };
}
