import assert from "node:assert/strict";
import test from "node:test";

import { makeResolver, parseExplanation, renderedText, type Block, type Inline } from "../../lib/ai/render";

const files = new Set(["src/utils/pick.js", "src/controllers/user.controller.js"]);
const resolve = makeResolver(files, files);

function links(blocks: Block[]): string[] {
  const out: string[] = [];
  const walk = (nodes: Inline[]) => {
    for (const node of nodes) {
      if (node.type === "link") out.push(node.path);
      if (node.type === "bold") walk(node.children);
    }
  };
  for (const block of blocks) {
    if (block.type === "paragraph") walk(block.children);
    else block.items.forEach(walk);
  }
  return out;
}

test("inline code, bullets and bold are kept", () => {
  const blocks = parseExplanation("It exports **pick** and `keys`.\n\n- first\n- second", resolve);
  assert.equal(blocks.length, 2);
  assert.equal(blocks[1].type, "list");
  assert.equal(JSON.stringify(blocks).includes('"bold"'), true);
  assert.equal(JSON.stringify(blocks).includes('"code"'), true);
});

test("repository paths in the prose become links, in code or not", () => {
  const blocks = parseExplanation(
    "Used by `src/controllers/user.controller.js` and src/utils/pick.js, not by src/ghost.js.",
    resolve,
  );
  assert.deepEqual(links(blocks), ["src/controllers/user.controller.js", "src/utils/pick.js"]);
});

test("a bare name for exactly one shown file links to it", () => {
  assert.deepEqual(links(parseExplanation("See `pick.js`.", resolve)), ["src/utils/pick.js"]);
});

test("no backtick, asterisk or hash survives, whatever the model sent", () => {
  const messy = [
    "## Overview",
    "This is *italic* and **bold** and `code` and a stray ` tick and a stray ** pair.",
    "",
    "* star bullet",
    "1. numbered",
    "",
    "```js",
    "const a = 1;",
    "```",
    "---",
    "### Another heading",
  ].join("\n");

  const text = renderedText(parseExplanation(messy, resolve));
  assert.equal(/[`*]/.test(text), false, text);
  assert.equal(/^#/m.test(text), false, text);
  assert.match(text, /Overview/);
  assert.match(text, /const a = 1;/);
});

test("a wrapped bullet stays one item", () => {
  const blocks = parseExplanation("- one\n  continues\n- two", resolve);
  assert.equal(blocks[0].type === "list" && blocks[0].items.length, 2);
});
