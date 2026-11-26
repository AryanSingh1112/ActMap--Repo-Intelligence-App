/**
 * Graph lookup latency on a stored repository map.
 *   npx tsx --conditions=react-server scripts/bench-graph.ts <map.json> [queries]
 * Reports: cold index build, warm p50/p95/p99 over mixed random lookups,
 * blast radius of the most-imported files, and the same lookups with the
 * index rebuilt on every call (what happens if nothing is reused).
 */
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import process from "node:process";

import { runTool, type ToolName } from "../lib/agent/tools";

const file = process.argv[2];
const queries = Number(process.argv[3] ?? 2000);
if (!file) throw new Error("Usage: bench-graph.ts <map.json> [queries]");

const m = JSON.parse(readFileSync(file, "utf8"));
const data: any = { name: "bench", commitSha: null, adapter: m.framework, detection: null, files: m.files, edges: m.edges, coverage: null, routes: m.routes, rolesLabelled: false };

// Deterministic pseudo-random so every run asks the same questions.
let seed = 12345;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
const pickFile = () => m.files[Math.floor(rnd() * m.files.length)].path as string;
const tokens = ["index", "service", "util", "test", "config", "view", "model", "common"];

type Q = [ToolName, Record<string, unknown>];
const mixed = (): Q => {
  const r = rnd();
  if (r < 0.3) return ["neighbours", { path: pickFile() }];
  if (r < 0.6) return ["walk", { path: pickFile(), direction: rnd() < 0.5 ? "incoming" : "outgoing", max_depth: 3 }];
  if (r < 0.9) return ["search", { query: tokens[Math.floor(rnd() * tokens.length)] }];
  return ["summary", {}];
};

const quiet = console.log;
const time = (fn: () => void) => {
  const t = performance.now();
  fn();
  return performance.now() - t;
};
const pct = (values: number[], p: number) => [...values].sort((a, b) => a - b)[Math.min(values.length - 1, Math.floor((p / 100) * values.length))];
const fmt = (n: number) => n.toFixed(n < 10 ? 2 : 0);

// Silence the tool's own debug logging so it cannot distort timing.
console.log = () => {};
const cold = time(() => runTool("summary", {}, data));
const warm: number[] = [];
for (let i = 0; i < queries; i++) {
  const [name, input] = mixed();
  warm.push(time(() => runTool(name, input, data)));
}

const top = [...m.files].sort((a: any, b: any) => b.fanIn - a.fanIn).slice(0, 5);
const blast = top.map((f: any) => {
  let total = 0;
  const ms = time(() => {
    const r: any = runTool("walk", { path: f.path, direction: "incoming", max_depth: 5 }, data);
    total = r.body.total;
  });
  return { path: f.path, directImporters: f.fanIn, reached: total, ms };
});

// Same questions, index rebuilt on every call: a fresh object defeats the cache.
const rebuilt: number[] = [];
seed = 12345;
for (let i = 0; i < 25; i++) {
  const [name, input] = mixed();
  rebuilt.push(time(() => runTool(name, input, { ...data })));
}
console.log = quiet;

console.log(
  JSON.stringify({
    files: m.files.length,
    edges: m.edges.length,
    queries,
    coldIndexMs: Math.round(cold),
    warmMs: { p50: +fmt(pct(warm, 50)), p95: +fmt(pct(warm, 95)), p99: +fmt(pct(warm, 99)), max: +fmt(Math.max(...warm)) },
    blastRadius: blast.map((b) => ({ ...b, ms: +fmt(b.ms) })),
    noReuseMs: { p50: +fmt(pct(rebuilt, 50)), p95: +fmt(pct(rebuilt, 95)), n: rebuilt.length },
    heapMB: Math.round(process.memoryUsage().heapUsed / 1048576),
  }),
);
