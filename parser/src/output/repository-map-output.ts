
import {
  REPOSITORY_MAP_SCHEMA_VERSION,
} from "../types";

import type {
  RepositoryMap,
} from "../types";

export class RepositoryMapValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RepositoryMapValidationError";
  }
}

const FILE_LANGUAGES = new Set([
  "typescript", "javascript", "json", "css",
  "html", "markdown", "python", "other",
]);

const FILE_KINDS = new Set([
  "source", "configuration", "documentation",
  "test", "type-declaration", "other",
]);

const IMPORT_KINDS = new Set([
  "static", "re-export", "dynamic", "require",
]);

const IMPORT_STATUSES = new Set([
  "resolved", "external", "excluded", "unresolved",
]);

const IMPORT_REASONS = new Set([
  "resolved_exact",
  "resolved_extension",
  "resolved_index",
  "resolved_path_alias",
  "resolved_base_url",
  "resolved_typescript",
  "external_package",
  "excluded_by_configuration",
  "excluded_by_directory_rule",
  "resolved_package_import",
  "excluded_by_file_rule",
  "unsupported_file_type",
  "file_not_found",
  "directory_not_found",
  "invalid_specifier",
  "unsupported_resolution",
  "resolution_error",
]);

const SKIP_REASONS = new Set([
  "unsupported_extension",
  "binary_file",
  "empty_file",
  "excluded_by_configuration",
  "excluded_by_directory_rule",
  "excluded_by_file_rule",
  "file_too_large",
  "unreadable",
  "invalid_encoding",
]);

const STATISTIC_FIELDS = [
  "filesFound",
  "filesParsed",
  "filesSkipped",
  "foldersFound",
  "importsFound",
  "edgesCreated",
  "staticImports",
  "reExports",
  "dynamicImports",
  "requireImports",
  "routesExtracted",
  "resolvedImports",
  "externalImports",
  "excludedImports",
  "unresolvedImports",
] as const;

const COVERAGE_FIELDS = [
  "total",
  "resolved",
  "external",
  "excluded",
  "unresolved",
] as const;

function isObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function assertString(
  value: unknown,
  field: string,
): asserts value is string {
  if (typeof value !== "string") {
    throw new RepositoryMapValidationError(
      `Invalid string field: ${field}.`,
    );
  }
}

function assertInteger(
  value: unknown,
  field: string,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < 0
  ) {
    throw new RepositoryMapValidationError(
      `Invalid numeric field: ${field}.`,
    );
  }
}

function assertEnum(
  value: unknown,
  allowed: Set<string>,
  field: string,
): void {
  if (typeof value !== "string" || !allowed.has(value)) {
    throw new RepositoryMapValidationError(
      `Invalid value for ${field}.`,
    );
  }
}

function assertArray(
  value: unknown,
  field: string,
): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new RepositoryMapValidationError(
      `Expected "${field}" to be an array.`,
    );
  }
}

function assertUnique(
  values: string[],
  field: string,
): void {
  if (new Set(values).size !== values.length) {
    throw new RepositoryMapValidationError(
      `Duplicate values found in ${field}.`,
    );
  }
}

function validateOccurrence(value: unknown): void {
  if (!isObject(value)) {
    throw new RepositoryMapValidationError(
      "Invalid import occurrence.",
    );
  }

  for (const field of [
    "id",
    "sourceFile",
    "specifier",
  ]) {
    assertString(value[field], `occurrence.${field}`);
  }

  assertEnum(value.kind, IMPORT_KINDS, "occurrence.kind");
  assertInteger(value.line, "occurrence.line");
  assertInteger(value.column, "occurrence.column");

  if (value.line < 1) {
    throw new RepositoryMapValidationError(
      "Import line numbers must start at 1.",
    );
  }
}

function validateCoverageEntry(value: unknown): void {
  if (!isObject(value)) {
    throw new RepositoryMapValidationError(
      "Invalid import coverage entry.",
    );
  }

  validateOccurrence(value.occurrence);

  assertEnum(value.status, IMPORT_STATUSES, "coverage.status");
  assertEnum(value.reason, IMPORT_REASONS, "coverage.reason");

  for (const field of [
    "resolvedPath",
    "packageName",
    "message",
  ]) {
    if (
      value[field] !== null &&
      typeof value[field] !== "string"
    ) {
      throw new RepositoryMapValidationError(
        `Invalid coverage ${field}.`,
      );
    }
  }

  if (
    value.status === "resolved" &&
    value.resolvedPath === null
  ) {
    throw new RepositoryMapValidationError(
      "Resolved imports must have a resolved path.",
    );
  }

  if (
    value.status !== "resolved" &&
    value.resolvedPath !== null
  ) {
    throw new RepositoryMapValidationError(
      "Only resolved imports can have a resolved path.",
    );
  }
}

