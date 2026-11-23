"use client";

import PathButton from "../shared/PathButton";

import { getExtensionColor } from "../../../lib/actmap/colors";

import type { AnalysisMode, RepositoryFile, WalkResult } from "../../../types/actmap";

type AnalysisResultsProps = {
  mode: Exclude<AnalysisMode, null>;
  results: WalkResult[];
  depth: number;
  fileMap: Map<string, RepositoryFile>;
  hoverFile: string | null;
  onDepthChange: (depth: number) => void;
  onHover: (path: string | null) => void;
  onSelectFile: (path: string) => void;
};

const LEVELS = [1, 2, 3];

const COPY = {
  "blast-radius": {
    caption: "what imports this, directly or through others",
    tone: "text-good",
    empty: "Nothing imports this file, so changing it breaks nothing else.",
  },
  "dependency-chain": {
    caption: "what this needs, directly or through others",
    tone: "text-warn",
    empty: "This file imports nothing.",
  },
} as const;

function groupLabel(depth: number, count: number) {
  return depth === 1 ? `Directly · ${count}` : `${depth} steps away · ${count}`;
}

export default function AnalysisResults({
  mode,
  results,
  depth,
  fileMap,
  hoverFile,
  onDepthChange,
  onHover,
  onSelectFile,
}: AnalysisResultsProps) {
  const copy = COPY[mode];

  const groups = new Map<number, string[]>();

  for (const result of results) {
    const group = groups.get(result.depth) ?? [];
    group.push(result.path);
    groups.set(result.depth, group);
  }

  const levels = [...groups.keys()].sort((a, b) => a - b);

  return (
    <div className="mt-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[14px] leading-5 text-muted">
          <span className={`mr-1.5 font-mono text-[17px] tabular-nums ${copy.tone}`}>
            {results.length}
          </span>
          files · {copy.caption}
        </p>

        <div className="flex shrink-0 items-center gap-1 text-[13px] text-muted">
          <span className="mr-1">levels</span>

          {LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onDepthChange(level)}
              className={`rounded px-2 py-0.5 font-mono tabular-nums ${
                depth === level
                  ? "bg-surface-2 text-foreground"
                  : "hover:text-foreground"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="mt-4 text-[14px] text-muted">{copy.empty}</p>
      ) : (
        <div className="mt-4 space-y-4">
          {levels.map((level) => {
            const paths = [...(groups.get(level) ?? [])].sort();

            return (
              <div key={level}>
                <p className="mb-1.5 text-[14px] text-muted">
                  {groupLabel(level, paths.length)}
                </p>

                <div className="-mx-2 space-y-0.5">
                  {paths.map((path) => (
                    <PathButton
                      key={path}
                      path={path}
                      dotColor={getExtensionColor(fileMap.get(path)?.extension ?? "")}
                      hovered={hoverFile === path}
                      onSelect={onSelectFile}
                      onHover={onHover}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
