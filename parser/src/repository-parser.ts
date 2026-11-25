
import { readFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

import {
  REPOSITORY_MAP_SCHEMA_VERSION,
} from "./types";

import type {
  ExtractedRoute,
  FileNode,
  ImportCoverage,
  ImportKind,
  ImportOccurrence,
  ParserStatistics,
  RepositoryMap,
} from "./types";

import { walkRepository } from "./walker/repository-walker";
import { extractImports, type ImportExtractorResult } from "./imports/import-extractor";
import { resolveImports } from "./resolution/import-resolver";
import { loadModuleResolutionConfigs } from "./resolution/module-resolution-config";
import { buildDependencyGraph } from "./graph/graph-builder";
import { detectFramework } from "./adapters/registry";
import { mapConcurrent } from "./util/map-concurrent";

import type {
  DetectionContext,
  FileFacts,
  PackageInfo,
} from "./adapters/framework-adapter";

const PARSER_VERSION = "1.1.0";

const PARSABLE_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mts",
  ".cts",
  ".mjs",
  ".cjs",
]);

export type ParseStage = "select" | "parse";

export interface ParseRepositoryOptions {
  rootPath: string;
  excludedDirectories?: string[];
  excludedFiles?: string[];
  /**
   * Optional progress hook. Called as each named stage begins.
   * It never changes what is parsed or what is returned.
   */
  onStage?: (stage: ParseStage, message: string) => void | Promise<void>;
  /**
   * Optional cache of per-file import extraction, keyed by path and content
   * hash. Pass the same Map to a later run and files whose content has not
   * changed skip parsing entirely. Extraction depends only on a file's path and
   * text, so a hit is exactly what a fresh parse would return.
   */
  extractionCache?: Map<string, ImportExtractorResult>;
}

