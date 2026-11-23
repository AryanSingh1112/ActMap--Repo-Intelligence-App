"use client";

import { useNow } from "../../lib/hooks/use-now";

function format(value: string, now: number) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "—";

  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (seconds < 45) return "just now";
  if (seconds < 3600) return `${Math.max(1, Math.round(seconds / 60))}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;

  return new Date(value).toLocaleDateString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Relative time, computed in the browser so server and client never disagree. */
export function TimeAgo({ value }: { value: string | null }) {
  const now = useNow();

  if (!value) return <span>—</span>;

  return (
    <time dateTime={value} title={new Date(value).toLocaleString()}>
      {now === null ? " " : format(value, now)}
    </time>
  );
}
