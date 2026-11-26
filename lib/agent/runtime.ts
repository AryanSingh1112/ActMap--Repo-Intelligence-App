import "server-only";

import { createActmapAgent } from "../../agent/src/factory";
import { EventTranslator, type AskEvent } from "./events";
import { executeLookup } from "./execute";
import { serverLookupDeps } from "./deps";
import type { ChatTurn } from "./threads";

import type { Lookup } from "../../agent/src/tools";

/**
 * Runs the Deep Agent inside this server process. This is how Ask works on
 * Vercel: no separate agent server, no localhost. Each request builds nothing
 * new (the compiled agent is reused) and holds no per-user state, so
 * concurrent requests on any instance are independent.
 */

// Same output as the HTTP tool API: JSON on success, "The lookup failed (...)" otherwise.
const inProcessLookup: Lookup = async (name, input, config) => {
  const outcome = await executeLookup(
    name,
    input,
    config?.configurable?.actmapCredential,
    serverLookupDeps,
  );

  return outcome.ok === true
    ? JSON.stringify(outcome.body)
    : `The lookup failed (${outcome.status}): ${outcome.message.slice(0, 300)}`;
};

let compiled: ReturnType<typeof createActmapAgent> | null = null;

function getAgent() {
  compiled ??= createActmapAgent({ lookup: inProcessLookup });
  return compiled;
}

// A runaway tool loop must not run until the function times out.
const RECURSION_LIMIT = 30;

export type AgentRun = {
  history: ChatTurn[];
  message: string;
  credential: string;
  signal?: AbortSignal;
  /** Tests inject an agent built with a fake model. */
  agent?: { stream: (input: unknown, config: unknown) => Promise<AsyncIterable<unknown>> };
};

export type AgentResult = { answer: string };

export async function* runAgent(run: AgentRun): AsyncGenerator<AskEvent, AgentResult> {
  const agent = run.agent ?? (getAgent() as unknown as NonNullable<AgentRun["agent"]>);
  const translator = new EventTranslator();

  const stream = await agent.stream(
    { messages: [...run.history, { role: "user", content: run.message }] },
    {
      configurable: { actmapCredential: run.credential },
      streamMode: ["messages", "updates"],
      recursionLimit: RECURSION_LIMIT,
      signal: run.signal,
    },
  );

  for await (const item of stream) {
    const [mode, data] = item as [string, unknown];

    for (const event of translator.push(mode, data)) yield event;
  }

  return { answer: translator.answer.trim() };
}
