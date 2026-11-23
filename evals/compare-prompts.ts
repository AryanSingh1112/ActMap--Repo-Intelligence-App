import { evaluate } from "langsmith/evaluation";

import { loadDataset, mean, requireLangSmith } from "./lib";
import { complete } from "../lib/ai/client";
import { pinnedModel } from "../lib/ai/config";
import { checkPaths } from "../lib/ai/paths";
import { explainFilePrompt } from "../lib/ai/prompts/explain-file";
import { shownPaths, type ExplainFileInput, type Prompt } from "../lib/ai/types";
import { explainFileV1 } from "./prompts/explain-file.v1";

/**
 * Two prompt versions over the same dataset, as two separate experiments.
 *
 * invented_paths is deterministic code: exact, no model involved.
 * specificity is a MODEL acting as judge. It has to be: "is this specific
 * enough to be useful" has no exact answer. Treat that number as softer than
 * the other one. It is a judgement from a model, and a different judge could
 * score differently.
 */
const JUDGE_SYSTEM = `You grade an explanation of a source file written for a developer. Score how specific and useful it is, from 1 to 5.
5: names real functions or data from the source, says why neighbouring files depend on it, and teaches something not obvious from the file name.
3: correct but general; could describe many similar files.
1: vague, repeats the file name, or says little.
Do not reward length. Answer with JSON only: {"score": <1-5>, "reason": "<one sentence>"}.`;

async function judge(input: ExplainFileInput, answer: string) {
  const { text } = await complete({
    model: process.env.ACTMAP_JUDGE_MODEL?.trim() || pinnedModel(),
    system: JUDGE_SYSTEM,
    user: `File: ${input.path}\n\nSource:\n${input.source.slice(0, 12000)}\n\nExplanation to grade:\n${answer}`,
  });

  const parsed = JSON.parse(text.replace(/^```(?:json)?|```$/gm, "").trim()) as { score: number; reason?: string };
  return { score: Math.min(5, Math.max(1, Number(parsed.score))), reason: parsed.reason };
}

async function runVersion(prompt: Prompt<ExplainFileInput>, model: string) {
  const results = await evaluate(
    async (inputs: Record<string, unknown>) => {
      const input = inputs as unknown as ExplainFileInput;
      const { text } = await complete({ model, system: prompt.system, user: prompt.user(input) });
      return { text };
    },
    {
      data: "actmap-explain",
      experimentPrefix: prompt.version.replace("@", "-"),
      maxConcurrency: 2,
      metadata: { promptVersion: prompt.version, model },
      evaluators: [
        ({ inputs, outputs }: { inputs?: Record<string, unknown>; outputs?: Record<string, unknown> }) => {
          const result = checkPaths(String(outputs?.text ?? ""), shownPaths(inputs as unknown as ExplainFileInput));
          return {
            key: "invented_paths",
            score: result.score,
            comment: result.invented.length ? `invented: ${result.invented.join(", ")}` : undefined,
          };
        },
        async ({ inputs, outputs }: { inputs?: Record<string, unknown>; outputs?: Record<string, unknown> }) => {
          const verdict = await judge(inputs as unknown as ExplainFileInput, String(outputs?.text ?? ""));
          return { key: "specificity_model_judged", score: verdict.score, comment: verdict.reason };
        },
      ],
    },
  );

  const byKey = (key: string) =>
    results.results.map((row) => row.evaluationResults.results.find((r) => r.key === key)?.score).map((s) => Number(s ?? NaN));

  return { name: results.experimentName, invented: byKey("invented_paths"), specificity: byKey("specificity_model_judged") };
}

function stats(values: number[]) {
  const m = mean(values);
  const variance = values.length > 1 ? values.reduce((a, v) => a + (v - m) ** 2, 0) / (values.length - 1) : 0;
  return { mean: m, sem: Math.sqrt(variance / Math.max(values.length, 1)) };
}

async function main() {
  requireLangSmith();
  const model = pinnedModel();
  const examples = await loadDataset("explain");

  const old = await runVersion(explainFileV1, model);
  const current = await runVersion(explainFilePrompt, model);

  const pairs = old.specificity.map((value, index) => current.specificity[index] - value).filter((d) => Number.isFinite(d));
  const diff = stats(pairs);
  const cleanRate = (values: number[]) => (mean(values.filter(Number.isFinite)) * 100).toFixed(1);

  console.log(`\nSame ${examples.length} files, same model (${model}), two prompts\n`);
  console.log("                         v1 (retired)   v2 (current)");
  console.log(`invented-path clean      ${cleanRate(old.invented).padStart(8)}%     ${cleanRate(current.invented).padStart(8)}%   exact`);
  console.log(
    `specificity (1-5)        ${stats(old.specificity).mean.toFixed(2).padStart(9)}     ${stats(current.specificity).mean.toFixed(2).padStart(9)}   model-judged`,
  );

  const better = diff.mean > 0 ? "v2 (current)" : diff.mean < 0 ? "v1 (retired)" : "neither";
  const clear = Math.abs(diff.mean) > 2 * diff.sem;

  console.log(
    `\nOn specificity ${better} is better by ${Math.abs(diff.mean).toFixed(2)} points (± ${diff.sem.toFixed(2)} standard error over ${pairs.length} paired files).` +
      (clear ? "" : " That gap is within the noise, so it is not a clear difference."),
  );
  console.log("Specificity comes from a model acting as judge, because it has no exact answer. The invented-path number is exact code.");
  console.log(`\nExperiments: ${old.name}, ${current.name} (compare them side by side in LangSmith > Datasets & Experiments)`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
