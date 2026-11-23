
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { extractImports } from "../src/imports/import-extractor";

describe("import extractor", () => {
  it("extracts static imports", () => {
    const result = extractImports(
      "src/index.ts",
      [
        'import React from "react";',
        'import { useState } from "react";',
      ].join("\n"),
    );

    assert.equal(result.imports.length, 2);
    assert.equal(result.imports[0].specifier, "react");
    assert.equal(result.imports[0].kind, "static");
    assert.equal(result.imports[1].kind, "static");
  });

  it("extracts named and wildcard re-exports", () => {
    const result = extractImports(
      "src/index.ts",
      [
        'export { Button } from "./button";',
        'export * from "./utils";',
      ].join("\n"),
    );

    assert.equal(result.imports.length, 2);
    assert.ok(
      result.imports.every((item) => item.kind === "re-export"),
    );

    assert.deepEqual(
      result.imports.map((item) => item.specifier),
      ["./button", "./utils"],
    );
  });

  it("extracts dynamic imports", () => {
    const result = extractImports(
      "src/index.ts",
      'const module = await import("./module");',
    );

    assert.equal(result.imports.length, 1);
    assert.equal(result.imports[0].kind, "dynamic");
    assert.equal(result.imports[0].specifier, "./module");
  });

  it("extracts dynamic imports with template literals", () => {
    const result = extractImports(
      "src/index.ts",
      "const module = await import(`./module`);",
    );

    assert.equal(result.imports.length, 1);
    assert.equal(result.imports[0].kind, "dynamic");
    assert.equal(result.imports[0].specifier, "./module");
  });

  it("ignores computed dynamic imports", () => {
    const result = extractImports(
      "src/index.ts",
      [
        'const name = "./module";',
        "const module = await import(name);",
        "const other = await import(`./${name}`);",
      ].join("\n"),
    );

    assert.equal(result.imports.length, 0);
  });

  it("ignores comments and ordinary strings", () => {
    const result = extractImports(
      "src/index.ts",
      [
        '// import x from "./comment";',
        '/* export * from "./commented"; */',
        'const text = \'import x from "./string"\';',
      ].join("\n"),
    );

    assert.equal(result.imports.length, 0);
  });

  it("records one-based source positions", () => {
    const result = extractImports(
      "src/index.ts",
      [
        "",
        'import x from "./module";',
      ].join("\n"),
    );

    assert.equal(result.imports.length, 1);
    assert.equal(result.imports[0].line, 2);
    assert.equal(result.imports[0].column, 1);
  });

  it("preserves duplicate import occurrences", () => {
    const result = extractImports(
      "src/index.ts",
      [
        'import x from "./module";',
        'import y from "./module";',
      ].join("\n"),
    );

    assert.equal(result.imports.length, 2);
    assert.notEqual(
      result.imports[0].id,
      result.imports[1].id,
    );
  });

  it("extracts imports nested inside functions", () => {
    const result = extractImports(
      "src/index.ts",
      [
        "async function load() {",
        '  return import("./lazy");',
        "}",
      ].join("\n"),
    );

    assert.equal(result.imports.length, 1);
    assert.equal(result.imports[0].kind, "dynamic");
    assert.equal(result.imports[0].specifier, "./lazy");
  });
});
