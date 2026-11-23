import { Suspense } from "react";

import {
  AnalysesTable,
  type AnalysisRow,
} from "../../../components/analysis/analyses-table";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="h-10 w-96 rounded-lg bg-surface-2" />
      <div className="h-64 rounded-lg bg-surface-2" />
    </div>
  );
}

async function Analyses() {
  const supabase = await createSupabaseServerClient();

  // Row-level security decides which organization's rows come back.
  // Never add an organization filter here.
  const { data, error } = await supabase
    .from("analyses")
    .select(
      `
      id,
      status,
      stage,
      stage_message,
      commit_sha,
      error_message,
      created_at,
      started_at,
      completed_at,
      updated_at,
      project:projects ( name, repository_url )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load analyses:", error);

    return (
      <div className="p-6">
        <p className="font-medium text-bad">Unable to load analyses</p>
        <p className="mt-1 text-sm text-muted">
          Something went wrong loading this workspace. Refresh and try again.
        </p>
      </div>
    );
  }

  const rows = (data ?? []).map((row) => ({
    ...row,
    project: Array.isArray(row.project) ? (row.project[0] ?? null) : row.project,
  })) as unknown as AnalysisRow[];

  return <AnalysesTable initial={rows} />;
}

export default function WorkspacePage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Analyses />
    </Suspense>
  );
}
