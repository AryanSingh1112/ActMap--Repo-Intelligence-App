
import { auth } from "@clerk/nextjs/server";

import { mintCredential } from "../../../../../lib/agent/credential";
import {
  agentClient,
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
  threadId?: unknown;
  selected?: unknown;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  console.log("[ask] request received", { id });

  if (!UUID.test(id)) {
    console.log("[ask] invalid analysis id");
    return json({ error: "Not found." }, 404);
  }

  const { userId, orgId } = await auth();

  if (!userId) {
    console.log("[ask] unauthenticated");
    return json({ error: "Sign in first." }, 401);
  }

  if (!orgId) {
    console.log("[ask] organization missing");
    return json({ error: "Pick an organization first." }, 400);
  }

  console.log("[ask] authenticated", { id, orgId });

  const body = (await request.json().catch(() => ({}))) as Body;

  const message =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!message || message.length > 2000) {
    console.log("[ask] invalid message");
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
    console.log("[ask] analysis not found", { id });
    return json({ error: "Analysis not found." }, 404);
  }

  let credential: string;

  try {
    credential = mintCredential(id, orgId);
  } catch (error) {
    console.error("[ask] credential creation failed", error);
    return json({ error: "Ask is not configured on this server." }, 503);
  }

  const client = agentClient();

  let threadId: string;

  console.log("[ask] resolving thread");

  try {
    threadId = await resolveThread(
      client,
      body.threadId,
      id,
      orgId,
    );
  } catch (error) {
    console.error("[ask] thread resolution failed", error);
    return json(
      { unreachable: true, error: "The agent isn't running." },
      503,
    );
  }

  console.log("[ask] thread resolved", threadId);

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
        console.log("[ask] event", event.type);

        controller.enqueue(
          encoder.encode(JSON.stringify(event) + "\n"),
        );
      };

      console.log("[ask] stream started");

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

        console.log("[ask] agent stream completed");
      } catch (error) {
        console.error("[ask] agent stream failed", error);

        send({
          type: "error",
          message: "The agent stopped before it could answer. Try again.",
        });
      } finally {
        console.log("[ask] closing stream");
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

async function resolveThread(
  client: ReturnType<typeof agentClient>,
  requested: unknown,
  analysisId: string,
  organizationId: string,
): Promise<string> {
  if (typeof requested === "string" && UUID.test(requested)) {
    try {
      console.log("[ask] checking existing thread");

      const thread = await client.threads.get(requested);

      const meta = (thread.metadata ?? {}) as Record<string, unknown>;

      if (
        meta.analysisId === analysisId &&
        meta.organizationId === organizationId
      ) {
        console.log("[ask] reusing existing thread");
        return requested;
      }
    } catch (error) {
      console.log("[ask] existing thread unavailable", error);
    }
  }

  console.log("[ask] creating new thread");

  const created = await client.threads.create({
    metadata: {
      analysisId,
      organizationId,
    },
  });

  console.log("[ask] new thread created", created.thread_id);

  return created.thread_id;
}
