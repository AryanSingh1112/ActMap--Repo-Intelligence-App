import { METRICS, type Layout, type NodeBox } from "./layout";

import type { RepositoryEdge } from "../../types/actmap";

export type EdgeTone = "normal" | "out" | "in" | "dim";

export type EdgeShape = {
  key: string;
  d: string;
  width: number;
  tone: EdgeTone;
};

export type FocusState = {
  /** A single selected file. */
  file: string | null;
  /** A selected folder node. */
  node: string | null;
  /** Blast radius (importers) or dependency chain (imports) from the file. */
  mode: "blast-radius" | "dependency-chain" | null;
  /** The selected file plus everything the walk reached. */
  closure: Set<string> | null;
};

export const NO_FOCUS: FocusState = {
  file: null,
  node: null,
  mode: null,
  closure: null,
};

export function hasFocus(focus: FocusState): boolean {
  return focus.file !== null || focus.node !== null;
}

type Anchor = { x: number; y: number };

function rowCenter(box: NodeBox, index: number): number {
  return box.y + METRICS.header + index * METRICS.row + METRICS.row / 2;
}

function anchorFor(
  box: NodeBox,
  side: "left" | "right",
  file: string | null,
  rows: Map<string, string[]> | undefined,
  hiddenCount: number,
): Anchor {
  const x = side === "right" ? box.x + box.width : box.x;

  if (!box.open) return { x, y: box.y + box.height / 2 };

  const visible = rows?.get(box.id) ?? [];
  const index = file ? visible.indexOf(file) : -1;

  if (index >= 0) return { x, y: rowCenter(box, index) };

  if (hiddenCount > 0 && file) {
    return {
      x,
      y: box.y + METRICS.header + visible.length * METRICS.row + METRICS.moreRow / 2,
    };
  }

  return { x, y: box.y + METRICS.header / 2 };
}

function curve(from: Anchor, to: Anchor, sameColumn: boolean, direction: 1 | -1): string {
  if (sameColumn) {
    const bulge = 70;
    return `M ${from.x} ${from.y} C ${from.x + bulge} ${from.y}, ${to.x + bulge} ${to.y}, ${to.x} ${to.y}`;
  }

  const reach = Math.max(48, Math.abs(to.x - from.x) * 0.5);

  return `M ${from.x} ${from.y} C ${from.x + direction * reach} ${from.y}, ${to.x - direction * reach} ${to.y}, ${to.x} ${to.y}`;
}

function widthFor(count: number): number {
  return Math.min(3.4, 1.1 + Math.log2(count + 1) * 0.55);
}

/**
 * Edges between two folded nodes collapse into one line. As soon as either
 * end is open, every file import touching it is drawn on its own and lands
 * on the row it belongs to.
 */
export function buildEdgeShapes(options: {
  edges: RepositoryEdge[];
  nodeOf: Map<string, string>;
  layout: Layout;
  rows: Map<string, string[]>;
  hidden: Map<string, number>;
  focus: FocusState;
}): EdgeShape[] {
  const { edges, nodeOf, layout, rows, hidden, focus } = options;

  type Group = {
    from: string;
    to: string;
    pairs: [string, string][];
  };

  const aggregated = new Map<string, Group>();
  const individual: { from: string; to: string; source: string; target: string }[] = [];

  for (const edge of edges) {
    const from = nodeOf.get(edge.sourceFile);
    const to = nodeOf.get(edge.targetFile);

    if (!from || !to || from === to) continue;

    const fromBox = layout.boxes.get(from);
    const toBox = layout.boxes.get(to);
    if (!fromBox || !toBox) continue;

    if (fromBox.open || toBox.open) {
      individual.push({ from, to, source: edge.sourceFile, target: edge.targetFile });
      continue;
    }

    const key = `${from}|${to}`;
    const group = aggregated.get(key) ?? { from, to, pairs: [] };
    group.pairs.push([edge.sourceFile, edge.targetFile]);
    aggregated.set(key, group);
  }

  const active = hasFocus(focus);

  function classify(source: string, target: string, from: string, to: string): EdgeTone {
    if (!active) return "normal";

    if (focus.mode && focus.closure) {
      const inside = focus.closure.has(source) && focus.closure.has(target);
      if (!inside) return "dim";
      return focus.mode === "blast-radius" ? "in" : "out";
    }

    if (focus.file) {
      if (source === focus.file) return "out";
      if (target === focus.file) return "in";
      return "dim";
    }

    if (focus.node) {
      if (from === focus.node) return "out";
      if (to === focus.node) return "in";
      return "dim";
    }

    return "normal";
  }

  function route(
    from: string,
    to: string,
    source: string | null,
    target: string | null,
  ): string | null {
    const a = layout.boxes.get(from)!;
    const b = layout.boxes.get(to)!;

    const sameColumn = Math.abs(a.x - b.x) < 1;
    const forward = a.x < b.x;

    const start = anchorFor(a, forward || sameColumn ? "right" : "left", source, rows, hidden.get(from) ?? 0);
    const end = anchorFor(b, forward ? "left" : "right", target, rows, hidden.get(to) ?? 0);

    return curve(start, end, sameColumn, forward ? 1 : -1);
  }

  const shapes: EdgeShape[] = [];

  for (const group of aggregated.values()) {
    let tone: EdgeTone = "dim";

    if (!active) {
      tone = "normal";
    } else {
      for (const [source, target] of group.pairs) {
        const next = classify(source, target, group.from, group.to);
        if (next !== "dim") {
          tone = next;
          break;
        }
      }
    }

    const d = route(group.from, group.to, null, null);
    if (!d) continue;

    shapes.push({
      key: `${group.from}|${group.to}`,
      d,
      width: widthFor(group.pairs.length),
      tone,
    });
  }

  for (const edge of individual) {
    const d = route(edge.from, edge.to, edge.source, edge.target);
    if (!d) continue;

    shapes.push({
      key: `${edge.source}->${edge.target}`,
      d,
      width: 1.2,
      tone: classify(edge.source, edge.target, edge.from, edge.to),
    });
  }

  // Strong edges paint last so they are never hidden under faint ones.
  const order: Record<EdgeTone, number> = { dim: 0, normal: 1, in: 2, out: 3 };
  return shapes.sort((a, b) => order[a.tone] - order[b.tone]);
}
