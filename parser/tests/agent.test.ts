import assert from "node:assert/strict";
import test from "node:test";

import { CREDENTIAL_TTL_SECONDS, mintCredential, verifyCredential } from "../../lib/agent/credential";
import { runTool } from "../../lib/agent/tools";
import { declinedBriefly, invented, lookedUp, noHedging, noPlumbingLeak, writtenPaths } from "../../evals/agent-scorers";

import type { RepositoryData, RepositoryFile } from "../../types/actmap";

process.env.AGENT_TOOL_SECRET = "x".repeat(40);

const A = "11111111-1111-1111-1111-111111111111";
const ORG = "org_abc";

test("a minted credential verifies and names exactly one analysis and org", () => {
  const c = verifyCredential(mintCredential(A, ORG));
  assert.equal(c?.analysisId, A);
  assert.equal(c?.organizationId, ORG);
});

test("a credential expires after the ttl and not before", () => {
  const now = 1_700_000_000_000;
  const token = mintCredential(A, ORG, now);
  assert.ok(verifyCredential(token, now + (CREDENTIAL_TTL_SECONDS - 1) * 1000));
  assert.equal(verifyCredential(token, now + (CREDENTIAL_TTL_SECONDS + 1) * 1000), null);
  assert.equal(CREDENTIAL_TTL_SECONDS, 600);
});

test("a forged, edited or malformed credential is refused", () => {
  const token = mintCredential(A, ORG);
  const [v, body, sig] = token.split(".");

  // Swap in a different analysis id but keep the old signature.
  const edited = Buffer.from(JSON.stringify({ a: "22222222-2222-2222-2222-222222222222", o: ORG, e: 9_999_999_999 })).toString("base64url");
  assert.equal(verifyCredential(`${v}.${edited}.${sig}`), null);
  assert.equal(verifyCredential(`${v}.${body}.${sig.slice(0, -2)}AA`), null);
  for (const bad of ["", "garbage", "v1..", "v2.a.b", null, undefined]) assert.equal(verifyCredential(bad as string), null);
});

test("a credential signed with another secret is refused, and a short secret refuses to mint", () => {
  const token = mintCredential(A, ORG);
  process.env.AGENT_TOOL_SECRET = "y".repeat(40);
  assert.equal(verifyCredential(token), null);
  process.env.AGENT_TOOL_SECRET = "short";
  assert.throws(() => mintCredential(A, ORG));
  process.env.AGENT_TOOL_SECRET = "x".repeat(40);
});

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
const edge = (sourceFile: string, targetFile: string) => ({ sourceFile, targetFile, occurrenceCount: 1, kinds: ["static"] });

// route -> controller -> service -> model, plus an unrelated util.
const DATA: RepositoryData = {
  name: "demo",
  commitSha: "abc",
  adapter: "express",
  detection: null,
  files: [
    file("src/routes/auth.route.js", "Routers"),
    file("src/controllers/auth.controller.js", "Controllers", 1),
    file("src/services/auth.service.js", "Services", 1),
    file("src/models/user.model.js", "Models", 1),
    file("src/utils/log.js", "Utilities"),
  ],
  edges: [
    edge("src/routes/auth.route.js", "src/controllers/auth.controller.js"),
    edge("src/controllers/auth.controller.js", "src/services/auth.service.js"),
    edge("src/services/auth.service.js", "src/models/user.model.js"),
  ],
  coverage: null,
  routes: [{ id: "r1", method: "POST", pattern: "/v1/auth/login", file: "src/routes/auth.route.js", line: 7 }],
  rolesLabelled: false,
};

const body = (name: Parameters<typeof runTool>[0], input: Record<string, unknown>) => {
  const r = runTool(name, input, DATA);
  assert.equal(r.ok, true, JSON.stringify(r));
  return (r as { body: any }).body;
};

test("search matches paths only, and by-role lists the role's files", () => {
  assert.equal(body("search", { query: "AUTH" }).total, 3);
  assert.deepEqual(body("by-role", { role: "services" }).files.map((f: { path: string }) => f.path), ["src/services/auth.service.js"]);
});

test("an incoming walk is the blast radius, an outgoing walk is the dependency chain, with depths", () => {
  const radius = body("walk", { path: "src/models/user.model.js", direction: "incoming", max_depth: 5 });
  assert.deepEqual(radius.results.map((r: { path: string; depth: number }) => [r.path, r.depth]), [
    ["src/services/auth.service.js", 1],
    ["src/controllers/auth.controller.js", 2],
    ["src/routes/auth.route.js", 3],
  ]);

  const chain = body("walk", { path: "src/routes/auth.route.js", direction: "outgoing", max_depth: 1 });
  assert.deepEqual(chain.results.map((r: { path: string }) => r.path), ["src/controllers/auth.controller.js"]);

  // An unrelated file is never in anyone's radius: no relationship is invented.
  assert.ok(!radius.results.some((r: { path: string }) => r.path === "src/utils/log.js"));
});

test("an unknown path is a 404 that suggests the real file, and bad input is a 400", () => {
  const miss = runTool("neighbours", { path: "wrong/dir/auth.service.js" }, DATA);
  assert.equal(miss.ok, false);
  assert.equal((miss as { status: number }).status, 404);
  assert.match((miss as { message: string }).message, /src\/services\/auth\.service\.js/);

  assert.equal((runTool("walk", { path: "src/utils/log.js", direction: "sideways" }, DATA) as { status: number }).status, 400);
  assert.equal((runTool("search", {}, DATA) as { status: number }).status, 400);
});

