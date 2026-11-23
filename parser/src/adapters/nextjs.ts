import ts from "typescript";

import { mapConcurrent } from "../util/map-concurrent";

import type { ExtractedRoute } from "../types";
import type {
  DetectionContext,
  FrameworkAdapter,
  RoleClassifier,
  RouteContext,
} from "./framework-adapter";
import {
  baseName,
  isComponentFile,
  isConfigFile,
  isHookFile,
  isSourceFile,
  isTestFile,
} from "./role-helpers";

const NEXT_CONFIG = /^next\.config\.(js|mjs|cjs|ts|mts)$/;

const HTTP_METHODS = new Set([
  "GET", "HEAD", "POST", "PUT", "DELETE", "PATCH", "OPTIONS",
]);

const LOADING_AND_ERROR = new Set([
  "loading", "error", "not-found", "global-error", "default",
]);

const METADATA_FILES = new Set([
  "opengraph-image", "twitter-image", "icon", "apple-icon",
  "sitemap", "robots", "manifest",
]);

/**
 * The directories that are Next.js projects: the ones holding a next.config,
 * or a package.json that depends on next. A monorepo can hold several.
 */
function projectRoots(context: DetectionContext): string[] {
  const roots = new Set<string>();

  for (const file of context.files) {
    if (NEXT_CONFIG.test(file.name)) {
      roots.add(file.folderPath === "." ? "" : file.folderPath);
    }
  }

  for (const pkg of context.packages) {
    if (pkg.dependencies.has("next")) roots.add(pkg.directory);
  }

  if (roots.size === 0) roots.add("");

  // Longest first, so a nested project claims its own files.
  return [...roots].sort((a, b) => b.length - a.length);
}

/** The path inside the project that owns it. */
function projectRelative(path: string, roots: readonly string[]): string {
  for (const root of roots) {
    if (root === "") return path;
    if (path.startsWith(`${root}/`)) return path.slice(root.length + 1);
  }

  return path;
}

function afterPrefix(rel: string, prefixes: readonly string[]): string | null {
  for (const prefix of prefixes) {
    if (rel.startsWith(prefix)) return rel.slice(prefix.length);
  }

  return null;
}

const APP_PREFIXES = ["app/", "src/app/"];
const PAGES_PREFIXES = ["pages/", "src/pages/"];


/**
 * The URL a route handler's folder maps to, or null when the folder can't be
 * turned into one without guessing. Route groups, "(marketing)", do not appear
 * in the URL. Parallel slots, intercepting routes and private folders are
 * either not routable or depend on where the request came from, so they give
 * no route.
 */
function patternFromFolders(folders: readonly string[]): string | null {
  const parts: string[] = [];

  for (const folder of folders) {
    if (/^\(\.{1,3}\)/.test(folder)) return null;
    if (folder.startsWith("@")) return null;
    if (folder.startsWith("_")) return null;
    if (folder.startsWith("(") && folder.endsWith(")")) continue;
    parts.push(folder);
  }

  return `/${parts.join("/")}`;
}

function classifierFor(context: DetectionContext): RoleClassifier {
  const roots = projectRoots(context);

  return (file, facts) => {
    if (isTestFile(file)) return "Tests";
    if (isConfigFile(file)) return "Config files";

    if (!isSourceFile(file) || file.kind === "type-declaration") {
      return "Unclassified";
    }

    const rel = projectRelative(file.path, roots);
    const base = baseName(file);

    // Files Next.js looks for by name at the top of the project.
    if (rel === file.name || rel === `src/${file.name}`) {
      if (base === "middleware" || base === "proxy") return "Middleware";
      if (base === "instrumentation" || base === "instrumentation-client") {
        return "Instrumentation";
      }
    }

    const appRel = afterPrefix(rel, APP_PREFIXES);

    if (appRel !== null) {
      if (base === "page") return "Page routes";
      if (base === "route") return "API endpoints";
      if (base === "layout" || base === "template") return "Layouts";
      if (LOADING_AND_ERROR.has(base)) return "Loading & error UI";
      if (METADATA_FILES.has(base)) return "Metadata files";
    }

    const pagesRel = afterPrefix(rel, PAGES_PREFIXES);

    if (pagesRel !== null) {
      if (pagesRel.startsWith("api/")) return "API endpoints";
      if (base === "_app" || base === "_document") return "Layouts";
      if (base === "_error" || base === "404" || base === "500") {
        return "Loading & error UI";
      }
      if (!base.startsWith("_")) return "Page routes";
    }

    if (facts.directives.includes("use server")) return "Server actions";
    if (isHookFile(file)) return "Hooks";
    if (isComponentFile(file)) return "Components";

    return "Unclassified";
  };
}

