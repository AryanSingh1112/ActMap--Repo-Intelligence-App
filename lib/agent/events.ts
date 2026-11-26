/**
 * What the Ask panel receives, and the translation from agent stream output to
 * it. Pure, with no server-only imports, so the remote (LangGraph server) and
 * in-process runners share one implementation and tests can drive it directly.
 */
export type AskEvent =
  | { type: "thread"; threadId: string }
  | { type: "text"; text: string }
  | { type: "tool"; id: string; name: string; args: Record<string, unknown> }
  | { type: "tool_result"; id: string; name: string; ok: boolean; summary: string }
  | { type: "done" }
  | { type: "error"; message: string };

type Raw = {
  type?: string;
  content?: unknown;
  tool_calls?: { id?: string; name: string; args?: Record<string, unknown> }[];
  tool_call_id?: string;
  name?: string;
};

export function textOf(content: unknown): string {
  if (typeof content === "string") return content;

  if (!Array.isArray(content)) return "";

  return content
    .map((part) =>
      typeof part === "string" ? part : ((part as { text?: string })?.text ?? ""),
    )
    .join("");
}

export function summarise(content: string): { ok: boolean; summary: string } {
  if (/^The lookup failed/i.test(content)) {
    return { ok: false, summary: content.slice(0, 160) };
  }

  try {
    const body = JSON.parse(content) as Record<string, unknown>;

    for (const key of ["files", "matches", "routes", "results", "imports", "importedBy"]) {
      if (Array.isArray(body[key])) {
        return { ok: true, summary: `${(body[key] as unknown[]).length} ${key}` };
      }
    }
  } catch {
    // Not JSON.
  }

  return { ok: true, summary: content.replace(/\s+/g, " ").slice(0, 120) };
}

/**
 * Turns "messages" (token chunks) and "updates" (completed steps) stream output
 * into Ask events. Text streams token by token; tool calls and results come
 * from completed steps so their arguments are whole.
 */
export class EventTranslator {
  private seen = new Set<string>();
  private streamed = "";
  private finalAnswer = "";

  /** The model's last message that made no tool call: the answer, without any preamble. */
  get answer(): string {
    return this.finalAnswer || this.streamed;
  }

  push(mode: string, data: unknown): AskEvent[] {
    const events: AskEvent[] = [];

    if (mode === "messages") {
      const [chunk] = data as [Raw, unknown];
      const kind = chunk?.type ?? "";

      if ((kind === "ai" || kind === "AIMessageChunk") && !chunk.tool_calls?.length) {
        const text = textOf(chunk.content);

        if (text) {
          this.streamed += text;
          events.push({ type: "text", text });
        }
      }

      return events;
    }

    if (mode === "updates") {
      const nodes = data as Record<string, { messages?: Raw[] } | undefined>;

      for (const node of Object.values(nodes ?? {})) {
        for (const message of node?.messages ?? []) {
          if (message.type === "ai") {
            if (message.tool_calls?.length) {
              // A step that calls tools restarts the answer; earlier text was preamble.
              this.streamed = "";
            } else {
              const text = textOf(message.content);

              if (text) this.finalAnswer = text;
            }

            for (const call of message.tool_calls ?? []) {
              const id = call.id ?? `${call.name}-${this.seen.size}`;

              if (this.seen.has(id)) continue;

              this.seen.add(id);
              events.push({ type: "tool", id, name: call.name, args: call.args ?? {} });
            }
          } else if (message.type === "tool") {
            const { ok, summary } = summarise(textOf(message.content));

            events.push({
              type: "tool_result",
              id: message.tool_call_id ?? "",
              name: message.name ?? "",
              ok,
              summary,
            });
          }
        }
      }
    }

    return events;
  }
}
