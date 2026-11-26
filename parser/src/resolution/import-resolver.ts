
import path from "node:path";
import { readFileSync } from "node:fs";
import * as ts from "typescript";

import type { ModuleResolutionConfig } from "./module-resolution-config";

import type {
  ImportCoverageEntry,
  ImportOccurrence,
  ImportResolutionReason,
  ImportResolutionStatus,
  SkippedFile,
} from "../types";

export interface ExcludedDirectoryInfo {
  path: string;
  reason: string;
}

export interface ImportResolverOptions {
  rootPath: string;
  knownFiles: string[];
  skippedFiles: SkippedFile[];
  excludedDirectories: ExcludedDirectoryInfo[];
  compilerOptions?: ts.CompilerOptions;
  moduleResolutionConfigs?: ModuleResolutionConfig[];
}

export interface ImportResolverResult {
  entries: ImportCoverageEntry[];
}

interface PackageJsonData {
  imports?: Record<string, unknown>;
}

const RESOLUTION_EXTENSIONS = [
  ".ts", ".tsx", ".js", ".jsx", ".mts",
  ".cts", ".mjs", ".cjs", ".json",
];

/**
 * TypeScript's ESM convention writes the emitted extension in the source:
 * `import "./observable.js"` names `observable.ts`. Without this, every such
 * import in a modern TypeScript codebase is reported as a missing file.
 */
const EMITTED_TO_SOURCE: Record<string, string[]> = {
  ".js": [".ts", ".tsx", ".d.ts"],
  ".jsx": [".tsx"],
  ".mjs": [".mts", ".d.mts"],
  ".cjs": [".cts", ".d.cts"],
};

function emittedExtensionCandidates(basePath: string): string[] {
  const extension = path.posix.extname(basePath);
  const sources = EMITTED_TO_SOURCE[extension];
  if (!sources) return [];

  const stem = basePath.slice(0, -extension.length);
  return sources.map((source) => `${stem}${source}`);
}

function toPosix(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

function normalizeRelativePath(filePath: string): string {
  return toPosix(path.normalize(filePath));
}

function isInsideDirectory(filePath: string, directoryPath: string): boolean {
  return filePath === directoryPath ||
    filePath.startsWith(`${directoryPath}/`);
}

function getPackageName(specifier: string): string {
  const parts = specifier.split("/");
  return specifier.startsWith("@") && parts.length >= 2
    ? `${parts[0]}/${parts[1]}`
    : parts[0] ?? specifier;
}

function isAliasLikeSpecifier(specifier: string): boolean {
  return specifier.startsWith("@/") ||
    specifier.startsWith("~/") ||
    specifier.startsWith("#/");
}

function makeEntry(
  occurrence: ImportOccurrence,
  status: ImportResolutionStatus,
  reason: ImportResolutionReason,
  resolvedPath: string | null = null,
  packageName: string | null = null,
  message: string | null = null,
): ImportCoverageEntry {
  return { occurrence, status, reason, resolvedPath, packageName, message };
}

function createConfigDirectoryIndex(
  configs: ModuleResolutionConfig[] = [],
): Map<string, ModuleResolutionConfig> {
  const index = new Map<string, ModuleResolutionConfig>();

  for (const config of configs) {
    if (!config.configPath) continue;

    index.set(
      path.resolve(path.dirname(config.configPath)),
      config,
    );
  }

  return index;
}

function findModuleConfig(
  sourceFile: string,
  rootPath: string,
  configsByDirectory: Map<string, ModuleResolutionConfig>,
): ModuleResolutionConfig | null {
  const absoluteRoot = path.resolve(rootPath);
  const absoluteSource = path.resolve(absoluteRoot, sourceFile);

  const relativeSource = path.relative(absoluteRoot, absoluteSource);

  if (
    relativeSource === ".." ||
    relativeSource.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeSource)
  ) {
    return null;
  }

  let currentDirectory = path.dirname(absoluteSource);

  while (true) {
    const config = configsByDirectory.get(currentDirectory);

    if (config) return config;

    if (currentDirectory === absoluteRoot) break;

    const parentDirectory = path.dirname(currentDirectory);

    if (
      parentDirectory === currentDirectory ||
      !(
        parentDirectory === absoluteRoot ||
        parentDirectory.startsWith(`${absoluteRoot}${path.sep}`)
      )
    ) {
      break;
    }

    currentDirectory = parentDirectory;
  }

  return null;
}

