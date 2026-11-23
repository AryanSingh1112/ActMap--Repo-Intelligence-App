
import type {
  Insight,
  RepositoryEdge,
  RepositoryFile,
} from "../../types/actmap";

import { getEntrypointPaths } from "./entrypoints";

// No model writes any of this. Each insight kind has exactly one sentence.
export const INSIGHT_TEXT = {
  unused:
    "Nothing in the import graph reaches these files. Pages, routes, layouts, middleware and config are left out, because the framework reaches those.",
  dependents:
    "An unusually large number of files import these, so changes here travel far.",
  cycle:
    "Each file in this loop imports the next, and the last imports the first.",
  oversized:
    "These files are long enough that they are worth reading carefully before changing.",
} as const;

export const OVERSIZED_LINE_COUNT = 500;

type InsightOptions = {
  files: RepositoryFile[];
  edges: RepositoryEdge[];
};

function getImporters(edges: RepositoryEdge[]) {
  const importers = new Map<string, Set<string>>();

  for (const edge of edges) {
    if (!importers.has(edge.targetFile)) {
      importers.set(edge.targetFile, new Set());
    }

    importers.get(edge.targetFile)!.add(edge.sourceFile);
  }

  return importers;
}

/**
 * Turns a strongly connected component into one concrete cycle that can be
 * walked by hand: each file imports the next, and the last imports the first.
 * Breadth-first search from the first file back to itself, staying inside the
 * component, so the loop is the shortest one through that file.
 */
function orderCycle(
  component: string[],
  adjacency: Map<string, string[]>,
): string[] {
  const members = new Set(component);
  const start = [...component].sort()[0];
  const parent = new Map<string, string>();
  const queue: string[] = [];

  for (const next of adjacency.get(start) ?? []) {
    if (!members.has(next) || parent.has(next)) continue;
    parent.set(next, start);
    queue.push(next);
  }

  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];

    if (adjacency.get(node)?.includes(start)) {
      const cycle = [node];
      let current = node;

      while (parent.get(current) !== start) {
        current = parent.get(current)!;
        cycle.push(current);
      }

      cycle.push(start);
      return cycle.reverse();
    }

    for (const next of adjacency.get(node) ?? []) {
      if (!members.has(next) || parent.has(next) || next === start) continue;
      parent.set(next, node);
      queue.push(next);
    }
  }

  return component;
}

/**
 * Finds strongly connected components using iterative Kosaraju.
 * A component with multiple files, or a self-loop, is a cycle.
 */
function findImportCycles(edges: RepositoryEdge[]): string[][] {
  const adjacency = new Map<string, string[]>();
  const reverse = new Map<string, string[]>();
  const nodes = new Set<string>();

  for (const edge of edges) {
    nodes.add(edge.sourceFile);
    nodes.add(edge.targetFile);

    if (!adjacency.has(edge.sourceFile)) adjacency.set(edge.sourceFile, []);
    if (!reverse.has(edge.targetFile)) reverse.set(edge.targetFile, []);

    adjacency.get(edge.sourceFile)!.push(edge.targetFile);
    reverse.get(edge.targetFile)!.push(edge.sourceFile);
  }

  const visited = new Set<string>();
  const order: string[] = [];

  for (const start of nodes) {
    if (visited.has(start)) continue;

    visited.add(start);

    const stack: { node: string; index: number }[] = [
      { node: start, index: 0 },
    ];

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const neighbours = adjacency.get(current.node) ?? [];

      if (current.index < neighbours.length) {
        const next = neighbours[current.index++];
        if (visited.has(next)) continue;

        visited.add(next);
        stack.push({ node: next, index: 0 });
      } else {
        order.push(current.node);
        stack.pop();
      }
    }
  }

  visited.clear();

  const cycles: string[][] = [];

  for (let i = order.length - 1; i >= 0; i--) {
    const start = order[i];

    if (visited.has(start)) continue;

    const component: string[] = [];
    const stack = [start];
    visited.add(start);

    while (stack.length > 0) {
      const node = stack.pop()!;
      component.push(node);

      for (const next of reverse.get(node) ?? []) {
        if (visited.has(next)) continue;

        visited.add(next);
        stack.push(next);
      }
    }

    const hasSelfLoop = component.some((node) =>
      (adjacency.get(node) ?? []).includes(node),
    );

    if (component.length > 1) {
      cycles.push(orderCycle(component, adjacency));
    } else if (hasSelfLoop) {
      cycles.push(component);
    }
  }

  return cycles;
}

function getHighDependentThreshold(counts: number[]): number {
  if (counts.length === 0) return Infinity;

  const mean =
    counts.reduce((sum, count) => sum + count, 0) / counts.length;

  const variance =
    counts.reduce((sum, count) => sum + (count - mean) ** 2, 0) /
    counts.length;

  const standardDeviation = Math.sqrt(variance);

  return Math.max(5, Math.ceil(mean + 2 * standardDeviation));
}

export function getRepositoryInsights({
  files,
  edges,
}: InsightOptions): Insight[] {
  const insights: Insight[] = [];

  const filePaths = new Set(files.map((file) => file.path));
  const entrypoints = getEntrypointPaths(files);
  const importers = getImporters(edges);

  // Files with no incoming imports, excluding entry points.
  const unusedFiles = files
    .filter(
      (file) =>
        !entrypoints.has(file.path) &&
        (importers.get(file.path)?.size ?? 0) === 0,
    )
    .map((file) => file.path);

  if (unusedFiles.length > 0) {
    insights.push({
      id: "unused-files",
      title: "Files nothing imports",
      description: INSIGHT_TEXT.unused,
      paths: unusedFiles,
    });
  }

  // Files with unusually many unique importers.
  const dependentCounts = files.map(
    (file) => importers.get(file.path)?.size ?? 0,
  );

  const threshold = getHighDependentThreshold(dependentCounts);

  const highDependents = files
    .filter(
      (file) => (importers.get(file.path)?.size ?? 0) >= threshold,
    )
    .sort(
      (a, b) =>
        (importers.get(b.path)?.size ?? 0) -
        (importers.get(a.path)?.size ?? 0),
    );

  if (highDependents.length > 0) {
    insights.push({
      id: "high-dependents",
      title: "High number of dependents",
      description: INSIGHT_TEXT.dependents,
      paths: highDependents.map((file) => file.path),
    });
  }

  // Import cycles.
  const cycles = findImportCycles(edges).filter((cycle) =>
    cycle.every((path) => filePaths.has(path)),
  );

  for (let index = 0; index < cycles.length; index++) {
    insights.push({
      id: `import-cycle-${index + 1}`,
      title: cycles.length > 1 ? `Import cycle ${index + 1}` : "Import cycle",
      description: INSIGHT_TEXT.cycle,
      paths: cycles[index],
    });
  }

  // Oversized files.
  const oversizedFiles = files
    .filter((file) => file.lineCount > OVERSIZED_LINE_COUNT)
    .sort((a, b) => b.lineCount - a.lineCount);

  if (oversizedFiles.length > 0) {
    insights.push({
      id: "oversized-files",
      title: "Oversized files",
      description: INSIGHT_TEXT.oversized,
      paths: oversizedFiles.map((file) => file.path),
    });
  }

  return insights;
}
