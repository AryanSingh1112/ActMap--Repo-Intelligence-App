import { flushTraces } from "../../../../../lib/ai/client";
import { handle } from "../../../../../lib/ai/request";
import { labelUnclassified } from "../../../../../lib/ai/service";

export const maxDuration = 300;

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  return handle(params, async (ctx) => {
    const result = await labelUnclassified(ctx);
    await flushTraces();
    return result;
  });
}
