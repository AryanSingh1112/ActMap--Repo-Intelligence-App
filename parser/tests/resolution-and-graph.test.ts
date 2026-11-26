import { describe, it } from "node:test";
import assert from "node:assert/strict";

import type {
  FileNode,
  ImportCoverage,
  ImportCoverageEntry,
  ImportOccurrence,
} from "../src/types";

import { resolveImports } from "../src/resolution/import-resolver";
import { buildDependencyGraph } from "../src/graph/graph-builder";

function createOccurrence(
  sourceFile: string,
  specifier: string,
  kind: ImportOccurrence["kind"] = "static",
  line = 1,
): ImportOccurrence {
  return {
    id: `import:${sourceFile}:${kind}:${specifier}:${line}`,
    sourceFile,
    specifier,
    kind,
    line,
    column: 1,
  };
}

function createFile(path: string): FileNode {
  const name = path.split("/").pop() ?? path;
  const extensionIndex = name.lastIndexOf(".");
  const extension =
    extensionIndex >= 0
      ? name.slice(extensionIndex)
      : "";

  const folderPath =
    path.lastIndexOf("/") >= 0
      ? path.slice(0, path.lastIndexOf("/")) || "."
      : ".";

  return {
    id: path,
    path,
    name,
    extension,
    folderPath,
    language: "typescript",
    kind: "source",
    lineCount: 10,
    sizeBytes: 100,
    contentHash: `hash-${path}`,
    fanIn: 0,
    fanOut: 0,
  };
}

function createCoverage(
  entries: ImportCoverageEntry[],
): ImportCoverage {
  const resolved = entries.filter(
    (entry) => entry.status === "resolved",
  ).length;

  const external = entries.filter(
    (entry) => entry.status === "external",
  ).length;

  const excluded = entries.filter(
    (entry) => entry.status === "excluded",
  ).length;

  const unresolved = entries.filter(
    (entry) => entry.status === "unresolved",
  ).length;

  return {
    total: entries.length,
    resolved,
    external,
    excluded,
    unresolved,
    entries,
    unresolvedExamples: entries.filter(
      (entry) => entry.status === "unresolved",
    ),
  };
}

