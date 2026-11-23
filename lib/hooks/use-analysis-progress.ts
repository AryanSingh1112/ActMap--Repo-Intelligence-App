"use client";

import { useEffect, useRef } from "react";

import { useSupabaseBrowserClient } from "../supabase/browser";
import type { ProgressEvent } from "../pipeline/stages";

type RowState = ProgressEvent & { updated_at?: string | null };

/**
 * Live progress for each given analysis.
 *
 * The fast path is the private channel: a database trigger pushes every change
 * the moment it is written. Because a socket can fail to open (a missing
 * channel policy, a dropped connection, a sleeping laptop), the same row is also
 * read every couple of seconds while the run is unfinished, so the page keeps
 * moving either way. A finished run stops being read.
 */
const FALLBACK_INTERVAL_MS = 1000;
const TERMINAL = new Set(["complete", "failed", "cancelled"]);

export function useAnalysisProgress(
  analysisIds: string[],
  onEvent: (analysisId: string, event: RowState) => void,
) {
  const supabase = useSupabaseBrowserClient();
  const handler = useRef(onEvent);
  const key = analysisIds.join("|");

  useEffect(() => {
    handler.current = onEvent;
  });

  useEffect(() => {
    if (!supabase || !key) return;

    const ids = key.split("|");
    let cancelled = false;
    const channels: ReturnType<typeof supabase.channel>[] = [];

    async function connect() {
      if (!supabase) return;

      await supabase.realtime.setAuth();
      if (cancelled) return;

      for (const id of ids) {
        const channel = supabase
          .channel(`analysis:${id}`, { config: { private: true } })
          .on("broadcast", { event: "progress" }, (message) => {
            handler.current(id, message.payload as RowState);
          })
          .subscribe(async (status) => {
            if (status !== "SUBSCRIBED" || cancelled) return;

            await readRow(id);
          });

        channels.push(channel);
      }
    }

    async function readRow(id: string) {
      if (!supabase) return null;

      const { data } = await supabase
        .from("analyses")
        .select("status, stage, stage_message, error_message, failed_stage, updated_at")
        .eq("id", id)
        .maybeSingle();

      if (!data || cancelled) return null;

      handler.current(id, {
        status: data.status,
        stage: data.stage,
        message: data.error_message ?? data.stage_message,
        failed_stage: data.failed_stage,
        updated_at: data.updated_at,
      });

      return data.status as string;
    }

    const waiting = new Set(ids);
    let reading = false;

    const poll = setInterval(async () => {
      if (reading || cancelled || waiting.size === 0) return;
      reading = true;

      try {
        for (const id of [...waiting]) {
          const status = await readRow(id);
          if (status && TERMINAL.has(status)) waiting.delete(id);
        }
      } catch {
        // A failed read is retried on the next tick.
      } finally {
        reading = false;
      }
    }, FALLBACK_INTERVAL_MS);

    void connect();

    return () => {
      cancelled = true;
      clearInterval(poll);
      for (const channel of channels) {
        void supabase.removeChannel(channel);
      }
    };
  }, [supabase, key]);
}
