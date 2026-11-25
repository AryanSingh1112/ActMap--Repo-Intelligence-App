/**
 * Interleaved before/after parser benchmark. Alternates BASE and HEAD runs so
 * machine drift hits both equally, and reports the median of each.
 *   BASE=/path/to/old/checkout npx tsx scripts/bench-compare.ts <runs> <repo...>
 */
import { execFileSync } from "node:child_process";
import process from "node:process";

const BASE = process.env.BASE;
if (!BASE) throw new Error("Set BASE to the checkout to compare against.");
const [runsArg, ...repos] = process.argv.slice(2);
const runs = Number(runsArg);

type Run = { ms: number; files: number; loc: number; imports: number; edges: number; resolved: number; external: number; unresolved: number; heapMB: number; peakRssMB: number };

function once(cwd: string, repo: string): Run {
  const out = execFileSync("npx", ["tsx", "scripts/bench-parse.ts", repo], { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 1 << 28 });
  return JSON.parse(out.trim().split("\n").pop()!) as Run;
}

const median = (values: number[]) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

for (const repo of repos) {
  const before: Run[] = [];
  const after: Run[] = [];
  for (let i = 0; i < runs; i++) {
    before.push(once(BASE, repo));
    after.push(once(process.cwd(), repo));
  }
  const pick = (rows: Run[], key: keyof Run) => median(rows.map((r) => r[key]));
  console.log(
    JSON.stringify({
      repo,
      runs,
      before: { ms: before.map((r) => r.ms), medianMs: pick(before, "ms"), edges: before[0].edges, unresolved: before[0].unresolved, resolved: before[0].resolved, heapMB: pick(before, "heapMB"), peakRssMB: pick(before, "peakRssMB") },
      after: { ms: after.map((r) => r.ms), medianMs: pick(after, "ms"), edges: after[0].edges, unresolved: after[0].unresolved, resolved: after[0].resolved, heapMB: pick(after, "heapMB"), peakRssMB: pick(after, "peakRssMB") },
      files: after[0].files,
      loc: after[0].loc,
      imports: after[0].imports,
    }),
  );
}
