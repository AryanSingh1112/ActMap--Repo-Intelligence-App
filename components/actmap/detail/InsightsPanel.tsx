"use client";

import { useState } from "react";

import PathButton from "../shared/PathButton";

import { getExtensionColor } from "../../../lib/actmap/colors";

import type { Insight, RepositoryFile } from "../../../types/actmap";

type InsightsPanelProps = {
  insights: Insight[];
  fileMap: Map<string, RepositoryFile>;
  hoverFile: string | null;
  onHover: (path: string | null) => void;
  onSelect: (path: string) => void;
};

// Files-nothing-imports leads: it explains. Cycles and oversized read closer
// to a verdict, so they sit underneath.
function rank(insight: Insight) {
  if (insight.id === "unused-files") return 0;
  if (insight.id === "high-dependents") return 1;
  if (insight.id.startsWith("import-cycle")) return 2;
  return 3;
}

const PATH_LIMIT = 12;

export default function InsightsPanel({
  insights,
  fileMap,
  hoverFile,
  onHover,
  onSelect,
}: InsightsPanelProps) {
  // Collapsed by default, and it lives at the bottom of the pane.
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState<Set<string>>(new Set());

  if (insights.length === 0) return null;

  const ordered = [...insights].sort((a, b) => rank(a) - rank(b));

  return (
    <section className="border-t border-line px-6 py-5">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[16px] text-foreground">Insights</span>

        <span className="font-mono text-[14px] tabular-nums text-muted">
          {insights.length} {insights.length === 1 ? "finding" : "findings"}{" "}
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div className="mt-5 space-y-6">
          {ordered.map((insight) => {
            const isCycle = insight.id.startsWith("import-cycle");
            const expandedList = showAll.has(insight.id);
            const paths =
              isCycle || expandedList ? insight.paths : insight.paths.slice(0, PATH_LIMIT);

            return (
              <div key={insight.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-[15px] text-foreground">{insight.title}</h4>
                  <span className="font-mono text-[14px] tabular-nums text-muted">
                    {insight.paths.length}
                  </span>
                </div>

                <p className="mt-1 text-[13.5px] leading-5 text-muted">{insight.description}</p>

                <div className="-mx-2 mt-2 space-y-0.5">
                  {paths.map((path, index) => (
                    <PathButton
                      key={`${path}-${index}`}
                      path={path}
                      dotColor={getExtensionColor(fileMap.get(path)?.extension ?? "")}
                      hovered={hoverFile === path}
                      onSelect={onSelect}
                      onHover={onHover}
                      trailing={
                        isCycle ? (
                          <span className="shrink-0 text-[13px] text-subtle">
                            {index === paths.length - 1 ? "↩" : "→"}
                          </span>
                        ) : undefined
                      }
                    />
                  ))}
                </div>

                {isCycle && (
                  <p className="mt-1 text-[13px] text-subtle">
                    …and the last one imports {insight.paths[0].split("/").pop()} again.
                  </p>
                )}

                {!isCycle && insight.paths.length > PATH_LIMIT && !expandedList && (
                  <button
                    type="button"
                    onClick={() => setShowAll((current) => new Set(current).add(insight.id))}
                    className="mt-1 text-[14px] text-accent hover:underline"
                  >
                    Show {insight.paths.length - PATH_LIMIT} more
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
