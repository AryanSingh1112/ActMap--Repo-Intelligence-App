"use client";

import { useCallback, useMemo, useState } from "react";

import DetailPanel from "./detail/DetailPanel";
import { ExplainProvider } from "./detail/explain-context";
import GraphCanvas from "./graph/GraphCanvas";
import RoutesTable from "./routes/RoutesTable";
import CategorySidebar from "./sidebar/CategorySidebar";
import Resizer from "./sidebar/Resizer";

import { NO_FOCUS, buildEdgeShapes, type FocusState } from "../../lib/actmap/edges";
import { foldRepository } from "../../lib/actmap/fold";
import { getBlastRadius, getDependencyChain } from "../../lib/actmap/graph";
import { getRepositoryInsights } from "../../lib/actmap/insights";
import { METRICS, computeLayout, type RowPlan } from "../../lib/actmap/layout";
import { buildModel } from "../../lib/actmap/model";
import { useRoleLabelling } from "../../lib/hooks/use-role-labelling";

import type {
  AiStatus,
  AnalysisMode,
  DetailTab,
  RepositoryData,
  RepositoryFile,
  MapTab,
} from "../../types/actmap";

const DEFAULT_DEPTH = 2;

const LEFT = { initial: 212, min: 180, max: 360 };
const RIGHT = { initial: 440, min: 320, max: 680 };

