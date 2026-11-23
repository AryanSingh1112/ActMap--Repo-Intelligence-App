import { evaluate } from "langsmith/evaluation";

import { loadDataset, mean, requireLangSmith } from "./lib";
import { complete } from "../lib/ai/client";
import { pinnedModel } from "../lib/ai/config";
import { CLASSIFY_SCHEMA, classifyRolePrompt } from "../lib/ai/prompts/classify-role";
import { parseRoles } from "../lib/ai/service";
import type { ClassifyFileInput } from "../lib/ai/types";

type Example = { inputs: ClassifyFileInput; outputs: { role: string } };

/** Hide the role, ask the model, compare with convention. Reports a percentage. */
async function main() {
  requireLangSmith();
  const examples = await loadDataset<Example>("roles");
  const model = pinnedModel();

  const results = await evaluate(
    async (inputs: Record<string, unknown>) => {
      const file = inputs as unknown as ClassifyFileInput;
      const { text } = await complete({
        model,
        system: classifyRolePrompt.system,
        user: classifyRolePrompt.user([file]),
        schema: CLASSIFY_SCHEMA as never,
      });

      return { role: parseRoles(text, new Set([file.path])).get(file.path) ?? "other" };
    },
    {
      data: "actmap-roles",
      experimentPrefix: `roles-${model}`,
      maxConcurrency: 2,
      metadata: { model, promptVersion: classifyRolePrompt.version },
      evaluators: [
        ({ outputs, referenceOutputs }: { outputs?: Record<string, unknown>; referenceOutputs?: Record<string, unknown> }) => ({
          key: "role_correct",
          score: outputs?.role === referenceOutputs?.role ? 1 : 0,
        }),
      ],
    },
  );

  const scores = results.results.flatMap((row) =>
    row.evaluationResults.results.filter((r) => r.key === "role_correct").map((r) => Number(r.score)),
  );

  console.log(`\nRole accuracy: ${(mean(scores) * 100).toFixed(1)}%  over ${scores.length} files (dataset has ${examples.length})`);
  console.log(`Model ${model}, prompt ${classifyRolePrompt.version}. Experiment: ${results.experimentName}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
