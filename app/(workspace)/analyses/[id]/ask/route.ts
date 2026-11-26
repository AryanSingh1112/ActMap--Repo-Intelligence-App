
import { createHmac } from "node:crypto";
import { auth } from "@clerk/nextjs/server";

import { mintCredential } from "../../../../../lib/agent/credential";
import {
  relayRun,
  type AskEvent,
} from "../../../../../lib/agent/stream";
import { createSupabaseServerClient } from "../../../../../lib/supabase/server";


export const maxDuration = 120;

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const json = (body: unknown, status: number) =>
  Response.json(body, { status });

type Body = {
  message?: unknown;
  selected?: unknown;
};

function getThreadId(
  analysisId: string,
  organizationId: string,
  userId: string,
): string {
  const secret = process.env.AGENT_TOOL_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("AGENT_TOOL_SECRET is not configured.");
  }

  const hex = createHmac("sha256", secret)
    .update(`${organizationId}:${userId}:${analysisId}`)
    .digest("hex")
    .slice(0, 32);

  const variant = ((parseInt(hex[16], 16) & 3) | 8).toString(16);

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-5${hex.slice(13, 16)}-${variant}${hex.slice(17, 20)}-${hex.slice(20)}`;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!UUID.test(id)) {
    return json({ error: "Not found." }, 404);
  }

  const { userId, orgId } = await auth();

  if (!userId) {
    return json({ error: "Sign in first." }, 401);
  }

  if (!orgId) {
    return json({ error: "Pick an organization first." }, 400);
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!message || message.length > 2000) {
    return json(
      { error: "Ask a question of up to 2000 characters." },
      400,
    );
  }

  const supabase = await createSupabaseServerClient();

  const { data: analysis, error: analysisError } = await supabase
    .from("analyses")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (analysisError) {
    console.error("[ask] analysis lookup failed", analysisError);
    return json({ error: "Could not load this analysis." }, 500);
  }

  if (!analysis) {
    return json({ error: "Analysis not found." }, 404);
  }

  let credential: string;
  let threadId: string;

  try {
    credential = mintCredential(id, orgId);
    threadId = getThreadId(id, orgId, userId);
  } catch (error) {
    console.error("[ask] configuration failed", error);
    return json({ error: "Ask is not configured on this server." }, 503);
  }

  const selected =
    typeof body.selected === "string" && body.selected.length < 500
      ? body.selected
      : null;

  const text = selected
    ? `[Selected file: ${selected}]\n${message}`
    : message;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: AskEvent) => {
        controller.enqueue(
          encoder.encode(JSON.stringify(event) + "\n"),
        );
      };

      send({ type: "thread", threadId });

      try {
        for await (const event of relayRun(
          threadId,
          text,
          credential,
          request.signal,
        )) {
          send(event);
        }
      } catch (error) {
        console.error("[ask] agent stream failed", error);

        send({
          type: "error",
          message: "The agent stopped before it could answer. Try again.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-store",
    },
  });
}
