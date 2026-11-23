import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Usage } from "./client";

export type CacheKind = "file" | "folder" | "role";

export type CacheRow = {
  cache_key: string;
  kind: CacheKind;
  subject: string;
  model: string;
  prompt_version: string;
  content: string;
  allowed_paths: string[];
  usage: Usage | Record<string, never>;
  created_at: string;
};

export async function readCache(
  supabase: SupabaseClient,
  organizationId: string,
  key: string,
): Promise<CacheRow | null> {
  const { data, error } = await supabase
    .from("explanation_cache")
    .select("cache_key, kind, subject, model, prompt_version, content, allowed_paths, usage, created_at")
    .eq("organization_id", organizationId)
    .eq("cache_key", key)
    .maybeSingle();

  if (error) {
    // A cache that cannot be read is a miss, not a failure.
    console.warn("[ai] cache read failed:", error.message);
    return null;
  }

  return (data as CacheRow | null) ?? null;
}

export async function writeCache(
  supabase: SupabaseClient,
  organizationId: string,
  row: Omit<CacheRow, "created_at">,
): Promise<void> {
  const { error } = await supabase
    .from("explanation_cache")
    .upsert({ organization_id: organizationId, ...row }, { onConflict: "organization_id,cache_key" });

  if (error) console.warn("[ai] cache write failed:", error.message);
}
