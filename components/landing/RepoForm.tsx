"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function normalise(input: string): string | null {
  const value = input.trim();
  const match =
    value.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?\/?$/i) ??
    value.match(/^([\w.-]+)\/([\w.-]+)$/);
  return match ? `https://github.com/${match[1]}/${match[2]}` : null;
}

export default function RepoForm() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const url = normalise(value);
    if (!url) {
      setError("Enter a GitHub repository, like github.com/owner/repo.");
      return;
    }
    // Sign in first, then land in the workspace with the repository in the URL.
    const after = `/workspace?repo=${encodeURIComponent(url)}`;
    router.push(`/sign-in?redirect_url=${encodeURIComponent(after)}`);
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-[36rem]" noValidate>
      <div className="flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 pl-5 shadow-[0_8px_40px_-12px] shadow-accent/30 transition-colors focus-within:border-accent">
        <label htmlFor="repo" className="sr-only">
          GitHub repository URL
        </label>
        <input
          id="repo"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          placeholder="github.com/owner/repo"
          autoComplete="off"
          spellCheck={false}
          className="h-11 min-w-0 flex-1 bg-transparent font-mono text-[15px] text-foreground outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-full bg-accent px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Analyse
        </button>
      </div>
      <p role="status" className={`mt-3 text-center text-[14px] ${error ? "text-bad" : "text-muted"}`}>
        {error || "You’ll sign in first, then the analysis starts."}
      </p>
    </form>
  );
}