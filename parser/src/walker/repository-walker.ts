
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import type {
  FileKind,
  FileLanguage,
  FileNode,
  FileSkipReason,
  FolderNode,
  SkippedFile,
} from "../types";

export interface RepositoryWalkerOptions {
  rootPath: string;
  excludedDirectories?: string[];
  excludedFiles?: string[];
  maxFileSizeBytes?: number;
}

export interface ExcludedDirectory {
  path: string;
  reason: "excluded_by_directory_rule";
}

export interface DirectoryScanIssue {
  path: string;
  reason: "unreadable_directory" | "symbolic_link_ignored";
  message: string;
}

export interface RepositoryWalkerResult {
  files: FileNode[];
  folders: FolderNode[];
  skippedFiles: SkippedFile[];
  excludedDirectories: ExcludedDirectory[];
  scanIssues: DirectoryScanIssue[];
  statistics: {
    filesFound: number;
    filesParsed: number;
    filesSkipped: number;
    foldersFound: number;
  };
}

export class RepositoryWalkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RepositoryWalkError";
  }
}

const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024;

const DEFAULT_EXCLUDED_DIRECTORIES = [
  ".git", "node_modules", ".next", ".turbo", ".vercel",
  ".cache", ".temp", "coverage", "dist", "build", "out",
];

const DEFAULT_EXCLUDED_FILES = ["tsconfig.tsbuildinfo"];

const SUPPORTED_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mts", ".cts", ".mjs", ".cjs",
  ".json", ".css", ".scss", ".sass", ".less", ".html", ".htm",
  ".md", ".mdx", ".txt", ".py", ".sql", ".prisma", ".graphql",
  ".gql", ".sh", ".yaml", ".yml", ".toml", ".xml", ".svg",
]);

const SUPPORTED_SPECIAL_FILES = new Set([
  ".gitignore", ".npmrc", ".nvmrc", ".prettierrc",
  ".eslintrc", ".editorconfig", ".env", ".env.local",
  ".env.development", ".env.production", ".env.test",
  "dockerfile", "makefile", "license", "readme",
]);

function toPosixPath(value: string): string {
  return value.split(path.sep).join("/");
}

function getLanguage(extension: string): FileLanguage {
  switch (extension) {
    case ".ts":
    case ".tsx":
    case ".mts":
    case ".cts":
      return "typescript";
    case ".js":
    case ".jsx":
    case ".mjs":
    case ".cjs":
      return "javascript";
    case ".json":
      return "json";
    case ".css":
    case ".scss":
    case ".sass":
    case ".less":
      return "css";
    case ".html":
    case ".htm":
      return "html";
    case ".md":
    case ".mdx":
    case ".txt":
      return "markdown";
    case ".py":
      return "python";
    default:
      return "other";
  }
}

function getFileKind(fileName: string, extension: string): FileKind {
  const name = fileName.toLowerCase();

  if (
    name.includes(".test.") ||
    name.includes(".spec.") ||
    name.startsWith("test_") ||
    name.endsWith("_test.py") ||
    name.endsWith("_test.go") ||
    name === "tests"
  ) {
    return "test";
  }

  if (
    name.endsWith(".d.ts") ||
    name.endsWith(".d.mts") ||
    name.endsWith(".d.cts")
  ) {
    return "type-declaration";
  }

  if (
    [".md", ".mdx", ".txt"].includes(extension) ||
    name === "license"
  ) {
    return "documentation";
  }

  if (
    [".json", ".yaml", ".yml", ".toml", ".xml"].includes(extension) ||
    SUPPORTED_SPECIAL_FILES.has(name)
  ) {
    return "configuration";
  }

  if (
    [
      ".ts", ".tsx", ".js", ".jsx", ".mts", ".cts",
      ".mjs", ".cjs", ".py", ".sql", ".prisma",
      ".graphql", ".gql", ".sh",
    ].includes(extension)
  ) {
    return "source";
  }

  return "other";
}

function countLines(content: string): number {
  if (content.length === 0) return 0;

  const count = (content.match(/\n/g) ?? []).length;

  return content.endsWith("\n") ? count : count + 1;
}

