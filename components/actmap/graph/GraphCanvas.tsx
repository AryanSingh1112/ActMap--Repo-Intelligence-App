"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import GraphControls from "./GraphControls";
import GraphNode from "./GraphNode";

import type { EdgeShape } from "../../../lib/actmap/edges";
import type { FoldedNode } from "../../../lib/actmap/fold";
import type { Layout } from "../../../lib/actmap/layout";
import type { RepositoryFile } from "../../../types/actmap";

type View = { x: number; y: number; k: number };

type GraphCanvasProps = {
  nodes: FoldedNode[];
  layout: Layout;
  edges: EdgeShape[];
  rowFiles: Map<string, RepositoryFile[]>;
  hiddenCounts: Map<string, number>;
  /** Changes whenever the set of open folders changes. */
  openKey: string;
  /** Folders that just opened, so the view can make room for them. */
  newlyOpened: string[];
  selectedNode: string | null;
  selectedFile: string | null;
  hoverFile: string | null;
  focusNodes: Set<string> | null;
  focusFiles: Set<string> | null;
  activeCategory: string | null;
  analysisMode: "blast-radius" | "dependency-chain" | null;
  onToggleNode: (id: string) => void;
  onSelectFile: (path: string) => void;
  onHoverFile: (path: string | null) => void;
  onClearSelection: () => void;
};

const MIN_ZOOM = 0.18;
const MAX_ZOOM = 2.2;
const FIT_MARGIN = 40;
const FIT_TOP = 40;
const MAX_FIT_ZOOM = 1.15;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const EDGE_CLASS = {
  normal: "stroke-edge",
  out: "stroke-warn",
  in: "stroke-good",
  dim: "stroke-edge",
} as const;

const EDGE_OPACITY = { normal: 0.5, out: 0.95, in: 0.95, dim: 0.07 } as const;

