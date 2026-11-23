
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "system" | "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
const listeners = new Set<() => void>();

function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

function getThemeSnapshot(): Theme {
  try {
    const saved = localStorage.getItem("actmap-theme");
    return isTheme(saved) ? saved : "system";
  } catch {
    return "system";
  }
}

function getServerSnapshot(): Theme {
  return "system";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const resolved =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;

      root.dataset.theme = resolved;
      root.style.colorScheme = resolved;
    };

    applyTheme();

    if (theme === "system") {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  function setTheme(nextTheme: Theme) {
    try {
      localStorage.setItem("actmap-theme", nextTheme);
    } finally {
      listeners.forEach((listener) => listener());
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
