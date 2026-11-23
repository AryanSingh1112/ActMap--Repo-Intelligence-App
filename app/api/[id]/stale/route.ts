import { handle } from "../../../../../lib/ai/request";
import { HttpError, checkStaleness } from "../../../../../lib/ai/service";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const body = (await request.json().catch(() => ({}))) as { paths?: unknown };

  return handle(params, async (ctx) => {
    if (!Array.isArray(body.paths) || !body.paths.every((p) => typeof p === "string")) {
      throw new HttpError(400, "Send the paths to check.");
    }

    return checkStaleness(ctx, body.paths as string[]);
  });
}
