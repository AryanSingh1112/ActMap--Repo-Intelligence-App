import { describe, it } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";

import { parseRepository } from "../src/repository-parser";

import {
  deserializeRepositoryMap,
  RepositoryMapValidationError,
  serializeRepositoryMap,
  validateRepositoryMap,
} from "../src/output/repository-map-output";

async function createFixtureRepository(): Promise<string> {
  const rootPath = await mkdtemp(
    path.join(tmpdir(), "actmap-output-"),
  );

  await mkdir(
    path.join(rootPath, "src", "utils"),
    { recursive: true },
  );

  await writeFile(
    path.join(rootPath, "src", "index.ts"),
    [
      'import { add } from "./utils/math";',
      'import React from "react";',
      "",
      "console.log(add(1, 2));",
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

  return rootPath;
}

describe("repository map output", () => {
  it("serializes and deserializes a complete repository map", async () => {
    const rootPath = await createFixtureRepository();

    const original = await parseRepository({
      rootPath,
    });

    const json = serializeRepositoryMap(original);

    assert.ok(json.length > 0);

    assert.doesNotThrow(() => {
      JSON.parse(json);
    });

    const restored = deserializeRepositoryMap(json);

    assert.deepEqual(restored, original);
  });

  it("preserves repository statistics through serialization", async () => {
    const rootPath = await createFixtureRepository();

    const original = await parseRepository({
      rootPath,
    });

    const json = serializeRepositoryMap(original);
    const restored = deserializeRepositoryMap(json);

    assert.deepEqual(
      restored.statistics,
      original.statistics,
    );

    assert.equal(
      restored.statistics.filesFound,
      2,
    );

    assert.equal(
      restored.statistics.filesParsed,
      2,
    );

    assert.equal(
      restored.statistics.importsFound,
      2,
    );

    assert.equal(
      restored.statistics.resolvedImports,
      1,
    );

    assert.equal(
      restored.statistics.externalImports,
      1,
    );

    assert.equal(
      restored.statistics.edgesCreated,
      1,
    );
  });

  it("preserves dependency edges and occurrences", async () => {
    const rootPath = await createFixtureRepository();

    const original = await parseRepository({
      rootPath,
    });

    const json = serializeRepositoryMap(original);
    const restored = deserializeRepositoryMap(json);

    assert.equal(
      restored.edges.length,
      original.edges.length,
    );

    assert.deepEqual(
      restored.edges,
      original.edges,
    );

    assert.equal(
      restored.edges[0].occurrenceCount,
      1,
    );

    assert.equal(
      restored.edges[0].occurrences.length,
      1,
    );
  });

  it("preserves import coverage through serialization", async () => {
    const rootPath = await createFixtureRepository();

    const original = await parseRepository({
      rootPath,
    });

    const json = serializeRepositoryMap(original);
    const restored = deserializeRepositoryMap(json);

    assert.deepEqual(
      restored.coverage,
      original.coverage,
    );

    assert.equal(
      restored.coverage.total,
      2,
    );

    assert.equal(
      restored.coverage.resolved,
      1,
    );

    assert.equal(
      restored.coverage.external,
      1,
    );

    assert.equal(
      restored.coverage.unresolved,
      0,
    );

    assert.equal(
      restored.coverage.entries.length,
      2,
    );
  });

  it("rejects malformed JSON", () => {
    assert.throws(
      () => deserializeRepositoryMap("{invalid-json"),
      (error: unknown) => {
        assert.ok(
          error instanceof RepositoryMapValidationError,
        );

        assert.equal(
          error.message,
          "The supplied JSON is invalid.",
        );

        return true;
      },
    );
  });

  it("rejects an unsupported schema version", async () => {
    const rootPath = await createFixtureRepository();

    const original = await parseRepository({
      rootPath,
    });

    const parsed: unknown = JSON.parse(
      serializeRepositoryMap(original),
    );

    assert.ok(
      typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed),
    );

    (
      parsed as Record<string, unknown>
    ).schemaVersion = "999.0.0";

    assert.throws(
      () => validateRepositoryMap(parsed),
      (error: unknown) => {
        assert.ok(
          error instanceof RepositoryMapValidationError,
        );

        assert.equal(
          error.message,
          "Unsupported schema version: 999.0.0.",
        );

        return true;
      },
    );
  });

  it("rejects inconsistent file statistics", async () => {
    const rootPath = await createFixtureRepository();

    const original = await parseRepository({
      rootPath,
    });

    const parsed: unknown = JSON.parse(
      serializeRepositoryMap(original),
    );

    assert.ok(
      typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed),
    );

    const statistics = (
      parsed as Record<string, unknown>
    ).statistics;

    assert.ok(
      typeof statistics === "object" &&
        statistics !== null &&
        !Array.isArray(statistics),
    );

    (
      statistics as Record<string, unknown>
    ).filesFound = 999;

    assert.throws(
      () => validateRepositoryMap(parsed),
      (error: unknown) => {
        assert.ok(
          error instanceof RepositoryMapValidationError,
        );

        assert.equal(
          error.message,
          "File counts do not reconcile.",
        );

        return true;
      },
    );
  });

  it("rejects inconsistent coverage statistics", async () => {
    const rootPath = await createFixtureRepository();

    const original = await parseRepository({
      rootPath,
    });

    const parsed: unknown = JSON.parse(
      serializeRepositoryMap(original),
    );

    assert.ok(
      typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed),
    );

    const coverage = (
      parsed as Record<string, unknown>
    ).coverage;

    assert.ok(
      typeof coverage === "object" &&
        coverage !== null &&
        !Array.isArray(coverage),
    );

    (
      coverage as Record<string, unknown>
    ).resolved = 999;

    assert.throws(
      () => validateRepositoryMap(parsed),
      (error: unknown) => {
        assert.ok(
          error instanceof RepositoryMapValidationError,
        );

        assert.equal(
          error.message,
          "Import coverage counts do not reconcile.",
        );

        return true;
      },
    );
  });

  it("rejects inconsistent import statistics", async () => {
    const rootPath = await createFixtureRepository();

    const original = await parseRepository({
      rootPath,
    });

    const parsed: unknown = JSON.parse(
      serializeRepositoryMap(original),
    );

    assert.ok(
      typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed),
    );

    const statistics = (
      parsed as Record<string, unknown>
    ).statistics;

    assert.ok(
      typeof statistics === "object" &&
        statistics !== null &&
        !Array.isArray(statistics),
    );

    (
      statistics as Record<string, unknown>
    ).importsFound = 999;

    assert.throws(
      () => validateRepositoryMap(parsed),
      (error: unknown) => {
        assert.ok(
          error instanceof RepositoryMapValidationError,
        );

        assert.equal(
          error.message,
          "Import count does not match coverage total.",
        );

        return true;
      },
    );
  });

  it("produces deterministic JSON for the same repository map", async () => {
    const rootPath = await createFixtureRepository();

    const first = await parseRepository({
      rootPath,
    });

    const firstJson = serializeRepositoryMap(first);

    const second = await parseRepository({
      rootPath,
    });

    const secondJson = serializeRepositoryMap(second);

    const firstParsed: Record<string, unknown> =
      JSON.parse(firstJson);

    const secondParsed: Record<string, unknown> =
      JSON.parse(secondJson);

    assert.deepEqual(
      {
        ...firstParsed,
        repository: {
          ...(firstParsed.repository as Record<string, unknown>),
          analyzedAt: "<timestamp>",
        },
      },
      {
        ...secondParsed,
        repository: {
          ...(secondParsed.repository as Record<string, unknown>),
          analyzedAt: "<timestamp>",
        },
      },
    );
  });
});