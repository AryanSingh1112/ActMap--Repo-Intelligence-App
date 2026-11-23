"use client";

import FileDetails from "./FileDetails";
import FolderDetails from "./FolderDetails";
import InsightsPanel from "./InsightsPanel";
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

export default function DetailPanel({
  data,
  model,
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
  return (
    <aside className="ui-scale-pane quiet-scroll min-h-0 min-w-0 overflow-y-auto border-l border-line bg-background">
      {selectedFile ? (
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
      ) : selectedNode ? (
        <FolderDetails
          node={selectedNode}
          tab={tab}
          activeCategory={activeCategory}
          hoverFile={hoverFile}
          onTabChange={onTabChange}
          onHover={onHover}
          onSelectFile={onSelectFile}
        />
      ) : (
        <RepositoryOverview
          data={data}
          model={model}
          hoverFile={hoverFile}
          onHover={onHover}
          onSelectFile={onSelectFile}
        />
      )}

      <InsightsPanel
        insights={insights}
        fileMap={model.fileMap}
        hoverFile={hoverFile}
        onHover={onHover}
        onSelect={onSelectFile}
      />
    </aside>
  );
}
