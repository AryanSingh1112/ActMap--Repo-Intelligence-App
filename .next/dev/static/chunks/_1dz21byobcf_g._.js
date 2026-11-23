(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(workspace)/data:e891a0 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyseRepository",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"6086fbb1ae05ecbadb935f89614b780454901a72e0":{"name":"analyseRepository"}},"app/(workspace)/actions.ts",""] */ "use turbopack: no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("6086fbb1ae05ecbadb935f89614b780454901a72e0", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "analyseRepository");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analysis/analyses-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalysesTable",
    ()=>AnalysesTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useOrganization__as__u$3e$__$3c$export__u__as__useOrganization$3e$__ = __turbopack_context__.i("[project]/node_modules/@clerk/shared/dist/react/index.mjs [app-client] (ecmascript) <export useOrganization as u> <export u as useOrganization>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/analysis-form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/status.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$time$2d$ago$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/time-ago.tsx [app-client] (ecmascript)");
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
;
;
function AnalysesTable({ initial }) {
    _s();
    const { organization } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useOrganization__as__u$3e$__$3c$export__u__as__useOrganization$3e$__["useOrganization"])();
    // Live events patch the rows; a fresh server render replaces them.
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        source: initial,
        rows: initial
    });
    const rows = state.source === initial ? state.rows : initial;
    // Stale marking needs the browser clock, so it only exists after mount.
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$now$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNow"])();
    const unfinishedIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AnalysesTable.useMemo[unfinishedIds]": ()=>rows.filter({
                "AnalysesTable.useMemo[unfinishedIds]": (row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnfinished"])(row.status)
            }["AnalysesTable.useMemo[unfinishedIds]"]).map({
                "AnalysesTable.useMemo[unfinishedIds]": (row)=>row.id
            }["AnalysesTable.useMemo[unfinishedIds]"])
    }["AnalysesTable.useMemo[unfinishedIds]"], [
        rows
    ]);
    const onEvent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AnalysesTable.useCallback[onEvent]": (id, event)=>{
            setState({
                "AnalysesTable.useCallback[onEvent]": (current)=>{
                    const base = current.source === initial ? current.rows : initial;
                    return {
                        source: initial,
                        rows: base.map({
                            "AnalysesTable.useCallback[onEvent]": (row)=>row.id === id ? {
                                    ...row,
                                    status: event.status,
                                    stage: event.stage,
                                    stage_message: event.status === "failed" ? row.stage_message : event.message,
                                    error_message: event.status === "failed" ? event.message : null,
                                    updated_at: event.updated_at ?? new Date().toISOString(),
                                    completed_at: event.status === "complete" || event.status === "failed" ? new Date().toISOString() : row.completed_at
                                } : row
                        }["AnalysesTable.useCallback[onEvent]"])
                    };
                }
            }["AnalysesTable.useCallback[onEvent]"]);
        }
    }["AnalysesTable.useCallback[onEvent]"], [
        initial
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$analysis$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalysisProgress"])(unfinishedIds, onEvent);
    const complete = rows.filter((row)=>row.status === "complete").length;
    const failed = rows.filter((row)=>row.status === "failed").length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line px-6 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-semibold tracking-tight",
                        children: organization?.name ?? "Your team"
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analyses-table.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted",
                        children: [
                            rows.length,
                            " ",
                            rows.length === 1 ? "analysis" : "analyses"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/analysis/analyses-table.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisForm"], {}, void 0, false, {
                        fileName: "[project]/components/analysis/analyses-table.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex items-center gap-5 text-sm text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoneDot"], {
                                        className: "h-3 w-3 text-muted"
                                    }, void 0, false, {
                                        fileName: "[project]/components/analysis/analyses-table.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    complete,
                                    " complete"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/analysis/analyses-table.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            failed > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FailedMark"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/components/analysis/analyses-table.tsx",
                                        lineNumber: 107,
                                        columnNumber: 15
                                    }, this),
                                    failed,
                                    " failed"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/analysis/analyses-table.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/analysis/analyses-table.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/analyses-table.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            rows.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center px-6 py-28 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-lg font-medium",
                        children: "No analyses yet"
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analyses-table.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 max-w-sm text-sm leading-6 text-muted",
                        children: "Paste the URL of a public GitHub repository above and this team's first map will appear here."
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analyses-table.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/analyses-table.tsx",
                lineNumber: 115,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full table-fixed text-left text-[15px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b border-line text-muted",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-6 py-4 font-normal",
                                    children: "Repository"
                                }, void 0, false, {
                                    fileName: "[project]/components/analysis/analyses-table.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "w-[22%] px-4 py-4 font-normal",
                                    children: "State"
                                }, void 0, false, {
                                    fileName: "[project]/components/analysis/analyses-table.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "w-[10%] px-4 py-4 font-normal",
                                    children: "Commit"
                                }, void 0, false, {
                                    fileName: "[project]/components/analysis/analyses-table.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "w-[9%] px-4 py-4 text-right font-normal",
                                    children: "Started"
                                }, void 0, false, {
                                    fileName: "[project]/components/analysis/analyses-table.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "w-[9%] px-6 py-4 text-right font-normal",
                                    children: "Finished"
                                }, void 0, false, {
                                    fileName: "[project]/components/analysis/analyses-table.tsx",
                                    lineNumber: 130,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/analysis/analyses-table.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analyses-table.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: rows.map((row)=>{
                            const { owner, repo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitRepositoryName"])(row.project?.repository_url ?? "", row.project?.name ?? "unknown");
                            const stale = now !== null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStale"])(row.status, row.updated_at, now);
                            const stageLabel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STAGES"].find((stage)=>stage.id === row.stage)?.label;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-line transition-colors hover:bg-surface",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 align-top",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: `/analyses/${row.id}`,
                                                className: "block font-mono text-base text-muted",
                                                children: [
                                                    owner && `${owner}/`,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-foreground",
                                                        children: repo
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/analysis/analyses-table.tsx",
                                                        lineNumber: 152,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/analysis/analyses-table.tsx",
                                                lineNumber: 147,
                                                columnNumber: 21
                                            }, this),
                                            row.status === "failed" && row.error_message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-muted",
                                                children: row.error_message
                                            }, void 0, false, {
                                                fileName: "[project]/components/analysis/analyses-table.tsx",
                                                lineNumber: 156,
                                                columnNumber: 23
                                            }, this),
                                            !stale && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isUnfinished"])(row.status) && row.stage_message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-subtle",
                                                children: row.stage_message
                                            }, void 0, false, {
                                                fileName: "[project]/components/analysis/analyses-table.tsx",
                                                lineNumber: 160,
                                                columnNumber: 23
                                            }, this),
                                            stale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm text-warn",
                                                children: "This run stopped responding. Open it to re-run."
                                            }, void 0, false, {
                                                fileName: "[project]/components/analysis/analyses-table.tsx",
                                                lineNumber: 164,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/analysis/analyses-table.tsx",
                                        lineNumber: 146,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-4 align-top",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$status$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusLabel"], {
                                            status: row.status,
                                            stale: stale,
                                            stageLabel: stageLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/analysis/analyses-table.tsx",
                                            lineNumber: 171,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/analysis/analyses-table.tsx",
                                        lineNumber: 170,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-4 align-top font-mono text-muted",
                                        children: row.commit_sha ? row.commit_sha.slice(0, 7) : "–"
                                    }, void 0, false, {
                                        fileName: "[project]/components/analysis/analyses-table.tsx",
                                        lineNumber: 174,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-4 text-right align-top text-muted",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$time$2d$ago$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimeAgo"], {
                                            value: row.started_at ?? row.created_at
                                        }, void 0, false, {
                                            fileName: "[project]/components/analysis/analyses-table.tsx",
                                            lineNumber: 179,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/analysis/analyses-table.tsx",
                                        lineNumber: 178,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-6 py-4 text-right align-top text-muted",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$time$2d$ago$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimeAgo"], {
                                            value: row.completed_at
                                        }, void 0, false, {
                                            fileName: "[project]/components/analysis/analyses-table.tsx",
                                            lineNumber: 183,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/analysis/analyses-table.tsx",
                                        lineNumber: 182,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, row.id, true, {
                                fileName: "[project]/components/analysis/analyses-table.tsx",
                                lineNumber: 145,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/analysis/analyses-table.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/analysis/analyses-table.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/analysis/analyses-table.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
_s(AnalysesTable, "8XNMQFn6dSHm/Gw4nLzN1s9Km+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$shared$2f$dist$2f$react$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__useOrganization__as__u$3e$__$3c$export__u__as__useOrganization$3e$__["useOrganization"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$now$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNow"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$analysis$2d$progress$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalysisProgress"]
    ];
});
_c = AnalysesTable;
var _c;
__turbopack_context__.k.register(_c, "AnalysesTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/analysis/analysis-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalysisForm",
    ()=>AnalysisForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$data$3a$e891a0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/app/(workspace)/data:e891a0 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AnalysisForm() {
    _s();
    const [state, action, pending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionState"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$workspace$292f$data$3a$e891a0__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["analyseRepository"], undefined);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        action: action,
        className: "flex min-w-0 flex-1 items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative min-w-0 max-w-xl flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    name: "url",
                    type: "text",
                    required: true,
                    spellCheck: false,
                    autoComplete: "off",
                    disabled: pending,
                    placeholder: "https://github.com/owner/repo",
                    "aria-label": "Public GitHub repository URL",
                    "aria-invalid": state?.error ? true : undefined,
                    className: "w-full rounded-lg border border-line bg-background px-4 py-2.5 font-mono text-sm text-foreground outline-none placeholder:text-subtle focus:border-accent disabled:opacity-60"
                }, void 0, false, {
                    fileName: "[project]/components/analysis/analysis-form.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-form.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: pending,
                className: "rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60",
                children: pending ? "Starting…" : "Analyse"
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-form.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            state?.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "alert",
                className: "hidden text-sm text-bad lg:block",
                children: state.error
            }, void 0, false, {
                fileName: "[project]/components/analysis/analysis-form.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/analysis/analysis-form.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(AnalysisForm, "O/pOYHN0P00Z1LAvfkkxrc/Vw1Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useActionState"]
    ];
});
_c = AnalysisForm;
var _c;
__turbopack_context__.k.register(_c, "AnalysisForm");
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
"[project]/components/analysis/time-ago.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimeAgo",
    ()=>TimeAgo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$now$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/use-now.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function format(value, now) {
    const timestamp = new Date(value).getTime();
    if (Number.isNaN(timestamp)) return "—";
    const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));
    if (seconds < 45) return "just now";
    if (seconds < 3600) return `${Math.max(1, Math.round(seconds / 60))}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(value).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}
function TimeAgo({ value }) {
    _s();
    const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$now$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNow"])();
    if (!value) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        children: "—"
    }, void 0, false, {
        fileName: "[project]/components/analysis/time-ago.tsx",
        lineNumber: 27,
        columnNumber: 22
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
        dateTime: value,
        title: new Date(value).toLocaleString(),
        children: now === null ? " " : format(value, now)
    }, void 0, false, {
        fileName: "[project]/components/analysis/time-ago.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(TimeAgo, "t70lBptlS54ZF8dxX2pScDbDMW0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$use$2d$now$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNow"]
    ];
});
_c = TimeAgo;
var _c;
__turbopack_context__.k.register(_c, "TimeAgo");
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
]);

//# sourceMappingURL=_1dz21byobcf_g._.js.map