
import type {
  FileKind,
  FileLanguage,
  FileNode,
} from "../types";

export interface ParserAdapter {
  name: string;
  version: string;

  supports(file: FileNode): boolean;

  classifyFile(
    file: FileNode,
  ): {
    language: FileLanguage;
    kind: FileKind;
  };
}

export const genericAdapter: ParserAdapter = {
  name: "generic",
  version: "1.0.0",

  supports(): boolean {
    return true;
  },

  classifyFile(file: FileNode) {
    return {
      language: file.language,
      kind: file.kind,
    };
  },
};

export function selectAdapter(
  files: FileNode[],
  adapters: ParserAdapter[] = [],
): ParserAdapter {
  for (const adapter of adapters) {
    if (files.some((file) => adapter.supports(file))) {
      return adapter;
    }
  }

  return genericAdapter;
}
