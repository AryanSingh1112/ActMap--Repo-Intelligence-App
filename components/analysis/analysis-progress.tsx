"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AnalysisHeader } from "./analysis-header";
import { RerunButton } from "./rerun-button";
import { DoneDot, FailedMark, PendingDot, RunningDot, StatusLabel } from "./status";

import { useAnalysisProgress } from "../../lib/hooks/use-analysis-progress";
import { useNow } from "../../lib/hooks/use-now";
import {
  STAGES,
  isStale,
  isUnfinished,
  stageIndex,
  type AnalysisStatus,
  type ProgressEvent,
  type StageId,
} from "../../lib/pipeline/stages";

export type ProgressState = {
  status: AnalysisStatus;
  stage: StageId | null;
  message: string | null;
  failed_stage: StageId | null;
  updated_at: string | null;
};

type Props = {
  analysisId: string;
  owner: string;
  repo: string;
  initial: ProgressState;
};

type StepState = "done" | "running" | "pending" | "failed";

function stepStates(state: ProgressState): StepState[] {
  const current = stageIndex(state.failed_stage ?? state.stage);

  return STAGES.map((_, index) => {
    if (state.status === "complete") return "done";

    if (state.status === "failed" || state.status === "cancelled") {
      if (current < 0) return index === 0 ? "failed" : "pending";
      if (index < current) return "done";
      return index === current ? "failed" : "pending";
    }

    if (state.status === "queued" || current < 0) return "pending";
    if (index < current) return "done";
    return index === current ? "running" : "pending";
  });
}

function StepIcon({ state }: { state: StepState }) {
  const className = "h-[18px] w-[18px]";

  switch (state) {
    case "done":
      return <DoneDot className={`${className} text-foreground`} />;
    case "running":
      return <RunningDot className={`${className} text-foreground`} />;
    case "failed":
      return <FailedMark className={`${className} text-foreground`} />;
    default:
      return <PendingDot className={`${className} text-muted`} />;
  }
}

/**
 * Names each stage as it happens. Updates arrive from the database over a
 * private channel; nothing here polls. When the run completes, the page
 * refreshes into the map.
 */
export function AnalysisProgress({ analysisId, owner, repo, initial }: Props) {
  const router = useRouter();
  const [state, setState] = useState(initial);
  const now = useNow();

  const onEvent = useCallback(
    (_id: string, event: ProgressEvent & { updated_at?: string | null }) => {
      setState({
        status: event.status,
        stage: event.stage,
        message: event.message,
        failed_stage: event.failed_stage,
        updated_at: event.updated_at ?? new Date().toISOString(),
      });
    },
    [],
  );

  useAnalysisProgress(isUnfinished(initial.status) ? [analysisId] : [], onEvent);

  // Land on the map a moment after the last stage ticks over.
  useEffect(() => {
    if (state.status !== "complete") return;

    const timer = setTimeout(() => router.refresh(), 250);
    return () => clearTimeout(timer);
  }, [state.status, router]);

  const stale = now !== null && isStale(state.status, state.updated_at, now);
  const steps = stepStates(state);
  const unfinished = isUnfinished(state.status);
  const canRerun = !unfinished || stale;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <AnalysisHeader
        owner={owner}
        repo={repo}
        meta={<StatusLabel status={state.status} stale={stale} />}
        actions={canRerun ? <RerunButton analysisId={analysisId} /> : null}
      />

      <div className="px-6 py-8">
        <ol className="space-y-5">
          {STAGES.map((stage, index) => {
            const step = steps[index];
            const showMessage =
              (step === "running" || step === "failed") && state.message;

            return (
              <li key={stage.id} className="flex items-center gap-4 text-[17px]">
                <span className="flex w-60 items-center gap-4">
                  <StepIcon state={step} />
                  <span className={step === "pending" ? "text-muted" : "text-foreground"}>
                    {stage.label}
                  </span>
                </span>

                {showMessage && (
                  <span className={step === "failed" ? "text-bad" : "text-muted"}>
                    {state.message}
                  </span>
                )}

                {state.status === "queued" && index === 0 && (
                  <span className="text-muted">Waiting to start</span>
                )}
              </li>
            );
          })}
        </ol>

        {state.status === "complete" && state.message && (
          <p className="mt-9 text-[17px] text-foreground">{state.message}</p>
        )}

        {state.status === "failed" && (
          <p className="mt-9 max-w-xl text-[15px] leading-6 text-muted">
            The run failed during{" "}
            <span className="text-foreground">
              {STAGES.find((item) => item.id === (state.failed_stage ?? state.stage))?.label.toLowerCase() ??
                "an unknown stage"}
            </span>
            . Nothing was left half-stored, and Re-run starts it again.
          </p>
        )}

        {stale && (
          <p className="mt-9 max-w-xl text-[15px] leading-6 text-warn">
            This run has not moved for several minutes, so it has probably stopped. Re-run
            starts it again.
          </p>
        )}
      </div>
    </div>
  );
}