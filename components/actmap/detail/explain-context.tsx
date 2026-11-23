"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

import type { AiStatus, ExplanationEntry, ExplanationResult, Staleness } from "../../../types/actmap";

type ExplainContextValue = {
  ai: AiStatus;
  analysisId: string;
  /** Every path in the repository, so a written path can be turned into a link. */
  files: { has(path: string): boolean };
  entries: Record<string, ExplanationEntry>;
  explain: (key: string, body: Record<string, unknown>, stalePaths: string[]) => void;
};

const ExplainContext = createContext<ExplainContextValue | null>(null);

export function useExplain(): ExplainContextValue {
  const value = useContext(ExplainContext);
  if (!value) throw new Error("useExplain must be used inside ExplainProvider");
  return value;
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) throw new Error(data.error ?? `Request failed (${response.status})`);
  return data;
}

/**
 * Holds every explanation fetched so far, above the panes. Selecting another
 * file unmounts the one being read, but not this, so coming back finds the
 * answer still there with no second click.
 */
export function ExplainProvider({
  analysisId,
  ai,
  files,
  children,
}: {
  analysisId: string;
  ai: AiStatus;
  files: { has(path: string): boolean };
  children: React.ReactNode;
}) {
  const [entries, setEntries] = useState<Record<string, ExplanationEntry>>({});

  const explain = useCallback(
    (key: string, body: Record<string, unknown>, stalePaths: string[]) => {
      setEntries((current) => (current[key]?.status === "loading" ? current : { ...current, [key]: { status: "loading" } }));

      const base = `/api/analyses/${analysisId}`;

      post<ExplanationResult>(`${base}/explain`, body)
        .then((result) => {
          setEntries((current) => ({ ...current, [key]: { status: "done", result, staleness: "checking" } }));

          // Is what was explained still what is in the repository?
          return post<Staleness>(`${base}/stale`, { paths: stalePaths })
            .catch((): Staleness => ({
              status: "unknown",
              analysedSha: null,
              headSha: null,
              changed: [],
              deleted: [],
              partial: false,
              reason: "Could not check the repository.",
            }))
            .then((staleness) =>
              setEntries((current) => ({ ...current, [key]: { status: "done", result, staleness } })),
            );
        })
        .catch((error: unknown) =>
          setEntries((current) => ({
            ...current,
            [key]: { status: "error", message: error instanceof Error ? error.message : "Something went wrong." },
          })),
        );
    },
    [analysisId],
  );

  const value = useMemo(
    () => ({ ai, analysisId, files, entries, explain }),
    [ai, analysisId, files, entries, explain],
  );

  return <ExplainContext.Provider value={value}>{children}</ExplainContext.Provider>;
}
