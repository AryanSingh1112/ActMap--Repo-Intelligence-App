
import { verifyCredential } from "../../../../../lib/agent/credential";
import { loadForCredential } from "../../../../../lib/agent/load";
import { getFileContent } from "../../../../../lib/agent/source";
import {
  TOOL_NAMES,
  runTool,
  type ToolName,
} from "../../../../../lib/agent/tools";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tool: string }> },
) {
  const { tool } = await params;

  const isSourceTool = tool === "source";
  const isStructuralTool = (TOOL_NAMES as readonly string[]).includes(tool);

  if (!isSourceTool && !isStructuralTool) {
    return new Response("Unknown lookup.", { status: 404 });
  }

  let credential;

  try {
    credential = verifyCredential(
      request.headers
        .get("authorization")
        ?.replace(/^Bearer\s+/i, ""),
    );
  } catch (error) {
    console.error(
      "[agent tools]",
      error instanceof Error ? error.message : error,
    );

    return new Response("Lookups are not configured.", {
      status: 503,
    });
  }

  if (!credential) {
    return new Response("This credential is invalid or has expired.", {
      status: 401,
    });
  }

  const body: unknown = await request.json().catch(() => null);

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return new Response("Invalid request body.", { status: 400 });
  }

  const input = body as Record<string, unknown>;
  let sourcePaths: string[] | null = null;

  if (isSourceTool) {
    const paths = input.paths;

    if (
      !Array.isArray(paths) ||
      paths.length === 0 ||
      paths.length > 8 ||
      !paths.every(
        (path): path is string =>
          typeof path === "string" && path.trim().length > 0,
      )
    ) {
      return new Response(
        "paths must contain between 1 and 8 valid file paths.",
        { status: 400 },
      );
    }

    sourcePaths = paths;
  }

  try {
    const data = await loadForCredential(credential);

    if (!data) {
      return new Response("That analysis is not available.", {
        status: 404,
      });
    }

    if (sourcePaths) {
      const files = await getFileContent(credential, sourcePaths);

      console.log("[agent source]", {
        analysis: data.name,
        requested: sourcePaths.length,
        returned: files.length,
        paths: files.map((file) => file.path),
      });

      return Response.json({
        total: files.length,
        files,
      });
    }

    const result = runTool(tool as ToolName, input, data);

    if (result.ok === true) {
      return Response.json(result.body);
    }

    return new Response(result.message, {
      status: result.status,
    });
  } catch (error) {
    console.error("[agent tools]", error);

    return new Response("The lookup failed.", {
      status: 500,
    });
  }
}
