module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/(workspace)/analyses/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalysisPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$Explorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/actmap/Explorer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/analysis-header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$progress$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/analysis-progress.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$rerun$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/analysis/rerun-button.tsx [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../../lib/ai/status'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$load$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/load.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pipeline/stages.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
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
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function Skeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-pulse space-y-6 p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 w-72 rounded-lg bg-surface-2"
            }, void 0, false, {
                fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-6 w-56 rounded-lg bg-surface-2"
            }, void 0, false, {
                fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-6 w-64 rounded-lg bg-surface-2"
            }, void 0, false, {
                fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
async function Analysis({ params }) {
    const { id } = await params;
    if (!UUID.test(id)) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const { orgId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!orgId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/workspace");
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseServerClient"])();
    // Row-level security decides whether this analysis is visible at all. One
    // that belongs to another organization comes back empty, same as a bad id.
    const { data, error } = await supabase.from("analyses").select(`
      id,
      status,
      stage,
      stage_message,
      failed_stage,
      error_message,
      commit_sha,
      summary,
      coverage,
      stats,
      updated_at,
      project:projects ( name, repository_url )
    `).eq("id", id).maybeSingle();
    if (error) {
        console.error("Failed to load analysis:", error.code, error.message, error.details, error.hint);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-medium text-bad",
                    children: "Unable to load this analysis"
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-1 text-sm text-muted",
                    children: "Refresh and try again."
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this);
    }
    if (!data) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    const row = {
        ...data,
        project: Array.isArray(data.project) ? data.project[0] ?? null : data.project
    };
    const { owner, repo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["splitRepositoryName"])(row.project?.repository_url ?? "", row.project?.name ?? "unknown");
    if (row.status !== "complete") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$progress$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AnalysisProgress"], {
            analysisId: row.id,
            owner: owner,
            repo: repo,
            initial: {
                status: row.status,
                stage: row.stage,
                message: row.status === "failed" ? row.error_message : row.stage_message,
                failed_stage: row.failed_stage,
                updated_at: row.updated_at
            }
        }, `${row.id}:${row.status}:${row.updated_at}`, false, {
            fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this);
    }
    let repositoryData;
    try {
        repositoryData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$load$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadRepositoryData"])(supabase, {
            analysisId: row.id,
            name: repo,
            commitSha: row.commit_sha,
            adapter: row.stats?.adapter ?? "generic",
            detection: row.stats?.detection ?? null,
            coverage: row.coverage,
            rolesLabelled: Boolean(row.stats?.rolesLabelled)
        });
    } catch (loadError) {
        console.error("Failed to load the stored map:", loadError);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full min-h-0 flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AnalysisHeader"], {
                    owner: owner,
                    repo: repo,
                    actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$rerun$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RerunButton"], {
                        analysisId: row.id
                    }, void 0, false, {
                        fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                        lineNumber: 142,
                        columnNumber: 20
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                    lineNumber: 139,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium text-bad",
                            children: "The stored map could not be read"
                        }, void 0, false, {
                            fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-muted",
                            children: "Refresh, or re-run the analysis to store it again."
                        }, void 0, false, {
                            fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
            lineNumber: 138,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full min-h-0 flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AnalysisHeader"], {
                owner: owner,
                repo: repo,
                meta: row.commit_sha && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-mono text-[18px] text-muted",
                    title: `Analysed at commit ${row.commit_sha}`,
                    children: row.commit_sha.slice(0, 7)
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                    lineNumber: 162,
                    columnNumber: 13
                }, this),
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$rerun$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RerunButton"], {
                    analysisId: row.id
                }, void 0, false, {
                    fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                    lineNumber: 170,
                    columnNumber: 18
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$Explorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                data: repositoryData,
                analysisId: row.id,
                ai: aiStatus()
            }, void 0, false, {
                fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
function AnalysisPage({ params }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Skeleton, {}, void 0, false, {
            fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
            lineNumber: 184,
            columnNumber: 25
        }, this),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Analysis, {
            params: params
        }, void 0, false, {
            fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(workspace)/analyses/[id]/page.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/(workspace)/analyses/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/(workspace)/analyses/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.117ezoe8m31dk.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 48,
    height: 48
};
}),
"[project]/components/actmap/Explorer.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/actmap/Explorer.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/actmap/Explorer.tsx", "default");
}),
"[project]/components/actmap/Explorer.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$Explorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/actmap/Explorer.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$actmap$2f$Explorer$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/analysis/analysis-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalysisHeader",
    ()=>AnalysisHeader,
    "secondaryButton",
    ()=>secondaryButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function AnalysisHeader({ owner, repo, meta, actions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ui-scale flex min-h-16 shrink-0 flex-wrap items-center gap-x-5 gap-y-2 border-b border-line px-6 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "font-mono text-[22px] tracking-tight text-muted",
                children: [
                    owner && `${owner}/`,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
const secondaryButton = "rounded-lg border border-line px-4 py-2 text-[15px] text-foreground transition-colors hover:bg-surface-2 disabled:opacity-60";
}),
"[project]/components/analysis/analysis-progress.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalysisProgress",
    ()=>AnalysisProgress
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const AnalysisProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call AnalysisProgress() from the server but AnalysisProgress is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/analysis/analysis-progress.tsx", "AnalysisProgress");
}),
"[project]/components/analysis/analysis-progress.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$progress$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/analysis/analysis-progress.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$analysis$2d$progress$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/analysis/rerun-button.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RerunButton",
    ()=>RerunButton
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const RerunButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call RerunButton() from the server but RerunButton is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/analysis/rerun-button.tsx", "RerunButton");
}),
"[project]/components/analysis/rerun-button.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$rerun$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/analysis/rerun-button.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$analysis$2f$rerun$2d$button$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/lib/actmap/load.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadRepositoryData",
    ()=>loadRepositoryData
]);
;
// PostgREST returns at most 1000 rows per request, so everything is paged.
const PAGE = 1000;
async function readAll(count, fetchPage) {
    const ranges = [];
    for(let from = 0; from < count; from += PAGE){
        ranges.push([
            from,
            Math.min(from + PAGE, count) - 1
        ]);
    }
    const rows = [];
    // A few pages at a time keeps a large repository quick without flooding the API.
    for(let index = 0; index < ranges.length; index += 4){
        const batch = await Promise.all(ranges.slice(index, index + 4).map(([from, to])=>fetchPage(from, to)));
        for (const page of batch){
            if (page.error) throw new Error(page.error.message);
            rows.push(...page.data ?? []);
        }
    }
    return rows;
}
function basename(path) {
    return path.slice(path.lastIndexOf("/") + 1);
}
async function loadRepositoryData(supabase, options) {
    const { analysisId } = options;
    const [fileCount, edgeCount, routeResult] = await Promise.all([
        supabase.from("files").select("id", {
            count: "exact",
            head: true
        }).eq("analysis_id", analysisId),
        supabase.from("edges").select("id", {
            count: "exact",
            head: true
        }).eq("analysis_id", analysisId),
        supabase.from("routes").select("id, entry_file_id, metadata").eq("analysis_id", analysisId).limit(1000)
    ]);
    if (routeResult.error) throw new Error(routeResult.error.message);
    if (fileCount.error) throw new Error(fileCount.error.message);
    if (edgeCount.error) throw new Error(edgeCount.error.message);
    const [fileRows, edgeRows] = await Promise.all([
        readAll(fileCount.count ?? 0, (from, to)=>supabase.from("files").select("id, path, language, folder_path, extension, kind, line_count, metadata").eq("analysis_id", analysisId).order("path").range(from, to)),
        readAll(edgeCount.count ?? 0, (from, to)=>supabase.from("edges").select("source_file_id, target_file_id, edge_type, metadata").eq("analysis_id", analysisId).order("id").range(from, to))
    ]);
    const pathById = new Map();
    const files = fileRows.map((row)=>{
        pathById.set(row.id, row.path);
        return {
            id: row.id,
            path: row.path,
            name: row.metadata?.name ?? basename(row.path),
            extension: row.extension ?? "",
            folderPath: row.folder_path ?? ".",
            language: row.language ?? undefined,
            kind: row.kind ?? undefined,
            role: row.metadata?.role ?? undefined,
            lineCount: row.line_count ?? 0,
            fanIn: 0,
            fanOut: 0
        };
    });
    const edges = [];
    for (const row of edgeRows){
        const sourceFile = pathById.get(row.source_file_id);
        const targetFile = pathById.get(row.target_file_id);
        // An edge whose end is missing would be an invented one. Skip, never guess.
        if (!sourceFile || !targetFile) continue;
        edges.push({
            sourceFile,
            targetFile,
            occurrenceCount: row.metadata?.occurrenceCount ?? 1,
            kinds: row.metadata?.kinds ?? [
                row.edge_type
            ]
        });
    }
    const routes = [];
    for (const row of routeResult.data ?? []){
        const file = row.entry_file_id ? pathById.get(row.entry_file_id) : undefined;
        const method = row.metadata?.method;
        const pattern = row.metadata?.pattern;
        // A route missing any of its parts is dropped, never filled in.
        if (!file || !method || !pattern) continue;
        routes.push({
            id: row.id,
            method,
            pattern,
            file,
            line: row.metadata?.line ?? 0
        });
    }
    routes.sort((a, b)=>a.pattern.localeCompare(b.pattern) || a.method.localeCompare(b.method) || a.file.localeCompare(b.file));
    return {
        name: options.name,
        commitSha: options.commitSha,
        adapter: options.adapter,
        files,
        edges,
        coverage: options.coverage,
        routes
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1318ykkrwqot2._.js.map