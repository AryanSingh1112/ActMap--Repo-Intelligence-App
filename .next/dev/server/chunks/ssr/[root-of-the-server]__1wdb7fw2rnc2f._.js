module.exports = [
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:os [external] (node:os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:os", () => require("node:os"));

module.exports = mod;
}),
"[externals]/node:stream/promises [external] (node:stream/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream/promises", () => require("node:stream/promises"));

module.exports = mod;
}),
"[project]/app/(workspace)/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
/* __next_internal_action_entry_do_not_use__ [{"404cac902b97e431ca4d1c0a87a41563cbaec50a1b":{"name":"rerunAnalysis"},"6086fbb1ae05ecbadb935f89614b780454901a72e0":{"name":"analyseRepository"}},"app/(workspace)/actions.ts",""] */ __turbopack_context__.s([
    "analyseRepository",
    ()=>analyseRepository,
    "rerunAnalysis",
    ()=>rerunAnalysis
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pipeline/github.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$run$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pipeline/run-pipeline.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pipeline/stages.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$run$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$run$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
const UNIQUE_VIOLATION = "23505";
async function analyseRepository(_previous, formData) {
    const { userId, orgId, orgSlug } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) return {
        error: "Sign in to analyse a repository."
    };
    if (!orgId) return {
        error: "Pick an organization first."
    };
    const reference = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseGitHubUrl"])(String(formData.get("url") ?? ""));
    if (!reference) {
        return {
            error: "Enter a public GitHub repository, like https://github.com/owner/repo"
        };
    }
    // Reads go through the signed-in client, so row-level security decides
    // what exists. If this organization already has this repository, take
    // the person to it rather than making a second analysis.
    const reader = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseServerClient"])();
    const existingProject = await reader.from("projects").select("id").eq("repository_url", reference.url).maybeSingle();
    if (existingProject.data) {
        const existing = await reader.from("analyses").select("id").eq("project_id", existingProject.data.id).order("created_at", {
            ascending: false
        }).limit(1).maybeSingle();
        if (existing.data) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/analyses/${existing.data.id}`);
    }
    const writer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseServiceClient"])();
    const organization = await writer.from("organizations").upsert({
        id: orgId,
        name: orgSlug ?? orgId
    }, {
        onConflict: "id",
        ignoreDuplicates: true
    });
    if (organization.error) {
        console.error("[analyse] organization upsert failed:", organization.error);
        return {
            error: "Couldn't set up this organization. Try again."
        };
    }
    let projectId = existingProject.data?.id;
    if (!projectId) {
        const created = await writer.from("projects").insert({
            organization_id: orgId,
            name: `${reference.owner}/${reference.repo}`,
            repository_url: reference.url,
            provider: "github",
            created_by: userId
        }).select("id").single();
        if (created.error) {
            if (created.error.code === UNIQUE_VIOLATION) {
                const again = await writer.from("projects").select("id").eq("organization_id", orgId).eq("repository_url", reference.url).single();
                projectId = again.data?.id;
            } else {
                console.error("[analyse] project insert failed:", created.error);
                return {
                    error: "Couldn't save the repository. Try again."
                };
            }
        } else {
            projectId = created.data.id;
        }
    }
    if (!projectId) return {
        error: "Couldn't save the repository. Try again."
    };
    const analysis = await writer.from("analyses").insert({
        organization_id: orgId,
        project_id: projectId,
        status: "queued",
        requested_by: userId
    }).select("id").single();
    if (analysis.error) {
        if (analysis.error.code === UNIQUE_VIOLATION) {
            const winner = await writer.from("analyses").select("id").eq("organization_id", orgId).eq("project_id", projectId).limit(1).single();
            if (winner.data) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/analyses/${winner.data.id}`);
        }
        console.error("[analyse] analysis insert failed:", analysis.error);
        return {
            error: "Couldn't start the analysis. Try again."
        };
    }
    const analysisId = analysis.data.id;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["after"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$run$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runPipeline"])({
            analysisId,
            organizationId: orgId,
            owner: reference.owner,
            repo: reference.repo
        }));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/analyses/${analysisId}`);
}
async function rerunAnalysis(analysisId) {
    const { userId, orgId } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId || !orgId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/workspace");
    // Row-level security proves this analysis belongs to the signed-in organization.
    const reader = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseServerClient"])();
    const { data } = await reader.from("analyses").select("id, status, updated_at, project:projects(name, repository_url)").eq("id", analysisId).maybeSingle();
    if (!data) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/workspace");
    const status = data.status;
    const project = Array.isArray(data.project) ? data.project[0] : data.project;
    const running = status === "running" || status === "parsing" || status === "queued";
    if (running && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isStale"])(status, data.updated_at)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/analyses/${analysisId}`);
    }
    if (!project) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/analyses/${analysisId}`);
    const { owner, repo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$stages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["splitRepositoryName"])(project.repository_url, project.name);
    const writer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseServiceClient"])();
    const reset = await writer.from("analyses").update({
        status: "queued",
        stage: null,
        stage_message: null,
        failed_stage: null,
        error_message: null,
        completed_at: null
    }).eq("id", analysisId).eq("organization_id", orgId);
    if (reset.error) {
        console.error("[rerun] reset failed:", reset.error);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/analyses/${analysisId}`);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["after"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$run$2d$pipeline$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["runPipeline"])({
            analysisId,
            organizationId: orgId,
            owner,
            repo
        }));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/analyses/${analysisId}`);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    analyseRepository,
    rerunAnalysis
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(analyseRepository, "6086fbb1ae05ecbadb935f89614b780454901a72e0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(rerunAnalysis, "404cac902b97e431ca4d1c0a87a41563cbaec50a1b", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/pipeline/github.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "PipelineError",
    ()=>PipelineError,
    "downloadArchive",
    ()=>downloadArchive,
    "parseGitHubUrl",
    ()=>parseGitHubUrl,
    "resolveHeadCommit",
    ()=>resolveHeadCommit
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:stream [external] (node:stream, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream$2f$promises__$5b$external$5d$__$28$node$3a$stream$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:stream/promises [external] (node:stream/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$tar__$5b$external$5d$__$28$tar$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$tar$29$__ = __turbopack_context__.i("[externals]/tar [external] (tar, esm_import, [project]/node_modules/tar)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$tar__$5b$external$5d$__$28$tar$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$tar$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$tar__$5b$external$5d$__$28$tar$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$tar$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
class PipelineError extends Error {
    constructor(message){
        super(message);
        this.name = "PipelineError";
    }
}
const OWNER_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO_PATTERN = /^(?!\.{1,2}$)[A-Za-z0-9._-]{1,100}$/;
const MAX_ARCHIVE_BYTES = 200 * 1024 * 1024;
const MAX_EXTRACTED_FILE_BYTES = 5 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 120_000;
function parseGitHubUrl(input) {
    const trimmed = input.trim();
    if (!trimmed) return null;
    let pathname;
    if (/^[\w.-]+\/[\w.-]+$/.test(trimmed)) {
        pathname = trimmed;
    } else {
        const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
        let url;
        try {
            url = new URL(withProtocol);
        } catch  {
            return null;
        }
        const host = url.hostname.toLowerCase();
        if (host !== "github.com" && host !== "www.github.com") return null;
        pathname = url.pathname;
    }
    const [owner, rawRepo] = pathname.split("/").filter(Boolean);
    if (!owner || !rawRepo) return null;
    const repo = rawRepo.replace(/\.git$/i, "");
    if (!OWNER_PATTERN.test(owner) || !REPO_PATTERN.test(repo)) return null;
    return {
        owner,
        repo,
        url: `https://github.com/${owner}/${repo}`.toLowerCase()
    };
}
function notFound(owner, repo) {
    return new PipelineError(`${owner}/${repo} doesn't exist on GitHub, or it isn't public`);
}
async function resolveHeadCommit(owner, repo) {
    let response;
    try {
        response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/HEAD`, {
            headers: {
                Accept: "application/vnd.github.sha",
                "User-Agent": "actmap",
                "X-GitHub-Api-Version": "2022-11-28"
            },
            signal: AbortSignal.timeout(30_000),
            cache: "no-store"
        });
    } catch  {
        return null;
    }
    if (response.status === 404) throw notFound(owner, repo);
    if (response.status === 409) {
        throw new PipelineError(`${owner}/${repo} is empty, so there is nothing to map`);
    }
    if (!response.ok) return null;
    const sha = (await response.text()).trim();
    return /^[0-9a-f]{40}$/.test(sha) ? sha : null;
}
async function downloadArchive(options) {
    const { owner, repo, destination } = options;
    const ref = options.commitSha ?? "HEAD";
    let response;
    try {
        response = await fetch(`https://codeload.github.com/${owner}/${repo}/tar.gz/${ref}`, {
            headers: {
                "User-Agent": "actmap"
            },
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
            cache: "no-store"
        });
    } catch  {
        throw new PipelineError("Couldn't reach GitHub to download the repository archive");
    }
    if (response.status === 404) throw notFound(owner, repo);
    if (!response.ok || !response.body) {
        throw new PipelineError(`GitHub refused the archive download (HTTP ${response.status})`);
    }
    const declared = Number(response.headers.get("content-length") ?? 0);
    if (declared > MAX_ARCHIVE_BYTES) {
        throw new PipelineError("This repository's archive is over 200 MB, which is more than a map can be built from here");
    }
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])(destination, {
        recursive: true
    });
    let received = 0;
    let topLevelDirectory = null;
    // `git archive` writes the commit it archived into the tarball's global
    // header, so the commit is known even when the API lookup was unavailable.
    let headerCommit = null;
    const limiter = new __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__["Transform"]({
        transform (chunk, _encoding, callback) {
            received += chunk.length;
            if (received > MAX_ARCHIVE_BYTES) {
                callback(new PipelineError("This repository's archive is over 200 MB, which is more than a map can be built from here"));
                return;
            }
            callback(null, chunk);
        }
    });
    try {
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream$2f$promises__$5b$external$5d$__$28$node$3a$stream$2f$promises$2c$__cjs$29$__["pipeline"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__["Readable"].fromWeb(response.body), limiter, __TURBOPACK__imported__module__$5b$externals$5d2f$tar__$5b$external$5d$__$28$tar$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$tar$29$__["x"]({
            cwd: destination,
            strip: 1,
            onReadEntry: (entry)=>{
                if (topLevelDirectory === null) {
                    topLevelDirectory = entry.path.split("/")[0] ?? null;
                }
                const comment = entry.globalExtended?.comment;
                if (headerCommit === null && comment && /^[0-9a-f]{40}$/.test(comment)) {
                    headerCommit = comment;
                }
            },
            filter: (entryPath, entry)=>{
                const type = "type" in entry ? entry.type : "File";
                if (type !== "File" && type !== "Directory") return false;
                const size = "size" in entry ? Number(entry.size ?? 0) : 0;
                if (size > MAX_EXTRACTED_FILE_BYTES) return false;
                const segments = entryPath.split("/");
                return !segments.includes("node_modules") && !segments.includes(".git");
            }
        }));
    } catch (error) {
        if (error instanceof PipelineError) throw error;
        throw new PipelineError("The repository archive could not be unpacked");
    }
    let commitSha = options.commitSha ?? headerCommit;
    if (!commitSha && topLevelDirectory) {
        const match = /-([0-9a-f]{40})$/.exec(topLevelDirectory);
        commitSha = match ? match[1] : null;
    }
    return {
        commitSha
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/pipeline/run-pipeline.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "runPipeline",
    ()=>runPipeline
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:os [external] (node:os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$repository$2d$parser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/repository-parser.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pipeline/github.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pipeline/store.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
async function runPipeline(input) {
    const { analysisId, organizationId, owner, repo } = input;
    let supabase;
    try {
        supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSupabaseServiceClient"])();
    } catch (error) {
        // Without the secret key nothing can be written, so the run cannot even be
        // marked failed. Say so loudly in the terminal instead of hanging quietly.
        console.error(`[pipeline] ${owner}/${repo} could not start:`, error instanceof Error ? error.message : error);
        return;
    }
    console.log(`[pipeline] ${owner}/${repo} starting (analysis ${analysisId})`);
    let stage = "fetch";
    let workDirectory = null;
    async function update(values) {
        const { error } = await supabase.from("analyses").update(values).eq("id", analysisId).eq("organization_id", organizationId);
        if (error) throw new Error(`Could not update the analysis: ${error.message}`);
    }
    // Progress is written in order but never waited on, so a slow round trip to
    // the database does not slow the work down. Everything that matters (the
    // result, the failure) waits for it to drain first.
    let writes = Promise.resolve();
    let writeError = null;
    function queue(values) {
        writes = writes.then(()=>update(values)).catch((error)=>{
            writeError ??= error;
        });
    }
    async function drain() {
        await writes;
        if (writeError) {
            const error = writeError;
            writeError = null;
            throw error;
        }
    }
    function enter(next, message, extra = {}) {
        stage = next;
        queue({
            status: "running",
            stage: next,
            stage_message: message,
            ...extra
        });
    }
    try {
        // The first write is awaited, so the row says "running" before any work.
        stage = "fetch";
        await update({
            status: "running",
            stage: "fetch",
            stage_message: `Downloading ${owner}/${repo}`,
            started_at: new Date().toISOString(),
            completed_at: null,
            error_message: null,
            failed_stage: null
        });
        workDirectory = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdtemp"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$os__$5b$external$5d$__$28$node$3a$os$2c$__cjs$29$__["default"].tmpdir(), "actmap-"));
        // The archive carries the commit it was cut from, so there is no separate
        // lookup to wait for, and the commit always matches the files.
        const { commitSha } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["downloadArchive"])({
            owner,
            repo,
            commitSha: null,
            destination: workDirectory
        });
        if (commitSha) queue({
            commit_sha: commitSha
        });
        const map = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$repository$2d$parser$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["parseRepository"])({
            rootPath: workDirectory,
            onStage: (next, message)=>{
                enter(next, message);
            }
        });
        if (map.files.length === 0) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PipelineError"](`${owner}/${repo} has no files this tool can read, so there is nothing to map`);
        }
        enter("store", `Storing ${map.files.length} files and ${map.edges.length} edges`);
        const stored = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["storeRepositoryMap"])(supabase, {
            analysisId,
            organizationId,
            map
        });
        const skippedByReason = {};
        for (const skipped of map.skippedFiles){
            skippedByReason[skipped.reason] = (skippedByReason[skipped.reason] ?? 0) + 1;
        }
        await drain();
        await update({
            status: "complete",
            stage: "store",
            stage_message: `Mapped ${stored.files} files and ${stored.edges} edges`,
            summary: `Mapped ${stored.files} files and ${stored.edges} edges`,
            coverage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$store$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["summariseCoverage"])(map),
            stats: {
                ...map.statistics,
                adapter: map.framework,
                routes: stored.routes,
                parserVersion: map.repository.parserVersion,
                schemaVersion: map.schemaVersion,
                skippedByReason
            },
            completed_at: new Date().toISOString()
        });
    } catch (error) {
        const message = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pipeline$2f$github$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PipelineError"] ? error.message : error instanceof Error ? `Unexpected error: ${error.message}`.slice(0, 400) : "Unexpected error";
        console.error(`[pipeline] ${owner}/${repo} failed during ${stage}:`, error);
        try {
            await writes;
            await update({
                status: "failed",
                stage,
                failed_stage: stage,
                error_message: message,
                completed_at: new Date().toISOString()
            });
        } catch (writeError) {
            console.error("[pipeline] could not record the failure:", writeError);
        }
    } finally{
        if (workDirectory) {
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["rm"])(workDirectory, {
                recursive: true,
                force: true
            }).catch(()=>{});
        }
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/pipeline/stages.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/lib/pipeline/store.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "storeRepositoryMap",
    ()=>storeRepositoryMap,
    "summariseCoverage",
    ()=>summariseCoverage
]);
;
const BATCH_SIZE = 500;
// Batches are independent, so a few go over the wire at once.
const PARALLEL_BATCHES = 4;
function summariseCoverage(map) {
    const unresolvedByReason = {};
    for (const entry of map.coverage.entries){
        if (entry.status !== "unresolved") continue;
        unresolvedByReason[entry.reason] = (unresolvedByReason[entry.reason] ?? 0) + 1;
    }
    return {
        total: map.coverage.total,
        resolved: map.coverage.resolved,
        external: map.coverage.external,
        excluded: map.coverage.excluded,
        unresolved: map.coverage.unresolved,
        unresolvedByReason,
        examples: map.coverage.unresolvedExamples.slice(0, 20).map((entry)=>({
                sourceFile: entry.occurrence.sourceFile,
                specifier: entry.occurrence.specifier,
                line: entry.occurrence.line,
                reason: entry.reason,
                message: entry.message
            }))
    };
}
function chunk(items, size) {
    const batches = [];
    for(let index = 0; index < items.length; index += size){
        batches.push(items.slice(index, index + size));
    }
    return batches;
}
/**
 * Writes the parsed map into files and edges. Safe to call again for a
 * re-run: the previous rows for this analysis are removed first.
 */ async function inBatches(items, write) {
    const batches = chunk(items, BATCH_SIZE);
    for(let index = 0; index < batches.length; index += PARALLEL_BATCHES){
        await Promise.all(batches.slice(index, index + PARALLEL_BATCHES).map(write));
    }
}
async function storeRepositoryMap(supabase, options) {
    const { analysisId, organizationId, map } = options;
    const removed = await supabase.from("files").delete().eq("analysis_id", analysisId).eq("organization_id", organizationId);
    if (removed.error) throw new Error(`Clearing old files failed: ${removed.error.message}`);
    const idByPath = new Map();
    await inBatches(map.files, async (batch)=>{
        const { data, error } = await supabase.from("files").insert(batch.map((file)=>({
                organization_id: organizationId,
                analysis_id: analysisId,
                path: file.path,
                language: file.language,
                size_bytes: file.sizeBytes,
                content_hash: file.contentHash,
                is_binary: false,
                folder_path: file.folderPath,
                extension: file.extension,
                kind: file.kind,
                line_count: file.lineCount,
                metadata: {
                    name: file.name,
                    role: file.role ?? null,
                    ...file.exports ? {
                        exports: file.exports
                    } : {}
                }
            }))).select("id, path");
        if (error) throw new Error(`Storing files failed: ${error.message}`);
        for (const row of data ?? [])idByPath.set(row.path, row.id);
    });
    const edgeRows = [];
    for (const edge of map.edges){
        const source = idByPath.get(edge.sourceFile);
        const target = idByPath.get(edge.targetFile);
        // The table forbids self-edges, and an edge to a file that was not
        // stored would be an invented one. Both are skipped, never guessed at.
        if (!source || !target || source === target) continue;
        edgeRows.push({
            organization_id: organizationId,
            analysis_id: analysisId,
            source_file_id: source,
            target_file_id: target,
            edge_type: edge.kinds[0] ?? "static",
            metadata: {
                kinds: edge.kinds,
                occurrenceCount: edge.occurrenceCount
            }
        });
    }
    // Edges and routes only need the file ids, so they are written together.
    const routeRows = map.routes.map((route)=>{
        const fileId = idByPath.get(route.sourceFile);
        if (!fileId) return null;
        return {
            organization_id: organizationId,
            analysis_id: analysisId,
            entry_file_id: fileId,
            path: [
                route.pattern
            ],
            route_type: "http",
            metadata: {
                method: route.method,
                pattern: route.pattern,
                line: route.line
            }
        };
    }).filter((row)=>row !== null);
    await Promise.all([
        inBatches(edgeRows, async (batch)=>{
            const { error } = await supabase.from("edges").insert(batch);
            if (error) throw new Error(`Storing edges failed: ${error.message}`);
        }),
        inBatches(routeRows, async (batch)=>{
            const { error } = await supabase.from("routes").insert(batch);
            if (error) throw new Error(`Storing routes failed: ${error.message}`);
        })
    ]);
    return {
        files: idByPath.size,
        edges: edgeRows.length,
        routes: routeRows.length
    };
}
}),
"[project]/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseServerClient",
    ()=>createSupabaseServerClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@clerk/nextjs/dist/esm/app-router/server/auth.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/env.ts [app-rsc] (ecmascript)");
