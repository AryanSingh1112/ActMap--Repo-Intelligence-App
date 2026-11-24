import { flushTraces } from "../../../../lib/ai/client";
import { handle } from "../../../../lib/ai/request";
import { HttpError, explainFile, explainFolder } from "../../../../lib/ai/service";

export const maxDuration = 120;

type Body = { kind?: string; path?: unknown; folder?: unknown; paths?: unknown };

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = (await request.json().catch(() => ({}))) as Body;

  return handle(params, async (ctx) => {
    let result;

    if (body.kind === "file" && typeof body.path === "string") {
      result = await explainFile(ctx, body.path);
    } else if (
      body.kind === "folder" &&
      typeof body.folder === "string" &&
      Array.isArray(body.paths) &&
      body.paths.every((p) => typeof p === "string")
    ) {
      result = await explainFolder(ctx, body.folder, body.paths as string[]);
    } else {
      throw new HttpError(400, "Send a file path, or a folder and its file paths.");
    }

    await flushTraces();
    return result;
  });
}
