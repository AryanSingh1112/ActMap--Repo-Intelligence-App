export const extensionColors: Record<string, string> = {
  ".ts": "#a78bfa",
  ".tsx": "#e879f9",
  ".js": "#fb7185",
  ".jsx": "#fb923c",
  ".mjs": "#a1a1aa",
  ".mts": "#a1a1aa",
  ".cts": "#a1a1aa",
  ".cjs": "#a1a1aa",
  ".css": "#60a5fa",
  ".scss": "#f472b6",
  ".json": "#fbbf24",
  ".md": "#a1a1aa",
  ".mdx": "#a1a1aa",
  ".html": "#fb923c",
  ".yml": "#2dd4bf",
  ".yaml": "#2dd4bf",
  ".svg": "#34d399",
  ".py": "#38bdf8",
  ".sql": "#f59e0b",
};

export function getExtensionColor(extension: string): string {
  return extensionColors[extension] || "#a1a1aa";
}