export default function Explorer({
  data,
  analysisId,
  ai,
}: {
  data: RepositoryData;
  analysisId: string;
  ai: AiStatus;
}) {
  const model = useMemo(
    () => buildModel(data.files, data.edges, data.adapter),
    [data.files, data.edges, data.adapter],
  );

  const filePaths = useMemo(() => new Set(data.files.map((file) => file.path)), [data.files]);

  const unlabelled = model.categories.find((category) => category.name === "Unclassified")?.count ?? 0;

  const labelling = useRoleLabelling({
    analysisId,
    needed: unlabelled > 0 && !data.rolesLabelled,
    enabled: ai.configured,
  });

  const folding = useMemo(
    () => foldRepository(model.files, model.edges),
    [model],
  );

  const nodeById = useMemo(
    () => new Map(folding.nodes.map((node) => [node.id, node])),
    [folding],
  );

  const insights = useMemo(
    () => getRepositoryInsights({ files: model.files, edges: model.edges }),
    [model],
  );

  // "importer|imported" -> how many file imports cross between the two nodes.
  const nodeEdges = useMemo(() => {
    const counts = new Map<string, number>();

    for (const edge of model.edges) {
      const from = folding.nodeOf.get(edge.sourceFile);
      const to = folding.nodeOf.get(edge.targetFile);
      if (!from || !to || from === to) continue;

      const key = `${from}|${to}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return counts;
  }, [model.edges, folding]);

  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const [newlyOpened, setNewlyOpened] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mapTab, setMapTab] = useState<MapTab>("map");
  const [hoverFile, setHoverFile] = useState<string | null>(null);
  const [tab, setTab] = useState<DetailTab>("structure");
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>(null);
  const [analysisDepth, setAnalysisDepth] = useState(DEFAULT_DEPTH);
  const [leftWidth, setLeftWidth] = useState<number>(LEFT.initial);
  const [rightWidth, setRightWidth] = useState<number>(RIGHT.initial);

  const selectedFile = selectedFilePath
    ? (model.fileMap.get(selectedFilePath) ?? null)
    : null;

  const selectedNode = selectedNodeId ? (nodeById.get(selectedNodeId) ?? null) : null;

  // Blast radius and dependency chain are one walk over the edge list with a
  // direction and a depth. Nothing here touches the network.
  const analysisResults = useMemo(() => {
    if (!selectedFilePath || !analysisMode) return [];

    const walk = analysisMode === "blast-radius" ? getBlastRadius : getDependencyChain;
    return walk(selectedFilePath, model.edges, analysisDepth);
  }, [selectedFilePath, analysisMode, analysisDepth, model.edges]);

  // The rows an open panel shows. When there are more files than rows, the
  // busiest ones are kept, and a selected file is never the one left out.
  const rowFiles = useMemo(() => {
    const result = new Map<string, RepositoryFile[]>();
    const limit = METRICS.maxVisibleRows;

    for (const id of open) {
      const node = nodeById.get(id);
      if (!node) continue;

      if (node.files.length <= limit) {
        result.set(id, node.files);
        continue;
      }

      const ranked = [...node.files].sort(
        (a, b) => b.fanIn + b.fanOut - (a.fanIn + a.fanOut) || a.path.localeCompare(b.path),
      );

      let chosen = ranked.slice(0, limit);

      if (selectedFilePath && !chosen.some((file) => file.path === selectedFilePath)) {
        const selected = node.files.find((file) => file.path === selectedFilePath);
        if (selected) chosen = [...chosen.slice(0, limit - 1), selected];
      }

      result.set(
        id,
        chosen.sort((a, b) => a.path.localeCompare(b.path)),
      );
    }

    return result;
  }, [open, nodeById, selectedFilePath]);

  const rowPlans = useMemo(() => {
    const plans = new Map<string, RowPlan>();

    for (const [id, rows] of rowFiles) {
      plans.set(id, {
        rows: rows.length,
        hidden: (nodeById.get(id)?.files.length ?? rows.length) - rows.length,
      });
    }

    return plans;
  }, [rowFiles, nodeById]);

  const hiddenCounts = useMemo(
    () => new Map([...rowPlans].map(([id, plan]) => [id, plan.hidden])),
    [rowPlans],
  );

  const layout = useMemo(
    () =>
      computeLayout({
        nodes: folding.nodes,
        nodeEdges,
        open,
        rowPlans,
      }),
    [folding.nodes, nodeEdges, open, rowPlans],
  );

  const focus = useMemo<FocusState>(() => {
    if (selectedFilePath) {
      return {
        file: selectedFilePath,
        node: null,
        mode: analysisMode,
        closure: analysisMode
          ? new Set([selectedFilePath, ...analysisResults.map((result) => result.path)])
          : null,
      };
    }

    if (selectedNodeId) {
      return { file: null, node: selectedNodeId, mode: null, closure: null };
    }

    return NO_FOCUS;
  }, [selectedFilePath, selectedNodeId, analysisMode, analysisResults]);

  // The files kept at full strength, and the nodes that hold them. Selecting a
  // file keeps it, what it imports, and what imports it; everything else dims.
  const { focusFiles, focusNodes } = useMemo(() => {
    if (selectedFilePath) {
      const files =
        focus.closure ??
        new Set<string>([
          selectedFilePath,
          ...(model.imports.get(selectedFilePath) ?? []),
          ...(model.importedBy.get(selectedFilePath) ?? []),
        ]);

      const nodes = new Set<string>();
      for (const path of files) {
        const id = folding.nodeOf.get(path);
        if (id) nodes.add(id);
      }

      return { focusFiles: files, focusNodes: nodes };
    }

    if (selectedNodeId) {
      const nodes = new Set<string>([selectedNodeId]);

      for (const key of nodeEdges.keys()) {
        const [from, to] = key.split("|");
        if (from === selectedNodeId) nodes.add(to);
        if (to === selectedNodeId) nodes.add(from);
      }

      return { focusFiles: null, focusNodes: nodes };
    }

    return { focusFiles: null, focusNodes: null };
  }, [selectedFilePath, selectedNodeId, focus.closure, model, folding.nodeOf, nodeEdges]);

  const edgeShapes = useMemo(() => {
    const rows = new Map<string, string[]>();
    const hidden = new Map<string, number>();

    for (const [id, files] of rowFiles) {
      rows.set(
        id,
        files.map((file) => file.path),
      );
      hidden.set(id, rowPlans.get(id)?.hidden ?? 0);
    }

    return buildEdgeShapes({
      edges: model.edges,
      nodeOf: folding.nodeOf,
      layout,
      rows,
      hidden,
      focus,
    });
  }, [model.edges, folding.nodeOf, layout, rowFiles, rowPlans, focus]);

  const openKey = useMemo(() => [...open].sort().join("|"), [open]);

  const selectFile = useCallback(
    (path: string) => {
      const nodeId = folding.nodeOf.get(path);
      if (!nodeId) return;

      setSelectedFilePath(path);
      setSelectedNodeId(nodeId);

      if (!open.has(nodeId)) {
        setOpen(new Set(open).add(nodeId));
        setNewlyOpened([nodeId]);
      }
    },
    [folding.nodeOf, open],
  );

  const toggleNode = useCallback(
    (id: string) => {
      const next = new Set(open);

      if (next.has(id)) {
        next.delete(id);
        setNewlyOpened([]);
      } else {
        next.add(id);
        setNewlyOpened([id]);
      }

      setOpen(next);
      setSelectedNodeId(id);
      setSelectedFilePath(null);
    },
    [open],
  );

  const clearSelection = useCallback(() => {
    setSelectedFilePath(null);
    setSelectedNodeId(null);
  }, []);

  const matchingCount = activeCategory
    ? (model.categories.find((category) => category.name === activeCategory)?.count ?? 0)
    : model.files.length;

  return (
    <ExplainProvider analysisId={analysisId} ai={ai} files={filePaths}>
    <div
      className="grid min-h-0 flex-1 overflow-hidden"
      style={{
        gridTemplateColumns: `${leftWidth}px 9px minmax(0, 1fr) 9px ${rightWidth}px`,
        gridTemplateRows: "minmax(0, 1fr)",
      }}
    >
      <CategorySidebar
        categories={model.categories}
        totalFiles={model.files.length}
        activeCategory={activeCategory}
        labelling={labelling === "running" ? `Labelling ${unlabelled} files…` : labelling === "failed" ? "Could not label files" : null}
        onSelect={setActiveCategory}
      />

      <Resizer
        side="left"
        width={leftWidth}
        minWidth={LEFT.min}
        maxWidth={LEFT.max}
        onResize={setLeftWidth}
      />

      <section className="relative flex min-w-0 flex-col overflow-hidden">
        <nav className="ui-scale flex shrink-0 items-center gap-6 border-b border-line px-6" aria-label="View">
          {(
            [
              { id: "map", label: "Map", count: null },
              { id: "routes", label: "Routes", count: data.routes.length },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={mapTab === item.id}
              onClick={() => setMapTab(item.id)}
              className={`-mb-px border-b-2 py-3 text-[17px] transition-colors ${
                mapTab === item.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {item.label}
              {item.count !== null && <span className="ml-2 text-muted">{item.count}</span>}
            </button>
          ))}
        </nav>

        {mapTab === "routes" ? (
          <div className="min-h-0 flex-1">
            <RoutesTable
              routes={data.routes}
              selectedFile={selectedFilePath}
              onSelectFile={selectFile}
            />
          </div>
        ) : (
        <div className="relative min-h-0 flex-1">
        <GraphCanvas
          nodes={folding.nodes}
          layout={layout}
          edges={edgeShapes}
          rowFiles={rowFiles}
          hiddenCounts={hiddenCounts}
          openKey={openKey}
          newlyOpened={newlyOpened}
          selectedNode={selectedNodeId}
          selectedFile={selectedFilePath}
          hoverFile={hoverFile}
          focusNodes={focusNodes}
          focusFiles={focusFiles}
          activeCategory={activeCategory}
          analysisMode={analysisMode}
          onToggleNode={toggleNode}
          onSelectFile={selectFile}
          onHoverFile={setHoverFile}
          onClearSelection={clearSelection}
        />

        {activeCategory && (
          <div className="pointer-events-none absolute bottom-16 left-5 rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] text-muted shadow">
            <span className="font-mono text-foreground">{activeCategory}</span> ·{" "}
            {matchingCount.toLocaleString()} matching files
          </div>
        )}
        </div>
        )}
      </section>

      <Resizer
        side="right"
        width={rightWidth}
        minWidth={RIGHT.min}
        maxWidth={RIGHT.max}
        onResize={setRightWidth}
      />

      <DetailPanel
        data={data}
        model={model}
        tab={tab}
        analysisId={analysisId}
        selectedFile={selectedFile}
        selectedNode={selectedNode}
        insights={insights}
        activeCategory={activeCategory}
        analysisMode={analysisMode}
        analysisDepth={analysisDepth}
        analysisResults={analysisResults}
        hoverFile={hoverFile}
        onTabChange={setTab}
        onAnalysisModeChange={setAnalysisMode}
        onAnalysisDepthChange={setAnalysisDepth}
        onHover={setHoverFile}
        onSelectFile={selectFile}
      />
    </div>
    </ExplainProvider>
  );
}
