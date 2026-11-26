
import "server-only";

import { getAgent } from "../../agent/src/agent";

export type AskEvent =
  | { type: "thread"; threadId: string }
  | { type: "text"; text: string }
  | { type: "tool"; id: string; name: string; args: Record<string, unknown> }
  | {
      type: "tool_result";
      id: string;
      name: string;
      ok: boolean;
      summary: string;
    }
  | { type: "done" }
  | { type: "error"; message: string };

type Message = {
  type?: string;
  content?: unknown;
  tool_calls?: {
    id?: string;
    name: string;
    args?: Record<string, unknown>;
  }[];
  tool_call_id?: string;
  name?: string;
};

function textOf(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((part) =>
      typeof part === "string"
        ? part
        : (part as { text?: string })?.text ?? "",
    )
    .join("");
}

function summarise(content: string) {
  if (/^The lookup failed/i.test(content)) {
    return { ok: false, summary: content.slice(0, 160) };
  }

  try {
    const body = JSON.parse(content) as Record<string, unknown>;

    for (const key of [
      "files",
      "matches",
      "routes",
      "results",
      "imports",
      "importedBy",
    ]) {
      if (Array.isArray(body[key])) {
        return { ok: true, summary: `${body[key].length} ${key}` };
      }
    }
  } catch {
    // Tool output was not JSON.
  }

  return {
    ok: true,
    summary: content.replace(/\s+/g, " ").slice(0, 120),
  };
}


export async function* relayRun(
  threadId: string,
  message: string,
  credential: string,
  signal?: AbortSignal,
): AsyncGenerator<AskEvent> {
  const agent = await getAgent();

  const result = (await agent.invoke(
    {
      messages: [{ role: "user", content: message }],
    } as never,
    {
      configurable: {
        thread_id: threadId,
        actmapCredential: credential,
      },
      signal,
    } as never,
  )) as { messages?: Message[] };

  const messages = result.messages ?? [];
  const seen = new Set<string>();

  for (const item of messages) {
    if (item.type === "ai") {
      for (const call of item.tool_calls ?? []) {
        const id = call.id ?? `${call.name}-${seen.size}`;

        if (seen.has(id)) continue;
        seen.add(id);

        yield {
          type: "tool",
          id,
          name: call.name,
          args: call.args ?? {},
        };
      }
    }

    if (item.type === "tool") {
      const { ok, summary } = summarise(textOf(item.content));

      yield {
        type: "tool_result",
        id: item.tool_call_id ?? "",
        name: item.name ?? "",
        ok,
        summary,
      };
    }
  }

  const finalMessage = [...messages]
    .reverse()
    .find((item) => item.type === "ai" && textOf(item.content).trim());

  const answer = finalMessage ? textOf(finalMessage.content) : "";

  if (answer) {
    yield { type: "text", text: answer };
  }

  yield { type: "done" };
}

