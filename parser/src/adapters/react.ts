import type { FrameworkAdapter } from "./framework-adapter";
import {
  baseName,
  hasFolder,
  isComponentFile,
  isConfigFile,
  isHookFile,
  isSourceFile,
  isTestFile,
} from "./role-helpers";

const CONTEXT_FOLDERS = new Set(["context", "contexts", "providers", "provider"]);
const STATE_FOLDERS = new Set(["store", "stores", "state", "redux", "slices", "reducers"]);
const PAGE_FOLDERS = new Set(["pages", "views", "screens", "routes"]);
const SERVICE_FOLDERS = new Set(["services", "api"]);
const UTILITY_FOLDERS = new Set(["utils", "helpers", "lib"]);

/**
 * React on its own: roles from folder and file names. It shares its hook and
 * component rules with the Next.js adapter, since those are the same rules.
 * It declares no routes; a router's paths are not recoverable without running
 * the code.
 */
export const reactAdapter: FrameworkAdapter = {
  id: "react",
  version: "1.0.0",

  detect(context) {
    return (
      context.rootDependencies.has("react") ||
      context.rootDependencies.has("react-dom") ||
      context.allDependencies.has("react") ||
      context.allDependencies.has("react-dom")
    );
  },

  classifier() {
    return (file) => {
      if (isTestFile(file)) return "Tests";
      if (isConfigFile(file)) return "Config files";
      if (!isSourceFile(file) || file.kind === "type-declaration") return "Unclassified";

      const base = baseName(file);

      if (isHookFile(file)) return "Hooks";
      if (hasFolder(file, CONTEXT_FOLDERS) || /(Context|Provider)$/.test(base)) return "Contexts";
      if (hasFolder(file, STATE_FOLDERS)) return "State";
      if (hasFolder(file, PAGE_FOLDERS)) return "Pages";
      if (hasFolder(file, SERVICE_FOLDERS)) return "Services";
      if (isComponentFile(file)) return "Components";
      if (hasFolder(file, UTILITY_FOLDERS)) return "Utilities";

      return "Unclassified";
    };
  },
};