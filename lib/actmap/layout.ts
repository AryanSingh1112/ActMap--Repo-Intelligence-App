import type { FoldedNode } from "./fold";

export const METRICS = {
  closedMinWidth: 136,
  closedMaxWidth: 260,
  openWidth: 312,
  header: 54,
  row: 28,
  moreRow: 28,
  panelPadding: 8,
  gapX: 150,
  gapY: 22,
  gapSameLayer: 44,
  maxColumnHeight: 560,
  maxVisibleRows: 14,
} as const;

export type NodeBox = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  open: boolean;
  layer: number;
};

export type Layout = {
  boxes: Map<string, NodeBox>;
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
};

export type RowPlan = { rows: number; hidden: number };

/** Width comes from the label. Height carries how many things depend on it. */
export function closedSize(node: FoldedNode) {
  // The counts line ("15/15 files ←11 10→") has to fit inside the box too, so
  // the width is the larger of what the name needs and what the counts need.
  // It is measured on the longest form (the "n/n files" shown while a category
  // is highlighted), at about 7.4px per character of 12px mono, plus the gaps.
  const n = node.files.length;
  const countsChars =
    `${n}/${n} files`.length + `←${node.fanIn}`.length + `${node.fanOut}→`.length;
  const countsWidth = countsChars * 7.4 + 12 + 8 + 32;

  const width = Math.min(
    METRICS.closedMaxWidth,
    Math.max(METRICS.closedMinWidth, node.label.length * 8.2 + 44, countsWidth),
  );

  const height = 56 + Math.min(34, Math.round(Math.sqrt(node.fanIn) * 5));

  return { width, height };
}

export function openSize(plan: RowPlan) {
  return {
    width: METRICS.openWidth,
    height:
      METRICS.header +
      plan.rows * METRICS.row +
      (plan.hidden > 0 ? METRICS.moreRow : 0) +
      METRICS.panelPadding,
  };
}

/** Iterative Tarjan. A repository is allowed to be deep, so nothing recurses. */
function stronglyConnected(
  ids: string[],
  successors: Map<string, string[]>,
): Map<string, number> {
  const index = new Map<string, number>();
  const low = new Map<string, number>();
  const onStack = new Set<string>();
  const stack: string[] = [];
  const component = new Map<string, number>();
  let counter = 0;
  let components = 0;

  for (const root of ids) {
    if (index.has(root)) continue;

    const work: { node: string; next: number }[] = [{ node: root, next: 0 }];
    index.set(root, counter);
    low.set(root, counter);
    counter++;
    stack.push(root);
    onStack.add(root);

    while (work.length > 0) {
      const frame = work[work.length - 1];
      const out = successors.get(frame.node) ?? [];

      if (frame.next < out.length) {
        const next = out[frame.next++];

        if (!index.has(next)) {
          index.set(next, counter);
          low.set(next, counter);
          counter++;
          stack.push(next);
          onStack.add(next);
          work.push({ node: next, next: 0 });
        } else if (onStack.has(next)) {
          low.set(frame.node, Math.min(low.get(frame.node)!, index.get(next)!));
        }

        continue;
      }

      if (low.get(frame.node) === index.get(frame.node)) {
        let member: string;

        do {
          member = stack.pop()!;
          onStack.delete(member);
          component.set(member, components);
        } while (member !== frame.node);

        components++;
      }

      work.pop();

      const parent = work[work.length - 1];
      if (parent) {
        low.set(parent.node, Math.min(low.get(parent.node)!, low.get(frame.node)!));
      }
    }
  }

  return component;
}

/**
 * Deterministic layered layout. Importers sit on the left and what they
 * import sits further right, so the most depended-on folders gather on the
 * right edge. The same data always produces the same picture.
 */