describe("import resolver", () => {
  it("resolves a TypeScript ESM import that names the emitted .js extension", () => {
    const cases: [string, string, string[]][] = [
      ["./observable.js", "src/observable.ts", ["src/index.ts", "src/observable.ts"]],
      ["./view.js", "src/view.tsx", ["src/index.ts", "src/view.tsx"]],
      ["./worker.mjs", "src/worker.mts", ["src/index.ts", "src/worker.mts"]],
      ["./types.js", "src/types.d.ts", ["src/index.ts", "src/types.d.ts"]],
    ];

    for (const [specifier, expected, knownFiles] of cases) {
      const result = resolveImports([createOccurrence("src/index.ts", specifier)], {
        rootPath: "/project",
        knownFiles,
        skippedFiles: [],
        excludedDirectories: [],
      });

      assert.equal(result.entries[0].status, "resolved", specifier);
      assert.equal(result.entries[0].resolvedPath, expected, specifier);
    }
  });

  it("resolves a require of the repository root from a nested folder", () => {
    for (const specifier of ["../..", "../../"]) {
      const result = resolveImports([createOccurrence("examples/auth/index.js", specifier, "require")], {
        rootPath: "/project",
        knownFiles: ["index.js", "examples/auth/index.js"],
        skippedFiles: [],
        excludedDirectories: [],
      });

      assert.equal(result.entries[0].status, "resolved", specifier);
      assert.equal(result.entries[0].resolvedPath, "index.js", specifier);
    }
  });

  it("still reports a .js import as missing when no source file exists", () => {
    const result = resolveImports([createOccurrence("src/index.ts", "./gone.js")], {
      rootPath: "/project",
      knownFiles: ["src/index.ts"],
      skippedFiles: [],
      excludedDirectories: [],
    });

    assert.equal(result.entries[0].status, "unresolved");
  });

  it("resolves an exact relative import", () => {
    const occurrence = createOccurrence(
      "src/index.ts",
      "./utils.ts",
    );

    const result = resolveImports(
      [occurrence],
      {
        rootPath: "/project",
        knownFiles: [
          "src/index.ts",
          "src/utils.ts",
        ],
        skippedFiles: [],
        excludedDirectories: [],
      },
    );

    assert.equal(result.entries.length, 1);
    assert.equal(
      result.entries[0].status,
      "resolved",
    );
    assert.equal(
      result.entries[0].reason,
      "resolved_exact",
    );
    assert.equal(
      result.entries[0].resolvedPath,
      "src/utils.ts",
    );
  });

  it("resolves a relative import by extension", () => {
    const occurrence = createOccurrence(
      "src/index.ts",
      "./utils",
    );

    const result = resolveImports(
      [occurrence],
      {
        rootPath: "/project",
        knownFiles: [
          "src/index.ts",
          "src/utils.ts",
        ],
        skippedFiles: [],
        excludedDirectories: [],
      },
    );

    assert.equal(result.entries.length, 1);
    assert.equal(
      result.entries[0].status,
      "resolved",
    );
    assert.equal(
      result.entries[0].reason,
      "resolved_extension",
    );
    assert.equal(
      result.entries[0].resolvedPath,
      "src/utils.ts",
    );
  });

  it("resolves a directory import through index.ts", () => {
    const occurrence = createOccurrence(
      "src/index.ts",
      "./components",
    );

    const result = resolveImports(
      [occurrence],
      {
        rootPath: "/project",
        knownFiles: [
          "src/index.ts",
          "src/components/index.ts",
        ],
        skippedFiles: [],
        excludedDirectories: [],
      },
    );

    assert.equal(result.entries.length, 1);
    assert.equal(
      result.entries[0].status,
      "resolved",
    );
    assert.equal(
      result.entries[0].reason,
      "resolved_index",
    );
    assert.equal(
      result.entries[0].resolvedPath,
      "src/components/index.ts",
    );
  });

  it("classifies external packages correctly", () => {
    const occurrences = [
      createOccurrence(
        "src/index.ts",
        "react",
      ),
      createOccurrence(
        "src/index.ts",
        "@clerk/nextjs",
        "static",
        2,
      ),
    ];

    const result = resolveImports(
      occurrences,
      {
        rootPath: "/project",
        knownFiles: ["src/index.ts"],
        skippedFiles: [],
        excludedDirectories: [],
      },
    );

    assert.equal(result.entries.length, 2);

    assert.equal(
      result.entries[0].status,
      "external",
    );

    assert.equal(
      result.entries[0].reason,
      "external_package",
    );

    assert.equal(
      result.entries[0].packageName,
      "react",
    );

    assert.equal(
      result.entries[1].status,
      "external",
    );

    assert.equal(
      result.entries[1].packageName,
      "@clerk/nextjs",
    );
  });

  it("reports missing relative imports as unresolved", () => {
    const occurrence = createOccurrence(
      "src/index.ts",
      "./missing",
    );

    const result = resolveImports(
      [occurrence],
      {
        rootPath: "/project",
        knownFiles: ["src/index.ts"],
        skippedFiles: [],
        excludedDirectories: [],
      },
    );

    assert.equal(result.entries.length, 1);
    assert.equal(
      result.entries[0].status,
      "unresolved",
    );
    assert.equal(
      result.entries[0].reason,
      "file_not_found",
    );
    assert.equal(
      result.entries[0].resolvedPath,
      null,
    );
  });

  it("does not guess path aliases", () => {
    const occurrence = createOccurrence(
      "src/index.ts",
      "@/components/button",
    );

    const result = resolveImports(
      [occurrence],
      {
        rootPath: "/project",
        knownFiles: ["src/index.ts"],
        skippedFiles: [],
        excludedDirectories: [],
      },
    );

    assert.equal(result.entries.length, 1);
    assert.equal(
      result.entries[0].status,
      "unresolved",
    );
    assert.equal(
      result.entries[0].reason,
      "unsupported_resolution",
    );
  });

  it("reports imports into excluded directories", () => {
    const occurrence = createOccurrence(
      "src/index.ts",
      "./vendor/module",
    );

    const result = resolveImports(
      [occurrence],
      {
        rootPath: "/project",
        knownFiles: ["src/index.ts"],
        skippedFiles: [],
        excludedDirectories: [
          {
            path: "src/vendor",
            reason: "excluded_by_directory_rule",
          },
        ],
      },
    );

    assert.equal(result.entries.length, 1);
    assert.equal(
      result.entries[0].status,
      "excluded",
    );
    assert.equal(
      result.entries[0].reason,
      "excluded_by_directory_rule",
    );
  });
});

