// Browser-safe. No imports.

/**
 * The invented-path check.
 *
 * Every path-shaped token in an explanation is tested against the exact set
 * of paths the model was shown. Anything else was invented. This is set
 * membership: plain code with an exact answer, never a model grading a model.
 */

const CODE_EXTENSIONS = new Set(
  (
    "ts tsx js jsx mjs cjs mts cts md mdx css scss sass less html vue svelte astro py rb go rs java kt " +
    "php cs swift sh yml yaml toml sql graphql gql prisma env lock txt xml ini cfg gradle"
  ).split(" "),
);

// "res.json" is a call, not a file, so a bare .json name is not path-shaped.
const AMBIGUOUS_BARE = new Set(["json", "md", "env", "lock", "txt", "xml", "ini", "cfg"]);

// Names that are products, not files: Node.js, Next.js, Vue.js.
const PRODUCT_STEMS = new Set(
  "node next nuxt vue react express nest three d3 chart socket angular ember backbone alpine deno bun nuxt3 p5 anime".split(" "),
);

// A run of file-name characters, optionally split by slashes. Parentheses are
// allowed because route groups are folders: app/(workspace)/page.tsx.
const SEGMENT = "[\\w@$~.+\\-\\[\\]()]+";
const TOKEN = new RegExp(`${SEGMENT}(?:/${SEGMENT})*/?`, "g");

/** What is shown for a match: the raw text without sentence punctuation around it. */
function label(raw: string): string {
  let text = raw.replace(/[.,;:!?]+$/, "");

  // A closing bracket that belongs to the sentence, not to a route group.
  while (text.endsWith(")") && (text.match(/\)/g)?.length ?? 0) > (text.match(/\(/g)?.length ?? 0)) {
    text = text.slice(0, -1);
  }

  return text.replace(/[.,;:!?]+$/, "");
}

/** The path itself: no leading ./ and no :line suffix. */
function normalise(shown: string): string {
  return shown.replace(/^\.\//, "").replace(/:\d+(?::\d+)?$/, "");
}

function extensionOf(name: string): string | null {
  const dot = name.lastIndexOf(".");
  if (dot <= 0 || dot === name.length - 1) return null;
  return name.slice(dot + 1).toLowerCase();
}

/** True when a token looks like a file or folder path rather than prose. */
export function isPathShaped(token: string): boolean {
  if (!token || token.includes("://")) return false;
  if (!token.includes("/") && (token.includes("(") || token.startsWith("@"))) return false;

  if (token.endsWith("/")) return token.length > 1 && /[A-Za-z0-9]/.test(token);

  const slash = token.lastIndexOf("/");
  const last = slash === -1 ? token : token.slice(slash + 1);
  const extension = extensionOf(last);
  if (!extension || !CODE_EXTENSIONS.has(extension)) return false;

  if (slash === -1) {
    if (AMBIGUOUS_BARE.has(extension)) return false;
    const stem = last.slice(0, last.lastIndexOf(".")).toLowerCase();
    if (PRODUCT_STEMS.has(stem)) return false;
  }

  return true;
}

export type PathMatch = {
  start: number;
  end: number;
  /** The text as written, which is what gets shown. */
  label: string;
  /** The path it stands for. */
  token: string;
};

/** Every path-shaped token in the text with where it sits. */
export function matchPaths(text: string): PathMatch[] {
  const matches: PathMatch[] = [];

  for (const match of text.matchAll(TOKEN)) {
    const shown = label(match[0]);
    const token = normalise(shown);

    if (token && isPathShaped(token)) {
      const start = match.index ?? 0;
      matches.push({ start, end: start + shown.length, label: shown, token });
    }
  }

  return matches;
}

/** Every path-shaped token in the text, cleaned, in order, without repeats. */
export function extractPathTokens(text: string): string[] {
  return [...new Set(matchPaths(text).map((match) => match.token))];
}

function ancestors(paths: Iterable<string>): Set<string> {
  const folders = new Set<string>();

  for (const path of paths) {
    let slash = path.lastIndexOf("/");
    while (slash > 0) {
      folders.add(path.slice(0, slash + 1));
      slash = path.lastIndexOf("/", slash - 1);
    }
  }

  return folders;
}

export type PathCheck = {
  /** Path-shaped tokens found in the text. */
  checked: string[];
  /** The ones that were not in the set the model was shown. */
  invented: string[];
  /** 1 when nothing was invented, 0 otherwise. Text with no paths scores 1. */
  score: number;
};

/**
 * `shown` is the exact set of paths the model was handed. A bare file name
 * passes when it is the name of a shown file, and a folder passes when it
 * holds a shown file, since both are only a shorter way of writing a path
 * that was handed over.
 */
export function checkPaths(text: string, shown: Iterable<string>): PathCheck {
  const paths = new Set(shown);
  const folders = ancestors(paths);
  const names = new Set([...paths].map((path) => path.slice(path.lastIndexOf("/") + 1)));

  const checked = extractPathTokens(text);

  const invented = checked.filter((token) => {
    if (paths.has(token)) return false;
    if (token.endsWith("/")) return !folders.has(token);
    if (!token.includes("/") && names.has(token)) return false;
    return true;
  });

  return { checked, invented, score: invented.length === 0 ? 1 : 0 };
}