function getRepositoryRelativePath(
  rootPath: string,
  absolutePath: string,
): string | null {
  const relativePath = path.relative(
    path.resolve(rootPath),
    path.resolve(absolutePath),
  );

  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    return null;
  }

  return normalizeRelativePath(relativePath);
}

function findSkippedTarget(
  candidates: string[],
  skippedFiles: Map<string, SkippedFile>,
): SkippedFile | undefined {
  return candidates.map((candidate) => skippedFiles.get(candidate))
    .find((file) => file !== undefined);
}

function classifySkippedTarget(
  occurrence: ImportOccurrence,
  skippedFile: SkippedFile,
): ImportCoverageEntry {
  const reason: ImportResolutionReason =
    skippedFile.reason === "excluded_by_file_rule"
      ? "excluded_by_file_rule"
      : skippedFile.reason === "excluded_by_directory_rule"
        ? "excluded_by_directory_rule"
        : "unsupported_file_type";

  return makeEntry(
    occurrence,
    "excluded",
    reason,
    null,
    null,
    `The target file was skipped: ${skippedFile.reason}. ${skippedFile.message}`,
  );
}

function matchesPathMapping(
  specifier: string,
  paths: ts.MapLike<string[]> | undefined,
): boolean {
  if (!paths) return false;
  if (Object.prototype.hasOwnProperty.call(paths, specifier)) return true;

  return Object.keys(paths).some((pattern) => {
    const index = pattern.indexOf("*");
    if (index === -1) return false;

    const prefix = pattern.slice(0, index);
    const suffix = pattern.slice(index + 1);

    return specifier.startsWith(prefix) &&
      specifier.endsWith(suffix) &&
      specifier.length >= prefix.length + suffix.length;
  });
}

function getTypeScriptResolutionReason(
  occurrence: ImportOccurrence,
  compilerOptions: ts.CompilerOptions,
): ImportResolutionReason {
  if (occurrence.specifier.startsWith("#")) {
    return "resolved_package_import";
  }

  if (matchesPathMapping(occurrence.specifier, compilerOptions.paths)) {
    return "resolved_path_alias";
  }

  if (compilerOptions.baseUrl) {
    return "resolved_base_url";
  }

  return "resolved_typescript";
}

function resolveWithTypeScript(
  occurrence: ImportOccurrence,
  options: ImportResolverOptions,
  knownFiles: Set<string>,
  skippedFiles: Map<string, SkippedFile>,
  excludedDirectories: string[],
  configsByDirectory: Map<string, ModuleResolutionConfig>,
): ImportCoverageEntry | null {
  const config = findModuleConfig(
    occurrence.sourceFile,
    options.rootPath,
    configsByDirectory,
  );

  const compilerOptions = config?.compilerOptions ?? options.compilerOptions;
  if (!compilerOptions) return null;

  const absoluteRoot = path.resolve(options.rootPath);
  const absoluteSource = path.resolve(absoluteRoot, occurrence.sourceFile);

  const resolution = ts.resolveModuleName(
    occurrence.specifier,
    absoluteSource,
    compilerOptions,
    ts.sys,
  );

  const resolvedModule = resolution.resolvedModule;
  if (!resolvedModule) return null;

  if (resolvedModule.isExternalLibraryImport) {
    return makeEntry(
      occurrence,
      "external",
      "external_package",
      null,
      getPackageName(occurrence.specifier),
      `TypeScript resolved "${occurrence.specifier}" as an external library.`,
    );
  }

  const relativeTarget = getRepositoryRelativePath(
    absoluteRoot,
    resolvedModule.resolvedFileName,
  );

  if (relativeTarget === null) {
    return makeEntry(
      occurrence,
      "external",
      "external_package",
      null,
      getPackageName(occurrence.specifier),
      `TypeScript resolved "${occurrence.specifier}" outside the repository.`,
    );
  }

  if (knownFiles.has(relativeTarget)) {
    const reason = getTypeScriptResolutionReason(
      occurrence,
      compilerOptions,
    );

    return makeEntry(
      occurrence,
      "resolved",
      reason,
      relativeTarget,
      null,
      `Resolved "${occurrence.specifier}" using ${reason
        .replace("resolved_", "")
        .replace(/_/g, " ")}.`,
    );
  }

  const excludedDirectory = excludedDirectories.find((directory) =>
    isInsideDirectory(relativeTarget, directory),
  );

  if (excludedDirectory) {
    return makeEntry(
      occurrence,
      "excluded",
      "excluded_by_directory_rule",
      null,
      null,
      `The resolved target is inside excluded directory "${excludedDirectory}".`,
    );
  }

  const skipped = findSkippedTarget([relativeTarget], skippedFiles);
  if (skipped) return classifySkippedTarget(occurrence, skipped);

  return makeEntry(
    occurrence,
    "unresolved",
    "unsupported_file_type",
    null,
    null,
    `TypeScript resolved "${occurrence.specifier}" to "${relativeTarget}", but that file is not part of the parsed repository map.`,
  );
}

