import { completedAnalyses, service } from "./lib";
import { checkPaths } from "../lib/ai/paths";

/**
 * Runs the invented-path check over recent real explanations.
 *
 *   npm run eval:invented              score the 100 most recent
 *   npm run eval:invented -- --selftest  also splice a made-up filename into one and prove it is caught
 *
 * The check is set membership, not a model: every path-shaped token is tested
 * against the exact set of paths the model was shown. Any flag can be
 * confirmed by hand by searching the explanation for the token.
 */
async function main() {
  await completedAnalyses().catch(() => []); // fails fast if the service key is missing

  const { data, error } = await service()
    .from("explanation_cache")
    .select("kind, subject, model, prompt_version, content, allowed_paths, created_at")
    .in("kind", ["file", "folder"])
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);

  const rows = data ?? [];
  if (rows.length === 0) {
    console.log("No explanations stored yet. Click Explain in the app first.");
    return;
  }

  let clean = 0;
  let tokens = 0;
  let invented = 0;

  for (const row of rows) {
    const result = checkPaths(row.content, row.allowed_paths as string[]);
    tokens += result.checked.length;
    invented += result.invented.length;

    if (result.score === 1) {
      clean++;
      continue;
    }

    console.log(`\nFLAGGED  ${row.kind}  ${row.subject}  (${row.model}, ${row.prompt_version})`);
    for (const token of result.invented) console.log(`  invented: ${token}`);
  }

  console.log(
    `\nInvented-path score: ${((clean / rows.length) * 100).toFixed(1)}%  ` +
      `(${clean}/${rows.length} explanations clean, ${invented} invented of ${tokens} paths checked)`,
  );

  if (process.argv.includes("--selftest")) {
    const sample = rows[0];
    const spliced = `${sample.content}\n\nIt also reads \`src/services/billing-ledger.service.ts\`.`;
    const caught = checkPaths(spliced, sample.allowed_paths as string[]).invented.includes("src/services/billing-ledger.service.ts");
    console.log(`Self-test (made-up filename spliced in): ${caught ? "caught" : "MISSED"}`);
    if (!caught) process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
