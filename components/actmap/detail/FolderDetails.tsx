"use client";

import { useMemo } from "react";

import DetailTabs from "../shared/DetailTabs";
import ExplanationPanel from "./ExplanationPanel";
import PathButton from "../shared/PathButton";

import { getExtensionColor } from "../../../lib/actmap/colors";
import type { FoldedNode } from "../../../lib/actmap/fold";

import type { DetailTab } from "../../../types/actmap";

type FolderDetailsProps = {
  node: FoldedNode;
  tab: DetailTab;
  activeCategory: string | null;
  hoverFile: string | null;
  onTabChange: (tab: DetailTab) => void;
  onHover: (path: string | null) => void;
  onSelectFile: (path: string) => void;
};

const FILE_LIMIT = 40;

export default function FolderDetails({
  node,
  tab,
  activeCategory,
  hoverFile,
  onTabChange,
  onHover,
  onSelectFile,
}: FolderDetailsProps) {
  const { composition, files, lines } = useMemo(() => {
    const counts = new Map<string, number>();
    let total = 0;

    for (const file of node.files) {
      const extension = file.extension || "other";
      counts.set(extension, (counts.get(extension) ?? 0) + 1);
      total += file.lineCount;
    }

    return {
      composition: [...counts.entries()].sort(
        (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
      ),
      files: [...node.files].sort(
        (a, b) => b.fanIn - a.fanIn || a.path.localeCompare(b.path),
      ),
      lines: total,
    };
  }, [node.files]);

  const matching = activeCategory
    ? node.files.filter((file) => (file.extension || "other") === activeCategory).length
    : null;

  const widest = composition[0]?.[1] ?? 1;

  return (
    <div className="px-6 pb-8 pt-6">
      <p className="text-[14px] text-muted">folder</p>

      <h2 className="mt-1 break-all font-mono text-[19px] font-semibold leading-7 text-foreground">
        {node.path === "." ? "(repository root)" : node.path}
      </h2>

      <DetailTabs tab={tab} onChange={onTabChange} />

      {tab === "explanation" ? (
        <ExplanationPanel
          entryKey={`folder:${node.id}`}
          body={{ kind: "folder", folder: node.path, paths: node.files.map((file) => file.path) }}
          stalePaths={node.files.map((file) => file.path)}
          subject="folder"
          onSelectFile={onSelectFile}
          onHover={(path) => onHover(path)}
        />
      ) : (
        <>
          <dl className="mt-4 text-[15px]">
            <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5">
              <dt className="text-muted">Files</dt>
              <dd className="font-mono tabular-nums text-foreground">
                {node.files.length.toLocaleString()}
                {matching !== null && (
                  <span className="ml-2 text-muted">({matching} match)</span>
                )}
              </dd>
            </div>

            <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5">
              <dt className="text-muted">Lines</dt>
              <dd className="font-mono tabular-nums text-foreground">
                {lines.toLocaleString()}
              </dd>
            </div>

            <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5">
              <dt className="text-muted">Imported from</dt>
              <dd className="text-foreground">
                <span className="font-mono tabular-nums text-good">←{node.fanIn}</span>{" "}
                <span className="text-muted">outside this folder</span>
              </dd>
            </div>

            <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5">
              <dt className="text-muted">Imports</dt>
              <dd className="text-foreground">
                <span className="font-mono tabular-nums text-warn">{node.fanOut}→</span>{" "}
                <span className="text-muted">outside this folder</span>
              </dd>
            </div>
          </dl>

          <section className="mt-6 border-t border-line pt-5">
            <h3 className="mb-3 text-[16px] text-foreground">What is inside</h3>

            <ul className="space-y-2.5">
              {composition.map(([extension, count]) => (
                <li key={extension} className="flex items-center gap-3 text-[15px]">
                  <span
                    className="h-3 w-3 shrink-0 rounded-[3px]"
                    style={{
                      backgroundColor: getExtensionColor(extension === "other" ? "" : extension),
                    }}
                  />
                  <span className="w-20 shrink-0 font-mono text-foreground">{extension}</span>

                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="block h-full rounded-full bg-subtle"
                      style={{ width: `${Math.max(6, (count / widest) * 100)}%` }}
                    />
                  </span>

                  <span className="w-10 text-right font-mono tabular-nums text-muted">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 border-t border-line pt-5">
            <div className="mb-2 flex items-baseline justify-between">
              <h3 className="text-[16px] text-foreground">Files</h3>
              <span className="text-[14px] text-muted">most depended on first</span>
            </div>

            <div className="-mx-2 space-y-0.5">
              {files.slice(0, FILE_LIMIT).map((file) => (
                <PathButton
                  key={file.path}
                  path={file.name}
                  dotColor={getExtensionColor(file.extension)}
                  hovered={hoverFile === file.path}
                  onSelect={() => onSelectFile(file.path)}
                  onHover={(value) => onHover(value === null ? null : file.path)}
                  trailing={
                    <span className="shrink-0 font-mono text-[13px] tabular-nums text-muted">
                      <span className="text-good">←{file.fanIn}</span>{" "}
                      <span className="text-warn">{file.fanOut}→</span>
                    </span>
                  }
                />
              ))}
            </div>

            {files.length > FILE_LIMIT && (
              <p className="mt-2 text-[14px] text-muted">
                {files.length - FILE_LIMIT} more not listed
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
