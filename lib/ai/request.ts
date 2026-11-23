import "server-only";

import { auth } from "@clerk/nextjs/server";

import { createSupabaseServerClient } from "../supabase/server";

import { HttpError, type Ctx } from "./service";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Every AI route starts here. The organization comes from the verified
 * session, never from the request, and reads go through the signed-in client,
 * so row-level security decides what this person can see.
 */
export async function handle(
  params: Promise<{ id: string }>,
  work: (ctx: Ctx) => Promise<unknown>,
): Promise<Response> {
  try {
    const { id } = await params;
    if (!UUID.test(id)) throw new HttpError(404, "Not found.");

    const { userId, orgId } = await auth();
    if (!userId) throw new HttpError(401, "Sign in first.");
    if (!orgId) throw new HttpError(400, "Pick an organization first.");

    const supabase = await createSupabaseServerClient();
    return Response.json(await work({ supabase, organizationId: orgId, analysisId: id }));
  } catch (error) {
    if (error instanceof HttpError) return Response.json({ error: error.message }, { status: error.status });

    console.error("[ai]", error);
    const message = error instanceof Error ? error.message : "Something went wrong.";
    return Response.json({ error: message.slice(0, 300) }, { status: 500 });
  }
}
