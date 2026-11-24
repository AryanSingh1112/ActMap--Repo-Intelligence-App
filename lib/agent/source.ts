
import "server-only";

import { createSupabaseServiceClient } from "../../lib/supabase/service";
import type { Credential } from "../../lib/agent/credential";
import type { FileContentResult } from "../../parser/src/types/file-content";

const MAX_FILE_SIZE = 40_000;
const MAX_FILES = 8;

interface FileContentRow {
  content: string;
  line_count: number;
  files:
    | { path: string }
    | { path: string }[]
    | null;
}

export async function getFileContent(
  credential: Credential,
  paths: string[],
): Promise<FileContentResult[]> {
  const uniquePaths = [...new Set(paths)]
    .filter((filePath) => filePath.trim().length > 0)
    .slice(0, MAX_FILES);

  if (uniquePaths.length === 0) return [];

  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from("file_contents")
    .select("content, line_count, files!inner(path)")
    .eq("analysis_id", credential.analysisId)
    .eq("organization_id", credential.organizationId)
    .in("files.path", uniquePaths);

  if (error) {
    throw new Error(
      `Could not retrieve source files: ${error.message}`,
    );
  }

  const rows = (data ?? []) as unknown as FileContentRow[];

  return rows.flatMap((row) => {
    const file = Array.isArray(row.files)
      ? row.files[0]
      : row.files;

    if (!file || typeof row.content !== "string") return [];

    return [{
      path: file.path,
      content: row.content.slice(0, MAX_FILE_SIZE),
      lineCount: row.line_count,
    }];
  });
}
