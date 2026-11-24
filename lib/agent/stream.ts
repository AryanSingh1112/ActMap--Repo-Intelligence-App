
import "server-only";

import { Client } from "@langchain/langgraph-sdk";

export function agentUrl(): string {
  return (process.env.AGENT_URL ?? "http://localhost:2024").replace(/\/$/, "");
}

export function agentClient(): Client {
  return new Client({ apiUrl: agentUrl() });
}

export type AskEvent =
  | { type: "thread"; threadId: string }
  | { type: "text"; text: string }
  | {
      type: "tool";
      id: string;
      name: string;
      args: Record<string, unknown>;
    }
  | {
      type: "tool_result";
      id: string;
      name: string;
      ok: boolean;
      summary: string;
    }
  | { type: "done" }
  | { type: "error"; message: string };

type Raw = {
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

function summarise(content: string): {
  ok: boolean;
  summary: string;
} {
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
        return {
          ok: true,
          summary: `${(body[key] as unknown[]).length} ${key}`,
        };
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
  const stream = agentClient().runs.stream(threadId, "agent", {
    input: {
      messages: [{ role: "user", content: message }],
    },
    config: {
      configurable: {
        actmapCredential: credential,
      },
    },
    streamMode: ["messages-tuple", "updates"],
    signal,
  });

  const seen = new Set<string>();

  for await (const event of stream) {
    if (event.event === "messages") {
      const [messageChunk] = event.data as unknown as [Raw, unknown];
      const kind = messageChunk?.type ?? "";

      if (
        (kind === "ai" || kind === "AIMessageChunk") &&
        !messageChunk.tool_calls?.length
      ) {
        const text = textOf(messageChunk.content);

        if (text) {
          yield { type: "text", text };
        }
      }
    } else if (event.event === "updates") {
      const data = event.data as Record<
        string,
        { messages?: Raw[] } | undefined
      >;

      for (const node of Object.values(data)) {
        for (const message of node?.messages ?? []) {
          if (message.type === "ai") {
            for (const call of message.tool_calls ?? []) {
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
          } else if (message.type === "tool") {
            const { ok, summary } = summarise(
              textOf(message.content),
            );

            yield {
              type: "tool_result",
              id: message.tool_call_id ?? "",
              name: message.name ?? "",
              ok,
              summary,
            };
          }
        }
      }
    } else if (event.event === "error") {
      yield {
        type: "error",
        message: "The agent stopped unexpectedly.",
      };
    }
  }

  yield { type: "done" };
}
