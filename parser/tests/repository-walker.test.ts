
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
import { test } from "node:test";

import {
  RepositoryWalkError,
  walkRepository,
} from "../src/walker/repository-walker";

async function withTempRepository<T>(
  callback: (rootPath: string) => Promise<T>,
): Promise<T> {
  const rootPath = await mkdtemp(
    path.join(tmpdir(), "actmap-walker-test-"),
  );

  try {
    return await callback(rootPath);
  } finally {
    await rm(rootPath, { recursive: true, force: true });
  }
}

test("parses files with correct metadata, line counts and hashes", async () => {
  await withTempRepository(async (rootPath) => {
    const source = "export const first = 1;\nexport const second = 2;\n";

    await mkdir(path.join(rootPath, "src"));
    await writeFile(path.join(rootPath, "src", "index.ts"), source);

    await writeFile(
      path.join(rootPath, ".env.local"),
      "SECRET_KEY=example-secret\n",
    );

    const result = await walkRepository({ rootPath });

    const sourceFile = result.files.find(
      (file) => file.path === "src/index.ts",
    );

    assert.ok(sourceFile);
    assert.equal(sourceFile.language, "typescript");
    assert.equal(sourceFile.kind, "source");
    assert.equal(sourceFile.folderPath, "src");
    assert.equal(sourceFile.lineCount, 2);
    assert.equal(sourceFile.sizeBytes, Buffer.byteLength(source));

    const expectedHash = createHash("sha256")
      .update(source)
      .digest("hex");

    assert.equal(sourceFile.contentHash, expectedHash);

    const envFile = result.files.find(
      (file) => file.path === ".env.local",
    );

    assert.ok(envFile);
    assert.equal(envFile.kind, "configuration");
    assert.equal("content" in envFile, false);

    assert.equal(result.statistics.filesParsed, 2);
    assert.equal(result.statistics.filesSkipped, 0);
  });
});

test("builds correct folder hierarchy and direct file counts", async () => {
  await withTempRepository(async (rootPath) => {
    await mkdir(
      path.join(rootPath, "src", "components"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "src", "index.ts"),
      "export {};\n",
    );

    await writeFile(
      path.join(rootPath, "src", "components", "Button.tsx"),
      "export function Button() {}\n",
    );

    const result = await walkRepository({ rootPath });

    const rootFolder = result.folders.find(
      (folder) => folder.path === ".",
    );

    const srcFolder = result.folders.find(
      (folder) => folder.path === "src",
    );

    const componentsFolder = result.folders.find(
      (folder) => folder.path === "src/components",
    );

    assert.ok(rootFolder);
    assert.ok(srcFolder);
    assert.ok(componentsFolder);

    assert.equal(rootFolder.name, path.basename(rootPath));
    assert.equal(rootFolder.parentPath, null);

    assert.equal(srcFolder.parentPath, ".");
    assert.equal(srcFolder.fileCount, 1);

    assert.equal(componentsFolder.parentPath, "src");
    assert.equal(componentsFolder.fileCount, 1);

    assert.equal(result.statistics.foldersFound, 3);
  });
});

test("reports unsupported, binary and excluded files", async () => {
  await withTempRepository(async (rootPath) => {
    await writeFile(
      path.join(rootPath, "main.ts"),
      "export {};\n",
    );

    await writeFile(
      path.join(rootPath, "notes.pdf"),
      "unsupported document",
    );

    await writeFile(
      path.join(rootPath, "asset.svg"),
      Buffer.from([0, 1, 2, 3]),
    );

    await writeFile(
      path.join(rootPath, "tsconfig.tsbuildinfo"),
      "generated metadata",
    );

    const result = await walkRepository({ rootPath });

    assert.equal(result.statistics.filesFound, 4);
    assert.equal(result.statistics.filesParsed, 1);
    assert.equal(result.statistics.filesSkipped, 3);

    assert.equal(
      result.statistics.filesFound,
      result.statistics.filesParsed + result.statistics.filesSkipped,
    );

    const skipReasons = new Map(
      result.skippedFiles.map((file) => [file.path, file.reason]),
    );

    assert.equal(
      skipReasons.get("notes.pdf"),
      "unsupported_extension",
    );

    assert.equal(
      skipReasons.get("asset.svg"),
      "binary_file",
    );

    assert.equal(
      skipReasons.get("tsconfig.tsbuildinfo"),
      "excluded_by_file_rule",
    );
  });
});

test("excludes configured directories without counting their contents", async () => {
  await withTempRepository(async (rootPath) => {
    await mkdir(
      path.join(rootPath, "src", ".temp"),
      { recursive: true },
    );

    await mkdir(
      path.join(rootPath, "node_modules", "example"),
      { recursive: true },
    );

    await writeFile(
      path.join(rootPath, "src", ".temp", "ignored.ts"),
      "export {};\n",
    );

    await writeFile(
      path.join(rootPath, "node_modules", "example", "index.js"),
      "module.exports = {};\n",
    );

    await writeFile(
      path.join(rootPath, "src", "keep.ts"),
      "export {};\n",
    );

    const result = await walkRepository({ rootPath });

    assert.deepEqual(
      result.excludedDirectories.map((directory) => directory.path),
      ["node_modules", "src/.temp"],
    );

    assert.equal(result.statistics.filesFound, 1);
    assert.equal(result.statistics.filesParsed, 1);
    assert.equal(result.statistics.filesSkipped, 0);

    assert.equal(
      result.files.some((file) => file.path.includes("ignored.ts")),
      false,
    );

    assert.equal(result.scanIssues.length, 0);
  });
});

test("rejects a repository path that does not exist", async () => {
  await withTempRepository(async (rootPath) => {
    const missingPath = path.join(rootPath, "missing-repository");

    await assert.rejects(
      () => walkRepository({ rootPath: missingPath }),
      (error: unknown) => error instanceof RepositoryWalkError,
    );
  });
});

test("rejects a file path instead of a directory", async () => {
  await withTempRepository(async (rootPath) => {
    const filePath = path.join(rootPath, "not-a-directory.ts");

    await writeFile(filePath, "export {};\n");

    await assert.rejects(
      () => walkRepository({ rootPath: filePath }),
      (error: unknown) => error instanceof RepositoryWalkError,
    );
  });
});

test("returns files in deterministic path order", async () => {
  await withTempRepository(async (rootPath) => {
    await mkdir(path.join(rootPath, "src"));

    await writeFile(path.join(rootPath, "z.ts"), "export {};\n");
    await writeFile(path.join(rootPath, "a.ts"), "export {};\n");
    await writeFile(
      path.join(rootPath, "src", "middle.ts"),
      "export {};\n",
    );

    const result = await walkRepository({ rootPath });

    const paths = result.files.map((file) => file.path);

    assert.deepEqual(paths, [...paths].sort((a, b) => a.localeCompare(b)));
  });
});
