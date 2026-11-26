import "server-only";

import { createSupabaseServiceClient } from "../supabase/service";

/**
 * Conversation history for in-process Ask. Every query names the owner (user,
 * organization, analysis) explicitly, because the service client bypasses
 * row-level security: a thread id alone never grants access.
 */
export type ThreadContext = {
  analysisId: string;
  organizationId: string;
  userId: string;
};

export type ChatTurn = { role: "user" | "assistant"; content: string };

const HISTORY_MESSAGES = 20;
const HISTORY_CHARS_PER_MESSAGE = 4_000;

export const RATE_LIMIT = { questions: 20, windowMinutes: 10 } as const;

export async function createThread(ctx: ThreadContext): Promise<string> {
  const { data, error } = await createSupabaseServiceClient()
    .from("ask_threads")
    .insert({
      organization_id: ctx.organizationId,
      user_id: ctx.userId,
      analysis_id: ctx.analysisId,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`Could not start a conversation: ${error?.message}`);
  }

  return data.id as string;
}

/** The thread's recent turns, or null when this user does not own that thread. */
export async function loadThread(
  threadId: string,
  ctx: ThreadContext,
): Promise<ChatTurn[] | null> {
  const supabase = createSupabaseServiceClient();

  const { data: thread, error } = await supabase
    .from("ask_threads")
    .select("id")
    .eq("id", threadId)
    .eq("user_id", ctx.userId)
    .eq("organization_id", ctx.organizationId)
    .eq("analysis_id", ctx.analysisId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!thread) return null;

  const { data: rows, error: messagesError } = await supabase
    .from("ask_messages")
    .select("role, content")
    .eq("thread_id", threadId)
    .order("id", { ascending: false })
    .limit(HISTORY_MESSAGES);

  if (messagesError) throw new Error(messagesError.message);

  return (rows ?? [])
    .reverse()
    .map((row) => ({
      role: row.role as ChatTurn["role"],
      content: String(row.content).slice(0, HISTORY_CHARS_PER_MESSAGE),
    }));
}

/** Store a finished question and its answer together, so history never holds a dangling question. */
export async function saveTurn(
  threadId: string,
  ctx: ThreadContext,
  question: string,
  answer: string,
): Promise<void> {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase.from("ask_messages").insert([
    { thread_id: threadId, user_id: ctx.userId, role: "user", content: question },
    { thread_id: threadId, user_id: ctx.userId, role: "assistant", content: answer },
  ]);

  if (error) throw new Error(error.message);

  await supabase
    .from("ask_threads")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", threadId)
    .eq("user_id", ctx.userId);
}

export async function recentQuestionCount(userId: string): Promise<number> {
  const since = new Date(Date.now() - RATE_LIMIT.windowMinutes * 60_000).toISOString();

  const { count, error } = await createSupabaseServiceClient()
    .from("ask_messages")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("role", "user")
    .gte("created_at", since);

  if (error) throw new Error(error.message);

  return count ?? 0;
}