;
;
;
;
async function createSupabaseServerClient() {
    const { userId, orgId, getToken } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$clerk$2f$nextjs$2f$dist$2f$esm$2f$app$2d$router$2f$server$2f$auth$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    if (!userId) {
        throw new Error("Unauthenticated: a signed-in user is required.");
    }
    if (!orgId) {
        throw new Error("No active organization selected.");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"].supabaseUrl, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["env"].supabasePublishableKey, {
        accessToken: async ()=>{
            const token = await getToken();
            if (!token) {
                throw new Error("Unable to retrieve the Clerk session token.");
            }
            return token;
        }
    });
}
}),
"[project]/lib/supabase/service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseServiceClient",
    ()=>createSupabaseServiceClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
;
function createSupabaseServiceClient() {
    const url = ("TURBOPACK compile-time value", "https://dlgoutdsqbvcoyfrinze.supabase.co");
    const secretKey = process.env.SUPABASE_SECRET_KEY;
    if (!url || !secretKey) {
        throw new Error("Missing SUPABASE_SECRET_KEY. Add it to .env.local (server only, no NEXT_PUBLIC_ prefix).");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, secretKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    });
}
}),
"[project]/parser/src/adapters/express.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "expressAdapter",
    ()=>expressAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/role-helpers.ts [app-rsc] (ecmascript)");
