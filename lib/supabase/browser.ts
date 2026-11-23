"use client";

import { useMemo } from "react";
import { useSession } from "@clerk/nextjs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client, signed in as the current Clerk user.
 *
 * Row-level security and the private Realtime channel policy both read the
 * org_id claim from the Clerk token, so the token is fetched fresh on every
 * request through `accessToken` rather than stored.
 *
 * Returns null until Clerk has loaded and a session exists. The progress hook
 * already handles null by doing nothing.
 *
 * NOTE: the two env vars are read with literal names on purpose. Next.js only
 * inlines NEXT_PUBLIC_* values into browser code when they are written out in
 * full, so the dynamic lookup used in lib/env.ts would be undefined here.
 */
export function useSupabaseBrowserClient(): SupabaseClient | null {
  const { session, isLoaded } = useSession();
  const sessionId = session?.id ?? null;

  return useMemo(() => {
    if (!isLoaded || !session) return null;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      console.error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
      );
      return null;
    }

    return createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      accessToken: async () => (await session.getToken()) ?? null,
    });
    // Rebuild only when the Clerk session itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, sessionId]);
}