"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export type Labelling = "idle" | "running" | "failed";

// One attempt per analysis per page load, even under React's double effects.
const attempted = new Set<string>();

/**
 * Files no adapter could identify are labelled by a model, once. When it
 * finishes the page is refreshed so the new roles appear on the map.
 */
export function useRoleLabelling(options: { analysisId: string; needed: boolean; enabled: boolean }): Labelling {
  const { analysisId, needed, enabled } = options;
  const router = useRouter();
  const [state, setState] = useState<Labelling>("idle");

  useEffect(() => {
    if (!needed || !enabled || attempted.has(analysisId)) return;
    attempted.add(analysisId);
    setState("running");

    fetch(`/api/analyses/${analysisId}/roles`, { method: "POST" })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        setState("idle");
        router.refresh();
      })
      .catch(() => setState("failed"));
  }, [analysisId, needed, enabled, router]);

  return state;
}
