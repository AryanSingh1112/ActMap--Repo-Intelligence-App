import { completedAnalyses, requireLangSmith, saveDataset, service, uploadDataset } from "./lib";
import { buildClassifyInput } from "../lib/ai/context";
import { loadGraph } from "../lib/ai/graph";
import { roleOfLabel } from "../lib/ai/roles";

/**
 * Builds the held-out role set.
 *
 * Convention assigns roles it can be certain of, and those files never reach
 * the model in normal operation, so they have real ground truth. Only files
 * whose conventional role is one the classifier may return are kept: scoring
 * it on a question it is forbidden to answer would measure nothing. The role
 * is hidden from the input; it is only the expected answer.
 */
const MINIMUM = 30;

async function main() {
  const seen = new Set<string>();
  const examples: { inputs: Record<string, unknown>; outputs: { role: string }; metadata: Record<string, unknown> }[] = [];

  for (const analysis of await completedAnalyses()) {
    const graph = await loadGraph(service(), analysis.id);

    for (const file of graph.files) {
      const role = roleOfLabel(file.role);
      const key = `${analysis.owner}/${analysis.repo}:${file.path}:${file.hash}`;
      if (!role || seen.has(key)) continue;
      seen.add(key);

      examples.push({
        inputs: buildClassifyInput(graph, file.path)! as unknown as Record<string, unknown>,
        outputs: { role },
        metadata: { repo: `${analysis.owner}/${analysis.repo}` },
      });
    }
  }

  const byRole: Record<string, number> = {};
  for (const example of examples) byRole[example.outputs.role] = (byRole[example.outputs.role] ?? 0) + 1;
  console.log(`Held-out files: ${examples.length}`, byRole);

  if (examples.length < MINIMUM) {
    throw new Error(
      `Only ${examples.length} files have a conventional role the classifier may return; at least ${MINIMUM} are needed. Analyse a few more repositories (layered Express or NestJS projects work well).`,
    );
  }

  await saveDataset("roles", examples);
  await uploadDataset(requireLangSmith(), "actmap-roles", "Files with a conventional role, role hidden. Ground truth for the classifier.", examples);
  console.log("Saved evals/datasets/roles.json and uploaded the actmap-roles dataset.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
