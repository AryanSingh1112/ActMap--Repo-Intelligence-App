// Browser-safe. Turns the model's text into a small tree, nothing more.

import { matchPaths } from "./paths";

/**
 * The prompt permits exactly three kinds of formatting: inline code, bullets
 * and bold. This parser understands exactly those. Anything else a model adds
 * anyway (headings, italics, fences, rules, numbering) is turned into the
 * nearest of the three or dropped, so no marker ever reaches the screen.
 */

export type Inline =
  | { type: "text"; text: string }
  | { type: "code"; text: string }
  | { type: "bold"; children: Inline[] }
  | { type: "link"; path: string; label: string; code: boolean };

export type Block =
  | { type: "paragraph"; children: Inline[] }
  | { type: "list"; items: Inline[][] };

/** Gives the repository path a written token stands for, or null if it is none. */
export type Resolve = (token: string) => string | null;

function linkify(text: string, resolve: Resolve): Inline[] {
  const out: Inline[] = [];
  let cursor = 0;

  for (const match of matchPaths(text)) {
    const path = resolve(match.token);
    if (!path) continue;

    if (match.start > cursor) out.push({ type: "text", text: text.slice(cursor, match.start) });
    out.push({ type: "link", path, label: match.label, code: false });
    cursor = match.end;
  }

  if (cursor < text.length) out.push({ type: "text", text: text.slice(cursor) });
  return out;
}

function codeOrLink(body: string, resolve: Resolve): Inline {
  const written = body.replace(/^\.\//, "").replace(/:\d+(?::\d+)?$/, "");
  const path = resolve(written);

  return path ? { type: "link", path, label: body, code: true } : { type: "code", text: body };
}

function parseInline(source: string, resolve: Resolve): Inline[] {
  const out: Inline[] = [];
  let buffer = "";
  let index = 0;

  const flush = () => {
    if (buffer) out.push(...linkify(buffer, resolve));
    buffer = "";
  };

  while (index < source.length) {
    const char = source[index];

    if (char === "`") {
      let run = 1;
      while (source[index + run] === "`") run++;

      const fence = "`".repeat(run);
      const end = source.indexOf(fence, index + run);

      // Backticks with nothing to close them are dropped, never shown.
      if (end === -1) {
        index += run;
        continue;
      }

      flush();
      const body = source.slice(index + run, end).trim();
      if (body) out.push(codeOrLink(body, resolve));
      index = end + run;
      continue;
    }

    if ((char === "*" || char === "_") && source[index + 1] === char) {
      const marker = char + char;
      const end = source.indexOf(marker, index + 2);
      const boundary = char === "*" || !/\w/.test(source[index - 1] ?? " ");

      if (end > index + 2 && boundary) {
        flush();
        out.push({ type: "bold", children: parseInline(source.slice(index + 2, end), resolve) });
        index = end + 2;
        continue;
      }

      if (char === "*") {
        index += 2;
        continue;
      }
    }

    // A lone asterisk is an italics marker or a stray bullet. Neither is allowed.
    if (char === "*") {
      index++;
      continue;
    }

    buffer += char;
    index++;
  }

  flush();
  return out;
}

const BULLET = /^(?:[-*+•]|\d+[.)])\s+(.*)$/;

export function parseExplanation(text: string, resolve: Resolve): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] | null = null;
  let fenced = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", children: parseInline(paragraph.join(" "), resolve) });
    }
    paragraph = [];
  };

  const flushList = () => {
    if (list) blocks.push({ type: "list", items: list.map((item) => parseInline(item, resolve)) });
    list = null;
  };

  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const line of text.replace(/\r\n?/g, "\n").split("\n")) {
    const trimmed = line.trim();

    if (/^(```|~~~)/.test(trimmed)) {
      flushAll();
      fenced = !fenced;
      continue;
    }

    if (fenced) {
      if (trimmed) blocks.push({ type: "paragraph", children: [codeOrLink(trimmed, resolve)] });
      continue;
    }

    if (!trimmed) {
      flushAll();
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushAll();
      continue;
    }

    const heading = trimmed.match(/^#{1,6}\s*(.*)$/);

    if (heading) {
      flushAll();
      if (heading[1].trim()) {
        blocks.push({
          type: "paragraph",
          children: [{ type: "bold", children: parseInline(heading[1].trim(), resolve) }],
        });
      }
      continue;
    }

    const body = trimmed.replace(/^>\s?/, "");
    const bullet = body.match(BULLET);

    if (bullet) {
      flushParagraph();
      (list ??= []).push(bullet[1]);
      continue;
    }

    // A wrapped line belongs to the bullet above it.
    if (list && /^\s/.test(line)) {
      list[list.length - 1] += ` ${body}`;
      continue;
    }

    flushList();
    paragraph.push(body);
  }

  flushAll();
  return blocks;
}

function inlineText(nodes: Inline[]): string {
  return nodes
    .map((node) => {
      switch (node.type) {
        case "text":
        case "code":
          return node.text;
        case "link":
          return node.label;
        case "bold":
          return inlineText(node.children);
      }
    })
    .join("");
}

/** What a reader would see, as plain text. Used by tests to prove no marker leaks. */
export function renderedText(blocks: Block[]): string {
  return blocks
    .map((block) =>
      block.type === "paragraph"
        ? inlineText(block.children)
        : block.items.map((item) => inlineText(item)).join("\n"),
    )
    .join("\n\n");
}

/** Resolves a written path against the repository, or a bare name against the files handed over. */
export function makeResolver(
  repositoryFiles: { has(path: string): boolean },
  shown: Iterable<string>,
): Resolve {
  const byName = new Map<string, string[]>();

  for (const path of shown) {
    const name = path.slice(path.lastIndexOf("/") + 1);
    byName.set(name, [...(byName.get(name) ?? []), path]);
  }

  return (token) => {
    if (repositoryFiles.has(token)) return token;

    // Only a bare name that points at exactly one shown file is unambiguous.
    const candidates = token.includes("/") ? undefined : byName.get(token);
    return candidates && candidates.length === 1 ? candidates[0] : null;
  };
}
