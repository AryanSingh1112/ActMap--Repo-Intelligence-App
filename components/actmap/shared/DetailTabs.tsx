"use client";

import type { DetailTab } from "../../../types/actmap";

const TABS: { id: DetailTab; label: string }[] = [
  { id: "structure", label: "Structure" },
  { id: "explanation", label: "Explanation" },
];

export default function DetailTabs({
  tab,
  onChange,
}: {
  tab: DetailTab;
  onChange: (tab: DetailTab) => void;
}) {
  return (
    <div role="tablist" className="mt-5 flex gap-6 border-b border-line">
      {TABS.map(({ id, label }) => {
        const active = tab === id;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            className={`-mb-px border-b-2 pb-2.5 text-[15px] transition-colors ${
              active
                ? "border-accent text-foreground"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function ExplanationEmpty() {
  return (
    <div className="flex min-h-48 items-center justify-center px-6 text-center">
      <p className="max-w-64 text-[14px] leading-6 text-muted">
        Explanations arrive in a later phase. Nothing on this screen calls a model.
      </p>
    </div>
  );
}
