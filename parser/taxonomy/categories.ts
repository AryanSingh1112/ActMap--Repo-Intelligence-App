/**
 * The names the left rail shows, per framework.
 *
 * This file is imported by browser components, so it imports nothing: no
 * parser, no TypeScript compiler, no filesystem. Adapters read the same names
 * from here when they assign a role, so the rail and the roles cannot drift.
 *
 * Order is reading order and it never changes: routable surfaces first, then
 * the layers behind them, then plumbing. A category with no files is still
 * listed, in the same place, so a repository always looks the same.
 */

export const UNCLASSIFIED = "Unclassified";

export interface FrameworkTaxonomy {
  /** The adapter id this list belongs to. */
  id: string;
  /** How the framework is named in the interface. */
  label: string;
  categories: readonly string[];
  /** How a file in a category is reached when nothing imports it. */
  reachedBy: Readonly<Record<string, string>>;
}

export const GENERIC_ROLES = {
  source: "Source",
  typeDeclarations: "Type declarations",
  configuration: "Configuration",
  documentation: "Documentation",
  tests: "Tests",
} as const;

const GENERIC: FrameworkTaxonomy = {
  id: "generic",
  label: "None detected",
  categories: [
    GENERIC_ROLES.source,
    GENERIC_ROLES.typeDeclarations,
    GENERIC_ROLES.configuration,
    GENERIC_ROLES.documentation,
    GENERIC_ROLES.tests,
    UNCLASSIFIED,
  ],
  reachedBy: {},
};

const NEXT: FrameworkTaxonomy = {
  id: "nextjs",
  label: "Next.js",
  categories: [
    "Page routes",
    "API endpoints",
    "Server actions",
    "Layouts",
    "Loading & error UI",
    "Components",
    "Hooks",
    "Middleware",
    "Metadata files",
    "Instrumentation",
    "Config files",
    "Tests",
    UNCLASSIFIED,
  ],
  reachedBy: {
    "Page routes": "Next.js page route",
    "API endpoints": "Next.js route handler",
    "Layouts": "Next.js layout",
    "Loading & error UI": "Next.js special file",
    "Middleware": "Next.js middleware",
    "Metadata files": "Next.js metadata file",
    "Instrumentation": "Next.js instrumentation hook",
  },
};

const NEST: FrameworkTaxonomy = {
  id: "nestjs",
  label: "NestJS",
  categories: [
    "Controllers",
    "Resolvers",
    "Gateways",
    "Services",
    "Repositories",
    "Modules",
    "Entities",
    "DTOs",
    "Guards",
    "Interceptors",
    "Pipes",
    "Filters",
    "Middleware",
    "Decorators",
    "Bootstrap",
    "Config files",
    "Tests",
    UNCLASSIFIED,
  ],
  reachedBy: {
    Controllers: "NestJS controller",
    Bootstrap: "Node entry point",
  },
};

const REACT: FrameworkTaxonomy = {
  id: "react",
  label: "React",
  categories: [
    "Pages",
    "Components",
    "Hooks",
    "Contexts",
    "State",
    "Services",
    "Utilities",
    "Config files",
    "Tests",
    UNCLASSIFIED,
  ],
  reachedBy: {},
};

const EXPRESS: FrameworkTaxonomy = {
  id: "express",
  label: "Express",
  categories: [
    "Routes",
    "Controllers",
    "Middleware",
    "Services",
    "Models",
    "Validations",
    "Utilities",
    "App setup",
    "Config files",
    "Tests",
    UNCLASSIFIED,
  ],
  reachedBy: {
    "App setup": "Node entry point",
  },
};

export const TAXONOMIES: Readonly<Record<string, FrameworkTaxonomy>> = {
  generic: GENERIC,
  nextjs: NEXT,
  nestjs: NEST,
  react: REACT,
  express: EXPRESS,
};

/** The list for an adapter id. An id nobody has heard of gets the generic list. */
export function taxonomyFor(adapterId: string | null | undefined): FrameworkTaxonomy {
  return (adapterId && TAXONOMIES[adapterId]) || GENERIC;
}

export function frameworkLabel(adapterId: string | null | undefined): string {
  return taxonomyFor(adapterId).label;
}

/** The generic role for a file, from the kind the walker gave it. */
export function genericRoleOfKind(kind: string | undefined): string {
  switch (kind) {
    case "source":
      return GENERIC_ROLES.source;
    case "type-declaration":
      return GENERIC_ROLES.typeDeclarations;
    case "configuration":
      return GENERIC_ROLES.configuration;
    case "documentation":
      return GENERIC_ROLES.documentation;
    case "test":
      return GENERIC_ROLES.tests;
    default:
      return UNCLASSIFIED;
  }
}