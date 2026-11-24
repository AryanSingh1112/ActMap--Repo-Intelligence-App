
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";

import { parseRepository } from "../src/repository-parser";

async function createFixtureRepository(): Promise<string> {
  const rootPath = await mkdtemp(
    path.join(tmpdir(), "actmap-parser-"),
  );

  await mkdir(
    path.join(rootPath, "src", "utils"),
    { recursive: true },
  );

  await mkdir(
    path.join(rootPath, "src", "components"),
    { recursive: true },
  );

  await writeFile(
    path.join(rootPath, "src", "index.ts"),
    [
      'import { add } from "./utils/math";',
      'import Button from "./components/button";',
      'import React from "react";',
      "",
      "export { add } from './utils/math';",
      "",
      "console.log(add(1, 2));",
      "console.log(Button);",
      "console.log(React);",
    ].join("\n"),
    "utf8",
  );

  await writeFile(
    path.join(rootPath, "src", "utils", "math.ts"),
    [
      "export function add(a: number, b: number) {",
      "  return a + b;",
      "}",
    ].join("\n"),
    "utf8",
  );

  await writeFile(
    path.join(rootPath, "src", "components", "button.ts"),
    [
      "export default function Button() {",
      '  return "button";',
      "}",
    ].join("\n"),
    "utf8",
  );

  return rootPath;
}