function validateFile(value: unknown): void {
  if (!isObject(value)) {
    throw new RepositoryMapValidationError(
      "Invalid file node.",
    );
  }

  for (const field of [
    "id",
    "path",
    "name",
    "extension",
    "folderPath",
    "contentHash",
  ]) {
    assertString(value[field], `file.${field}`);
  }

  const path = value.path as string;
  const id = value.id as string;

  assertEnum(value.language, FILE_LANGUAGES, "file.language");
  assertEnum(value.kind, FILE_KINDS, "file.kind");

  for (const field of [
    "lineCount",
    "sizeBytes",
    "fanIn",
    "fanOut",
  ]) {
    assertInteger(value[field], `file.${field}`);
  }

  if (value.role !== undefined) {
    assertString(value.role, "file.role");
  }

  if (value.exports !== undefined) {
    assertArray(value.exports, "file.exports");

    for (const name of value.exports as unknown[]) {
      assertString(name, "file.exports[]");
    }
  }

  if (id !== `file:${path}`) {
    throw new RepositoryMapValidationError(
      `Invalid file ID: ${id}.`,
    );
  }

  if (
    !path ||
    path.startsWith("/") ||
    path.includes("\\") ||
    path.split("/").includes("..")
  ) {
    throw new RepositoryMapValidationError(
      "File paths must be valid relative paths.",
    );
  }
}

function validateFolder(value: unknown): void {
  if (!isObject(value)) {
    throw new RepositoryMapValidationError(
      "Invalid folder node.",
    );
  }

  for (const field of ["id", "path", "name"]) {
    assertString(value[field], `folder.${field}`);
  }

  if (
    value.parentPath !== null &&
    typeof value.parentPath !== "string"
  ) {
    throw new RepositoryMapValidationError(
      "Invalid folder parentPath.",
    );
  }

  assertInteger(value.fileCount, "folder.fileCount");

  if (value.id !== `folder:${value.path}`) {
    throw new RepositoryMapValidationError(
      `Invalid folder ID: ${value.id}.`,
    );
  }
}

function validateEdge(value: unknown): void {
  if (!isObject(value)) {
    throw new RepositoryMapValidationError(
      "Invalid dependency edge.",
    );
  }

  for (const field of [
    "id",
    "sourceFile",
    "targetFile",
  ]) {
    assertString(value[field], `edge.${field}`);
  }

  assertArray(value.kinds, "edge.kinds");
  assertArray(value.occurrences, "edge.occurrences");

  for (const kind of value.kinds) {
    assertEnum(kind, IMPORT_KINDS, "edge.kind");
  }

  for (const occurrence of value.occurrences) {
    validateOccurrence(occurrence);
  }

  assertInteger(value.occurrenceCount, "edge.occurrenceCount");

  if (value.occurrenceCount !== value.occurrences.length) {
    throw new RepositoryMapValidationError(
      "Edge occurrence count does not match its occurrences.",
    );
  }

  if (value.occurrences.length === 0 || value.kinds.length === 0) {
    throw new RepositoryMapValidationError(
      "Dependency edges must contain occurrences and kinds.",
    );
  }

  if (value.kinds.length !== new Set(value.kinds).size) {
    throw new RepositoryMapValidationError(
      "Duplicate import kinds found in dependency edge.",
    );
  }
}

function validateSkippedFile(value: unknown): void {
  if (!isObject(value)) {
    throw new RepositoryMapValidationError(
      "Invalid skipped file.",
    );
  }

  assertString(value.path, "skippedFile.path");
  assertString(value.message, "skippedFile.message");
  assertEnum(value.reason, SKIP_REASONS, "skippedFile.reason");
}

