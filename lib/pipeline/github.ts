import "server-only";

import { mkdir } from "node:fs/promises";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

import * as tar from "tar";

export class PipelineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PipelineError";
  }
}

export type RepositoryReference = {
  owner: string;
  repo: string;
  /** Lower-cased canonical URL, used as the identity of the repository. */
  url: string;
};

const OWNER_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO_PATTERN = /^(?!\.{1,2}$)[A-Za-z0-9._-]{1,100}$/;

const MAX_ARCHIVE_BYTES = 200 * 1024 * 1024;
const MAX_EXTRACTED_FILE_BYTES = 5 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 120_000;

/**
 * Accepts https://github.com/owner/repo (with .git, trailing slash, /tree/...),
 * github.com/owner/repo, or owner/repo. Anything else is rejected.
 */
export function parseGitHubUrl(input: string): RepositoryReference | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let pathname: string;

  if (/^[\w.-]+\/[\w.-]+$/.test(trimmed)) {
    pathname = trimmed;
  } else {
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;

    let url: URL;
    try {
      url = new URL(withProtocol);
    } catch {
      return null;
    }

    const host = url.hostname.toLowerCase();
    if (host !== "github.com" && host !== "www.github.com") return null;

    pathname = url.pathname;
  }

  const [owner, rawRepo] = pathname.split("/").filter(Boolean);
  if (!owner || !rawRepo) return null;

  const repo = rawRepo.replace(/\.git$/i, "");

  if (!OWNER_PATTERN.test(owner) || !REPO_PATTERN.test(repo)) return null;

  return {
    owner,
    repo,
    url: `https://github.com/${owner}/${repo}`.toLowerCase(),
  };
}

function notFound(owner: string, repo: string) {
  return new PipelineError(
    `${owner}/${repo} doesn't exist on GitHub, or it isn't public`,
  );
}

/**
 * The commit the default branch points at right now. No token is used, so
 * only public repositories resolve. If GitHub's unauthenticated API is rate
 * limited, returns null and the commit is read from the archive instead.
 */
export async function resolveHeadCommit(
  owner: string,
  repo: string,
): Promise<string | null> {
  let response: Response;

  try {
    response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits/HEAD`,
      {
        headers: {
          Accept: "application/vnd.github.sha",
          "User-Agent": "actmap",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        signal: AbortSignal.timeout(30_000),
        cache: "no-store",
      },
    );
  } catch {
    return null;
  }

  if (response.status === 404) throw notFound(owner, repo);

  if (response.status === 409) {
    throw new PipelineError(`${owner}/${repo} is empty, so there is nothing to map`);
  }

  if (!response.ok) return null;

  const sha = (await response.text()).trim();
  return /^[0-9a-f]{40}$/.test(sha) ? sha : null;
}

/**
 * Downloads the repository archive and extracts it into destination.
 * Returns the commit the archive came from.
 */
export async function downloadArchive(options: {
  owner: string;
  repo: string;
  commitSha: string | null;
  destination: string;
}): Promise<{ commitSha: string | null }> {
  const { owner, repo, destination } = options;
  const ref = options.commitSha ?? "HEAD";

  let response: Response;

  try {
    response = await fetch(
      `https://codeload.github.com/${owner}/${repo}/tar.gz/${ref}`,
      {
        headers: { "User-Agent": "actmap" },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        cache: "no-store",
      },
    );
  } catch {
    throw new PipelineError(
      "Couldn't reach GitHub to download the repository archive",
    );
  }

  if (response.status === 404) throw notFound(owner, repo);

  if (!response.ok || !response.body) {
    throw new PipelineError(
      `GitHub refused the archive download (HTTP ${response.status})`,
    );
  }

  const declared = Number(response.headers.get("content-length") ?? 0);
  if (declared > MAX_ARCHIVE_BYTES) {
    throw new PipelineError(
      "This repository's archive is over 200 MB, which is more than a map can be built from here",
    );
  }

  await mkdir(destination, { recursive: true });

  let received = 0;
  let topLevelDirectory: string | null = null;
  // `git archive` writes the commit it archived into the tarball's global
  // header, so the commit is known even when the API lookup was unavailable.
  let headerCommit: string | null = null;

  const limiter = new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      received += chunk.length;

      if (received > MAX_ARCHIVE_BYTES) {
        callback(
          new PipelineError(
            "This repository's archive is over 200 MB, which is more than a map can be built from here",
          ),
        );
        return;
      }

      callback(null, chunk);
    },
  });

  try {
    await pipeline(
      Readable.fromWeb(response.body as import("node:stream/web").ReadableStream),
      limiter,
      tar.x({
        cwd: destination,
        strip: 1,
        onReadEntry: (entry) => {
          if (topLevelDirectory === null) {
            topLevelDirectory = entry.path.split("/")[0] ?? null;
          }

          const comment = entry.globalExtended?.comment;
          if (headerCommit === null && comment && /^[0-9a-f]{40}$/.test(comment)) {
            headerCommit = comment;
          }
        },
        filter: (entryPath, entry) => {
          const type = "type" in entry ? entry.type : "File";
          if (type !== "File" && type !== "Directory") return false;

          const size = "size" in entry ? Number(entry.size ?? 0) : 0;
          if (size > MAX_EXTRACTED_FILE_BYTES) return false;

          const segments = entryPath.split("/");
          return !segments.includes("node_modules") && !segments.includes(".git");
        },
      }),
    );
  } catch (error) {
    if (error instanceof PipelineError) throw error;

    throw new PipelineError("The repository archive could not be unpacked");
  }

  let commitSha = options.commitSha ?? headerCommit;

  if (!commitSha && topLevelDirectory) {
    const match = /-([0-9a-f]{40})$/.exec(topLevelDirectory);
    commitSha = match ? match[1] : null;
  }

  return { commitSha };
}