describe("repository parser integration", () => {
  it("builds a complete repository map", async () => {
    const rootPath = await createFixtureRepository();

    const result = await parseRepository({
      rootPath,
    });

    assert.equal(result.schemaVersion, "1.3.0");

    assert.equal(
      result.repository.name,
      path.basename(rootPath),
    );

    assert.ok(
      result.repository.rootPath.endsWith(
        path.basename(rootPath),
      ),
    );

    assert.ok(result.repository.analyzedAt.length > 0);

    assert.ok(
      result.repository.parserVersion.startsWith("1.1.0+"),
    );

    assert.equal(result.statistics.filesFound, 3);
    assert.equal(result.statistics.filesParsed, 3);
    assert.equal(result.statistics.filesSkipped, 0);

    assert.equal(result.statistics.importsFound, 4);
    assert.equal(result.statistics.staticImports, 3);
    assert.equal(result.statistics.reExports, 1);
    assert.equal(result.statistics.dynamicImports, 0);

    assert.equal(result.statistics.externalImports, 1);
    assert.equal(result.statistics.resolvedImports, 3);
    assert.equal(result.statistics.unresolvedImports, 0);
    assert.equal(result.statistics.excludedImports, 0);

    assert.equal(result.statistics.edgesCreated, 2);
    assert.equal(result.coverage.total, 4);
    assert.equal(result.coverage.resolved, 3);
    assert.equal(result.coverage.external, 1);
    assert.equal(result.coverage.unresolved, 0);

    assert.equal(
      result.coverage.entries.length,
      result.statistics.importsFound,
    );

    assert.equal(
      result.coverage.entries.filter(
        (entry) => entry.status === "resolved",
      ).length,
      result.coverage.resolved,
    );

    assert.equal(
      result.coverage.entries.filter(
        (entry) => entry.status === "external",
      ).length,
      result.coverage.external,
    );

    assert.equal(
      result.coverage.entries.filter(
        (entry) => entry.status === "unresolved",
      ).length,
      result.coverage.unresolved,
    );

    const mathImportEntries = result.coverage.entries.filter(
      (entry) =>
        entry.occurrence.specifier === "./utils/math",
    );

    assert.equal(mathImportEntries.length, 2);

    for (const entry of mathImportEntries) {
      assert.equal(entry.status, "resolved");
      assert.equal(entry.reason, "resolved_extension");
      assert.equal(entry.resolvedPath, "src/utils/math.ts");
    }

    const buttonImport = result.coverage.entries.find(
      (entry) =>
        entry.occurrence.specifier === "./components/button",
    );

    assert.ok(buttonImport);
    assert.equal(buttonImport.status, "resolved");
    assert.equal(buttonImport.reason, "resolved_extension");
    assert.equal(
      buttonImport.resolvedPath,
      "src/components/button.ts",
    );

    const reactImport = result.coverage.entries.find(
      (entry) => entry.occurrence.specifier === "react",
    );

    assert.ok(reactImport);
    assert.equal(reactImport.status, "external");
    assert.equal(reactImport.reason, "external_package");

    assert.equal(result.edges.length, 2);

    const mathEdge = result.edges.find(
      (edge) =>
        edge.sourceFile === "src/index.ts" &&
        edge.targetFile === "src/utils/math.ts",
    );

    assert.ok(mathEdge);
    assert.equal(mathEdge.occurrenceCount, 2);

    assert.deepEqual(
      mathEdge.kinds,
      ["re-export", "static"],
    );

    const buttonEdge = result.edges.find(
      (edge) =>
        edge.sourceFile === "src/index.ts" &&
        edge.targetFile === "src/components/button.ts",
    );

    assert.ok(buttonEdge);
    assert.equal(buttonEdge.occurrenceCount, 1);
  });

  it("keeps unresolved imports instead of silently dropping them", async () => {
    const rootPath = await mkdtemp(
      path.join(tmpdir(), "actmap-unresolved-"),
    );

    await mkdir(
      path.join(rootPath, "src"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "src", "index.ts"),
      [
        'import missing from "./does-not-exist";',
        'import existing from "./existing";',
        "",
        "console.log(missing, existing);",
      ].join("\n"),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "existing.ts"),
      "export default 42;",
      "utf8",
    );

    const result = await parseRepository({
      rootPath,
    });

    assert.equal(result.statistics.importsFound, 2);
    assert.equal(result.statistics.resolvedImports, 1);
    assert.equal(result.statistics.unresolvedImports, 1);

    assert.equal(result.coverage.entries.length, 2);
    assert.equal(result.coverage.total, 2);

    assert.equal(result.coverage.unresolvedExamples.length, 1);

    assert.equal(
      result.coverage.unresolvedExamples[0].occurrence.specifier,
      "./does-not-exist",
    );

    assert.equal(
      result.coverage.unresolvedExamples[0].reason,
      "file_not_found",
    );

    const existingEntry = result.coverage.entries.find(
      (entry) => entry.occurrence.specifier === "./existing",
    );

    assert.ok(existingEntry);
    assert.equal(existingEntry.status, "resolved");
    assert.equal(existingEntry.reason, "resolved_extension");

    assert.equal(result.edges.length, 1);
    assert.equal(result.edges[0].targetFile, "src/existing.ts");
  });

  it("preserves fan-in and fan-out in the final repository map", async () => {
    const rootPath = await mkdtemp(
      path.join(tmpdir(), "actmap-fanin-"),
    );

    await mkdir(
      path.join(rootPath, "src"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "src", "a.ts"),
      [
        'import { value } from "./shared";',
        "console.log(value);",
      ].join("\n"),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "b.ts"),
      [
        'import { value } from "./shared";',
        "console.log(value);",
      ].join("\n"),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "shared.ts"),
      "export const value = 42;",
      "utf8",
    );

    const result = await parseRepository({
      rootPath,
    });

    const fileA = result.files.find(
      (file) => file.path === "src/a.ts",
    );

    const fileB = result.files.find(
      (file) => file.path === "src/b.ts",
    );

    const shared = result.files.find(
      (file) => file.path === "src/shared.ts",
    );

    assert.ok(fileA);
    assert.ok(fileB);
    assert.ok(shared);

    assert.equal(fileA.fanOut, 1);
    assert.equal(fileA.fanIn, 0);

    assert.equal(fileB.fanOut, 1);
    assert.equal(fileB.fanIn, 0);

    assert.equal(shared.fanIn, 2);
    assert.equal(shared.fanOut, 0);

    assert.equal(result.edges.length, 2);

    assert.equal(
      result.edges.filter(
        (edge) => edge.targetFile === "src/shared.ts",
      ).length,
      2,
    );
  });

  it("resolves configured TypeScript path aliases", async () => {
    const rootPath = await mkdtemp(
      path.join(tmpdir(), "actmap-alias-"),
    );

    await mkdir(
      path.join(rootPath, "src", "components"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "Bundler",
          paths: {
            "@/*": ["./src/*"],
          },
        },
      }),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "index.ts"),
      [
        'import Button from "@/components/button";',
        "console.log(Button);",
      ].join("\n"),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "components", "button.ts"),
      [
        "export default function Button() {",
        '  return "button";',
        "}",
      ].join("\n"),
      "utf8",
    );

    const result = await parseRepository({
      rootPath,
    });

    assert.equal(result.statistics.importsFound, 1);
    assert.equal(result.statistics.resolvedImports, 1);
    assert.equal(result.statistics.unresolvedImports, 0);
    assert.equal(result.edges.length, 1);

    assert.equal(
      result.edges[0].sourceFile,
      "src/index.ts",
    );

    assert.equal(
      result.edges[0].targetFile,
      "src/components/button.ts",
    );

    const aliasEntry = result.coverage.entries.find(
      (entry) =>
        entry.occurrence.specifier === "@/components/button",
    );

    assert.ok(aliasEntry);
    assert.equal(aliasEntry.status, "resolved");
    assert.equal(aliasEntry.reason, "resolved_path_alias");

    assert.equal(
      aliasEntry.resolvedPath,
      "src/components/button.ts",
    );
  });

  it("resolves imports using baseUrl", async () => {
    const rootPath = await mkdtemp(
      path.join(tmpdir(), "actmap-baseurl-"),
    );

    await mkdir(
      path.join(rootPath, "shared"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "Bundler",
          baseUrl: ".",
        },
      }),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "index.ts"),
      [
        'import { add } from "shared/math";',
        "console.log(add(1, 2));",
      ].join("\n"),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "shared", "math.ts"),
      "export const add = (a: number, b: number) => a + b;",
      "utf8",
    );

    const result = await parseRepository({ rootPath });

    assert.equal(result.statistics.importsFound, 1);
    assert.equal(result.statistics.resolvedImports, 1);
    assert.equal(result.statistics.unresolvedImports, 0);

    assert.equal(result.edges.length, 1);
    assert.equal(result.edges[0].targetFile, "shared/math.ts");

    const baseUrlEntry = result.coverage.entries.find(
      (entry) =>
        entry.occurrence.specifier === "shared/math",
    );

    assert.ok(baseUrlEntry);
    assert.equal(baseUrlEntry.status, "resolved");
    assert.equal(baseUrlEntry.reason, "resolved_base_url");
    assert.equal(baseUrlEntry.resolvedPath, "shared/math.ts");
  });

  it("resolves multiple wildcard path mappings", async () => {
    const rootPath = await mkdtemp(
      path.join(tmpdir(), "actmap-multiple-paths-"),
    );

    await mkdir(
      path.join(rootPath, "src", "components"),
      { recursive: true },
    );

    await mkdir(
      path.join(rootPath, "src", "utils"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "Bundler",
          paths: {
            "@components/*": ["./src/components/*"],
            "@utils/*": ["./src/utils/*"],
          },
        },
      }),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "index.ts"),
      [
        'import Button from "@components/button";',
        'import { add } from "@utils/math";',
        "console.log(Button, add(1, 2));",
      ].join("\n"),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "components", "button.ts"),
      'export default function Button() { return "button"; }',
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "utils", "math.ts"),
      "export const add = (a: number, b: number) => a + b;",
      "utf8",
    );

    const result = await parseRepository({ rootPath });

    assert.equal(result.statistics.importsFound, 2);
    assert.equal(result.statistics.resolvedImports, 2);
    assert.equal(result.statistics.unresolvedImports, 0);
    assert.equal(result.edges.length, 2);

    for (const specifier of [
      "@components/button",
      "@utils/math",
    ]) {
      const entry = result.coverage.entries.find(
        (item) => item.occurrence.specifier === specifier,
      );

      assert.ok(entry);
      assert.equal(entry.status, "resolved");
      assert.equal(entry.reason, "resolved_path_alias");
    }

    assert.ok(
      result.edges.some(
        (edge) => edge.targetFile === "src/components/button.ts",
      ),
    );

    assert.ok(
      result.edges.some(
        (edge) => edge.targetFile === "src/utils/math.ts",
      ),
    );
  });

  it("resolves path mappings inherited through tsconfig extends", async () => {
    const rootPath = await mkdtemp(
      path.join(tmpdir(), "actmap-tsconfig-extends-"),
    );

    await mkdir(
      path.join(rootPath, "src", "components"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "tsconfig.base.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "Bundler",
          paths: {
            "@/*": ["./src/*"],
          },
        },
      }),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "tsconfig.json"),
      JSON.stringify({
        extends: "./tsconfig.base.json",
        compilerOptions: {
          strict: true,
        },
      }),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "index.ts"),
      [
        'import Button from "@/components/button";',
        "console.log(Button);",
      ].join("\n"),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "components", "button.ts"),
      'export default function Button() { return "button"; }',
      "utf8",
    );

    const result = await parseRepository({ rootPath });

    assert.equal(result.statistics.importsFound, 1);
    assert.equal(result.statistics.resolvedImports, 1);
    assert.equal(result.statistics.unresolvedImports, 0);
    assert.equal(result.edges.length, 1);

    assert.equal(
      result.edges[0].targetFile,
      "src/components/button.ts",
    );

    const inheritedEntry = result.coverage.entries.find(
      (entry) =>
        entry.occurrence.specifier === "@/components/button",
    );

    assert.ok(inheritedEntry);
    assert.equal(inheritedEntry.status, "resolved");
    assert.equal(inheritedEntry.reason, "resolved_path_alias");
    assert.equal(
      inheritedEntry.resolvedPath,
      "src/components/button.ts",
    );
  });

  it("resolves package imports defined in package.json", async () => {
    const rootPath = await mkdtemp(
      path.join(tmpdir(), "actmap-package-imports-"),
    );

    await mkdir(
      path.join(rootPath, "src", "internal"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "package.json"),
      JSON.stringify({
        name: "actmap-package-imports-fixture",
        type: "module",
        imports: {
          "#internal/*.js": "./src/internal/*.js",
        },
      }),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ES2022",
          module: "NodeNext",
          moduleResolution: "NodeNext",
        },
      }),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "index.ts"),
      [
        'import { value } from "#internal/value.js";',
        "console.log(value);",
      ].join("\n"),
      "utf8",
    );

    await writeFile(
      path.join(rootPath, "src", "internal", "value.ts"),
      "export const value = 42;",
      "utf8",
    );

    const result = await parseRepository({ rootPath });

    assert.equal(result.statistics.importsFound, 1);
    assert.equal(result.statistics.resolvedImports, 1);
    assert.equal(result.statistics.unresolvedImports, 0);
    assert.equal(result.edges.length, 1);

    assert.equal(
      result.edges[0].targetFile,
      "src/internal/value.ts",
    );

    const packageImportEntry = result.coverage.entries.find(
      (entry) =>
        entry.occurrence.specifier === "#internal/value.js",
    );

    assert.ok(packageImportEntry);
    assert.equal(packageImportEntry.status, "resolved");
    assert.equal(
      packageImportEntry.reason,
      "resolved_package_import",
    );
    assert.equal(
      packageImportEntry.resolvedPath,
      "src/internal/value.ts",
    );
  });
});
