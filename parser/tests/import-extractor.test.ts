
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

  it("extracts CommonJS require imports", () => {
    const result = extractImports(
      "src/index.ts",
      [
        'const express = require("express");',
        'const utils = require("./utils");',
      ].join("\n"),
    );

    assert.equal(result.imports.length, 2);

    assert.deepEqual(
      result.imports.map((item) => item.specifier),
      ["express", "./utils"],
    );

    assert.ok(
      result.imports.every((item) => item.kind === "require"),
    );
  });

  it("ignores computed require calls", () => {
    const result = extractImports(
      "src/index.ts",
      [
        'const name = "./module";',
        "const module = require(name);",
        'const other = require("./module", "extra");',
      ].join("\n"),
    );

    assert.equal(result.imports.length, 0);
  });

  it("does not treat property methods named require as imports", () => {
    const result = extractImports(
      "src/index.ts",
      'const value = loader.require("./module");',
    );

    assert.equal(result.imports.length, 0);
  });

  it("extracts CommonJS exports", () => {
    const result = extractImports(
      "src/index.js",
      [
        "exports.foo = foo;",
        "module.exports.bar = bar;",
      ].join("\n"),
    );

    assert.deepEqual(result.commonJsExports, ["bar", "foo"]);
  });

  it("extracts object properties assigned to module.exports", () => {
    const result = extractImports(
      "src/index.js",
      "module.exports = { foo, bar: value, baz() {} };",
    );

    assert.deepEqual(
      result.commonJsExports,
      ["bar", "baz", "foo"],
    );
  });

  it("ignores non-export assignments", () => {
    const result = extractImports(
      "src/index.js",
      [
        "const exports = {};",
        "object.foo = value;",
        "module.other = value;",
      ].join("\n"),
    );

    assert.deepEqual(result.commonJsExports, []);
  });

  it("extracts top-level directives", () => {
    const result = extractImports(
      "src/index.ts",
      [
        '"use client";',
        '"use strict";',
        "const value = 10;",
        '"use server";',
      ].join("\n"),
    );

    assert.deepEqual(
      result.directives,
      ["use client", "use strict"],
    );
  });

  it("does not extract import-like text from template strings", () => {
    const result = extractImports(
      "src/index.ts",
      [
        'const text = `import x from "./fake"`;',
        'const value = "require(\\"./fake\\")";',
      ].join("\n"),
    );

    assert.equal(result.imports.length, 0);
  });

  it("extracts imports from TSX files", () => {
    const result = extractImports(
      "src/component.tsx",
      [
        'import React from "react";',
        'import { Button } from "./button";',
        "export default function Component() {",
        "  return <Button />;",
        "}",
      ].join("\n"),
    );

    assert.deepEqual(
      result.imports.map((item) => item.specifier),
      ["react", "./button"],
    );
  });
});