;
// Real repositories use both "route" and "routes", so both are accepted.
const FOLDER_ROLES = {
    route: "Routes",
    routes: "Routes",
    router: "Routes",
    routers: "Routes",
    controller: "Controllers",
    controllers: "Controllers",
    middleware: "Middleware",
    middlewares: "Middleware",
    service: "Services",
    services: "Services",
    model: "Models",
    models: "Models",
    schema: "Models",
    schemas: "Models",
    validation: "Validations",
    validations: "Validations",
    validator: "Validations",
    validators: "Validations",
    util: "Utilities",
    utils: "Utilities",
    helper: "Utilities",
    helpers: "Utilities",
    config: "Config files",
    configs: "Config files",
    configuration: "Config files"
};
const FOLDER_NAMES = new Set(Object.keys(FOLDER_ROLES));
const SUFFIX_ROLES = {
    route: "Routes",
    routes: "Routes",
    controller: "Controllers",
    middleware: "Middleware",
    service: "Services",
    model: "Models",
    validation: "Validations",
    validator: "Validations"
};
const SETUP_NAMES = new Set([
    "app",
    "server",
    "index",
    "main",
    "www"
]);
const expressAdapter = {
    id: "express",
    version: "1.0.0",
    detect (context) {
        return context.rootDependencies.has("express") || context.allDependencies.has("express");
    },
    classifier () {
        return (file)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTestFile"])(file)) return "Tests";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfigFile"])(file)) return "Config files";
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSourceFile"])(file) || file.kind === "type-declaration") return "Unclassified";
            const folder = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nearestFolder"])(file, FOLDER_NAMES);
            if (folder) return FOLDER_ROLES[folder];
            const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseName"])(file).toLowerCase().split(".");
            const suffix = parts.length > 1 ? parts[parts.length - 1] : "";
            if (SUFFIX_ROLES[suffix]) return SUFFIX_ROLES[suffix];
            const top = file.folderPath === "." || file.folderPath === "src" || file.folderPath === "bin" || file.folderPath === "lib";
            if (top && SETUP_NAMES.has(parts[0]) && parts.length === 1) return "App setup";
            return "Unclassified";
        };
    }
};
}),
"[project]/parser/src/adapters/generic.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "genericFramework",
    ()=>genericFramework
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/taxonomy/categories.ts [app-rsc] (ecmascript)");
;
const genericFramework = {
    id: "generic",
    version: "1.0.0",
    detect () {
        return true;
    },
    classifier () {
        return (file)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$taxonomy$2f$categories$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["genericRoleOfKind"])(file.kind);
    }
};
}),
"[project]/parser/src/adapters/nestjs.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nestjsAdapter",
    ()=>nestjsAdapter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__ = __turbopack_context__.i("[externals]/typescript [external] (typescript, cjs, [project]/node_modules/typescript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$util$2f$map$2d$concurrent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/util/map-concurrent.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/role-helpers.ts [app-rsc] (ecmascript)");
;
;
;
const SUFFIX_ROLES = {
    controller: "Controllers",
    resolver: "Resolvers",
    gateway: "Gateways",
    service: "Services",
    repository: "Repositories",
    module: "Modules",
    entity: "Entities",
    dto: "DTOs",
    guard: "Guards",
    interceptor: "Interceptors",
    pipe: "Pipes",
    filter: "Filters",
    middleware: "Middleware",
    decorator: "Decorators"
};
const METHOD_DECORATORS = {
    Get: "GET",
    Post: "POST",
    Put: "PUT",
    Delete: "DELETE",
    Patch: "PATCH",
    Options: "OPTIONS",
    Head: "HEAD",
    All: "ALL"
};
function joinPattern(...parts) {
    const segments = parts.flatMap((part)=>part.split("/")).filter((segment)=>segment.length > 0);
    return `/${segments.join("/")}`;
}
/** Local names that @nestjs/common's exports are imported under. */ function nestImports(sourceFile) {
    const names = new Map();
    for (const statement of sourceFile.statements){
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isImportDeclaration(statement) && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === "@nestjs/common" && statement.importClause?.namedBindings && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isNamedImports(statement.importClause.namedBindings)) {
            for (const element of statement.importClause.namedBindings.elements){
                names.set(element.name.text, (element.propertyName ?? element.name).text);
            }
        }
    }
    return names;
}
function decoratorsOf(node, imports) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].canHaveDecorators(node)) return [];
    const calls = [];
    for (const decorator of __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].getDecorators(node) ?? []){
        const expression = decorator.expression;
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isCallExpression(expression) && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isIdentifier(expression.expression)) {
            const name = imports.get(expression.expression.text);
            if (name) calls.push({
                name,
                args: expression.arguments,
                node: decorator
            });
        } else if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isIdentifier(expression)) {
            const name = imports.get(expression.text);
            if (name) calls.push({
                name,
                args: [],
                node: decorator
            });
        }
    }
    return calls;
}
/**
 * The prefix a @Controller(...) gives, or null when it can't be read exactly:
 * @Controller(), @Controller("cats"), or @Controller({ path: "cats" }).
 * A version, a computed value or several paths all change what the URL is.
 */ function controllerPrefix(call) {
    if (call.args.length === 0) return "";
    if (call.args.length !== 1) return null;
    const [argument] = call.args;
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isStringLiteralLike(argument)) return argument.text;
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isObjectLiteralExpression(argument)) {
        let prefix = "";
        for (const property of argument.properties){
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isPropertyAssignment(property)) return null;
            const name = __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isIdentifier(property.name) ? property.name.text : null;
            if (name === "path") {
                if (!__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isStringLiteralLike(property.initializer)) return null;
                prefix = property.initializer.text;
            } else if (name === "version") {
                return null;
            }
        }
        return prefix;
    }
    return null;
}
function methodPath(call) {
    if (call.args.length === 0) return "";
    if (call.args.length === 1 && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isStringLiteralLike(call.args[0])) {
        return call.args[0].text;
    }
    return null;
}
/**
 * setGlobalPrefix, versioning and RouterModule all change every URL. If one
 * is used in a way that can't be read exactly, no route in the repository is
 * exact, so none are reported.
 */ function globalPrefixFrom(texts) {
    const prefixes = new Set();
    for (const text of texts){
        if (/enableVersioning\s*\(/.test(text) || /RouterModule\s*\.\s*register/.test(text)) {
            return {
                kind: "unknown"
            };
        }
        if (!text.includes("setGlobalPrefix")) continue;
        const calls = text.match(/setGlobalPrefix\s*\(/g)?.length ?? 0;
        const literal = [
            ...text.matchAll(/setGlobalPrefix\s*\(\s*(['"`])([^'"`$\\]*)\1\s*\)/g)
        ];
        if (calls !== literal.length) return {
            kind: "unknown"
        };
        for (const match of literal)prefixes.add(match[2]);
    }
    if (prefixes.size === 0) return {
        kind: "none"
    };
    if (prefixes.size > 1) return {
        kind: "unknown"
    };
    return {
        kind: "prefix",
        value: [
            ...prefixes
        ][0]
    };
}
async function extractRoutes(context) {
    const sources = context.files.filter((file)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSourceFile"])(file) && file.kind !== "test" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTestFile"])(file));
    const texts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$util$2f$map$2d$concurrent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapConcurrent"])(sources, 32, (file)=>context.read(file.path));
    const global = globalPrefixFrom(texts);
    if (global.kind === "unknown") return [];
    const routes = [];
    sources.forEach((file, index)=>{
        const text = texts[index];
        if (!text.includes("@Controller")) return;
        const sourceFile = __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].createSourceFile(file.path, text, __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptTarget.Latest, false, file.extension === ".ts" || file.extension === ".mts" || file.extension === ".cts" ? __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptKind.TS : __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptKind.JS);
        const imports = nestImports(sourceFile);
        for (const statement of sourceFile.statements){
            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isClassDeclaration(statement)) continue;
            const classDecorators = decoratorsOf(statement, imports);
            const controller = classDecorators.find((call)=>call.name === "Controller");
            if (!controller || classDecorators.some((call)=>call.name === "Version")) continue;
            const prefix = controllerPrefix(controller);
            if (prefix === null) continue;
            for (const member of statement.members){
                if (!__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isMethodDeclaration(member)) continue;
                const decorators = decoratorsOf(member, imports);
                if (decorators.some((call)=>call.name === "Version")) continue;
                for (const call of decorators){
                    const method = METHOD_DECORATORS[call.name];
                    if (!method) continue;
                    const path = methodPath(call);
                    if (path === null) continue;
                    const pattern = joinPattern(global.kind === "prefix" ? global.value : "", prefix, path);
                    const line = sourceFile.getLineAndCharacterOfPosition(call.node.getStart(sourceFile)).line + 1;
                    routes.push({
                        id: `route:${method}:${pattern}:${file.path}:${line}`,
                        method,
                        pattern,
                        sourceFile: file.path,
                        line
                    });
                }
            }
        }
    });
    return routes.sort((a, b)=>a.pattern.localeCompare(b.pattern) || a.method.localeCompare(b.method) || a.sourceFile.localeCompare(b.sourceFile) || a.line - b.line);
}
const nestjsAdapter = {
    id: "nestjs",
    version: "1.0.0",
    detect (context) {
        return context.rootDependencies.has("@nestjs/core") || context.rootDependencies.has("@nestjs/common") || context.files.some((file)=>file.path === "nest-cli.json") || context.allDependencies.has("@nestjs/core") || context.allDependencies.has("@nestjs/common");
    },
    classifier () {
        return (file)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTestFile"])(file)) return "Tests";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfigFile"])(file)) return "Config files";
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSourceFile"])(file) || file.kind === "type-declaration") return "Unclassified";
            const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseName"])(file).toLowerCase().split(".");
            const suffix = parts.length > 1 ? parts[parts.length - 1] : "";
            if (SUFFIX_ROLES[suffix]) return SUFFIX_ROLES[suffix];
            if (parts.length === 1 && parts[0] === "main") return "Bootstrap";
            return "Unclassified";
        };
    },
    extractRoutes
};
}),
"[project]/parser/src/adapters/nextjs.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nextjsAdapter",
    ()=>nextjsAdapter
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__ = __turbopack_context__.i("[externals]/typescript [external] (typescript, cjs, [project]/node_modules/typescript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$util$2f$map$2d$concurrent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/util/map-concurrent.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/role-helpers.ts [app-rsc] (ecmascript)");
;
;
;
const NEXT_CONFIG = /^next\.config\.(js|mjs|cjs|ts|mts)$/;
const HTTP_METHODS = new Set([
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "OPTIONS"
]);
const LOADING_AND_ERROR = new Set([
    "loading",
    "error",
    "not-found",
    "global-error",
    "default"
]);
const METADATA_FILES = new Set([
    "opengraph-image",
    "twitter-image",
    "icon",
    "apple-icon",
    "sitemap",
    "robots",
    "manifest"
]);
/**
 * The directories that are Next.js projects: the ones holding a next.config,
 * or a package.json that depends on next. A monorepo can hold several.
 */ function projectRoots(context) {
    const roots = new Set();
    for (const file of context.files){
        if (NEXT_CONFIG.test(file.name)) {
            roots.add(file.folderPath === "." ? "" : file.folderPath);
        }
    }
    for (const pkg of context.packages){
        if (pkg.dependencies.has("next")) roots.add(pkg.directory);
    }
    if (roots.size === 0) roots.add("");
    // Longest first, so a nested project claims its own files.
    return [
        ...roots
    ].sort((a, b)=>b.length - a.length);
}
/** The path inside the project that owns it. */ function projectRelative(path, roots) {
    for (const root of roots){
        if (root === "") return path;
        if (path.startsWith(`${root}/`)) return path.slice(root.length + 1);
    }
    return path;
}
function afterPrefix(rel, prefixes) {
    for (const prefix of prefixes){
        if (rel.startsWith(prefix)) return rel.slice(prefix.length);
    }
    return null;
}
const APP_PREFIXES = [
    "app/",
    "src/app/"
];
const PAGES_PREFIXES = [
    "pages/",
    "src/pages/"
];
/**
 * The URL a route handler's folder maps to, or null when the folder can't be
 * turned into one without guessing. Route groups, "(marketing)", do not appear
 * in the URL. Parallel slots, intercepting routes and private folders are
 * either not routable or depend on where the request came from, so they give
 * no route.
 */ function patternFromFolders(folders) {
    const parts = [];
    for (const folder of folders){
        if (/^\(\.{1,3}\)/.test(folder)) return null;
        if (folder.startsWith("@")) return null;
        if (folder.startsWith("_")) return null;
        if (folder.startsWith("(") && folder.endsWith(")")) continue;
        parts.push(folder);
    }
    return `/${parts.join("/")}`;
}
function classifierFor(context) {
    const roots = projectRoots(context);
    return (file, facts)=>{
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTestFile"])(file)) return "Tests";
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfigFile"])(file)) return "Config files";
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSourceFile"])(file) || file.kind === "type-declaration") {
            return "Unclassified";
        }
        const rel = projectRelative(file.path, roots);
        const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseName"])(file);
        // Files Next.js looks for by name at the top of the project.
        if (rel === file.name || rel === `src/${file.name}`) {
            if (base === "middleware" || base === "proxy") return "Middleware";
            if (base === "instrumentation" || base === "instrumentation-client") {
                return "Instrumentation";
            }
        }
        const appRel = afterPrefix(rel, APP_PREFIXES);
        if (appRel !== null) {
            if (base === "page") return "Page routes";
            if (base === "route") return "API endpoints";
            if (base === "layout" || base === "template") return "Layouts";
            if (LOADING_AND_ERROR.has(base)) return "Loading & error UI";
            if (METADATA_FILES.has(base)) return "Metadata files";
        }
        const pagesRel = afterPrefix(rel, PAGES_PREFIXES);
        if (pagesRel !== null) {
            if (pagesRel.startsWith("api/")) return "API endpoints";
            if (base === "_app" || base === "_document") return "Layouts";
            if (base === "_error" || base === "404" || base === "500") {
                return "Loading & error UI";
            }
            if (!base.startsWith("_")) return "Page routes";
        }
        if (facts.directives.includes("use server")) return "Server actions";
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isHookFile"])(file)) return "Hooks";
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isComponentFile"])(file)) return "Components";
        return "Unclassified";
    };
}
/** Names exported from a route handler that are HTTP methods, with their lines. */ function exportedMethods(sourceFile) {
    const found = new Map();
    function note(name, node) {
        if (!HTTP_METHODS.has(name) || found.has(name)) return;
        found.set(name, sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1);
    }
    function hasExport(node) {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].canHaveModifiers(node) && (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].getModifiers(node) ?? []).some((modifier)=>modifier.kind === __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].SyntaxKind.ExportKeyword);
    }
    function bindingNames(name, node) {
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isIdentifier(name)) {
            note(name.text, node);
            return;
        }
        for (const element of name.elements){
            if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isBindingElement(element)) bindingNames(element.name, node);
        }
    }
    for (const statement of sourceFile.statements){
        // export async function GET() {}
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isFunctionDeclaration(statement) && hasExport(statement) && statement.name) {
            note(statement.name.text, statement);
        }
        // export const POST = ..., export const { GET, POST } = handlers
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isVariableStatement(statement) && hasExport(statement)) {
            for (const declaration of statement.declarationList.declarations){
                bindingNames(declaration.name, statement);
            }
        }
        // export { handler as GET }, export { GET } from "./handlers"
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isExportDeclaration(statement) && !statement.isTypeOnly && statement.exportClause && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isNamedExports(statement.exportClause)) {
            for (const element of statement.exportClause.elements){
                if (!element.isTypeOnly) note(element.name.text, statement);
            }
        }
    }
    return [
        ...found.entries()
    ].map(([method, line])=>({
            method,
            line
        })).sort((a, b)=>a.line - b.line || a.method.localeCompare(b.method));
}
async function extractRoutes(context) {
    const roots = projectRoots(context);
    const handlers = context.files.filter((file)=>context.roles.get(file.path) === "API endpoints" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseName"])(file) === "route" && afterPrefix(projectRelative(file.path, roots), APP_PREFIXES) !== null);
    const perFile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$util$2f$map$2d$concurrent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapConcurrent"])(handlers, 16, async (file)=>{
        const appRel = afterPrefix(projectRelative(file.path, roots), APP_PREFIXES);
        const folders = appRel.split("/").slice(0, -1);
        const pattern = patternFromFolders(folders);
        if (pattern === null) return [];
        const sourceFile = __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].createSourceFile(file.path, await context.read(file.path), __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptTarget.Latest, false, file.extension === ".tsx" || file.extension === ".jsx" ? __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptKind.TSX : file.extension === ".ts" || file.extension === ".mts" || file.extension === ".cts" ? __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptKind.TS : __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptKind.JS);
        return exportedMethods(sourceFile).map(({ method, line })=>({
                id: `route:${method}:${pattern}:${file.path}:${line}`,
                method,
                pattern,
                sourceFile: file.path,
                line
            }));
    });
    return perFile.flat().sort((a, b)=>a.pattern.localeCompare(b.pattern) || a.method.localeCompare(b.method) || a.sourceFile.localeCompare(b.sourceFile));
}
const nextjsAdapter = {
    id: "nextjs",
    version: "1.0.0",
    detect (context) {
        return context.rootDependencies.has("next") || context.files.some((file)=>file.folderPath === "." && NEXT_CONFIG.test(file.name)) || context.allDependencies.has("next");
    },
    classifier: classifierFor,
    extractRoutes
};
}),
"[project]/parser/src/adapters/react.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reactAdapter",
    ()=>reactAdapter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/role-helpers.ts [app-rsc] (ecmascript)");
