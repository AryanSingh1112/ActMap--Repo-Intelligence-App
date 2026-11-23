import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import Explorer from "../../../../components/actmap/Explorer";
import { AnalysisHeader } from "../../../../components/analysis/analysis-header";
import { AnalysisProgress } from "../../../../components/analysis/analysis-progress";
import { RerunButton } from "../../../../components/analysis/rerun-button";
import { aiStatus } from "../../../../lib/ai/status";
import { loadRepositoryData } from "../../../../lib/actmap/load";
import { splitRepositoryName, type AnalysisStatus, type StageId } from "../../../../lib/pipeline/stages";
import { createSupabaseServerClient } from "../../../../lib/supabase/server";

import type { CoverageSummary } from "../../../../types/actmap";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="h-8 w-72 rounded-lg bg-surface-2" />
      <div className="h-6 w-56 rounded-lg bg-surface-2" />
      <div className="h-6 w-64 rounded-lg bg-surface-2" />
    </div>
  );
}

type AnalysisRecord = {
  id: string;
  status: AnalysisStatus;
  stage: StageId | null;
  stage_message: string | null;
  failed_stage: StageId | null;
  error_message: string | null;
  commit_sha: string | null;
  summary: string | null;
  coverage: CoverageSummary | null;
  stats: {
    adapter?: string;
    detection?: { confidence: string; evidence: string[] };
    rolesLabelled?: unknown;
  } | null;
  updated_at: string | null;
  project: { name: string; repository_url: string } | null;
};

async function Analysis({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!UUID.test(id)) notFound();

  const { orgId } = await auth();
  if (!orgId) redirect("/workspace");

  const supabase = await createSupabaseServerClient();

  // Row-level security decides whether this analysis is visible at all. One
  // that belongs to another organization comes back empty, same as a bad id.
  const { data, error } = await supabase
    .from("analyses")
    .select(
      `
      id,
      status,
      stage,
      stage_message,
      failed_stage,
      error_message,
      commit_sha,
      summary,
      coverage,
      stats,
      updated_at,
      project:projects ( name, repository_url )
    `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load analysis:", error.code, error.message, error.details, error.hint);

    return (
      <div className="p-6">
        <p className="font-medium text-bad">Unable to load this analysis</p>
        <p className="mt-1 text-sm text-muted">Refresh and try again.</p>
      </div>
    );
  }

  if (!data) notFound();

  const row = {
    ...data,
    project: Array.isArray(data.project) ? (data.project[0] ?? null) : data.project,
  } as unknown as AnalysisRecord;

  const { owner, repo } = splitRepositoryName(
    row.project?.repository_url ?? "",
    row.project?.name ?? "unknown",
  );

  if (row.status !== "complete") {
    return (
      <AnalysisProgress
        // A re-run changes the row, so the progress view starts fresh.
        key={`${row.id}:${row.status}:${row.updated_at}`}
        analysisId={row.id}
        owner={owner}
        repo={repo}
        initial={{
          status: row.status,
          stage: row.stage,
          message: row.status === "failed" ? row.error_message : row.stage_message,
          failed_stage: row.failed_stage,
          updated_at: row.updated_at,
        }}
      />
    );
  }

  let repositoryData;

  try {
    repositoryData = await loadRepositoryData(supabase, {
      analysisId: row.id,
      name: repo,
      commitSha: row.commit_sha,
      adapter: row.stats?.adapter ?? "generic",
      detection: row.stats?.detection ?? null,
      coverage: row.coverage,
      rolesLabelled: Boolean(row.stats?.rolesLabelled),
    });
  } catch (loadError) {
    console.error("Failed to load the stored map:", loadError);

    return (
      <div className="flex h-full min-h-0 flex-col">
        <AnalysisHeader
          owner={owner}
          repo={repo}
          actions={<RerunButton analysisId={row.id} />}
        />

        <div className="p-6">
          <p className="font-medium text-bad">The stored map could not be read</p>
          <p className="mt-1 text-sm text-muted">
            Refresh, or re-run the analysis to store it again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <AnalysisHeader
        owner={owner}
        repo={repo}
        meta={
          row.commit_sha && (
            <span
              className="font-mono text-[18px] text-muted"
              title={`Analysed at commit ${row.commit_sha}`}
            >
              {row.commit_sha.slice(0, 7)}
            </span>
          )
        }
        actions={<RerunButton analysisId={row.id} />}
      />

      <Explorer data={repositoryData} analysisId={row.id} ai={aiStatus()} />
    </div>
  );
}

export default function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<Skeleton />}>
      <Analysis params={params} />
    </Suspense>
  );
}
