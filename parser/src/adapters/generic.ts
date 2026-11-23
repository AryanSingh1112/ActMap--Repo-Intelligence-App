import { genericRoleOfKind } from "../../taxonomy/categories";

import type { FrameworkAdapter } from "./framework-adapter";

/** What a repository gets when no adapter matches: roles from the file's kind, no routes. */
export const genericFramework: FrameworkAdapter = {
  id: "generic",
  version: "1.0.0",

  detect() {
    return true;
  },

  classifier() {
    return (file) => genericRoleOfKind(file.kind);
  },
};