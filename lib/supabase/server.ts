import "server-only";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { env } from "../env";

export async function createSupabaseServerClient() {
  const { userId, orgId, getToken } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated: a signed-in user is required.");
  }

  if (!orgId) {
    throw new Error("No active organization selected.");
  }

  return createClient(
    env.supabaseUrl,
    env.supabasePublishableKey,
    {
      accessToken: async () => {
        const token = await getToken();

        if (!token) {
          throw new Error("Unable to retrieve the Clerk session token.");
        }

        return token;
      },
    }
  );
}