export function computeLayout(options: {
  nodes: FoldedNode[];
  /** "from|to" -> number of file imports, importer first. */
  nodeEdges: Map<string, number>;
  open: Set<string>;
  rowPlans: Map<string, RowPlan>;
}): Layout {
  const { nodes, nodeEdges, open, rowPlans } = options;

  const ids = nodes.map((node) => node.id);
  const byId = new Map(nodes.map((node) => [node.id, node]));

  const successors = new Map<string, string[]>(ids.map((id) => [id, []]));
  const predecessors = new Map<string, string[]>(ids.map((id) => [id, []]));

  for (const key of [...nodeEdges.keys()].sort()) {
    const [from, to] = key.split("|");
    successors.get(from)!.push(to);
    predecessors.get(to)!.push(from);
  }

  // Folders that nothing connects to would stack into one very tall column,
  // so they are packed into a grid underneath the connected graph instead.
  const connected = ids.filter(
    (id) => successors.get(id)!.length + predecessors.get(id)!.length > 0,
  );
  const isolated = ids
    .filter((id) => !connected.includes(id))
    .sort((a, b) => byId.get(a)!.label.localeCompare(byId.get(b)!.label));

  // Layers: longest path over the condensation, so cycles share a column.
  const component = stronglyConnected(connected, successors);
  const componentCount = Math.max(-1, ...component.values()) + 1;

  const componentSuccessors: Set<number>[] = Array.from(
    { length: componentCount },
    () => new Set(),
  );
  const indegree = new Array<number>(componentCount).fill(0);

  for (const [from, outs] of successors) {
    for (const to of outs) {
      const a = component.get(from)!;
      const b = component.get(to)!;

      if (a !== b && !componentSuccessors[a].has(b)) {
        componentSuccessors[a].add(b);
        indegree[b]++;
      }
    }
  }

  const componentLayer = new Array<number>(componentCount).fill(0);
  const ready: number[] = [];

  for (let index = 0; index < componentCount; index++) {
    if (indegree[index] === 0) ready.push(index);
  }

  for (let head = 0; head < ready.length; head++) {
    const current = ready[head];

    for (const next of componentSuccessors[current]) {
      componentLayer[next] = Math.max(componentLayer[next], componentLayer[current] + 1);
      indegree[next]--;
      if (indegree[next] === 0) ready.push(next);
    }
  }

  const layerOf = new Map(
    connected.map((id) => [id, componentLayer[component.get(id)!]]),
  );
  const layerCount = Math.max(0, ...layerOf.values()) + 1;

  const layers: string[][] = Array.from({ length: layerCount }, () => []);
  for (const id of [...connected].sort((a, b) => byId.get(a)!.label.localeCompare(byId.get(b)!.label))) {
    layers[layerOf.get(id)!].push(id);
  }

  // Ordering inside a layer: a few barycentre sweeps to untangle crossings.
  const position = new Map<string, number>();

  function refreshPositions() {
    for (const layer of layers) {
      layer.forEach((id, index) => position.set(id, (index + 0.5) / layer.length));
    }
  }

  refreshPositions();

  for (let sweep = 0; sweep < 8; sweep++) {
    const downward = sweep % 2 === 0;
    const order = downward
      ? layers.map((_, index) => index)
      : layers.map((_, index) => layers.length - 1 - index);

    for (const layerIndex of order) {
      const layer = layers[layerIndex];

      const scored = layer.map((id, index) => {
        const neighbours = [
          ...(downward ? predecessors.get(id)! : successors.get(id)!),
        ].filter((other) => other !== id);

        const score = neighbours.length
          ? neighbours.reduce((sum, other) => sum + position.get(other)!, 0) /
            neighbours.length
          : position.get(id)!;

        return { id, score, index };
      });

      scored.sort((a, b) => a.score - b.score || a.index - b.index);
      layers[layerIndex] = scored.map((item) => item.id);
      layers[layerIndex].forEach((id, index) =>
        position.set(id, (index + 0.5) / layers[layerIndex].length),
      );
    }
  }

  // Geometry.
  const sizes = new Map<string, { width: number; height: number }>();

  for (const node of nodes) {
    sizes.set(
      node.id,
      open.has(node.id)
        ? openSize(rowPlans.get(node.id) ?? { rows: 0, hidden: 0 })
        : closedSize(node),
    );
  }

  // A very tall layer would force the whole picture to shrink until the text
  // is unreadable, so a layer taller than the cap wraps into side-by-side
  // columns. Nothing connects two nodes in one layer, so no line is crossed.
  type Column = { layer: number; ids: string[]; width: number; height: number };
  const columns: Column[] = [];

  layers.forEach((layer, layerIndex) => {
    let current: Column | null = null;

    for (const id of layer) {
      const size = sizes.get(id)!;

      if (
        !current ||
        (current.ids.length > 0 &&
          current.height + METRICS.gapY + size.height > METRICS.maxColumnHeight)
      ) {
        current = { layer: layerIndex, ids: [], width: 0, height: 0 };
        columns.push(current);
      }

      current.height += (current.ids.length > 0 ? METRICS.gapY : 0) + size.height;
      current.width = Math.max(current.width, size.width);
      current.ids.push(id);
    }
  });

  const tallest = Math.max(0, ...columns.map((column) => column.height));

  const boxes = new Map<string, NodeBox>();
  let cursorX = 0;

  columns.forEach((column, columnIndex) => {
    let cursorY = (tallest - column.height) / 2;

    for (const id of column.ids) {
      const size = sizes.get(id)!;

      boxes.set(id, {
        id,
        x: cursorX + (column.width - size.width) / 2,
        y: cursorY,
        width: size.width,
        height: size.height,
        open: open.has(id),
        layer: column.layer,
      });

      cursorY += size.height + METRICS.gapY;
    }

    const next = columns[columnIndex + 1];
    cursorX += column.width + (next && next.layer === column.layer ? METRICS.gapSameLayer : METRICS.gapX);
  });

  // Pack the unconnected folders, wrapping at the connected graph's width.
  if (isolated.length > 0) {
    let connectedRight = 0;
    let connectedBottom = 0;

    for (const box of boxes.values()) {
      connectedRight = Math.max(connectedRight, box.x + box.width);
      connectedBottom = Math.max(connectedBottom, box.y + box.height);
    }

    const wrapAt = Math.max(connectedRight, 900);
    const startY = boxes.size > 0 ? connectedBottom + 90 : 0;

    let cursorX = 0;
    let cursorY = startY;
    let rowHeight = 0;

    for (const id of isolated) {
      const size = sizes.get(id)!;

      if (cursorX > 0 && cursorX + size.width > wrapAt) {
        cursorX = 0;
        cursorY += rowHeight + METRICS.gapY;
        rowHeight = 0;
      }

      boxes.set(id, {
        id,
        x: cursorX,
        y: cursorY,
        width: size.width,
        height: size.height,
        open: open.has(id),
        layer: layerCount,
      });

      cursorX += size.width + 40;
      rowHeight = Math.max(rowHeight, size.height);
    }
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const box of boxes.values()) {
    minX = Math.min(minX, box.x);
    minY = Math.min(minY, box.y);
    maxX = Math.max(maxX, box.x + box.width);
    maxY = Math.max(maxY, box.y + box.height);
  }

  if (boxes.size === 0) {
    minX = minY = 0;
    maxX = maxY = 1;
  }

  return { boxes, bounds: { minX, minY, maxX, maxY } };
}
