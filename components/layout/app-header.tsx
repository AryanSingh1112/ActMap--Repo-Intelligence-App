"use client";

import Link from "next/link";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import { ThemeToggle } from "../theme/theme-toggle";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
      <div className="flex items-center gap-4">
        <Link
          href="/workspace"
          className="font-mono text-lg font-semibold tracking-tight text-foreground"
        >
          actmap
        </Link>

        <span className="text-subtle">/</span>

        <OrganizationSwitcher
          hidePersonal
          afterSelectOrganizationUrl="/workspace"
          afterCreateOrganizationUrl="/workspace"
          appearance={{
            elements: {
              organizationSwitcherTrigger:
                "rounded-md px-2 py-1.5 text-foreground hover:bg-surface-2",
              organizationPreviewMainIdentifier: "text-base text-foreground",
            },
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
}
