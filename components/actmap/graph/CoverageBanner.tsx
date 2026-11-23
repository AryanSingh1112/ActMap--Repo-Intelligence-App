"use client";

import { useState } from "react";

import type { CoverageSummary } from "../../../types/actmap";

const REASON_LABELS: Record<string, string> = {
  file_not_found: "file not found",
  directory_not_found: "directory not found",
  invalid_specifier: "invalid specifier",
  unsupported_resolution: "unsupported resolution",
  unsupported_file_type: "unsupported file type",
  resolution_error: "resolution error",
};

/** Imports that point into the repository: resolved, plus the ones that failed. */
export function resolutionFigure(coverage: CoverageSummary) {
  const internal = coverage.resolved + coverage.unresolved;
  if (internal === 0) return null;

  // Floor, never round: a graph that is missing imports must not read 100%.
  const percent = Math.floor((coverage.resolved / internal) * 100);

  return { internal, percent };
}

export default function CoverageBanner({
  coverage,
}: {
  coverage: CoverageSummary | null;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!coverage || coverage.unresolved === 0) return null;

  const figure = resolutionFigure(coverage);
  if (!figure) return null;

  const reasons = Object.entries(coverage.unresolvedByReason).sort(
    (a, b) => b[1] - a[1],
  );

  return (
    <div className="pointer-events-auto absolute left-4 top-4 z-10 max-w-[min(640px,calc(100%-2rem))] rounded-lg border border-line bg-surface/95 text-[14px] shadow-lg backdrop-blur">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-foreground"
      >
        <span className="w-3 text-muted">{expanded ? "−" : "+"}</span>
        <span>
          Graph is partial:{" "}
          <span className="font-medium">
            {coverage.resolved.toLocaleString()} of {figure.internal.toLocaleString()}
          </span>{" "}
          imports into this repository resolved ({figure.percent}%)
        </span>
      </button>

      {expanded && (
        <div className="space-y-4 border-t border-line px-4 py-3">
          <p className="text-[13px] leading-5 text-muted">
            {coverage.unresolved.toLocaleString()} imports pointed at a file in
            this repository but could not be resolved to one, so those edges are
            missing from the map rather than guessed.
          </p>

          <ul className="space-y-1 text-[13px]">
            {reasons.map(([reason, count]) => (
              <li key={reason} className="flex justify-between gap-6">
                <span className="text-muted">{REASON_LABELS[reason] ?? reason}</span>
                <span className="font-mono tabular-nums text-foreground">{count}</span>
              </li>
            ))}
          </ul>

          {coverage.examples.length > 0 && (
            <div>
              <p className="mb-1.5 text-[12px] uppercase tracking-wide text-subtle">
                Examples
              </p>
              <ul className="space-y-1.5 font-mono text-[12px]">
                {coverage.examples.slice(0, 5).map((example) => (
                  <li key={`${example.sourceFile}:${example.line}:${example.specifier}`}>
                    <span className="text-foreground">{example.specifier}</span>
                    <span className="block truncate text-subtle">
                      {example.sourceFile}:{example.line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
