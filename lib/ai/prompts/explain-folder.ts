import { FORMATTING_RULES } from "./explain-file";

import type { ExplainFolderInput, Prompt } from "../types";

export const EXPLAIN_FOLDER_VERSION = "explain-folder@1";

export const explainFolderPrompt: Prompt<ExplainFolderInput> = {
  version: EXPLAIN_FOLDER_VERSION,

  system: `You explain a folder, not a file, to a developer who is looking at a map of a codebase. The folder is a node on that map, and files from elsewhere point at it.

Answer two questions: what is in here, and why does so much point at it. Describe the folder as a whole: its purpose, how its files divide the work, and what the files outside depend on it for. Mention individual files only as evidence for a claim about the folder, never as a summary of one file.

Rules.
- Use exact repository paths, written in inline code, copied from the lists. Never write a path that is not in the lists.
- You were given the connections. Do not add or imply any other connection between files, and do not guess what files outside the lists contain.
- If little points at the folder, say so and do not invent a reason.
- If files or neighbours were left out of the lists, you only see part of the folder; say so rather than claiming the whole.

${FORMATTING_RULES}`,

  user(input) {
    const files = input.files
      .map((f) => `- ${f.path}  (role: ${f.role ?? "unknown"}; ${f.lineCount} lines; imported by ${f.fanIn}${f.exports.length ? `; exports: ${f.exports.slice(0, 6).join(", ")}` : ""})`)
      .join("\n");

    const outsiders = (items: ExplainFolderInput["importers"]) =>
      items.map((o) => `- ${o.path} -> ${o.touches.join(", ")}`).join("\n");

    return [
      `Folder: ${input.folder}`,
      `Files inside: ${input.files.length + input.omitted.files}${input.omitted.files ? ` (${input.omitted.files} not listed)` : ""}`,
      `Imports arriving from outside the folder: ${input.inboundTotal}. Imports leaving it: ${input.outboundTotal}.`,
      "",
      "Files in the folder, most depended on first:",
      files || "(none)",
      "",
      "Files outside that import something in the folder, and what they import:",
      outsiders(input.importers) || "(none)",
      input.omitted.importers ? `(${input.omitted.importers} more not listed)` : "",
      "",
      "Files outside that the folder imports from, and which of its files do:",
      outsiders(input.imports) || "(none)",
      input.omitted.imports ? `(${input.omitted.imports} more not listed)` : "",
    ].join("\n");
  },
};