function resolveRelativeImport(
  occurrence: ImportOccurrence,
  specifier: string,
  knownFiles: Set<string>,
  skippedFiles: Map<string, SkippedFile>,
  excludedDirectories: string[],
): ImportCoverageEntry {
  const sourceDirectory = path.posix.dirname(
    normalizeRelativePath(occurrence.sourceFile),
  );

  const basePath = normalizeRelativePath(
    path.posix.join(sourceDirectory, specifier),
  );

  const extensionCandidates = [
    ...RESOLUTION_EXTENSIONS.map((extension) => `${basePath}${extension}`),
    ...emittedExtensionCandidates(basePath),
  ];

  const indexCandidates = RESOLUTION_EXTENSIONS.map((extension) => {
    const directory = basePath.replace(/\/+$/, "");
    // `require("../..")` from a nested folder lands on the repository root.
    return directory === "" || directory === "."
      ? `index${extension}`
      : `${directory}/index${extension}`;
  });

  const candidates = [basePath, ...extensionCandidates, ...indexCandidates];

  if (knownFiles.has(basePath)) {
    return makeEntry(occurrence, "resolved", "resolved_exact", basePath);
  }

  const extensionMatch = extensionCandidates.find((candidate) =>
    knownFiles.has(candidate),
  );

  if (extensionMatch) {
    return makeEntry(
      occurrence, "resolved", "resolved_extension", extensionMatch,
    );
  }

  const indexMatch = indexCandidates.find((candidate) =>
    knownFiles.has(candidate),
  );

  if (indexMatch) {
    return makeEntry(occurrence, "resolved", "resolved_index", indexMatch);
  }

  const excludedDirectory = excludedDirectories.find((directory) =>
    isInsideDirectory(basePath, directory),
  );

  if (excludedDirectory) {
    return makeEntry(
      occurrence,
      "excluded",
      "excluded_by_directory_rule",
      null,
      null,
      `The target is inside excluded directory "${excludedDirectory}".`,
    );
  }

  const skipped = findSkippedTarget(candidates, skippedFiles);
  if (skipped) return classifySkippedTarget(occurrence, skipped);

  return makeEntry(
    occurrence,
    "unresolved",
    "file_not_found",
    null,
    null,
    `No file matched the relative import "${specifier}" from "${occurrence.sourceFile}".`,
  );
}