export default function GraphCanvas({
  nodes,
  layout,
  edges,
  rowFiles,
  hiddenCounts,
  openKey,
  newlyOpened,
  selectedNode,
  selectedFile,
  hoverFile,
  focusNodes,
  focusFiles,
  activeCategory,
  analysisMode,
  onToggleNode,
  onSelectFile,
  onHoverFile,
  onClearSelection,
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [view, setView] = useState<View>({ x: 0, y: 0, k: 1 });
  const viewRef = useRef(view);
  const fitted = useRef(false);
  const lastOpenKey = useRef(openKey);

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const drag = useRef<{
    startX: number;
    startY: number;
    viewX: number;
    viewY: number;
    moved: boolean;
  } | null>(null);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const fitAll = useCallback(() => {
    if (!size.width || !size.height) return;

    const { minX, minY, maxX, maxY } = layout.bounds;
    const width = Math.max(1, maxX - minX);
    const height = Math.max(1, maxY - minY);

    const k = clamp(
      Math.min(
        (size.width - FIT_MARGIN * 2) / width,
        (size.height - FIT_MARGIN - FIT_TOP) / height,
      ),
      MIN_ZOOM,
      MAX_FIT_ZOOM,
    );

    setView({
      k,
      x: (size.width - width * k) / 2 - minX * k,
      y: FIT_TOP + (size.height - FIT_TOP - FIT_MARGIN - height * k) / 2 - minY * k,
    });
  }, [layout.bounds, size.height, size.width]);

  // Fit once, as soon as there is a real size to fit into.
  useEffect(() => {
    if (fitted.current || !size.width || !size.height) return;
    fitted.current = true;
    fitAll();
  }, [fitAll, size.height, size.width]);

  // Opening a folder may only ever zoom out, never in. This reads the layout
  // that already contains the new panel, so it never fits the state before it.
  useEffect(() => {
    if (lastOpenKey.current === openKey) return;
    lastOpenKey.current = openKey;

    if (newlyOpened.length === 0 || !size.width || !size.height) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const id of newlyOpened) {
      const box = layout.boxes.get(id);
      if (!box) continue;
      minX = Math.min(minX, box.x);
      minY = Math.min(minY, box.y);
      maxX = Math.max(maxX, box.x + box.width);
      maxY = Math.max(maxY, box.y + box.height);
    }

    if (!Number.isFinite(minX)) return;

    const current = viewRef.current;
    const margin = 40;

    const left = minX * current.k + current.x;
    const right = maxX * current.k + current.x;
    const top = minY * current.k + current.y;
    const bottom = maxY * current.k + current.y;

    const visible =
      left >= margin &&
      top >= margin &&
      right <= size.width - margin &&
      bottom <= size.height - margin;

    if (visible) return;

    const fitK = Math.min(
      (size.width - margin * 2) / (maxX - minX),
      (size.height - margin * 2) / (maxY - minY),
    );

    const k = clamp(Math.min(current.k, fitK), MIN_ZOOM, MAX_ZOOM);

    setView({
      k,
      x: size.width / 2 - ((minX + maxX) / 2) * k,
      y: size.height / 2 - ((minY + maxY) / 2) * k,
    });
  }, [layout, newlyOpened, openKey, size.height, size.width]);

  // Wheel zoom around the cursor. React's wheel handler is passive, so this
  // is attached by hand to be able to stop the page from scrolling.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    function onWheel(event: WheelEvent) {
      event.preventDefault();

      const bounds = element!.getBoundingClientRect();
      const px = event.clientX - bounds.left;
      const py = event.clientY - bounds.top;

      setView((current) => {
        const k = clamp(current.k * Math.exp(-event.deltaY * 0.0015), MIN_ZOOM, MAX_ZOOM);
        const ratio = k / current.k;

        return {
          k,
          x: px - (px - current.x) * ratio,
          y: py - (py - current.y) * ratio,
        };
      });
    }

    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, []);

  function zoomBy(factor: number) {
    setView((current) => {
      const k = clamp(current.k * factor, MIN_ZOOM, MAX_ZOOM);
      const ratio = k / current.k;
      const cx = size.width / 2;
      const cy = size.height / 2;

      return { k, x: cx - (cx - current.x) * ratio, y: cy - (cy - current.y) * ratio };
    });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as Element).closest("[data-node]")) return;
    if ((event.target as Element).closest("[data-overlay]")) return;

    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      viewX: view.x,
      viewY: view.y,
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    if (!state) return;

    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;

    if (!state.moved && Math.hypot(dx, dy) < 4) return;
    state.moved = true;

    setView((current) => ({ ...current, x: state.viewX + dx, y: state.viewY + dy }));
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const state = drag.current;
    drag.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    // A click on empty canvas, not a drag, returns the pane to the summary.
    if (state && !state.moved) onClearSelection();
  }

  const ordered = [...nodes].sort((a, b) => {
    const aOpen = layout.boxes.get(a.id)?.open ? 1 : 0;
    const bOpen = layout.boxes.get(b.id)?.open ? 1 : 0;
    return aOpen - bOpen;
  });

  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--grid)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <svg className="h-full w-full select-none" role="img" aria-label="Repository map">
          <defs>
            <marker
              id="arrow-out"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" className="fill-warn" />
            </marker>

            <marker
              id="arrow-in"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" className="fill-good" />
            </marker>
          </defs>

          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            <g fill="none" strokeLinecap="round" pointerEvents="none">
              {edges.map((edge) => (
                <path
                  key={edge.key}
                  d={edge.d}
                  strokeWidth={edge.tone === "dim" ? 1 : edge.tone === "normal" ? edge.width : edge.width + 0.6}
                  opacity={EDGE_OPACITY[edge.tone]}
                  className={EDGE_CLASS[edge.tone]}
                  markerEnd={
                    edge.tone === "out"
                      ? "url(#arrow-out)"
                      : edge.tone === "in"
                        ? "url(#arrow-in)"
                        : undefined
                  }
                />
              ))}
            </g>

            {ordered.map((node) => {
              const box = layout.boxes.get(node.id);
              if (!box) return null;

              return (
                <GraphNode
                  key={node.id}
                  node={node}
                  box={box}
                  rows={rowFiles.get(node.id) ?? []}
                  hiddenCount={hiddenCounts.get(node.id) ?? 0}
                  selected={selectedNode === node.id}
                  selectedFile={selectedFile}
                  hoverFile={hoverFile}
                  dimmed={focusNodes !== null && !focusNodes.has(node.id)}
                  activeCategory={activeCategory}
                  focusFiles={focusFiles}
                  analysisMode={analysisMode}
                  onToggle={onToggleNode}
                  onSelectFile={onSelectFile}
                  onHoverFile={onHoverFile}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <GraphControls
        zoom={view.k}
        onZoomIn={() => zoomBy(1.2)}
        onZoomOut={() => zoomBy(1 / 1.2)}
        onFit={fitAll}
      />

      <div className="pointer-events-none absolute bottom-5 left-5 text-[12.5px] text-subtle">
        Drag to move · Scroll to zoom · Click a folder to open it
      </div>
    </div>
  );
}