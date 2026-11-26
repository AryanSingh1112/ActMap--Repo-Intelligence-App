import { executeLookup } from "../../../../../lib/agent/execute";
import { serverLookupDeps } from "../../../../../lib/agent/deps";

/**
 * HTTP form of the agent's lookups. Production does not call this: the agent
 * runs inside the Next.js server and calls executeLookup directly. It remains
 * for `npm run agent:dev`, where the LangGraph dev server is a separate process.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ tool: string }> },
) {
  const { tool } = await params;

  const input: unknown = await request.json().catch(() => null);

  const outcome = await executeLookup(
    tool,
    input,
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, ""),
    serverLookupDeps,
  );

  return outcome.ok === true
    ? Response.json(outcome.body)
    : new Response(outcome.message, { status: outcome.status });
}
