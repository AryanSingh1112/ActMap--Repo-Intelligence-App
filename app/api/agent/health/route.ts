
import { NextResponse } from "next/server";

import { getAgent } from "../../../../agent/src/agent";

export const maxDuration = 120;

export async function GET() {
  try {
    await getAgent();

    return NextResponse.json({
      status: "ok",
      agent: "ready",
      runtime: "in-process",
    });
  } catch (error) {
    console.error("[agent-health] Agent initialization failed:", error);

    return NextResponse.json(
      {
        status: "error",
        agent: "unavailable",
      },
      { status: 503 },
    );
  }
}
