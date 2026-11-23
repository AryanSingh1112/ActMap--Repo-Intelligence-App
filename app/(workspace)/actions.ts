"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { createSupabaseServerClient } from "../../lib/supabase/server";
import { createSupabaseServiceClient } from "../../lib/supabase/service";
import { parseGitHubUrl } from "../../lib/pipeline/github";
import { runPipeline } from "../../lib/pipeline/run-pipeline";
import { isStale, splitRepositoryName, type AnalysisStatus } from "../../lib/pipeline/stages";

export type SubmitState = { error?: string } | undefined;

const UNIQUE_VIOLATION = "23505";

export async function analyseRepository(
  _previous: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const { userId, orgId, orgSlug } = await auth();

  if (!userId) return { error: "Sign in to analyse a repository." };
  if (!orgId) return { error: "Pick an organization first." };

  const reference = parseGitHubUrl(String(formData.get("url") ?? ""));

  if (!reference) {
    return {
      error: "Enter a public GitHub repository, like https://github.com/owner/repo",
    };
  }

  // Reads go through the signed-in client, so row-level security decides
  // what exists. If this organization already has this repository, take
  // the person to it rather than making a second analysis.
  const reader = await createSupabaseServerClient();

  const existingProject = await reader
    .from("projects")
    .select("id")
    .eq("repository_url", reference.url)
    .maybeSingle();

  if (existingProject.data) {
    const existing = await reader
      .from("analyses")
      .select("id")
      .eq("project_id", existingProject.data.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing.data) redirect(`/analyses/${existing.data.id}`);
  }

  const writer = createSupabaseServiceClient();

  const organization = await writer
    .from("organizations")
    .upsert(
      { id: orgId, name: orgSlug ?? orgId },
      { onConflict: "id", ignoreDuplicates: true },
    );

  if (organization.error) {
    console.error("[analyse] organization upsert failed:", organization.error);
    return { error: "Couldn't set up this organization. Try again." };
  }

  let projectId = existingProject.data?.id as string | undefined;

  if (!projectId) {
    const created = await writer
      .from("projects")
      .insert({
        organization_id: orgId,
        name: `${reference.owner}/${reference.repo}`,
        repository_url: reference.url,
        provider: "github",
        created_by: userId,
      })
      .select("id")
      .single();

    if (created.error) {
      if (created.error.code === UNIQUE_VIOLATION) {
        const again = await writer
          .from("projects")
          .select("id")
          .eq("organization_id", orgId)
          .eq("repository_url", reference.url)
          .single();

        projectId = again.data?.id;
      } else {
        console.error("[analyse] project insert failed:", created.error);
        return { error: "Couldn't save the repository. Try again." };
      }
    } else {
      projectId = created.data.id;
    }
  }

  if (!projectId) return { error: "Couldn't save the repository. Try again." };

  const analysis = await writer
    .from("analyses")
    .insert({
      organization_id: orgId,
      project_id: projectId,
      status: "queued",
      requested_by: userId,
    })
    .select("id")
    .single();

  if (analysis.error) {
    if (analysis.error.code === UNIQUE_VIOLATION) {
      const winner = await writer
        .from("analyses")
        .select("id")
        .eq("organization_id", orgId)
        .eq("project_id", projectId)
        .limit(1)
        .single();

      if (winner.data) redirect(`/analyses/${winner.data.id}`);
    }

    console.error("[analyse] analysis insert failed:", analysis.error);
    return { error: "Couldn't start the analysis. Try again." };
  }

  const analysisId = analysis.data.id as string;

  after(() =>
    runPipeline({
      analysisId,
      organizationId: orgId,
      owner: reference.owner,
      repo: reference.repo,
    }),
  );

  redirect(`/analyses/${analysisId}`);
}

/**
 * Re-running is a deliberate act taken from an existing analysis. It reuses
 * the same row, so there is still exactly one analysis per repository.
 */
export async function rerunAnalysis(analysisId: string): Promise<void> {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) redirect("/workspace");

  // Row-level security proves this analysis belongs to the signed-in organization.
  const reader = await createSupabaseServerClient();

  const { data } = await reader
    .from("analyses")
    .select("id, status, updated_at, project:projects(name, repository_url)")
    .eq("id", analysisId)
    .maybeSingle();

  if (!data) redirect("/workspace");

  const status = data.status as AnalysisStatus;

  const project = (Array.isArray(data.project) ? data.project[0] : data.project) as
    | { name: string; repository_url: string }
    | null;

  const running = status === "running" || status === "parsing" || status === "queued";

  if (running && !isStale(status, data.updated_at)) {
    redirect(`/analyses/${analysisId}`);
  }

  if (!project) redirect(`/analyses/${analysisId}`);

  const { owner, repo } = splitRepositoryName(project.repository_url, project.name);

  const writer = createSupabaseServiceClient();

  const reset = await writer
    .from("analyses")
    .update({
      status: "queued",
      stage: null,
      stage_message: null,
      failed_stage: null,
      error_message: null,
      completed_at: null,
    })
    .eq("id", analysisId)
    .eq("organization_id", orgId);

  if (reset.error) {
    console.error("[rerun] reset failed:", reset.error);
    redirect(`/analyses/${analysisId}`);
  }

  after(() => runPipeline({ analysisId, organizationId: orgId, owner, repo }));

  redirect(`/analyses/${analysisId}`);
}
