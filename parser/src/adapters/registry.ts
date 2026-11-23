import { expressAdapter } from "./express";
import { genericFramework } from "./generic";
import { nestjsAdapter } from "./nestjs";
import { nextjsAdapter } from "./nextjs";
import { reactAdapter } from "./react";

import type { DetectionContext, FrameworkAdapter } from "./framework-adapter";

/**
 * Detection runs in this order and the first match wins. NestJS sits ahead of
 * Express because it runs on it, and Next.js sits ahead of React because it is
 * built on it. A repository that matches nothing is still mapped, as generic.
 */
export const FRAMEWORK_ADAPTERS: readonly FrameworkAdapter[] = [
  nextjsAdapter,
  nestjsAdapter,
  expressAdapter,
  reactAdapter,
];

export function detectFramework(context: DetectionContext): FrameworkAdapter {
  // The root package.json says what the repository is. Nested ones are only
  // consulted when the root says nothing.
  const rootOnly: DetectionContext = { ...context, allDependencies: context.rootDependencies };

  for (const adapter of FRAMEWORK_ADAPTERS) {
    if (adapter.detect(rootOnly)) return adapter;
  }

  for (const adapter of FRAMEWORK_ADAPTERS) {
    if (adapter.detect(context)) return adapter;
  }

  return genericFramework;
}