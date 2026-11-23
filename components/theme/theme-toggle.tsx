"use client";

import { useTheme, type Theme } from "./theme-provider";

const themes: { label: string; value: Theme }[] = [
  { label: "system", value: "system" },
  { label: "light", value: "light" },
  { label: "dark", value: "dark" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center rounded-lg border border-line bg-surface p-0.5 text-sm"
    >
      {themes.map((item) => {
        const active = theme === item.value;

        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(item.value)}
            className={`rounded-md px-3 py-1.5 transition-colors ${
              active
                ? "bg-surface-2 text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
