import "server-only";

import { createHash } from "node:crypto";

import { LIMITS } from "./config";

const TIMEOUT_MS = 12_000;

function githubHeaders(accept?: string): HeadersInit {
  const token = process.env.GITHUB_TOKEN?.trim();

  return {
    "User-Agent": "actmap",
    ...(accept ? { Accept: accept } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function rawUrl(owner: string, repo: string, ref: string, path: string) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

/** The file as it was at the analysed commit. Cut to a size the model can be handed. */
export async function fetchSource(options: { owner: string; repo: string; ref: string; path: string }) {
  const response = await fetch(rawUrl(options.owner, options.repo, options.ref, options.path), {
    headers: githubHeaders(),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub could not give ${options.path} at ${options.ref.slice(0, 7)} (HTTP ${response.status}).`);
  }

  const text = await response.text();
  const truncated = text.length > LIMITS.sourceChars;

  return { text: truncated ? text.slice(0, LIMITS.sourceChars) : text, truncated };
}

/** The newest commit on the default branch. */
export async function headCommit(owner: string, repo: string): Promise<string> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/HEAD`, {
    headers: githubHeaders("application/vnd.github.sha"),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status} for the latest commit.`);
  return (await response.text()).trim();
}

/** The sha-256 of a file at a commit, the same hash stored when it was analysed. null if it is gone. */
export async function hashAt(options: { owner: string; repo: string; ref: string; path: string }) {
  const response = await fetch(rawUrl(options.owner, options.repo, options.ref, options.path), {
    headers: githubHeaders(),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status} for ${options.path}.`);

  return createHash("sha256").update(Buffer.from(await response.arrayBuffer())).digest("hex");
}

/** Files changed between two commits, up to the 300 GitHub lists. */
export async function changedBetween(owner: string, repo: string, base: string, head: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/compare/${base}...${head}`, {
    headers: githubHeaders("application/vnd.github+json"),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status} comparing commits.`);

  const body = (await response.json()) as { files?: { filename: string; status: string }[] };
  const files = body.files ?? [];

  return { files, partial: files.length >= 300 };
}
