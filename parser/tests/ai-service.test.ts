import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { assertPinned } from "../../lib/ai/config";
import { CLASSIFIER_ROLES, STRUCTURAL_ROLES } from "../../lib/ai/roles";
import { parseRoles } from "../../lib/ai/service";

test("the classifier can never return a structural role", () => {
  for (const structural of STRUCTURAL_ROLES) assert.equal((CLASSIFIER_ROLES as readonly string[]).includes(structural), false);

  const given = new Set(["a.ts", "b.ts", "c.ts", "d.ts"]);
  const text = JSON.stringify({
    roles: [
      { path: "a.ts", role: "service" },
      { path: "b.ts", role: "controller" },
      { path: "c.ts", role: "page" },
      { path: "d.ts", role: "other" },
      { path: "invented.ts", role: "util" },
    ],
  });

  assert.deepEqual([...parseRoles(text, given)], [["a.ts", "service"]]);
  assert.equal(parseRoles("not json", given).size, 0);
});

test("a moving alias is refused, an exact name is accepted", () => {
  assert.throws(() => assertPinned("gemini-flash-latest", "X"));
  assert.throws(() => assertPinned("", "X"));
  assert.equal(assertPinned("gemini-3.8-flash", "X"), "gemini-3.8-flash");
});

test("the AI client is constructed in exactly one file", () => {
  const hits: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      if (["node_modules", ".next", ".git"].includes(name)) continue;
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (/\.(ts|tsx)$/.test(name) && !full.includes("tests") && /new OpenAI\(/.test(readFileSync(full, "utf8"))) hits.push(path.relative(process.cwd(), full));
    }
  };
  for (const dir of ["lib", "app", "components", "evals", "scripts"]) walk(path.join(process.cwd(), dir));
  assert.deepEqual(hits.map((h) => h.replace(/\\/g, "/")), ["lib/ai/client.ts"]);
});
