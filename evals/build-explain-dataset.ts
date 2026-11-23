import { completedAnalyses, requireLangSmith, saveDataset, service, uploadDataset } from "./lib";
import { buildFileInput } from "../lib/ai/context";
import { loadGraph } from "../lib/ai/graph";
import { fetchSource } from "../lib/ai/source";

/**
 * The files both prompt versions are run over: ones with neighbours on both
 * sides, so there is something to be specific about. Source is fetched once
 * and stored, so the two experiments see byte-identical inputs.
 */
const PER_REPOSITORY = 8;
const TOTAL = 24;

async function main() {
  const examples: { inputs: Record<string, unknown>; metadata: Record<string, unknown> }[] = [];
  const seenRepos = new Set<string>();

  for (const analysis of await completedAnalyses()) {
    const repo = `${analysis.owner}/${analysis.repo}`;
    if (seenRepos.has(repo) || examples.length >= TOTAL) continue;
    seenRepos.add(repo);

    const graph = await loadGraph(service(), analysis.id);

    const candidates = graph.files
      .filter((file) => (graph.imports.get(file.path)?.length ?? 0) > 0 && (graph.importedBy.get(file.path)?.length ?? 0) > 0)
      .filter((file) => /\.(ts|tsx|js|jsx|py|go|rb|java)$/.test(file.path))
      .sort((a, b) => (graph.importedBy.get(b.path)?.length ?? 0) - (graph.importedBy.get(a.path)?.length ?? 0))
      .slice(0, PER_REPOSITORY);

    for (const file of candidates) {
      if (examples.length >= TOTAL) break;

      try {
        const source = await fetchSource({ owner: analysis.owner, repo: analysis.repo, ref: analysis.commitSha ?? "HEAD", path: file.path });
        const built = buildFileInput(graph, file.path)!;
        examples.push({
          inputs: { ...built.input, source: source.text, truncated: source.truncated } as unknown as Record<string, unknown>,
          metadata: { repo },
        });
      } catch (error) {
        console.warn(`skipped ${file.path}: ${error instanceof Error ? error.message : error}`);
      }
    }
  }

  if (examples.length === 0) throw new Error("No analysed files with neighbours on both sides were found.");

  await saveDataset("explain", examples);
  await uploadDataset(requireLangSmith(), "actmap-explain", "Files with neighbours on both sides, for comparing explanation prompts.", examples);
  console.log(`Saved ${examples.length} files to evals/datasets/explain.json and uploaded the actmap-explain dataset.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