function toPosix(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

function createCoverage(
  entries: ImportCoverage["entries"],
): ImportCoverage {
  const total = entries.length;

  const resolved = entries.filter(
    (entry) => entry.status === "resolved",
  ).length;

  const external = entries.filter(
    (entry) => entry.status === "external",
  ).length;

  const excluded = entries.filter(
    (entry) => entry.status === "excluded",
  ).length;

  const unresolved = entries.filter(
    (entry) => entry.status === "unresolved",
  ).length;

  return {
    total,
    resolved,
    external,
    excluded,
    unresolved,
    entries,
    unresolvedExamples: entries
      .filter((entry) => entry.status === "unresolved")
      .slice(0, 20),
  };
}

function countKind(
  imports: ImportOccurrence[],
  kind: ImportKind,
): number {
  return imports.filter(
    (occurrence) => occurrence.kind === kind,
  ).length;
}

const READ_CONCURRENCY = 32;

/** Dependency names from every package.json up to three folders deep. */
async function readPackages(
  rootPath: string,
  files: readonly FileNode[],
): Promise<PackageInfo[]> {
  const manifests = files.filter(
    (file) =>
      file.name === "package.json" &&
      file.path.split("/").length <= 4,
  );

  const packages = await mapConcurrent(
    manifests,
    8,
    async (file): Promise<PackageInfo | null> => {
      try {
        const json = JSON.parse(
          await readFile(path.join(rootPath, file.path), "utf8"),
        );

        const names = new Set<string>();

        for (const field of [
          "dependencies",
          "devDependencies",
          "peerDependencies",
        ]) {
          const section = json?.[field];

          if (section && typeof section === "object") {
            for (const name of Object.keys(section)) {
              names.add(name);
            }
          }
        }

        return {
          directory: file.folderPath === "." ? "" : file.folderPath,
          dependencies: names,
        };
      } catch {
        return null;
      }
    },
  );

  return packages.filter(
    (entry): entry is PackageInfo => entry !== null,
  );
}

function detectionContext(
  files: readonly FileNode[],
  packages: readonly PackageInfo[],
): DetectionContext {
  const rootDependencies = new Set<string>();
  const allDependencies = new Set<string>();

  for (const pkg of packages) {
    for (const name of pkg.dependencies) {
      allDependencies.add(name);

      if (pkg.directory === "") {
        rootDependencies.add(name);
      }
    }
  }

  return {
    files,
    packages,
    rootDependencies,
    allDependencies,
  };
}

export async function parseRepository(
  options: ParseRepositoryOptions,
): Promise<RepositoryMap> {
  const rootPath = path.resolve(options.rootPath);
  const totalStartedAt = performance.now();

  // Stage 1: Load module resolution configurations.
  const configStartedAt = performance.now();

  const moduleResolutionConfigs =
    loadModuleResolutionConfigs(rootPath);

  console.error(
    `[timing] module configs: ${(
      performance.now() - configStartedAt
    ).toFixed(2)}ms`,
  );

  // Stage 2: Walk the repository.
  const walkStartedAt = performance.now();

  await options.onStage?.("select", "Selecting files to map");

  const walkResult = await walkRepository({
    rootPath,
    excludedDirectories: options.excludedDirectories,
    excludedFiles: options.excludedFiles,
  });

  console.error(
    `[timing] repository walk: ${(
      performance.now() - walkStartedAt
    ).toFixed(2)}ms`,
  );

  // Stage 3: Read package information and detect framework.
  const packageStartedAt = performance.now();

  const packages = await readPackages(rootPath, walkResult.files);
  const detection = detectionContext(walkResult.files, packages);
  const adapter = detectFramework(detection);

  console.error(
    `[timing] packages + framework: ${(
      performance.now() - packageStartedAt
    ).toFixed(2)}ms`,
  );

  await options.onStage?.(
    "parse",
    `Parsing imports in ${walkResult.statistics.filesParsed} files`,
  );

  // Stage 4: Extract imports using source content collected by the walker.
  const occurrences: ImportOccurrence[] = [];
  const facts = new Map<string, FileFacts>();
  const commonJsExports = new Map<string, string[]>();

  const parsable = walkResult.files.filter((file) =>
    PARSABLE_EXTENSIONS.has(file.extension.toLowerCase()),
  );

  const extractionStartedAt = performance.now();

  let sourceFileMs = 0;
  let traversalMs = 0;

  const extractions = await mapConcurrent(
    parsable,
    READ_CONCURRENCY,
    async (file) => {
      const sourceCode = walkResult.sourceContents.get(file.path);

      if (sourceCode === undefined) {
        throw new Error(
          `Source content missing for parsable file: ${file.path}`,
        );
      }

      const cacheKey = `${file.contentHash}\0${file.path}`;
      const cached = options.extractionCache?.get(cacheKey);

      if (cached) {
        return cached;
      }

      const extracted = extractImports(
        toPosix(file.path),
        sourceCode,
        (timing) => {
          sourceFileMs += timing.sourceFileMs;
          traversalMs += timing.traversalMs;
        },
      );

      options.extractionCache?.set(cacheKey, extracted);

      return extracted;
    },
  );

  console.error(
    `[timing] TypeScript source parsing: ${sourceFileMs.toFixed(2)}ms`,
  );

  console.error(
    `[timing] AST traversal: ${traversalMs.toFixed(2)}ms`,
  );

  console.error(
    `[timing] import extraction: ${(
      performance.now() - extractionStartedAt
    ).toFixed(2)}ms (${parsable.length} files)`,
  );

  parsable.forEach((file, index) => {
    const extracted = extractions[index];

    occurrences.push(...extracted.imports);
    facts.set(file.path, {
      directives: extracted.directives,
    });

    if (extracted.commonJsExports.length > 0) {
      commonJsExports.set(
        file.path,
        extracted.commonJsExports,
      );
    }
  });

  // Release retained source text once extraction is complete.
  walkResult.sourceContents.clear();

  occurrences.sort((a, b) => {
    return (
      a.sourceFile.localeCompare(b.sourceFile) ||
      a.line - b.line ||
      a.column - b.column
    );
  });

  // Stage 5: Resolve imports.
  const resolutionStartedAt = performance.now();

  const resolverResult = resolveImports(
    occurrences,
    {
      rootPath,
      knownFiles: walkResult.files.map((file) => file.path),
      skippedFiles: walkResult.skippedFiles,
      excludedDirectories: walkResult.excludedDirectories,
      moduleResolutionConfigs,
    },
  );

  console.error(
    `[timing] import resolution: ${(
      performance.now() - resolutionStartedAt
    ).toFixed(2)}ms (${occurrences.length} imports)`,
  );

  // Stage 6: Build dependency graph.
  const graphStartedAt = performance.now();

  const coverage = createCoverage(resolverResult.entries);

  const graph = buildDependencyGraph(
    walkResult.files,
    coverage,
  );

  console.error(
    `[timing] graph building: ${(
      performance.now() - graphStartedAt
    ).toFixed(2)}ms`,
  );

  // Stage 7: Classify files and extract routes.
  const classificationStartedAt = performance.now();

  const classify = adapter.classifier(detection);
  const noFacts: FileFacts = {
    directives: [],
  };

  const files: FileNode[] = graph.files.map((file) => {
    const exportedNames = commonJsExports.get(file.path);

    return {
      ...file,
      role: classify(file, facts.get(file.path) ?? noFacts),
      ...(exportedNames ? { exports: exportedNames } : {}),
    };
  });

  const roles = new Map(
    files.map((file) => [
      file.path,
      file.role as string,
    ]),
  );

  const routes: ExtractedRoute[] = adapter.extractRoutes
    ? await adapter.extractRoutes({
        ...detection,
        files,
        rootPath,
        roles,
        read: (filePath) =>
          readFile(path.join(rootPath, filePath), "utf8"),
      })
    : [];

  console.error(
    `[timing] classification + routes: ${(
      performance.now() - classificationStartedAt
    ).toFixed(2)}ms`,
  );

  const importsFound = occurrences.length;

  const statistics: ParserStatistics = {
    filesFound: walkResult.statistics.filesFound,
    filesParsed: walkResult.statistics.filesParsed,
    filesSkipped: walkResult.statistics.filesSkipped,
    foldersFound: walkResult.statistics.foldersFound,
    importsFound,
    edgesCreated: graph.edges.length,
    staticImports: countKind(occurrences, "static"),
    reExports: countKind(occurrences, "re-export"),
    dynamicImports: countKind(occurrences, "dynamic"),
    requireImports: countKind(occurrences, "require"),
    routesExtracted: routes.length,
    resolvedImports: coverage.resolved,
    externalImports: coverage.external,
    excludedImports: coverage.excluded,
    unresolvedImports: coverage.unresolved,
  };

  console.error(
    `[timing] total parseRepository: ${(
      performance.now() - totalStartedAt
    ).toFixed(2)}ms`,
  );

  return {
    schemaVersion: REPOSITORY_MAP_SCHEMA_VERSION,

    repository: {
      name: path.basename(rootPath),
      rootPath,
      analyzedAt: new Date().toISOString(),
      parserVersion: `${PARSER_VERSION}+${adapter.id}`,
    },

    framework: adapter.id,

    files,
    folders: walkResult.folders,
    edges: graph.edges,
    routes,
    coverage,
    skippedFiles: walkResult.skippedFiles,
    statistics,
  };
}
