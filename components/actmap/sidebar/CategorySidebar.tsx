"use client";

import type { Category } from "../../../lib/actmap/model";

type CategorySidebarProps = {
  categories: Category[];
  totalFiles: number;
  activeCategory: string | null;
  /** Shown under the list while a model labels the files nothing else could. */
  labelling?: string | null;
  onSelect: (category: string | null) => void;
};

/**
 * The framework's categories, in the order the framework defines. Categories
 * with no files stay in place, dimmed, so the list never reshuffles.
 */
export default function CategorySidebar({
  categories,
  totalFiles,
  activeCategory,
  labelling,
  onSelect,
}: CategorySidebarProps) {
  return (
    <aside className="ui-scale quiet-scroll min-w-0 overflow-y-auto border-r border-line py-5">
      <p className="px-6 pb-3 text-[16px] text-muted">
        Categories · {totalFiles.toLocaleString()} files
      </p>

      <div>
        {categories.map((category) => {
          const active = activeCategory === category.name;
          const empty = category.count === 0;

          return (
            <button
              key={category.name}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(active ? null : category.name)}
              className={`flex w-full items-center justify-between px-6 py-[9px] text-left text-[18px] transition-colors ${
                active
                  ? "bg-accent/15 text-foreground shadow-[inset_3px_0_0_var(--accent)]"
                  : "hover:bg-surface"
              } ${empty && !active ? "text-muted" : "text-foreground"}`}
            >
              <span className="truncate">{category.name}</span>
              <span className="ml-3 tabular-nums text-muted">{category.count.toLocaleString()}</span>
            </button>
          );
        })}
      </div>

      {labelling && <p className="animate-pulse px-6 pt-4 text-[14px] text-muted">{labelling}</p>}
    </aside>
  );
}
