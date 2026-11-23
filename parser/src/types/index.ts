
/**
 * Actmap Repository Parser
 *
 * Public output contract.
 * All paths are repository-relative POSIX paths.
 * Schema changes must be versioned.
 */

export const REPOSITORY_MAP_SCHEMA_VERSION = "1.3.0" as const;

export type RepositoryMapSchemaVersion =
  typeof REPOSITORY_MAP_SCHEMA_VERSION;

// --------------------------------------------------
// Repository metadata
// --------------------------------------------------

export interface RepositoryMetadata {
  name: string;
  rootPath: string;
  analyzedAt: string;
  parserVersion: string;
}

// --------------------------------------------------
// File metadata
// --------------------------------------------------

export type FileLanguage =
  | "typescript"
  | "javascript"
  | "json"
  | "css"
  | "html"
  | "markdown"
  | "python"
  | "other";

export type FileKind =
  | "source"
  | "configuration"
  | "documentation"
  | "test"
  | "type-declaration"
  | "other";

export interface FileNode {
  id: string;
  path: string;
  name: string;
  extension: string;
  folderPath: string;
  language: FileLanguage;
  kind: FileKind;

  lineCount: number;
  sizeBytes: number;
  contentHash: string;

  fanIn: number;
  fanOut: number;

  /**
   * The category the detected framework's conventions put this file in, using
   * the names in taxonomy/categories.ts. Absent until an adapter has run.
   */
  role?: string;

  /** Names a CommonJS module exports. Only present for files that export that way. */
  exports?: string[];
}

// --------------------------------------------------
// Folder metadata
// --------------------------------------------------

export interface FolderNode {
  id: string;
  path: string;
  name: string;
  parentPath: string | null;
  fileCount: number;
}

// --------------------------------------------------
// Import discovery
// --------------------------------------------------

export type ImportKind =
  | "static"
  | "re-export"
  | "dynamic"
  | "require";

export interface ImportOccurrence {
  id: string;
  sourceFile: string;
  specifier: string;
  kind: ImportKind;
  line: number;
  column: number;
}

// --------------------------------------------------
// Import resolution and coverage
// --------------------------------------------------

export type ImportResolutionStatus =
  | "resolved"
  | "external"
  | "excluded"
  | "unresolved";

export type ImportResolutionReason =
  | "resolved_exact"
  | "resolved_extension"
  | "resolved_index"
  | "resolved_path_alias"
  | "resolved_base_url"
  | "resolved_typescript"
  | "external_package"
  | "excluded_by_configuration"
  | "excluded_by_directory_rule"
  | "resolved_package_import"
  | "excluded_by_file_rule"
  | "unsupported_file_type"
  | "file_not_found"
  | "directory_not_found"
  | "invalid_specifier"
  | "unsupported_resolution"
  | "resolution_error";

export interface ImportCoverageEntry {
  occurrence: ImportOccurrence;
  status: ImportResolutionStatus;
  reason: ImportResolutionReason;

  resolvedPath: string | null;
  packageName: string | null;

  message: string | null;
}

export interface ImportCoverage {
  total: number;
  resolved: number;
  external: number;
  excluded: number;
  unresolved: number;

  entries: ImportCoverageEntry[];
  unresolvedExamples: ImportCoverageEntry[];
}

// --------------------------------------------------
// Dependency graph
// --------------------------------------------------

export interface DependencyEdge {
  id: string;
  sourceFile: string;
  targetFile: string;

  kinds: ImportKind[];
  occurrences: ImportOccurrence[];
  occurrenceCount: number;
}

// --------------------------------------------------
// Routes
// --------------------------------------------------

/**
 * A route is only ever emitted when its method and its full pattern can both
 * be read from the parsed syntax, with no inference. If either would have to
 * be guessed, there is no route.
 */
export interface ExtractedRoute {
  id: string;
  method: string;
  pattern: string;
  sourceFile: string;
  line: number;
}

// --------------------------------------------------
// Skipped files
// --------------------------------------------------

export type FileSkipReason =
  | "unsupported_extension"
  | "binary_file"
  | "empty_file"
  | "excluded_by_configuration"
  | "excluded_by_directory_rule"
  | "excluded_by_file_rule"
  | "file_too_large"
  | "unreadable"
  | "invalid_encoding";

export interface SkippedFile {
  path: string;
  reason: FileSkipReason;
  message: string;
}

// --------------------------------------------------
// Parser statistics
// --------------------------------------------------

export interface ParserStatistics {
  filesFound: number;
  filesParsed: number;
  filesSkipped: number;

  foldersFound: number;

  importsFound: number;
  edgesCreated: number;

  staticImports: number;
  reExports: number;
  dynamicImports: number;
  requireImports: number;

  routesExtracted: number;

  resolvedImports: number;
  externalImports: number;
  excludedImports: number;
  unresolvedImports: number;
}

// --------------------------------------------------
// Complete repository map
// --------------------------------------------------

export interface RepositoryMap {
  schemaVersion: RepositoryMapSchemaVersion;

  repository: RepositoryMetadata;

  /** The adapter that matched: its id, as used in taxonomy/categories.ts. */
  framework: string;

  files: FileNode[];
  folders: FolderNode[];
  edges: DependencyEdge[];
  routes: ExtractedRoute[];

  coverage: ImportCoverage;
  skippedFiles: SkippedFile[];

  statistics: ParserStatistics;
}