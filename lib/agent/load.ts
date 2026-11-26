import "server-only";

import { createSupabaseServiceClient } from "../supabase/service";
import { loadRepositoryData } from "../actmap/load";
import { splitRepositoryName } from "../pipeline/stages";

import type { RepositoryData } from "../../types/actmap";
import type { Credential } from "./credential";

// Service client bypasses RLS (Clerk tokens aren't accepted by Supabase), so scoping is explicit:
// the analysis must belong to the credential's org, be complete, and every query filters by its id.
const TTL_MS = 60_000;
const cache = new Map<string, { at: number; data: RepositoryData }>();

export async function loadForCredential(credential: Credential): Promise<RepositoryData | null> {
  const key = `${credential.organizationId}:${credential.analysisId}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data;

  const supabase = createSupabaseServiceClient();

  const { data: row, error } = await supabase
    .from("analyses")
    .select("id, status, commit_sha, coverage, stats, project:projects ( name, repository_url )")
    .eq("id", credential.analysisId)
    .eq("organization_id", credential.organizationId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!row || row.status !== "complete") return null;

  const project = Array.isArray(row.project) ? row.project[0] : row.project;
  const { repo } = splitRepositoryName(project?.repository_url ?? "", project?.name ?? "unknown");
  const stats = (row.stats ?? {}) as { adapter?: string; detection?: { confidence: string; evidence: string[] } };

  const data = await loadRepositoryData(supabase, {
    analysisId: row.id,
    name: repo,
    commitSha: row.commit_sha,
    adapter: stats.adapter ?? "generic",
    coverage: row.coverage,
    detection: stats.detection ?? null,
  });


  cache.set(key, { at: Date.now(), data });
  if (cache.size > 20) cache.delete(cache.keys().next().value as string);

  return data;
}
