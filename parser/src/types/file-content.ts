
export interface FileContentRecord {
  fileId: string;
  path: string;
  content: string;
  contentHash: string;
  lineCount: number;
}

export interface FileContentResult {
  path: string;
  content: string;
  lineCount: number;
}
