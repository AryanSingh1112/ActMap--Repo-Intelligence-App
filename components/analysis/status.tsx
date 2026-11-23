import type { AnalysisStatus } from "../../lib/pipeline/stages";

type IconProps = { className?: string };

export function DoneDot({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <circle cx="8" cy="8" r="6" fill="currentColor" />
    </svg>
  );
}

export function PendingDot({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <circle cx="8" cy="8" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
    </svg>
  );
}

export function RunningDot({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 2.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" />
    </svg>
  );
}

export function FailedMark({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <circle cx="8" cy="8" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="m5.6 5.6 4.8 4.8m0-4.8-4.8 4.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function StatusLabel({
  status,
  stale = false,
  stageLabel,
}: {
  status: AnalysisStatus;
  stale?: boolean;
  stageLabel?: string | null;
}) {
  if (stale) {
    return (
      <span className="inline-flex items-center gap-2 text-warn" title="This run has stopped responding">
        <PendingDot />
        stale
      </span>
    );
  }

  switch (status) {
    case "complete":
      return (
        <span className="inline-flex items-center gap-2 text-foreground">
          <DoneDot />
          complete
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-2 text-foreground">
          <FailedMark />
          failed
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center gap-2 text-muted">
          <FailedMark />
          cancelled
        </span>
      );
    case "queued":
      return (
        <span className="inline-flex items-center gap-2 text-muted">
          <PendingDot />
          queued
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-2 text-foreground">
          <RunningDot />
          running
          {stageLabel && <span className="text-subtle">· {stageLabel}</span>}
        </span>
      );
  }
}