export function validateRepositoryMap(
  value: unknown,
): asserts value is RepositoryMap {
  if (!isObject(value)) {
    throw new RepositoryMapValidationError(
      "Repository map must be an object.",
    );
  }

  if (value.schemaVersion !== REPOSITORY_MAP_SCHEMA_VERSION) {
    throw new RepositoryMapValidationError(
      `Unsupported schema version: ${String(value.schemaVersion)}.`,
    );
  }

  if (!isObject(value.repository)) {
    throw new RepositoryMapValidationError(
      "Repository metadata is missing or invalid.",
    );
  }

  for (const field of [
    "name",
    "rootPath",
    "analyzedAt",
    "parserVersion",
  ]) {
    assertString(value.repository[field], `repository.${field}`);
  }

  assertArray(value.files, "files");
  assertArray(value.folders, "folders");
  assertArray(value.edges, "edges");
  assertArray(value.skippedFiles, "skippedFiles");
  assertArray(value.routes, "routes");
  assertString(value.framework, "framework");

  const fileValues = value.files;
  const folderValues = value.folders;
  const edgeValues = value.edges;
  const skippedFileValues = value.skippedFiles;

  for (const file of fileValues) validateFile(file);
  for (const folder of folderValues) validateFolder(folder);
  for (const edge of edgeValues) validateEdge(edge);
  for (const file of skippedFileValues) validateSkippedFile(file);

  const files = fileValues as Record<string, unknown>[];
  const folders = folderValues as Record<string, unknown>[];
  const edges = edgeValues as Record<string, unknown>[];
  const skippedFiles = skippedFileValues as Record<string, unknown>[];

  const filePaths = files.map((file) => file.path as string);
  const folderPaths = folders.map((folder) => folder.path as string);

  assertUnique(filePaths, "files");
  assertUnique(folderPaths, "folders");
  assertUnique(files.map((file) => file.id as string), "file IDs");
  assertUnique(folders.map((folder) => folder.id as string), "folder IDs");
  assertUnique(edges.map((edge) => edge.id as string), "edge IDs");

  const knownPaths = new Set(filePaths);
  const routeIds: string[] = [];

  for (const route of value.routes as unknown[]) {
    if (!isObject(route)) {
      throw new RepositoryMapValidationError("Invalid route.");
    }

    for (const field of ["id", "method", "pattern", "sourceFile"]) {
      assertString(route[field], `route.${field}`);
    }

    assertInteger(route.line, "route.line");

    if (!knownPaths.has(route.sourceFile as string)) {
      throw new RepositoryMapValidationError(
        `Route points at an unknown file: ${String(route.sourceFile)}.`,
      );
    }

    if (!(route.pattern as string).startsWith("/")) {
      throw new RepositoryMapValidationError(
        `Route pattern must start with "/": ${String(route.pattern)}.`,
      );
    }

    routeIds.push(route.id as string);
  }

  assertUnique(routeIds, "route IDs");

  const filePathSet = new Set(filePaths);
  const folderPathSet = new Set(folderPaths);

  if (!folderPathSet.has(".")) {
    throw new RepositoryMapValidationError(
      "Repository root folder is missing.",
    );
  }

  for (const file of files) {
    if (!folderPathSet.has(file.folderPath as string)) {
      throw new RepositoryMapValidationError(
        `Missing folder for file: ${file.path}.`,
      );
    }
  }

  for (const folder of folders) {
    if (folder.path === ".") {
      if (folder.parentPath !== null) {
        throw new RepositoryMapValidationError(
          "Repository root folder cannot have a parent.",
        );
      }
    } else if (
      typeof folder.parentPath !== "string" ||
      !folderPathSet.has(folder.parentPath)
    ) {
      throw new RepositoryMapValidationError(
        `Invalid parent folder for: ${folder.path}.`,
      );
    }
  }

  const directFileCounts = new Map<string, number>();

  for (const file of files) {
    const folder = file.folderPath as string;

    directFileCounts.set(
      folder,
      (directFileCounts.get(folder) ?? 0) + 1,
    );
  }

  for (const folder of folders) {
    if (
      folder.fileCount !==
      (directFileCounts.get(folder.path as string) ?? 0)
    ) {
      throw new RepositoryMapValidationError(
        `Folder file count mismatch: ${folder.path}.`,
      );
    }
  }

  if (!isObject(value.coverage)) {
    throw new RepositoryMapValidationError(
      "Import coverage is missing or invalid.",
    );
  }

  const coverage = value.coverage;

  assertArray(coverage.entries, "coverage.entries");
  assertArray(
    coverage.unresolvedExamples,
    "coverage.unresolvedExamples",
  );

  for (const field of COVERAGE_FIELDS) {
    assertInteger(coverage[field], `coverage.${field}`);
  }

  const coverageEntries = coverage.entries;
  const unresolvedExamples = coverage.unresolvedExamples;

  for (const entry of coverageEntries) {
    validateCoverageEntry(entry);
  }

  const entries = coverageEntries as Record<string, unknown>[];

  const occurrenceIds = entries.map(
    (entry) =>
      (entry.occurrence as Record<string, unknown>).id as string,
  );

  assertUnique(occurrenceIds, "coverage occurrence IDs");

  if (coverage.total !== entries.length) {
    throw new RepositoryMapValidationError(
      "Coverage total does not match the number of entries.",
    );
  }

  const coverageSum =
    (coverage.resolved as number) +
    (coverage.external as number) +
    (coverage.excluded as number) +
    (coverage.unresolved as number);

  if (coverage.total !== coverageSum) {
    throw new RepositoryMapValidationError(
      "Import coverage counts do not reconcile.",
    );
  }

  const statusCounts = new Map<string, number>();

  for (const entry of entries) {
    const status = entry.status as string;

    statusCounts.set(
      status,
      (statusCounts.get(status) ?? 0) + 1,
    );
  }

  for (const status of IMPORT_STATUSES) {
    if (coverage[status] !== (statusCounts.get(status) ?? 0)) {
      throw new RepositoryMapValidationError(
        `Coverage count mismatch for status: ${status}.`,
      );
    }
  }

  const coverageByOccurrence = new Map(
    entries.map((entry) => [
      (entry.occurrence as Record<string, unknown>).id as string,
      entry,
    ]),
  );

  const unresolvedExampleIds = new Set<string>();

  for (const example of unresolvedExamples) {
    validateCoverageEntry(example);

    if (!isObject(example) || example.status !== "unresolved") {
      throw new RepositoryMapValidationError(
        "Unresolved examples must have unresolved status.",
      );
    }

    const occurrence = example.occurrence as Record<string, unknown>;
    const occurrenceId = occurrence.id as string;
    const original = coverageByOccurrence.get(occurrenceId);

    if (!original || original.status !== "unresolved") {
      throw new RepositoryMapValidationError(
        "Unresolved examples must reference unresolved coverage entries.",
      );
    }

    unresolvedExampleIds.add(occurrenceId);
  }

  const edgeOccurrenceIds = new Set<string>();

  for (const edge of edges) {
    const source = edge.sourceFile as string;
    const target = edge.targetFile as string;

    if (!filePathSet.has(source) || !filePathSet.has(target)) {
      throw new RepositoryMapValidationError(
        `Dependency edge references a missing file: ${edge.id}.`,
      );
    }

    const kinds = edge.kinds as string[];

    for (const occurrence of edge.occurrences as Record<string, unknown>[]) {
      const occurrenceId = occurrence.id as string;
      const entry = coverageByOccurrence.get(occurrenceId);

      if (edgeOccurrenceIds.has(occurrenceId)) {
        throw new RepositoryMapValidationError(
          `Duplicate edge occurrence: ${occurrenceId}.`,
        );
      }

      edgeOccurrenceIds.add(occurrenceId);

      if (
        !entry ||
        entry.status !== "resolved" ||
        entry.resolvedPath !== target ||
        !isObject(entry.occurrence) ||
        entry.occurrence.sourceFile !== source ||
        entry.occurrence.kind !== occurrence.kind ||
        entry.occurrence.line !== occurrence.line ||
        entry.occurrence.column !== occurrence.column ||
        entry.occurrence.specifier !== occurrence.specifier ||
        !kinds.includes(entry.occurrence.kind as string)
      ) {
        throw new RepositoryMapValidationError(
          `Dependency edge does not match import coverage: ${edge.id}.`,
        );
      }
    }

    const expectedId = JSON.stringify([source, target]);

    if (edge.id !== expectedId) {
      throw new RepositoryMapValidationError(
        `Invalid dependency edge ID: ${edge.id}.`,
      );
    }
  }

  const resolvedOccurrenceIds = new Set(
    entries
      .filter((entry) => entry.status === "resolved")
      .map(
        (entry) =>
          (entry.occurrence as Record<string, unknown>).id as string,
      ),
  );

  if (
    resolvedOccurrenceIds.size !== edgeOccurrenceIds.size ||
    [...resolvedOccurrenceIds].some(
      (id) => !edgeOccurrenceIds.has(id),
    )
  ) {
    throw new RepositoryMapValidationError(
      "Dependency edge occurrences do not match resolved imports.",
    );
  }

  const expectedEdges = new Set<string>();

  for (const entry of entries) {
    if (entry.status === "resolved") {
      expectedEdges.add(
        JSON.stringify([
          (entry.occurrence as Record<string, unknown>).sourceFile,
          entry.resolvedPath,
        ]),
      );
    }
  }

  const actualEdges = new Set(
    edges.map((edge) => edge.id as string),
  );

  if (
    expectedEdges.size !== actualEdges.size ||
    [...expectedEdges].some((id) => !actualEdges.has(id))
  ) {
    throw new RepositoryMapValidationError(
      "Dependency edges do not match resolved imports.",
    );
  }

  const fanIn = new Map<string, number>();
  const fanOut = new Map<string, number>();

  for (const file of files) {
    fanIn.set(file.path as string, 0);
    fanOut.set(file.path as string, 0);
  }

  for (const edge of edges) {
    const source = edge.sourceFile as string;
    const target = edge.targetFile as string;

    fanOut.set(source, (fanOut.get(source) ?? 0) + 1);
    fanIn.set(target, (fanIn.get(target) ?? 0) + 1);
  }

  for (const file of files) {
    const path = file.path as string;

    if (
      file.fanIn !== fanIn.get(path) ||
      file.fanOut !== fanOut.get(path)
    ) {
      throw new RepositoryMapValidationError(
        `Fan-in/fan-out mismatch for file: ${path}.`,
      );
    }
  }

  if (!isObject(value.statistics)) {
    throw new RepositoryMapValidationError(
      "Parser statistics are missing or invalid.",
    );
  }

  const statistics = value.statistics;

  for (const field of STATISTIC_FIELDS) {
    assertInteger(statistics[field], `statistics.${field}`);
  }

  if (
    statistics.filesFound !==
    (statistics.filesParsed as number) +
      (statistics.filesSkipped as number)
  ) {
    throw new RepositoryMapValidationError(
      "File counts do not reconcile.",
    );
  }

  if (
    statistics.filesParsed !== files.length ||
    statistics.filesSkipped !== skippedFiles.length ||
    statistics.foldersFound !== folders.length
  ) {
    throw new RepositoryMapValidationError(
      "File or folder statistics do not match actual records.",
    );
  }

  if (statistics.importsFound !== coverage.total) {
    throw new RepositoryMapValidationError(
      "Import count does not match coverage total.",
    );
  }

  if (statistics.edgesCreated !== edges.length) {
    throw new RepositoryMapValidationError(
      "Edge count does not match actual records.",
    );
  }

  if (
    statistics.resolvedImports !== coverage.resolved ||
    statistics.externalImports !== coverage.external ||
    statistics.excludedImports !== coverage.excluded ||
    statistics.unresolvedImports !== coverage.unresolved
  ) {
    throw new RepositoryMapValidationError(
      "Import statistics do not match coverage counts.",
    );
  }

  const kindCounts = new Map<string, number>();

  for (const entry of entries) {
    const kind = (entry.occurrence as Record<string, unknown>).kind as string;

    kindCounts.set(
      kind,
      (kindCounts.get(kind) ?? 0) + 1,
    );
  }

  if (
    statistics.staticImports !== (kindCounts.get("static") ?? 0) ||
    statistics.reExports !== (kindCounts.get("re-export") ?? 0) ||
    statistics.dynamicImports !== (kindCounts.get("dynamic") ?? 0) ||
    statistics.requireImports !== (kindCounts.get("require") ?? 0)
  ) {
    throw new RepositoryMapValidationError(
      "Import kind statistics do not match coverage entries.",
    );
  }
}

export function serializeRepositoryMap(
  map: RepositoryMap,
): string {
  validateRepositoryMap(map);
  return JSON.stringify(map, null, 2);
}

export function deserializeRepositoryMap(
  json: string,
): RepositoryMap {
  let parsed: unknown;

  try {
    parsed = JSON.parse(json);
  } catch {
    throw new RepositoryMapValidationError(
      "The supplied JSON is invalid.",
    );
  }

  validateRepositoryMap(parsed);
  return parsed;
}