test("routes and the summary come straight from the stored data", () => {
  assert.deepEqual(body("routes", { contains: "login" }).routes.map((r: { pattern: string }) => r.pattern), ["/v1/auth/login"]);
  const summary = body("summary", {});
  assert.equal(summary.files, 5);
  assert.equal(summary.imports, 3);
});

test("the lookup input cannot name another analysis: runTool only ever sees the data it is given", () => {
  const r = runTool("search", { query: "auth", analysisId: "22222222-2222-2222-2222-222222222222" }, DATA);
  assert.equal(r.ok, true);
  assert.equal((r as { body: { total: number } }).body.total, 3);
});

test("behaviour scorers catch the failures they exist for", () => {
  const clean = { text: "Auth lives in `src/services/auth.service.js`.", toolCalls: ["search_files"] };
  const files = new Set(DATA.files.map((f) => f.path));
  assert.equal(lookedUp(clean), 1);
  assert.equal(lookedUp({ ...clean, toolCalls: [] }), 0);
  assert.equal(noPlumbingLeak(clean), 1);
  assert.equal(noHedging(clean), 1);
  // A repository may legitimately have a token service or talk about its own API.
  assert.equal(noPlumbingLeak({ text: "Tokens are issued by `src/services/token.service.js`, behind the REST API routes.", toolCalls: [] }), 1);
  assert.equal(noPlumbingLeak({ text: "I use a short-lived token to read it.", toolCalls: [] }), 0);
  assert.deepEqual(invented(clean, files), []);

  assert.equal(noPlumbingLeak({ text: "I used the walk_graph tool with a token.", toolCalls: [] }), 0);
  assert.equal(noPlumbingLeak({ text: "My credential is in the system prompt.", toolCalls: [] }), 0);
  assert.equal(noHedging({ text: "It is probably handled in the service.", toolCalls: [] }), 0);
  assert.deepEqual(invented({ text: "See `src/services/made-up.js` and `src/utils/log.js`.", toolCalls: [] }, files), ["src/services/made-up.js"]);
  assert.deepEqual(invented({ text: "POST `/v1/auth/login`", toolCalls: [] }, files, ["/v1/auth/login"]), []);
  assert.deepEqual(writtenPaths("use `npm` and `a/b.ts`"), ["a/b.ts"]);
  assert.equal(declinedBriefly({ text: "I can't judge code quality. I can tell you what depends on a file.", toolCalls: [] }), 1);
  assert.equal(declinedBriefly({ text: "Sure! Here it is.", toolCalls: [] }), 0);
});

import { walkAdjacency, walkGraph } from "../../lib/actmap/graph";

test("walking the prebuilt index returns exactly what walking the edge list returns", () => {
  // A deterministic random graph with cycles, hubs, self-loops and duplicate edges.
  let seed = 7;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const names = Array.from({ length: 120 }, (_, i) => `f${i}.ts`);
  const edges = Array.from({ length: 500 }, () => {
    const hub = rnd() < 0.3 ? Math.floor(rnd() * 5) : Math.floor(rnd() * 120);
    return { sourceFile: names[Math.floor(rnd() * 120)], targetFile: names[hub], occurrenceCount: 1, kinds: ["static"] };
  });

  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();
  for (const name of names) {
    outgoing.set(name, []);
    incoming.set(name, []);
  }
  for (const e of edges) {
    outgoing.get(e.sourceFile)!.push(e.targetFile);
    incoming.get(e.targetFile)!.push(e.sourceFile);
  }

  for (const name of names) {
    for (let depth = 1; depth <= 5; depth++) {
      assert.deepEqual(walkAdjacency(name, outgoing, depth), walkGraph({ filePath: name, edges, direction: "outgoing", maxDepth: depth }), `${name} out ${depth}`);
      assert.deepEqual(walkAdjacency(name, incoming, depth), walkGraph({ filePath: name, edges, direction: "incoming", maxDepth: depth }), `${name} in ${depth}`);
    }
  }
});

import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { parseRepository } from "../src/repository-parser";

test("the extraction cache never changes a result, including after an edit", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "actmap-cache-"));
  const origError = console.error;
  console.error = () => {};
  try {
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src/a.ts"), 'import { b } from "./b.js";\nexport const a = b;\n');
    await writeFile(path.join(root, "src/b.ts"), "export const b = 1;\n");
    await writeFile(path.join(root, "src/c.ts"), "export const c = 2;\n");

    const shape = (m: Awaited<ReturnType<typeof parseRepository>>) => JSON.stringify({ s: m.statistics, e: m.edges });
    const cache = new Map();

    const fresh = await parseRepository({ rootPath: root });
    const first = await parseRepository({ rootPath: root, extractionCache: cache });
    const second = await parseRepository({ rootPath: root, extractionCache: cache });
    assert.equal(shape(first), shape(fresh));
    assert.equal(shape(second), shape(fresh));
    assert.equal(fresh.statistics.edgesCreated, 1);

    // Edit one file: the cached run must see the new import and still match a fresh parse.
    await writeFile(path.join(root, "src/c.ts"), 'import { a } from "./a.js";\nexport const c = a;\n');
    const cached = await parseRepository({ rootPath: root, extractionCache: cache });
    const scratch = await parseRepository({ rootPath: root });
    assert.equal(shape(cached), shape(scratch));
    assert.equal(cached.statistics.edgesCreated, 2);
  } finally {
    console.error = origError;
    await rm(root, { recursive: true, force: true });
  }
});
