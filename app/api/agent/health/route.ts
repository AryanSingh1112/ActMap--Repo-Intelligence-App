import { auth } from "@clerk/nextjs/server";

import { agentUrl } from "../../../../lib/agent/stream";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return Response.json({ up: false }, { status: 401 });
  try {
    const response = await fetch(`${agentUrl()}/ok`, { signal: AbortSignal.timeout(1500), cache: "no-store" });
    return Response.json({ up: response.ok });
  } catch {
    return Response.json({ up: false });
  }
}