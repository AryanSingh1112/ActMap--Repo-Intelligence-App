(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/theme/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
const listeners = new Set();
function isTheme(value) {
    return value === "system" || value === "light" || value === "dark";
}
function getThemeSnapshot() {
    try {
        const saved = localStorage.getItem("actmap-theme");
        return isTheme(saved) ? saved : "system";
    } catch  {
        return "system";
    }
}
function getServerSnapshot() {
    return "system";
}
function subscribe(listener) {
    listeners.add(listener);
    window.addEventListener("storage", listener);
    return ()=>{
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
    };
}
function ThemeProvider({ children }) {
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getThemeSnapshot, getServerSnapshot);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const root = document.documentElement;
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            const applyTheme = {
                "ThemeProvider.useEffect.applyTheme": ()=>{
                    const resolved = theme === "system" ? media.matches ? "dark" : "light" : theme;
                    root.dataset.theme = resolved;
                    root.style.colorScheme = resolved;
                }
            }["ThemeProvider.useEffect.applyTheme"];
            applyTheme();
            if (theme === "system") {
                media.addEventListener("change", applyTheme);
                return ({
                    "ThemeProvider.useEffect": ()=>media.removeEventListener("change", applyTheme)
                })["ThemeProvider.useEffect"];
            }
        }
    }["ThemeProvider.useEffect"], [
        theme
    ]);
    function setTheme(nextTheme) {
        try {
            localStorage.setItem("actmap-theme", nextTheme);
        } finally{
            listeners.forEach((listener)=>listener());
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            setTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme/theme-provider.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_s(ThemeProvider, "yoyGBWagtKfudaXd+RsiXGMu4S0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c = ThemeProvider;
function useTheme() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used inside ThemeProvider");
    }
    return context;
}
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_theme_theme-provider_tsx_0bsw3rjeedl75._.js.map