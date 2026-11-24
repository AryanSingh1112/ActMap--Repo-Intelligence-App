import { evaluate } from "langsmith/evaluation";

import { loadDataset, mean, requireLangSmith, completedAnalyses, uploadDataset } from "./lib";
import {
  declinedBriefly,
  hedges,
  invented,
  lookedUp,
  noHedging,
  noInventedPaths,
  noPlumbingLeak,
  plumbingLeaks,
  type Turn,
} from "./agent-scorers";
import { mintCredential } from "../lib/agent/credential";
import { loadForCredential } from "../lib/agent/load";
import { relayRun } from "../lib/agent/stream";
import { agentClient } from "../lib/agent/stream";

type Example = { inputs: { question: string }; outputs: { kind: "answerable" | "decline" } };

/**
 * Does the agent behave? Every question is asked of the real agent over its
 * real API, against one stored analysis. Scores are deterministic:
 *   looked_up        made at least one lookup before replying (every question)
 *   no_plumbing_leak never named a tool, credential, token, thread or service
 *   no_hedging       never said probably / likely / typically
 *   no_invented_path every path in inline code is a real file or route
 *   declined_briefly (decline questions) said no, briefly. A heuristic, labelled as one.
 *
 * Needs: the web app (npm run dev) and the agent (npm run agent) running.
 * Pass --analysis=<id> to choose the analysis; the newest complete one is the default.
 */
async function main() {
  requireLangSmith();

  const wanted = process.argv.find((a) => a.startsWith("--analysis="))?.split("=")[1];
  const analyses = await completedAnalyses();
  const analysis = wanted ? analyses.find((a) => a.id === wanted) : analyses[0];
  if (!analysis) throw new Error("No complete analysis found. Analyse a repository in the app first.");

  const credential = { analysisId: analysis.id, organizationId: analysis.organizationId, expiresAt: 0 };
  const data = await loadForCredential(credential);
  if (!data) throw new Error("That analysis could not be loaded.");

  const files = new Set(data.files.map((f) => f.path));
  const routes = data.routes.map((r) => r.pattern);

  try {
    const response = await fetch(`${process.env.AGENT_URL ?? "http://localhost:2024"}/ok`);
    if (!response.ok) throw new Error();
  } catch {
    throw new Error("The agent isn't running. Start it with: npm run agent");
  }

  const examples = await loadDataset<Example>("agent-questions");
  const client = requireLangSmith();
  await uploadDataset(
    client,
    "actmap-agent",
    "Questions the repository agent must answer from lookups, or decline.",
    examples.map((e) => ({ inputs: e.inputs, outputs: e.outputs })),
  );

  const results = await evaluate(
    async (inputs: Record<string, unknown>) => {
      // A fresh thread per question, so one answer cannot leak into the next.
      const thread = await agentClient().threads.create({ metadata: { analysisId: analysis.id, organizationId: analysis.organizationId } });
      let text = "";
      const toolCalls: string[] = [];

      for await (const event of relayRun(thread.thread_id, String(inputs.question), mintCredential(analysis.id, analysis.organizationId))) {
        if (event.type === "text") text += event.text;
        if (event.type === "tool") toolCalls.push(event.name);
      }

      const turn: Turn = { text, toolCalls };
      return { text, toolCalls, leaks: plumbingLeaks(turn), hedges: hedges(turn), invented: invented(turn, files, routes) };
    },
    {
      data: "actmap-agent",
      experimentPrefix: "agent-behaviour",
      maxConcurrency: 1,
      metadata: { analysis: `${analysis.owner}/${analysis.repo}`, model: process.env.ACTMAP_AI_MODEL },
      evaluators: [
        ({ outputs }: { outputs?: Record<string, unknown> }) => ({ key: "looked_up", score: lookedUp(outputs as unknown as Turn) }),
        ({ outputs }: { outputs?: Record<string, unknown> }) => ({ key: "no_plumbing_leak", score: noPlumbingLeak(outputs as unknown as Turn) }),
        ({ outputs }: { outputs?: Record<string, unknown> }) => ({ key: "no_hedging", score: noHedging(outputs as unknown as Turn) }),
        ({ outputs }: { outputs?: Record<string, unknown> }) => ({
          key: "no_invented_path",
          score: noInventedPaths(outputs as unknown as Turn, files, routes),
        }),
        ({ outputs, referenceOutputs }: { outputs?: Record<string, unknown>; referenceOutputs?: Record<string, unknown> }) =>
          referenceOutputs?.kind === "decline"
            ? { key: "declined_briefly", score: declinedBriefly(outputs as unknown as Turn) }
            : { key: "declined_briefly", score: 1 },
      ],
    },
  );

  const by = (key: string) =>
    results.results.flatMap((row) => row.evaluationResults.results.filter((r) => r.key === key).map((r) => Number(r.score)));

  console.log(`\nAgent behaviour on ${analysis.owner}/${analysis.repo}, ${examples.length} questions:`);
  for (const key of ["looked_up", "no_plumbing_leak", "no_hedging", "no_invented_path", "declined_briefly"]) {
    const scores = by(key);
    console.log(`  ${key.padEnd(18)} ${(mean(scores) * 100).toFixed(0)}%  (${scores.filter((s) => s === 1).length}/${scores.length})`);
  }
  console.log(`Experiment: ${results.experimentName}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