/** Names exported from a route handler that are HTTP methods, with their lines. */
function exportedMethods(
  sourceFile: ts.SourceFile,
): { method: string; line: number }[] {
  const found = new Map<string, number>();

  function note(name: string, node: ts.Node): void {
    if (!HTTP_METHODS.has(name) || found.has(name)) return;

    found.set(
      name,
      sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1,
    );
  }

  function hasExport(node: ts.Node): boolean {
    return (
      ts.canHaveModifiers(node) &&
      (ts.getModifiers(node) ?? []).some(
        (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
      )
    );
  }

  function bindingNames(name: ts.BindingName, node: ts.Node): void {
    if (ts.isIdentifier(name)) {
      note(name.text, node);
      return;
    }

    for (const element of name.elements) {
      if (ts.isBindingElement(element)) bindingNames(element.name, node);
    }
  }

  for (const statement of sourceFile.statements) {
    // export async function GET() {}
    if (ts.isFunctionDeclaration(statement) && hasExport(statement) && statement.name) {
      note(statement.name.text, statement);
    }

    // export const POST = ..., export const { GET, POST } = handlers
    if (ts.isVariableStatement(statement) && hasExport(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        bindingNames(declaration.name, statement);
      }
    }

    // export { handler as GET }, export { GET } from "./handlers"
    if (
      ts.isExportDeclaration(statement) &&
      !statement.isTypeOnly &&
      statement.exportClause &&
      ts.isNamedExports(statement.exportClause)
    ) {
      for (const element of statement.exportClause.elements) {
        if (!element.isTypeOnly) note(element.name.text, statement);
      }
    }
  }

  return [...found.entries()]
    .map(([method, line]) => ({ method, line }))
    .sort((a, b) => a.line - b.line || a.method.localeCompare(b.method));
}

async function extractRoutes(context: RouteContext): Promise<ExtractedRoute[]> {
  const roots = projectRoots(context);

  const handlers = context.files.filter(
    (file) =>
      context.roles.get(file.path) === "API endpoints" &&
      baseName(file) === "route" &&
      afterPrefix(projectRelative(file.path, roots), APP_PREFIXES) !== null,
  );

  const perFile = await mapConcurrent(handlers, 16, async (file) => {
    const appRel = afterPrefix(projectRelative(file.path, roots), APP_PREFIXES)!;
    const folders = appRel.split("/").slice(0, -1);
    const pattern = patternFromFolders(folders);

    if (pattern === null) return [];

    const sourceFile = ts.createSourceFile(
      file.path,
      await context.read(file.path),
      ts.ScriptTarget.Latest,
      false,
      file.extension === ".tsx" || file.extension === ".jsx"
        ? ts.ScriptKind.TSX
        : file.extension === ".ts" || file.extension === ".mts" || file.extension === ".cts"
          ? ts.ScriptKind.TS
          : ts.ScriptKind.JS,
    );

    return exportedMethods(sourceFile).map(
      ({ method, line }): ExtractedRoute => ({
        id: `route:${method}:${pattern}:${file.path}:${line}`,
        method,
        pattern,
        sourceFile: file.path,
        line,
      }),
    );
  });

  return perFile
    .flat()
    .sort(
      (a, b) =>
        a.pattern.localeCompare(b.pattern) ||
        a.method.localeCompare(b.method) ||
        a.sourceFile.localeCompare(b.sourceFile),
    );
}

export const nextjsAdapter: FrameworkAdapter = {
  id: "nextjs",
  version: "1.0.0",

  detect(context) {
    return (
      context.rootDependencies.has("next") ||
      context.files.some((file) => file.folderPath === "." && NEXT_CONFIG.test(file.name)) ||
      context.allDependencies.has("next")
    );
  },

  classifier: classifierFor,
  extractRoutes,
};