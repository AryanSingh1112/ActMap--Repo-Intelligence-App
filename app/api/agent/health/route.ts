import { auth } from "@clerk/nextjs/server";

import { missingModelSettings } from "../../../../agent/src/settings";
import { agentUrl } from "../../../../lib/agent/stream";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ up: false }, { status: 401 });
  }

  // A LangGraph server is configured: check that it answers.
  if (process.env.AGENT_URL?.trim()) {
    try {
      const response = await fetch(`${agentUrl()}/ok`, {
        signal: AbortSignal.timeout(1500),
        cache: "no-store",
      });

      return Response.json({ up: response.ok, mode: "server" });
    } catch {
      return Response.json({ up: false, mode: "server" });
    }
  }

  // In-process (production): up when the settings it needs are present.
  const configured =
    missingModelSettings().length === 0 &&
    Boolean(process.env.AGENT_TOOL_SECRET?.trim());

  return Response.json({ up: configured, mode: "in-process" });
}
