
import type {
  DependencyEdge,
  FileNode,
  ImportCoverage,
  ImportOccurrence,
} from "../types";

export interface GraphBuilderResult {
  files: FileNode[];
  edges: DependencyEdge[];
}

export function buildDependencyGraph(
  files: FileNode[],
  coverage: ImportCoverage,
): GraphBuilderResult {
  const edgeMap = new Map<
    string,
    {
      sourceFile: string;
      targetFile: string;
      kinds: Set<ImportOccurrence["kind"]>;
      occurrences: ImportOccurrence[];
    }
  >();

  for (const entry of coverage.entries) {
    if (
      entry.status !== "resolved" ||
      entry.resolvedPath === null
    ) {
      continue;
    }

    const sourceFile = entry.occurrence.sourceFile;
    const targetFile = entry.resolvedPath;

    const key = JSON.stringify([sourceFile, targetFile]);

    let edge = edgeMap.get(key);

    if (!edge) {
      edge = {
        sourceFile,
        targetFile,
        kinds: new Set(),
        occurrences: [],
      };

      edgeMap.set(key, edge);
    }

    edge.kinds.add(entry.occurrence.kind);
    edge.occurrences.push(entry.occurrence);
  }

  const edges: DependencyEdge[] = [...edgeMap.entries()]
    .map(([key, value]) => {
      const occurrences = value.occurrences.sort(
        (a, b) =>
          a.line - b.line ||
          a.column - b.column,
      );

      return {
        id: key,
        sourceFile: value.sourceFile,
        targetFile: value.targetFile,
        kinds: [...value.kinds].sort(),
        occurrences,
        occurrenceCount: occurrences.length,
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  const fanIn = new Map<string, number>();
  const fanOut = new Map<string, number>();

  for (const file of files) {
    fanIn.set(file.path, 0);
    fanOut.set(file.path, 0);
  }

  for (const edge of edges) {
    fanOut.set(
      edge.sourceFile,
      (fanOut.get(edge.sourceFile) ?? 0) + 1,
    );

    fanIn.set(
      edge.targetFile,
      (fanIn.get(edge.targetFile) ?? 0) + 1,
    );
  }

  const updatedFiles = files.map((file) => ({
    ...file,
    fanIn: fanIn.get(file.path) ?? 0,
    fanOut: fanOut.get(file.path) ?? 0,
  }));

  return {
    files: updatedFiles,
    edges,
  };
}
