// Browser-safe. No imports.

/**
 * The only roles a model may give a file.
 *
 * Page, route and controller are deliberately absent. Those roles decide the
 * route table and which files are drawn as entry points, and convention owns
 * them: a model that guessed wrong would put a fake route on the screen.
 */
export const CLASSIFIER_ROLES = [
  "service",
  "repository",
  "model",
  "util",
  "config",
  "component",
  "hook",
] as const;

export type ClassifierRole = (typeof CLASSIFIER_ROLES)[number];

/** What the classifier may answer when none of the roles fits. Nothing is stored. */
export const NO_ROLE = "other";

/** Roles that are structural. Listed so a test can prove they never leak through. */
export const STRUCTURAL_ROLES = ["page", "route", "controller", "layout", "middleware"] as const;

/** The name the explorer's rail uses for each role. */
export const ROLE_LABEL: Record<ClassifierRole, string> = {
  service: "Services",
  repository: "Repositories",
  model: "Models",
  util: "Utilities",
  config: "Config files",
  component: "Components",
  hook: "Hooks",
};

const ROLE_BY_LABEL = new Map<string, ClassifierRole>(
  (Object.entries(ROLE_LABEL) as [ClassifierRole, string][]).map(([role, label]) => [label, role]),
);

export function isClassifierRole(value: unknown): value is ClassifierRole {
  return typeof value === "string" && (CLASSIFIER_ROLES as readonly string[]).includes(value);
}

/** The classifier role a rail category stands for, or null if the category is structural. */
export function roleOfLabel(label: string | null | undefined): ClassifierRole | null {
  return (label && ROLE_BY_LABEL.get(label)) || null;
}
