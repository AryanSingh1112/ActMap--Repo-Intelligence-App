"use client";

import { useTransition } from "react";

import { rerunAnalysis } from "../../app/(workspace)/actions";

import { secondaryButton } from "./analysis-header";

/**
 * Re-running is a deliberate act taken from an existing analysis. It reuses
 * the same row, so pasting a URL never creates a second analysis.
 */
export function RerunButton({ analysisId }: { analysisId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => rerunAnalysis(analysisId))}
      className={secondaryButton}
    >
      {pending ? "Starting…" : "Re-run"}
    </button>
  );
}
