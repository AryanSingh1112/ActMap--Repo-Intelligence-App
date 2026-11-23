"use client";

import type { RepositoryRoute } from "../../../types/actmap";

type RoutesTableProps = {
  routes: RepositoryRoute[];
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
};

const METHOD_STYLE: Record<string, string> = {
  GET: "text-good",
  POST: "text-warn",
  PUT: "text-warn",
  PATCH: "text-warn",
  DELETE: "text-bad",
};

/**
 * Every route the parser could read exactly: the method and the full pattern
 * both written in the code. A route that would need guessing is not listed, so
 * an empty table means "none could be recovered", never "none exist".
 */
export default function RoutesTable({ routes, selectedFile, onSelectFile }: RoutesTableProps) {
  return (
    <div className="ui-scale quiet-scroll h-full overflow-y-auto">
      <p className="px-6 py-4 text-[15px] text-muted">
        Listed only where the method and the full path are both written in the code.
      </p>

      {routes.length === 0 ? (
        <div className="border-t border-line px-6 py-10">
          <p className="text-[16px] text-foreground">No routes were extracted.</p>
          <p className="mt-2 max-w-md text-[14.5px] leading-6 text-muted">
            This framework declares its routes in a way that can&apos;t be read without
            guessing, or the repository has none. Nothing is shown rather than something wrong.
          </p>
        </div>
      ) : (
        <table className="w-full table-fixed border-t border-line text-left text-[15px]">
          <thead>
            <tr className="text-muted">
              <th className="w-[110px] px-6 py-3 font-normal">Method</th>
              <th className="w-[38%] px-3 py-3 font-normal">Pattern</th>
              <th className="px-3 py-3 font-normal">Declared in</th>
            </tr>
          </thead>

          <tbody>
            {routes.map((route) => {
              const active = selectedFile === route.file;

              return (
                <tr
                  key={route.id}
                  onClick={() => onSelectFile(route.file)}
                  className={`cursor-pointer border-t border-line transition-colors ${
                    active ? "bg-surface-2 shadow-[inset_3px_0_0_var(--accent)]" : "hover:bg-surface"
                  }`}
                >
                  <td className={`px-6 py-3 font-mono ${METHOD_STYLE[route.method] ?? "text-foreground"}`}>
                    {route.method}
                  </td>
                  <td className="truncate px-3 py-3 font-mono text-foreground" title={route.pattern}>
                    {route.pattern}
                  </td>
                  <td className="truncate px-3 py-3 font-mono text-muted" title={`${route.file}:${route.line}`}>
                    {route.file}:{route.line}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
