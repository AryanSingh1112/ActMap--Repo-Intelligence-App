export type RepositoryFile = {
  id: string;
  path: string;
  name: string;
  extension: string;
  folderPath: string;
  language?: string;
  kind?: string;
  /** The category the detected framework puts this file in. Absent for older analyses. */
  role?: string;
  /** "model" when no adapter could identify the file and a model labelled it. */
  roleSource?: "model";
  lineCount: number;
  fanIn: number;
  fanOut: number;
};

export type RepositoryEdge = {
  sourceFile: string;
  targetFile: string;
  occurrenceCount: number;
  /** static, re-export or dynamic. Re-exports and dynamic imports are tagged in the pane. */
  kinds: string[];
};

export type CoverageSummary = {
  total: number;
  resolved: number;
  external: number;
  excluded: number;
  unresolved: number;
  unresolvedByReason: Record<string, number>;
  examples: {
    sourceFile: string;
    specifier: string;
    line: number;
    reason: string;
    message: string | null;
  }[];
};

/** A route read exactly from the code: both its method and its full pattern. */
export type RepositoryRoute = {
  id: string;
  method: string;
  pattern: string;
  file: string;
  line: number;
};

/** Everything the explorer needs, read from stored rows. */
export type RepositoryData = {
  name: string;
  commitSha: string | null;
  adapter: string;
  /** Why the framework was chosen. Absent for analyses made before detection was recorded. */
  detection: { confidence: string; evidence: string[] } | null;
  files: RepositoryFile[];
  edges: RepositoryEdge[];
  coverage: CoverageSummary | null;
  routes: RepositoryRoute[];
  /** Whether the model has already been asked to label the unidentified files. */
  rolesLabelled: boolean;
};

export type AiStatus = {
  configured: boolean;
  model: string;
  tracing: { enabled: boolean; project: string; reason: string | null };
};

export type ExplanationResult = {
  text: string;
  cached: boolean;
  model: string;
  promptVersion: string;
  createdAt: string;
  allowedPaths: string[];
  invented: string[];
};

export type Staleness = {
  status: "fresh" | "moved" | "stale" | "unknown";
  analysedSha: string | null;
  headSha: string | null;
  changed: string[];
  deleted: string[];
  partial: boolean;
  reason?: string;
};

export type ExplanationEntry =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; result: ExplanationResult; staleness: Staleness | "checking" };

export type MapTab = "map" | "routes";

export type DetailTab = "structure" | "explanation";

export type ResizeSide = "left" | "right";

export type WalkDirection = "incoming" | "outgoing";

export type AnalysisMode = "blast-radius" | "dependency-chain" | null;

export type WalkResult = {
  path: string;
  depth: number;
};

export type Insight = {
  id: string;
  title: string;
  description: string;
  paths: string[];
};
