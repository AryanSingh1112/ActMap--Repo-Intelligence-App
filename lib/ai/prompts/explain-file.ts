import type { ExplainFileInput, Neighbour, Prompt } from "../types";

/**
 * The current explanation prompt. The retired one lives with the evals.
 * Change the wording and the version must change with it: the version is part
 * of the cache key and of every trace.
 */
export const EXPLAIN_FILE_VERSION = "explain-file@2";

export const FORMATTING_RULES = `Formatting. You may use exactly three things: inline code with single backticks, bullets that start with "- ", and **bold**. Nothing else. No headings, no tables, no code blocks, no italics, no numbered lists. The reader is a narrow side pane, so keep it to two to four short paragraphs, with bullets only where a list is truly clearer.`;

export function describeNeighbour(n: Neighbour): string {
  const bits = [n.role ? `role: ${n.role}` : null, n.exports.length ? `exports: ${n.exports.slice(0, 8).join(", ")}` : null, n.kinds.length && !n.kinds.includes("static") ? `via: ${n.kinds.join(", ")}` : null]
    .filter(Boolean)
    .join("; ");

  return `- ${n.path}${bits ? `  (${bits})` : ""}`;
}

function list(title: string, items: Neighbour[], omitted: number, none: string): string {
  if (items.length === 0) return `${title}\n${none}`;

  return `${title}\n${items.map(describeNeighbour).join("\n")}${omitted ? `\n(${omitted} more not listed)` : ""}`;
}

export const explainFilePrompt: Prompt<ExplainFileInput> = {
  version: EXPLAIN_FILE_VERSION,

  system: `You explain one source file to a developer who is looking at a map of a codebase.

Say what the file does and how it fits among the files around it. Anchor every claim in what you were given: the file's source and the two lists of neighbours, the files it imports and the files that import it.

Rules.
- Name neighbours by their exact repository path, written in inline code, copied exactly from the lists. Never write a path that is not in the lists or the file's own path.
- You were given the connections. Do not add or imply any other connection between files, and do not guess what files outside the lists contain.
- Be specific. Prefer the real function names, the data it handles, and why the neighbours depend on it, over general statements like "a utility file".
- If a list is empty, say plainly that nothing is on that side. If the source was cut short, say that the explanation covers only the start.
- Do not repeat the file path as a heading or open with "This file".

${FORMATTING_RULES}`,

  user(input) {
    return [
      `File: ${input.path}`,
      `Role: ${input.role ?? "unknown"}${input.language ? `   Language: ${input.language}` : ""}   Lines: ${input.lineCount}`,
      "",
      list("Files this file imports:", input.imports, input.omitted.imports, "(none)"),
      "",
      list("Files that import this file:", input.importedBy, input.omitted.importedBy, "(none)"),
      "",
      `Source${input.truncated ? " (cut short)" : ""}:`,
      input.source,
    ].join("\n");
  },
};
