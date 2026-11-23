"use client";

import AnalysisResults from "./AnalysisResults";
import ExplanationPanel from "./ExplanationPanel";
import DetailTabs from "../shared/DetailTabs";
import PathButton from "../shared/PathButton";

import { getExtensionColor } from "../../../lib/actmap/colors";
import { categoryOf, edgeKey, type RepositoryModel } from "../../../lib/actmap/model";
import { taxonomyFor } from "../../../parser/taxonomy/categories";

import type {
  AnalysisMode,
  DetailTab,
  RepositoryFile,
  WalkResult,
} from "../../../types/actmap";

type FileDetailsProps = {
  file: RepositoryFile;
  model: RepositoryModel;
  adapter: string;
  tab: DetailTab;
  analysisMode: AnalysisMode;
  analysisDepth: number;
  analysisResults: WalkResult[];
  hoverFile: string | null;
  onTabChange: (tab: DetailTab) => void;
  onAnalysisModeChange: (mode: AnalysisMode) => void;
  onAnalysisDepthChange: (depth: number) => void;
  onHover: (path: string | null) => void;
  onSelectFile: (path: string) => void;
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5 text-[15px]">
      <dt className="text-muted">{label}</dt>
      <dd className="min-w-0 break-words text-foreground">{children}</dd>
    </div>
  );
}

function RelationList({
  title,
  badge,
  badgeTone,
  paths,
  empty,
  tagFor,
  model,
  hoverFile,
  onHover,
  onSelectFile,
}: {
  title: string;
  badge: string;
  badgeTone: string;
  paths: string[];
  empty: string;
  tagFor: (path: string) => string | null;
  model: RepositoryModel;
  hoverFile: string | null;
  onHover: (path: string | null) => void;
  onSelectFile: (path: string) => void;
}) {
  return (
    <section className="mt-6 border-t border-line pt-5">
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="text-[16px] text-foreground">{title}</h3>
        <span className={`font-mono text-[15px] tabular-nums ${badgeTone}`}>{badge}</span>
      </div>

      {paths.length === 0 ? (
        <p className="text-[14px] text-muted">{empty}</p>
      ) : (
        <div className="-mx-2 space-y-0.5">
          {paths.map((path) => (
            <PathButton
              key={path}
              path={path}
              dotColor={getExtensionColor(model.fileMap.get(path)?.extension ?? "")}
              tag={tagFor(path)}
              hovered={hoverFile === path}
              onSelect={onSelectFile}
              onHover={onHover}
            />
          ))}
        </div>
      )}
    </section>
  );
}

const ANALYSIS_BUTTONS: { mode: Exclude<AnalysisMode, null>; label: string }[] = [
  { mode: "blast-radius", label: "Blast radius" },
  { mode: "dependency-chain", label: "Dependency chain" },
];

/** Re-exports and dynamic imports are worth flagging; plain imports are not. */
function kindTag(kinds: string[] | undefined) {
  if (!kinds || kinds.length === 0) return null;
  if (kinds.includes("static")) return null;
  return kinds[0] === "re-export" ? "re-export" : kinds[0];
}

export default function FileDetails({
  file,
  model,
  adapter,
  tab,
  analysisMode,
  analysisDepth,
  analysisResults,
  hoverFile,
  onTabChange,
  onAnalysisModeChange,
  onAnalysisDepthChange,
  onHover,
  onSelectFile,
}: FileDetailsProps) {
  const slash = file.path.lastIndexOf("/");
  const folder = slash === -1 ? "" : file.path.slice(0, slash + 1);

  const imports = model.imports.get(file.path) ?? [];
  const importedBy = model.importedBy.get(file.path) ?? [];
  const role = categoryOf(file);
  const reachedBy = taxonomyFor(adapter).reachedBy[role];

  return (
    <div className="px-6 pb-8 pt-6">
      <p className="text-[14px] text-muted">file</p>

      <h2 className="mt-1 break-all font-mono text-[19px] leading-7">
        <span className="text-muted">{folder}</span>
        <span className="font-semibold text-foreground">{file.name}</span>
      </h2>

      <DetailTabs tab={tab} onChange={onTabChange} />

      {tab === "explanation" ? (
        <ExplanationPanel
          entryKey={`file:${file.path}`}
          body={{ kind: "file", path: file.path }}
          stalePaths={[file.path]}
          subject="file"
          onSelectFile={onSelectFile}
          onHover={onHover}
        />
      ) : (
        <>
          <dl className="mt-4">
            <Row label="Kind">
              <span className="inline-flex items-center gap-2.5 font-mono">
                <span
                  className="h-3 w-3 rounded-[3px]"
                  style={{ backgroundColor: getExtensionColor(file.extension) }}
                />
                {file.extension || "other"}
              </span>
            </Row>

            <Row label="Role">
              {role}
              {file.roleSource === "model" && <span className="ml-2 text-muted">labelled by a model</span>}
            </Row>

            <Row label="Folder">
              <span className="font-mono">
                {file.folderPath === "." ? "root" : file.folderPath}
              </span>
            </Row>

            <Row label="Length">{file.lineCount.toLocaleString()} lines</Row>

            <Row label="Depends on">
              <span className="text-warn">{imports.length}</span>{" "}
              {imports.length === 1 ? "file" : "files"}
            </Row>

            <Row label="Depended on by">
              <span className="text-good">{importedBy.length}</span>{" "}
              {importedBy.length === 1 ? "file" : "files"}
            </Row>

            {reachedBy && importedBy.length === 0 && (
              <Row label="Reached by">{reachedBy}</Row>
            )}
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {ANALYSIS_BUTTONS.map(({ mode, label }) => {
              const active = analysisMode === mode;

              return (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onAnalysisModeChange(active ? null : mode)}
                  className={`rounded-lg border px-4 py-2 text-[15px] transition-colors ${
                    active
                      ? "border-accent bg-surface-2 text-foreground"
                      : "border-line text-muted hover:border-subtle hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {analysisMode && (
            <AnalysisResults
              mode={analysisMode}
              results={analysisResults}
              depth={analysisDepth}
              fileMap={model.fileMap}
              hoverFile={hoverFile}
              onDepthChange={onAnalysisDepthChange}
              onHover={onHover}
              onSelectFile={onSelectFile}
            />
          )}

          <RelationList
            title="Imports"
            badge={`${imports.length}→`}
            badgeTone="text-warn"
            paths={imports}
            empty="No imports"
            tagFor={(path) => kindTag(model.edgeMap.get(edgeKey(file.path, path))?.kinds)}
            model={model}
            hoverFile={hoverFile}
            onHover={onHover}
            onSelectFile={onSelectFile}
          />

          <RelationList
            title="Imported by"
            badge={`←${importedBy.length}`}
            badgeTone="text-good"
            paths={importedBy}
            empty="Nothing imports this file"
            tagFor={(path) => kindTag(model.edgeMap.get(edgeKey(path, file.path))?.kinds)}
            model={model}
            hoverFile={hoverFile}
            onHover={onHover}
            onSelectFile={onSelectFile}
          />
        </>
      )}
    </div>
  );
}
