import assert from "node:assert/strict";
import test from "node:test";

import { AIMessage } from "@langchain/core/messages";
import { fakeModel } from "@langchain/core/testing";

import { createActmapAgent } from "../../agent/src/factory";
import { mintCredential } from "../../lib/agent/credential";
import { EventTranslator, summarise, type AskEvent } from "../../lib/agent/events";
import { executeLookup, type LookupDeps } from "../../lib/agent/execute";
import { runAgent } from "../../lib/agent/runtime";

import type { RepositoryData, RepositoryFile } from "../../types/actmap";

process.env.AGENT_TOOL_SECRET = "s".repeat(40);

const A = "11111111-1111-1111-1111-111111111111";
const ORG = "org_abc";

const file = (path: string, role: string, fanIn = 0): RepositoryFile => ({
  id: path,
  path,
  name: path.slice(path.lastIndexOf("/") + 1),
  extension: ".js",
  folderPath: path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : ".",
  role,
  lineCount: 10,
  fanIn,
  fanOut: 0,
});

const DATA: RepositoryData = {
  name: "demo",
  commitSha: "abc",
  adapter: "express",
  detection: null,
  files: [file("src/auth.route.js", "Routers"), file("src/auth.service.js", "Services", 1)],
  edges: [{ sourceFile: "src/auth.route.js", targetFile: "src/auth.service.js", occurrenceCount: 1, kinds: ["static"] }],
  coverage: null,
  routes: [],
  rolesLabelled: false,
};

// Behaves like the real data layer: only the credential's own analysis and organization exist.
const deps: LookupDeps = {
  load: async (c) => (c.analysisId === A && c.organizationId === ORG ? DATA : null),
  source: async () => [],
};

test("a lookup needs a valid credential and ignores identifiers in its input", async () => {
  const token = mintCredential(A, ORG);

  assert.equal((await executeLookup("search", { query: "auth" }, token, deps)).ok, true);

  const none = await executeLookup("search", { query: "auth" }, undefined, deps);
  assert.deepEqual(none.ok === false && none.status, 401);
  const forged = await executeLookup("search", { query: "auth" }, token.slice(0, -3) + "AAA", deps);
  assert.deepEqual(forged.ok === false && forged.status, 401);

  // A credential for another organization finds nothing, whatever the input claims.
  const other = await executeLookup("search", { query: "auth", analysisId: A, organizationId: ORG }, mintCredential(A, "org_other"), deps);
  assert.deepEqual(other.ok === false && other.status, 404);

  assert.equal((await executeLookup("nope", {}, token, deps)).ok, false);
  assert.deepEqual((await executeLookup("search", [], token, deps)).ok === false && 400, 400);
  assert.deepEqual((await executeLookup("source", { paths: [] }, token, deps)).ok === false && 400, 400);
});

test("the event translator streams text, reports tool steps and keeps only the final answer", () => {
  const t = new EventTranslator();
  const events: AskEvent[] = [];
  const feed = (mode: string, data: unknown) => events.push(...t.push(mode, data));

  feed("messages", [{ type: "ai", content: "Let me check. ", tool_calls: [] }, {}]);
  feed("updates", { model: { messages: [{ type: "ai", content: "Let me check.", tool_calls: [{ id: "c1", name: "search_files", args: { query: "auth" } }] }] } });
  feed("updates", { tools: { messages: [{ type: "tool", tool_call_id: "c1", name: "search_files", content: JSON.stringify({ files: [1, 2, 3] }) }] } });
  feed("messages", [{ type: "ai", content: "Auth is in ", tool_calls: [] }, {}]);
  feed("messages", [{ type: "ai", content: "`src/auth.service.js`.", tool_calls: [] }, {}]);
  feed("updates", { model: { messages: [{ type: "ai", content: "Auth is in `src/auth.service.js`.", tool_calls: [] }] } });

  assert.deepEqual(events.map((e) => e.type), ["text", "tool", "tool_result", "text", "text"]);
  assert.equal(t.answer, "Auth is in `src/auth.service.js`.");
  const result = events[2];
  assert.equal(result.type === "tool_result" && result.summary, "3 files");
  assert.equal(summarise("The lookup failed (404): nope").ok, false);
});

async function ask(model: ReturnType<typeof fakeModel>, credential: string) {
  const agent = createActmapAgent({
    model: model as never,
    lookup: async (name, input, config) => {
      const outcome = await executeLookup(name, input, config?.configurable?.actmapCredential, deps);
      return outcome.ok === true ? JSON.stringify(outcome.body) : `The lookup failed (${outcome.status}): ${outcome.message}`;
    },
  });

  const events: AskEvent[] = [];
  const run = runAgent({
    agent: agent as never,
    history: [{ role: "user", content: "hi" }, { role: "assistant", content: "hello" }],
    message: "Where is authentication handled?",
    credential,
  });

  let answer = "";
  for (;;) {
    const step = await run.next();
    if (step.done === true) {
      answer = (step.value as { answer: string }).answer;
      break;
    }
    events.push(step.value as AskEvent);
  }
  return { events, answer };
}

test("the deep agent runs in-process: it calls a lookup, gets real data and answers", async () => {
  const model = fakeModel()
    .respondWithTools([{ name: "search_files", args: { query: "auth" } }])
    .respond(new AIMessage("Authentication is handled in `src/auth.service.js`."));

  const credential = mintCredential(A, ORG);
  const { events, answer } = await ask(model, credential);

  const kinds = events.map((e) => e.type);
  assert.ok(kinds.indexOf("tool") < kinds.indexOf("tool_result"), kinds.join());
  const result = events.find((e) => e.type === "tool_result");
  assert.equal(result?.type === "tool_result" && result.ok, true);
  assert.equal(result?.type === "tool_result" && result.summary, "2 files");
  assert.equal(answer, "Authentication is handled in `src/auth.service.js`.");

  // The credential is configuration, never content: it must not appear in anything streamed.
  assert.ok(!JSON.stringify(events).includes(credential));
});

test("a credential for the wrong organization yields a failed lookup, not data", async () => {
  const model = fakeModel()
    .respondWithTools([{ name: "search_files", args: { query: "auth" } }])
    .respond(new AIMessage("I could not check the repository just now."));

  const { events } = await ask(model, mintCredential(A, "org_other"));
  const result = events.find((e) => e.type === "tool_result");
  assert.equal(result?.type === "tool_result" && result.ok, false);
});
