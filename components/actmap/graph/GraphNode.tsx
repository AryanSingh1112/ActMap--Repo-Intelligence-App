"use client";

import { METRICS, type NodeBox } from "../../../lib/actmap/layout";
import { categoryOf } from "../../../lib/actmap/model";
import { getExtensionColor } from "../../../lib/actmap/colors";
import type { FoldedNode } from "../../../lib/actmap/fold";
import type { RepositoryFile } from "../../../types/actmap";

type GraphNodeProps = {
  node: FoldedNode;
  box: NodeBox;
  /** Files shown as rows when the node is open, already in display order. */
  rows: RepositoryFile[];
  hiddenCount: number;
  selected: boolean;
  selectedFile: string | null;
  hoverFile: string | null;
  dimmed: boolean;
  activeCategory: string | null;
  focusFiles: Set<string> | null;
  analysisMode: "blast-radius" | "dependency-chain" | null;
  onToggle: (id: string) => void;
  onSelectFile: (path: string) => void;
  onHoverFile: (path: string | null) => void;
};

/** About how many monospace characters fit, so labels end in an ellipsis. */
function fit(text: string, pixels: number, size: number): string {
  const characters = Math.max(4, Math.floor(pixels / (size * 0.62)));
  return text.length <= characters ? text : `${text.slice(0, characters - 1)}…`;
}

export default function GraphNode({
  node,
  box,
  rows,
  hiddenCount,
  selected,
  selectedFile,
  hoverFile,
  dimmed,
  activeCategory,
  focusFiles,
  analysisMode,
  onToggle,
  onSelectFile,
  onHoverFile,
}: GraphNodeProps) {
  const matching = activeCategory
    ? node.files.filter((file) => categoryOf(file) === activeCategory).length
    : node.files.length;

  const containsHover = hoverFile !== null && node.files.some((file) => file.path === hoverFile);
  const faded = dimmed || (activeCategory !== null && matching === 0);

  const stroke = selected || containsHover ? "stroke-accent" : box.open ? "stroke-accent/40" : "stroke-line";

  const counts = (
    <>
      {activeCategory ? (
        <>
          <tspan className={matching > 0 ? "fill-foreground" : "fill-subtle"}>{matching}</tspan>
          <tspan className="fill-subtle">/{node.files.length} files</tspan>
        </>
      ) : (
        <tspan>
          {node.files.length} {node.files.length === 1 ? "file" : "files"}
        </tspan>
      )}
      <tspan dx={12} className="fill-good">
        ←{node.fanIn}
      </tspan>
      <tspan dx={8} className="fill-warn">
        {node.fanOut}→
      </tspan>
    </>
  );

  return (
    <g
      data-node
      transform={`translate(${box.x} ${box.y})`}
      opacity={faded ? 0.26 : 1}
      className="transition-opacity duration-150"
    >
      <rect
        width={box.width}
        height={box.height}
        rx={9}
        className={`fill-surface ${stroke}`}
        strokeWidth={selected ? 1.8 : 1.2}
      />

      {/* Header: also the click target that opens and closes the folder. */}
      <g
        className="cursor-pointer"
        onClick={() => onToggle(node.id)}
        onPointerEnter={() => onHoverFile(null)}
      >
        <rect width={box.width} height={METRICS.header} rx={9} fill="transparent" />

        <text
          x={16}
          y={25}
          fontSize={14}
          fontWeight={600}
          className="fill-foreground font-mono"
        >
          {fit(node.label, box.width - (box.open ? 56 : 32), 14)}
        </text>

        <text x={16} y={45} fontSize={12} className="fill-muted font-mono">
          {counts}
        </text>

        {box.open && (
          <text
            x={box.width - 18}
            y={30}
            fontSize={18}
            textAnchor="middle"
            className="fill-muted"
          >
            −
          </text>
        )}

        <title>{node.path === "." ? "repository root" : node.path}</title>
      </g>

      {box.open && (
        <>
          <line
            x1={0}
            x2={box.width}
            y1={METRICS.header}
            y2={METRICS.header}
            className="stroke-line"
          />

          {rows.map((file, index) => {
            const y = METRICS.header + index * METRICS.row;
            const isSelected = selectedFile === file.path;
            const isHover = hoverFile === file.path;
            const inFocus = focusFiles !== null && focusFiles.has(file.path) && !isSelected;
            const matches = activeCategory === null || categoryOf(file) === activeCategory;
            const out = focusFiles !== null && focusFiles.size > 0 && !focusFiles.has(file.path);

            const tone = inFocus
              ? analysisMode === "dependency-chain"
                ? "fill-warn/15"
                : analysisMode === "blast-radius"
                  ? "fill-good/15"
                  : "fill-surface-2"
              : isSelected
                ? "fill-accent/20"
                : isHover
                  ? "fill-surface-2"
                  : "fill-transparent";

            return (
              <g
                key={file.path}
                className="cursor-pointer"
                opacity={out || !matches ? 0.32 : 1}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectFile(file.path);
                }}
                onPointerEnter={() => onHoverFile(file.path)}
                onPointerLeave={() => onHoverFile(null)}
              >
                <rect
                  x={6}
                  y={y + 1}
                  width={box.width - 12}
                  height={METRICS.row - 2}
                  rx={5}
                  className={tone}
                />

                <rect
                  x={16}
                  y={y + METRICS.row / 2 - 4}
                  width={8}
                  height={8}
                  rx={2}
                  fill={getExtensionColor(file.extension)}
                />

                <text
                  x={32}
                  y={y + METRICS.row / 2 + 4.5}
                  fontSize={12.5}
                  className={`font-mono ${isSelected ? "fill-foreground" : "fill-muted"}`}
                  fontWeight={isSelected ? 600 : 400}
                >
                  {fit(file.name, box.width - 32 - 74, 12.5)}
                </text>

                <text
                  x={box.width - 14}
                  y={y + METRICS.row / 2 + 4}
                  fontSize={11}
                  textAnchor="end"
                  className="font-mono"
                >
                  <tspan className="fill-good">←{file.fanIn}</tspan>
                  <tspan dx={7} className="fill-warn">
                    {file.fanOut}→
                  </tspan>
                </text>

                <title>{file.path}</title>
              </g>
            );
          })}

          {hiddenCount > 0 && (
            <text
              x={16}
              y={METRICS.header + rows.length * METRICS.row + METRICS.moreRow / 2 + 4}
              fontSize={12}
              className="fill-subtle font-mono"
            >
              +{hiddenCount} more {hiddenCount === 1 ? "file" : "files"}
            </text>
          )}
        </>
      )}
    </g>
  );
}
