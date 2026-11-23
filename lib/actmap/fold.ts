import type { RepositoryEdge, RepositoryFile } from "../../types/actmap";

export type FoldedNode = {
  id: string;
  path: string;
  label: string;
  files: RepositoryFile[];
  /** File-level imports coming in from other nodes. */
  fanIn: number;
  /** File-level imports going out to other nodes. */
  fanOut: number;
};

export type Folding = {
  nodes: FoldedNode[];
  nodeOf: Map<string, string>;
  threshold: number;
};

export const TARGET_NODE_COUNT = 24;
const MIN_THRESHOLD = 2;

function parentOf(directory: string): string | null {
  if (directory === ".") return null;
  const slash = directory.lastIndexOf("/");
  return slash === -1 ? "." : directory.slice(0, slash);
}

function depthOf(directory: string): number {
  return directory === "." ? 0 : directory.split("/").length;
}

/**
 * One folding pass. Every directory starts as its own node. Working from the
 * deepest directory upward, any directory holding fewer than `threshold`
 * files merges into its parent.
 *
 * Each depth is decided from a snapshot taken before that depth merges, so a
 * merge never changes what another directory at the same depth sees.
 */
function foldAt(
  files: RepositoryFile[],
  threshold: number,
): Map<string, RepositoryFile[]> {
  const directories = new Map<string, RepositoryFile[]>();

  function ensure(directory: string) {
    let current: string | null = directory;

    while (current !== null && !directories.has(current)) {
      directories.set(current, []);
      current = parentOf(current);
    }
  }

  for (const file of files) {
    const directory = file.folderPath || ".";
    ensure(directory);
    directories.get(directory)!.push(file);
  }

  let deepest = 0;
  for (const directory of directories.keys()) {
    deepest = Math.max(deepest, depthOf(directory));
  }

  for (let depth = deepest; depth >= 1; depth--) {
    const level = [...directories.keys()].filter(
      (directory) => depthOf(directory) === depth,
    );

    const snapshot = new Map(
      level.map((directory) => [directory, directories.get(directory)!.length]),
    );

    for (const directory of level) {
      if (snapshot.get(directory)! >= threshold) continue;

      const parent = parentOf(directory)!;
      directories.get(parent)!.push(...directories.get(directory)!);
      directories.delete(directory);
    }
  }

  for (const [directory, members] of [...directories]) {
    if (members.length === 0) directories.delete(directory);
  }

  return directories;
}

/** The shortest trailing path that is still unique among what is on screen. */
function uniqueLabels(paths: string[]): Map<string, string> {
  const labels = new Map<string, string>();
  const segmentsByPath = new Map(
    paths.map((path) => [path, path === "." ? [] : path.split("/")]),
  );

  for (const path of paths) {
    if (path === ".") {
      labels.set(path, "(root)");
      continue;
    }

    const segments = segmentsByPath.get(path)!;

    for (let length = 1; length <= segments.length; length++) {
      const candidate = segments.slice(-length).join("/");

      const clash = paths.some((other) => {
        if (other === path || other === ".") return false;
        const otherSegments = segmentsByPath.get(other)!;
        return otherSegments.slice(-length).join("/") === candidate;
      });

      if (!clash || length === segments.length) {
        labels.set(path, candidate);
        break;
      }
    }
  }

  return labels;
}

/**
 * Folds the repository into at most about two dozen nodes. The threshold
 * starts at two and rises only as far as it has to; the repository's own
 * shape decides the depth, nothing is picked in advance.
 */
export function foldRepository(
  files: RepositoryFile[],
  edges: RepositoryEdge[],
  target: number = TARGET_NODE_COUNT,
): Folding {
  let threshold = MIN_THRESHOLD;
  let folded = foldAt(files, threshold);

  while (folded.size > target && threshold <= files.length) {
    threshold += 1;
    folded = foldAt(files, threshold);
  }

  const paths = [...folded.keys()].sort((a, b) => a.localeCompare(b));
  const labels = uniqueLabels(paths);
  const nodeOf = new Map<string, string>();

  const nodes: FoldedNode[] = paths.map((path) => {
    const members = [...folded.get(path)!].sort((a, b) =>
      a.path.localeCompare(b.path),
    );

    for (const file of members) nodeOf.set(file.path, path);

    return {
      id: path,
      path,
      label: labels.get(path) ?? path,
      files: members,
      fanIn: 0,
      fanOut: 0,
    };
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));

  for (const edge of edges) {
    const from = nodeOf.get(edge.sourceFile);
    const to = nodeOf.get(edge.targetFile);

    if (!from || !to || from === to) continue;

    byId.get(from)!.fanOut += 1;
    byId.get(to)!.fanIn += 1;
  }

  return { nodes, nodeOf, threshold };
}
