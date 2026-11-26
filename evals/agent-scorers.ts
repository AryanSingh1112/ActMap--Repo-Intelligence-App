/**
 * Deterministic checks on one agent reply. No model judges anything here:
 * each is a regular expression or a set lookup, so the same reply always
 * scores the same.
 */
export type Turn = { text: string; toolCalls: string[] };

/** Words that show the agent talking about its own plumbing instead of the repository. */
const PLUMBING = [
  /\b(analysis_summary|search_files|list_files_by_role|file_neighbours|walk_graph|list_routes)\b/i,
  /\b(my|your|the signed|this|a short-lived|an analysis-scoped)\s+(credential|token)s?\b/i,
  /\bI (am|was|have been) (given|using|issued)\b/i,
  /\bthread(s|_id)?\b/i,
  /\blanggraph\b|\blangsmith\b|\bdeep ?agents?\b/i,
  /\bsystem prompt\b|\bmy instructions\b/i,
  /\bbearer\b|\bauthorization header\b/i,
  /\b(gemini|gpt|openai|llm|language model)\b/i,
  /\btool(s| call)?\b/i,
];

const HEDGES = [/\bprobably\b/i, /\blikely\b/i, /\btypically\b/i, /\bmight be\b/i, /\bI (think|guess|assume)\b/i, /\bpresumably\b/i, /\busually\b/i];

export function lookedUp(turn: Turn): number {
  return turn.toolCalls.length > 0 ? 1 : 0;
}

export function plumbingLeaks(turn: Turn): string[] {
  // Paths and identifiers in inline code are about the repository (a repo can have a token.service.js).
  const prose = turn.text.replace(/`[^`]*`/g, " ");
  return PLUMBING.flatMap((pattern) => prose.match(pattern)?.[0] ?? []);
}

export function noPlumbingLeak(turn: Turn): number {
  return plumbingLeaks(turn).length === 0 ? 1 : 0;
}

export function hedges(turn: Turn): string[] {
  return HEDGES.flatMap((pattern) => turn.text.match(pattern)?.[0] ?? []);
}

/** Hedging about the repository is only a problem when nothing was looked up, or at all: the prompt forbids it. */
export function noHedging(turn: Turn): number {
  return hedges(turn).length === 0 ? 1 : 0;
}

/** Inline-code spans that look like a repository path. */
export function writtenPaths(text: string): string[] {
  return [...text.matchAll(/`([^`\s]+)`/g)].map((m) => m[1]).filter((s) => /\/|\.[a-z]{1,5}$/i.test(s));
}

/** Every path the reply wrote must be a real file, or a route pattern the repository defines. */
export function invented(turn: Turn, files: { has(path: string): boolean }, routes: string[] = []): string[] {
  return writtenPaths(turn.text).filter((p) => !files.has(p) && !routes.some((r) => r === p || r.includes(p)));
}

export function noInventedPaths(turn: Turn, files: { has(path: string): boolean }, routes: string[] = []): number {
  return invented(turn, files, routes).length === 0 ? 1 : 0;
}

/** Heuristic, not a judgement of quality: a decline says it cannot, in a short reply, and offers something. */
export function declinedBriefly(turn: Turn): number {
  const says = /\b(can't|cannot|can not|unable|not able|don't|do not|only answer|only help)\b/i.test(turn.text);
  return says && turn.text.length < 900 ? 1 : 0;
}
