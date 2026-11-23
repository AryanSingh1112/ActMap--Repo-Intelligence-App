import "../scripts/load-env";

import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { Client } from "langsmith";

import { createSupabaseServiceClient } from "../lib/supabase/service";
import { parseGitHubUrl } from "../lib/pipeline/github";
import { tracingStatus } from "../lib/ai/client";

export const DATASETS = path.join(process.cwd(), "evals", "datasets");

export function service() {
  return createSupabaseServiceClient();
}

export type AnalysisRef = { id: string; organizationId: string; commitSha: string | null; owner: string; repo: string };

/** Every completed analysis, as the service client sees them. Evals read stored data, never write it. */
export async function completedAnalyses(): Promise<AnalysisRef[]> {
  const { data, error } = await service()
    .from("analyses")
    .select("id, organization_id, commit_sha, project:projects ( repository_url )")
    .eq("status", "complete")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).flatMap((row) => {
    const project = Array.isArray(row.project) ? row.project[0] : row.project;
    const reference = parseGitHubUrl(project?.repository_url ?? "");
    return reference
      ? [{ id: row.id, organizationId: row.organization_id, commitSha: row.commit_sha, owner: reference.owner, repo: reference.repo }]
      : [];
  });
}

export function requireLangSmith(): Client {
  const status = tracingStatus();
  if (!status.enabled) throw new Error(`${status.reason} Experiments are recorded in LangSmith, so set LANGSMITH_API_KEY.`);
  return new Client({ apiKey: process.env.LANGSMITH_API_KEY });
}

export async function saveDataset(name: string, rows: unknown[]) {
  await mkdir(DATASETS, { recursive: true });
  await writeFile(path.join(DATASETS, `${name}.json`), JSON.stringify(rows, null, 2));
}

export async function loadDataset<T>(name: string): Promise<T[]> {
  try {
    return JSON.parse(await readFile(path.join(DATASETS, `${name}.json`), "utf8")) as T[];
  } catch {
    throw new Error(`evals/datasets/${name}.json is missing. Build it first (see the npm scripts in package.json).`);
  }
}

/** Replaces a LangSmith dataset's examples with these, so a rebuilt dataset is not appended to. */
export async function uploadDataset(
  client: Client,
  name: string,
  description: string,
  examples: { inputs: Record<string, unknown>; outputs?: Record<string, unknown>; metadata?: Record<string, unknown> }[],
) {
  if (await client.hasDataset({ datasetName: name })) await client.deleteDataset({ datasetName: name });
  const dataset = await client.createDataset(name, { description });
  await client.createExamples(
    examples.map((example) => ({
      inputs: example.inputs,
      outputs: example.outputs,
      metadata: example.metadata,
      dataset_id: dataset.id,
    })),
  );
}

export function mean(values: number[]): number {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}
