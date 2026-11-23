(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(workspace)/data:28907d [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rerunAnalysis",
    ()=>$$RSC_SERVER_ACTION_1
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"404cac902b97e431ca4d1c0a87a41563cbaec50a1b":{"name":"rerunAnalysis"}},"app/(workspace)/actions.ts",""] */ "use turbopack: no side effects";
;
const $$RSC_SERVER_ACTION_1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("404cac902b97e431ca4d1c0a87a41563cbaec50a1b", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "rerunAnalysis");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/Explorer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Explorer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$DetailPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/detail/DetailPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$graph$2f$GraphCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/graph/GraphCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$routes$2f$RoutesTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/routes/RoutesTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$sidebar$2f$CategorySidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/sidebar/CategorySidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$sidebar$2f$Resizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/sidebar/Resizer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$edges$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/edges.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$fold$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/fold.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$graph$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/graph.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$insights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/insights.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/model.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const DEFAULT_DEPTH = 2;
const LEFT = {
    initial: 212,
    min: 180,
    max: 360
};
const RIGHT = {
    initial: 440,
    min: 320,
    max: 680
};
function Explorer({ data }) {
    _s();
    const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[model]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildModel"])(data.files, data.edges, data.adapter)
    }["Explorer.useMemo[model]"], [
        data.files,
        data.edges,
        data.adapter
    ]);
    const folding = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[folding]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$fold$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["foldRepository"])(model.files, model.edges)
    }["Explorer.useMemo[folding]"], [
        model
    ]);
    const nodeById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[nodeById]": ()=>new Map(folding.nodes.map({
                "Explorer.useMemo[nodeById]": (node)=>[
                        node.id,
                        node
                    ]
            }["Explorer.useMemo[nodeById]"]))
    }["Explorer.useMemo[nodeById]"], [
        folding
    ]);
    const insights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[insights]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$insights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRepositoryInsights"])({
                files: model.files,
                edges: model.edges
            })
    }["Explorer.useMemo[insights]"], [
        model
    ]);
    // "importer|imported" -> how many file imports cross between the two nodes.
    const nodeEdges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[nodeEdges]": ()=>{
            const counts = new Map();
            for (const edge of model.edges){
                const from = folding.nodeOf.get(edge.sourceFile);
                const to = folding.nodeOf.get(edge.targetFile);
                if (!from || !to || from === to) continue;
                const key = `${from}|${to}`;
                counts.set(key, (counts.get(key) ?? 0) + 1);
            }
            return counts;
        }
    }["Explorer.useMemo[nodeEdges]"], [
        model.edges,
        folding
    ]);
    const [selectedFilePath, setSelectedFilePath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedNodeId, setSelectedNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Explorer.useState": ()=>new Set()
    }["Explorer.useState"]);
    const [newlyOpened, setNewlyOpened] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mapTab, setMapTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("map");
    const [hoverFile, setHoverFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("structure");
    const [analysisMode, setAnalysisMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [analysisDepth, setAnalysisDepth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_DEPTH);
    const [leftWidth, setLeftWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(LEFT.initial);
    const [rightWidth, setRightWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(RIGHT.initial);
    const selectedFile = selectedFilePath ? model.fileMap.get(selectedFilePath) ?? null : null;
    const selectedNode = selectedNodeId ? nodeById.get(selectedNodeId) ?? null : null;
    // Blast radius and dependency chain are one walk over the edge list with a
    // direction and a depth. Nothing here touches the network.
    const analysisResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[analysisResults]": ()=>{
            if (!selectedFilePath || !analysisMode) return [];
            const walk = analysisMode === "blast-radius" ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$graph$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBlastRadius"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$graph$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDependencyChain"];
            return walk(selectedFilePath, model.edges, analysisDepth);
        }
    }["Explorer.useMemo[analysisResults]"], [
        selectedFilePath,
        analysisMode,
        analysisDepth,
        model.edges
    ]);
    // The rows an open panel shows. When there are more files than rows, the
    // busiest ones are kept, and a selected file is never the one left out.
    const rowFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[rowFiles]": ()=>{
            const result = new Map();
            const limit = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].maxVisibleRows;
            for (const id of open){
                const node = nodeById.get(id);
                if (!node) continue;
                if (node.files.length <= limit) {
                    result.set(id, node.files);
                    continue;
                }
                const ranked = [
                    ...node.files
                ].sort({
                    "Explorer.useMemo[rowFiles].ranked": (a, b)=>b.fanIn + b.fanOut - (a.fanIn + a.fanOut) || a.path.localeCompare(b.path)
                }["Explorer.useMemo[rowFiles].ranked"]);
                let chosen = ranked.slice(0, limit);
                if (selectedFilePath && !chosen.some({
                    "Explorer.useMemo[rowFiles]": (file)=>file.path === selectedFilePath
                }["Explorer.useMemo[rowFiles]"])) {
                    const selected = node.files.find({
                        "Explorer.useMemo[rowFiles].selected": (file)=>file.path === selectedFilePath
                    }["Explorer.useMemo[rowFiles].selected"]);
                    if (selected) chosen = [
                        ...chosen.slice(0, limit - 1),
                        selected
                    ];
                }
                result.set(id, chosen.sort({
                    "Explorer.useMemo[rowFiles]": (a, b)=>a.path.localeCompare(b.path)
                }["Explorer.useMemo[rowFiles]"]));
            }
            return result;
        }
    }["Explorer.useMemo[rowFiles]"], [
        open,
        nodeById,
        selectedFilePath
    ]);
    const rowPlans = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[rowPlans]": ()=>{
            const plans = new Map();
            for (const [id, rows] of rowFiles){
                plans.set(id, {
                    rows: rows.length,
                    hidden: (nodeById.get(id)?.files.length ?? rows.length) - rows.length
                });
            }
            return plans;
        }
    }["Explorer.useMemo[rowPlans]"], [
        rowFiles,
        nodeById
    ]);
    const hiddenCounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[hiddenCounts]": ()=>new Map([
                ...rowPlans
            ].map({
                "Explorer.useMemo[hiddenCounts]": ([id, plan])=>[
                        id,
                        plan.hidden
                    ]
            }["Explorer.useMemo[hiddenCounts]"]))
    }["Explorer.useMemo[hiddenCounts]"], [
        rowPlans
    ]);
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[layout]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeLayout"])({
                nodes: folding.nodes,
                nodeEdges,
                open,
                rowPlans
            })
    }["Explorer.useMemo[layout]"], [
        folding.nodes,
        nodeEdges,
        open,
        rowPlans
    ]);
    const focus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[focus]": ()=>{
            if (selectedFilePath) {
                return {
                    file: selectedFilePath,
                    node: null,
                    mode: analysisMode,
                    closure: analysisMode ? new Set([
                        selectedFilePath,
                        ...analysisResults.map({
                            "Explorer.useMemo[focus]": (result)=>result.path
                        }["Explorer.useMemo[focus]"])
                    ]) : null
                };
            }
            if (selectedNodeId) {
                return {
                    file: null,
                    node: selectedNodeId,
                    mode: null,
                    closure: null
                };
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$edges$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NO_FOCUS"];
        }
    }["Explorer.useMemo[focus]"], [
        selectedFilePath,
        selectedNodeId,
        analysisMode,
        analysisResults
    ]);
    // The files kept at full strength, and the nodes that hold them. Selecting a
    // file keeps it, what it imports, and what imports it; everything else dims.
    const { focusFiles, focusNodes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo": ()=>{
            if (selectedFilePath) {
                const files = focus.closure ?? new Set([
                    selectedFilePath,
                    ...model.imports.get(selectedFilePath) ?? [],
                    ...model.importedBy.get(selectedFilePath) ?? []
                ]);
                const nodes = new Set();
                for (const path of files){
                    const id = folding.nodeOf.get(path);
                    if (id) nodes.add(id);
                }
                return {
                    focusFiles: files,
                    focusNodes: nodes
                };
            }
            if (selectedNodeId) {
                const nodes = new Set([
                    selectedNodeId
                ]);
                for (const key of nodeEdges.keys()){
                    const [from, to] = key.split("|");
                    if (from === selectedNodeId) nodes.add(to);
                    if (to === selectedNodeId) nodes.add(from);
                }
                return {
                    focusFiles: null,
                    focusNodes: nodes
                };
            }
            return {
                focusFiles: null,
                focusNodes: null
            };
        }
    }["Explorer.useMemo"], [
        selectedFilePath,
        selectedNodeId,
        focus.closure,
        model,
        folding.nodeOf,
        nodeEdges
    ]);
    const edgeShapes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[edgeShapes]": ()=>{
            const rows = new Map();
            const hidden = new Map();
            for (const [id, files] of rowFiles){
                rows.set(id, files.map({
                    "Explorer.useMemo[edgeShapes]": (file)=>file.path
                }["Explorer.useMemo[edgeShapes]"]));
                hidden.set(id, rowPlans.get(id)?.hidden ?? 0);
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$edges$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildEdgeShapes"])({
                edges: model.edges,
                nodeOf: folding.nodeOf,
                layout,
                rows,
                hidden,
                focus
            });
        }
    }["Explorer.useMemo[edgeShapes]"], [
        model.edges,
        folding.nodeOf,
        layout,
        rowFiles,
        rowPlans,
        focus
    ]);
    const openKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Explorer.useMemo[openKey]": ()=>[
                ...open
            ].sort().join("|")
    }["Explorer.useMemo[openKey]"], [
        open
    ]);
    const selectFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Explorer.useCallback[selectFile]": (path)=>{
            const nodeId = folding.nodeOf.get(path);
            if (!nodeId) return;
            setSelectedFilePath(path);
            setSelectedNodeId(nodeId);
            if (!open.has(nodeId)) {
                setOpen(new Set(open).add(nodeId));
                setNewlyOpened([
                    nodeId
                ]);
            }
        }
    }["Explorer.useCallback[selectFile]"], [
        folding.nodeOf,
        open
    ]);
    const toggleNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Explorer.useCallback[toggleNode]": (id)=>{
            const next = new Set(open);
            if (next.has(id)) {
                next.delete(id);
                setNewlyOpened([]);
            } else {
                next.add(id);
                setNewlyOpened([
                    id
                ]);
            }
            setOpen(next);
            setSelectedNodeId(id);
            setSelectedFilePath(null);
        }
    }["Explorer.useCallback[toggleNode]"], [
        open
    ]);
    const clearSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Explorer.useCallback[clearSelection]": ()=>{
            setSelectedFilePath(null);
            setSelectedNodeId(null);
        }
    }["Explorer.useCallback[clearSelection]"], []);
    const matchingCount = activeCategory ? model.categories.find((category)=>category.name === activeCategory)?.count ?? 0 : model.files.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid min-h-0 flex-1 overflow-hidden",
        style: {
            gridTemplateColumns: `${leftWidth}px 9px minmax(0, 1fr) 9px ${rightWidth}px`,
            gridTemplateRows: "minmax(0, 1fr)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$sidebar$2f$CategorySidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                categories: model.categories,
                totalFiles: model.files.length,
                activeCategory: activeCategory,
                onSelect: setActiveCategory
            }, void 0, false, {
                fileName: "[project]/components/actmap/Explorer.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$sidebar$2f$Resizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                side: "left",
                width: leftWidth,
                minWidth: LEFT.min,
                maxWidth: LEFT.max,
                onResize: setLeftWidth
            }, void 0, false, {
                fileName: "[project]/components/actmap/Explorer.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative flex min-w-0 flex-col overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "ui-scale flex shrink-0 items-center gap-6 border-b border-line px-6",
                        "aria-label": "View",
                        children: [
                            {
                                id: "map",
                                label: "Map",
                                count: null
                            },
                            {
                                id: "routes",
                                label: "Routes",
                                count: data.routes.length
                            }
                        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": mapTab === item.id,
                                onClick: ()=>setMapTab(item.id),
                                className: `-mb-px border-b-2 py-3 text-[17px] transition-colors ${mapTab === item.id ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground"}`,
                                children: [
                                    item.label,
                                    item.count !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-muted",
                                        children: item.count
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/Explorer.tsx",
                                        lineNumber: 326,
                                        columnNumber: 39
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/components/actmap/Explorer.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/Explorer.tsx",
                        lineNumber: 307,
                        columnNumber: 9
                    }, this),
                    mapTab === "routes" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-0 flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$routes$2f$RoutesTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            routes: data.routes,
                            selectedFile: selectedFilePath,
                            onSelectFile: selectFile
                        }, void 0, false, {
                            fileName: "[project]/components/actmap/Explorer.tsx",
                            lineNumber: 333,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/Explorer.tsx",
                        lineNumber: 332,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative min-h-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$graph$2f$GraphCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                nodes: folding.nodes,
                                layout: layout,
                                edges: edgeShapes,
                                rowFiles: rowFiles,
                                hiddenCounts: hiddenCounts,
                                openKey: openKey,
                                newlyOpened: newlyOpened,
                                selectedNode: selectedNodeId,
                                selectedFile: selectedFilePath,
                                hoverFile: hoverFile,
                                focusNodes: focusNodes,
                                focusFiles: focusFiles,
                                activeCategory: activeCategory,
                                analysisMode: analysisMode,
                                onToggleNode: toggleNode,
                                onSelectFile: selectFile,
                                onHoverFile: setHoverFile,
                                onClearSelection: clearSelection
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/Explorer.tsx",
                                lineNumber: 341,
                                columnNumber: 9
                            }, this),
                            activeCategory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute bottom-16 left-5 rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] text-muted shadow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-foreground",
                                        children: activeCategory
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/Explorer.tsx",
                                        lineNumber: 364,
                                        columnNumber: 13
                                    }, this),
                                    " ·",
                                    " ",
                                    matchingCount.toLocaleString(),
                                    " matching files"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/Explorer.tsx",
                                lineNumber: 363,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/Explorer.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/Explorer.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$sidebar$2f$Resizer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                side: "right",
                width: rightWidth,
                minWidth: RIGHT.min,
                maxWidth: RIGHT.max,
                onResize: setRightWidth
            }, void 0, false, {
                fileName: "[project]/components/actmap/Explorer.tsx",
                lineNumber: 372,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$DetailPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                data: data,
                model: model,
                tab: tab,
                selectedFile: selectedFile,
                selectedNode: selectedNode,
                insights: insights,
                activeCategory: activeCategory,
                analysisMode: analysisMode,
                analysisDepth: analysisDepth,
                analysisResults: analysisResults,
                hoverFile: hoverFile,
                onTabChange: setTab,
                onAnalysisModeChange: setAnalysisMode,
                onAnalysisDepthChange: setAnalysisDepth,
                onHover: setHoverFile,
                onSelectFile: selectFile
            }, void 0, false, {
                fileName: "[project]/components/actmap/Explorer.tsx",
                lineNumber: 380,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/Explorer.tsx",
        lineNumber: 284,
        columnNumber: 5
    }, this);
}
_s(Explorer, "5+gQdBZYyaeP1kz+RdCd8vIIlg0=");
_c = Explorer;
var _c;
__turbopack_context__.k.register(_c, "Explorer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/detail/AnalysisResults.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalysisResults
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/PathButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/colors.ts [app-client] (ecmascript)");
"use client";
;
;
;
const LEVELS = [
    1,
    2,
    3
];
const COPY = {
    "blast-radius": {
        caption: "what imports this, directly or through others",
        tone: "text-good",
        empty: "Nothing imports this file, so changing it breaks nothing else."
    },
    "dependency-chain": {
        caption: "what this needs, directly or through others",
        tone: "text-warn",
        empty: "This file imports nothing."
    }
};
function groupLabel(depth, count) {
    return depth === 1 ? `Directly · ${count}` : `${depth} steps away · ${count}`;
}
function AnalysisResults({ mode, results, depth, fileMap, hoverFile, onDepthChange, onHover, onSelectFile }) {
    const copy = COPY[mode];
    const groups = new Map();
    for (const result of results){
        const group = groups.get(result.depth) ?? [];
        group.push(result.path);
        groups.set(result.depth, group);
    }
    const levels = [
        ...groups.keys()
    ].sort((a, b)=>a - b);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] leading-5 text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `mr-1.5 font-mono text-[17px] tabular-nums ${copy.tone}`,
                                children: results.length
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            "files · ",
                            copy.caption
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 items-center gap-1 text-[13px] text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mr-1",
                                children: "levels"
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            LEVELS.map((level)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onDepthChange(level),
                                    className: `rounded px-2 py-0.5 font-mono tabular-nums ${depth === level ? "bg-surface-2 text-foreground" : "hover:text-foreground"}`,
                                    children: level
                                }, level, false, {
                                    fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            results.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-[14px] text-muted",
                children: copy.empty
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                lineNumber: 92,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-4",
                children: levels.map((level)=>{
                    const paths = [
                        ...groups.get(level) ?? []
                    ].sort();
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1.5 text-[14px] text-muted",
                                children: groupLabel(level, paths.length)
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                                lineNumber: 100,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "-mx-2 space-y-0.5",
                                children: paths.map((path)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        path: path,
                                        dotColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(fileMap.get(path)?.extension ?? ""),
                                        hovered: hoverFile === path,
                                        onSelect: onSelectFile,
                                        onHover: onHover
                                    }, path, false, {
                                        fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                                        lineNumber: 106,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                                lineNumber: 104,
                                columnNumber: 17
                            }, this)
                        ]
                    }, level, true, {
                        fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                        lineNumber: 99,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
                lineNumber: 94,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/detail/AnalysisResults.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c = AnalysisResults;
var _c;
__turbopack_context__.k.register(_c, "AnalysisResults");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/detail/DetailPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DetailPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$FileDetails$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/detail/FileDetails.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$FolderDetails$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/detail/FolderDetails.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$InsightsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/detail/InsightsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$RepositoryOverview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/detail/RepositoryOverview.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function DetailPanel({ data, model, tab, selectedFile, selectedNode, insights, activeCategory, analysisMode, analysisDepth, analysisResults, hoverFile, onTabChange, onAnalysisModeChange, onAnalysisDepthChange, onHover, onSelectFile }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "ui-scale-pane quiet-scroll min-h-0 min-w-0 overflow-y-auto border-l border-line bg-background",
        children: [
            selectedFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$FileDetails$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                file: selectedFile,
                model: model,
                adapter: data.adapter,
                tab: tab,
                analysisMode: analysisMode,
                analysisDepth: analysisDepth,
                analysisResults: analysisResults,
                hoverFile: hoverFile,
                onTabChange: onTabChange,
                onAnalysisModeChange: onAnalysisModeChange,
                onAnalysisDepthChange: onAnalysisDepthChange,
                onHover: onHover,
                onSelectFile: onSelectFile
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/DetailPanel.tsx",
                lineNumber: 59,
                columnNumber: 9
            }, this) : selectedNode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$FolderDetails$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                node: selectedNode,
                tab: tab,
                activeCategory: activeCategory,
                hoverFile: hoverFile,
                onTabChange: onTabChange,
                onHover: onHover,
                onSelectFile: onSelectFile
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/DetailPanel.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$RepositoryOverview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                data: data,
                model: model,
                hoverFile: hoverFile,
                onHover: onHover,
                onSelectFile: onSelectFile
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/DetailPanel.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$InsightsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                insights: insights,
                fileMap: model.fileMap,
                hoverFile: hoverFile,
                onHover: onHover,
                onSelect: onSelectFile
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/DetailPanel.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/detail/DetailPanel.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c = DetailPanel;
var _c;
__turbopack_context__.k.register(_c, "DetailPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/detail/FileDetails.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$AnalysisResults$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/detail/AnalysisResults.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/DetailTabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/PathButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/colors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/taxonomy/categories.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function Row({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5 text-[15px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                className: "text-muted",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                className: "min-w-0 break-words text-foreground",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c = Row;
function RelationList({ title, badge, badgeTone, paths, empty, tagFor, model, hoverFile, onHover, onSelectFile }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-6 border-t border-line pt-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex items-baseline justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-[16px] text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `font-mono text-[15px] tabular-nums ${badgeTone}`,
                        children: badge
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            paths.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[14px] text-muted",
                children: empty
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "-mx-2 space-y-0.5",
                children: paths.map((path)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        path: path,
                        dotColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(model.fileMap.get(path)?.extension ?? ""),
                        tag: tagFor(path),
                        hovered: hoverFile === path,
                        onSelect: onSelectFile,
                        onHover: onHover
                    }, path, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 78,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_c1 = RelationList;
const ANALYSIS_BUTTONS = [
    {
        mode: "blast-radius",
        label: "Blast radius"
    },
    {
        mode: "dependency-chain",
        label: "Dependency chain"
    }
];
/** Re-exports and dynamic imports are worth flagging; plain imports are not. */ function kindTag(kinds) {
    if (!kinds || kinds.length === 0) return null;
    if (kinds.includes("static")) return null;
    return kinds[0] === "re-export" ? "re-export" : kinds[0];
}
function FileDetails({ file, model, adapter, tab, analysisMode, analysisDepth, analysisResults, hoverFile, onTabChange, onAnalysisModeChange, onAnalysisDepthChange, onHover, onSelectFile }) {
    const slash = file.path.lastIndexOf("/");
    const folder = slash === -1 ? "" : file.path.slice(0, slash + 1);
    const imports = model.imports.get(file.path) ?? [];
    const importedBy = model.importedBy.get(file.path) ?? [];
    const role = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["categoryOf"])(file);
    const reachedBy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taxonomyFor"])(adapter).reachedBy[role];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-6 pb-8 pt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[14px] text-muted",
                children: "file"
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-1 break-all font-mono text-[19px] leading-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: folder
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-foreground",
                        children: file.name
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                tab: tab,
                onChange: onTabChange
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            tab === "explanation" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExplanationEmpty"], {}, void 0, false, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                label: "Kind",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-2.5 font-mono",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-3 w-3 rounded-[3px]",
                                            style: {
                                                backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(file.extension)
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this),
                                        file.extension || "other"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                label: "Role",
                                children: role
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                label: "Folder",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono",
                                    children: file.folderPath === "." ? "root" : file.folderPath
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                    lineNumber: 158,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                label: "Length",
                                children: [
                                    file.lineCount.toLocaleString(),
                                    " lines"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                label: "Depends on",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-warn",
                                        children: imports.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    imports.length === 1 ? "file" : "files"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                label: "Depended on by",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-good",
                                        children: importedBy.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    importedBy.length === 1 ? "file" : "files"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this),
                            reachedBy && importedBy.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                label: "Reached by",
                                children: reachedBy
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                lineNumber: 176,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex flex-wrap gap-2",
                        children: ANALYSIS_BUTTONS.map(({ mode, label })=>{
                            const active = analysisMode === mode;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": active,
                                onClick: ()=>onAnalysisModeChange(active ? null : mode),
                                className: `rounded-lg border px-4 py-2 text-[15px] transition-colors ${active ? "border-accent bg-surface-2 text-foreground" : "border-line text-muted hover:border-subtle hover:text-foreground"}`,
                                children: label
                            }, mode, false, {
                                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                                lineNumber: 185,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 180,
                        columnNumber: 11
                    }, this),
                    analysisMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$detail$2f$AnalysisResults$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        mode: analysisMode,
                        results: analysisResults,
                        depth: analysisDepth,
                        fileMap: model.fileMap,
                        hoverFile: hoverFile,
                        onDepthChange: onAnalysisDepthChange,
                        onHover: onHover,
                        onSelectFile: onSelectFile
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 203,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RelationList, {
                        title: "Imports",
                        badge: `${imports.length}→`,
                        badgeTone: "text-warn",
                        paths: imports,
                        empty: "No imports",
                        tagFor: (path)=>kindTag(model.edgeMap.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["edgeKey"])(file.path, path))?.kinds),
                        model: model,
                        hoverFile: hoverFile,
                        onHover: onHover,
                        onSelectFile: onSelectFile
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RelationList, {
                        title: "Imported by",
                        badge: `←${importedBy.length}`,
                        badgeTone: "text-good",
                        paths: importedBy,
                        empty: "Nothing imports this file",
                        tagFor: (path)=>kindTag(model.edgeMap.get((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["edgeKey"])(path, file.path))?.kinds),
                        model: model,
                        hoverFile: hoverFile,
                        onHover: onHover,
                        onSelectFile: onSelectFile
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                        lineNumber: 228,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/FileDetails.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/detail/FileDetails.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c2 = FileDetails;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Row");
__turbopack_context__.k.register(_c1, "RelationList");
__turbopack_context__.k.register(_c2, "FileDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/detail/FolderDetails.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FolderDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/DetailTabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/PathButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/colors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const FILE_LIMIT = 40;
function FolderDetails({ node, tab, activeCategory, hoverFile, onTabChange, onHover, onSelectFile }) {
    _s();
    const { composition, files, lines } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FolderDetails.useMemo": ()=>{
            const counts = new Map();
            let total = 0;
            for (const file of node.files){
                const extension = file.extension || "other";
                counts.set(extension, (counts.get(extension) ?? 0) + 1);
                total += file.lineCount;
            }
            return {
                composition: [
                    ...counts.entries()
                ].sort({
                    "FolderDetails.useMemo": (a, b)=>b[1] - a[1] || a[0].localeCompare(b[0])
                }["FolderDetails.useMemo"]),
                files: [
                    ...node.files
                ].sort({
                    "FolderDetails.useMemo": (a, b)=>b.fanIn - a.fanIn || a.path.localeCompare(b.path)
                }["FolderDetails.useMemo"]),
                lines: total
            };
        }
    }["FolderDetails.useMemo"], [
        node.files
    ]);
    const matching = activeCategory ? node.files.filter((file)=>(file.extension || "other") === activeCategory).length : null;
    const widest = composition[0]?.[1] ?? 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-6 pb-8 pt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[14px] text-muted",
                children: "folder"
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-1 break-all font-mono text-[19px] font-semibold leading-7 text-foreground",
                children: node.path === "." ? "(repository root)" : node.path
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                tab: tab,
                onChange: onTabChange
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            tab === "explanation" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailTabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExplanationEmpty"], {}, void 0, false, {
                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "mt-4 text-[15px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-muted",
                                        children: "Files"
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "font-mono tabular-nums text-foreground",
                                        children: [
                                            node.files.length.toLocaleString(),
                                            matching !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-muted",
                                                children: [
                                                    "(",
                                                    matching,
                                                    " match)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 81,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-muted",
                                        children: "Lines"
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "font-mono tabular-nums text-foreground",
                                        children: lines.toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-muted",
                                        children: "Imported from"
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "text-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono tabular-nums text-good",
                                                children: [
                                                    "←",
                                                    node.fanIn
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "outside this folder"
                                            }, void 0, false, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 97,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-[120px_minmax(0,1fr)] gap-3 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-muted",
                                        children: "Imports"
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "text-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono tabular-nums text-warn",
                                                children: [
                                                    node.fanOut,
                                                    "→"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 104,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-muted",
                                                children: "outside this folder"
                                            }, void 0, false, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 103,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-6 border-t border-line pt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mb-3 text-[16px] text-foreground",
                                children: "What is inside"
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-2.5",
                                children: composition.map(([extension, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: "flex items-center gap-3 text-[15px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-3 w-3 shrink-0 rounded-[3px]",
                                                style: {
                                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(extension === "other" ? "" : extension)
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 116,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-20 shrink-0 font-mono text-foreground",
                                                children: extension
                                            }, void 0, false, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block h-full rounded-full bg-subtle",
                                                    style: {
                                                        width: `${Math.max(6, count / widest * 100)}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 124,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-10 text-right font-mono tabular-nums text-muted",
                                                children: count
                                            }, void 0, false, {
                                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                lineNumber: 131,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, extension, true, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-6 border-t border-line pt-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-2 flex items-baseline justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-[16px] text-foreground",
                                        children: "Files"
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[14px] text-muted",
                                        children: "most depended on first"
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "-mx-2 space-y-0.5",
                                children: files.slice(0, FILE_LIMIT).map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        path: file.name,
                                        dotColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(file.extension),
                                        hovered: hoverFile === file.path,
                                        onSelect: ()=>onSelectFile(file.path),
                                        onHover: (value)=>onHover(value === null ? null : file.path),
                                        trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0 font-mono text-[13px] tabular-nums text-muted",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-good",
                                                    children: [
                                                        "←",
                                                        file.fanIn
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 23
                                                }, this),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-warn",
                                                    children: [
                                                        file.fanOut,
                                                        "→"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                            lineNumber: 155,
                                            columnNumber: 21
                                        }, this)
                                    }, file.path, false, {
                                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            files.length > FILE_LIMIT && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[14px] text-muted",
                                children: [
                                    files.length - FILE_LIMIT,
                                    " more not listed"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                                lineNumber: 165,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/detail/FolderDetails.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(FolderDetails, "lQk4A57Fb7/zOGJpArTQQnlSMt0=");
_c = FolderDetails;
var _c;
__turbopack_context__.k.register(_c, "FolderDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/detail/InsightsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InsightsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/PathButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/colors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Files-nothing-imports leads: it explains. Cycles and oversized read closer
// to a verdict, so they sit underneath.
function rank(insight) {
    if (insight.id === "unused-files") return 0;
    if (insight.id === "high-dependents") return 1;
    if (insight.id.startsWith("import-cycle")) return 2;
    return 3;
}
const PATH_LIMIT = 12;
function InsightsPanel({ insights, fileMap, hoverFile, onHover, onSelect }) {
    _s();
    // Collapsed by default, and it lives at the bottom of the pane.
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAll, setShowAll] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    if (insights.length === 0) return null;
    const ordered = [
        ...insights
    ].sort((a, b)=>rank(a) - rank(b));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-line px-6 py-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-expanded": expanded,
                onClick: ()=>setExpanded((value)=>!value),
                className: "flex w-full items-center justify-between text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[16px] text-foreground",
                        children: "Insights"
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[14px] tabular-nums text-muted",
                        children: [
                            insights.length,
                            " ",
                            insights.length === 1 ? "finding" : "findings",
                            " ",
                            expanded ? "−" : "+"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 space-y-6",
                children: ordered.map((insight)=>{
                    const isCycle = insight.id.startsWith("import-cycle");
                    const expandedList = showAll.has(insight.id);
                    const paths = isCycle || expandedList ? insight.paths : insight.paths.slice(0, PATH_LIMIT);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-[15px] text-foreground",
                                        children: insight.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                        lineNumber: 72,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-mono text-[14px] tabular-nums text-muted",
                                        children: insight.paths.length
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                        lineNumber: 73,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                lineNumber: 71,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-[13.5px] leading-5 text-muted",
                                children: insight.description
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                lineNumber: 78,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "-mx-2 mt-2 space-y-0.5",
                                children: paths.map((path, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        path: path,
                                        dotColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(fileMap.get(path)?.extension ?? ""),
                                        hovered: hoverFile === path,
                                        onSelect: onSelect,
                                        onHover: onHover,
                                        trailing: isCycle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0 text-[13px] text-subtle",
                                            children: index === paths.length - 1 ? "↩" : "→"
                                        }, void 0, false, {
                                            fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                            lineNumber: 91,
                                            columnNumber: 27
                                        }, this) : undefined
                                    }, `${path}-${index}`, false, {
                                        fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                        lineNumber: 82,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                lineNumber: 80,
                                columnNumber: 17
                            }, this),
                            isCycle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-[13px] text-subtle",
                                children: [
                                    "…and the last one imports ",
                                    insight.paths[0].split("/").pop(),
                                    " again."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                lineNumber: 101,
                                columnNumber: 19
                            }, this),
                            !isCycle && insight.paths.length > PATH_LIMIT && !expandedList && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setShowAll((current)=>new Set(current).add(insight.id)),
                                className: "mt-1 text-[14px] text-accent hover:underline",
                                children: [
                                    "Show ",
                                    insight.paths.length - PATH_LIMIT,
                                    " more"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                                lineNumber: 107,
                                columnNumber: 19
                            }, this)
                        ]
                    }, insight.id, true, {
                        fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                        lineNumber: 70,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/detail/InsightsPanel.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(InsightsPanel, "DZwhDgAJW7Bj24HbF8JTZ2ZdhC4=");
_c = InsightsPanel;
var _c;
__turbopack_context__.k.register(_c, "InsightsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/detail/RepositoryOverview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RepositoryOverview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/taxonomy/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/DetailSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$Metric$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/Metric.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/PathButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/colors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const LIST_LIMIT = 10;
function RepositoryOverview({ data, model, hoverFile, onHover, onSelectFile }) {
    _s();
    const { mostDepended, startingPoints, unconnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RepositoryOverview.useMemo": ()=>{
            const depended = model.files.filter({
                "RepositoryOverview.useMemo.depended": (file)=>file.fanIn > 0
            }["RepositoryOverview.useMemo.depended"]).sort({
                "RepositoryOverview.useMemo.depended": (a, b)=>b.fanIn - a.fanIn || a.path.localeCompare(b.path)
            }["RepositoryOverview.useMemo.depended"]);
            const starts = model.files.filter({
                "RepositoryOverview.useMemo.starts": (file)=>file.fanIn === 0 && file.fanOut > 0
            }["RepositoryOverview.useMemo.starts"]).sort({
                "RepositoryOverview.useMemo.starts": (a, b)=>b.fanOut - a.fanOut || a.path.localeCompare(b.path)
            }["RepositoryOverview.useMemo.starts"]);
            const isolated = model.files.filter({
                "RepositoryOverview.useMemo": (file)=>file.fanIn === 0 && file.fanOut === 0
            }["RepositoryOverview.useMemo"]).length;
            return {
                mostDepended: depended,
                startingPoints: starts,
                unconnected: isolated
            };
        }
    }["RepositoryOverview.useMemo"], [
        model.files
    ]);
    const unresolved = data.coverage?.unresolved ?? 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 pb-5 pt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "break-all font-mono text-[26px] font-semibold leading-8 tracking-tight text-foreground",
                        children: data.name
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-[15px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted",
                                children: "Framework"
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-4 text-foreground",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameworkLabel"])(data.adapter)
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 divide-x divide-line border-y border-line",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$Metric$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        label: "Files",
                        value: model.files.length
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$Metric$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        label: "Imports",
                        value: model.edges.length,
                        note: unresolved > 0 ? `${unresolved.toLocaleString()} unresolved` : undefined
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$Metric$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        label: "Routes",
                        value: data.routes.length
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1"
            }, void 0, false, {
                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Most depended on",
                caption: "by files importing it",
                count: mostDepended.length,
                children: [
                    mostDepended.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] text-muted",
                        children: "No file in this map imports another."
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "-mx-2 space-y-0.5",
                        children: mostDepended.slice(0, LIST_LIMIT).map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                path: file.path,
                                dotColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(file.extension),
                                hovered: hoverFile === file.path,
                                onSelect: onSelectFile,
                                onHover: onHover,
                                trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "shrink-0 font-mono text-[14px] tabular-nums text-good",
                                    children: [
                                        "←",
                                        file.fanIn
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                                    lineNumber: 98,
                                    columnNumber: 19
                                }, this)
                            }, file.path, false, {
                                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    mostDepended.length > LIST_LIMIT && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-[14px] text-muted",
                        children: [
                            mostDepended.length - LIST_LIMIT,
                            " more not listed"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$DetailSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Imported by nothing",
                caption: "where reading starts",
                count: startingPoints.length,
                children: [
                    startingPoints.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] text-muted",
                        children: "Every file with imports is itself imported by something."
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "-mx-2 space-y-0.5",
                        children: startingPoints.slice(0, LIST_LIMIT).map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                path: file.path,
                                dotColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(file.extension),
                                hovered: hoverFile === file.path,
                                onSelect: onSelectFile,
                                onHover: onHover,
                                trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "shrink-0 font-mono text-[14px] tabular-nums text-warn",
                                    children: [
                                        file.fanOut,
                                        "→"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                                    lineNumber: 134,
                                    columnNumber: 19
                                }, this)
                            }, file.path, false, {
                                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this),
                    startingPoints.length > LIST_LIMIT && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-[14px] text-muted",
                        children: [
                            startingPoints.length - LIST_LIMIT,
                            " more not listed"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "space-y-1.5 border-t border-line px-6 py-5 text-[14px] text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono tabular-nums text-foreground",
                                children: model.files.length.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            " ",
                            "files no convention could identify"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    unconnected > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono tabular-nums text-foreground",
                                children: unconnected.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this),
                            " ",
                            "files neither import nor are imported"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/detail/RepositoryOverview.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(RepositoryOverview, "suLdSrdDRX/2AIYIphlMq0fyRTg=");
_c = RepositoryOverview;
var _c;
__turbopack_context__.k.register(_c, "RepositoryOverview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/graph/GraphCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GraphCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$graph$2f$GraphControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/graph/GraphControls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$graph$2f$GraphNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/graph/GraphNode.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const MIN_ZOOM = 0.18;
const MAX_ZOOM = 2.2;
const FIT_MARGIN = 40;
const FIT_TOP = 40;
const MAX_FIT_ZOOM = 1.15;
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
const EDGE_CLASS = {
    normal: "stroke-edge",
    out: "stroke-warn",
    in: "stroke-good",
    dim: "stroke-edge"
};
const EDGE_OPACITY = {
    normal: 0.5,
    out: 0.95,
    in: 0.95,
    dim: 0.07
};
function GraphCanvas({ nodes, layout, edges, rowFiles, hiddenCounts, openKey, newlyOpened, selectedNode, selectedFile, hoverFile, focusNodes, focusFiles, activeCategory, analysisMode, onToggleNode, onSelectFile, onHoverFile, onClearSelection }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        width: 0,
        height: 0
    });
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        k: 1
    });
    const viewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(view);
    const fitted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastOpenKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(openKey);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphCanvas.useEffect": ()=>{
            viewRef.current = view;
        }
    }["GraphCanvas.useEffect"], [
        view
    ]);
    const drag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "GraphCanvas.useLayoutEffect": ()=>{
            const element = containerRef.current;
            if (!element) return;
            const observer = new ResizeObserver({
                "GraphCanvas.useLayoutEffect": ([entry])=>{
                    setSize({
                        width: entry.contentRect.width,
                        height: entry.contentRect.height
                    });
                }
            }["GraphCanvas.useLayoutEffect"]);
            observer.observe(element);
            return ({
                "GraphCanvas.useLayoutEffect": ()=>observer.disconnect()
            })["GraphCanvas.useLayoutEffect"];
        }
    }["GraphCanvas.useLayoutEffect"], []);
    const fitAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GraphCanvas.useCallback[fitAll]": ()=>{
            if (!size.width || !size.height) return;
            const { minX, minY, maxX, maxY } = layout.bounds;
            const width = Math.max(1, maxX - minX);
            const height = Math.max(1, maxY - minY);
            const k = clamp(Math.min((size.width - FIT_MARGIN * 2) / width, (size.height - FIT_MARGIN - FIT_TOP) / height), MIN_ZOOM, MAX_FIT_ZOOM);
            setView({
                k,
                x: (size.width - width * k) / 2 - minX * k,
                y: FIT_TOP + (size.height - FIT_TOP - FIT_MARGIN - height * k) / 2 - minY * k
            });
        }
    }["GraphCanvas.useCallback[fitAll]"], [
        layout.bounds,
        size.height,
        size.width
    ]);
    // Fit once, as soon as there is a real size to fit into.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphCanvas.useEffect": ()=>{
            if (fitted.current || !size.width || !size.height) return;
            fitted.current = true;
            fitAll();
        }
    }["GraphCanvas.useEffect"], [
        fitAll,
        size.height,
        size.width
    ]);
    // Opening a folder may only ever zoom out, never in. This reads the layout
    // that already contains the new panel, so it never fits the state before it.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphCanvas.useEffect": ()=>{
            if (lastOpenKey.current === openKey) return;
            lastOpenKey.current = openKey;
            if (newlyOpened.length === 0 || !size.width || !size.height) return;
            let minX = Infinity;
            let minY = Infinity;
            let maxX = -Infinity;
            let maxY = -Infinity;
            for (const id of newlyOpened){
                const box = layout.boxes.get(id);
                if (!box) continue;
                minX = Math.min(minX, box.x);
                minY = Math.min(minY, box.y);
                maxX = Math.max(maxX, box.x + box.width);
                maxY = Math.max(maxY, box.y + box.height);
            }
            if (!Number.isFinite(minX)) return;
            const current = viewRef.current;
            const margin = 40;
            const left = minX * current.k + current.x;
            const right = maxX * current.k + current.x;
            const top = minY * current.k + current.y;
            const bottom = maxY * current.k + current.y;
            const visible = left >= margin && top >= margin && right <= size.width - margin && bottom <= size.height - margin;
            if (visible) return;
            const fitK = Math.min((size.width - margin * 2) / (maxX - minX), (size.height - margin * 2) / (maxY - minY));
            const k = clamp(Math.min(current.k, fitK), MIN_ZOOM, MAX_ZOOM);
            setView({
                k,
                x: size.width / 2 - (minX + maxX) / 2 * k,
                y: size.height / 2 - (minY + maxY) / 2 * k
            });
        }
    }["GraphCanvas.useEffect"], [
        layout,
        newlyOpened,
        openKey,
        size.height,
        size.width
    ]);
    // Wheel zoom around the cursor. React's wheel handler is passive, so this
    // is attached by hand to be able to stop the page from scrolling.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GraphCanvas.useEffect": ()=>{
            const element = containerRef.current;
            if (!element) return;
            function onWheel(event) {
                event.preventDefault();
                const bounds = element.getBoundingClientRect();
                const px = event.clientX - bounds.left;
                const py = event.clientY - bounds.top;
                setView({
                    "GraphCanvas.useEffect.onWheel": (current)=>{
                        const k = clamp(current.k * Math.exp(-event.deltaY * 0.0015), MIN_ZOOM, MAX_ZOOM);
                        const ratio = k / current.k;
                        return {
                            k,
                            x: px - (px - current.x) * ratio,
                            y: py - (py - current.y) * ratio
                        };
                    }
                }["GraphCanvas.useEffect.onWheel"]);
            }
            element.addEventListener("wheel", onWheel, {
                passive: false
            });
            return ({
                "GraphCanvas.useEffect": ()=>element.removeEventListener("wheel", onWheel)
            })["GraphCanvas.useEffect"];
        }
    }["GraphCanvas.useEffect"], []);
    function zoomBy(factor) {
        setView((current)=>{
            const k = clamp(current.k * factor, MIN_ZOOM, MAX_ZOOM);
            const ratio = k / current.k;
            const cx = size.width / 2;
            const cy = size.height / 2;
            return {
                k,
                x: cx - (cx - current.x) * ratio,
                y: cy - (cy - current.y) * ratio
            };
        });
    }
    function handlePointerDown(event) {
        if (event.target.closest("[data-node]")) return;
        if (event.target.closest("[data-overlay]")) return;
        drag.current = {
            startX: event.clientX,
            startY: event.clientY,
            viewX: view.x,
            viewY: view.y,
            moved: false
        };
        event.currentTarget.setPointerCapture(event.pointerId);
    }
    function handlePointerMove(event) {
        const state = drag.current;
        if (!state) return;
        const dx = event.clientX - state.startX;
        const dy = event.clientY - state.startY;
        if (!state.moved && Math.hypot(dx, dy) < 4) return;
        state.moved = true;
        setView((current)=>({
                ...current,
                x: state.viewX + dx,
                y: state.viewY + dy
            }));
    }
    function handlePointerUp(event) {
        const state = drag.current;
        drag.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        // A click on empty canvas, not a drag, returns the pane to the summary.
        if (state && !state.moved) onClearSelection();
    }
    const ordered = [
        ...nodes
    ].sort((a, b)=>{
        const aOpen = layout.boxes.get(a.id)?.open ? 1 : 0;
        const bOpen = layout.boxes.get(b.id)?.open ? 1 : 0;
        return aOpen - bOpen;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-full w-full overflow-hidden bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--grid)_1px,transparent_1px)] [background-size:24px_24px]"
            }, void 0, false, {
                fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "absolute inset-0 cursor-grab touch-none active:cursor-grabbing",
                onPointerDown: handlePointerDown,
                onPointerMove: handlePointerMove,
                onPointerUp: handlePointerUp,
                onPointerCancel: handlePointerUp,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "h-full w-full select-none",
                    role: "img",
                    "aria-label": "Repository map",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                    id: "arrow-out",
                                    viewBox: "0 0 10 10",
                                    refX: "9",
                                    refY: "5",
                                    markerWidth: "7",
                                    markerHeight: "7",
                                    orient: "auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M 0 1 L 10 5 L 0 9 z",
                                        className: "fill-warn"
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                    id: "arrow-in",
                                    viewBox: "0 0 10 10",
                                    refX: "9",
                                    refY: "5",
                                    markerWidth: "7",
                                    markerHeight: "7",
                                    orient: "auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M 0 1 L 10 5 L 0 9 z",
                                        className: "fill-good"
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                                        lineNumber: 316,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                            lineNumber: 294,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            transform: `translate(${view.x} ${view.y}) scale(${view.k})`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                    fill: "none",
                                    strokeLinecap: "round",
                                    pointerEvents: "none",
                                    children: edges.map((edge)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: edge.d,
                                            strokeWidth: edge.tone === "dim" ? 1 : edge.tone === "normal" ? edge.width : edge.width + 0.6,
                                            opacity: EDGE_OPACITY[edge.tone],
                                            className: EDGE_CLASS[edge.tone],
                                            markerEnd: edge.tone === "out" ? "url(#arrow-out)" : edge.tone === "in" ? "url(#arrow-in)" : undefined
                                        }, edge.key, false, {
                                            fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                                            lineNumber: 323,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                                    lineNumber: 321,
                                    columnNumber: 13
                                }, this),
                                ordered.map((node)=>{
                                    const box = layout.boxes.get(node.id);
                                    if (!box) return null;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$graph$2f$GraphNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        node: node,
                                        box: box,
                                        rows: rowFiles.get(node.id) ?? [],
                                        hiddenCount: hiddenCounts.get(node.id) ?? 0,
                                        selected: selectedNode === node.id,
                                        selectedFile: selectedFile,
                                        hoverFile: hoverFile,
                                        dimmed: focusNodes !== null && !focusNodes.has(node.id),
                                        activeCategory: activeCategory,
                                        focusFiles: focusFiles,
                                        analysisMode: analysisMode,
                                        onToggle: onToggleNode,
                                        onSelectFile: onSelectFile,
                                        onHoverFile: onHoverFile
                                    }, node.id, false, {
                                        fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                                        lineNumber: 345,
                                        columnNumber: 17
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                            lineNumber: 320,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                    lineNumber: 293,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$graph$2f$GraphControls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                zoom: view.k,
                onZoomIn: ()=>zoomBy(1.2),
                onZoomOut: ()=>zoomBy(1 / 1.2),
                onFit: fitAll
            }, void 0, false, {
                fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute bottom-5 left-5 text-[12.5px] text-subtle",
                children: "Drag to move · Scroll to zoom · Click a folder to open it"
            }, void 0, false, {
                fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
                lineNumber: 375,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/graph/GraphCanvas.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, this);
}
_s(GraphCanvas, "79f2EwA1CmH4QLAgs9vutOm4qTQ=");
_c = GraphCanvas;
var _c;
__turbopack_context__.k.register(_c, "GraphCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/graph/GraphControls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GraphControls
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function GraphControls({ zoom, onZoomIn, onZoomOut, onFit }) {
    const button = "rounded-md px-3 py-1.5 text-[14px] text-muted transition-colors hover:bg-surface-2 hover:text-foreground";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-4 right-4 z-10 flex items-center gap-0.5 rounded-lg border border-line bg-surface p-1 shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Zoom out",
                onClick: onZoomOut,
                className: button,
                children: "−"
            }, void 0, false, {
                fileName: "[project]/components/actmap/graph/GraphControls.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-12 text-center text-[13px] tabular-nums text-muted",
                children: [
                    Math.round(zoom * 100),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/graph/GraphControls.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "Zoom in",
                onClick: onZoomIn,
                className: button,
                children: "+"
            }, void 0, false, {
                fileName: "[project]/components/actmap/graph/GraphControls.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onFit,
                className: button,
                children: "Fit"
            }, void 0, false, {
                fileName: "[project]/components/actmap/graph/GraphControls.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/graph/GraphControls.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = GraphControls;
var _c;
__turbopack_context__.k.register(_c, "GraphControls");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/graph/GraphNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GraphNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/colors.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
/** About how many monospace characters fit, so labels end in an ellipsis. */ function fit(text, pixels, size) {
    const characters = Math.max(4, Math.floor(pixels / (size * 0.62)));
    return text.length <= characters ? text : `${text.slice(0, characters - 1)}…`;
}
function GraphNode({ node, box, rows, hiddenCount, selected, selectedFile, hoverFile, dimmed, activeCategory, focusFiles, analysisMode, onToggle, onSelectFile, onHoverFile }) {
    const matching = activeCategory ? node.files.filter((file)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["categoryOf"])(file) === activeCategory).length : node.files.length;
    const containsHover = hoverFile !== null && node.files.some((file)=>file.path === hoverFile);
    const faded = dimmed || activeCategory !== null && matching === 0;
    const stroke = selected || containsHover ? "stroke-accent" : box.open ? "stroke-accent/40" : "stroke-line";
    const counts = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            activeCategory ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                        className: matching > 0 ? "fill-foreground" : "fill-subtle",
                        children: matching
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                        className: "fill-subtle",
                        children: [
                            "/",
                            node.files.length,
                            " files"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                children: [
                    node.files.length,
                    " ",
                    node.files.length === 1 ? "file" : "files"
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                dx: 12,
                className: "fill-good",
                children: [
                    "←",
                    node.fanIn
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                dx: 8,
                className: "fill-warn",
                children: [
                    node.fanOut,
                    "→"
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        "data-node": true,
        transform: `translate(${box.x} ${box.y})`,
        opacity: faded ? 0.26 : 1,
        className: "transition-opacity duration-150",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                width: box.width,
                height: box.height,
                rx: 9,
                className: `fill-surface ${stroke}`,
                strokeWidth: selected ? 1.8 : 1.2
            }, void 0, false, {
                fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                className: "cursor-pointer",
                onClick: ()=>onToggle(node.id),
                onPointerEnter: ()=>onHoverFile(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: box.width,
                        height: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].header,
                        rx: 9,
                        fill: "transparent"
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: 16,
                        y: 25,
                        fontSize: 14,
                        fontWeight: 600,
                        className: "fill-foreground font-mono",
                        children: fit(node.label, box.width - (box.open ? 56 : 32), 14)
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: 16,
                        y: 45,
                        fontSize: 12,
                        className: "fill-muted font-mono",
                        children: counts
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    box.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: box.width - 18,
                        y: 30,
                        fontSize: 18,
                        textAnchor: "middle",
                        className: "fill-muted",
                        children: "−"
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: node.path === "." ? "repository root" : node.path
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            box.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                        x1: 0,
                        x2: box.width,
                        y1: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].header,
                        y2: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].header,
                        className: "stroke-line"
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    rows.map((file, index)=>{
                        const y = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].header + index * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row;
                        const isSelected = selectedFile === file.path;
                        const isHover = hoverFile === file.path;
                        const inFocus = focusFiles !== null && focusFiles.has(file.path) && !isSelected;
                        const matches = activeCategory === null || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["categoryOf"])(file) === activeCategory;
                        const out = focusFiles !== null && focusFiles.size > 0 && !focusFiles.has(file.path);
                        const tone = inFocus ? analysisMode === "dependency-chain" ? "fill-warn/15" : analysisMode === "blast-radius" ? "fill-good/15" : "fill-surface-2" : isSelected ? "fill-accent/20" : isHover ? "fill-surface-2" : "fill-transparent";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                            className: "cursor-pointer",
                            opacity: out || !matches ? 0.32 : 1,
                            onClick: (event)=>{
                                event.stopPropagation();
                                onSelectFile(file.path);
                            },
                            onPointerEnter: ()=>onHoverFile(file.path),
                            onPointerLeave: ()=>onHoverFile(null),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 6,
                                    y: y + 1,
                                    width: box.width - 12,
                                    height: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row - 2,
                                    rx: 5,
                                    className: tone
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                                    lineNumber: 173,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    x: 16,
                                    y: y + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row / 2 - 4,
                                    width: 8,
                                    height: 8,
                                    rx: 2,
                                    fill: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getExtensionColor"])(file.extension)
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                                    lineNumber: 182,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: 32,
                                    y: y + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row / 2 + 4.5,
                                    fontSize: 12.5,
                                    className: `font-mono ${isSelected ? "fill-foreground" : "fill-muted"}`,
                                    fontWeight: isSelected ? 600 : 400,
                                    children: fit(file.name, box.width - 32 - 74, 12.5)
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                                    lineNumber: 191,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                    x: box.width - 14,
                                    y: y + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row / 2 + 4,
                                    fontSize: 11,
                                    textAnchor: "end",
                                    className: "font-mono",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                                            className: "fill-good",
                                            children: [
                                                "←",
                                                file.fanIn
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                                            lineNumber: 208,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                                            dx: 7,
                                            className: "fill-warn",
                                            children: [
                                                file.fanOut,
                                                "→"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                                            lineNumber: 209,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                                    children: file.path
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                                    lineNumber: 214,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, file.path, true, {
                            fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                            lineNumber: 162,
                            columnNumber: 15
                        }, this);
                    }),
                    hiddenCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                        x: 16,
                        y: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].header + rows.length * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].moreRow / 2 + 4,
                        fontSize: 12,
                        className: "fill-subtle font-mono",
                        children: [
                            "+",
                            hiddenCount,
                            " more ",
                            hiddenCount === 1 ? "file" : "files"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                        lineNumber: 220,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/graph/GraphNode.tsx",
                lineNumber: 132,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/graph/GraphNode.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c = GraphNode;
var _c;
__turbopack_context__.k.register(_c, "GraphNode");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/routes/RoutesTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoutesTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const METHOD_STYLE = {
    GET: "text-good",
    POST: "text-warn",
    PUT: "text-warn",
    PATCH: "text-warn",
    DELETE: "text-bad"
};
function RoutesTable({ routes, selectedFile, onSelectFile }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ui-scale quiet-scroll h-full overflow-y-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "px-6 py-4 text-[15px] text-muted",
                children: "Listed only where the method and the full path are both written in the code."
            }, void 0, false, {
                fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            routes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-line px-6 py-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[16px] text-foreground",
                        children: "No routes were extracted."
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 max-w-md text-[14.5px] leading-6 text-muted",
                        children: "This framework declares its routes in a way that can't be read without guessing, or the repository has none. Nothing is shown rather than something wrong."
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                        lineNumber: 34,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full table-fixed border-t border-line text-left text-[15px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "text-muted",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "w-[110px] px-6 py-3 font-normal",
                                    children: "Method"
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "w-[38%] px-3 py-3 font-normal",
                                    children: "Pattern"
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                                    lineNumber: 44,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-3 font-normal",
                                    children: "Declared in"
                                }, void 0, false, {
                                    fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: routes.map((route)=>{
                            const active = selectedFile === route.file;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                onClick: ()=>onSelectFile(route.file),
                                className: `cursor-pointer border-t border-line transition-colors ${active ? "bg-surface-2 shadow-[inset_3px_0_0_var(--accent)]" : "hover:bg-surface"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: `px-6 py-3 font-mono ${METHOD_STYLE[route.method] ?? "text-foreground"}`,
                                        children: route.method
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                                        lineNumber: 61,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "truncate px-3 py-3 font-mono text-foreground",
                                        title: route.pattern,
                                        children: route.pattern
                                    }, void 0, false, {
                                        fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                                        lineNumber: 64,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "truncate px-3 py-3 font-mono text-muted",
                                        title: `${route.file}:${route.line}`,
                                        children: [
                                            route.file,
                                            ":",
                                            route.line
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                                        lineNumber: 67,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, route.id, true, {
                                fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                                lineNumber: 54,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/routes/RoutesTable.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = RoutesTable;
var _c;
__turbopack_context__.k.register(_c, "RoutesTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/shared/DetailSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DetailSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function DetailSection({ title, caption, count, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "border-t border-line px-6 py-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-3 flex items-baseline gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-[16px] text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/shared/DetailSection.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[14px] text-muted",
                        children: caption
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/shared/DetailSection.tsx",
                        lineNumber: 21,
                        columnNumber: 21
                    }, this),
                    count !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto font-mono text-[15px] tabular-nums text-good",
                        children: count
                    }, void 0, false, {
                        fileName: "[project]/components/actmap/shared/DetailSection.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/shared/DetailSection.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/shared/DetailSection.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = DetailSection;
var _c;
__turbopack_context__.k.register(_c, "DetailSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/shared/DetailTabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExplanationEmpty",
    ()=>ExplanationEmpty,
    "default",
    ()=>DetailTabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const TABS = [
    {
        id: "structure",
        label: "Structure"
    },
    {
        id: "explanation",
        label: "Explanation"
    }
];
function DetailTabs({ tab, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "tablist",
        className: "mt-5 flex gap-6 border-b border-line",
        children: TABS.map(({ id, label })=>{
            const active = tab === id;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                role: "tab",
                "aria-selected": active,
                onClick: ()=>onChange(id),
                className: `-mb-px border-b-2 pb-2.5 text-[15px] transition-colors ${active ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground"}`,
                children: label
            }, id, false, {
                fileName: "[project]/components/actmap/shared/DetailTabs.tsx",
                lineNumber: 23,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/actmap/shared/DetailTabs.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = DetailTabs;
function ExplanationEmpty() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-48 items-center justify-center px-6 text-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "max-w-64 text-[14px] leading-6 text-muted",
            children: "Explanations arrive in a later phase. Nothing on this screen calls a model."
        }, void 0, false, {
            fileName: "[project]/components/actmap/shared/DetailTabs.tsx",
            lineNumber: 46,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/actmap/shared/DetailTabs.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c1 = ExplanationEmpty;
var _c, _c1;
__turbopack_context__.k.register(_c, "DetailTabs");
__turbopack_context__.k.register(_c1, "ExplanationEmpty");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/shared/Metric.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Metric
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Metric({ label, value, note }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "px-4 py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[13px] text-muted",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/actmap/shared/Metric.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-[26px] font-medium leading-none tracking-tight text-foreground",
                children: typeof value === "number" ? value.toLocaleString() : value
            }, void 0, false, {
                fileName: "[project]/components/actmap/shared/Metric.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-[12.5px] text-muted",
                children: note
            }, void 0, false, {
                fileName: "[project]/components/actmap/shared/Metric.tsx",
                lineNumber: 14,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/shared/Metric.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Metric;
var _c;
__turbopack_context__.k.register(_c, "Metric");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/shared/PathButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PathButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathLabel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/shared/PathLabel.tsx [app-client] (ecmascript)");
"use client";
;
;
function PathButton({ path, dotColor, tag, hovered, trailing, onSelect, onHover }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>onSelect(path),
        onPointerEnter: ()=>onHover(path),
        onPointerLeave: ()=>onHover(null),
        className: `flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors ${hovered ? "bg-surface-2" : "hover:bg-surface-2"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$shared$2f$PathLabel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                path: path,
                dotColor: dotColor,
                tag: tag
            }, void 0, false, {
                fileName: "[project]/components/actmap/shared/PathButton.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            trailing
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/shared/PathButton.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c = PathButton;
var _c;
__turbopack_context__.k.register(_c, "PathButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/shared/PathLabel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PathLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function PathLabel({ path, dotColor, tag }) {
    const slash = path.lastIndexOf("/");
    const folder = slash === -1 ? "" : path.slice(0, slash + 1);
    const name = slash === -1 ? path : path.slice(slash + 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        title: path,
        className: "flex min-w-0 flex-1 items-center gap-2 font-mono text-[12.5px] leading-5",
        children: [
            dotColor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-2 w-2 shrink-0 rounded-[2px]",
                style: {
                    backgroundColor: dotColor
                }
            }, void 0, false, {
                fileName: "[project]/components/actmap/shared/PathLabel.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this),
            folder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-0 truncate text-subtle",
                children: folder
            }, void 0, false, {
                fileName: "[project]/components/actmap/shared/PathLabel.tsx",
                lineNumber: 28,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0 text-foreground",
                children: name
            }, void 0, false, {
                fileName: "[project]/components/actmap/shared/PathLabel.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            tag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-auto shrink-0 pl-2 text-[11px] text-subtle",
                children: tag
            }, void 0, false, {
                fileName: "[project]/components/actmap/shared/PathLabel.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/shared/PathLabel.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = PathLabel;
var _c;
__turbopack_context__.k.register(_c, "PathLabel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/sidebar/CategorySidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategorySidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function CategorySidebar({ categories, totalFiles, activeCategory, onSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "ui-scale quiet-scroll min-w-0 overflow-y-auto border-r border-line py-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "px-6 pb-3 text-[16px] text-muted",
                children: [
                    "Categories · ",
                    totalFiles.toLocaleString(),
                    " files"
                ]
            }, void 0, true, {
                fileName: "[project]/components/actmap/sidebar/CategorySidebar.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: categories.map((category)=>{
                    const active = activeCategory === category.name;
                    const empty = category.count === 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-pressed": active,
                        onClick: ()=>onSelect(active ? null : category.name),
                        className: `flex w-full items-center justify-between px-6 py-[9px] text-left text-[18px] transition-colors ${active ? "bg-accent/15 text-foreground shadow-[inset_3px_0_0_var(--accent)]" : "hover:bg-surface"} ${empty && !active ? "text-muted" : "text-foreground"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: category.name
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/sidebar/CategorySidebar.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-3 tabular-nums text-muted",
                                children: category.count.toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/components/actmap/sidebar/CategorySidebar.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this)
                        ]
                    }, category.name, true, {
                        fileName: "[project]/components/actmap/sidebar/CategorySidebar.tsx",
                        lineNumber: 34,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/actmap/sidebar/CategorySidebar.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/actmap/sidebar/CategorySidebar.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c = CategorySidebar;
var _c;
__turbopack_context__.k.register(_c, "CategorySidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/actmap/sidebar/Resizer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Resizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Resizer({ side, width, minWidth, maxWidth, onResize }) {
    _s();
    const drag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function handlePointerDown(event) {
        event.preventDefault();
        drag.current = {
            startX: event.clientX,
            startWidth: width
        };
        event.currentTarget.setPointerCapture(event.pointerId);
    }
    function handlePointerMove(event) {
        if (!drag.current) return;
        const delta = event.clientX - drag.current.startX;
        const next = side === "left" ? drag.current.startWidth + delta : drag.current.startWidth - delta;
        onResize(Math.min(maxWidth, Math.max(minWidth, next)));
    }
    function handlePointerUp() {
        drag.current = null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        role: "separator",
        "aria-label": `Resize ${side} pane`,
        "aria-orientation": "vertical",
        "aria-valuenow": width,
        "aria-valuemin": minWidth,
        "aria-valuemax": maxWidth,
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        onPointerCancel: handlePointerUp,
        className: "group z-20 flex cursor-col-resize touch-none justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full w-px bg-line transition-colors group-hover:bg-accent"
        }, void 0, false, {
            fileName: "[project]/components/actmap/sidebar/Resizer.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/actmap/sidebar/Resizer.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(Resizer, "gIddYogjP+VVdD1QmmHwmANJEG4=");
_c = Resizer;
var _c;
__turbopack_context__.k.register(_c, "Resizer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analysis/analysis-header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalysisHeader",
    ()=>AnalysisHeader,
    "secondaryButton",
    ()=>secondaryButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function AnalysisHeader({ owner, repo, meta, actions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ui-scale flex min-h-16 shrink-0 flex-wrap items-center gap-x-5 gap-y-2 border-b border-line px-6 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "font-mono text-[22px] tracking-tight text-muted",
                children: [
                    owner && `${owner}/`,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold text-foreground",
                        children: repo
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analysis-header.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/analysis-header.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            meta,
            actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-auto flex items-center gap-3",
                children: actions
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-header.tsx",
                lineNumber: 27,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/analysis/analysis-header.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = AnalysisHeader;
const secondaryButton = "rounded-lg border border-line px-4 py-2 text-[15px] text-foreground transition-colors hover:bg-surface-2 disabled:opacity-60";
var _c;
__turbopack_context__.k.register(_c, "AnalysisHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analysis/analysis-progress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalysisProgress",
    ()=>AnalysisProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/analysis-header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$rerun$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/rerun-button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/status.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$analysis$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-analysis-progress.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$now$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-now.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pipeline/stages.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function stepStates(state) {
    const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageIndex"])(state.failed_stage ?? state.stage);
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STAGES"].map((_, index)=>{
        if (state.status === "complete") return "done";
        if (state.status === "failed" || state.status === "cancelled") {
            if (current < 0) return index === 0 ? "failed" : "pending";
            if (index < current) return "done";
            return index === current ? "failed" : "pending";
        }
        if (state.status === "queued" || current < 0) return "pending";
        if (index < current) return "done";
        return index === current ? "running" : "pending";
    });
}
function StepIcon({ state }) {
    const className = "h-[18px] w-[18px]";
    switch(state){
        case "done":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoneDot"], {
                className: `${className} text-foreground`
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-progress.tsx",
                lineNumber: 62,
                columnNumber: 14
            }, this);
        case "running":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RunningDot"], {
                className: `${className} text-foreground`
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-progress.tsx",
                lineNumber: 64,
                columnNumber: 14
            }, this);
        case "failed":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FailedMark"], {
                className: `${className} text-foreground`
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-progress.tsx",
                lineNumber: 66,
                columnNumber: 14
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PendingDot"], {
                className: `${className} text-muted`
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-progress.tsx",
                lineNumber: 68,
                columnNumber: 14
            }, this);
    }
}
_c = StepIcon;
function AnalysisProgress({ analysisId, owner, repo, initial }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial);
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$now$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNow"])();
    const onEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AnalysisProgress.useCallback[onEvent]": (_id, event)=>{
            setState({
                status: event.status,
                stage: event.stage,
                message: event.message,
                failed_stage: event.failed_stage,
                updated_at: event.updated_at ?? new Date().toISOString()
            });
        }
    }["AnalysisProgress.useCallback[onEvent]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$analysis$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalysisProgress"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnfinished"])(initial.status) ? [
        analysisId
    ] : [], onEvent);
    // Land on the map a moment after the last stage ticks over.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalysisProgress.useEffect": ()=>{
            if (state.status !== "complete") return;
            const timer = setTimeout({
                "AnalysisProgress.useEffect.timer": ()=>router.refresh()
            }["AnalysisProgress.useEffect.timer"], 250);
            return ({
                "AnalysisProgress.useEffect": ()=>clearTimeout(timer)
            })["AnalysisProgress.useEffect"];
        }
    }["AnalysisProgress.useEffect"], [
        state.status,
        router
    ]);
    const stale = now !== null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStale"])(state.status, state.updated_at, now);
    const steps = stepStates(state);
    const unfinished = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnfinished"])(state.status);
    const canRerun = !unfinished || stale;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full min-h-0 flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisHeader"], {
                owner: owner,
                repo: repo,
                meta: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusLabel"], {
                    status: state.status,
                    stale: stale
                }, void 0, false, {
                    fileName: "[project]/components/analysis/analysis-progress.tsx",
                    lineNumber: 115,
                    columnNumber: 15
                }, this),
                actions: canRerun ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$rerun$2d$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RerunButton"], {
                    analysisId: analysisId
                }, void 0, false, {
                    fileName: "[project]/components/analysis/analysis-progress.tsx",
                    lineNumber: 116,
                    columnNumber: 29
                }, this) : null
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-progress.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "space-y-5",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STAGES"].map((stage, index)=>{
                            const step = steps[index];
                            const showMessage = (step === "running" || step === "failed") && state.message;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-center gap-4 text-[17px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex w-60 items-center gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepIcon, {
                                                state: step
                                            }, void 0, false, {
                                                fileName: "[project]/components/analysis/analysis-progress.tsx",
                                                lineNumber: 129,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: step === "pending" ? "text-muted" : "text-foreground",
                                                children: stage.label
                                            }, void 0, false, {
                                                fileName: "[project]/components/analysis/analysis-progress.tsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/analysis/analysis-progress.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this),
                                    showMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: step === "failed" ? "text-bad" : "text-muted",
                                        children: state.message
                                    }, void 0, false, {
                                        fileName: "[project]/components/analysis/analysis-progress.tsx",
                                        lineNumber: 136,
                                        columnNumber: 19
                                    }, this),
                                    state.status === "queued" && index === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted",
                                        children: "Waiting to start"
                                    }, void 0, false, {
                                        fileName: "[project]/components/analysis/analysis-progress.tsx",
                                        lineNumber: 142,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, stage.id, true, {
                                fileName: "[project]/components/analysis/analysis-progress.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analysis-progress.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    state.status === "complete" && state.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-9 text-[17px] text-foreground",
                        children: state.message
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analysis-progress.tsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    state.status === "failed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-9 max-w-xl text-[15px] leading-6 text-muted",
                        children: [
                            "The run failed during",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-foreground",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STAGES"].find((item)=>item.id === (state.failed_stage ?? state.stage))?.label.toLowerCase() ?? "an unknown stage"
                            }, void 0, false, {
                                fileName: "[project]/components/analysis/analysis-progress.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this),
                            ". Nothing was left half-stored, and Re-run starts it again."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/analysis/analysis-progress.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this),
                    stale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-9 max-w-xl text-[15px] leading-6 text-warn",
                        children: "This run has not moved for several minutes, so it has probably stopped. Re-run starts it again."
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analysis-progress.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/analysis-progress.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/analysis/analysis-progress.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(AnalysisProgress, "xp0oygkksc2G5LlaR5wJRItF3zc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$now$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNow"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$analysis$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalysisProgress"]
    ];
});
_c1 = AnalysisProgress;
var _c, _c1;
__turbopack_context__.k.register(_c, "StepIcon");
__turbopack_context__.k.register(_c1, "AnalysisProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analysis/rerun-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RerunButton",
    ()=>RerunButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$data$3a$28907d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/(workspace)/data:28907d [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/analysis-header.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function RerunButton({ analysisId }) {
    _s();
    const [pending, startTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        disabled: pending,
        onClick: ()=>startTransition(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$data$3a$28907d__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["rerunAnalysis"])(analysisId)),
        className: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["secondaryButton"],
        children: pending ? "Starting…" : "Re-run"
    }, void 0, false, {
        fileName: "[project]/components/analysis/rerun-button.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(RerunButton, "VdycpLWWKWPshgRympCCcrNu/Wc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransition"]
    ];
});
_c = RerunButton;
var _c;
__turbopack_context__.k.register(_c, "RerunButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analysis/status.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DoneDot",
    ()=>DoneDot,
    "FailedMark",
    ()=>FailedMark,
    "PendingDot",
    ()=>PendingDot,
    "RunningDot",
    ()=>RunningDot,
    "StatusLabel",
    ()=>StatusLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function DoneDot({ className = "h-3.5 w-3.5" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        className: className,
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "8",
            cy: "8",
            r: "6",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/analysis/status.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/analysis/status.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = DoneDot;
function PendingDot({ className = "h-3.5 w-3.5" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        className: className,
        "aria-hidden": true,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
            cx: "8",
            cy: "8",
            r: "5.25",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.4",
            opacity: "0.55"
        }, void 0, false, {
            fileName: "[project]/components/analysis/status.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/analysis/status.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c1 = PendingDot;
function RunningDot({ className = "h-3.5 w-3.5" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        className: className,
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "5.5",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.4"
            }, void 0, false, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 2.5a5.5 5.5 0 0 1 0 11z",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/analysis/status.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_c2 = RunningDot;
function FailedMark({ className = "h-3.5 w-3.5" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 16 16",
        className: className,
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "5.75",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.4"
            }, void 0, false, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m5.6 5.6 4.8 4.8m0-4.8-4.8 4.8",
                stroke: "currentColor",
                strokeWidth: "1.4",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/analysis/status.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c3 = FailedMark;
function StatusLabel({ status, stale = false, stageLabel }) {
    if (stale) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "inline-flex items-center gap-2 text-warn",
            title: "This run has stopped responding",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PendingDot, {}, void 0, false, {
                    fileName: "[project]/components/analysis/status.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                "stale"
            ]
        }, void 0, true, {
            fileName: "[project]/components/analysis/status.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    switch(status){
        case "complete":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-2 text-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DoneDot, {}, void 0, false, {
                        fileName: "[project]/components/analysis/status.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    "complete"
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this);
        case "failed":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-2 text-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FailedMark, {}, void 0, false, {
                        fileName: "[project]/components/analysis/status.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    "failed"
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this);
        case "cancelled":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-2 text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FailedMark, {}, void 0, false, {
                        fileName: "[project]/components/analysis/status.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this),
                    "cancelled"
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, this);
        case "queued":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-2 text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PendingDot, {}, void 0, false, {
                        fileName: "[project]/components/analysis/status.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    "queued"
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex items-center gap-2 text-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RunningDot, {}, void 0, false, {
                        fileName: "[project]/components/analysis/status.tsx",
                        lineNumber: 89,
                        columnNumber: 11
                    }, this),
                    "running",
                    stageLabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-subtle",
                        children: [
                            "· ",
                            stageLabel
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/analysis/status.tsx",
                        lineNumber: 91,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/status.tsx",
                lineNumber: 88,
                columnNumber: 9
            }, this);
    }
}
_c4 = StatusLabel;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "DoneDot");
__turbopack_context__.k.register(_c1, "PendingDot");
__turbopack_context__.k.register(_c2, "RunningDot");
__turbopack_context__.k.register(_c3, "FailedMark");
__turbopack_context__.k.register(_c4, "StatusLabel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actmap/colors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extensionColors",
    ()=>extensionColors,
    "getExtensionColor",
    ()=>getExtensionColor
]);
const extensionColors = {
    ".ts": "#a78bfa",
    ".tsx": "#e879f9",
    ".js": "#fb7185",
    ".jsx": "#fb923c",
    ".mjs": "#a1a1aa",
    ".mts": "#a1a1aa",
    ".cts": "#a1a1aa",
    ".cjs": "#a1a1aa",
    ".css": "#60a5fa",
    ".scss": "#f472b6",
    ".json": "#fbbf24",
    ".md": "#a1a1aa",
    ".mdx": "#a1a1aa",
    ".html": "#fb923c",
    ".yml": "#2dd4bf",
    ".yaml": "#2dd4bf",
    ".svg": "#34d399",
    ".py": "#38bdf8",
    ".sql": "#f59e0b"
};
function getExtensionColor(extension) {
    return extensionColors[extension] || "#a1a1aa";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actmap/edges.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NO_FOCUS",
    ()=>NO_FOCUS,
    "buildEdgeShapes",
    ()=>buildEdgeShapes,
    "hasFocus",
    ()=>hasFocus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/layout.ts [app-client] (ecmascript)");
;
const NO_FOCUS = {
    file: null,
    node: null,
    mode: null,
    closure: null
};
function hasFocus(focus) {
    return focus.file !== null || focus.node !== null;
}
function rowCenter(box, index) {
    return box.y + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].header + index * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row / 2;
}
function anchorFor(box, side, file, rows, hiddenCount) {
    const x = side === "right" ? box.x + box.width : box.x;
    if (!box.open) return {
        x,
        y: box.y + box.height / 2
    };
    const visible = rows?.get(box.id) ?? [];
    const index = file ? visible.indexOf(file) : -1;
    if (index >= 0) return {
        x,
        y: rowCenter(box, index)
    };
    if (hiddenCount > 0 && file) {
        return {
            x,
            y: box.y + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].header + visible.length * __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].row + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].moreRow / 2
        };
    }
    return {
        x,
        y: box.y + __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["METRICS"].header / 2
    };
}
function curve(from, to, sameColumn, direction) {
    if (sameColumn) {
        const bulge = 70;
        return `M ${from.x} ${from.y} C ${from.x + bulge} ${from.y}, ${to.x + bulge} ${to.y}, ${to.x} ${to.y}`;
    }
    const reach = Math.max(48, Math.abs(to.x - from.x) * 0.5);
    return `M ${from.x} ${from.y} C ${from.x + direction * reach} ${from.y}, ${to.x - direction * reach} ${to.y}, ${to.x} ${to.y}`;
}
function widthFor(count) {
    return Math.min(3.4, 1.1 + Math.log2(count + 1) * 0.55);
}
function buildEdgeShapes(options) {
    const { edges, nodeOf, layout, rows, hidden, focus } = options;
    const aggregated = new Map();
    const individual = [];
    for (const edge of edges){
        const from = nodeOf.get(edge.sourceFile);
        const to = nodeOf.get(edge.targetFile);
        if (!from || !to || from === to) continue;
        const fromBox = layout.boxes.get(from);
        const toBox = layout.boxes.get(to);
        if (!fromBox || !toBox) continue;
        if (fromBox.open || toBox.open) {
            individual.push({
                from,
                to,
                source: edge.sourceFile,
                target: edge.targetFile
            });
            continue;
        }
        const key = `${from}|${to}`;
        const group = aggregated.get(key) ?? {
            from,
            to,
            pairs: []
        };
        group.pairs.push([
            edge.sourceFile,
            edge.targetFile
        ]);
        aggregated.set(key, group);
    }
    const active = hasFocus(focus);
    function classify(source, target, from, to) {
        if (!active) return "normal";
        if (focus.mode && focus.closure) {
            const inside = focus.closure.has(source) && focus.closure.has(target);
            if (!inside) return "dim";
            return focus.mode === "blast-radius" ? "in" : "out";
        }
        if (focus.file) {
            if (source === focus.file) return "out";
            if (target === focus.file) return "in";
            return "dim";
        }
        if (focus.node) {
            if (from === focus.node) return "out";
            if (to === focus.node) return "in";
            return "dim";
        }
        return "normal";
    }
    function route(from, to, source, target) {
        const a = layout.boxes.get(from);
        const b = layout.boxes.get(to);
        const sameColumn = Math.abs(a.x - b.x) < 1;
        const forward = a.x < b.x;
        const start = anchorFor(a, forward || sameColumn ? "right" : "left", source, rows, hidden.get(from) ?? 0);
        const end = anchorFor(b, forward ? "left" : "right", target, rows, hidden.get(to) ?? 0);
        return curve(start, end, sameColumn, forward ? 1 : -1);
    }
    const shapes = [];
    for (const group of aggregated.values()){
        let tone = "dim";
        if (!active) {
            tone = "normal";
        } else {
            for (const [source, target] of group.pairs){
                const next = classify(source, target, group.from, group.to);
                if (next !== "dim") {
                    tone = next;
                    break;
                }
            }
        }
        const d = route(group.from, group.to, null, null);
        if (!d) continue;
        shapes.push({
            key: `${group.from}|${group.to}`,
            d,
            width: widthFor(group.pairs.length),
            tone
        });
    }
    for (const edge of individual){
        const d = route(edge.from, edge.to, edge.source, edge.target);
        if (!d) continue;
        shapes.push({
            key: `${edge.source}->${edge.target}`,
            d,
            width: 1.2,
            tone: classify(edge.source, edge.target, edge.from, edge.to)
        });
    }
    // Strong edges paint last so they are never hidden under faint ones.
    const order = {
        dim: 0,
        normal: 1,
        in: 2,
        out: 3
    };
    return shapes.sort((a, b)=>order[a.tone] - order[b.tone]);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actmap/entrypoints.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getEntrypointPaths",
    ()=>getEntrypointPaths,
    "isFrameworkEntrypoint",
    ()=>isFrameworkEntrypoint
]);
const ENTRY_POINT_NAMES = new Set([
    "page",
    "route",
    "layout",
    "template",
    "default",
    "error",
    "not-found",
    "loading",
    "global-error",
    "middleware",
    "proxy",
    "instrumentation",
    "sitemap",
    "robots",
    "icon",
    "apple-icon",
    "opengraph-image",
    "twitter-image",
    "_app",
    "_document",
    "_error"
]);
const CONFIG_NAMES = [
    "next.config",
    "vite.config",
    "webpack.config",
    "postcss.config",
    "tailwind.config",
    "eslint.config",
    ".eslintrc",
    "tsconfig",
    "jsconfig",
    "babel.config",
    "jest.config",
    "vitest.config",
    "playwright.config",
    "prettier.config"
];
function getBaseName(filePath) {
    const fileName = filePath.split("/").pop() ?? "";
    return fileName.replace(/\.[^.]+$/, "").toLowerCase();
}
function isFrameworkEntrypoint(file) {
    const baseName = getBaseName(file.path);
    if (ENTRY_POINT_NAMES.has(baseName)) {
        return true;
    }
    if (CONFIG_NAMES.some((name)=>baseName.startsWith(name))) {
        return true;
    }
    if (baseName === "package" || baseName === "manifest") {
        return true;
    }
    return false;
}
function getEntrypointPaths(files) {
    return new Set(files.filter(isFrameworkEntrypoint).map((file)=>file.path));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actmap/fold.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TARGET_NODE_COUNT",
    ()=>TARGET_NODE_COUNT,
    "foldRepository",
    ()=>foldRepository
]);
const TARGET_NODE_COUNT = 24;
const MIN_THRESHOLD = 2;
function parentOf(directory) {
    if (directory === ".") return null;
    const slash = directory.lastIndexOf("/");
    return slash === -1 ? "." : directory.slice(0, slash);
}
function depthOf(directory) {
    return directory === "." ? 0 : directory.split("/").length;
}
/**
 * One folding pass. Every directory starts as its own node. Working from the
 * deepest directory upward, any directory holding fewer than `threshold`
 * files merges into its parent.
 *
 * Each depth is decided from a snapshot taken before that depth merges, so a
 * merge never changes what another directory at the same depth sees.
 */ function foldAt(files, threshold) {
    const directories = new Map();
    function ensure(directory) {
        let current = directory;
        while(current !== null && !directories.has(current)){
            directories.set(current, []);
            current = parentOf(current);
        }
    }
    for (const file of files){
        const directory = file.folderPath || ".";
        ensure(directory);
        directories.get(directory).push(file);
    }
    let deepest = 0;
    for (const directory of directories.keys()){
        deepest = Math.max(deepest, depthOf(directory));
    }
    for(let depth = deepest; depth >= 1; depth--){
        const level = [
            ...directories.keys()
        ].filter((directory)=>depthOf(directory) === depth);
        const snapshot = new Map(level.map((directory)=>[
                directory,
                directories.get(directory).length
            ]));
        for (const directory of level){
            if (snapshot.get(directory) >= threshold) continue;
            const parent = parentOf(directory);
            directories.get(parent).push(...directories.get(directory));
            directories.delete(directory);
        }
    }
    for (const [directory, members] of [
        ...directories
    ]){
        if (members.length === 0) directories.delete(directory);
    }
    return directories;
}
/** The shortest trailing path that is still unique among what is on screen. */ function uniqueLabels(paths) {
    const labels = new Map();
    const segmentsByPath = new Map(paths.map((path)=>[
            path,
            path === "." ? [] : path.split("/")
        ]));
    for (const path of paths){
        if (path === ".") {
            labels.set(path, "(root)");
            continue;
        }
        const segments = segmentsByPath.get(path);
        for(let length = 1; length <= segments.length; length++){
            const candidate = segments.slice(-length).join("/");
            const clash = paths.some((other)=>{
                if (other === path || other === ".") return false;
                const otherSegments = segmentsByPath.get(other);
                return otherSegments.slice(-length).join("/") === candidate;
            });
            if (!clash || length === segments.length) {
                labels.set(path, candidate);
                break;
            }
        }
    }
    return labels;
}
function foldRepository(files, edges, target = TARGET_NODE_COUNT) {
    let threshold = MIN_THRESHOLD;
    let folded = foldAt(files, threshold);
    while(folded.size > target && threshold <= files.length){
        threshold += 1;
        folded = foldAt(files, threshold);
    }
    const paths = [
        ...folded.keys()
    ].sort((a, b)=>a.localeCompare(b));
    const labels = uniqueLabels(paths);
    const nodeOf = new Map();
    const nodes = paths.map((path)=>{
        const members = [
            ...folded.get(path)
        ].sort((a, b)=>a.path.localeCompare(b.path));
        for (const file of members)nodeOf.set(file.path, path);
        return {
            id: path,
            path,
            label: labels.get(path) ?? path,
            files: members,
            fanIn: 0,
            fanOut: 0
        };
    });
    const byId = new Map(nodes.map((node)=>[
            node.id,
            node
        ]));
    for (const edge of edges){
        const from = nodeOf.get(edge.sourceFile);
        const to = nodeOf.get(edge.targetFile);
        if (!from || !to || from === to) continue;
        byId.get(from).fanOut += 1;
        byId.get(to).fanIn += 1;
    }
    return {
        nodes,
        nodeOf,
        threshold
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actmap/graph.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlastRadius",
    ()=>getBlastRadius,
    "getDependencyChain",
    ()=>getDependencyChain,
    "walkGraph",
    ()=>walkGraph
]);
function walkGraph({ filePath, edges, direction, maxDepth = 2 }) {
    if (maxDepth < 1) return [];
    const adjacency = new Map();
    function addConnection(from, to) {
        if (!adjacency.has(from)) {
            adjacency.set(from, new Set());
        }
        adjacency.get(from).add(to);
    }
    for (const edge of edges){
        if (direction === "outgoing") {
            addConnection(edge.sourceFile, edge.targetFile);
        } else {
            addConnection(edge.targetFile, edge.sourceFile);
        }
    }
    const visited = new Set([
        filePath
    ]);
    const queue = [
        {
            path: filePath,
            depth: 0
        }
    ];
    const results = [];
    let head = 0;
    while(head < queue.length){
        const current = queue[head++];
        if (current.depth >= maxDepth) continue;
        const neighbours = adjacency.get(current.path);
        if (!neighbours) continue;
        for (const path of neighbours){
            if (visited.has(path)) continue;
            visited.add(path);
            const result = {
                path,
                depth: current.depth + 1
            };
            results.push(result);
            queue.push(result);
        }
    }
    return results;
}
function getBlastRadius(filePath, edges, maxDepth = 2) {
    return walkGraph({
        filePath,
        edges,
        direction: "incoming",
        maxDepth
    });
}
function getDependencyChain(filePath, edges, maxDepth = 2) {
    return walkGraph({
        filePath,
        edges,
        direction: "outgoing",
        maxDepth
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actmap/insights.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INSIGHT_TEXT",
    ()=>INSIGHT_TEXT,
    "OVERSIZED_LINE_COUNT",
    ()=>OVERSIZED_LINE_COUNT,
    "getRepositoryInsights",
    ()=>getRepositoryInsights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$entrypoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/entrypoints.ts [app-client] (ecmascript)");
;
const INSIGHT_TEXT = {
    unused: "Nothing in the import graph reaches these files. Pages, routes, layouts, middleware and config are left out, because the framework reaches those.",
    dependents: "An unusually large number of files import these, so changes here travel far.",
    cycle: "Each file in this loop imports the next, and the last imports the first.",
    oversized: "These files are long enough that they are worth reading carefully before changing."
};
const OVERSIZED_LINE_COUNT = 500;
function getImporters(edges) {
    const importers = new Map();
    for (const edge of edges){
        if (!importers.has(edge.targetFile)) {
            importers.set(edge.targetFile, new Set());
        }
        importers.get(edge.targetFile).add(edge.sourceFile);
    }
    return importers;
}
/**
 * Turns a strongly connected component into one concrete cycle that can be
 * walked by hand: each file imports the next, and the last imports the first.
 * Breadth-first search from the first file back to itself, staying inside the
 * component, so the loop is the shortest one through that file.
 */ function orderCycle(component, adjacency) {
    const members = new Set(component);
    const start = [
        ...component
    ].sort()[0];
    const parent = new Map();
    const queue = [];
    for (const next of adjacency.get(start) ?? []){
        if (!members.has(next) || parent.has(next)) continue;
        parent.set(next, start);
        queue.push(next);
    }
    for(let head = 0; head < queue.length; head++){
        const node = queue[head];
        if (adjacency.get(node)?.includes(start)) {
            const cycle = [
                node
            ];
            let current = node;
            while(parent.get(current) !== start){
                current = parent.get(current);
                cycle.push(current);
            }
            cycle.push(start);
            return cycle.reverse();
        }
        for (const next of adjacency.get(node) ?? []){
            if (!members.has(next) || parent.has(next) || next === start) continue;
            parent.set(next, node);
            queue.push(next);
        }
    }
    return component;
}
/**
 * Finds strongly connected components using iterative Kosaraju.
 * A component with multiple files, or a self-loop, is a cycle.
 */ function findImportCycles(edges) {
    const adjacency = new Map();
    const reverse = new Map();
    const nodes = new Set();
    for (const edge of edges){
        nodes.add(edge.sourceFile);
        nodes.add(edge.targetFile);
        if (!adjacency.has(edge.sourceFile)) adjacency.set(edge.sourceFile, []);
        if (!reverse.has(edge.targetFile)) reverse.set(edge.targetFile, []);
        adjacency.get(edge.sourceFile).push(edge.targetFile);
        reverse.get(edge.targetFile).push(edge.sourceFile);
    }
    const visited = new Set();
    const order = [];
    for (const start of nodes){
        if (visited.has(start)) continue;
        visited.add(start);
        const stack = [
            {
                node: start,
                index: 0
            }
        ];
        while(stack.length > 0){
            const current = stack[stack.length - 1];
            const neighbours = adjacency.get(current.node) ?? [];
            if (current.index < neighbours.length) {
                const next = neighbours[current.index++];
                if (visited.has(next)) continue;
                visited.add(next);
                stack.push({
                    node: next,
                    index: 0
                });
            } else {
                order.push(current.node);
                stack.pop();
            }
        }
    }
    visited.clear();
    const cycles = [];
    for(let i = order.length - 1; i >= 0; i--){
        const start = order[i];
        if (visited.has(start)) continue;
        const component = [];
        const stack = [
            start
        ];
        visited.add(start);
        while(stack.length > 0){
            const node = stack.pop();
            component.push(node);
            for (const next of reverse.get(node) ?? []){
                if (visited.has(next)) continue;
                visited.add(next);
                stack.push(next);
            }
        }
        const hasSelfLoop = component.some((node)=>(adjacency.get(node) ?? []).includes(node));
        if (component.length > 1) {
            cycles.push(orderCycle(component, adjacency));
        } else if (hasSelfLoop) {
            cycles.push(component);
        }
    }
    return cycles;
}
function getHighDependentThreshold(counts) {
    if (counts.length === 0) return Infinity;
    const mean = counts.reduce((sum, count)=>sum + count, 0) / counts.length;
    const variance = counts.reduce((sum, count)=>sum + (count - mean) ** 2, 0) / counts.length;
    const standardDeviation = Math.sqrt(variance);
    return Math.max(5, Math.ceil(mean + 2 * standardDeviation));
}
function getRepositoryInsights({ files, edges }) {
    const insights = [];
    const filePaths = new Set(files.map((file)=>file.path));
    const entrypoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$entrypoints$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getEntrypointPaths"])(files);
    const importers = getImporters(edges);
    // Files with no incoming imports, excluding entry points.
    const unusedFiles = files.filter((file)=>!entrypoints.has(file.path) && (importers.get(file.path)?.size ?? 0) === 0).map((file)=>file.path);
    if (unusedFiles.length > 0) {
        insights.push({
            id: "unused-files",
            title: "Files nothing imports",
            description: INSIGHT_TEXT.unused,
            paths: unusedFiles
        });
    }
    // Files with unusually many unique importers.
    const dependentCounts = files.map((file)=>importers.get(file.path)?.size ?? 0);
    const threshold = getHighDependentThreshold(dependentCounts);
    const highDependents = files.filter((file)=>(importers.get(file.path)?.size ?? 0) >= threshold).sort((a, b)=>(importers.get(b.path)?.size ?? 0) - (importers.get(a.path)?.size ?? 0));
    if (highDependents.length > 0) {
        insights.push({
            id: "high-dependents",
            title: "High number of dependents",
            description: INSIGHT_TEXT.dependents,
            paths: highDependents.map((file)=>file.path)
        });
    }
    // Import cycles.
    const cycles = findImportCycles(edges).filter((cycle)=>cycle.every((path)=>filePaths.has(path)));
    for(let index = 0; index < cycles.length; index++){
        insights.push({
            id: `import-cycle-${index + 1}`,
            title: cycles.length > 1 ? `Import cycle ${index + 1}` : "Import cycle",
            description: INSIGHT_TEXT.cycle,
            paths: cycles[index]
        });
    }
    // Oversized files.
    const oversizedFiles = files.filter((file)=>file.lineCount > OVERSIZED_LINE_COUNT).sort((a, b)=>b.lineCount - a.lineCount);
    if (oversizedFiles.length > 0) {
        insights.push({
            id: "oversized-files",
            title: "Oversized files",
            description: INSIGHT_TEXT.oversized,
            paths: oversizedFiles.map((file)=>file.path)
        });
    }
    return insights;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actmap/layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "METRICS",
    ()=>METRICS,
    "closedSize",
    ()=>closedSize,
    "computeLayout",
    ()=>computeLayout,
    "openSize",
    ()=>openSize
]);
const METRICS = {
    closedMinWidth: 136,
    closedMaxWidth: 260,
    openWidth: 312,
    header: 54,
    row: 28,
    moreRow: 28,
    panelPadding: 8,
    gapX: 150,
    gapY: 22,
    gapSameLayer: 44,
    maxColumnHeight: 560,
    maxVisibleRows: 14
};
function closedSize(node) {
    // The counts line ("15/15 files ←11 10→") has to fit inside the box too, so
    // the width is the larger of what the name needs and what the counts need.
    // It is measured on the longest form (the "n/n files" shown while a category
    // is highlighted), at about 7.4px per character of 12px mono, plus the gaps.
    const n = node.files.length;
    const countsChars = `${n}/${n} files`.length + `←${node.fanIn}`.length + `${node.fanOut}→`.length;
    const countsWidth = countsChars * 7.4 + 12 + 8 + 32;
    const width = Math.min(METRICS.closedMaxWidth, Math.max(METRICS.closedMinWidth, node.label.length * 8.2 + 44, countsWidth));
    const height = 56 + Math.min(34, Math.round(Math.sqrt(node.fanIn) * 5));
    return {
        width,
        height
    };
}
function openSize(plan) {
    return {
        width: METRICS.openWidth,
        height: METRICS.header + plan.rows * METRICS.row + (plan.hidden > 0 ? METRICS.moreRow : 0) + METRICS.panelPadding
    };
}
/** Iterative Tarjan. A repository is allowed to be deep, so nothing recurses. */ function stronglyConnected(ids, successors) {
    const index = new Map();
    const low = new Map();
    const onStack = new Set();
    const stack = [];
    const component = new Map();
    let counter = 0;
    let components = 0;
    for (const root of ids){
        if (index.has(root)) continue;
        const work = [
            {
                node: root,
                next: 0
            }
        ];
        index.set(root, counter);
        low.set(root, counter);
        counter++;
        stack.push(root);
        onStack.add(root);
        while(work.length > 0){
            const frame = work[work.length - 1];
            const out = successors.get(frame.node) ?? [];
            if (frame.next < out.length) {
                const next = out[frame.next++];
                if (!index.has(next)) {
                    index.set(next, counter);
                    low.set(next, counter);
                    counter++;
                    stack.push(next);
                    onStack.add(next);
                    work.push({
                        node: next,
                        next: 0
                    });
                } else if (onStack.has(next)) {
                    low.set(frame.node, Math.min(low.get(frame.node), index.get(next)));
                }
                continue;
            }
            if (low.get(frame.node) === index.get(frame.node)) {
                let member;
                do {
                    member = stack.pop();
                    onStack.delete(member);
                    component.set(member, components);
                }while (member !== frame.node)
                components++;
            }
            work.pop();
            const parent = work[work.length - 1];
            if (parent) {
                low.set(parent.node, Math.min(low.get(parent.node), low.get(frame.node)));
            }
        }
    }
    return component;
}
function computeLayout(options) {
    const { nodes, nodeEdges, open, rowPlans } = options;
    const ids = nodes.map((node)=>node.id);
    const byId = new Map(nodes.map((node)=>[
            node.id,
            node
        ]));
    const successors = new Map(ids.map((id)=>[
            id,
            []
        ]));
    const predecessors = new Map(ids.map((id)=>[
            id,
            []
        ]));
    for (const key of [
        ...nodeEdges.keys()
    ].sort()){
        const [from, to] = key.split("|");
        successors.get(from).push(to);
        predecessors.get(to).push(from);
    }
    // Folders that nothing connects to would stack into one very tall column,
    // so they are packed into a grid underneath the connected graph instead.
    const connected = ids.filter((id)=>successors.get(id).length + predecessors.get(id).length > 0);
    const isolated = ids.filter((id)=>!connected.includes(id)).sort((a, b)=>byId.get(a).label.localeCompare(byId.get(b).label));
    // Layers: longest path over the condensation, so cycles share a column.
    const component = stronglyConnected(connected, successors);
    const componentCount = Math.max(-1, ...component.values()) + 1;
    const componentSuccessors = Array.from({
        length: componentCount
    }, ()=>new Set());
    const indegree = new Array(componentCount).fill(0);
    for (const [from, outs] of successors){
        for (const to of outs){
            const a = component.get(from);
            const b = component.get(to);
            if (a !== b && !componentSuccessors[a].has(b)) {
                componentSuccessors[a].add(b);
                indegree[b]++;
            }
        }
    }
    const componentLayer = new Array(componentCount).fill(0);
    const ready = [];
    for(let index = 0; index < componentCount; index++){
        if (indegree[index] === 0) ready.push(index);
    }
    for(let head = 0; head < ready.length; head++){
        const current = ready[head];
        for (const next of componentSuccessors[current]){
            componentLayer[next] = Math.max(componentLayer[next], componentLayer[current] + 1);
            indegree[next]--;
            if (indegree[next] === 0) ready.push(next);
        }
    }
    const layerOf = new Map(connected.map((id)=>[
            id,
            componentLayer[component.get(id)]
        ]));
    const layerCount = Math.max(0, ...layerOf.values()) + 1;
    const layers = Array.from({
        length: layerCount
    }, ()=>[]);
    for (const id of [
        ...connected
    ].sort((a, b)=>byId.get(a).label.localeCompare(byId.get(b).label))){
        layers[layerOf.get(id)].push(id);
    }
    // Ordering inside a layer: a few barycentre sweeps to untangle crossings.
    const position = new Map();
    function refreshPositions() {
        for (const layer of layers){
            layer.forEach((id, index)=>position.set(id, (index + 0.5) / layer.length));
        }
    }
    refreshPositions();
    for(let sweep = 0; sweep < 8; sweep++){
        const downward = sweep % 2 === 0;
        const order = downward ? layers.map((_, index)=>index) : layers.map((_, index)=>layers.length - 1 - index);
        for (const layerIndex of order){
            const layer = layers[layerIndex];
            const scored = layer.map((id, index)=>{
                const neighbours = [
                    ...downward ? predecessors.get(id) : successors.get(id)
                ].filter((other)=>other !== id);
                const score = neighbours.length ? neighbours.reduce((sum, other)=>sum + position.get(other), 0) / neighbours.length : position.get(id);
                return {
                    id,
                    score,
                    index
                };
            });
            scored.sort((a, b)=>a.score - b.score || a.index - b.index);
            layers[layerIndex] = scored.map((item)=>item.id);
            layers[layerIndex].forEach((id, index)=>position.set(id, (index + 0.5) / layers[layerIndex].length));
        }
    }
    // Geometry.
    const sizes = new Map();
    for (const node of nodes){
        sizes.set(node.id, open.has(node.id) ? openSize(rowPlans.get(node.id) ?? {
            rows: 0,
            hidden: 0
        }) : closedSize(node));
    }
    const columns = [];
    layers.forEach((layer, layerIndex)=>{
        let current = null;
        for (const id of layer){
            const size = sizes.get(id);
            if (!current || current.ids.length > 0 && current.height + METRICS.gapY + size.height > METRICS.maxColumnHeight) {
                current = {
                    layer: layerIndex,
                    ids: [],
                    width: 0,
                    height: 0
                };
                columns.push(current);
            }
            current.height += (current.ids.length > 0 ? METRICS.gapY : 0) + size.height;
            current.width = Math.max(current.width, size.width);
            current.ids.push(id);
        }
    });
    const tallest = Math.max(0, ...columns.map((column)=>column.height));
    const boxes = new Map();
    let cursorX = 0;
    columns.forEach((column, columnIndex)=>{
        let cursorY = (tallest - column.height) / 2;
        for (const id of column.ids){
            const size = sizes.get(id);
            boxes.set(id, {
                id,
                x: cursorX + (column.width - size.width) / 2,
                y: cursorY,
                width: size.width,
                height: size.height,
                open: open.has(id),
                layer: column.layer
            });
            cursorY += size.height + METRICS.gapY;
        }
        const next = columns[columnIndex + 1];
        cursorX += column.width + (next && next.layer === column.layer ? METRICS.gapSameLayer : METRICS.gapX);
    });
    // Pack the unconnected folders, wrapping at the connected graph's width.
    if (isolated.length > 0) {
        let connectedRight = 0;
        let connectedBottom = 0;
        for (const box of boxes.values()){
            connectedRight = Math.max(connectedRight, box.x + box.width);
            connectedBottom = Math.max(connectedBottom, box.y + box.height);
        }
        const wrapAt = Math.max(connectedRight, 900);
        const startY = boxes.size > 0 ? connectedBottom + 90 : 0;
        let cursorX = 0;
        let cursorY = startY;
        let rowHeight = 0;
        for (const id of isolated){
            const size = sizes.get(id);
            if (cursorX > 0 && cursorX + size.width > wrapAt) {
                cursorX = 0;
                cursorY += rowHeight + METRICS.gapY;
                rowHeight = 0;
            }
            boxes.set(id, {
                id,
                x: cursorX,
                y: cursorY,
                width: size.width,
                height: size.height,
                open: open.has(id),
                layer: layerCount
            });
            cursorX += size.width + 40;
            rowHeight = Math.max(rowHeight, size.height);
        }
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const box of boxes.values()){
        minX = Math.min(minX, box.x);
        minY = Math.min(minY, box.y);
        maxX = Math.max(maxX, box.x + box.width);
        maxY = Math.max(maxY, box.y + box.height);
    }
    if (boxes.size === 0) {
        minX = minY = 0;
        maxX = maxY = 1;
    }
    return {
        boxes,
        bounds: {
            minX,
            minY,
            maxX,
            maxY
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/actmap/model.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildModel",
    ()=>buildModel,
    "categoryOf",
    ()=>categoryOf,
    "edgeKey",
    ()=>edgeKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/taxonomy/categories.ts [app-client] (ecmascript)");
;
function categoryOf(file) {
    return file.role ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["genericRoleOfKind"])(file.kind) ?? __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UNCLASSIFIED"];
}
function edgeKey(source, target) {
    return `${source}\u0000${target}`;
}
function buildModel(inputFiles, inputEdges, adapter = "generic") {
    const fileMap = new Map(inputFiles.map((file)=>[
            file.path,
            file
        ]));
    const edges = inputEdges.filter((edge)=>edge.sourceFile !== edge.targetFile && fileMap.has(edge.sourceFile) && fileMap.has(edge.targetFile));
    const imports = new Map();
    const importedBy = new Map();
    const edgeMap = new Map();
    for (const file of inputFiles){
        imports.set(file.path, []);
        importedBy.set(file.path, []);
    }
    for (const edge of edges){
        const key = edgeKey(edge.sourceFile, edge.targetFile);
        if (edgeMap.has(key)) continue;
        edgeMap.set(key, edge);
        imports.get(edge.sourceFile).push(edge.targetFile);
        importedBy.get(edge.targetFile).push(edge.sourceFile);
    }
    const files = inputFiles.map((file)=>({
            ...file,
            fanIn: importedBy.get(file.path).length,
            fanOut: imports.get(file.path).length
        }));
    const filesByPath = new Map(files.map((file)=>[
            file.path,
            file
        ]));
    // The list and its order come from the framework, never from the counts, so
    // the same repository always shows its categories in the same places.
    const counts = new Map();
    for (const file of files){
        counts.set(categoryOf(file), (counts.get(categoryOf(file)) ?? 0) + 1);
    }
    const known = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["taxonomyFor"])(adapter).categories;
    const categories = known.map((name)=>({
            name,
            count: counts.get(name) ?? 0
        }));
    // A role the list does not know (an older analysis) still shows, at the end.
    for (const [name, count] of counts){
        if (!known.includes(name)) categories.push({
            name,
            count
        });
    }
    return {
        files,
        edges: [
            ...edgeMap.values()
        ],
        fileMap: filesByPath,
        imports,
        importedBy,
        edgeMap,
        categories,
        totalLines: files.reduce((sum, file)=>sum + file.lineCount, 0)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-analysis-progress.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAnalysisProgress",
    ()=>useAnalysisProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browser.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/**
 * Live progress for each given analysis.
 *
 * The fast path is the private channel: a database trigger pushes every change
 * the moment it is written. Because a socket can fail to open (a missing
 * channel policy, a dropped connection, a sleeping laptop), the same row is also
 * read every couple of seconds while the run is unfinished, so the page keeps
 * moving either way. A finished run stops being read.
 */ const FALLBACK_INTERVAL_MS = 2000;
const TERMINAL = new Set([
    "complete",
    "failed",
    "cancelled"
]);
function useAnalysisProgress(analysisIds, onEvent) {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseBrowserClient"])();
    const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onEvent);
    const key = analysisIds.join("|");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAnalysisProgress.useEffect": ()=>{
            handler.current = onEvent;
        }
    }["useAnalysisProgress.useEffect"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAnalysisProgress.useEffect": ()=>{
            if (!supabase || !key) return;
            const ids = key.split("|");
            let cancelled = false;
            const channels = [];
            async function connect() {
                if (!supabase) return;
                await supabase.realtime.setAuth();
                if (cancelled) return;
                for (const id of ids){
                    const channel = supabase.channel(`analysis:${id}`, {
                        config: {
                            private: true
                        }
                    }).on("broadcast", {
                        event: "progress"
                    }, {
                        "useAnalysisProgress.useEffect.connect.channel": (message)=>{
                            handler.current(id, message.payload);
                        }
                    }["useAnalysisProgress.useEffect.connect.channel"]).subscribe({
                        "useAnalysisProgress.useEffect.connect.channel": async (status)=>{
                            if (status !== "SUBSCRIBED" || cancelled) return;
                            await readRow(id);
                        }
                    }["useAnalysisProgress.useEffect.connect.channel"]);
                    channels.push(channel);
                }
            }
            async function readRow(id) {
                if (!supabase) return null;
                const { data } = await supabase.from("analyses").select("status, stage, stage_message, error_message, failed_stage, updated_at").eq("id", id).maybeSingle();
                if (!data || cancelled) return null;
                handler.current(id, {
                    status: data.status,
                    stage: data.stage,
                    message: data.error_message ?? data.stage_message,
                    failed_stage: data.failed_stage,
                    updated_at: data.updated_at
                });
                return data.status;
            }
            const waiting = new Set(ids);
            let reading = false;
            const poll = setInterval({
                "useAnalysisProgress.useEffect.poll": async ()=>{
                    if (reading || cancelled || waiting.size === 0) return;
                    reading = true;
                    try {
                        for (const id of [
                            ...waiting
                        ]){
                            const status = await readRow(id);
                            if (status && TERMINAL.has(status)) waiting.delete(id);
                        }
                    } catch  {
                    // A failed read is retried on the next tick.
                    } finally{
                        reading = false;
                    }
                }
            }["useAnalysisProgress.useEffect.poll"], FALLBACK_INTERVAL_MS);
            void connect();
            return ({
                "useAnalysisProgress.useEffect": ()=>{
                    cancelled = true;
                    clearInterval(poll);
                    for (const channel of channels){
                        void supabase.removeChannel(channel);
                    }
                }
            })["useAnalysisProgress.useEffect"];
        }
    }["useAnalysisProgress.useEffect"], [
        supabase,
        key
    ]);
}
_s(useAnalysisProgress, "rzxphIpqdVdWTEvKdlyBBF2FfsY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSupabaseBrowserClient"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/use-now.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNow",
    ()=>useNow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const TICK_MS = 15_000;
let current = 0;
let timer = null;
const listeners = new Set();
function subscribe(listener) {
    listeners.add(listener);
    if (timer === null) {
        current = Date.now();
        timer = setInterval(()=>{
            current = Date.now();
            listeners.forEach((notify)=>notify());
        }, TICK_MS);
    }
    return ()=>{
        listeners.delete(listener);
        if (listeners.size === 0 && timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    };
}
const getSnapshot = ()=>current;
const getServerSnapshot = ()=>0;
function useNow() {
    _s();
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, getServerSnapshot);
    return value === 0 ? null : value;
}
_s(useNow, "0m5zjHAlqiPhh1IFS871jd56ias=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/pipeline/stages.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared by server and browser code. No server-only imports here.
__turbopack_context__.s([
    "STAGES",
    ()=>STAGES,
    "STALE_AFTER_MS",
    ()=>STALE_AFTER_MS,
    "isStale",
    ()=>isStale,
    "isUnfinished",
    ()=>isUnfinished,
    "splitRepositoryName",
    ()=>splitRepositoryName,
    "stageIndex",
    ()=>stageIndex
]);
const STAGES = [
    {
        id: "fetch",
        label: "Fetch archive"
    },
    {
        id: "select",
        label: "Select files"
    },
    {
        id: "parse",
        label: "Parse imports"
    },
    {
        id: "store",
        label: "Store map"
    }
];
const STALE_AFTER_MS = 5 * 60 * 1000;
function isUnfinished(status) {
    return status === "queued" || status === "parsing" || status === "running";
}
function isStale(status, updatedAt, now = Date.now()) {
    if (!isUnfinished(status) || !updatedAt) return false;
    const timestamp = new Date(updatedAt).getTime();
    if (Number.isNaN(timestamp)) return false;
    return now - timestamp > STALE_AFTER_MS;
}
function stageIndex(stage) {
    if (!stage) return -1;
    return STAGES.findIndex((item)=>item.id === stage);
}
function splitRepositoryName(repositoryUrl, fallback) {
    try {
        const parts = new URL(repositoryUrl).pathname.split("/").filter(Boolean);
        if (parts.length >= 2) {
            return {
                owner: parts[0],
                repo: parts[1].replace(/\.git$/, "")
            };
        }
    } catch  {
    // Fall through to the stored project name.
    }
    const [owner, repo] = fallback.includes("/") ? fallback.split("/") : [
        "",
        fallback
    ];
    return {
        owner: owner ?? "",
        repo: repo ?? fallback
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/browser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSupabaseBrowserClient",
    ()=>useSupabaseBrowserClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useSession__as__m$3e$__$3c$export__m__as__useSession$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/react/index.mjs [app-client] (ecmascript) <export useSession as m> <export m as useSession>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useSupabaseBrowserClient() {
    _s();
    const { session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useSession__as__m$3e$__$3c$export__m__as__useSession$3e$__["useSession"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useSupabaseBrowserClient.useMemo": ()=>{
            const url = ("TURBOPACK compile-time value", "https://dlgoutdsqbvcoyfrinze.supabase.co");
            const key = ("TURBOPACK compile-time value", "sb_publishable_WtvdQFOHHLNTMk7vNUNS5g_YNtzr3Sm");
            if (!url || !key || !session) return null;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, key, {
                accessToken: {
                    "useSupabaseBrowserClient.useMemo": async ()=>await session.getToken() ?? null
                }["useSupabaseBrowserClient.useMemo"]
            });
        }
    }["useSupabaseBrowserClient.useMemo"], [
        session
    ]);
}
_s(useSupabaseBrowserClient, "B+1iIGjsYdWF2thaTA2V9JaU3FQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useSession__as__m$3e$__$3c$export__m__as__useSession$3e$__["useSession"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/parser/taxonomy/categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ __turbopack_context__.s([
    "GENERIC_ROLES",
    ()=>GENERIC_ROLES,
    "TAXONOMIES",
    ()=>TAXONOMIES,
    "UNCLASSIFIED",
    ()=>UNCLASSIFIED,
    "frameworkLabel",
    ()=>frameworkLabel,
    "genericRoleOfKind",
    ()=>genericRoleOfKind,
    "taxonomyFor",
    ()=>taxonomyFor
]);
const UNCLASSIFIED = "Unclassified";
const GENERIC_ROLES = {
    source: "Source",
    typeDeclarations: "Type declarations",
    configuration: "Configuration",
    documentation: "Documentation",
    tests: "Tests"
};
const GENERIC = {
    id: "generic",
    label: "None detected",
    categories: [
        GENERIC_ROLES.source,
        GENERIC_ROLES.typeDeclarations,
        GENERIC_ROLES.configuration,
        GENERIC_ROLES.documentation,
        GENERIC_ROLES.tests,
        UNCLASSIFIED
    ],
    reachedBy: {}
};
const NEXT = {
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
        UNCLASSIFIED
    ],
    reachedBy: {
        "Page routes": "Next.js page route",
        "API endpoints": "Next.js route handler",
        "Layouts": "Next.js layout",
        "Loading & error UI": "Next.js special file",
        "Middleware": "Next.js middleware",
        "Metadata files": "Next.js metadata file",
        "Instrumentation": "Next.js instrumentation hook"
    }
};
const NEST = {
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
        UNCLASSIFIED
    ],
    reachedBy: {
        Controllers: "NestJS controller",
        Bootstrap: "Node entry point"
    }
};
const REACT = {
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
        UNCLASSIFIED
    ],
    reachedBy: {}
};
const EXPRESS = {
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
        UNCLASSIFIED
    ],
    reachedBy: {
        "App setup": "Node entry point"
    }
};
const TAXONOMIES = {
    generic: GENERIC,
    nextjs: NEXT,
    nestjs: NEST,
    react: REACT,
    express: EXPRESS
};
function taxonomyFor(adapterId) {
    return adapterId && TAXONOMIES[adapterId] || GENERIC;
}
function frameworkLabel(adapterId) {
    return taxonomyFor(adapterId).label;
}
function genericRoleOfKind(kind) {
    switch(kind){
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0a7qy3mf_iywn._.js.map