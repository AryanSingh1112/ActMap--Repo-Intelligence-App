
import { readFile } from "node:fs/promises";
import path from "node:path";

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
import { extractImports } from "./imports/import-extractor";
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
    (file) => file.name === "package.json" && file.path.split("/").length <= 4,
  );

  const packages = await mapConcurrent(manifests, 8, async (file): Promise<PackageInfo | null> => {
    try {
      const json = JSON.parse(await readFile(path.join(rootPath, file.path), "utf8"));

      const names = new Set<string>();

      for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
        const section = json?.[field];
        if (section && typeof section === "object") {
          for (const name of Object.keys(section)) names.add(name);
        }
      }

      return {
        directory: file.folderPath === "." ? "" : file.folderPath,
        dependencies: names,
      };
    } catch {
      return null;
    }
  });

  return packages.filter((entry): entry is PackageInfo => entry !== null);
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
      if (pkg.directory === "") rootDependencies.add(name);
    }
  }

  return { files, packages, rootDependencies, allDependencies };
}

export async function parseRepository(
  options: ParseRepositoryOptions,
): Promise<RepositoryMap> {
  const rootPath = path.resolve(options.rootPath);

  // Load root and nested TypeScript/JavaScript configurations.
  const moduleResolutionConfigs =
    loadModuleResolutionConfigs(rootPath);

  await options.onStage?.("select", "Selecting files to map");

  const walkResult = await walkRepository({
    rootPath,
    excludedDirectories: options.excludedDirectories,
    excludedFiles: options.excludedFiles,
  });

  const packages = await readPackages(rootPath, walkResult.files);
  const detection = detectionContext(walkResult.files, packages);
  const adapter = detectFramework(detection);

  await options.onStage?.(
    "parse",
    `Parsing imports in ${walkResult.statistics.filesParsed} files`,
  );

  const occurrences: ImportOccurrence[] = [];
  const facts = new Map<string, FileFacts>();
  const commonJsExports = new Map<string, string[]>();

  const parsable = walkResult.files.filter((file) =>
    PARSABLE_EXTENSIONS.has(file.extension.toLowerCase()),
  );

  const extractions = await mapConcurrent(parsable, READ_CONCURRENCY, async (file) => {
    const sourceCode = await readFile(path.join(rootPath, file.path), "utf8");
    return extractImports(toPosix(file.path), sourceCode);
  });

  parsable.forEach((file, index) => {
    const extracted = extractions[index];

    occurrences.push(...extracted.imports);
    facts.set(file.path, { directives: extracted.directives });

    if (extracted.commonJsExports.length > 0) {
      commonJsExports.set(file.path, extracted.commonJsExports);
    }
  });

  occurrences.sort((a, b) => {
    return (
      a.sourceFile.localeCompare(b.sourceFile) ||
      a.line - b.line ||
      a.column - b.column
    );
  });

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

  const coverage = createCoverage(
    resolverResult.entries,
  );

  const graph = buildDependencyGraph(
    walkResult.files,
    coverage,
  );

  const classify = adapter.classifier(detection);
  const noFacts: FileFacts = { directives: [] };

  const files: FileNode[] = graph.files.map((file) => {
    const exportedNames = commonJsExports.get(file.path);

    return {
      ...file,
      role: classify(file, facts.get(file.path) ?? noFacts),
      ...(exportedNames ? { exports: exportedNames } : {}),
    };
  });

  const roles = new Map(files.map((file) => [file.path, file.role as string]));

  const routes: ExtractedRoute[] = adapter.extractRoutes
    ? await adapter.extractRoutes({
        ...detection,
        files,
        rootPath,
        roles,
        read: (filePath) => readFile(path.join(rootPath, filePath), "utf8"),
      })
    : [];

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