/**
 * Loads .env.local, .env and friends the same way `next dev` does, for
 * scripts that run outside the web app. Import it first:
 *
 *   import "../scripts/load-env";
 */
import * as nextEnv from "@next/env";

// Depending on how the package is loaded the function sits on the namespace or on `default`.
const load =
  nextEnv.loadEnvConfig ?? (nextEnv as unknown as { default: typeof nextEnv }).default.loadEnvConfig;

load(process.cwd());
