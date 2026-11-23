// Shared by server and browser code. No server-only imports here.

export const STAGES = [
  { id: "fetch", label: "Fetch archive" },
  { id: "select", label: "Select files" },
  { id: "parse", label: "Parse imports" },
  { id: "store", label: "Store map" },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

export type AnalysisStatus =
  | "queued"
  | "parsing"
  | "running"
  | "complete"
  | "failed"
  | "cancelled";

export type ProgressEvent = {
  status: AnalysisStatus;
  stage: StageId | null;
  message: string | null;
  failed_stage: StageId | null;
};

export const STALE_AFTER_MS = 5 * 60 * 1000;

export function isUnfinished(status: AnalysisStatus): boolean {
  return status === "queued" || status === "parsing" || status === "running";
}

/**
 * An unfinished run that has not moved for a few minutes is abandoned,
 * not working. Nothing here has a queue or a timeout, so this is how the
 * difference stays visible.
 */
export function isStale(
  status: AnalysisStatus,
  updatedAt: string | null,
  now: number = Date.now(),
): boolean {
  if (!isUnfinished(status) || !updatedAt) return false;

  const timestamp = new Date(updatedAt).getTime();
  if (Number.isNaN(timestamp)) return false;

  return now - timestamp > STALE_AFTER_MS;
}

export function stageIndex(stage: StageId | null): number {
  if (!stage) return -1;
  return STAGES.findIndex((item) => item.id === stage);
}

export function splitRepositoryName(repositoryUrl: string, fallback: string) {
  try {
    const parts = new URL(repositoryUrl).pathname.split("/").filter(Boolean);

    if (parts.length >= 2) {
      return {
        owner: parts[0],
        repo: parts[1].replace(/\.git$/, ""),
      };
    }
  } catch {
    // Fall through to the stored project name.
  }

  const [owner, repo] = fallback.includes("/")
    ? fallback.split("/")
    : ["", fallback];

  return { owner: owner ?? "", repo: repo ?? fallback };
}