function getSkipReason(
  fileName: string,
  extension: string,
  excludedFiles: Set<string>,
): FileSkipReason | null {
  if (excludedFiles.has(fileName)) {
    return "excluded_by_file_rule";
  }

  if (
    !SUPPORTED_EXTENSIONS.has(extension) &&
    !SUPPORTED_SPECIAL_FILES.has(fileName.toLowerCase())
  ) {
    return "unsupported_extension";
  }

  return null;
}

function addSkippedFile(
  skippedFiles: SkippedFile[],
  filePath: string,
  reason: FileSkipReason,
  message: string,
): void {
  skippedFiles.push({
    path: filePath,
    reason,
    message,
  });
}

async function walkDirectory(
  directoryPath: string,
  rootPath: string,
  excludedDirectories: Set<string>,
  excludedFiles: Set<string>,
  maxFileSizeBytes: number,
  files: FileNode[],
  skippedFiles: SkippedFile[],
  excludedDirectoryEntries: ExcludedDirectory[],
  scanIssues: DirectoryScanIssue[],
): Promise<void> {
  let entries;

  try {
    entries = await readdir(directoryPath, { withFileTypes: true });
  } catch (error) {
    scanIssues.push({
      path: toPosixPath(path.relative(rootPath, directoryPath)) || ".",
      reason: "unreadable_directory",
      message: error instanceof Error ? error.message : "Unable to read directory.",
    });
    return;
  }

  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const absolutePath = path.join(directoryPath, entry.name);
    const relativePath = toPosixPath(
      path.relative(rootPath, absolutePath),
    );

    if (entry.isSymbolicLink()) {
      scanIssues.push({
        path: relativePath,
        reason: "symbolic_link_ignored",
        message: "Symbolic links are not followed by the repository walker.",
      });
      continue;
    }

    if (entry.isDirectory()) {
      if (excludedDirectories.has(entry.name)) {
        excludedDirectoryEntries.push({
          path: relativePath,
          reason: "excluded_by_directory_rule",
        });
        continue;
      }

      await walkDirectory(
        absolutePath,
        rootPath,
        excludedDirectories,
        excludedFiles,
        maxFileSizeBytes,
        files,
        skippedFiles,
        excludedDirectoryEntries,
        scanIssues,
      );
      continue;
    }

    if (!entry.isFile()) continue;

    const extension = path.extname(entry.name).toLowerCase();
    const skipReason = getSkipReason(
      entry.name,
      extension,
      excludedFiles,
    );

    if (skipReason) {
      addSkippedFile(
        skippedFiles,
        relativePath,
        skipReason,
        skipReason === "excluded_by_file_rule"
          ? "File excluded by parser configuration."
          : `Unsupported file extension: ${extension || "(none)"}.`,
      );
      continue;
    }

    let fileStats;

    try {
      fileStats = await stat(absolutePath);
    } catch (error) {
      addSkippedFile(
        skippedFiles,
        relativePath,
        "unreadable",
        error instanceof Error ? error.message : "Unable to access file.",
      );
      continue;
    }

    if (fileStats.size > maxFileSizeBytes) {
      addSkippedFile(
        skippedFiles,
        relativePath,
        "file_too_large",
        `File exceeds the ${maxFileSizeBytes}-byte size limit.`,
      );
      continue;
    }

    let buffer: Buffer;

    try {
      buffer = await readFile(absolutePath);
    } catch (error) {
      addSkippedFile(
        skippedFiles,
        relativePath,
        "unreadable",
        error instanceof Error ? error.message : "Unable to read file.",
      );
      continue;
    }

    if (buffer.length === 0) {
      addSkippedFile(
        skippedFiles,
        relativePath,
        "empty_file",
        "File is empty.",
      );
      continue;
    }

    if (buffer.includes(0)) {
      addSkippedFile(
        skippedFiles,
        relativePath,
        "binary_file",
        "File contains null bytes and appears to be binary.",
      );
      continue;
    }

    let content: string;

    try {
      content = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
    } catch {
      addSkippedFile(
        skippedFiles,
        relativePath,
        "invalid_encoding",
        "File is not valid UTF-8.",
      );
      continue;
    }

    const folderPath = toPosixPath(path.dirname(relativePath));

    files.push({
      id: `file:${relativePath}`,
      path: relativePath,
      name: entry.name,
      extension,
      folderPath: folderPath === "." ? "." : folderPath,
      language: getLanguage(extension),
      kind: getFileKind(entry.name, extension),
      lineCount: countLines(content),
      sizeBytes: buffer.byteLength,
      contentHash: createHash("sha256").update(buffer).digest("hex"),
      fanIn: 0,
      fanOut: 0,
    });
  }
}

