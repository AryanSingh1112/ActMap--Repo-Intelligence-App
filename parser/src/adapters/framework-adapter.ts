import type { ExtractedRoute, FileNode } from "../types";

/** One package.json found in the repository. */
export interface PackageInfo {
  /** Repository-relative directory, "" for the root. */
  directory: string;
  dependencies: ReadonlySet<string>;
}

/** What an adapter is told when it is asked "is this your kind of codebase?" */
export interface DetectionContext {
  files: readonly FileNode[];
  packages: readonly PackageInfo[];
  /** Dependencies of the root package.json only. */
  rootDependencies: ReadonlySet<string>;
  /** Dependencies of every package.json, including nested ones. */
  allDependencies: ReadonlySet<string>;
}

/** Facts read from a file's syntax while its imports were being read. */
export interface FileFacts {
  /** Prologue directives, e.g. "use server". */
  directives: readonly string[];
}

export type RoleClassifier = (file: FileNode, facts: FileFacts) => string;

export interface RouteContext extends DetectionContext {
  rootPath: string;
  /** The role each file was given, by path. */
  roles: ReadonlyMap<string, string>;
  read(path: string): Promise<string>;
}

/**
 * A framework adapter turns what the parser knows about a repository into the
 * conventions of one framework: which role each file plays, and which routes
 * it declares. Everything framework-specific lives here and nowhere in the
 * parser core.
 */
export interface FrameworkAdapter {
  /** Matches the key in taxonomy/categories.ts. */
  readonly id: string;
  readonly version: string;

  detect(context: DetectionContext): boolean;

  /** Builds the function that gives every file its role. */
  classifier(context: DetectionContext): RoleClassifier;

  /**
   * Routes this framework declares. An adapter returns a route only when both
   * the method and the full pattern are read from the syntax; anything that
   * would need inference is left out. Absent means "none can be recovered".
   */
  extractRoutes?(context: RouteContext): Promise<ExtractedRoute[]>;
}