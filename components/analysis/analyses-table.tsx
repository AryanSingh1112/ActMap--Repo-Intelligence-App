"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useOrganization } from "@clerk/nextjs";

import { AnalysisForm } from "./analysis-form";
import { FailedMark, DoneDot } from "./status";
import { StatusLabel } from "./status";
import { TimeAgo } from "./time-ago";

import { useAnalysisProgress } from "../../lib/hooks/use-analysis-progress";
import { useNow } from "../../lib/hooks/use-now";
import {
  STAGES,
  isStale,
  isUnfinished,
  splitRepositoryName,
  type AnalysisStatus,
  type ProgressEvent,
  type StageId,
} from "../../lib/pipeline/stages";

export type AnalysisRow = {
  id: string;
  status: AnalysisStatus;
  stage: StageId | null;
  stage_message: string | null;
  commit_sha: string | null;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  updated_at: string | null;
  project: { name: string; repository_url: string } | null;
};

export function AnalysesTable({ initial }: { initial: AnalysisRow[] }) {
  const { organization } = useOrganization();
  // Live events patch the rows; a fresh server render replaces them.
  const [state, setState] = useState({ source: initial, rows: initial });
  const rows = state.source === initial ? state.rows : initial;

  // Stale marking needs the browser clock, so it only exists after mount.
  const now = useNow();

  const unfinishedIds = useMemo(
    () => rows.filter((row) => isUnfinished(row.status)).map((row) => row.id),
    [rows],
  );

  const onEvent = useCallback(
    (id: string, event: ProgressEvent & { updated_at?: string | null }) => {
      setState((current) => {
        const base = current.source === initial ? current.rows : initial;

        return {
          source: initial,
          rows: base.map((row) =>
            row.id === id
              ? {
                  ...row,
                  status: event.status,
                  stage: event.stage,
                  stage_message: event.status === "failed" ? row.stage_message : event.message,
                  error_message: event.status === "failed" ? event.message : null,
                  updated_at: event.updated_at ?? new Date().toISOString(),
                  completed_at:
                    event.status === "complete" || event.status === "failed"
                      ? new Date().toISOString()
                      : row.completed_at,
                }
              : row,
          ),
        };
      });
    },
    [initial],
  );

  useAnalysisProgress(unfinishedIds, onEvent);

  const complete = rows.filter((row) => row.status === "complete").length;
  const failed = rows.filter((row) => row.status === "failed").length;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">
          {organization?.name ?? "Your team"}
        </h1>

        <span className="text-muted">
          {rows.length} {rows.length === 1 ? "analysis" : "analyses"}
        </span>

        <AnalysisForm />

        <div className="ml-auto flex items-center gap-5 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <DoneDot className="h-3 w-3 text-muted" />
            {complete} complete
          </span>

          {failed > 0 && (
            <span className="inline-flex items-center gap-2">
              <FailedMark className="h-3.5 w-3.5" />
              {failed} failed
            </span>
          )}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-28 text-center">
          <p className="text-lg font-medium">No analyses yet</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            Paste the URL of a public GitHub repository above and this team&apos;s
            first map will appear here.
          </p>
        </div>
      ) : (
        <table className="w-full table-fixed text-left text-[15px]">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="px-6 py-4 font-normal">Repository</th>
              <th className="w-[22%] px-4 py-4 font-normal">State</th>
              <th className="w-[10%] px-4 py-4 font-normal">Commit</th>
              <th className="w-[9%] px-4 py-4 text-right font-normal">Started</th>
              <th className="w-[9%] px-6 py-4 text-right font-normal">Finished</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const { owner, repo } = splitRepositoryName(
                row.project?.repository_url ?? "",
                row.project?.name ?? "unknown",
              );

              const stale = now !== null && isStale(row.status, row.updated_at, now);
              const stageLabel = STAGES.find((stage) => stage.id === row.stage)?.label;

              return (
                <tr key={row.id} className="border-b border-line transition-colors hover:bg-surface">
                  <td className="px-6 py-4 align-top">
                    <Link
                      href={`/analyses/${row.id}`}
                      className="block font-mono text-base text-muted"
                    >
                      {owner && `${owner}/`}
                      <span className="text-foreground">{repo}</span>
                    </Link>

                    {row.status === "failed" && row.error_message && (
                      <p className="mt-2 text-muted">{row.error_message}</p>
                    )}

                    {!stale && isUnfinished(row.status) && row.stage_message && (
                      <p className="mt-2 text-sm text-subtle">{row.stage_message}</p>
                    )}

                    {stale && (
                      <p className="mt-2 text-sm text-warn">
                        This run stopped responding. Open it to re-run.
                      </p>
                    )}
                  </td>

                  <td className="px-4 py-4 align-top">
                    <StatusLabel status={row.status} stale={stale} stageLabel={stageLabel} />
                  </td>

                  <td className="px-4 py-4 align-top font-mono text-muted">
                    {row.commit_sha ? row.commit_sha.slice(0, 7) : "–"}
                  </td>

                  <td className="px-4 py-4 text-right align-top text-muted">
                    <TimeAgo value={row.started_at ?? row.created_at} />
                  </td>

                  <td className="px-6 py-4 text-right align-top text-muted">
                    <TimeAgo value={row.completed_at} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
