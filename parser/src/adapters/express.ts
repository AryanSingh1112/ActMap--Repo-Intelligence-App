import type { FrameworkAdapter } from "./framework-adapter";
import {
  baseName,
  isConfigFile,
  isSourceFile,
  isTestFile,
  nearestFolder,
} from "./role-helpers";

// Real repositories use both "route" and "routes", so both are accepted.
const FOLDER_ROLES: Record<string, string> = {
  route: "Routes",
  routes: "Routes",
  router: "Routes",
  routers: "Routes",
  controller: "Controllers",
  controllers: "Controllers",
  middleware: "Middleware",
  middlewares: "Middleware",
  service: "Services",
  services: "Services",
  model: "Models",
  models: "Models",
  schema: "Models",
  schemas: "Models",
  validation: "Validations",
  validations: "Validations",
  validator: "Validations",
  validators: "Validations",
  util: "Utilities",
  utils: "Utilities",
  helper: "Utilities",
  helpers: "Utilities",
  config: "Config files",
  configs: "Config files",
  configuration: "Config files",
};

const FOLDER_NAMES = new Set(Object.keys(FOLDER_ROLES));

const SUFFIX_ROLES: Record<string, string> = {
  route: "Routes",
  routes: "Routes",
  controller: "Controllers",
  middleware: "Middleware",
  service: "Services",
  model: "Models",
  validation: "Validations",
  validator: "Validations",
};

const SETUP_NAMES = new Set(["app", "server", "index", "main", "www"]);

/**
 * Express: roles from directory convention. No routes are extracted, because
 * Express assembles them at runtime from routers, variables and middleware
 * chains, and a route is only reported when it can be read exactly.
 */
export const expressAdapter: FrameworkAdapter = {
  id: "express",
  version: "1.0.0",

  detect(context) {
    return context.rootDependencies.has("express") || context.allDependencies.has("express");
  },

  classifier() {
    return (file) => {
      if (isTestFile(file)) return "Tests";
      if (isConfigFile(file)) return "Config files";
      if (!isSourceFile(file) || file.kind === "type-declaration") return "Unclassified";

      const folder = nearestFolder(file, FOLDER_NAMES);
      if (folder) return FOLDER_ROLES[folder];

      const parts = baseName(file).toLowerCase().split(".");
      const suffix = parts.length > 1 ? parts[parts.length - 1] : "";
      if (SUFFIX_ROLES[suffix]) return SUFFIX_ROLES[suffix];

      const top =
        file.folderPath === "." ||
        file.folderPath === "src" ||
        file.folderPath === "bin" ||
        file.folderPath === "lib";

      if (top && SETUP_NAMES.has(parts[0]) && parts.length === 1) return "App setup";

      return "Unclassified";
    };
  },
};