function findNearestPackageJson(
  rootPath: string,
  sourceFile: string,
): { packageDirectory: string; packageJson: PackageJsonData } | null {
  const absoluteRoot = path.resolve(rootPath);
  const absoluteSource = path.resolve(absoluteRoot, sourceFile);
  let currentDirectory = path.dirname(absoluteSource);

  while (true) {
    try {
      const content = readFileSync(
        path.join(currentDirectory, "package.json"),
        "utf8",
      );

      return {
        packageDirectory: currentDirectory,
        packageJson: JSON.parse(content) as PackageJsonData,
      };
    } catch {
      // Continue searching parent directories.
    }

    if (currentDirectory === absoluteRoot) break;

    const parentDirectory = path.dirname(currentDirectory);

    if (
      parentDirectory === currentDirectory ||
      getRepositoryRelativePath(absoluteRoot, parentDirectory) === null
    ) {
      break;
    }

    currentDirectory = parentDirectory;
  }

  return null;
}

function getConditionalTargets(value: unknown): string[] {
  if (typeof value === "string") return [value];

  if (Array.isArray(value)) {
    return value.flatMap(getConditionalTargets);
  }

  if (typeof value !== "object" || value === null) return [];

  const conditions = value as Record<string, unknown>;
  const priority = ["types", "import", "node", "default"];

  return priority.flatMap((condition) =>
    condition in conditions
      ? getConditionalTargets(conditions[condition])
      : [],
  );
}

function matchPackageImport(
  specifier: string,
  imports: Record<string, unknown>,
): string[] {
  if (Object.prototype.hasOwnProperty.call(imports, specifier)) {
    return getConditionalTargets(imports[specifier]);
  }

  for (const [key, value] of Object.entries(imports)) {
    const index = key.indexOf("*");
    if (index === -1) continue;

    const prefix = key.slice(0, index);
    const suffix = key.slice(index + 1);

    if (
      !specifier.startsWith(prefix) ||
      !specifier.endsWith(suffix) ||
      specifier.length < prefix.length + suffix.length
    ) {
      continue;
    }

    const matchedPart = specifier.slice(
      prefix.length,
      specifier.length - suffix.length,
    );

    return getConditionalTargets(value).map((target) =>
      target.replace(/\*/g, matchedPart),
    );
  }

  return [];
}

function getPackageTargetCandidates(absoluteTarget: string): string[] {
  const extension = path.extname(absoluteTarget);
  const basePath = absoluteTarget.slice(
    0,
    absoluteTarget.length - extension.length,
  );

  const substitutions: Record<string, string[]> = {
    ".js": [".ts", ".tsx", ".d.ts", ".js"],
    ".jsx": [".tsx", ".ts", ".jsx"],
    ".mjs": [".mts", ".d.mts", ".mjs"],
    ".cjs": [".cts", ".d.cts", ".cjs"],
  };

  const replacements = substitutions[extension];

  if (replacements) {
    return replacements.map((replacement) => `${basePath}${replacement}`);
  }

  return [
    absoluteTarget,
    ...RESOLUTION_EXTENSIONS.map((ext) => `${absoluteTarget}${ext}`),
    ...RESOLUTION_EXTENSIONS.map((ext) =>
      path.join(absoluteTarget, `index${ext}`),
    ),
  ];
}

function resolvePackageImportMap(
  occurrence: ImportOccurrence,
  options: ImportResolverOptions,
  knownFiles: Set<string>,
  skippedFiles: Map<string, SkippedFile>,
  excludedDirectories: string[],
): ImportCoverageEntry | null {
  if (!occurrence.specifier.startsWith("#")) return null;

  const packageInfo = findNearestPackageJson(
    options.rootPath,
    occurrence.sourceFile,
  );

  if (!packageInfo?.packageJson.imports) return null;

  const targets = matchPackageImport(
    occurrence.specifier,
    packageInfo.packageJson.imports,
  );

  if (targets.length === 0) return null;

  const absoluteRoot = path.resolve(options.rootPath);

  for (const target of targets) {
    if (!target.startsWith("./")) continue;

    const absoluteTarget = path.resolve(
      packageInfo.packageDirectory,
      target,
    );

    const relativeTarget = getRepositoryRelativePath(
      absoluteRoot,
      absoluteTarget,
    );

    if (relativeTarget === null) continue;

    const relativeCandidates = getPackageTargetCandidates(absoluteTarget)
      .map((candidate) =>
        getRepositoryRelativePath(absoluteRoot, candidate),
      )
      .filter((candidate): candidate is string => candidate !== null);

    const matchedFile = relativeCandidates.find((candidate) =>
      knownFiles.has(candidate),
    );

    if (matchedFile) {
      return makeEntry(
        occurrence,
        "resolved",
        "resolved_package_import",
        matchedFile,
        null,
        `Resolved "${occurrence.specifier}" using the package.json imports mapping.`,
      );
    }

    const excludedDirectory = excludedDirectories.find((directory) =>
      isInsideDirectory(relativeTarget, directory),
    );

    if (excludedDirectory) {
      return makeEntry(
        occurrence,
        "excluded",
        "excluded_by_directory_rule",
        null,
        null,
        `The package import target is inside excluded directory "${excludedDirectory}".`,
      );
    }

    const skipped = findSkippedTarget(relativeCandidates, skippedFiles);
    if (skipped) return classifySkippedTarget(occurrence, skipped);
  }

  return makeEntry(
    occurrence,
    "unresolved",
    "file_not_found",
    null,
    null,
    `The package import mapping for "${occurrence.specifier}" exists, but none of its internal targets matched a parsed repository file.`,
  );
}

