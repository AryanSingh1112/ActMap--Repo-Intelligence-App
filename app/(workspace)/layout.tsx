import type { ReactNode } from "react";

import { AppHeader } from "../../components/layout/app-header";

export default function WorkspaceLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <AppHeader />

      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
