import "server-only";

import { loadForCredential } from "./load";
import { getFileContent } from "./source";

import type { LookupDeps } from "./execute";

/** Production data access: Supabase, scoped by the credential's analysis and organization. */
export const serverLookupDeps: LookupDeps = {
  load: loadForCredential,
  source: getFileContent,
};
