/**
 * One parse of one repository, in a fresh process, printed as a single JSON line.
 * Run it several times and take the median; one run is noise.
 *   npx tsx scripts/bench-parse.ts <repoPath>
 * Console timing lines from the parser go to stderr and are ignored here.
 */
import process from "node:process";
import { performance } from "node:perf_hooks";

import { parseRepository } from "../parser/src/repository-parser";

async function main() {
  const root = process.argv[2];
  if (!root) throw new Error("Usage: bench-parse.ts <repoPath>");

  const started = performance.now();
  const map = await parseRepository({ rootPath: root });
  const ms = performance.now() - started;

  const s = map.statistics;
  const loc = map.files.reduce((sum, file) => sum + file.lineCount, 0);

  console.log(
    JSON.stringify({
      ms: Math.round(ms),
      files: s.filesParsed,
      loc,
      imports: s.importsFound,
      edges: s.edgesCreated,
      resolved: s.resolvedImports,
      external: s.externalImports,
      unresolved: s.unresolvedImports,
      heapMB: Math.round(process.memoryUsage().heapUsed / 1048576),
      peakRssMB: Math.round(process.resourceUsage().maxRSS / 1024),
    }),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