export function resolveImports(
  occurrences: ImportOccurrence[],
  options: ImportResolverOptions,
): ImportResolverResult {
  const configsByDirectory = createConfigDirectoryIndex(
    options.moduleResolutionConfigs,
  );

  const knownFiles = new Set(options.knownFiles.map(normalizeRelativePath));

  const skippedFiles = new Map(
    options.skippedFiles.map((file) => [
      normalizeRelativePath(file.path),
      file,
    ]),
  );

  const excludedDirectories = options.excludedDirectories.map(
    (directory) => normalizeRelativePath(directory.path),
  );

  const entries: ImportCoverageEntry[] = [];

  for (const occurrence of occurrences) {
    const specifier = occurrence.specifier.trim();
    const normalizedOccurrence = { ...occurrence, specifier };

    if (!specifier) {
      entries.push(makeEntry(
        normalizedOccurrence,
        "unresolved",
        "invalid_specifier",
        null,
        null,
        "The import specifier is empty.",
      ));
      continue;
    }

    if (specifier.startsWith("/") || specifier.includes("\\")) {
      entries.push(makeEntry(
        normalizedOccurrence,
        "unresolved",
        "unsupported_resolution",
        null,
        null,
        "Absolute paths and backslash-based import specifiers are not supported.",
      ));
      continue;
    }

    if (specifier.startsWith(".")) {
      entries.push(resolveRelativeImport(
        normalizedOccurrence,
        specifier,
        knownFiles,
        skippedFiles,
        excludedDirectories,
      ));
      continue;
    }

    const compilerResult = resolveWithTypeScript(
      normalizedOccurrence,
      options,
      knownFiles,
      skippedFiles,
      excludedDirectories,
      configsByDirectory,
    );

    if (compilerResult) {
      entries.push(compilerResult);
      continue;
    }

    if (specifier.startsWith("#")) {
      const packageImportResult = resolvePackageImportMap(
        normalizedOccurrence,
        options,
        knownFiles,
        skippedFiles,
        excludedDirectories,
      );

      if (packageImportResult) {
        entries.push(packageImportResult);
        continue;
      }

      entries.push(makeEntry(
        normalizedOccurrence,
        "unresolved",
        "unsupported_resolution",
        null,
        null,
        "Package import maps could not be resolved using the available TypeScript configuration or package.json imports mappings.",
      ));
      continue;
    }

    if (isAliasLikeSpecifier(specifier)) {
      entries.push(makeEntry(
        normalizedOccurrence,
        "unresolved",
        "unsupported_resolution",
        null,
        null,
        `The import "${specifier}" looks like a path alias, but no matching TypeScript configuration resolved it.`,
      ));
      continue;
    }

    entries.push(makeEntry(
      normalizedOccurrence,
      "external",
      "external_package",
      null,
      getPackageName(specifier),
      `Bare module specifier "${specifier}" is treated as an external package.`,
    ));
  }

  return { entries };
}
