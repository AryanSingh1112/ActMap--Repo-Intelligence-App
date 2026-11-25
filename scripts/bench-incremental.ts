/**
 * Re-analysis latency with the extraction cache, and proof it changes nothing:
 *   1. cold parse (fills the cache)
 *   2. re-parse, nothing changed
 *   3. edit one file, re-parse with the cache, and re-parse from scratch
 * The cached result must equal the from-scratch result exactly.
 *   npx tsx scripts/bench-incremental.ts <repoPath> <fileToEdit>
 */
import assert from "node:assert/strict";
import { appendFile, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { performance } from "node:perf_hooks";

import { parseRepository } from "../parser/src/repository-parser";

const [root, edit] = process.argv.slice(2);
if (!root || !edit) throw new Error("Usage: bench-incremental.ts <repoPath> <fileToEdit>");

const log = console.error;
async function run(cache?: Map<string, never>) {
  console.error = () => {};
  const t = performance.now();
  const map = await parseRepository({ rootPath: root, extractionCache: cache as never });
  const ms = performance.now() - t;
  console.error = log;
  return { ms, map };
}

// What a result means, independent of timestamps.
const shape = (m: Awaited<ReturnType<typeof run>>["map"]) => JSON.stringify({ s: m.statistics, e: m.edges, f: m.files.map((f) => [f.path, f.contentHash]) });

const cache = new Map<string, never>();
const cold = await run(cache);
const same = await run(cache);

const target = path.join(root, edit);
const original = await readFile(target, "utf8");
try {
  await appendFile(target, '\nimport "./__bench_new_import__";\n');
  const cachedAfterEdit = await run(cache);
  const scratchAfterEdit = await run();
  assert.equal(shape(cachedAfterEdit.map), shape(scratchAfterEdit.map), "cached result differs from a fresh parse");
  console.log(
    JSON.stringify({
      files: cold.map.statistics.filesParsed,
      coldMs: Math.round(cold.ms),
      unchangedMs: Math.round(same.ms),
      oneFileEditedCachedMs: Math.round(cachedAfterEdit.ms),
      oneFileEditedFromScratchMs: Math.round(scratchAfterEdit.ms),
      identicalToFreshParse: true,
    }),
  );
} finally {
  await writeFile(target, original);
}
