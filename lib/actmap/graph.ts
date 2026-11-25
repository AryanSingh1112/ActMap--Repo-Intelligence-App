
import type {
  RepositoryEdge,
  WalkDirection,
  WalkResult,
} from "../../types/actmap";

type GraphWalkOptions = {
  filePath: string;
  edges: RepositoryEdge[];
  direction: WalkDirection;
  maxDepth?: number;
};

/**
 * Breadth-first walk over a prebuilt adjacency map (path -> neighbours, in
 * edge order). The cost is the size of what is reached, not the size of the
 * graph, so callers that keep the map (the agent's graph index) pay no
 * per-query setup.
 */
export function walkAdjacency(
  filePath: string,
  adjacency: ReadonlyMap<string, Iterable<string>>,
  maxDepth = 2,
): WalkResult[] {
  if (maxDepth < 1) return [];

  const visited = new Set<string>([filePath]);
  const queue: WalkResult[] = [{ path: filePath, depth: 0 }];
  const results: WalkResult[] = [];

  let head = 0;

  while (head < queue.length) {
    const current = queue[head++];

    if (current.depth >= maxDepth) continue;

    const neighbours = adjacency.get(current.path);

    if (!neighbours) continue;

    for (const path of neighbours) {
      if (visited.has(path)) continue;

      visited.add(path);

      const result = {
        path,
        depth: current.depth + 1,
      };

      results.push(result);
      queue.push(result);
    }
  }

  return results;
}

export function walkGraph({
  filePath,
  edges,
  direction,
  maxDepth = 2,
}: GraphWalkOptions): WalkResult[] {
  if (maxDepth < 1) return [];

  const adjacency = new Map<string, Set<string>>();

  function addConnection(from: string, to: string) {
    if (!adjacency.has(from)) {
      adjacency.set(from, new Set());
    }

    adjacency.get(from)!.add(to);
  }

  for (const edge of edges) {
    if (direction === "outgoing") {
      addConnection(edge.sourceFile, edge.targetFile);
    } else {
      addConnection(edge.targetFile, edge.sourceFile);
    }
  }

  return walkAdjacency(filePath, adjacency, maxDepth);
}

export function getBlastRadius(
  filePath: string,
  edges: RepositoryEdge[],
  maxDepth = 2,
): WalkResult[] {
  return walkGraph({
    filePath,
    edges,
    direction: "incoming",
    maxDepth,
  });
}

export function getDependencyChain(
  filePath: string,
  edges: RepositoryEdge[],
  maxDepth = 2,
): WalkResult[] {
  return walkGraph({
    filePath,
    edges,
    direction: "outgoing",
    maxDepth,
  });
}
