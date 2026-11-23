
import type { RepositoryFile } from "../../types/actmap";

const ENTRY_POINT_NAMES = new Set([
  "page",
  "route",
  "layout",
  "template",
  "default",
  "error",
  "not-found",
  "loading",
  "global-error",
  "middleware",
  "proxy",
  "instrumentation",
  "sitemap",
  "robots",
  "icon",
  "apple-icon",
  "opengraph-image",
  "twitter-image",
  "_app",
  "_document",
  "_error",
]);

const CONFIG_NAMES = [
  "next.config",
  "vite.config",
  "webpack.config",
  "postcss.config",
  "tailwind.config",
  "eslint.config",
  ".eslintrc",
  "tsconfig",
  "jsconfig",
  "babel.config",
  "jest.config",
  "vitest.config",
  "playwright.config",
  "prettier.config",
];

function getBaseName(filePath: string): string {
  const fileName = filePath.split("/").pop() ?? "";
  return fileName.replace(/\.[^.]+$/, "").toLowerCase();
}

export function isFrameworkEntrypoint(file: RepositoryFile): boolean {
  const baseName = getBaseName(file.path);

  if (ENTRY_POINT_NAMES.has(baseName)) {
    return true;
  }

  if (CONFIG_NAMES.some((name) => baseName.startsWith(name))) {
    return true;
  }

  if (baseName === "package" || baseName === "manifest") {
    return true;
  }

  return false;
}

export function getEntrypointPaths(
  files: RepositoryFile[],
): Set<string> {
  return new Set(
    files
      .filter(isFrameworkEntrypoint)
      .map((file) => file.path),
  );
}
