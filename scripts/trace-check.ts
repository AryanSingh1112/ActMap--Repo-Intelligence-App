import "./load-env";

import { Client } from "langsmith";
import { traceable } from "langsmith/traceable";

/**
 * Sends ONE test trace to LangSmith using the same env vars as the app,
 * then checks that LangSmith really has it.
 *
 *   npx tsx scripts/trace-check.ts
 */
async function main() {
  const key = process.env.LANGSMITH_API_KEY?.trim();
  const project = process.env.LANGSMITH_PROJECT?.trim() || "actmap";
  const tracing = process.env.LANGSMITH_TRACING?.trim();
  const endpoint = process.env.LANGSMITH_ENDPOINT?.trim() || "https://api.smith.langchain.com";

  console.log("LANGSMITH_API_KEY  :", key ? `set (${key.slice(0, 6)}…, ${key.length} chars)` : "MISSING");
  console.log("LANGSMITH_TRACING  :", tracing ?? "(not set)");
  console.log("LANGSMITH_PROJECT  :", project, process.env.LANGSMITH_PROJECT ? "" : "(default)");
  console.log("LANGSMITH_ENDPOINT :", endpoint);

  if (!key) {
    console.log("\n✗ No LANGSMITH_API_KEY. The app cannot record traces. Add it to .env.local.");
    process.exit(1);
  }

  const client = new Client({ apiKey: key, apiUrl: endpoint });

  const marker = `trace-check-${Date.now()}`;
  const run = traceable(async (text: string) => `echo: ${text}`, {
    name: "trace-check",
    run_type: "chain",
    client,
    tracingEnabled: true,
    project_name: project,
  });

  await run(marker);
  await client.awaitPendingTraceBatches();
  console.log("\nSent test run. Waiting for LangSmith to ingest it…");

  for (let i = 0; i < 10; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    try {
      for await (const r of client.listRuns({ projectName: project, limit: 5 })) {
        if (r.name === "trace-check") {
          console.log(`\n✓ Found it in project "${project}". Open LangSmith → Tracing → ${project}.`);
          return;
        }
      }
    } catch (error) {
      console.log("  (lookup failed:", error instanceof Error ? error.message : error, ")");
    }
  }

  console.log(`\n✗ Not found in "${project}". Projects this key can see:`);
  try {
    for await (const p of client.listProjects({ limit: 20 } as never)) console.log("  -", p.name);
  } catch (error) {
    console.log("  Could not list projects:", error instanceof Error ? error.message : error);
    console.log("  → The key is probably invalid, expired, or for a different workspace/region.");
  }
}

main().catch((error) => {
  console.error("\n✗ Failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});