import { NO_ROLE, isClassifierRole, type ClassifierRole } from "./roles";

/** Reads the classifier's JSON, keeping only paths it was given and roles it may use. */
export function parseRoles(
  text: string,
  given: Set<string>,
): Map<string, ClassifierRole> {
  const roles = new Map<string, ClassifierRole>();

  try {
    const parsed = JSON.parse(text) as {
      roles?: { path?: unknown; role?: unknown }[];
    };

    for (const item of parsed.roles ?? []) {
      if (typeof item.path !== "string" || !given.has(item.path)) continue;
      if (item.role === NO_ROLE || !isClassifierRole(item.role)) continue;

      roles.set(item.path, item.role);
    }
  } catch {
    // An answer that is not valid JSON labels nothing.
  }

  return roles;
}