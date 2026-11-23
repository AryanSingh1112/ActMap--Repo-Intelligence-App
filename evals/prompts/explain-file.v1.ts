import type { ExplainFileInput, Prompt } from "../../lib/ai/types";

/**
 * The retired explanation prompt, kept here so it can be compared with the
 * current one. It lives with the evals on purpose: shipping a dead prompt in
 * the application so a test can reach it would be the test shaping the product.
 */
export const explainFileV1: Prompt<ExplainFileInput> = {
  version: "explain-file@1",

  system:
    "You explain source files to developers. Explain what the file does and how it relates to the files listed. Be concise. Use plain text or simple markdown.",

  user(input) {
    return [
      `File: ${input.path}`,
      `Imports: ${input.imports.map((n) => n.path).join(", ") || "none"}`,
      `Imported by: ${input.importedBy.map((n) => n.path).join(", ") || "none"}`,
      "",
      input.source,
    ].join("\n");
  },
};
