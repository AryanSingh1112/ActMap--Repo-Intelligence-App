import type { ReactNode } from "react";

/**
 * The bar under the app header: owner/repo on the left, whatever belongs to
 * the run (status, commit) beside it, and the actions on the right.
 */
export function AnalysisHeader({
  owner,
  repo,
  meta,
  actions,
}: {
  owner: string;
  repo: string;
  meta?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="ui-scale flex min-h-16 shrink-0 flex-wrap items-center gap-x-5 gap-y-2 border-b border-line px-6 py-3">
      <h1 className="font-mono text-[22px] tracking-tight text-muted">
        {owner && `${owner}/`}
        <span className="font-semibold text-foreground">{repo}</span>
      </h1>

      {meta}

      {actions && <div className="ml-auto flex items-center gap-3">{actions}</div>}
    </div>
  );
}

export const secondaryButton =
  "rounded-lg border border-line px-4 py-2 text-[15px] text-foreground transition-colors hover:bg-surface-2 disabled:opacity-60";
