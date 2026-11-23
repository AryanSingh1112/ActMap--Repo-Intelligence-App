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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$status$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/status.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actmap$2f$load$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actmap/load.ts [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../../../lib/pipeline/stages'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../../../lib/supabase/server'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
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
    const supabase = await createSupabaseServerClient();
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
    const { owner, repo } = splitRepositoryName(row.project?.repository_url ?? "", row.project?.name ?? "unknown");
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
                ai: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$status$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aiStatus"])()
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
    ()=>loadRepositoryData,
    "readAll",
    ()=>readAll
]);
(()=>{
    const e = new Error("Cannot find module '../../parser/src/taxonomy/categories'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$roles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/roles.ts [app-rsc] (ecmascript)");
;
;
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
    const [fileCount, edgeCount, routeResult, modelRoles] = await Promise.all([
        supabase.from("files").select("id", {
            count: "exact",
            head: true
        }).eq("analysis_id", analysisId),
        supabase.from("edges").select("id", {
            count: "exact",
            head: true
        }).eq("analysis_id", analysisId),
        supabase.from("routes").select("id, entry_file_id, metadata").eq("analysis_id", analysisId).limit(1000),
        // Roles a model gave to files no adapter could identify. Never routable ones.
        supabase.from("file_roles").select("file_id, role").eq("analysis_id", analysisId).eq("evidence->>source", "model").limit(1000)
    ]);
    if (routeResult.error) throw new Error(routeResult.error.message);
    // A missing roles table or row is not fatal: the map just has no model labels.
    const modelRole = new Map((modelRoles.data ?? []).flatMap((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$roles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isClassifierRole"])(row.role) ? [
            [
                row.file_id,
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$roles$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROLE_LABEL"][row.role]
            ]
        ] : []));
    if (fileCount.error) throw new Error(fileCount.error.message);
    if (edgeCount.error) throw new Error(edgeCount.error.message);
    const [fileRows, edgeRows] = await Promise.all([
        readAll(fileCount.count ?? 0, (from, to)=>supabase.from("files").select("id, path, language, folder_path, extension, kind, line_count, metadata").eq("analysis_id", analysisId).order("path").range(from, to)),
        readAll(edgeCount.count ?? 0, (from, to)=>supabase.from("edges").select("source_file_id, target_file_id, edge_type, metadata").eq("analysis_id", analysisId).order("id").range(from, to))
    ]);
    const pathById = new Map();
    const files = fileRows.map((row)=>{
        pathById.set(row.id, row.path);
        const conventional = row.metadata?.role ?? undefined;
        const unidentified = !conventional && genericRoleOfKind(row.kind ?? undefined) === UNCLASSIFIED;
        const labelled = unidentified ? modelRole.get(row.id) : undefined;
        return {
            id: row.id,
            path: row.path,
            name: row.metadata?.name ?? basename(row.path),
            extension: row.extension ?? "",
            folderPath: row.folder_path ?? ".",
            language: row.language ?? undefined,
            kind: row.kind ?? undefined,
            role: conventional ?? labelled,
            roleSource: labelled ? "model" : undefined,
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
        detection: options.detection ?? null,
        routes,
        rolesLabelled: options.rolesLabelled ?? false
    };
}
}),
"[project]/lib/ai/client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NO_USAGE",
    ()=>NO_USAGE,
    "aiConfigured",
    ()=>aiConfigured,
    "complete",
    ()=>complete,
    "flushTraces",
    ()=>flushTraces,
    "getAiClient",
    ()=>getAiClient,
    "scoreRun",
    ()=>scoreRun,
    "traced",
    ()=>traced,
    "tracingStatus",
    ()=>tracingStatus
]);
(()=>{
    const e = new Error("Cannot find module 'openai'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'langsmith'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'langsmith/traceable'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'langsmith/wrappers'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/config.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
function tracingStatus() {
    const project = process.env.LANGSMITH_PROJECT?.trim() || "actmap";
    if (!process.env.LANGSMITH_API_KEY?.trim()) {
        return {
            enabled: false,
            project,
            reason: "Tracing is off: LANGSMITH_API_KEY is not set. Calls still work, but nothing is recorded."
        };
    }
    if (process.env.LANGSMITH_TRACING?.trim().toLowerCase() === "false") {
        return {
            enabled: false,
            project,
            reason: "Tracing is off: LANGSMITH_TRACING is set to false. Calls still work, but nothing is recorded."
        };
    }
    return {
        enabled: true,
        project,
        reason: null
    };
}
function aiConfigured() {
    return Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aiApiKey"])());
}
let langsmith;
function getLangSmith() {
    if (langsmith !== undefined) return langsmith;
    langsmith = tracingStatus().enabled ? new Client({
        apiKey: process.env.LANGSMITH_API_KEY
    }) : null;
    return langsmith;
}
let warned = false;
function warnIfUntraced() {
    if (warned) return;
    warned = true;
    const status = tracingStatus();
    if (!status.enabled) console.warn(`[ai] ${status.reason}`);
}
let client;
function getAiClient() {
    if (client) return client;
    const apiKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aiApiKey"])();
    if (!apiKey) {
        throw new Error("AI_API_KEY is not set. Add your Gemini key to .env.local to use explanations.");
    }
    warnIfUntraced();
    const status = tracingStatus();
    // maxRetries backs off and retries on rate limits, which free tiers hit.
    client = wrapOpenAI(new OpenAI({
        apiKey,
        baseURL: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aiBaseUrl"])(),
        maxRetries: 6
    }), {
        client: getLangSmith() ?? undefined,
        tracingEnabled: status.enabled,
        project_name: status.project
    });
    return client;
}
const NO_USAGE = {
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0
};
async function complete(options) {
    const response = await getAiClient().chat.completions.create({
        model: options.model,
        max_completion_tokens: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MAX_OUTPUT_TOKENS"],
        messages: [
            {
                role: "system",
                content: options.system
            },
            {
                role: "user",
                content: options.user
            }
        ],
        ...options.schema ? {
            response_format: {
                type: "json_schema",
                json_schema: options.schema
            }
        } : {}
    });
    const text = response.choices[0]?.message?.content?.trim() ?? "";
    if (!text) throw new Error("The model returned an empty answer.");
    return {
        text,
        usage: {
            promptTokens: response.usage?.prompt_tokens ?? 0,
            completionTokens: response.usage?.completion_tokens ?? 0,
            totalTokens: response.usage?.total_tokens ?? 0
        }
    };
}
function traced(name, fn, options = {}) {
    const status = tracingStatus();
    return traceable(fn, {
        name,
        run_type: "chain",
        client: getLangSmith() ?? undefined,
        tracingEnabled: status.enabled,
        project_name: status.project,
        metadata: options.metadata,
        tags: [
            "actmap",
            ...options.tags ?? []
        ],
        ...options.processInputs ? {
            processInputs: options.processInputs
        } : {}
    });
}
async function flushTraces() {
    await getLangSmith()?.awaitPendingTraceBatches();
}
async function scoreRun(runId, key, score, comment) {
    const ls = getLangSmith();
    if (!ls) return;
    try {
        await ls.awaitPendingTraceBatches();
        await ls.createFeedback(runId, key, {
            score,
            comment
        });
    } catch (error) {
        console.warn(`[ai] could not record ${key} for run ${runId}:`, error instanceof Error ? error.message : error);
    }
}
}),
"[project]/lib/ai/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Everything about which model runs, in one place.
 *
 * The model is pinned to a dated snapshot, never to an alias that moves under
 * you. The name is part of every cache key, so re-pinning it starts a fresh
 * cache for the new model and leaves the old model's answers alone.
 */ __turbopack_context__.s([
    "DEFAULT_BASE_URL",
    ()=>DEFAULT_BASE_URL,
    "DEFAULT_MODEL",
    ()=>DEFAULT_MODEL,
    "LIMITS",
    ()=>LIMITS,
    "MAX_OUTPUT_TOKENS",
    ()=>MAX_OUTPUT_TOKENS,
    "aiApiKey",
    ()=>aiApiKey,
    "aiBaseUrl",
    ()=>aiBaseUrl,
    "assertPinned",
    ()=>assertPinned,
    "pinnedModel",
    ()=>pinnedModel
]);
const DEFAULT_MODEL = "gemini-3.8-flash";
const DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/";
// Aliases move under you. An exact model name does not.
const MOVING = /(^|[-_:/])(latest|auto|default)$/i;
function assertPinned(model, source) {
    if (!model.trim() || MOVING.test(model.trim())) {
        throw new Error(`${source} is "${model}", which is a moving alias. Set an exact model name, such as ${DEFAULT_MODEL}.`);
    }
    return model.trim();
}
function pinnedModel() {
    const configured = process.env.ACTMAP_AI_MODEL?.trim();
    return assertPinned(configured || DEFAULT_MODEL, configured ? "ACTMAP_AI_MODEL" : "DEFAULT_MODEL");
}
function aiBaseUrl() {
    return process.env.AI_BASE_URL?.trim() || DEFAULT_BASE_URL;
}
function aiApiKey() {
    return process.env.AI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim() || undefined;
}
const MAX_OUTPUT_TOKENS = 3000;
const LIMITS = {
    sourceChars: 40_000,
    neighbours: 60,
    folderFiles: 80,
    folderNeighbours: 40,
    classifyBatch: 25,
    classifyMaxFiles: 200,
    classifyNeighbours: 8
};
}),
"[project]/lib/ai/roles.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Browser-safe. No imports.
/**
 * The only roles a model may give a file.
 *
 * Page, route and controller are deliberately absent. Those roles decide the
 * route table and which files are drawn as entry points, and convention owns
 * them: a model that guessed wrong would put a fake route on the screen.
 */ __turbopack_context__.s([
    "CLASSIFIER_ROLES",
    ()=>CLASSIFIER_ROLES,
    "NO_ROLE",
    ()=>NO_ROLE,
    "ROLE_LABEL",
    ()=>ROLE_LABEL,
    "STRUCTURAL_ROLES",
    ()=>STRUCTURAL_ROLES,
    "isClassifierRole",
    ()=>isClassifierRole,
    "roleOfLabel",
    ()=>roleOfLabel
]);
const CLASSIFIER_ROLES = [
    "service",
    "repository",
    "model",
    "util",
    "config",
    "component",
    "hook"
];
const NO_ROLE = "other";
const STRUCTURAL_ROLES = [
    "page",
    "route",
    "controller",
    "layout",
    "middleware"
];
const ROLE_LABEL = {
    service: "Services",
    repository: "Repositories",
    model: "Models",
    util: "Utilities",
    config: "Config files",
    component: "Components",
    hook: "Hooks"
};
const ROLE_BY_LABEL = new Map(Object.entries(ROLE_LABEL).map(([role, label])=>[
        label,
        role
    ]));
function isClassifierRole(value) {
    return typeof value === "string" && CLASSIFIER_ROLES.includes(value);
}
function roleOfLabel(label) {
    return label && ROLE_BY_LABEL.get(label) || null;
}
}),
"[project]/lib/ai/status.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aiStatus",
    ()=>aiStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai/config.ts [app-rsc] (ecmascript)");
;
;
;
function aiStatus() {
    return {
        configured: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["aiConfigured"])(),
        model: process.env.ACTMAP_AI_MODEL?.trim() || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_MODEL"],
        tracing: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2f$client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["tracingStatus"])()
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0i9z016amm7ac._.js.map