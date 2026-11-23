import assert from "node:assert/strict";
import test from "node:test";

import { checkPaths, extractPathTokens } from "../../lib/ai/paths";

const shown = [
  "src/utils/ApiError.js",
  "src/controllers/user.controller.js",
  "app/(workspace)/actions.ts",
];

test("a path that was shown passes", () => {
  const result = checkPaths("It is used by `src/controllers/user.controller.js`.", shown);
  assert.deepEqual(result.invented, []);
  assert.equal(result.score, 1);
});

test("a made-up filename spliced into an explanation is caught", () => {
  const text =
    "It wraps errors for `src/utils/ApiError.js` and is also read by `src/services/billing.service.js`.";
  const result = checkPaths(text, shown);
  assert.deepEqual(result.invented, ["src/services/billing.service.js"]);
  assert.equal(result.score, 0);
});

test("a made-up bare filename is caught, a shown one is not", () => {
  assert.deepEqual(checkPaths("see ghost.service.ts", shown).invented, ["ghost.service.ts"]);
  assert.deepEqual(checkPaths("see ApiError.js", shown).invented, []);
});

test("route groups, line numbers and sentence punctuation are handled", () => {
  assert.deepEqual(checkPaths("Defined in app/(workspace)/actions.ts:12.", shown).invented, []);
  assert.deepEqual(extractPathTokens("(see src/utils/ApiError.js)"), ["src/utils/ApiError.js"]);
});

test("prose that only looks like paths is left alone", () => {
  const text = "It calls res.json, uses Node.js and and/or client/server, then Object.prototype.hasOwnProperty.call.";
  assert.deepEqual(extractPathTokens(text), []);
});

test("a folder passes only when it holds a shown file", () => {
  assert.deepEqual(checkPaths("Everything in src/utils/ is small.", shown).invented, []);
  assert.deepEqual(checkPaths("Everything in src/ghosts/ is small.", shown).invented, ["src/ghosts/"]);
});

test("text with no paths scores 1", () => {
  assert.equal(checkPaths("Nothing to see.", shown).score, 1);
});
