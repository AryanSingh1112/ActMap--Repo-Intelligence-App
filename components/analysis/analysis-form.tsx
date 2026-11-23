"use client";

import { useActionState } from "react";

import { analyseRepository, type SubmitState } from "../../app/(workspace)/actions";

export function AnalysisForm() {
  const [state, action, pending] = useActionState<SubmitState, FormData>(
    analyseRepository,
    undefined,
  );

  return (
    <form action={action} className="flex min-w-0 flex-1 items-center gap-3">
      <div className="relative min-w-0 max-w-xl flex-1">
        <input
          name="url"
          type="text"
          required
          spellCheck={false}
          autoComplete="off"
          disabled={pending}
          placeholder="https://github.com/owner/repo"
          aria-label="Public GitHub repository URL"
          aria-invalid={state?.error ? true : undefined}
          className="w-full rounded-lg border border-line bg-background px-4 py-2.5 font-mono text-sm text-foreground outline-none placeholder:text-subtle focus:border-accent disabled:opacity-60"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Starting…" : "Analyse"}
      </button>

      {state?.error && (
        <p role="alert" className="hidden text-sm text-bad lg:block">
          {state.error}
        </p>
      )}
    </form>
  );
}
