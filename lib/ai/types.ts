// Browser-safe. The shapes that cross between prompts, the server and the pane.

/** A file next to the one being explained, as the model is told about it. */
export type Neighbour = {
  path: string;
  role: string | null;
  exports: string[];
  kinds: string[];
};

export type ExplainFileInput = {
  path: string;
  role: string | null;
  language: string | null;
  lineCount: number;
  source: string;
  /** True when the source was cut to fit. The model is told. */
  truncated: boolean;
  imports: Neighbour[];
  importedBy: Neighbour[];
  /** How many neighbours were left out to keep the prompt small. */
  omitted: { imports: number; importedBy: number };
};

export type FolderFile = {
  path: string;
  role: string | null;
  lineCount: number;
  fanIn: number;
  exports: string[];
};

/** A file outside the folder that touches it, and which folder files it touches. */
export type Outsider = { path: string; touches: string[] };

export type ExplainFolderInput = {
  folder: string;
  files: FolderFile[];
  importers: Outsider[];
  imports: Outsider[];
  /** How many files and outside neighbours were left out to keep the prompt small. */
  omitted: { files: number; importers: number; imports: number };
  /** Total file-level imports arriving from outside, however many are listed. */
  inboundTotal: number;
  outboundTotal: number;
};

export type ClassifyFileInput = {
  path: string;
  extension: string;
  kind: string | null;
  exports: string[];
  imports: string[];
  importedBy: string[];
};

/** A prompt is a version, a system message and a way to build the user message. */
export type Prompt<Input> = {
  version: string;
  system: string;
  user: (input: Input) => string;
};

/** Every path a prompt input hands to the model. The invented-path check tests against this. */
export function shownPaths(input: ExplainFileInput | ExplainFolderInput): string[] {
  if ("source" in input) {
    return [input.path, ...input.imports.map((n) => n.path), ...input.importedBy.map((n) => n.path)];
  }

  return [
    ...input.files.map((f) => f.path),
    ...input.importers.map((o) => o.path),
    ...input.imports.map((o) => o.path),
  ];
}
