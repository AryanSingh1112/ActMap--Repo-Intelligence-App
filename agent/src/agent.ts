import { createActmapAgent } from "./factory";
import { httpLookup } from "./tools";

/**
 * Entry point for `npm run agent:dev` (langgraphjs dev). Lookups call the
 * ActMap tool API at ACTMAP_URL. Production does not use this file: the
 * Next.js server builds the same agent in-process (lib/agent/runtime.ts).
 */
export const agent = createActmapAgent({ lookup: httpLookup });
