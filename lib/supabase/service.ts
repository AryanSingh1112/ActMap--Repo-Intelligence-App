import "server-only";

import { createClient } from "@supabase/supabase-js";

/**
 * Server-only client for the analysis worker.
 *
 * It uses the Supabase secret key, which BYPASSES row-level security, so:
 *  - it must never be imported into client code (server-only enforces that),
 *  - every query made with it must carry an organization_id that came from a
 *    verified Clerk session, never from the request body.
 *
 * Reads for people always go through createSupabaseServerClient (RLS).
 */
export function createSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY. Add it to .env.local (server only, no NEXT_PUBLIC_ prefix).",
    );
  }

  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}