function buildFolders(
  files: FileNode[],
  rootName: string,
): FolderNode[] {
  const folders = new Map<string, FolderNode>();

  folders.set(".", {
    id: "folder:.",
    path: ".",
    name: rootName,
    parentPath: null,
    fileCount: 0,
  });

  for (const file of files) {
    const segments = file.folderPath === "."
      ? []
      : file.folderPath.split("/");

    const paths = ["."];
    let currentPath = "";

    for (const segment of segments) {
      currentPath = currentPath
        ? `${currentPath}/${segment}`
        : segment;

      paths.push(currentPath);
    }

    for (let index = 1; index < paths.length; index++) {
      const folderPath = paths[index];

      if (!folders.has(folderPath)) {
        folders.set(folderPath, {
          id: `folder:${folderPath}`,
          path: folderPath,
          name: path.posix.basename(folderPath),
          parentPath: paths[index - 1],
          fileCount: 0,
        });
      }
    }

    const directFolder = folders.get(file.folderPath);

    if (directFolder) {
      directFolder.fileCount++;
    }
  }

  return Array.from(folders.values()).sort((a, b) =>
    a.path.localeCompare(b.path),
  );
}

export async function walkRepository(
  options: RepositoryWalkerOptions,
): Promise<RepositoryWalkerResult> {
  const rootPath = path.resolve(options.rootPath);
  const maxFileSizeBytes =
    options.maxFileSizeBytes ?? DEFAULT_MAX_FILE_SIZE;

  if (
    !Number.isSafeInteger(maxFileSizeBytes) ||
    maxFileSizeBytes <= 0
  ) {
    throw new RepositoryWalkError(
      "Maximum file size must be a positive safe integer.",
    );
  }

  let rootStats;

  try {
    rootStats = await stat(rootPath);
  } catch {
    throw new RepositoryWalkError(
      `Repository path does not exist or cannot be accessed: ${rootPath}`,
    );
  }

  if (!rootStats.isDirectory()) {
    throw new RepositoryWalkError(
      `Repository path must be a directory: ${rootPath}`,
    );
  }

  const excludedDirectories = new Set([
    ...DEFAULT_EXCLUDED_DIRECTORIES,
    ...(options.excludedDirectories ?? []),
  ]);

  const excludedFiles = new Set([
    ...DEFAULT_EXCLUDED_FILES,
    ...(options.excludedFiles ?? []),
  ]);

  const files: FileNode[] = [];
  const skippedFiles: SkippedFile[] = [];
  const excludedDirectoryEntries: ExcludedDirectory[] = [];
  const scanIssues: DirectoryScanIssue[] = [];

  await walkDirectory(
    rootPath,
    rootPath,
    excludedDirectories,
    excludedFiles,
    maxFileSizeBytes,
    files,
    skippedFiles,
    excludedDirectoryEntries,
    scanIssues,
  );

  files.sort((a, b) => a.path.localeCompare(b.path));

  const rootName = path.basename(rootPath) || rootPath;
  const folders = buildFolders(files, rootName);
  const filesFound = files.length + skippedFiles.length;

  return {
    files,
    folders,
    skippedFiles,
    excludedDirectories: excludedDirectoryEntries,
    scanIssues,
    statistics: {
      filesFound,
      filesParsed: files.length,
      filesSkipped: skippedFiles.length,
      foldersFound: folders.length,
    },
  };
}
