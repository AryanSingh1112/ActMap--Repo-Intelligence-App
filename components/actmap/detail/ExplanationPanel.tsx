"use client";

import ExplanationText from "./ExplanationText";
import { useExplain } from "./explain-context";
import { RerunButton } from "../../analysis/rerun-button";

import type { Staleness } from "../../../types/actmap";

type Props = {
  /** Where the answer is kept, so it is still there when the selection comes back. */
  entryKey: string;
  /** What to send: a file path, or a folder and its files. */
  body: Record<string, unknown>;
  /** The files the staleness check looks at. */
  stalePaths: string[];
  subject: "file" | "folder";
  onSelectFile: (path: string) => void;
  onHover: (path: string | null) => void;
};

const short = (sha: string | null) => (sha ? sha.slice(0, 7) : "unknown");

function StaleNotice({ staleness, analysisId, subject }: { staleness: Staleness; analysisId: string; subject: string }) {
  if (staleness.status === "fresh") return null;

  if (staleness.status === "unknown") {
    return <p className="mt-3 text-[13px] text-muted">Couldn’t check whether the repository has changed. {staleness.reason}</p>;
  }

  const changed = [...staleness.changed, ...staleness.deleted];

  return (
    <div role="status" className="mb-4 rounded-lg border border-warn/40 bg-warn/10 px-4 py-3 text-[14px] leading-6">
      <p className="font-medium text-warn">
        {staleness.status === "stale" ? "This explanation is stale" : "The repository has moved on"}
      </p>
      <p className="mt-1 text-foreground">
        {staleness.status === "stale"
          ? `${changed.length === 1 ? `${changed[0]} has` : `${changed.length} files in this ${subject} have`} changed since commit ${short(staleness.analysedSha)}${staleness.deleted.length ? " or been deleted" : ""}.`
          : `It was written at commit ${short(staleness.analysedSha)}; the repository is now at ${short(staleness.headSha)}. The ${subject} itself is unchanged.`}
        {staleness.partial ? " GitHub listed only part of the changes, so more may differ." : ""}
      </p>
      <div className="mt-3">
        <RerunButton analysisId={analysisId} />
      </div>
    </div>
  );
}

export default function ExplanationPanel({ entryKey, body, stalePaths, subject, onSelectFile, onHover }: Props) {
  const { ai, analysisId, files, entries, explain } = useExplain();
  const entry = entries[entryKey];

  const trace = ai.tracing.enabled
    ? `Traced to LangSmith project ${ai.tracing.project}`
    : ai.tracing.reason;

  if (!ai.configured) {
    return (
      <p className="mt-5 text-[14px] leading-6 text-muted">
        No AI key is set, so nothing can be explained. Add <code className="font-mono">AI_API_KEY</code> to{" "}
        <code className="font-mono">.env.local</code> and restart.
      </p>
    );
  }

  return (
    <div className="mt-5">
      {!entry && (
        <>
          <button
            type="button"
            onClick={() => explain(entryKey, body, stalePaths)}
            className="rounded-lg border border-line px-4 py-2 text-[15px] text-foreground transition-colors hover:bg-surface-2"
          >
            Explain
          </button>
          <p className="mt-3 text-[14px] leading-6 text-muted">
            Written by a model from this {subject}’s source and every file it imports or is imported by, as parsed.
          </p>
        </>
      )}

      {entry?.status === "loading" && <p className="animate-pulse text-[15px] text-muted">Explaining…</p>}

      {entry?.status === "error" && (
        <>
          <p className="text-[14px] text-bad">{entry.message}</p>
          <button
            type="button"
            onClick={() => explain(entryKey, body, stalePaths)}
            className="mt-3 rounded-lg border border-line px-4 py-2 text-[15px] hover:bg-surface-2"
          >
            Try again
          </button>
        </>
      )}

      {entry?.status === "done" && (
        <>
          {entry.staleness !== "checking" && (
            <StaleNotice staleness={entry.staleness} analysisId={analysisId} subject={subject} />
          )}

          <ExplanationText
            text={entry.result.text}
            shown={entry.result.allowedPaths}
            files={files}
            onSelectFile={onSelectFile}
            onHover={onHover}
          />

          <div className="mt-6 space-y-1 border-t border-line pt-4 text-[13px] leading-5 text-muted">
            <p>
              {entry.result.model} · {entry.result.cached ? "from cache" : "new answer"}
            </p>
            <p className={ai.tracing.enabled ? "" : "text-warn"}>{trace}</p>
            {entry.result.invented.length > 0 && (
              <p className="text-warn">
                Mentions paths that were not shown to the model: {entry.result.invented.join(", ")}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
