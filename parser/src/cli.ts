
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { performance } from "node:perf_hooks";

import { parseRepository } from "./repository-parser";
import { serializeRepositoryMap } from "./output/repository-map-output";

interface CliOptions {
  rootPath: string;
  outputPath: string;
}

function printHelp(): void {
  console.log(`
Actmap Repository Parser

Usage:
  npm run parser -- <repository-path> [options]

Options:
  -o, --output <path>   Output JSON file
  -h, --help            Show this help message

Examples:
  npm run parser -- .
  npm run parser -- . -o "./results/map.json"
  npm run parser -- "E:\\projects\\my-app"

Output:
  stdout  Serialized repository map (JSON)
  stderr  Human-readable analysis report and errors
`);
}

function parseArguments(args: string[]): CliOptions | null {
  let rootPath: string | undefined;
  let outputPath: string | undefined;

  for (let index = 0; index < args.length; index++) {
    const argument = args[index];

    if (argument === "--help" || argument === "-h") {
      printHelp();
      return null;
    }

    if (argument === "--output" || argument === "-o") {
      const value = args[index + 1];

      if (!value || value.startsWith("-")) {
        throw new Error(`Missing output path after ${argument}.`);
      }

      outputPath = value;
      index++;
      continue;
    }

    if (argument.startsWith("-")) {
      throw new Error(`Unknown option: ${argument}`);
    }

    if (rootPath) {
      throw new Error("Only one repository path can be supplied.");
    }

    rootPath = argument;
  }

  if (!rootPath) {
    throw new Error("Repository path is required. Use --help for usage.");
  }

  const absoluteRootPath = path.resolve(rootPath);

  // Keep generated output outside the scanned repository by default.
  const absoluteOutputPath = outputPath
    ? path.resolve(outputPath)
    : `${absoluteRootPath}.actmap.json`;

  return {
    rootPath: absoluteRootPath,
    outputPath: absoluteOutputPath,
  };
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercentage(
  numerator: number,
  denominator: number,
): string {
  if (denominator === 0) {
    return "N/A";
  }

  return `${((numerator / denominator) * 100).toFixed(2)}%`;
}

function printReport(
  repositoryMap: Awaited<ReturnType<typeof parseRepository>>,
  options: CliOptions,
  analysisDurationMs: number,
  totalDurationMs: number,
  initialMemory: NodeJS.MemoryUsage,
): void {
  const finalMemory = process.memoryUsage();
  const statistics = repositoryMap.statistics;

  const totalLinesOfCode = repositoryMap.files.reduce(
    (total, file) => total + file.lineCount,
    0,
  );

  const filesPerSecond =
    analysisDurationMs > 0
      ? statistics.filesParsed / (analysisDurationMs / 1000)
      : 0;

  const linesPerSecond =
    analysisDurationMs > 0
      ? totalLinesOfCode / (analysisDurationMs / 1000)
      : 0;

  const internalImportTotal =
    statistics.resolvedImports + statistics.unresolvedImports;

  const internalResolutionRate = formatPercentage(
    statistics.resolvedImports,
    internalImportTotal,
  );

  const overallImportResolutionRate = formatPercentage(
    statistics.resolvedImports,
    statistics.importsFound,
  );

  console.error("\nActmap Repository Analysis");
  console.error("----------------------------------------");
  console.error(`Repository: ${options.rootPath}`);
  console.error("Analysis completed successfully.");
  console.error("----------------------------------------");

  console.error("\nRepository statistics");
  console.error(`Files found:              ${formatNumber(statistics.filesFound)}`);
  console.error(`Files parsed:             ${formatNumber(statistics.filesParsed)}`);
  console.error(`Files skipped:            ${formatNumber(statistics.filesSkipped)}`);
  console.error(`Folders found:            ${formatNumber(statistics.foldersFound)}`);
  console.error(`Lines of code:            ${formatNumber(totalLinesOfCode)}`);

  console.error("\nImport statistics");
  console.error(`Imports found:            ${formatNumber(statistics.importsFound)}`);
  console.error(`Resolved imports:         ${formatNumber(statistics.resolvedImports)}`);
  console.error(`External imports:         ${formatNumber(statistics.externalImports)}`);
  console.error(`Excluded imports:         ${formatNumber(statistics.excludedImports)}`);
  console.error(`Unresolved imports:       ${formatNumber(statistics.unresolvedImports)}`);
  console.error(`Internal resolution:      ${internalResolutionRate}`);
  console.error(`Overall resolution:       ${overallImportResolutionRate}`);

  console.error("\nDependency graph");
  console.error(`Dependency edges:         ${formatNumber(statistics.edgesCreated)}`);

  console.error("\nPerformance");
  console.error(`Analysis time:            ${(analysisDurationMs / 1000).toFixed(2)}s`);
  console.error(`Total time:               ${(totalDurationMs / 1000).toFixed(2)}s`);
  console.error(`Files per second:         ${formatNumber(filesPerSecond)}`);
  console.error(`Lines per second:         ${formatNumber(linesPerSecond)}`);
  console.error(
    `Heap used after analysis: ${(finalMemory.heapUsed / 1024 / 1024).toFixed(2)} MB`,
  );
  console.error(
    `Heap change:              ${((finalMemory.heapUsed - initialMemory.heapUsed) / 1024 / 1024).toFixed(2)} MB`,
  );
  console.error(
    `RSS after analysis:       ${(finalMemory.rss / 1024 / 1024).toFixed(2)} MB`,
  );

  console.error("\nOutput");
  console.error(`JSON file: ${options.outputPath}`);
  console.error("----------------------------------------\n");
}

async function run(): Promise<void> {
  const options = parseArguments(process.argv.slice(2));

  if (!options) {
    return;
  }

  const initialMemory = process.memoryUsage();
  const startTime = performance.now();

  console.error(`Analyzing repository: ${options.rootPath}`);

  const repositoryMap = await parseRepository({
    rootPath: options.rootPath,
  });

  const analysisDurationMs = performance.now() - startTime;

  // Serialization validates the repository map before output.
  const json = serializeRepositoryMap(repositoryMap);

const outputDirectory = path.dirname(options.outputPath);

try {
  await access(outputDirectory);
} catch {
  await mkdir(outputDirectory, {
    recursive: true,
  });
}

await writeFile(options.outputPath, json, "utf8");

  const totalDurationMs = performance.now() - startTime;

  // Machine-readable output goes exclusively to stdout.
  process.stdout.write(`${json}\n`);

  // Human-readable output goes exclusively to stderr.
  printReport(
    repositoryMap,
    options,
    analysisDurationMs,
    totalDurationMs,
    initialMemory,
  );
}

run().catch((error: unknown) => {
  const message =
    error instanceof Error ? error.message : String(error);

  console.error("\nActmap analysis failed.");
  console.error(message);

  process.exitCode = 1;
});
