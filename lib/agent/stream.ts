
import "server-only";

import { Client } from "@langchain/langgraph-sdk";

import { EventTranslator, type AskEvent } from "./events";

export function agentUrl(): string {
  return (process.env.AGENT_URL ?? "http://localhost:2024").replace(/\/$/, "");
}

export function agentClient(): Client {
  return new Client({ apiUrl: agentUrl() });
}

export type { AskEvent } from "./events";

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

  const translator = new EventTranslator();

  for await (const event of stream) {
    if (event.event === "messages" || event.event === "updates") {
      for (const out of translator.push(event.event, event.data)) yield out;
    } else if (event.event === "error") {
      yield { type: "error", message: "The agent stopped unexpectedly." };
    }
  }

  yield { type: "done" };
}
