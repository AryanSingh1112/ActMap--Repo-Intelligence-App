"use client";

import { useState } from "react";

import FileDetails from "./FileDetails";
import FolderDetails from "./FolderDetails";
import InsightsPanel from "./InsightsPanel";
import RepositoryAsk from "./RepositoryAsk";
import RepositoryOverview from "./RepositoryOverview";

import type { FoldedNode } from "../../../lib/actmap/fold";
import type { RepositoryModel } from "../../../lib/actmap/model";

import type {
  AnalysisMode,
  DetailTab,
  Insight,
  RepositoryData,
  RepositoryFile,
  WalkResult,
} from "../../../types/actmap";

type DetailPanelProps = {
  data: RepositoryData;
  model: RepositoryModel;
  analysisId: string;

  tab: DetailTab;
  selectedFile: RepositoryFile | null;
  selectedNode: FoldedNode | null;

  insights: Insight[];
  activeCategory: string | null;

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

type PaneMode = "overview" | "ask";

export default function DetailPanel({
  data,
  model,
  analysisId,
  tab,
  selectedFile,
  selectedNode,
  insights,
  activeCategory,
  analysisMode,
  analysisDepth,
  analysisResults,
  hoverFile,
  onTabChange,
  onAnalysisModeChange,
  onAnalysisDepthChange,
  onHover,
  onSelectFile,
}: DetailPanelProps) {
  const [mode, setMode] = useState<PaneMode>("overview");

  function renderOverview() {
    if (selectedFile) {
      return (
        <FileDetails
          file={selectedFile}
          model={model}
          adapter={data.adapter}
          tab={tab}
          analysisMode={analysisMode}
          analysisDepth={analysisDepth}
          analysisResults={analysisResults}
          hoverFile={hoverFile}
          onTabChange={onTabChange}
          onAnalysisModeChange={onAnalysisModeChange}
          onAnalysisDepthChange={onAnalysisDepthChange}
          onHover={onHover}
          onSelectFile={onSelectFile}
        />
      );
    }

    if (selectedNode) {
      return (
        <FolderDetails
          node={selectedNode}
          tab={tab}
          activeCategory={activeCategory}
          hoverFile={hoverFile}
          onTabChange={onTabChange}
          onHover={onHover}
          onSelectFile={onSelectFile}
        />
      );
    }

    return (
      <RepositoryOverview
        data={data}
        model={model}
        hoverFile={hoverFile}
        onHover={onHover}
        onSelectFile={onSelectFile}
      />
    );
  }

  return (
    <aside className="ui-scale-pane flex min-h-0 min-w-0 flex-col overflow-hidden border-l border-line bg-background">
      <div className="flex shrink-0 border-b border-line">
        <button
          type="button"
          onClick={() => setMode("overview")}
          className={`relative flex-1 px-4 py-3 text-[13px] font-medium transition-colors ${
            mode === "overview"
              ? "text-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          Overview

          {mode === "overview" && (
            <span className="absolute inset-x-0 bottom-0 h-px bg-accent" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setMode("ask")}
          className={`relative flex-1 px-4 py-3 text-[13px] font-medium transition-colors ${
            mode === "ask"
              ? "text-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          Ask

          {mode === "ask" && (
            <span className="absolute inset-x-0 bottom-0 h-px bg-accent" />
          )}
        </button>
      </div>

      {mode === "ask" ? (
        <RepositoryAsk
          analysisId={analysisId}
          selectedFile={selectedFile?.path ?? null}
        />
      ) : (
        <div className="quiet-scroll min-h-0 flex-1 overflow-y-auto">
          {renderOverview()}

          <InsightsPanel
            insights={insights}
            fileMap={model.fileMap}
            hoverFile={hoverFile}
            onHover={onHover}
            onSelect={onSelectFile}
          />
        </div>
      )}
    </aside>
  );
}