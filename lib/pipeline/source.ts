
import "server-only";

import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { RepositoryMap } from "../../parser/src/types";

const FILE_BATCH_SIZE = 25;
const DATABASE_PAGE_SIZE = 1000;
const MAX_SOURCE_FILE_BYTES = 256 * 1024;

interface StoredFile {
  id: string;
  path: string;
}

interface SourceStorageResult {
  stored: number;
  skipped: number;
}

function resolveRepositoryFile(
  rootPath: string,
  filePath: string,
): string {
  const root = path.resolve(rootPath);
  const absolutePath = path.resolve(
    root,
    ...filePath.split("/"),
  );

  const relativePath = path.relative(root, absolutePath);

  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`Invalid repository file path: ${filePath}`);
  }

  return absolutePath;
}

function shouldSkipSourceContent(filePath: string): boolean {
  const name = path.posix.basename(filePath.toLowerCase());

  return (
    name === ".env" ||
    name.startsWith(".env.") ||
    name.includes("credentials") ||
    name.includes("secret") ||
    name === "id_rsa" ||
    name === "id_ed25519" ||
    /\.(pem|key|p12|pfx|keystore)$/i.test(name)
  );
}

async function readSourceFile(
  rootPath: string,
  filePath: string,
): Promise<string | null> {
  if (shouldSkipSourceContent(filePath)) return null;

  const absolutePath = resolveRepositoryFile(rootPath, filePath);
  const fileStats = await stat(absolutePath);

  if (
    !fileStats.isFile() ||
    fileStats.size > MAX_SOURCE_FILE_BYTES
  ) {
    return null;
  }

  const content = await readFile(absolutePath, "utf8");

  if (content.includes("\0")) return null;

  return content;
}

async function loadStoredFiles(
  supabase: SupabaseClient,
  analysisId: string,
  organizationId: string,
): Promise<Map<string, string>> {
  const fileIds = new Map<string, string>();

  for (
    let offset = 0;
    ;
    offset += DATABASE_PAGE_SIZE
  ) {
    const { data, error } = await supabase
      .from("files")
      .select("id, path")
      .eq("analysis_id", analysisId)
      .eq("organization_id", organizationId)
      .order("path")
      .range(offset, offset + DATABASE_PAGE_SIZE - 1);

    if (error) {
      throw new Error(
        `Could not load stored files: ${error.message}`,
      );
    }

    const rows = (data ?? []) as StoredFile[];

    for (const file of rows) {
      fileIds.set(file.path, file.id);
    }

    if (rows.length < DATABASE_PAGE_SIZE) break;
  }

  return fileIds;
}

export async function storeFileContents(
  supabase: SupabaseClient,
  input: {
    rootPath: string;
    analysisId: string;
    organizationId: string;
    map: RepositoryMap;
  },
): Promise<SourceStorageResult> {
  const {
    rootPath,
    analysisId,
    organizationId,
    map,
  } = input;

  const storedFiles = await loadStoredFiles(
    supabase,
    analysisId,
    organizationId,
  );

  let stored = 0;
  let skipped = 0;

  for (
    let offset = 0;
    offset < map.files.length;
    offset += FILE_BATCH_SIZE
  ) {
    const batch = map.files.slice(
      offset,
      offset + FILE_BATCH_SIZE,
    );

    const records = await Promise.all(
      batch.map(async (file) => {
        const fileId = storedFiles.get(file.path);

        if (!fileId) {
          throw new Error(
            `Database file record not found: ${file.path}`,
          );
        }

        const content = await readSourceFile(
          rootPath,
          file.path,
        );

        if (content === null) {
          skipped++;
          return null;
        }

        return {
          organization_id: organizationId,
          analysis_id: analysisId,
          file_id: fileId,
          content,
          content_hash: file.contentHash,
          line_count: file.lineCount,
        };
      }),
    );

    const validRecords = records.filter(
      (record) => record !== null,
    );

    if (validRecords.length === 0) continue;

    const { error } = await supabase
      .from("file_contents")
      .insert(validRecords);

    if (error) {
      throw new Error(
        `Could not store source contents: ${error.message}`,
      );
    }

    stored += validRecords.length;
  }

  return { stored, skipped };
}
