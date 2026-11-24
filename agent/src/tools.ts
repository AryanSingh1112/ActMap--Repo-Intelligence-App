
import { tool } from "@langchain/core/tools";
import { z } from "zod";

import type { RunnableConfig } from "@langchain/core/runnables";

function base(): string {
  return (process.env.ACTMAP_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

// The credential arrives in the run configuration, never in the prompt or tool arguments.
async function lookup(
  name: string,
  input: unknown,
  config?: RunnableConfig,
): Promise<string> {
  const credential = config?.configurable?.actmapCredential;

  if (typeof credential !== "string" || !credential) {
    return "This lookup is unavailable right now.";
  }

  try {
    const response = await fetch(`${base()}/api/agent/tools/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credential}`,
      },
      body: JSON.stringify(input ?? {}),
      signal: AbortSignal.timeout(25_000),
    });

    const responseText = await response.text();

    return response.ok
      ? responseText
      : `The lookup failed (${response.status}): ${responseText.slice(0, 300)}`;
  } catch {
    return "The lookup failed: the repository could not be reached.";
  }
}

export const analysisSummary = tool(
  (_input: Record<string, never>, config) =>
    lookup("summary", {}, config),
  {
    name: "analysis_summary",
    description:
      "Summary of the analysed repository: framework, file and import counts, categories, most depended-on files and entry points.",
    schema: z.object({}),
  },
);

export const searchFiles = tool(
  (input: { query: string }, config) =>
    lookup("search", input, config),
  {
    name: "search_files",
    description:
      "Find files whose path contains the given text. Returns matching paths, roles and sizes. Does not return source code.",
    schema: z.object({
      query: z.string().min(1).describe("Part of a file path"),
    }),
  },
);

export const listFilesByRole = tool(
  (input: { role: string }, config) =>
    lookup("by-role", input, config),
  {
    name: "list_files_by_role",
    description:
      "List files belonging to a repository category such as Services, Middleware, Components or Tests.",
    schema: z.object({
      role: z.string().min(1).describe("A repository category name"),
    }),
  },
);

export const fileNeighbours = tool(
  (input: { path: string }, config) =>
    lookup("neighbours", input, config),
  {
    name: "file_neighbours",
    description:
      "Return the files directly imported by a file and the files that directly import it. Requires an exact file path.",
    schema: z.object({
      path: z.string().min(1).describe("An exact file path"),
    }),
  },
);

export const walkGraph = tool(
  (
    input: {
      path: string;
      direction: "incoming" | "outgoing";
      max_depth?: number;
    },
    config,
  ) => lookup("walk", input, config),
  {
    name: "walk_graph",
    description:
      "Walk the import graph. Incoming follows files that import the starting file. Outgoing follows its dependencies. Results include depth.",
    schema: z.object({
      path: z.string().min(1).describe("An exact file path"),
      direction: z.enum(["incoming", "outgoing"]),
      max_depth: z.number().int().min(1).max(5).optional(),
    }),
  },
);

export const listRoutes = tool(
  (input: { contains?: string }, config) =>
    lookup("routes", input, config),
  {
    name: "list_routes",
    description:
      "Return HTTP routes with their methods, patterns and defining files. Can optionally filter by route pattern.",
    schema: z.object({
      contains: z.string().optional(),
    }),
  },
);

export const getFileSource = tool(
  (input: { paths: string[] }, config) =>
    lookup("source", input, config),
  {
    name: "get_file_source",
    description:
      "Retrieve the actual source code of selected repository files. Use exact paths returned by search_files or another repository lookup. Use this when explaining implementation, authentication flows, or what code does. Request only relevant files, up to 8 per call.",
    schema: z.object({
      paths: z
        .array(z.string().min(1))
        .min(1)
        .max(8)
        .describe("Exact repository file paths to retrieve"),
    }),
  },
);

export const TOOLS = [
  analysisSummary,
  searchFiles,
  listFilesByRole,
  fileNeighbours,
  walkGraph,
  listRoutes,
  getFileSource,
];
