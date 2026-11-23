import { CLASSIFIER_ROLES, NO_ROLE } from "../roles";

import type { ClassifyFileInput, Prompt } from "../types";

export const CLASSIFY_ROLE_VERSION = "classify-role@1";

/** Structured output: the model can only answer with a listed role, or "other". */
export const CLASSIFY_SCHEMA = {
  name: "file_roles",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["roles"],
    properties: {
      roles: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["path", "role"],
          properties: {
            path: { type: "string" },
            role: { type: "string", enum: [...CLASSIFIER_ROLES, NO_ROLE] },
          },
        },
      },
    },
  },
} as const;

export const classifyRolePrompt: Prompt<ClassifyFileInput[]> = {
  version: CLASSIFY_ROLE_VERSION,

  system: `You label source files with the role they play in a codebase. Conventions have already labelled the files they recognise; you only see the rest.

Answer with one role per file, using only these:
- service: business logic or an integration that other code calls
- repository: reads and writes a data store
- model: a data shape, entity, schema or type
- util: a small shared helper with no state of its own
- config: settings, constants or setup
- component: a user-interface component
- hook: a reusable stateful function, such as a React hook
- ${NO_ROLE}: none of the above fits, or there is not enough to tell

You may not use any other role. Never label a file as a page, route, controller, layout or middleware; those are decided elsewhere. Judge from the path, the exports and the files on either side of it. If it is not clear, answer ${NO_ROLE}. Return every path you were given exactly as written.`,

  user(files) {
    return files
      .map(
        (f) =>
          `File: ${f.path}\nKind: ${f.kind ?? "unknown"}\nExports: ${f.exports.slice(0, 12).join(", ") || "(none)"}\nImports: ${f.imports.join(", ") || "(none)"}\nImported by: ${f.importedBy.join(", ") || "(none)"}`,
      )
      .join("\n\n");
  },
};