describe("dependency graph builder", () => {
  it("deduplicates multiple imports between the same files", () => {
    const files = [
      createFile("src/index.ts"),
      createFile("src/utils.ts"),
    ];

    const occurrences = [
      createOccurrence(
        "src/index.ts",
        "./utils",
        "static",
        1,
      ),
      createOccurrence(
        "src/index.ts",
        "./utils",
        "static",
        2,
      ),
    ];

    const coverage = createCoverage([
      {
        occurrence: occurrences[0],
        status: "resolved",
        reason: "resolved_extension",
        resolvedPath: "src/utils.ts",
        packageName: null,
        message: null,
      },
      {
        occurrence: occurrences[1],
        status: "resolved",
        reason: "resolved_extension",
        resolvedPath: "src/utils.ts",
        packageName: null,
        message: null,
      },
    ]);

    const result = buildDependencyGraph(
      files,
      coverage,
    );

    assert.equal(result.edges.length, 1);

    assert.equal(
      result.edges[0].sourceFile,
      "src/index.ts",
    );

    assert.equal(
      result.edges[0].targetFile,
      "src/utils.ts",
    );

    assert.equal(
      result.edges[0].occurrenceCount,
      2,
    );

    assert.equal(
      result.edges[0].occurrences.length,
      2,
    );
  });

  it("calculates fan-in and fan-out from unique edges", () => {
    const files = [
      createFile("src/a.ts"),
      createFile("src/b.ts"),
      createFile("src/c.ts"),
    ];

    const occurrences = [
      createOccurrence(
        "src/a.ts",
        "./b",
        "static",
        1,
      ),
      createOccurrence(
        "src/a.ts",
        "./b",
        "static",
        2,
      ),
      createOccurrence(
        "src/a.ts",
        "./c",
        "static",
        3,
      ),
      createOccurrence(
        "src/c.ts",
        "./b",
        "static",
        4,
      ),
    ];

    const coverage = createCoverage([
      {
        occurrence: occurrences[0],
        status: "resolved",
        reason: "resolved_extension",
        resolvedPath: "src/b.ts",
        packageName: null,
        message: null,
      },
      {
        occurrence: occurrences[1],
        status: "resolved",
        reason: "resolved_extension",
        resolvedPath: "src/b.ts",
        packageName: null,
        message: null,
      },
      {
        occurrence: occurrences[2],
        status: "resolved",
        reason: "resolved_extension",
        resolvedPath: "src/c.ts",
        packageName: null,
        message: null,
      },
      {
        occurrence: occurrences[3],
        status: "resolved",
        reason: "resolved_extension",
        resolvedPath: "src/b.ts",
        packageName: null,
        message: null,
      },
    ]);

    const result = buildDependencyGraph(
      files,
      coverage,
    );

    const fileA = result.files.find(
      (file) => file.path === "src/a.ts",
    );

    const fileB = result.files.find(
      (file) => file.path === "src/b.ts",
    );

    const fileC = result.files.find(
      (file) => file.path === "src/c.ts",
    );

    assert.ok(fileA);
    assert.ok(fileB);
    assert.ok(fileC);

    assert.equal(fileA.fanOut, 2);
    assert.equal(fileA.fanIn, 0);

    assert.equal(fileB.fanIn, 2);
    assert.equal(fileB.fanOut, 0);

    assert.equal(fileC.fanIn, 1);
    assert.equal(fileC.fanOut, 1);

    assert.equal(result.edges.length, 3);
  });

  it("does not create edges for external or unresolved imports", () => {
    const files = [
      createFile("src/index.ts"),
      createFile("src/utils.ts"),
    ];

    const occurrences = [
      createOccurrence(
        "src/index.ts",
        "react",
        "static",
        1,
      ),
      createOccurrence(
        "src/index.ts",
        "./missing",
        "static",
        2,
      ),
      createOccurrence(
        "src/index.ts",
        "./utils",
        "static",
        3,
      ),
    ];

    const coverage = createCoverage([
      {
        occurrence: occurrences[0],
        status: "external",
        reason: "external_package",
        resolvedPath: null,
        packageName: "react",
        message: null,
      },
      {
        occurrence: occurrences[1],
        status: "unresolved",
        reason: "file_not_found",
        resolvedPath: null,
        packageName: null,
        message: "Target file was not found.",
      },
      {
        occurrence: occurrences[2],
        status: "resolved",
        reason: "resolved_extension",
        resolvedPath: "src/utils.ts",
        packageName: null,
        message: null,
      },
    ]);

    const result = buildDependencyGraph(
      files,
      coverage,
    );

    assert.equal(result.edges.length, 1);

    assert.equal(
      result.edges[0].sourceFile,
      "src/index.ts",
    );

    assert.equal(
      result.edges[0].targetFile,
      "src/utils.ts",
    );
  });
});