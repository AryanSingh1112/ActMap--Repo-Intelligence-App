import { auth } from "@clerk/nextjs/server";

import { missingModelSettings } from "../../../../../agent/src/settings";
import { mintCredential } from "../../../../../lib/agent/credential";
import { runAgent, type AgentResult } from "../../../../../lib/agent/runtime";
import {
  agentClient,
  relayRun,
  type AskEvent,
} from "../../../../../lib/agent/stream";
import {
  RATE_LIMIT,
  createThread,
  loadThread,
  recentQuestionCount,
  saveTurn,
  type ChatTurn,
  type ThreadContext,
} from "../../../../../lib/agent/threads";
import { createSupabaseServerClient } from "../../../../../lib/supabase/server";

// Vercel stops a function at maxDuration. The agent is stopped a few seconds
// earlier so the person gets a clear message instead of a dead connection.
export const maxDuration = 60;
const AGENT_DEADLINE_MS = 55_000;

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
    return json({ error: "Ask a question of up to 2000 characters." }, 400);
  }

  // Row-level security decides whether this person can see the analysis at all.
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

  try {
    credential = mintCredential(id, orgId);
  } catch (error) {
    console.error("[ask] credential creation failed", error);
    return json({ error: "Ask is not configured on this server." }, 503);
  }

  const selected =
    typeof body.selected === "string" && body.selected.length < 500
      ? body.selected
      : null;

  const text = selected
    ? `[Selected file: ${selected}]\n${message}`
    : message;

  const requestedThread =
    typeof body.threadId === "string" && UUID.test(body.threadId)
      ? body.threadId
      : null;

  // AGENT_URL set: a LangGraph server (`npm run agent:dev`) runs the agent.
  // Unset (production): the agent runs inside this function.
  const remote = process.env.AGENT_URL?.trim();

  return remote
    ? streamFromAgentServer(request, id, orgId, credential, text, requestedThread)
    : streamInProcess(
        request,
        { analysisId: id, organizationId: orgId, userId },
        credential,
        message,
        text,
        requestedThread,
      );
}

function ndjson(
  run: (send: (event: AskEvent) => void) => Promise<void>,
): Response {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: AskEvent) => {
        try {
          controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
        } catch {
          // The client went away; nothing left to send to.
        }
      };

      try {
        await run(send);
      } finally {
        try {
          controller.close();
        } catch {
          // Already closed.
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-store",
      // Stop proxies buffering the stream.
      "X-Accel-Buffering": "no",
    },
  });
}

/** Describe a failure to the person without leaking provider or key details. */
function friendlyError(error: unknown, timedOut: boolean): string {
  if (timedOut) {
    return "That took too long to answer. Try a narrower question.";
  }

  const detail = error instanceof Error ? error.message : String(error);

  if (/429|quota|rate.?limit|resource.?exhausted/i.test(detail)) {
    return "The AI service is busy right now. Wait a minute and try again.";
  }

  return "The agent stopped before it could answer. Try again.";
}

async function streamInProcess(
  request: Request,
  ctx: ThreadContext,
  credential: string,
  question: string,
  text: string,
  requestedThread: string | null,
): Promise<Response> {
  // Say exactly what is missing instead of failing later with a vague message.
  const missing = missingModelSettings();

  if (missing.length > 0) {
    console.error("[ask] missing settings:", missing.join(", "));
    return json(
      {
        error: `Ask is not configured: set ${missing.join(" and ")} in the server environment.`,
      },
      503,
    );
  }

  let threadId: string;
  let history: ChatTurn[] = [];

  try {
    if ((await recentQuestionCount(ctx.userId)) >= RATE_LIMIT.questions) {
      return json(
        {
          error: `You can ask ${RATE_LIMIT.questions} questions every ${RATE_LIMIT.windowMinutes} minutes. Please wait a little.`,
        },
        429,
      );
    }

    // A thread is reused only if this user owns it for this analysis.
    const existing = requestedThread
      ? await loadThread(requestedThread, ctx)
      : null;

    if (existing && requestedThread) {
      threadId = requestedThread;
      history = existing;
    } else {
      threadId = await createThread(ctx);
    }
  } catch (error) {
    console.error("[ask] conversation storage failed", error);
    return json(
      {
        error:
          "Ask could not open your conversation. Check that the database migration for Ask has been applied.",
      },
      503,
    );
  }

  return ndjson(async (send) => {
    send({ type: "thread", threadId });

    const deadline = AbortSignal.timeout(AGENT_DEADLINE_MS);
    const signal = AbortSignal.any([request.signal, deadline]);

    try {
      const run = runAgent({ history, message: text, credential, signal });

      let answer = "";

      for (;;) {
        const step = await run.next();

        if (step.done === true) {
          answer = (step.value as AgentResult).answer;
          break;
        }

        send(step.value as AskEvent);
      }

      if (!answer) {
        send({
          type: "error",
          message: "The agent did not produce an answer. Try rephrasing.",
        });
        return;
      }

      // Only a finished answer is stored, so history never holds a half-answer.
      await saveTurn(threadId, ctx, question, answer).catch((error) => {
        console.error("[ask] could not save the conversation", error);
      });

      send({ type: "done" });
    } catch (error) {
      if (request.signal.aborted) return;

      console.error("[ask] agent run failed", error);

      send({
        type: "error",
        message: friendlyError(error, deadline.aborted),
      });
    }
  });
}

async function streamFromAgentServer(
  request: Request,
  analysisId: string,
  organizationId: string,
  credential: string,
  text: string,
  requestedThread: string | null,
): Promise<Response> {
  const client = agentClient();

  let threadId: string;

  try {
    threadId = await resolveRemoteThread(
      client,
      requestedThread,
      analysisId,
      organizationId,
    );
  } catch (error) {
    console.error("[ask] agent server unreachable", error);
    return json(
      {
        unreachable: true,
        error:
          "The agent server isn't running. Start it with `npm run agent:dev`, or unset AGENT_URL to run the agent inside the app.",
      },
      503,
    );
  }

  return ndjson(async (send) => {
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
      if (request.signal.aborted) return;

      console.error("[ask] agent stream failed", error);

      send({
        type: "error",
        message: "The agent stopped before it could answer. Try again.",
      });
    }
  });
}

async function resolveRemoteThread(
  client: ReturnType<typeof agentClient>,
  requested: string | null,
  analysisId: string,
  organizationId: string,
): Promise<string> {
  if (requested) {
    try {
      const thread = await client.threads.get(requested);
      const meta = (thread.metadata ?? {}) as Record<string, unknown>;

      if (
        meta.analysisId === analysisId &&
        meta.organizationId === organizationId
      ) {
        return requested;
      }
    } catch {
      // Unknown thread: start a new one.
    }
  }

  const created = await client.threads.create({
    metadata: { analysisId, organizationId },
  });

  return created.thread_id;
}
