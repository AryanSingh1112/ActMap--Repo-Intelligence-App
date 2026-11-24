
import { frameworkLabel } from "../../parser/taxonomy/categories";
import { getEntrypointPaths } from "../actmap/entrypoints";
import { getBlastRadius, getDependencyChain } from "../actmap/graph";
import { buildModel, categoryOf } from "../actmap/model";

import type { RepositoryData } from "../../types/actmap";

export const TOOL_NAMES = [
  "summary",
  "search",
  "by-role",
  "neighbours",
  "walk",
  "routes",
] as const;

export type ToolName = (typeof TOOL_NAMES)[number];

const LIMIT = {
  search: 30,
  role: 60,
  neighbours: 60,
  walk: 100,
  routes: 100,
  top: 10,
};

type Input = Record<string, unknown>;

type Result =
  | { ok: true; body: unknown }
  | { ok: false; status: number; message: string };

const fail = (message: string, status = 400): Result => ({
  ok: false,
  status,
  message,
});

const ok = (body: unknown): Result => ({ ok: true, body });

const text = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

// Reuse the built model while the same repository data object is cached.
const modelCache = new WeakMap<
  RepositoryData,
  ReturnType<typeof buildModel>
>();

function getModel(data: RepositoryData) {
  const cached = modelCache.get(data);

  if (cached) return cached;

  const model = buildModel(data.files, data.edges, data.adapter);

  modelCache.set(data, model);

  return model;
}

export function runTool(
  name: ToolName,
  input: Input,
  data: RepositoryData,
): Result {
  const model = getModel(data);

  console.log("[actmap tool]", {
    name,
    repository: data.name,
    analysisFiles: data.files.length,
    modelFiles: model.files.length,
    edges: data.edges.length,
    adapter: data.adapter,
  });

  const roleOf = (path: string) => {
    const file = model.fileMap.get(path);
    return file ? categoryOf(file) : "Unknown";
  };

  const known = (path: string): Result | null => {
    if (model.fileMap.has(path)) return null;

    const base = path.slice(path.lastIndexOf("/") + 1).toLowerCase();

    const close = base
      ? model.files
          .filter((file) => file.name.toLowerCase() === base)
          .map((file) => file.path)
          .slice(0, 5)
      : [];

    console.log("[actmap tool] file not found", {
      requestedPath: path,
      modelFileCount: model.files.length,
      suggestions: close,
    });

    return fail(
      `No file at "${path}" in this repository.${
        close.length ? ` Did you mean: ${close.join(", ")}` : ""
      }`,
      404,
    );
  };

  switch (name) {
    case "summary": {
      const entries = [...getEntrypointPaths(model.files)].sort();

      return ok({
        repository: data.name,
        commit: data.commitSha,
        framework: frameworkLabel(data.adapter),
        files: model.files.length,
        imports: model.edges.length,
        totalLines: model.totalLines,
        routes: data.routes.length,
        categories: model.categories.filter(
          (category) => category.count > 0,
        ),
        mostImported: [...model.files]
          .sort(
            (a, b) =>
              b.fanIn - a.fanIn || a.path.localeCompare(b.path),
          )
          .slice(0, LIMIT.top)
          .map((file) => ({
            path: file.path,
            role: roleOf(file.path),
            importedBy: file.fanIn,
          })),
        entryPoints: entries.slice(0, 15),
      });
    }

    case "search": {
      const query = text(input.query).toLowerCase();

      if (!query) return fail("query is required");

      const hits = model.files.filter((file) =>
        file.path.toLowerCase().includes(query),
      );

      console.log("[actmap search]", {
        query,
        total: hits.length,
        paths: hits.slice(0, LIMIT.search).map((file) => file.path),
      });

      return ok({
        query,
        total: hits.length,
        files: hits.slice(0, LIMIT.search).map((file) => ({
          path: file.path,
          role: roleOf(file.path),
          lines: file.lineCount,
          importedBy: file.fanIn,
        })),
      });
    }

    case "by-role": {
      const wanted = text(input.role).toLowerCase();

      if (!wanted) return fail("role is required");

      const match =
        model.categories.find(
          (category) => category.name.toLowerCase() === wanted,
        ) ??
        model.categories.find((category) =>
          category.name.toLowerCase().startsWith(wanted),
        );

      if (!match) {
        return fail(
          `No category "${text(input.role)}". Categories here: ${model.categories
            .map((category) => category.name)
            .join(", ")}`,
          404,
        );
      }

      const files = model.files
        .filter((file) => categoryOf(file) === match.name)
        .sort(
          (a, b) =>
            b.fanIn - a.fanIn || a.path.localeCompare(b.path),
        );

      return ok({
        role: match.name,
        total: files.length,
        files: files.slice(0, LIMIT.role).map((file) => ({
          path: file.path,
          lines: file.lineCount,
          importedBy: file.fanIn,
        })),
      });
    }

    case "neighbours": {
      const path = text(input.path);
      const missing = known(path);

      if (missing) return missing;

      const imports = model.imports.get(path) ?? [];
      const importedBy = model.importedBy.get(path) ?? [];

      const shape = (paths: string[]) =>
        paths.slice(0, LIMIT.neighbours).map((filePath) => ({
          path: filePath,
          role: roleOf(filePath),
        }));

      return ok({
        path,
        role: roleOf(path),
        importsTotal: imports.length,
        imports: shape(imports),
        importedByTotal: importedBy.length,
        importedBy: shape(importedBy),
      });
    }

    case "walk": {
      const path = text(input.path);
      const missing = known(path);

      if (missing) return missing;

      const direction =
        input.direction === "outgoing"
          ? "outgoing"
          : input.direction === "incoming"
            ? "incoming"
            : null;

      if (!direction) {
        return fail('direction must be "incoming" or "outgoing"');
      }

      const depth = Math.min(
        5,
        Math.max(1, Math.floor(Number(input.max_depth) || 2)),
      );

      const results =
        direction === "incoming"
          ? getBlastRadius(path, model.edges, depth)
          : getDependencyChain(path, model.edges, depth);

      const byDepth: Record<string, number> = {};

      for (const result of results) {
        byDepth[result.depth] = (byDepth[result.depth] ?? 0) + 1;
      }

      return ok({
        path,
        direction,
        maxDepth: depth,
        total: results.length,
        byDepth,
        results: results.slice(0, LIMIT.walk).map((result) => ({
          path: result.path,
          depth: result.depth,
          role: roleOf(result.path),
        })),
      });
    }

    case "routes": {
      const contains = text(input.contains).toLowerCase();

      const routes = data.routes.filter(
        (route) =>
          !contains || route.pattern.toLowerCase().includes(contains),
      );

      return ok({
        total: routes.length,
        routes: routes.slice(0, LIMIT.routes).map((route) => ({
          method: route.method,
          pattern: route.pattern,
          file: route.file,
          line: route.line,
        })),
        note:
          data.routes.length === 0
            ? `No routes were read for this ${frameworkLabel(
                data.adapter,
              )} repository. Routes are only listed when their method and full path can be read exactly from the code.`
            : undefined,
      });
    }
  }
}
