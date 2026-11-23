import type { FileNode } from "../types";

export const SOURCE_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mts", ".cts", ".mjs", ".cjs",
]);

const TEST_DIRECTORIES = new Set(["__tests__", "tests", "test", "e2e"]);

export function isSourceFile(file: FileNode): boolean {
  return SOURCE_EXTENSIONS.has(file.extension.toLowerCase());
}

/** The file name without its last extension: "page.tsx" -> "page". */
export function baseName(file: FileNode): string {
  const extension = file.extension;
  return extension && file.name.endsWith(extension)
    ? file.name.slice(0, -extension.length)
    : file.name;
}

/** The folders a file sits in, lower-cased. */
export function folderSegments(file: FileNode): string[] {
  if (!file.folderPath || file.folderPath === ".") return [];
  return file.folderPath.toLowerCase().split("/").filter(Boolean);
}

export function isTestFile(file: FileNode): boolean {
  return (
    file.kind === "test" ||
    /\.(e2e-spec|e2e)$/.test(baseName(file).toLowerCase()) ||
    folderSegments(file).some((segment) => TEST_DIRECTORIES.has(segment))
  );
}

export function isConfigFile(file: FileNode): boolean {
  const base = baseName(file).toLowerCase();

  return (
    file.kind === "configuration" ||
    base.endsWith(".config") ||
    /^\.(eslintrc|prettierrc|babelrc)/.test(base)
  );
}

export function isHookFile(file: FileNode): boolean {
  if (!isSourceFile(file)) return false;

  const base = baseName(file);

  return (
    /^use[A-Z0-9]/.test(base) ||
    /^use-/.test(base) ||
    folderSegments(file).includes("hooks")
  );
}

export function isComponentFile(file: FileNode): boolean {
  const extension = file.extension.toLowerCase();

  return (
    extension === ".tsx" ||
    extension === ".jsx" ||
    folderSegments(file).some(
      (segment) => segment === "components" || segment === "_components",
    )
  );
}

export function hasFolder(file: FileNode, names: ReadonlySet<string>): boolean {
  return folderSegments(file).some((segment) => names.has(segment));
}

/** The folder closest to the file that is one of `names`, or null. */
export function nearestFolder(
  file: FileNode,
  names: ReadonlySet<string>,
): string | null {
  const segments = folderSegments(file);

  for (let index = segments.length - 1; index >= 0; index -= 1) {
    if (names.has(segments[index])) return segments[index];
  }

  return null;
}