;
const CONTEXT_FOLDERS = new Set([
    "context",
    "contexts",
    "providers",
    "provider"
]);
const STATE_FOLDERS = new Set([
    "store",
    "stores",
    "state",
    "redux",
    "slices",
    "reducers"
]);
const PAGE_FOLDERS = new Set([
    "pages",
    "views",
    "screens",
    "routes"
]);
const SERVICE_FOLDERS = new Set([
    "services",
    "api"
]);
const UTILITY_FOLDERS = new Set([
    "utils",
    "helpers",
    "lib"
]);
const reactAdapter = {
    id: "react",
    version: "1.0.0",
    detect (context) {
        return context.rootDependencies.has("react") || context.rootDependencies.has("react-dom") || context.allDependencies.has("react") || context.allDependencies.has("react-dom");
    },
    classifier () {
        return (file)=>{
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isTestFile"])(file)) return "Tests";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isConfigFile"])(file)) return "Config files";
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isSourceFile"])(file) || file.kind === "type-declaration") return "Unclassified";
            const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseName"])(file);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isHookFile"])(file)) return "Hooks";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasFolder"])(file, CONTEXT_FOLDERS) || /(Context|Provider)$/.test(base)) return "Contexts";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasFolder"])(file, STATE_FOLDERS)) return "State";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasFolder"])(file, PAGE_FOLDERS)) return "Pages";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasFolder"])(file, SERVICE_FOLDERS)) return "Services";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isComponentFile"])(file)) return "Components";
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$role$2d$helpers$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hasFolder"])(file, UTILITY_FOLDERS)) return "Utilities";
            return "Unclassified";
        };
    }
};
}),
"[project]/parser/src/adapters/registry.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FRAMEWORK_ADAPTERS",
    ()=>FRAMEWORK_ADAPTERS,
    "detectFramework",
    ()=>detectFramework
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$express$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/express.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$generic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/generic.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$nestjs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/nestjs.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$nextjs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/nextjs.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$react$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/react.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const FRAMEWORK_ADAPTERS = [
    __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$nextjs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nextjsAdapter"],
    __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$nestjs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["nestjsAdapter"],
    __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$express$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["expressAdapter"],
    __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$react$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reactAdapter"]
];
function detectFramework(context) {
    // The root package.json says what the repository is. Nested ones are only
    // consulted when the root says nothing.
    const rootOnly = {
        ...context,
        allDependencies: context.rootDependencies
    };
    for (const adapter of FRAMEWORK_ADAPTERS){
        if (adapter.detect(rootOnly)) return adapter;
    }
    for (const adapter of FRAMEWORK_ADAPTERS){
        if (adapter.detect(context)) return adapter;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$generic$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["genericFramework"];
}
}),
"[project]/parser/src/adapters/role-helpers.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SOURCE_EXTENSIONS",
    ()=>SOURCE_EXTENSIONS,
    "baseName",
    ()=>baseName,
    "folderSegments",
    ()=>folderSegments,
    "hasFolder",
    ()=>hasFolder,
    "isComponentFile",
    ()=>isComponentFile,
    "isConfigFile",
    ()=>isConfigFile,
    "isHookFile",
    ()=>isHookFile,
    "isSourceFile",
    ()=>isSourceFile,
    "isTestFile",
    ()=>isTestFile,
    "nearestFolder",
    ()=>nearestFolder
]);
const SOURCE_EXTENSIONS = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mts",
    ".cts",
    ".mjs",
    ".cjs"
]);
const TEST_DIRECTORIES = new Set([
    "__tests__",
    "tests",
    "test",
    "e2e"
]);
function isSourceFile(file) {
    return SOURCE_EXTENSIONS.has(file.extension.toLowerCase());
}
function baseName(file) {
    const extension = file.extension;
    return extension && file.name.endsWith(extension) ? file.name.slice(0, -extension.length) : file.name;
}
function folderSegments(file) {
    if (!file.folderPath || file.folderPath === ".") return [];
    return file.folderPath.toLowerCase().split("/").filter(Boolean);
}
function isTestFile(file) {
    return file.kind === "test" || /\.(e2e-spec|e2e)$/.test(baseName(file).toLowerCase()) || folderSegments(file).some((segment)=>TEST_DIRECTORIES.has(segment));
}
function isConfigFile(file) {
    const base = baseName(file).toLowerCase();
    return file.kind === "configuration" || base.endsWith(".config") || /^\.(eslintrc|prettierrc|babelrc)/.test(base);
}
function isHookFile(file) {
    if (!isSourceFile(file)) return false;
    const base = baseName(file);
    return /^use[A-Z0-9]/.test(base) || /^use-/.test(base) || folderSegments(file).includes("hooks");
}
function isComponentFile(file) {
    const extension = file.extension.toLowerCase();
    return extension === ".tsx" || extension === ".jsx" || folderSegments(file).some((segment)=>segment === "components" || segment === "_components");
}
function hasFolder(file, names) {
    return folderSegments(file).some((segment)=>names.has(segment));
}
function nearestFolder(file, names) {
    const segments = folderSegments(file);
    for(let index = segments.length - 1; index >= 0; index -= 1){
        if (names.has(segments[index])) return segments[index];
    }
    return null;
}
}),
"[project]/parser/src/graph/graph-builder.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildDependencyGraph",
    ()=>buildDependencyGraph
]);
function buildDependencyGraph(files, coverage) {
    const edgeMap = new Map();
    for (const entry of coverage.entries){
        if (entry.status !== "resolved" || entry.resolvedPath === null) {
            continue;
        }
        const sourceFile = entry.occurrence.sourceFile;
        const targetFile = entry.resolvedPath;
        const key = JSON.stringify([
            sourceFile,
            targetFile
        ]);
        let edge = edgeMap.get(key);
        if (!edge) {
            edge = {
                sourceFile,
                targetFile,
                kinds: new Set(),
                occurrences: []
            };
            edgeMap.set(key, edge);
        }
        edge.kinds.add(entry.occurrence.kind);
        edge.occurrences.push(entry.occurrence);
    }
    const edges = [
        ...edgeMap.entries()
    ].map(([key, value])=>{
        const occurrences = value.occurrences.sort((a, b)=>a.line - b.line || a.column - b.column);
        return {
            id: key,
            sourceFile: value.sourceFile,
            targetFile: value.targetFile,
            kinds: [
                ...value.kinds
            ].sort(),
            occurrences,
            occurrenceCount: occurrences.length
        };
    }).sort((a, b)=>a.id.localeCompare(b.id));
    const fanIn = new Map();
    const fanOut = new Map();
    for (const file of files){
        fanIn.set(file.path, 0);
        fanOut.set(file.path, 0);
    }
    for (const edge of edges){
        fanOut.set(edge.sourceFile, (fanOut.get(edge.sourceFile) ?? 0) + 1);
        fanIn.set(edge.targetFile, (fanIn.get(edge.targetFile) ?? 0) + 1);
    }
    const updatedFiles = files.map((file)=>({
            ...file,
            fanIn: fanIn.get(file.path) ?? 0,
            fanOut: fanOut.get(file.path) ?? 0
        }));
    return {
        files: updatedFiles,
        edges
    };
}
}),
"[project]/parser/src/imports/import-extractor.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractImports",
    ()=>extractImports
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__ = __turbopack_context__.i("[externals]/typescript [external] (typescript, cjs, [project]/node_modules/typescript)");
;
function createImportId(sourceFile, kind, specifier, line, column) {
    return [
        "import",
        sourceFile,
        kind,
        specifier,
        line,
        column
    ].join(":");
}
function createOccurrence(sourceFilePath, sourceFile, node, specifier, kind) {
    const position = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
    const line = position.line + 1;
    const column = position.character + 1;
    return {
        id: createImportId(sourceFilePath, kind, specifier, line, column),
        sourceFile: sourceFilePath,
        specifier,
        kind,
        line,
        column
    };
}
function getModuleSpecifier(node) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isStringLiteralLike(node)) {
        return null;
    }
    return node.text;
}
function extractImports(sourceFilePath, sourceCode) {
    const sourceFile = __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].createSourceFile(sourceFilePath, sourceCode, __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptTarget.Latest, false, sourceFilePath.endsWith(".tsx") || sourceFilePath.endsWith(".jsx") ? __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptKind.TSX : sourceFilePath.endsWith(".js") || sourceFilePath.endsWith(".mjs") || sourceFilePath.endsWith(".cjs") ? __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptKind.JS : __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].ScriptKind.TS);
    const imports = [];
    const commonJsExports = new Set();
    function visit(node) {
        // import ... from "./module"
        // import "./module"
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isImportDeclaration(node) && node.moduleSpecifier) {
            const specifier = getModuleSpecifier(node.moduleSpecifier);
            if (specifier !== null) {
                imports.push(createOccurrence(sourceFilePath, sourceFile, node, specifier, "static"));
            }
        }
        // export { ... } from "./module"
        // export * from "./module"
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isExportDeclaration(node) && node.moduleSpecifier) {
            const specifier = getModuleSpecifier(node.moduleSpecifier);
            if (specifier !== null) {
                imports.push(createOccurrence(sourceFilePath, sourceFile, node, specifier, "re-export"));
            }
        }
        // import("./module")
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isCallExpression(node) && node.expression.kind === __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].SyntaxKind.ImportKeyword && node.arguments.length === 1) {
            const argument = node.arguments[0];
            const specifier = getModuleSpecifier(argument);
            if (specifier !== null) {
                imports.push(createOccurrence(sourceFilePath, sourceFile, node, specifier, "dynamic"));
            }
        }
        // require("./module")
        // Only a plain call to a free `require` with one literal argument counts.
        // Anything computed has no specifier to read, so it is not an import here.
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isCallExpression(node) && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isIdentifier(node.expression) && node.expression.text === "require" && node.arguments.length === 1) {
            const specifier = getModuleSpecifier(node.arguments[0]);
            if (specifier !== null) {
                imports.push(createOccurrence(sourceFilePath, sourceFile, node, specifier, "require"));
            }
        }
        collectCommonJsExports(node, commonJsExports);
        __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].forEachChild(node, visit);
    }
    visit(sourceFile);
    imports.sort((a, b)=>{
        if (a.line !== b.line) {
            return a.line - b.line;
        }
        return a.column - b.column;
    });
    return {
        imports,
        sourceFile: sourceFilePath,
        directives: readDirectives(sourceFile),
        commonJsExports: [
            ...commonJsExports
        ].sort()
    };
}
function readDirectives(sourceFile) {
    const directives = [];
    for (const statement of sourceFile.statements){
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isExpressionStatement(statement) && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isStringLiteral(statement.expression)) {
            directives.push(statement.expression.text);
            continue;
        }
        break;
    }
    return directives;
}
function isIdentifierNamed(node, name) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isIdentifier(node) && node.text === name;
}
function propertyName(name) {
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isIdentifier(name) || __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isStringLiteralLike(name)) return name.text;
    return null;
}
/**
 * Reads the names a CommonJS module exports, from the three shapes that
 * name them in the source:
 *
 *   exports.name = ...
 *   module.exports.name = ...
 *   module.exports = { name, other: value }
 *
 * `module.exports = something` with a non-literal right-hand side exports a
 * value whose names are not written here, so it adds none.
 */ function collectCommonJsExports(node, names) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isBinaryExpression(node) || node.operatorToken.kind !== __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].SyntaxKind.EqualsToken) {
        return;
    }
    const left = node.left;
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isPropertyAccessExpression(left)) {
        const target = left.expression;
        if (isIdentifierNamed(target, "exports")) {
            names.add(left.name.text);
            return;
        }
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isPropertyAccessExpression(target) && isIdentifierNamed(target.expression, "module") && target.name.text === "exports") {
            names.add(left.name.text);
            return;
        }
        if (isIdentifierNamed(target, "module") && left.name.text === "exports" && __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isObjectLiteralExpression(node.right)) {
            for (const property of node.right.properties){
                if (__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isPropertyAssignment(property) || __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isShorthandPropertyAssignment(property) || __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["default"].isMethodDeclaration(property)) {
                    const name = propertyName(property.name);
                    if (name !== null) names.add(name);
                }
            }
        }
    }
}
}),
"[project]/parser/src/repository-parser.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseRepository",
    ()=>parseRepository
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/types/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$walker$2f$repository$2d$walker$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/walker/repository-walker.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$imports$2f$import$2d$extractor$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/imports/import-extractor.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$resolution$2f$import$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/resolution/import-resolver.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$resolution$2f$module$2d$resolution$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/resolution/module-resolution-config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$graph$2f$graph$2d$builder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/graph/graph-builder.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$registry$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/adapters/registry.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$util$2f$map$2d$concurrent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/util/map-concurrent.ts [app-rsc] (ecmascript)");
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
const PARSER_VERSION = "1.1.0";
const PARSABLE_EXTENSIONS = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mts",
    ".cts",
    ".mjs",
    ".cjs"
]);
function toPosix(filePath) {
    return filePath.split(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep).join("/");
}
function createCoverage(entries) {
    const total = entries.length;
    const resolved = entries.filter((entry)=>entry.status === "resolved").length;
    const external = entries.filter((entry)=>entry.status === "external").length;
    const excluded = entries.filter((entry)=>entry.status === "excluded").length;
    const unresolved = entries.filter((entry)=>entry.status === "unresolved").length;
    return {
        total,
        resolved,
        external,
        excluded,
        unresolved,
        entries,
        unresolvedExamples: entries.filter((entry)=>entry.status === "unresolved").slice(0, 20)
    };
}
function countKind(imports, kind) {
    return imports.filter((occurrence)=>occurrence.kind === kind).length;
}
const READ_CONCURRENCY = 32;
/** Dependency names from every package.json up to three folders deep. */ async function readPackages(rootPath, files) {
    const manifests = files.filter((file)=>file.name === "package.json" && file.path.split("/").length <= 4);
    const packages = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$util$2f$map$2d$concurrent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapConcurrent"])(manifests, 8, async (file)=>{
        try {
            const json = JSON.parse(await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(rootPath, file.path), "utf8"));
            const names = new Set();
            for (const field of [
                "dependencies",
                "devDependencies",
                "peerDependencies"
            ]){
                const section = json?.[field];
                if (section && typeof section === "object") {
                    for (const name of Object.keys(section))names.add(name);
                }
            }
            return {
                directory: file.folderPath === "." ? "" : file.folderPath,
                dependencies: names
            };
        } catch  {
            return null;
        }
    });
    return packages.filter((entry)=>entry !== null);
}
function detectionContext(files, packages) {
    const rootDependencies = new Set();
    const allDependencies = new Set();
    for (const pkg of packages){
        for (const name of pkg.dependencies){
            allDependencies.add(name);
            if (pkg.directory === "") rootDependencies.add(name);
        }
    }
    return {
        files,
        packages,
        rootDependencies,
        allDependencies
    };
}
async function parseRepository(options) {
    const rootPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(options.rootPath);
    // Load root and nested TypeScript/JavaScript configurations.
    const moduleResolutionConfigs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$resolution$2f$module$2d$resolution$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadModuleResolutionConfigs"])(rootPath);
    await options.onStage?.("select", "Selecting files to map");
    const walkResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$walker$2f$repository$2d$walker$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["walkRepository"])({
        rootPath,
        excludedDirectories: options.excludedDirectories,
        excludedFiles: options.excludedFiles
    });
    const packages = await readPackages(rootPath, walkResult.files);
    const detection = detectionContext(walkResult.files, packages);
    const adapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$adapters$2f$registry$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["detectFramework"])(detection);
    await options.onStage?.("parse", `Parsing imports in ${walkResult.statistics.filesParsed} files`);
    const occurrences = [];
    const facts = new Map();
    const commonJsExports = new Map();
    const parsable = walkResult.files.filter((file)=>PARSABLE_EXTENSIONS.has(file.extension.toLowerCase()));
    const extractions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$util$2f$map$2d$concurrent$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["mapConcurrent"])(parsable, READ_CONCURRENCY, async (file)=>{
        const sourceCode = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(rootPath, file.path), "utf8");
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$imports$2f$import$2d$extractor$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["extractImports"])(toPosix(file.path), sourceCode);
    });
    parsable.forEach((file, index)=>{
        const extracted = extractions[index];
        occurrences.push(...extracted.imports);
        facts.set(file.path, {
            directives: extracted.directives
        });
        if (extracted.commonJsExports.length > 0) {
            commonJsExports.set(file.path, extracted.commonJsExports);
        }
    });
    occurrences.sort((a, b)=>{
        return a.sourceFile.localeCompare(b.sourceFile) || a.line - b.line || a.column - b.column;
    });
    const resolverResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$resolution$2f$import$2d$resolver$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resolveImports"])(occurrences, {
        rootPath,
        knownFiles: walkResult.files.map((file)=>file.path),
        skippedFiles: walkResult.skippedFiles,
        excludedDirectories: walkResult.excludedDirectories,
        moduleResolutionConfigs
    });
    const coverage = createCoverage(resolverResult.entries);
    const graph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$graph$2f$graph$2d$builder$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["buildDependencyGraph"])(walkResult.files, coverage);
    const classify = adapter.classifier(detection);
    const noFacts = {
        directives: []
    };
    const files = graph.files.map((file)=>{
        const exportedNames = commonJsExports.get(file.path);
        return {
            ...file,
            role: classify(file, facts.get(file.path) ?? noFacts),
            ...exportedNames ? {
                exports: exportedNames
            } : {}
        };
    });
    const roles = new Map(files.map((file)=>[
            file.path,
            file.role
        ]));
    const routes = adapter.extractRoutes ? await adapter.extractRoutes({
        ...detection,
        files,
        rootPath,
        roles,
        read: (filePath)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(rootPath, filePath), "utf8")
    }) : [];
    const importsFound = occurrences.length;
    const statistics = {
        filesFound: walkResult.statistics.filesFound,
        filesParsed: walkResult.statistics.filesParsed,
        filesSkipped: walkResult.statistics.filesSkipped,
        foldersFound: walkResult.statistics.foldersFound,
        importsFound,
        edgesCreated: graph.edges.length,
        staticImports: countKind(occurrences, "static"),
        reExports: countKind(occurrences, "re-export"),
        dynamicImports: countKind(occurrences, "dynamic"),
        requireImports: countKind(occurrences, "require"),
        routesExtracted: routes.length,
        resolvedImports: coverage.resolved,
        externalImports: coverage.external,
        excludedImports: coverage.excluded,
        unresolvedImports: coverage.unresolved
    };
    return {
        schemaVersion: __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["REPOSITORY_MAP_SCHEMA_VERSION"],
        repository: {
            name: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(rootPath),
            rootPath,
            analyzedAt: new Date().toISOString(),
            parserVersion: `${PARSER_VERSION}+${adapter.id}`
        },
        framework: adapter.id,
        files,
        folders: walkResult.folders,
        edges: graph.edges,
        routes,
        coverage,
        skippedFiles: walkResult.skippedFiles,
        statistics
    };
}
}),
"[project]/parser/src/resolution/import-resolver.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveImports",
    ()=>resolveImports
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__ = __turbopack_context__.i("[externals]/typescript [external] (typescript, cjs, [project]/node_modules/typescript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$resolution$2f$module$2d$resolution$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/parser/src/resolution/module-resolution-config.ts [app-rsc] (ecmascript)");
;
;
;
;
const RESOLUTION_EXTENSIONS = [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mts",
    ".cts",
    ".mjs",
    ".cjs",
    ".json"
];
function toPosix(filePath) {
    return filePath.split(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep).join("/");
}
function normalizeRelativePath(filePath) {
    return toPosix(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].normalize(filePath));
}
function isInsideDirectory(filePath, directoryPath) {
    return filePath === directoryPath || filePath.startsWith(`${directoryPath}/`);
}
function getPackageName(specifier) {
    const parts = specifier.split("/");
    return specifier.startsWith("@") && parts.length >= 2 ? `${parts[0]}/${parts[1]}` : parts[0] ?? specifier;
}
function isAliasLikeSpecifier(specifier) {
    return specifier.startsWith("@/") || specifier.startsWith("~/") || specifier.startsWith("#/");
}
function makeEntry(occurrence, status, reason, resolvedPath = null, packageName = null, message = null) {
    return {
        occurrence,
        status,
        reason,
        resolvedPath,
        packageName,
        message
    };
}
function getRepositoryRelativePath(rootPath, absolutePath) {
    const relativePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(rootPath), __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(absolutePath));
    if (relativePath === ".." || relativePath.startsWith(`..${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep}`) || __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].isAbsolute(relativePath)) {
        return null;
    }
    return normalizeRelativePath(relativePath);
}
function findSkippedTarget(candidates, skippedFiles) {
    return candidates.map((candidate)=>skippedFiles.get(candidate)).find((file)=>file !== undefined);
}
function classifySkippedTarget(occurrence, skippedFile) {
    const reason = skippedFile.reason === "excluded_by_file_rule" ? "excluded_by_file_rule" : skippedFile.reason === "excluded_by_directory_rule" ? "excluded_by_directory_rule" : "unsupported_file_type";
    return makeEntry(occurrence, "excluded", reason, null, null, `The target file was skipped: ${skippedFile.reason}. ${skippedFile.message}`);
}
function matchesPathMapping(specifier, paths) {
    if (!paths) return false;
    if (Object.prototype.hasOwnProperty.call(paths, specifier)) return true;
    return Object.keys(paths).some((pattern)=>{
        const index = pattern.indexOf("*");
        if (index === -1) return false;
        const prefix = pattern.slice(0, index);
        const suffix = pattern.slice(index + 1);
        return specifier.startsWith(prefix) && specifier.endsWith(suffix) && specifier.length >= prefix.length + suffix.length;
    });
}
function getTypeScriptResolutionReason(occurrence, compilerOptions) {
    if (occurrence.specifier.startsWith("#")) {
        return "resolved_package_import";
    }
    if (matchesPathMapping(occurrence.specifier, compilerOptions.paths)) {
        return "resolved_path_alias";
    }
    if (compilerOptions.baseUrl) {
        return "resolved_base_url";
    }
    return "resolved_typescript";
}
function resolveWithTypeScript(occurrence, options, knownFiles, skippedFiles, excludedDirectories) {
    const config = options.moduleResolutionConfigs ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$parser$2f$src$2f$resolution$2f$module$2d$resolution$2d$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findModuleResolutionConfigForFile"])(occurrence.sourceFile, options.rootPath, options.moduleResolutionConfigs) : null;
    const compilerOptions = config?.compilerOptions ?? options.compilerOptions;
    if (!compilerOptions) return null;
    const absoluteRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(options.rootPath);
    const absoluteSource = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(absoluteRoot, occurrence.sourceFile);
    const resolution = __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["resolveModuleName"](occurrence.specifier, absoluteSource, compilerOptions, __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["sys"]);
    const resolvedModule = resolution.resolvedModule;
    if (!resolvedModule) return null;
    if (resolvedModule.isExternalLibraryImport) {
        return makeEntry(occurrence, "external", "external_package", null, getPackageName(occurrence.specifier), `TypeScript resolved "${occurrence.specifier}" as an external library.`);
    }
    const relativeTarget = getRepositoryRelativePath(absoluteRoot, resolvedModule.resolvedFileName);
    if (relativeTarget === null) {
        return makeEntry(occurrence, "external", "external_package", null, getPackageName(occurrence.specifier), `TypeScript resolved "${occurrence.specifier}" outside the repository.`);
    }
    if (knownFiles.has(relativeTarget)) {
        const reason = getTypeScriptResolutionReason(occurrence, compilerOptions);
        return makeEntry(occurrence, "resolved", reason, relativeTarget, null, `Resolved "${occurrence.specifier}" using ${reason.replace("resolved_", "").replace(/_/g, " ")}.`);
    }
    const excludedDirectory = excludedDirectories.find((directory)=>isInsideDirectory(relativeTarget, directory));
    if (excludedDirectory) {
        return makeEntry(occurrence, "excluded", "excluded_by_directory_rule", null, null, `The resolved target is inside excluded directory "${excludedDirectory}".`);
    }
    const skipped = findSkippedTarget([
        relativeTarget
    ], skippedFiles);
    if (skipped) return classifySkippedTarget(occurrence, skipped);
    return makeEntry(occurrence, "unresolved", "unsupported_file_type", null, null, `TypeScript resolved "${occurrence.specifier}" to "${relativeTarget}", but that file is not part of the parsed repository map.`);
}
function resolveRelativeImport(occurrence, specifier, knownFiles, skippedFiles, excludedDirectories) {
    const sourceDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].posix.dirname(normalizeRelativePath(occurrence.sourceFile));
    const basePath = normalizeRelativePath(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].posix.join(sourceDirectory, specifier));
    const extensionCandidates = RESOLUTION_EXTENSIONS.map((extension)=>`${basePath}${extension}`);
    const indexCandidates = RESOLUTION_EXTENSIONS.map((extension)=>`${basePath.replace(/\/+$/, "")}/index${extension}`);
    const candidates = [
        basePath,
        ...extensionCandidates,
        ...indexCandidates
    ];
    if (knownFiles.has(basePath)) {
        return makeEntry(occurrence, "resolved", "resolved_exact", basePath);
    }
    const extensionMatch = extensionCandidates.find((candidate)=>knownFiles.has(candidate));
    if (extensionMatch) {
        return makeEntry(occurrence, "resolved", "resolved_extension", extensionMatch);
    }
    const indexMatch = indexCandidates.find((candidate)=>knownFiles.has(candidate));
    if (indexMatch) {
        return makeEntry(occurrence, "resolved", "resolved_index", indexMatch);
    }
    const excludedDirectory = excludedDirectories.find((directory)=>isInsideDirectory(basePath, directory));
    if (excludedDirectory) {
        return makeEntry(occurrence, "excluded", "excluded_by_directory_rule", null, null, `The target is inside excluded directory "${excludedDirectory}".`);
    }
    const skipped = findSkippedTarget(candidates, skippedFiles);
    if (skipped) return classifySkippedTarget(occurrence, skipped);
    return makeEntry(occurrence, "unresolved", "file_not_found", null, null, `No file matched the relative import "${specifier}" from "${occurrence.sourceFile}".`);
}
function findNearestPackageJson(rootPath, sourceFile) {
    const absoluteRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(rootPath);
    const absoluteSource = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(absoluteRoot, sourceFile);
    let currentDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(absoluteSource);
    while(true){
        try {
            const content = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["readFileSync"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(currentDirectory, "package.json"), "utf8");
            return {
                packageDirectory: currentDirectory,
                packageJson: JSON.parse(content)
            };
        } catch  {
        // Continue searching parent directories.
        }
        if (currentDirectory === absoluteRoot) break;
        const parentDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(currentDirectory);
        if (parentDirectory === currentDirectory || getRepositoryRelativePath(absoluteRoot, parentDirectory) === null) {
            break;
        }
        currentDirectory = parentDirectory;
    }
    return null;
}
function getConditionalTargets(value) {
    if (typeof value === "string") return [
        value
    ];
    if (Array.isArray(value)) {
        return value.flatMap(getConditionalTargets);
    }
    if (typeof value !== "object" || value === null) return [];
    const conditions = value;
    const priority = [
        "types",
        "import",
        "node",
        "default"
    ];
    return priority.flatMap((condition)=>condition in conditions ? getConditionalTargets(conditions[condition]) : []);
}
function matchPackageImport(specifier, imports) {
    if (Object.prototype.hasOwnProperty.call(imports, specifier)) {
        return getConditionalTargets(imports[specifier]);
    }
    for (const [key, value] of Object.entries(imports)){
        const index = key.indexOf("*");
        if (index === -1) continue;
        const prefix = key.slice(0, index);
        const suffix = key.slice(index + 1);
        if (!specifier.startsWith(prefix) || !specifier.endsWith(suffix) || specifier.length < prefix.length + suffix.length) {
            continue;
        }
        const matchedPart = specifier.slice(prefix.length, specifier.length - suffix.length);
        return getConditionalTargets(value).map((target)=>target.replace(/\*/g, matchedPart));
    }
    return [];
}
function getPackageTargetCandidates(absoluteTarget) {
    const extension = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].extname(absoluteTarget);
    const basePath = absoluteTarget.slice(0, absoluteTarget.length - extension.length);
    const substitutions = {
        ".js": [
            ".ts",
            ".tsx",
            ".d.ts",
            ".js"
        ],
        ".jsx": [
            ".tsx",
            ".ts",
            ".jsx"
        ],
        ".mjs": [
            ".mts",
            ".d.mts",
            ".mjs"
        ],
        ".cjs": [
            ".cts",
            ".d.cts",
            ".cjs"
        ]
    };
    const replacements = substitutions[extension];
    if (replacements) {
        return replacements.map((replacement)=>`${basePath}${replacement}`);
    }
    return [
        absoluteTarget,
        ...RESOLUTION_EXTENSIONS.map((ext)=>`${absoluteTarget}${ext}`),
        ...RESOLUTION_EXTENSIONS.map((ext)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(absoluteTarget, `index${ext}`))
    ];
}
function resolvePackageImportMap(occurrence, options, knownFiles, skippedFiles, excludedDirectories) {
    if (!occurrence.specifier.startsWith("#")) return null;
    const packageInfo = findNearestPackageJson(options.rootPath, occurrence.sourceFile);
    if (!packageInfo?.packageJson.imports) return null;
    const targets = matchPackageImport(occurrence.specifier, packageInfo.packageJson.imports);
    if (targets.length === 0) return null;
    const absoluteRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(options.rootPath);
    for (const target of targets){
        if (!target.startsWith("./")) continue;
        const absoluteTarget = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(packageInfo.packageDirectory, target);
        const relativeTarget = getRepositoryRelativePath(absoluteRoot, absoluteTarget);
        if (relativeTarget === null) continue;
        const relativeCandidates = getPackageTargetCandidates(absoluteTarget).map((candidate)=>getRepositoryRelativePath(absoluteRoot, candidate)).filter((candidate)=>candidate !== null);
        const matchedFile = relativeCandidates.find((candidate)=>knownFiles.has(candidate));
        if (matchedFile) {
            return makeEntry(occurrence, "resolved", "resolved_package_import", matchedFile, null, `Resolved "${occurrence.specifier}" using the package.json imports mapping.`);
        }
        const excludedDirectory = excludedDirectories.find((directory)=>isInsideDirectory(relativeTarget, directory));
        if (excludedDirectory) {
            return makeEntry(occurrence, "excluded", "excluded_by_directory_rule", null, null, `The package import target is inside excluded directory "${excludedDirectory}".`);
        }
        const skipped = findSkippedTarget(relativeCandidates, skippedFiles);
        if (skipped) return classifySkippedTarget(occurrence, skipped);
    }
    return makeEntry(occurrence, "unresolved", "file_not_found", null, null, `The package import mapping for "${occurrence.specifier}" exists, but none of its internal targets matched a parsed repository file.`);
}
function resolveImports(occurrences, options) {
    const knownFiles = new Set(options.knownFiles.map(normalizeRelativePath));
    const skippedFiles = new Map(options.skippedFiles.map((file)=>[
            normalizeRelativePath(file.path),
            file
        ]));
    const excludedDirectories = options.excludedDirectories.map((directory)=>normalizeRelativePath(directory.path));
    const entries = [];
    for (const occurrence of occurrences){
        const specifier = occurrence.specifier.trim();
        const normalizedOccurrence = {
            ...occurrence,
            specifier
        };
        if (!specifier) {
            entries.push(makeEntry(normalizedOccurrence, "unresolved", "invalid_specifier", null, null, "The import specifier is empty."));
            continue;
        }
        if (specifier.startsWith("/") || specifier.includes("\\")) {
            entries.push(makeEntry(normalizedOccurrence, "unresolved", "unsupported_resolution", null, null, "Absolute paths and backslash-based import specifiers are not supported."));
            continue;
        }
        if (specifier.startsWith(".")) {
            entries.push(resolveRelativeImport(normalizedOccurrence, specifier, knownFiles, skippedFiles, excludedDirectories));
            continue;
        }
        const compilerResult = resolveWithTypeScript(normalizedOccurrence, options, knownFiles, skippedFiles, excludedDirectories);
        if (compilerResult) {
            entries.push(compilerResult);
            continue;
        }
        if (specifier.startsWith("#")) {
            const packageImportResult = resolvePackageImportMap(normalizedOccurrence, options, knownFiles, skippedFiles, excludedDirectories);
            if (packageImportResult) {
                entries.push(packageImportResult);
                continue;
            }
            entries.push(makeEntry(normalizedOccurrence, "unresolved", "unsupported_resolution", null, null, "Package import maps could not be resolved using the available TypeScript configuration or package.json imports mappings."));
            continue;
        }
        if (isAliasLikeSpecifier(specifier)) {
            entries.push(makeEntry(normalizedOccurrence, "unresolved", "unsupported_resolution", null, null, `The import "${specifier}" looks like a path alias, but no matching TypeScript configuration resolved it.`));
            continue;
        }
        entries.push(makeEntry(normalizedOccurrence, "external", "external_package", null, getPackageName(specifier), `Bare module specifier "${specifier}" is treated as an external package.`));
    }
    return {
        entries
    };
}
}),
"[project]/parser/src/resolution/module-resolution-config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "findModuleResolutionConfigForFile",
    ()=>findModuleResolutionConfigForFile,
    "loadModuleResolutionConfig",
    ()=>loadModuleResolutionConfig,
    "loadModuleResolutionConfigs",
    ()=>loadModuleResolutionConfigs
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__ = __turbopack_context__.i("[externals]/typescript [external] (typescript, cjs, [project]/node_modules/typescript)");
;
;
;
function parseModuleResolutionConfig(configPath) {
    const diagnostics = [];
    try {
        const parsed = __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["getParsedCommandLineOfConfigFile"](configPath, {}, {
            ...__TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["sys"],
            onUnRecoverableConfigFileDiagnostic (diagnostic) {
                diagnostics.push(diagnostic);
            }
        });
        if (!parsed) {
            return {
                configPath,
                compilerOptions: undefined,
                diagnostics
            };
        }
        diagnostics.push(...parsed.errors);
        return {
            configPath,
            compilerOptions: parsed.options,
            diagnostics
        };
    } catch (error) {
        diagnostics.push({
            category: __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["DiagnosticCategory"].Error,
            code: 0,
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: error instanceof Error ? error.message : "Unable to read module resolution configuration."
        });
        return {
            configPath,
            compilerOptions: undefined,
            diagnostics
        };
    }
}
function loadModuleResolutionConfig(rootPath) {
    const absoluteRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(rootPath);
    const configCandidates = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(absoluteRoot, "tsconfig.json"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(absoluteRoot, "jsconfig.json")
    ];
    const configPath = configCandidates.find((candidate)=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["existsSync"])(candidate)) ?? null;
    if (!configPath) {
        return {
            configPath: null,
            compilerOptions: undefined,
            diagnostics: []
        };
    }
    return parseModuleResolutionConfig(configPath);
}
function loadModuleResolutionConfigs(rootPath) {
    const absoluteRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(rootPath);
    const discoveredPaths = __TURBOPACK__imported__module__$5b$externals$5d2f$typescript__$5b$external$5d$__$28$typescript$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$typescript$29$__["sys"].readDirectory(absoluteRoot, [
        ".json"
    ], [
        "**/node_modules/**",
        "**/.git/**"
    ], [
        "**/tsconfig.json",
        "**/jsconfig.json"
    ]);
    const rootConfigPaths = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(absoluteRoot, "tsconfig.json"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(absoluteRoot, "jsconfig.json")
    ].filter(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["existsSync"]);
    const configPaths = [
        ...new Set([
            ...rootConfigPaths,
            ...discoveredPaths
        ].map((configPath)=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(configPath)))
    ];
    // Prefer tsconfig.json when both config types exist in one directory.
    configPaths.sort((a, b)=>{
        const directoryDifference = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(a).length - __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(b).length;
        if (directoryDifference !== 0) {
            return directoryDifference;
        }
        const aPriority = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(a) === "tsconfig.json" ? 0 : 1;
        const bPriority = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(b) === "tsconfig.json" ? 0 : 1;
        return aPriority - bPriority || a.localeCompare(b);
    });
    const configsByDirectory = new Map();
    for (const configPath of configPaths){
        const directory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(configPath);
        if (configsByDirectory.has(directory)) {
            continue;
        }
        configsByDirectory.set(directory, parseModuleResolutionConfig(configPath));
    }
    return [
        ...configsByDirectory.values()
    ];
}
function findModuleResolutionConfigForFile(sourceFile, rootPath, configs) {
    const absoluteRoot = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(rootPath);
    const absoluteSource = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(absoluteRoot, sourceFile);
    const relativeSource = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(absoluteRoot, absoluteSource);
    if (relativeSource === ".." || relativeSource.startsWith(`..${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep}`) || __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].isAbsolute(relativeSource)) {
        return null;
    }
    const configsByDirectory = new Map();
    for (const config of configs){
        if (!config.configPath) {
            continue;
        }
        configsByDirectory.set(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(config.configPath)), config);
    }
    let currentDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(absoluteSource);
    while(true){
        const config = configsByDirectory.get(currentDirectory);
        if (config) {
            return config;
        }
        if (currentDirectory === absoluteRoot) {
            break;
        }
        const parentDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(currentDirectory);
        if (parentDirectory === currentDirectory || !(parentDirectory === absoluteRoot || parentDirectory.startsWith(`${absoluteRoot}${__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep}`))) {
            break;
        }
        currentDirectory = parentDirectory;
    }
    return null;
}
}),
"[project]/parser/src/types/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Actmap Repository Parser
 *
 * Public output contract.
 * All paths are repository-relative POSIX paths.
 * Schema changes must be versioned.
 */ __turbopack_context__.s([
    "REPOSITORY_MAP_SCHEMA_VERSION",
    ()=>REPOSITORY_MAP_SCHEMA_VERSION
]);
const REPOSITORY_MAP_SCHEMA_VERSION = "1.3.0";
}),
"[project]/parser/src/util/map-concurrent.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Runs `task` over every item with at most `limit` in flight, and returns the
 * results in the order of the items.
 */ __turbopack_context__.s([
    "mapConcurrent",
    ()=>mapConcurrent
]);
async function mapConcurrent(items, limit, task) {
    const results = new Array(items.length);
    let next = 0;
    async function worker() {
        while(next < items.length){
            const index = next++;
            results[index] = await task(items[index], index);
        }
    }
    await Promise.all(Array.from({
        length: Math.min(limit, items.length)
    }, ()=>worker()));
    return results;
}
}),
"[project]/parser/src/walker/repository-walker.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RepositoryWalkError",
    ()=>RepositoryWalkError,
    "walkRepository",
    ()=>walkRepository
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
;
class RepositoryWalkError extends Error {
    constructor(message){
        super(message);
        this.name = "RepositoryWalkError";
    }
}
const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024;
const DEFAULT_EXCLUDED_DIRECTORIES = [
    ".git",
    "node_modules",
    ".next",
    ".turbo",
    ".vercel",
    ".cache",
    ".temp",
    "coverage",
    "dist",
    "build",
    "out"
];
const DEFAULT_EXCLUDED_FILES = [
    "tsconfig.tsbuildinfo"
];
const SUPPORTED_EXTENSIONS = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mts",
    ".cts",
    ".mjs",
    ".cjs",
    ".json",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".html",
    ".htm",
    ".md",
    ".mdx",
    ".txt",
    ".py",
    ".sql",
    ".prisma",
    ".graphql",
    ".gql",
    ".sh",
    ".yaml",
    ".yml",
    ".toml",
    ".xml",
    ".svg"
]);
const SUPPORTED_SPECIAL_FILES = new Set([
    ".gitignore",
    ".npmrc",
    ".nvmrc",
    ".prettierrc",
    ".eslintrc",
    ".editorconfig",
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    "dockerfile",
    "makefile",
    "license",
    "readme"
]);
function toPosixPath(value) {
    return value.split(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].sep).join("/");
}
function getLanguage(extension) {
    switch(extension){
        case ".ts":
        case ".tsx":
        case ".mts":
        case ".cts":
            return "typescript";
        case ".js":
        case ".jsx":
        case ".mjs":
        case ".cjs":
            return "javascript";
        case ".json":
            return "json";
        case ".css":
        case ".scss":
        case ".sass":
        case ".less":
            return "css";
        case ".html":
        case ".htm":
            return "html";
        case ".md":
        case ".mdx":
        case ".txt":
            return "markdown";
        case ".py":
            return "python";
        default:
            return "other";
    }
}
function getFileKind(fileName, extension) {
    const name = fileName.toLowerCase();
    if (name.includes(".test.") || name.includes(".spec.") || name.startsWith("test_") || name.endsWith("_test.py") || name.endsWith("_test.go") || name === "tests") {
        return "test";
    }
    if (name.endsWith(".d.ts") || name.endsWith(".d.mts") || name.endsWith(".d.cts")) {
        return "type-declaration";
    }
    if ([
        ".md",
        ".mdx",
        ".txt"
    ].includes(extension) || name === "license") {
        return "documentation";
    }
    if ([
        ".json",
        ".yaml",
        ".yml",
        ".toml",
        ".xml"
    ].includes(extension) || SUPPORTED_SPECIAL_FILES.has(name)) {
        return "configuration";
    }
    if ([
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".mts",
        ".cts",
        ".mjs",
        ".cjs",
        ".py",
        ".sql",
        ".prisma",
        ".graphql",
        ".gql",
        ".sh"
    ].includes(extension)) {
        return "source";
    }
    return "other";
}
function countLines(content) {
    if (content.length === 0) return 0;
    const count = (content.match(/\n/g) ?? []).length;
    return content.endsWith("\n") ? count : count + 1;
}
function getSkipReason(fileName, extension, excludedFiles) {
    if (excludedFiles.has(fileName)) {
        return "excluded_by_file_rule";
    }
    if (!SUPPORTED_EXTENSIONS.has(extension) && !SUPPORTED_SPECIAL_FILES.has(fileName.toLowerCase())) {
        return "unsupported_extension";
    }
    return null;
}
function addSkippedFile(skippedFiles, filePath, reason, message) {
    skippedFiles.push({
        path: filePath,
        reason,
        message
    });
}
async function walkDirectory(directoryPath, rootPath, excludedDirectories, excludedFiles, maxFileSizeBytes, files, skippedFiles, excludedDirectoryEntries, scanIssues) {
    let entries;
    try {
        entries = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readdir"])(directoryPath, {
            withFileTypes: true
        });
    } catch (error) {
        scanIssues.push({
            path: toPosixPath(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(rootPath, directoryPath)) || ".",
            reason: "unreadable_directory",
            message: error instanceof Error ? error.message : "Unable to read directory."
        });
        return;
    }
    entries.sort((a, b)=>a.name.localeCompare(b.name));
    for (const entry of entries){
        const absolutePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(directoryPath, entry.name);
        const relativePath = toPosixPath(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].relative(rootPath, absolutePath));
        if (entry.isSymbolicLink()) {
            scanIssues.push({
                path: relativePath,
                reason: "symbolic_link_ignored",
                message: "Symbolic links are not followed by the repository walker."
            });
            continue;
        }
        if (entry.isDirectory()) {
            if (excludedDirectories.has(entry.name)) {
                excludedDirectoryEntries.push({
                    path: relativePath,
                    reason: "excluded_by_directory_rule"
                });
                continue;
            }
            await walkDirectory(absolutePath, rootPath, excludedDirectories, excludedFiles, maxFileSizeBytes, files, skippedFiles, excludedDirectoryEntries, scanIssues);
            continue;
        }
        if (!entry.isFile()) continue;
        const extension = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].extname(entry.name).toLowerCase();
        const skipReason = getSkipReason(entry.name, extension, excludedFiles);
        if (skipReason) {
            addSkippedFile(skippedFiles, relativePath, skipReason, skipReason === "excluded_by_file_rule" ? "File excluded by parser configuration." : `Unsupported file extension: ${extension || "(none)"}.`);
            continue;
        }
        let fileStats;
        try {
            fileStats = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["stat"])(absolutePath);
        } catch (error) {
            addSkippedFile(skippedFiles, relativePath, "unreadable", error instanceof Error ? error.message : "Unable to access file.");
            continue;
        }
        if (fileStats.size > maxFileSizeBytes) {
            addSkippedFile(skippedFiles, relativePath, "file_too_large", `File exceeds the ${maxFileSizeBytes}-byte size limit.`);
            continue;
        }
        let buffer;
        try {
            buffer = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(absolutePath);
        } catch (error) {
            addSkippedFile(skippedFiles, relativePath, "unreadable", error instanceof Error ? error.message : "Unable to read file.");
            continue;
        }
        if (buffer.length === 0) {
            addSkippedFile(skippedFiles, relativePath, "empty_file", "File is empty.");
            continue;
        }
        if (buffer.includes(0)) {
            addSkippedFile(skippedFiles, relativePath, "binary_file", "File contains null bytes and appears to be binary.");
            continue;
        }
        let content;
        try {
            content = new TextDecoder("utf-8", {
                fatal: true
            }).decode(buffer);
        } catch  {
            addSkippedFile(skippedFiles, relativePath, "invalid_encoding", "File is not valid UTF-8.");
            continue;
        }
        const folderPath = toPosixPath(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].dirname(relativePath));
        files.push({
            id: `file:${relativePath}`,
            path: relativePath,
            name: entry.name,
            extension,
            folderPath: folderPath === "." ? "." : folderPath,
            language: getLanguage(extension),
            kind: getFileKind(entry.name, extension),
            lineCount: countLines(content),
            sizeBytes: buffer.byteLength,
            contentHash: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])("sha256").update(buffer).digest("hex"),
            fanIn: 0,
            fanOut: 0
        });
    }
}
function buildFolders(files, rootName) {
    const folders = new Map();
    folders.set(".", {
        id: "folder:.",
        path: ".",
        name: rootName,
        parentPath: null,
        fileCount: 0
    });
    for (const file of files){
        const segments = file.folderPath === "." ? [] : file.folderPath.split("/");
        const paths = [
            "."
        ];
        let currentPath = "";
        for (const segment of segments){
            currentPath = currentPath ? `${currentPath}/${segment}` : segment;
            paths.push(currentPath);
        }
        for(let index = 1; index < paths.length; index++){
            const folderPath = paths[index];
            if (!folders.has(folderPath)) {
                folders.set(folderPath, {
                    id: `folder:${folderPath}`,
                    path: folderPath,
                    name: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].posix.basename(folderPath),
                    parentPath: paths[index - 1],
                    fileCount: 0
                });
            }
        }
        const directFolder = folders.get(file.folderPath);
        if (directFolder) {
            directFolder.fileCount++;
        }
    }
    return Array.from(folders.values()).sort((a, b)=>a.path.localeCompare(b.path));
}
async function walkRepository(options) {
    const rootPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].resolve(options.rootPath);
    const maxFileSizeBytes = options.maxFileSizeBytes ?? DEFAULT_MAX_FILE_SIZE;
    if (!Number.isSafeInteger(maxFileSizeBytes) || maxFileSizeBytes <= 0) {
        throw new RepositoryWalkError("Maximum file size must be a positive safe integer.");
    }
    let rootStats;
    try {
        rootStats = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["stat"])(rootPath);
    } catch  {
        throw new RepositoryWalkError(`Repository path does not exist or cannot be accessed: ${rootPath}`);
    }
    if (!rootStats.isDirectory()) {
        throw new RepositoryWalkError(`Repository path must be a directory: ${rootPath}`);
    }
    const excludedDirectories = new Set([
        ...DEFAULT_EXCLUDED_DIRECTORIES,
        ...options.excludedDirectories ?? []
    ]);
    const excludedFiles = new Set([
        ...DEFAULT_EXCLUDED_FILES,
        ...options.excludedFiles ?? []
    ]);
    const files = [];
    const skippedFiles = [];
    const excludedDirectoryEntries = [];
    const scanIssues = [];
    await walkDirectory(rootPath, rootPath, excludedDirectories, excludedFiles, maxFileSizeBytes, files, skippedFiles, excludedDirectoryEntries, scanIssues);
    files.sort((a, b)=>a.path.localeCompare(b.path));
    const rootName = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(rootPath) || rootPath;
    const folders = buildFolders(files, rootName);
    const filesFound = files.length + skippedFiles.length;
    return {
        files,
        folders,
        skippedFiles,
        excludedDirectories: excludedDirectoryEntries,
        scanIssues,
        statistics: {
            filesFound,
            filesParsed: files.length,
            filesSkipped: skippedFiles.length,
            foldersFound: folders.length
        }
    };
}
}),
"[project]/parser/taxonomy/categories.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1wdb7fw2rnc2f._.js.map