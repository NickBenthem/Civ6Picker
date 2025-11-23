module.exports = [
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/utils/lobbyUtils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Generate a random lobby code in the format XXX-XXX
__turbopack_context__.s([
    "generateLobbyCode",
    ()=>generateLobbyCode,
    "isValidLobbyCode",
    ()=>isValidLobbyCode,
    "normalizeLobbyCode",
    ()=>normalizeLobbyCode
]);
function generateLobbyCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const part1 = Array.from({
        length: 3
    }, ()=>chars[Math.floor(Math.random() * chars.length)]).join('');
    const part2 = Array.from({
        length: 3
    }, ()=>chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${part1}-${part2}`;
}
function isValidLobbyCode(code) {
    // Check for empty or undefined values
    if (!code || code.trim() === '') {
        return false;
    }
    const lobbyCodeRegex = /^[A-Z0-9]{3}-[A-Z0-9]{3}$/;
    return lobbyCodeRegex.test(code.toUpperCase());
}
function normalizeLobbyCode(code) {
    return code.toUpperCase().replace(/[^A-Z0-9-]/g, '');
}
}),
"[project]/src/components/LobbySetup.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LobbySetup",
    ()=>LobbySetup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-rsc] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-rsc] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-rsc] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-rsc] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/lobbyUtils.ts [app-rsc] (ecmascript)");
;
;
;
;
function LobbySetup({ onReady, initialLobbyCode }) {
    const [lobbyCode, setLobbyCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])('');
    const [userName, setUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLobbyValid, setIsLobbyValid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFormValid, setIsFormValid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [invalidLobbyMessage, setInvalidLobbyMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])('');
    // Set initial lobby code on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialLobbyCode && initialLobbyCode.trim() !== '' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(initialLobbyCode)) {
            setLobbyCode(initialLobbyCode);
            setInvalidLobbyMessage('');
        } else {
            const generatedCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateLobbyCode"])();
            setLobbyCode(generatedCode);
            if (initialLobbyCode && initialLobbyCode.trim() !== '') {
                setInvalidLobbyMessage(`Invalid lobby code format: "${initialLobbyCode}". Please use the format XXX-XXX (e.g., ABC-123)`);
            }
        }
    }, [
        initialLobbyCode
    ]);
    // Update lobby code input when initialLobbyCode becomes available
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialLobbyCode && initialLobbyCode.trim() !== '' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(initialLobbyCode)) {
            setLobbyCode(initialLobbyCode);
            setInvalidLobbyMessage('');
        }
    }, [
        initialLobbyCode
    ]);
    // Validate lobby code whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsLobbyValid((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(lobbyCode));
    }, [
        lobbyCode
    ]);
    // Check if form is valid (both lobby code and username)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setIsFormValid(isLobbyValid && userName.trim().length > 0);
    }, [
        isLobbyValid,
        userName
    ]);
    const handleLobbyCodeChange = (e)=>{
        const value = e.target.value;
        setLobbyCode(value);
    };
    const handleUserNameChange = (e)=>{
        setUserName(e.target.value);
    };
    const handleGenerateNewCode = ()=>{
        setLobbyCode((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateLobbyCode"])());
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (isFormValid) {
            const normalizedCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeLobbyCode"])(lobbyCode);
            onReady(normalizedCode, userName.trim());
        }
    };
    const handleCopyToClipboard = async ()=>{
        try {
            await navigator.clipboard.writeText(lobbyCode);
        // You could add a toast notification here if desired
        } catch (err) {
            console.error('Failed to copy lobby code:', err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-start sm:items-center justify-center p-2 sm:p-4 mobile-container overflow-x-hidden pt-16 sm:pt-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gray-800 rounded-xl border-2 border-yellow-500/20 p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md w-full shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center mb-4 sm:mb-6 lg:mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-2 mb-3 sm:mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                    className: "w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-lg sm:text-xl lg:text-2xl font-bold text-white",
                                    children: "Civ6 Ban Stage"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LobbySetup.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs sm:text-sm lg:text-base text-gray-400",
                            children: "Join the multiplayer leader ban phase"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LobbySetup.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LobbySetup.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                invalidLobbyMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-300",
                        children: invalidLobbyMessage
                    }, void 0, false, {
                        fileName: "[project]/src/components/LobbySetup.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/LobbySetup.tsx",
                    lineNumber: 91,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-3 sm:space-y-4 lg:space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "lobbyCode",
                                    className: "block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2",
                                    children: "Lobby Code"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "lobbyCode",
                                            value: lobbyCode,
                                            onChange: handleLobbyCodeChange,
                                            className: `w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 text-sm sm:text-base font-mono ${isLobbyValid ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : 'border-gray-600 focus:border-yellow-500 focus:ring-yellow-500'}`,
                                            placeholder: "XXX-XXX",
                                            maxLength: 7,
                                            required: true,
                                            style: {
                                                fontSize: '16px',
                                                transform: 'scale(1)',
                                                transformOrigin: 'top left'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LobbySetup.tsx",
                                            lineNumber: 103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleCopyToClipboard,
                                                    className: "p-1 text-gray-400 hover:text-white transition-colors",
                                                    title: "Copy lobby code",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LobbySetup.tsx",
                                                        lineNumber: 125,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleGenerateNewCode,
                                                    className: "p-1 text-gray-400 hover:text-white transition-colors",
                                                    title: "Generate new code",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/LobbySetup.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/LobbySetup.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this),
                                !isLobbyValid && lobbyCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-red-400 mt-1",
                                    children: invalidLobbyMessage || 'Please enter a valid lobby code (XXX-XXX)'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LobbySetup.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    htmlFor: "userName",
                                    className: "block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2",
                                    children: "Your Name"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    id: "userName",
                                    value: userName,
                                    onChange: handleUserNameChange,
                                    className: "w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-sm sm:text-base",
                                    placeholder: "Enter your name...",
                                    maxLength: 20,
                                    required: true,
                                    style: {
                                        fontSize: '16px',
                                        transform: 'scale(1)',
                                        transformOrigin: 'top left'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 149,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LobbySetup.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: !isFormValid,
                            className: `w-full font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2 mobile-touch-target ${isFormValid ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                    className: "w-4 h-4 sm:w-5 sm:h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs sm:text-sm lg:text-base",
                                    children: "Join Ban Stage"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LobbySetup.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LobbySetup.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LobbySetup.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 sm:mt-4 lg:mt-6 text-center text-xs sm:text-sm text-gray-500",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Share the lobby code with other players to join the same session"
                    }, void 0, false, {
                        fileName: "[project]/src/components/LobbySetup.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/LobbySetup.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/LobbySetup.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/LobbySetup.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
}),
"[project]/supabase/data/civ6leaderdata.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"civilization\":\"American\",\"civilization_key\":\"American__Civ6_.png\",\"leader\":\"Teddy Roosevelt\",\"leader_key\":\"Teddy_Roosevelt__Civ6_.png\",\"ability\":\"+5 Strength Combat Strength for all units inside America's home continent. +1 Appeal to all tiles in cities with a National Park. Gains the Rough Rider unique unit with Rifling.\",\"unique_units\":\"P-51 Mustang\",\"unit_keys\":\"P-51_Mustang__Civ6_.png\",\"unique_infrastructure\":\"Film Studio\",\"infra_keys\":\"Film_Studio__Civ6_.png\",\"civilization_bonus\":\"All  Diplomatic policy slots in the current government are converted to  Wildcard slots. +1  Diplomatic Favor per turn for each Wildcard slot in the current government.\"},{\"civilization\":\"American\",\"civilization_key\":\"American__Civ6_.png\",\"leader\":\"Teddy Roosevelt (Bull Moose)\",\"leader_key\":\"Teddy_Roosevelt__Civ6_.png\",\"ability\":\"Tiles with Breathtaking Appeal gain +2  Science when adjacent to a Natural Wonder or Mountain, and +2  Culture when adjacent to a Wonder or Woods. +1 Appeal in all tiles in cities with a National Park.\",\"unique_units\":\"P-51 Mustang\",\"unit_keys\":\"P-51_Mustang__Civ6_.png\",\"unique_infrastructure\":\"Film Studio\",\"infra_keys\":\"Film_Studio__Civ6_.png\",\"civilization_bonus\":\"All  Diplomatic policy slots in the current government are converted to  Wildcard slots. +1  Diplomatic Favor per turn for each Wildcard slot in the current government.\"},{\"civilization\":\"American\",\"civilization_key\":\"American__Civ6_.png\",\"leader\":\"Teddy Roosevelt (Rough Rider)\",\"leader_key\":\"Teddy_Roosevelt__Rough_Rider___Civ6_.png\",\"ability\":\"+5  Combat Strength for all units inside America's home continent.  Envoys sent to city-states that America has a  Trade Route with count as two  Envoys. Gains the Rough Rider unique unit with Rifling.\",\"unique_units\":\"P-51 Mustang\",\"unit_keys\":\"P-51_Mustang__Civ6_.png\",\"unique_infrastructure\":\"Film Studio\",\"infra_keys\":\"Film_Studio__Civ6_.png\",\"civilization_bonus\":\"All  Diplomatic policy slots in the current government are converted to  Wildcard slots. +1  Diplomatic Favor per turn for each Wildcard slot in the current government.\"},{\"civilization\":\"American\",\"civilization_key\":\"American__Civ6_.png\",\"leader\":\"Abraham Lincoln\",\"leader_key\":\"Abraham_Lincoln__Civ6_.png\",\"ability\":\"Industrial Zones grant +2  Amenities and +3 Loyalty per turn but Plantations give -2 Loyalty. Receives a free Melee unit after constructing Industrial Zones and their buildings. The free unit does not require resources when created or to maintain and receives +5  Combat Strength.\",\"unique_units\":\"P-51 Mustang\",\"unit_keys\":\"P-51_Mustang__Civ6_.png\",\"unique_infrastructure\":\"Film Studio\",\"infra_keys\":\"Film_Studio__Civ6_.png\",\"civilization_bonus\":\"All  Diplomatic policy slots in the current government are converted to  Wildcard slots. +1  Diplomatic Favor per turn for each Wildcard slot in the current government.\"},{\"civilization\":\"Arabian\",\"civilization_key\":\"Arabian__Civ6_.png\",\"leader\":\"Saladin (Vizier)\",\"leader_key\":\"Saladin__Civ6_.png\",\"ability\":\"The Worship building for Arabia's Religion is 90% cheaper to purchase with  Faith. Arabian cities with that building gain +10%  Science,  Faith, and  Culture.\",\"unique_units\":\"Mamluk\",\"unit_keys\":\"Mamluk__Civ6_.png\",\"unique_infrastructure\":\"Madrasa\",\"infra_keys\":\"Madrasa__Civ6_.png\",\"civilization_bonus\":\"Automatically receives the final  Great Prophet when the next-to-last one is claimed (unless one has already been earned through other means). +1  Science per foreign city following Arabia's Religion.\"},{\"civilization\":\"Arabian\",\"civilization_key\":\"Arabian__Civ6_.png\",\"leader\":\"Saladin (Sultan)\",\"leader_key\":\"Saladin__Sultan___Civ6_.png\",\"ability\":\"+100% Flanking and Support bonus to all Combat and Religious units.\",\"unique_units\":\"Mamluk\",\"unit_keys\":\"Mamluk__Civ6_.png\",\"unique_infrastructure\":\"Madrasa\",\"infra_keys\":\"Madrasa__Civ6_.png\",\"civilization_bonus\":\"Automatically receives the final  Great Prophet when the next-to-last one is claimed (unless one has already been earned through other means). +1  Science per foreign city following Arabia's Religion.\"},{\"civilization\":\"Australian\",\"civilization_key\":\"Australian__Civ6_.png\",\"leader\":\"John Curtin\",\"leader_key\":\"John_Curtin__Civ6_.png\",\"ability\":\"+100%  Production if they have either received a declaration of war or liberated a city in the past 10 turns.\",\"unique_units\":\"Digger\",\"unit_keys\":\"Digger__Civ6_.png\",\"unique_infrastructure\":\"Outback Station\",\"infra_keys\":\"Outback_Station__Civ6_.png\",\"civilization_bonus\":\"+3  Housing in coastal cities. Building a Pasture triggers a Culture Bomb, claiming surrounding tiles. Campus, Commercial Hub, Holy Site, and Theater Square districts gain +1 to their yields in tiles with Charming Appeal, and +3 in tiles with Breathtaking Appeal.\"},{\"civilization\":\"Aztec\",\"civilization_key\":\"Aztec__Civ6_.png\",\"leader\":\"Montezuma\",\"leader_key\":\"Montezuma__Civ6_.png\",\"ability\":\"Improved Luxury resources provide an  Amenity to 2 extra cities. Military units receive +1  Combat Strength for each different improved Luxury resource in Aztec territory.\",\"unique_units\":\"Eagle Warrior\",\"unit_keys\":\"Eagle_Warrior__Civ6_.png\",\"unique_infrastructure\":\"Tlachtli\",\"infra_keys\":\"Tlachtli__Civ6_.png\",\"civilization_bonus\":\"Can spend Builder charges to complete 20% of a district's  Production cost.\"},{\"civilization\":\"Babylonian\",\"civilization_key\":\"Babylonian__Civ6_.png\",\"leader\":\"Hammurabi\",\"leader_key\":\"Hammurabi__Civ6_.png\",\"ability\":\"Upon building each type of specialty  District, except the Government Plaza, for the first time, instantly receives the building with the lowest  Production cost that can be built in that district. Upon building any other district for the first time, receives a free  Envoy.\",\"unique_units\":\"Sabum Kibittum\",\"unit_keys\":\"Sabum_Kibittum__Civ6_.png\",\"unique_infrastructure\":\"Palgum\",\"infra_keys\":\"Palgum__Civ6_.png\",\"civilization_bonus\":\"Eurekas instantly unlock their respective technologies. -50%  Science per turn.\"},{\"civilization\":\"Brazilian\",\"civilization_key\":\"Brazilian__Civ6_.png\",\"leader\":\"Pedro II\",\"leader_key\":\"Pedro_II__Civ6_.png\",\"ability\":\"Recruiting or patronizing a  Great Person refunds 20% of their point cost.\",\"unique_units\":\"Minas Geraes\",\"unit_keys\":\"Minas_Geraes__Civ6_.png\",\"unique_infrastructure\":\"Street Carnival\",\"infra_keys\":\"Entertainment_Complex__Civ6_.png\",\"civilization_bonus\":\"Rainforest tiles provide a +1 adjacency bonus for Campus, Commercial Hub, Holy Site, and Theater Square districts. Owned Rainforests provide +1 Appeal to adjacent tiles, instead of the usual -1.\"},{\"civilization\":\"Brazilian\",\"civilization_key\":\"Brazilian__Civ6_.png\",\"leader\":\"Pedro II\",\"leader_key\":\"Pedro_II__Civ6_.png\",\"ability\":\"Recruiting or patronizing a  Great Person refunds 20% of their point cost.\",\"unique_units\":\"Minas Geraes\",\"unit_keys\":\"Minas_Geraes__Civ6_.png\",\"unique_infrastructure\":\"Copacabana\",\"infra_keys\":\"Copacabana__Civ6_.png\",\"civilization_bonus\":\"Rainforest tiles provide a +1 adjacency bonus for Campus, Commercial Hub, Holy Site, and Theater Square districts. Owned Rainforests provide +1 Appeal to adjacent tiles, instead of the usual -1.\"},{\"civilization\":\"Byzantine\",\"civilization_key\":\"Byzantine__Civ6_.png\",\"leader\":\"Basil II\",\"leader_key\":\"Basil_II__Civ6_.png\",\"ability\":\"Heavy and light cavalry units deal full damage when attacking cities following the same Religion as Byzantium. Gains the Tagma unique unit with Divine Right.\",\"unique_units\":\"Dromon\",\"unit_keys\":\"Dromon__Civ6_.png\",\"unique_infrastructure\":\"Hippodrome\",\"infra_keys\":\"Entertainment_Complex__Civ6_.png\",\"civilization_bonus\":\"+3  Combat and  Religious Strength for all units for each Holy City converted to Byzantium's Religion (including Byzantium's own Holy City). Byzantium's Religion is spread to nearby cities when a unit from an enemy civilization or city-state is defeated. +1  Great Prophet point from Holy Sites.\"},{\"civilization\":\"Byzantine\",\"civilization_key\":\"Byzantine__Civ6_.png\",\"leader\":\"Theodora\",\"leader_key\":\"Theodora__Civ6_.png\",\"ability\":\"Holy Sites provide  Culture equal to their adjacency bonus. Farms provide a +1  Faith adjacency to Hippodromes and Holy Sites.\",\"unique_units\":\"Dromon\",\"unit_keys\":\"Dromon__Civ6_.png\",\"unique_infrastructure\":\"Hippodrome\",\"infra_keys\":\"Entertainment_Complex__Civ6_.png\",\"civilization_bonus\":\"+3  Combat and  Religious Strength for all units for each Holy City converted to Byzantium's Religion (including Byzantium's own Holy City). Byzantium's Religion is spread to nearby cities when a unit from an enemy civilization or city-state is defeated. +1  Great Prophet point from Holy Sites.\"},{\"civilization\":\"Canadian\",\"civilization_key\":\"Canadian__Civ6_.png\",\"leader\":\"Wilfrid Laurier\",\"leader_key\":\"Wilfrid_Laurier__Civ6_.png\",\"ability\":\"Can build Farms on Tundra tiles, and on Tundra Hills tiles with Civil Engineering. Snow, Snow Hills, Tundra Hills, and Tundra tiles cost 50% less  Gold to purchase. On those tiles, resources accumulate twice as fast, Mines and Lumber Mills receive +2  Production, and Camps and Farms receive +2  Food.\",\"unique_units\":\"Mountie\",\"unit_keys\":\"Mountie__Civ6_.png\",\"unique_infrastructure\":\"Ice Hockey Rink\",\"infra_keys\":\"Ice_Hockey_Rink__Civ6_.png\",\"civilization_bonus\":\"Cannot declare Surprise Wars or war on city-states. Surprise Wars cannot be declared on Canada. For every 100  Tourism earned, gain 1  Diplomatic Favor. +100%  Diplomatic Favor gained from successfully completing Emergencies or Scored Competitions.\"},{\"civilization\":\"Chinese\",\"civilization_key\":\"Chinese__Civ6_.png\",\"leader\":\"Qin Shi Huang (Mandate of Heaven)\",\"leader_key\":\"Qin_Shi_Huang__Civ6_.png\",\"ability\":\"Builders receive an additional build charge. Can spend Builder charges to complete 15% of the  Production cost for Ancient and Classical wonders. Unlocks Canals with Masonry instead of Steam Power.\",\"unique_units\":\"Crouching Tiger\",\"unit_keys\":\"Crouching_Tiger__Civ6_.png\",\"unique_infrastructure\":\"Great Wall\",\"infra_keys\":\"Great_Wall__Civ6_.png\",\"civilization_bonus\":\"Eurekas and  Inspirations provide an extra 10% of the  Science and  Culture cost for researching technologies and civics. Completing a Wonder grants a  Eureka and  Inspiration from that Wonder's era.\"},{\"civilization\":\"Chinese\",\"civilization_key\":\"Chinese__Civ6_.png\",\"leader\":\"Qin Shi Huang (Unifier)\",\"leader_key\":\"Qin_Shi_Huang__Unifier___Civ6_.png\",\"ability\":\"All land melee units gain access to the unique Convert Barbarians action, which consumes the unit to transform all adjacent Barbarian units into Chinese units.\",\"unique_units\":\"Crouching Tiger\",\"unit_keys\":\"Crouching_Tiger__Civ6_.png\",\"unique_infrastructure\":\"Great Wall\",\"infra_keys\":\"Great_Wall__Civ6_.png\",\"civilization_bonus\":\"Eurekas and  Inspirations provide an extra 10% of the  Science and  Culture cost for researching technologies and civics. Completing a Wonder grants a  Eureka and  Inspiration from that Wonder's era.\"},{\"civilization\":\"Chinese\",\"civilization_key\":\"Chinese__Civ6_.png\",\"leader\":\"Kublai Khan (Chinese)\",\"leader_key\":\"Kublai_Khan__Chinese___Civ6_.png\",\"ability\":\"Dynastic Cycle Eureka s and Inspiration s provide an extra 10% of the Science and Culture cost for researching technologies and civics. Completing a Wonder grants a Eureka and Inspiration from that Wonder's era.\",\"unique_units\":\"Crouching Tiger\",\"unit_keys\":\"Crouching_Tiger__Civ6_.png\",\"unique_infrastructure\":\"Great Wall\",\"infra_keys\":\"Great_Wall__Civ6_.png\",\"civilization_bonus\":\"Eurekas and  Inspirations provide an extra 10% of the  Science and  Culture cost for researching technologies and civics. Completing a Wonder grants a  Eureka and  Inspiration from that Wonder's era.\"},{\"civilization\":\"Chinese\",\"civilization_key\":\"Chinese__Civ6_.png\",\"leader\":\"Yongle\",\"leader_key\":\"Yongle__Civ6_.png\",\"ability\":\"All cities gain access to three unique Lijia projects, which can either convert 50% of their  Production into  Food or  Faith, or 100% of their  Production into  Gold. Cities with 10 or more  Population gain +2  Gold, +1  Science and +1  Culture for every  Population.\",\"unique_units\":\"Crouching Tiger\",\"unit_keys\":\"Crouching_Tiger__Civ6_.png\",\"unique_infrastructure\":\"Great Wall\",\"infra_keys\":\"Great_Wall__Civ6_.png\",\"civilization_bonus\":\"Eurekas and  Inspirations provide an extra 10% of the  Science and  Culture cost for researching technologies and civics. Completing a Wonder grants a  Eureka and  Inspiration from that Wonder's era.\"},{\"civilization\":\"Chinese\",\"civilization_key\":\"Chinese__Civ6_.png\",\"leader\":\"Wu Zetian\",\"leader_key\":\"Wu_Zetian__Civ6_.png\",\"ability\":\"Receives a free Spy with Defensive Tactics and Spies can be purchased with  Faith. Spies operate as if 1 level more experienced. Upon completing a successful offensive espionage mission on a foreign city, receives 100% of the Science,  Faith and  Culture that city produced that turn.\",\"unique_units\":\"Crouching Tiger\",\"unit_keys\":\"Crouching_Tiger__Civ6_.png\",\"unique_infrastructure\":\"Great Wall\",\"infra_keys\":\"Great_Wall__Civ6_.png\",\"civilization_bonus\":\"Eurekas and  Inspirations provide an extra 10% of the  Science and  Culture cost for researching technologies and civics. Completing a Wonder grants a  Eureka and  Inspiration from that Wonder's era.\"},{\"civilization\":\"Cree\",\"civilization_key\":\"Cree__Civ6_.png\",\"leader\":\"Poundmaker\",\"leader_key\":\"Poundmaker__Civ6_.png\",\"ability\":\"All Alliance types provide Shared Visibility.  Trade Routes grant +1  Food in the sending city and +1  Gold in the receiving city per Camp or Pasture in the receiving city.\",\"unique_units\":\"Okihtcitaw\",\"unit_keys\":\"Okihtcitaw__Civ6_.png\",\"unique_infrastructure\":\"Mekewap\",\"infra_keys\":\"Mekewap__Civ6_.png\",\"civilization_bonus\":\"Gains +1  Trade Route capacity and a free Trader with Pottery. Unclaimed tiles within three tiles of a Cree city come under Cree control when a Trader first moves into them.\"},{\"civilization\":\"Dutch\",\"civilization_key\":\"Dutch__Civ6_.png\",\"leader\":\"Wilhelmina\",\"leader_key\":\"Wilhelmina__Civ6_.png\",\"ability\":\"Domestic  Trade Routes provide +2 Loyalty per turn for the starting city. +2  Culture for each  Trade Route sent to or received from a foreign civilization.\",\"unique_units\":\"De Zeven Provinciën\",\"unit_keys\":\"De_Zeven_Provincien__Civ6_.png\",\"unique_infrastructure\":\"Polder\",\"infra_keys\":\"Polder__Civ6_.png\",\"civilization_bonus\":\"Rivers provide a +2 adjacency bonus for Campus, Theater Square, and Industrial Zone districts. Building a Harbor triggers a Culture Bomb, claiming surrounding tiles. +50%  Production towards the Dam district and Flood Barrier building.\"},{\"civilization\":\"Egyptian\",\"civilization_key\":\"Egyptian__Civ6_.png\",\"leader\":\"Cleopatra (Ptolemaic)\",\"leader_key\":\"Cleopatra__Ptolemaic___Civ6_.png\",\"ability\":\"+1  Food and  Culture for resources on Floodplains. Owned Floodplains grant +1 Appeal to adjacent tiles, instead of the usual -1.\",\"unique_units\":\"Maryannu Chariot Archer\",\"unit_keys\":\"Maryannu_Chariot_Archer__Civ6_.png\",\"unique_infrastructure\":\"Sphinx\",\"infra_keys\":\"Sphinx__Civ6_.png\",\"civilization_bonus\":\"+15%  Production towards districts and wonders built next to a River. Districts, improvements and units are immune to damage from floods.\"},{\"civilization\":\"Egyptian\",\"civilization_key\":\"Egyptian__Civ6_.png\",\"leader\":\"Ramses II\",\"leader_key\":\"Ramses_II__Civ6_.png\",\"ability\":\"Receives  Culture equal to 15% of the  Production cost after completing a building, and 30% after completing a wonder.\",\"unique_units\":\"Maryannu Chariot Archer\",\"unit_keys\":\"Maryannu_Chariot_Archer__Civ6_.png\",\"unique_infrastructure\":\"Sphinx\",\"infra_keys\":\"Sphinx__Civ6_.png\",\"civilization_bonus\":\"+15%  Production towards districts and wonders built next to a River. Districts, improvements and units are immune to damage from floods.\"},{\"civilization\":\"English\",\"civilization_key\":\"English__Civ6_.png\",\"leader\":\"Victoria (Age of Empire)\",\"leader_key\":\"Victoria__Civ6_.png\",\"ability\":\"The first city founded on each continent other than England's home continent grants a free melee unit in that city and +1  Trade Route capacity. Building a Royal Navy Dockyard grants a free naval unit. Gains the Redcoat unique unit with Military Science.\",\"unique_units\":\"Sea Dog\",\"unit_keys\":\"Sea_Dog__Civ6_.png\",\"unique_infrastructure\":\"Royal Navy Dockyard\",\"infra_keys\":\"Harbor__Civ6_.png\",\"civilization_bonus\":\"Iron and Coal Mines accumulate +2 resources per turn. +100%  Production towards Military Engineers. Military Engineers receive +2 charges. Buildings that provide additional yields when powered receive +4 of their respective yields. +20%  Production towards Industrial Zone buildings. Harbor buildings grant +10 Strategic Resource stockpiles.\"},{\"civilization\":\"English\",\"civilization_key\":\"English__Civ6_.png\",\"leader\":\"Victoria (Age of Steam)\",\"leader_key\":\"Victoria__Age_of_Steam___Civ6_.png\",\"ability\":\"+10%  Production in cities for each Industrial Zone building in that city. +2  Production to all Strategic Resources.\",\"unique_units\":\"Sea Dog\",\"unit_keys\":\"Sea_Dog__Civ6_.png\",\"unique_infrastructure\":\"Royal Navy Dockyard\",\"infra_keys\":\"Harbor__Civ6_.png\",\"civilization_bonus\":\"Iron and Coal Mines accumulate +2 resources per turn. +100%  Production towards Military Engineers. Military Engineers receive +2 charges. Buildings that provide additional yields when powered receive +4 of their respective yields. +20%  Production towards Industrial Zone buildings. Harbor buildings grant +10 Strategic Resource stockpiles.\"},{\"civilization\":\"English\",\"civilization_key\":\"English__Civ6_.png\",\"leader\":\"Eleanor of Aquitaine (English)\",\"leader_key\":\"Eleanor_of_Aquitaine__English___Civ6_.png\",\"ability\":\"Each Great Work in her cities causes foreign cities within 9 tiles to lose 1 Loyalty per turn. Any foreign city that leaves its civilization due to loss of Loyalty and is receiving the most Loyalty pressure from Eleanor instantly joins her empire, instead of becoming a Free City.\",\"unique_units\":\"Sea Dog\",\"unit_keys\":\"Sea_Dog__Civ6_.png\",\"unique_infrastructure\":\"Royal Navy Dockyard\",\"infra_keys\":\"Harbor__Civ6_.png\",\"civilization_bonus\":\"Iron and Coal Mines accumulate +2 resources per turn. +100%  Production towards Military Engineers. Military Engineers receive +2 charges. Buildings that provide additional yields when powered receive +4 of their respective yields. +20%  Production towards Industrial Zone buildings. Harbor buildings grant +10 Strategic Resource stockpiles.\"},{\"civilization\":\"English\",\"civilization_key\":\"English__Civ6_.png\",\"leader\":\"Elizabeth I\",\"leader_key\":\"Elizabeth_I__Civ6_.png\",\"ability\":\"+2  Trade Route capacity upon recruiting the first  Great Admiral.  Trade Routes to city-states gain +3  Gold for every specialty district at the origin city. +100% yields from plundering  Trade Routes.\",\"unique_units\":\"Sea Dog\",\"unit_keys\":\"Sea_Dog__Civ6_.png\",\"unique_infrastructure\":\"Royal Navy Dockyard\",\"infra_keys\":\"Harbor__Civ6_.png\",\"civilization_bonus\":\"Iron and Coal Mines accumulate +2 resources per turn. +100%  Production towards Military Engineers. Military Engineers receive +2 charges. Buildings that provide additional yields when powered receive +4 of their respective yields. +20%  Production towards Industrial Zone buildings. Harbor buildings grant +10 Strategic Resource stockpiles.\"},{\"civilization\":\"Ethiopian\",\"civilization_key\":\"Ethiopian__Civ6_.png\",\"leader\":\"Menelik II\",\"leader_key\":\"Menelik_II__Civ6_.png\",\"ability\":\"Ethiopian cities founded on Hills receive  Science and  Culture equal to 15% of their  Faith output. +4  Combat Strength for all units when fighting on hills.\",\"unique_units\":\"Oromo Cavalry\",\"unit_keys\":\"Oromo_Cavalry__Civ6_.png\",\"unique_infrastructure\":\"Rock-Hewn Church\",\"infra_keys\":\"Rock-Hewn_Church__Civ6_.png\",\"civilization_bonus\":\"Improved resource tiles receive +1  Faith for each copy of the resource the city owns. International  Trade Routes grant +5  Faith for each resource in the origin city. Can purchase Archaeologists and Archaeological Museums with Faith.\"},{\"civilization\":\"French\",\"civilization_key\":\"French__Civ6_.png\",\"leader\":\"Catherine de Medici (Black Queen)\",\"leader_key\":\"Catherine_de_Medici__Civ6_.png\",\"ability\":\"Gains +1 level of  Diplomatic Visibility with every encountered civilization. Receives a free Spy with Castles. All Spies start with a free promotion.\",\"unique_units\":\"Garde Impériale\",\"unit_keys\":\"Garde_Impériale__Civ6_.png\",\"unique_infrastructure\":\"Château\",\"infra_keys\":\"Château__Civ6_.png\",\"civilization_bonus\":\"+20%  Production towards Medieval, Renaissance and Industrial Era Wonders. Double  Tourism from Wonders of any Era.\"},{\"civilization\":\"French\",\"civilization_key\":\"French__Civ6_.png\",\"leader\":\"Catherine de Medici (Magnificence)\",\"leader_key\":\"Catherine_de_Medici__Magnificence___Civ6_.png\",\"ability\":\"+2  Culture for improved Luxury resources adjacent to a Theater Square or Château. Cities with a Theater Square gain the unique Court Festival project, which upon completion grants  Culture and  Tourism based on the number of excess copies of the Luxury resources that France possesses.\",\"unique_units\":\"Garde Impériale\",\"unit_keys\":\"Garde_Impériale__Civ6_.png\",\"unique_infrastructure\":\"Château\",\"infra_keys\":\"Château__Civ6_.png\",\"civilization_bonus\":\"+20%  Production towards Medieval, Renaissance and Industrial Era Wonders. Double  Tourism from Wonders of any Era.\"},{\"civilization\":\"French\",\"civilization_key\":\"French__Civ6_.png\",\"leader\":\"Eleanor of Aquitaine (French)\",\"leader_key\":\"Eleanor_of_Aquitaine__French___Civ6_.png\",\"ability\":\"Grand Tour +20% Production towards Medieval, Renaissance and Industrial Era Wonders. Double Tourism from Wonders of any Era.\",\"unique_units\":\"Garde Impériale\",\"unit_keys\":\"Garde_Impériale__Civ6_.png\",\"unique_infrastructure\":\"Château\",\"infra_keys\":\"Château__Civ6_.png\",\"civilization_bonus\":\"+20%  Production towards Medieval, Renaissance and Industrial Era Wonders. Double  Tourism from Wonders of any Era.\"},{\"civilization\":\"Gallic\",\"civilization_key\":\"Gallic__Civ6_.png\",\"leader\":\"Ambiorix\",\"leader_key\":\"Ambiorix__Civ6_.png\",\"ability\":\"Receives  Culture equal to 20% of the  Production cost after training a non-civilian unit. Melee, ranged and anti-cavalry units receive +2  Combat Strength for each adjacent military unit.\",\"unique_units\":\"Gaesatae\",\"unit_keys\":\"Gaesatae__Civ6_.png\",\"unique_infrastructure\":\"Oppidum\",\"infra_keys\":\"Industrial_Zone__Civ6_.png\",\"civilization_bonus\":\"Mines gain +1  Culture, provide a +5 adjacency bonus for all districts and trigger a Culture Bomb when built, claiming surrounding unowned tiles. Specialty districts do not receive an adjacency bonus from other districts and cannot be built next to the City Center.\"},{\"civilization\":\"Georgian\",\"civilization_key\":\"Georgian__Civ6_.png\",\"leader\":\"Tamar\",\"leader_key\":\"Tamar__Civ6_.png\",\"ability\":\"Gains  Faith from combat victories equal to 50% of the  Combat Strength of the defeated unit. Each  Envoy sent to a city-state of Georgia's majority Religion counts as two  Envoys.\",\"unique_units\":\"Khevsur\",\"unit_keys\":\"Khevsur__Civ6_.png\",\"unique_infrastructure\":\"Tsikhe\",\"infra_keys\":\"Tsikhe__Civ6_.png\",\"civilization_bonus\":\"Dedications chosen at the beginning of a Golden Age or Heroic Age also grant their Normal Age bonuses towards improving Era Score, in addition to their regular bonuses. +50%  Production towards walls.\"},{\"civilization\":\"German\",\"civilization_key\":\"German__Civ6_.png\",\"leader\":\"Frederick Barbarossa\",\"leader_key\":\"Frederick_Barbarossa__Civ6_.png\",\"ability\":\"Gains an additional  Military policy slot in all Governments. +7  Combat Strength for all units when fighting city-states and their units.\",\"unique_units\":\"U-Boat\",\"unit_keys\":\"U-Boat__Civ6_.png\",\"unique_infrastructure\":\"Hansa\",\"infra_keys\":\"Industrial_Zone__Civ6_.png\",\"civilization_bonus\":\"Each city can build one more specialty  District than the  Population limit would normally allow.\"},{\"civilization\":\"German\",\"civilization_key\":\"German__Civ6_.png\",\"leader\":\"Ludwig II\",\"leader_key\":\"Ludwig_II__Civ6_.png\",\"ability\":\"Wonders, even unfinished, receive a +2  Culture bonus from each adjacent  District. All  Culture adjacency bonuses provide  Tourism after researching Castles.\",\"unique_units\":\"U-Boat\",\"unit_keys\":\"U-Boat__Civ6_.png\",\"unique_infrastructure\":\"Hansa\",\"infra_keys\":\"Industrial_Zone__Civ6_.png\",\"civilization_bonus\":\"Each city can build one more specialty  District than the  Population limit would normally allow.\"},{\"civilization\":\"Gran Colombian\",\"civilization_key\":\"Gran_Colombian__Civ6_.png\",\"leader\":\"Simón Bolívar\",\"leader_key\":\"Sim_n_Bol_var__Civ6_.png\",\"ability\":\"Entering a new era grants a Comandante General, a unique type of  Great Person.\",\"unique_units\":\"Llanero\",\"unit_keys\":\"Llanero__Civ6_.png\",\"unique_infrastructure\":\"Hacienda\",\"infra_keys\":\"Hacienda__Civ6_.png\",\"civilization_bonus\":\"+1  Movement for all units. Promoting a unit does not end that unit's turn.\"},{\"civilization\":\"Greek\",\"civilization_key\":\"Greek__Civ6_.png\",\"leader\":\"Pericles\",\"leader_key\":\"Pericles__Civ6_.png\",\"ability\":\"+5%  Culture per city-state Greece has Suzerainty over.\",\"unique_units\":\"Hoplite\",\"unit_keys\":\"Hoplite__Civ6_.png\",\"unique_infrastructure\":\"Acropolis\",\"infra_keys\":\"Theater_Square__Civ6_.png\",\"civilization_bonus\":\"Gains an additional  Wildcard policy slot in all Governments.\"},{\"civilization\":\"Greek\",\"civilization_key\":\"Greek__Civ6_.png\",\"leader\":\"Gorgo\",\"leader_key\":\"Gorgo__Civ6_.png\",\"ability\":\"Killing a unit provides  Culture equal to 50% of its  Combat Strength. All units gain +1  Combat Strength for every active Military Policy card in the current government.\",\"unique_units\":\"Hoplite\",\"unit_keys\":\"Hoplite__Civ6_.png\",\"unique_infrastructure\":\"Acropolis\",\"infra_keys\":\"Theater_Square__Civ6_.png\",\"civilization_bonus\":\"Gains an additional  Wildcard policy slot in all Governments.\"},{\"civilization\":\"Hungarian\",\"civilization_key\":\"Hungarian__Civ6_.png\",\"leader\":\"Matthias Corvinus\",\"leader_key\":\"Matthias_Corvinus__Civ6_.png\",\"ability\":\"Levied city-state units receive +2  Movement and +5  Combat Strength, and can be upgraded at a 75% discount in  Gold or resources. Levying troops from a city-state grants 2  Envoys with that city-state. Gains the Black Army unique unit with Castles.\",\"unique_units\":\"Huszár\",\"unit_keys\":\"Huszár__Civ6_.png\",\"unique_infrastructure\":\"Thermal Bath\",\"infra_keys\":\"Thermal_Bath__Civ6_.png\",\"civilization_bonus\":\"+50%  Production for districts and buildings built across a river from a City Center.\"},{\"civilization\":\"Incan\",\"civilization_key\":\"Incan__Civ6_.png\",\"leader\":\"Pachacuti\",\"leader_key\":\"Pachacuti__Civ6_.png\",\"ability\":\"Domestic  Trade Routes gain +1  Food for every Mountain tile in the origin city. Gains the Qhapaq Ñan unique improvement with Foreign Trade.\",\"unique_units\":\"Warak'aq\",\"unit_keys\":\"Warak'aq__Civ6_.png\",\"unique_infrastructure\":\"Terrace Farm\",\"infra_keys\":\"Terrace_Farm__Civ6_.png\",\"civilization_bonus\":\"Citizens may work Mountain tiles. Mountain tiles provide +2  Production, and +1  Food for each adjacent Terrace Farm. Mountain tiles provide an additional +1  Production when Inca reaches the Industrial Era.\"},{\"civilization\":\"Indian\",\"civilization_key\":\"Indian__Civ6_.png\",\"leader\":\"Gandhi\",\"leader_key\":\"Gandhi__Civ6_.png\",\"ability\":\"+5  Faith for each met civilization (including India) that has founded a Religion and is not at war. Enemies receive double war weariness from fighting against Gandhi.\",\"unique_units\":\"Varu\",\"unit_keys\":\"Varu__Civ6_.png\",\"unique_infrastructure\":\"Stepwell\",\"infra_keys\":\"Stepwell__Civ6_.png\",\"civilization_bonus\":\"Indian cities receive the Follower Beliefs of all religions with at least one follower in them, not just the majority religion, and gain +1  Amenity for each religion with at least one follower in them. +2 Spread Religion charges for Missionaries. +100% Religious pressure from Indian  Trade Routes.\"},{\"civilization\":\"Indian\",\"civilization_key\":\"Indian__Civ6_.png\",\"leader\":\"Chandragupta\",\"leader_key\":\"Chandragupta__Civ6_.png\",\"ability\":\"Can declare a War of Territorial Expansion with Military Training, instead of Mobilization. +2  Movement and +5  Combat Strength for all units for the next 10 turns after declaring a War of Territorial Expansion.\",\"unique_units\":\"Varu\",\"unit_keys\":\"Varu__Civ6_.png\",\"unique_infrastructure\":\"Stepwell\",\"infra_keys\":\"Stepwell__Civ6_.png\",\"civilization_bonus\":\"Indian cities receive the Follower Beliefs of all religions with at least one follower in them, not just the majority religion, and gain +1  Amenity for each religion with at least one follower in them. +2 Spread Religion charges for Missionaries. +100% Religious pressure from Indian  Trade Routes.\"},{\"civilization\":\"Indonesian\",\"civilization_key\":\"Indonesian__Civ6_.png\",\"leader\":\"Gitarja\",\"leader_key\":\"Gitarja__Civ6_.png\",\"ability\":\"May purchase naval units with  Faith. Religious units pay no movement cost to embark or disembark. City Centers adjacent to Coast or Lake tiles gain +2  Faith.\",\"unique_units\":\"Jong\",\"unit_keys\":\"Jong__Civ6_.png\",\"unique_infrastructure\":\"Kampung\",\"infra_keys\":\"Kampung__Civ6_.png\",\"civilization_bonus\":\"Coast and Lake tiles provide a +5 adjacency bonus for Holy Site, Campus, Industrial Zone, and Theater Square districts. Entertainment Complexes built adjacent to a Coast or Lake tile provide +1  Amenity.\"},{\"civilization\":\"Japanese\",\"civilization_key\":\"Japanese__Civ6_.png\",\"leader\":\"Hojo Tokimune\",\"leader_key\":\"Hojo_Tokimune__Civ6_.png\",\"ability\":\"+5  Combat Strength for land units and naval units fighting on coastal and shallow water tiles. Encampment, Holy Site and Theater Square districts are built in half the time. Districts, improvements and units are immune to damage from Hurricanes. +100% damage from Hurricanes in Japanese territory to civilizations at war with Japan.\",\"unique_units\":\"Samurai\",\"unit_keys\":\"Samurai__Civ6_.png\",\"unique_infrastructure\":\"Electronics Factory\",\"infra_keys\":\"Electronics_Factory__Civ6_.png\",\"civilization_bonus\":\"Districts receive a +1 adjacency bonus for each adjacent district, instead of +5.\"},{\"civilization\":\"Japanese\",\"civilization_key\":\"Japanese__Civ6_.png\",\"leader\":\"Tokugawa\",\"leader_key\":\"Tokugawa__Civ6_.png\",\"ability\":\"International  Trade Routes receive -25% yields and  Tourism, but domestic  Trade Routes gain +1  Culture, +1  Science, and +2  Gold for every specialty district at the destination. Cities within 6 tiles of Japan's  Capital are 100% loyal and, after researching Flight, gain +1  Tourism for every specialty district.\",\"unique_units\":\"Samurai\",\"unit_keys\":\"Samurai__Civ6_.png\",\"unique_infrastructure\":\"Electronics Factory\",\"infra_keys\":\"Electronics_Factory__Civ6_.png\",\"civilization_bonus\":\"Districts receive a +1 adjacency bonus for each adjacent district, instead of +5.\"},{\"civilization\":\"Khmer\",\"civilization_key\":\"Khmer__Civ6_.png\",\"leader\":\"Jayavarman VII\",\"leader_key\":\"Jayavarman_VII__Civ6_.png\",\"ability\":\"Holy Sites grant  Food equal to their adjacency bonus, receive a +2 adjacency bonus from Rivers, grant 2  Housing if built next to a River, and trigger a Culture Bomb when built, claiming surrounding tiles.\",\"unique_units\":\"Domrey\",\"unit_keys\":\"Domrey__Civ6_.png\",\"unique_infrastructure\":\"Prasat\",\"infra_keys\":\"Prasat__Civ6_.png\",\"civilization_bonus\":\"Cities with an Aqueduct receive +1  Amenity, and +1  Faith for every  Population. Farms receive +2  Food when adjacent to an Aqueduct, and +1  Faith when adjacent to a Holy Site.\"},{\"civilization\":\"Kongolese\",\"civilization_key\":\"Kongolese__Civ6_.png\",\"leader\":\"Mvemba a Nzinga\",\"leader_key\":\"Mvemba_a_Nzinga__Civ6_.png\",\"ability\":\"May not build Holy Sites or found a religion, but receives all the beliefs of any religion that has established itself as Kongo's majority religion, not just the Follower beliefs. Building a Mbanza or Theater Square grants a free Apostle of the city's majority religion.\",\"unique_units\":\"Ngao Mbeba\",\"unit_keys\":\"Ngao_Mbeba__Civ6_.png\",\"unique_infrastructure\":\"Mbanza\",\"infra_keys\":\"Neighborhood__Civ6_.png\",\"civilization_bonus\":\"Relics,  Artifacts and  Sculptures grant +2  Food, +2  Production, +1  Faith, and +4  Gold. The Palace has four extra slots for Great Works. +50%  Great Artist,  Great Musician, and  Great Merchant points gained from all sources.\"},{\"civilization\":\"Kongolese\",\"civilization_key\":\"Kongolese__Civ6_.png\",\"leader\":\"Nzinga Mbande\",\"leader_key\":\"Nzinga_Mbande__Civ6_.png\",\"ability\":\"Cities on the same continent as the  Capital (including the  Capital) receive +10% to all yields, while cities on another continent receive -15% to all yields.\",\"unique_units\":\"Ngao Mbeba\",\"unit_keys\":\"Ngao_Mbeba__Civ6_.png\",\"unique_infrastructure\":\"Mbanza\",\"infra_keys\":\"Neighborhood__Civ6_.png\",\"civilization_bonus\":\"Relics,  Artifacts and  Sculptures grant +2  Food, +2  Production, +1  Faith, and +4  Gold. The Palace has four extra slots for Great Works. +50%  Great Artist,  Great Musician, and  Great Merchant points gained from all sources.\"},{\"civilization\":\"Korean\",\"civilization_key\":\"Korean__Civ6_.png\",\"leader\":\"Seondeok\",\"leader_key\":\"Seondeok__Civ6_.png\",\"ability\":\"Cities with an established Governor receive +3%  Culture and +3%  Science for each promotion that Governor has.\",\"unique_units\":\"Hwacha\",\"unit_keys\":\"Hwacha__Civ6_.png\",\"unique_infrastructure\":\"Seowon\",\"infra_keys\":\"Campus__Civ6_.png\",\"civilization_bonus\":\"Farms receive +1  Food and Mines receive +1  Science for each adjacent Seowon.\"},{\"civilization\":\"Korean\",\"civilization_key\":\"Korean__Civ6_.png\",\"leader\":\"Sejong\",\"leader_key\":\"Sejong__Civ6_.png\",\"ability\":\"Upon completing the first technology from a new era, receives  Culture equal to double the current  Science output per turn.\",\"unique_units\":\"Hwacha\",\"unit_keys\":\"Hwacha__Civ6_.png\",\"unique_infrastructure\":\"Seowon\",\"infra_keys\":\"Campus__Civ6_.png\",\"civilization_bonus\":\"Farms receive +1  Food and Mines receive +1  Science for each adjacent Seowon.\"},{\"civilization\":\"Macedonian\",\"civilization_key\":\"Macedonian__Civ6_.png\",\"leader\":\"Alexander\",\"leader_key\":\"Alexander__Civ6_.png\",\"ability\":\"Macedonian cities never incur war weariness. All military units heal completely when a city with a Wonder is captured. Gains the Hetairoi unique unit with Horseback Riding.\",\"unique_units\":\"Hypaspist\",\"unit_keys\":\"Hypaspist__Civ6_.png\",\"unique_infrastructure\":\"Basilikoi Paides\",\"infra_keys\":\"Basilikoi_Paides__Civ6_.png\",\"civilization_bonus\":\"Conquering a city grants a free  Eureka for each Encampment and Campus district in the conquered city and a free  Inspiration for each Holy Site and Theater Square district.\"},{\"civilization\":\"Malian\",\"civilization_key\":\"Malian__Civ6_.png\",\"leader\":\"Mansa Musa\",\"leader_key\":\"Mansa_Musa__Civ6_.png\",\"ability\":\"International  Trade Routes gain +1  Gold for every flat Desert tile in the sending city. Entering a Golden Age permanently grants +1  Trade Route capacity.\",\"unique_units\":\"Mandekalu Cavalry\",\"unit_keys\":\"Mandekalu_Cavalry__Civ6_.png\",\"unique_infrastructure\":\"Suguba\",\"infra_keys\":\"Commercial_Hub__Civ6_.png\",\"civilization_bonus\":\"City Centers receive +1  Faith and +1  Food for every adjacent Desert and Desert Hills tile. Mines receive -1  Production and +4  Gold. May purchase Commercial Hub buildings with  Faith. -30%  Production towards buildings and units.\"},{\"civilization\":\"Malian\",\"civilization_key\":\"Malian__Civ6_.png\",\"leader\":\"Sundiata Keita\",\"leader_key\":\"Sundiata_Keita__Civ6_.png\",\"ability\":\"Patronage of  Great People costs 20% less  Gold. Markets gain 2 slots for  Great Works of Writing.  Great Works of Writing grant +4  Gold and +2  Production.\",\"unique_units\":\"Mandekalu Cavalry\",\"unit_keys\":\"Mandekalu_Cavalry__Civ6_.png\",\"unique_infrastructure\":\"Suguba\",\"infra_keys\":\"Commercial_Hub__Civ6_.png\",\"civilization_bonus\":\"City Centers receive +1  Faith and +1  Food for every adjacent Desert and Desert Hills tile. Mines receive -1  Production and +4  Gold. May purchase Commercial Hub buildings with  Faith. -30%  Production towards buildings and units.\"},{\"civilization\":\"Māori\",\"civilization_key\":\"Maori__Civ6_.png\",\"leader\":\"Kupe\",\"leader_key\":\"Kupe__Civ6_.png\",\"ability\":\"Starts the game in the Ocean. +2  Science and +2  Culture per turn before the first city is settled. Their first settled city receives a free Builder and +1  Population. The Palace grants +3  Housing and +1  Amenity.\",\"unique_units\":\"Toa\",\"unit_keys\":\"Toa__Civ6_.png\",\"unique_infrastructure\":\"Marae\",\"infra_keys\":\"Marae__Civ6_.png\",\"civilization_bonus\":\"Starts with Sailing and Shipbuilding unlocked and the ability to enter Ocean tiles. +5  Combat Strength and +2  Movement for embarked units. Unimproved Woods and Rainforests grant +1  Production, increasing to +2  Production with Mercantilism and +3  Production with Conservation. +1  Food from Fishing Boats. Building a Fishing Boat triggers a Culture Bomb, claiming surrounding tiles. Resources cannot be harvested.  Great Writers cannot be earned.\"},{\"civilization\":\"Mapuche\",\"civilization_key\":\"Mapuche__Civ6_.png\",\"leader\":\"Lautaro\",\"leader_key\":\"Lautaro__Civ6_.png\",\"ability\":\"+10  Combat Strength when fighting civilizations that are in a Golden or Heroic Age, or Free Cities. Defeating an enemy unit within the borders of an enemy city causes that city to lose 20 Loyalty, or 40 Loyalty if that civilization is in a Golden or Heroic Age.\",\"unique_units\":\"Malón Raider\",\"unit_keys\":\"Malón_Raider__Civ6_.png\",\"unique_infrastructure\":\"Chemamull\",\"infra_keys\":\"Chemamull__Civ6_.png\",\"civilization_bonus\":\"Cities with an established Governor gain +5%  Culture, +5%  Production, and +10% combat experience towards all units trained in the city. These numbers are tripled in cities not founded by the Mapuche. All cities within 9 tiles of a city with your Governor gain +4 Loyalty per turn towards your civilization.\"},{\"civilization\":\"Mayan\",\"civilization_key\":\"Mayan__Civ6_.png\",\"leader\":\"Lady Six Sky\",\"leader_key\":\"Lady_Six_Sky__Civ6_.png\",\"ability\":\"Non- Capital cities within 6 tiles of the  Capital gain +10% to all yields and receive a Builder when founded, while cities more than 6 tiles away receive -15% to all yields. +5  Combat Strength for all units within six tiles of the Mayan  Capital.\",\"unique_units\":\"Hul'che\",\"unit_keys\":\"Hul'che__Civ6_.png\",\"unique_infrastructure\":\"Observatory\",\"infra_keys\":\"Campus__Civ6_.png\",\"civilization_bonus\":\"Cities do not receive additional  Housing from being adjacent to fresh water or coast. Cities gain +1  Amenity for each Luxury Resource adjacent to the City Center. Farms grant +1  Housing, +1  Production if adjacent to an Observatory, and +1  Gold.\"},{\"civilization\":\"Mongolian\",\"civilization_key\":\"Mongolian__Civ6_.png\",\"leader\":\"Genghis Khan\",\"leader_key\":\"Genghis_Khan__Civ6_.png\",\"ability\":\"Cavalry class units gain +3  Combat Strength and have a chance to capture defeated cavalry class enemy units.\",\"unique_units\":\"Keshig\",\"unit_keys\":\"Keshig__Civ6_.png\",\"unique_infrastructure\":\"Ordu\",\"infra_keys\":\"Ordu__Civ6_.png\",\"civilization_bonus\":\"Sending a  Trade Route immediately creates a  Trading Post in the destination city, instead of when the  Trade Route is completed. Gains an extra level of  Diplomatic Visibility with civilizations that have a Mongolian  Trading Post. +6  Combat Strength for all units for each level of  Diplomatic Visibility Mongolia has over the other civilization, instead of the usual +3  Combat Strength.\"},{\"civilization\":\"Mongolian\",\"civilization_key\":\"Mongolian__Civ6_.png\",\"leader\":\"Kublai Khan (Mongolian)\",\"leader_key\":\"Kublai_Khan__Mongolian___Civ6_.png\",\"ability\":\"Örtöö Sending a Trade Route immediately creates a Trading Post in the destination city, instead of when the Trade Route is completed. Gains an extra level of Diplomatic Visibility with civilizations that have a Mongolian Trading Post. +6 Combat Strength for all units for each level of Diplomatic Visibility Mongolia has over the other civilization, instead of the usual +3 Combat Strength.\",\"unique_units\":\"Keshig\",\"unit_keys\":\"Keshig__Civ6_.png\",\"unique_infrastructure\":\"Ordu\",\"infra_keys\":\"Ordu__Civ6_.png\",\"civilization_bonus\":\"Sending a  Trade Route immediately creates a  Trading Post in the destination city, instead of when the  Trade Route is completed. Gains an extra level of  Diplomatic Visibility with civilizations that have a Mongolian  Trading Post. +6  Combat Strength for all units for each level of  Diplomatic Visibility Mongolia has over the other civilization, instead of the usual +3  Combat Strength.\"},{\"civilization\":\"Norwegian\",\"civilization_key\":\"Norwegian__Civ6_.png\",\"leader\":\"Harald Hardrada (Konge)\",\"leader_key\":\"Harald_Hardrada__Civ6_.png\",\"ability\":\"+50%  Production toward naval melee units. All naval melee units gain the ability to perform Coastal Raids. Receive  Science in addition to  Gold when pillaging and coastal raiding Mines and  Culture in addition to  Faith when pillaging and coastal raiding Quarries, Pastures, Plantations, and Camps. Gains the Viking Longship unique unit with Sailing.\",\"unique_units\":\"Berserker\",\"unit_keys\":\"Berserker__Civ6_.png\",\"unique_infrastructure\":\"Stave Church\",\"infra_keys\":\"Stave_Church__Civ6_.png\",\"civilization_bonus\":\"Norwegian units gain the ability to enter Ocean tiles with Shipbuilding, instead of Cartography, and pay no additional  Movement costs to embark or disembark. Naval melee units can heal in neutral territory.\"},{\"civilization\":\"Norwegian\",\"civilization_key\":\"Norwegian__Civ6_.png\",\"leader\":\"Harald Hardrada (Varangian)\",\"leader_key\":\"Harald_Hardrada__Varangian___Civ6_.png\",\"ability\":\"Levying city-state units costs 75% less  Gold. All units pay 2 less maintenance. Killing a unit with a levied unit grants  Faith,  Culture, and  Science equal to 50% of the defeated unit's  Combat Strength. +1  Influence point per turn from each Stave Church.\",\"unique_units\":\"Berserker\",\"unit_keys\":\"Berserker__Civ6_.png\",\"unique_infrastructure\":\"Stave Church\",\"infra_keys\":\"Stave_Church__Civ6_.png\",\"civilization_bonus\":\"Norwegian units gain the ability to enter Ocean tiles with Shipbuilding, instead of Cartography, and pay no additional  Movement costs to embark or disembark. Naval melee units can heal in neutral territory.\"},{\"civilization\":\"Nubian\",\"civilization_key\":\"Nubian__Civ6_.png\",\"leader\":\"Amanitore\",\"leader_key\":\"Amanitore__Civ6_.png\",\"ability\":\"+20%  Production towards  Districts, increasing to +40%  Production if there is a Nubian Pyramid adjacent to the City Center.\",\"unique_units\":\"Pítati Archer\",\"unit_keys\":\"Pítati_Archer__Civ6_.png\",\"unique_infrastructure\":\"Nubian Pyramid\",\"infra_keys\":\"Nubian_Pyramid__Civ6_.png\",\"civilization_bonus\":\"+30%  Production toward Ranged units. Ranged units gain +50% combat experience. +1  Production for Mines over strategic resources, and +2  Gold for Mines over bonus and luxury resources.\"},{\"civilization\":\"Ottoman\",\"civilization_key\":\"Ottoman__Civ6_.png\",\"leader\":\"Suleiman (Kanuni)\",\"leader_key\":\"Suleiman__Civ6_.png\",\"ability\":\"Has access to a unique Governor, Ibrahim, the Grand Vizier. Gains the Janissary unique unit and 1  Governor title with Gunpowder.\",\"unique_units\":\"Barbary Corsair\",\"unit_keys\":\"Barbary_Corsair__Civ6_.png\",\"unique_infrastructure\":\"Grand Bazaar\",\"infra_keys\":\"Grand_Bazaar__Civ6_.png\",\"civilization_bonus\":\"+30%  Production toward Siege units. Siege units gain +5  Combat Strength when attacking defensible districts. Conquering a city doesn't cause that city to lose  Population. +1  Amenity and +4 Loyalty per turn for cities not founded by the Ottomans.\"},{\"civilization\":\"Ottoman\",\"civilization_key\":\"Ottoman__Civ6_.png\",\"leader\":\"Suleiman (Muhteşem)\",\"leader_key\":\"Suleiman__Muhteşem___Civ6_.png\",\"ability\":\"+15%  Science and  Culture when in a  Golden Age or  Heroic Age. +4  Combat Strength when not in a  Golden Age or  Heroic Age against Civilizations who are also not in a  Golden Age or  Heroic Age.\",\"unique_units\":\"Barbary Corsair\",\"unit_keys\":\"Barbary_Corsair__Civ6_.png\",\"unique_infrastructure\":\"Grand Bazaar\",\"infra_keys\":\"Grand_Bazaar__Civ6_.png\",\"civilization_bonus\":\"+30%  Production toward Siege units. Siege units gain +5  Combat Strength when attacking defensible districts. Conquering a city doesn't cause that city to lose  Population. +1  Amenity and +4 Loyalty per turn for cities not founded by the Ottomans.\"},{\"civilization\":\"Persian\",\"civilization_key\":\"Persian__Civ6_.png\",\"leader\":\"Cyrus\",\"leader_key\":\"Cyrus__Civ6_.png\",\"ability\":\"+2  Movement for all units for the next 10 turns after declaring a Surprise War. Declaring a Surprise War only counts as a Formal War for the purpose of  Grievances and war weariness. Occupied cities have no penalties to their yields. +5 Loyalty per turn in occupied cities with a garrisoned unit.\",\"unique_units\":\"Immortal\",\"unit_keys\":\"Immortal__Civ6_.png\",\"unique_infrastructure\":\"Pairidaeza\",\"infra_keys\":\"Pairidaeza__Civ6_.png\",\"civilization_bonus\":\"Gains +1  Trade Route capacity with Political Philosophy. Domestic  Trade Routes provide +2  Gold and +1  Culture. Roads built inside Persian territory are one level more advanced than usual.\"},{\"civilization\":\"Persian\",\"civilization_key\":\"Persian__Civ6_.png\",\"leader\":\"Nader Shah\",\"leader_key\":\"Nader_Shah__Civ6_.png\",\"ability\":\"+5  Combat Strength for all units when attacking full health units. Cities not founded by Nader Shah gain +2  Faith and +3  Gold on domestic  Trade Routes.\",\"unique_units\":\"Immortal\",\"unit_keys\":\"Immortal__Civ6_.png\",\"unique_infrastructure\":\"Pairidaeza\",\"infra_keys\":\"Pairidaeza__Civ6_.png\",\"civilization_bonus\":\"Gains +1  Trade Route capacity with Political Philosophy. Domestic  Trade Routes provide +2  Gold and +1  Culture. Roads built inside Persian territory are one level more advanced than usual.\"},{\"civilization\":\"Phoenician\",\"civilization_key\":\"Phoenician__Civ6_.png\",\"leader\":\"Dido\",\"leader_key\":\"Dido__Civ6_.png\",\"ability\":\"Cities with a Cothon gain the unique Move Capital project, which moves the  Capital to that city. Gains +1  Trade Route capacity after building the Government Plaza or any Government Plaza building. +50%  Production towards  Districts in the city with the Government Plaza.\",\"unique_units\":\"Bireme\",\"unit_keys\":\"Bireme__Civ6_.png\",\"unique_infrastructure\":\"Cothon\",\"infra_keys\":\"Harbor__Civ6_.png\",\"civilization_bonus\":\"Starts with the  Eureka for Writing. Coastal cities founded by Phoenicia and in the same continent as their  Capital always have full Loyalty. Settlers receive +2  Movement and  Sight while embarked, and pay no  Movement costs to embark or disembark.\"},{\"civilization\":\"Polish\",\"civilization_key\":\"Polish__Civ6_.png\",\"leader\":\"Jadwiga\",\"leader_key\":\"Jadwiga__Civ6_.png\",\"ability\":\"Taking territory from a foreign city with a Culture Bomb converts it to Poland's religion.  Relics grant +4  Gold, +2  Culture and +2  Faith. Holy Sites receive a +1 adjacency bonus from districts, instead of +5.\",\"unique_units\":\"Winged Hussar\",\"unit_keys\":\"Winged_Hussar__Civ6_.png\",\"unique_infrastructure\":\"Sukiennice\",\"infra_keys\":\"Sukiennice__Civ6_.png\",\"civilization_bonus\":\"Building an Encampment or Fort triggers a Culture Bomb, claiming surrounding tiles. One  Military policy slot in all governments is converted into a  Wildcard policy slot.\"},{\"civilization\":\"Portuguese\",\"civilization_key\":\"Portuguese__Civ6_.png\",\"leader\":\"João III\",\"leader_key\":\"Jo_o_III__Civ6_.png\",\"ability\":\"+1  Sight for all units. Meeting another civilization grants +1  Trade Route capacity. Gains Open Borders with all city-states.\",\"unique_units\":\"Nau\",\"unit_keys\":\"Nau__Civ6_.png\",\"unique_infrastructure\":\"Navigation School\",\"infra_keys\":\"Navigation_School__Civ6_.png\",\"civilization_bonus\":\"International  Trade Routes can only be sent to cities on the coast or with a Harbor, but gain a +50% increase to all yields. Traders have +50% range over water, and can embark as soon as they are unlocked.\"},{\"civilization\":\"Roman\",\"civilization_key\":\"Roman__Civ6_.png\",\"leader\":\"Trajan\",\"leader_key\":\"Trajan__Civ6_.png\",\"ability\":\"All founded cities start with a free building in the City Center (a Monument if the game is started in the Ancient Era).\",\"unique_units\":\"Legion\",\"unit_keys\":\"Legion__Civ6_.png\",\"unique_infrastructure\":\"Bath\",\"infra_keys\":\"Aqueduct__Civ6_.png\",\"civilization_bonus\":\"Founded or conquered cities start with a Trading Post and, if within  Trade Route range of the  Capital, a road to it.  Trade Routes generate +1 additional  Gold from Roman Trading Posts they pass through.\"},{\"civilization\":\"Roman\",\"civilization_key\":\"Roman__Civ6_.png\",\"leader\":\"Julius Caesar\",\"leader_key\":\"Julius_Caesar__Civ6_.png\",\"ability\":\"Gains 300  Gold after conquering a city for the first time, and after earning  Gold from a Barbarian Outpost. Both amounts become 500  Gold after researching Metal Casting and 700  Gold after Steel (on Standard speed). Units gain 5  Combat Strength and receive full experience when fighting Barbarians.\",\"unique_units\":\"Legion\",\"unit_keys\":\"Legion__Civ6_.png\",\"unique_infrastructure\":\"Bath\",\"infra_keys\":\"Aqueduct__Civ6_.png\",\"civilization_bonus\":\"Founded or conquered cities start with a Trading Post and, if within  Trade Route range of the  Capital, a road to it.  Trade Routes generate +1 additional  Gold from Roman Trading Posts they pass through.\"},{\"civilization\":\"Russian\",\"civilization_key\":\"Russian__Civ6_.png\",\"leader\":\"Peter\",\"leader_key\":\"Peter__Civ6_.png\",\"ability\":\"Trade Routes to more advanced civilizations grant Russia +1  Science for every three technologies that civilization is ahead of them, and +1  Culture for every three civics.\",\"unique_units\":\"Cossack\",\"unit_keys\":\"Cossack__Civ6_.png\",\"unique_infrastructure\":\"Lavra\",\"infra_keys\":\"Holy_Site__Civ6_.png\",\"civilization_bonus\":\"Founded cities start with five additional tiles. Tundra tiles provide +1  Faith and +1  Production, in addition to their usual yields. Units are immune to damage from Blizzards. +100% damage from Blizzards inside Russian territory to civilizations at war with Russia.\"},{\"civilization\":\"Scottish\",\"civilization_key\":\"Scottish__Civ6_.png\",\"leader\":\"Robert the Bruce\",\"leader_key\":\"Robert_the_Bruce__Civ6_.png\",\"ability\":\"Can declare a War of Liberation with Defensive Tactics, instead of Diplomatic Service. +100%  Production and +2  Movement for all units for the next 10 turns after declaring a War of Liberation.\",\"unique_units\":\"Highlander\",\"unit_keys\":\"Highlander__Civ6_.png\",\"unique_infrastructure\":\"Golf Course\",\"infra_keys\":\"Golf_Course__Civ6_.png\",\"civilization_bonus\":\"Happy cities gain +5%  Science and +5%  Production, and generate +1  Great Scientist point in their Campuses and +1  Great Engineer point in their Industrial Zones. Ecstatic cities double these bonuses.\"},{\"civilization\":\"Scythian\",\"civilization_key\":\"Scythian__Civ6_.png\",\"leader\":\"Tomyris\",\"leader_key\":\"Tomyris__Civ6_.png\",\"ability\":\"+5  Combat Strength for all units when attacking wounded units. Units heal up to 30 hit points after killing an enemy unit.\",\"unique_units\":\"Saka Horse Archer\",\"unit_keys\":\"Saka_Horse_Archer__Civ6_.png\",\"unique_infrastructure\":\"Kurgan\",\"infra_keys\":\"Kurgan__Civ6_.png\",\"civilization_bonus\":\"Building a light cavalry unit or Saka Horse Archer grants a free second copy of that unit.\"},{\"civilization\":\"Spanish\",\"civilization_key\":\"Spanish__Civ6_.png\",\"leader\":\"Philip II\",\"leader_key\":\"Philip_II__Civ6_.png\",\"ability\":\"Inquisitors can Remove Heresy one extra time and remove 100% of the presence of other religions. Combat and religious units have a bonus of +5  Combat Strength against players following other religions.\",\"unique_units\":\"Conquistador\",\"unit_keys\":\"Conquistador__Civ6_.png\",\"unique_infrastructure\":\"Mission\",\"infra_keys\":\"Mission__Civ6_.png\",\"civilization_bonus\":\"May form Fleets and Armadas with Mercantilism, instead of Nationalism and Mobilization.  Trade Routes receive 3  Gold, 2  Faith and 1  Production. Trade Routes between cities on different continents gain triple these yields. Cities not on your original  Capital's continent receive 25% extra  Production towards  Districts and a Builder when founded.\"},{\"civilization\":\"Sumerian\",\"civilization_key\":\"Sumerian__Civ6_.png\",\"leader\":\"Gilgamesh\",\"leader_key\":\"Gilgamesh__Civ6_.png\",\"ability\":\"25%  Production increase when claiming Heroes, and Heroes have 20% more  Lifespan.\",\"unique_units\":\"War-Cart\",\"unit_keys\":\"War-Cart__Civ6_.png\",\"unique_infrastructure\":\"Ziggurat\",\"infra_keys\":\"Ziggurat__Civ6_.png\",\"civilization_bonus\":\"Capturing a Barbarian Outpost also grants a Tribal Village reward. Levying city-state units costs 50% less  Gold.\"},{\"civilization\":\"Swedish\",\"civilization_key\":\"Swedish__Vikings_Traders_and_Raiders___Civ6_.png\",\"leader\":\"Kristina\",\"leader_key\":\"Kristina__Civ6_.png\",\"ability\":\"Buildings with at least three Great Work slots and wonders with at least two Great Work slots are automatically themed when all slots are filled. Gains the Queen's Bibliotheque unique building in the Government Plaza.\",\"unique_units\":\"Carolean\",\"unit_keys\":\"Carolean__Civ6_.png\",\"unique_infrastructure\":\"Open-Air Museum\",\"infra_keys\":\"Open-Air_Museum__Civ6_.png\",\"civilization_bonus\":\"Gains 50  Diplomatic Favor whenever a Great Person is earned. +1  Great Engineer points from Factories and +1  Great Scientist points from Universities. Sweden's presence in the game adds three unique World Congress competitions in the Industrial Era.\"},{\"civilization\":\"Vietnamese\",\"civilization_key\":\"Vietnamese__Civ6_.png\",\"leader\":\"Bà Triệu\",\"leader_key\":\"B__Triệu__Civ6_.png\",\"ability\":\"All units gain +5  Combat Strength when fighting in Rainforest, Marsh, and Woods tiles, and +1  Movement if they start their turn there. Both of these bonuses are doubled in tiles inside Vietnamese territory.\",\"unique_units\":\"Voi Chiến\",\"unit_keys\":\"Voi_Chiến__Civ6_.png\",\"unique_infrastructure\":\"Thành\",\"infra_keys\":\"Encampment__Civ6_.png\",\"civilization_bonus\":\"Land specialty  Districts can only be built on Woods, Rainforest or Marsh tiles. Buildings on these features receive additional yields: +1  Culture in Woods, +1  Science in Rainforest, and +1  Production in Marsh. Can plant Woods with Medieval Faires, instead of Conservation.\"},{\"civilization\":\"Zulu\",\"civilization_key\":\"Zulu__Civ6_.png\",\"leader\":\"Shaka\",\"leader_key\":\"Shaka__Civ6_.png\",\"ability\":\"May form Corps with Mercenaries, instead of Nationalism, and Armies with Nationalism, instead of Mobilization. Corps and Armies gain an additional +5  Combat Strength.\",\"unique_units\":\"Impi\",\"unit_keys\":\"Impi__Civ6_.png\",\"unique_infrastructure\":\"Ikanda\",\"infra_keys\":\"Encampment__Civ6_.png\",\"civilization_bonus\":\"Capturing a city will upgrade the capturing unit, as long as the necessary civics are unlocked: from a normal unit into a Corps or Fleet, and from a Corps or Fleet into an Army or Armada. Cities with a garrisoned unit gain +3 Loyalty per turn, increasing to +5 Loyalty if the garrisoned unit is a Corps or Army.\"},{\"civilization\":\"Norwegian\",\"civilization_key\":\"Norwegian__Civ6_.png\",\"leader\":\"Harald Hardrada\",\"leader_key\":\"Harald_Hardrada__Civ6_.png\",\"ability\":\"Viking Units ignore additional Movement costs from embarking and disembarking.\",\"unique_units\":\"Berserker\",\"unit_keys\":\"Berserker__Civ6_.png\",\"unique_infrastructure\":\"Stave Church\",\"infra_keys\":\"Stave_Church__Civ6_.png\",\"civilization_bonus\":\"Norwegian units gain the ability to enter Ocean tiles with Shipbuilding, instead of Cartography, and pay no additional  Movement costs to embark or disembark. Naval melee units can heal in neutral territory.\"},{\"civilization\":\"Macedonian\",\"civilization_key\":\"Macedonian__Civ6_.png\",\"leader\":\"Alexander\",\"leader_key\":\"Alexander__Civ6_.png\",\"ability\":\"Macedonian cities never incur war weariness. All military units heal completely when a city with a Wonder is captured. Gains the Hetairoi unique unit with Horseback Riding.\",\"unique_units\":\"Hypaspist, Hetairoi, Settler\",\"unit_keys\":\"Hypaspist__Civ6_.png, Hetairoi__Civ6_.png, Settler__Civ6_.png\",\"unique_infrastructure\":\"Basilikoi Paides\",\"infra_keys\":\"Basilikoi_Paides__Civ6_.png\",\"civilization_bonus\":\"Conquering a city grants a free  Eureka for each Encampment and Campus district in the conquered city and a free  Inspiration for each Holy Site and Theater Square district.\"},{\"civilization\":\"Egyptian\",\"civilization_key\":\"Egyptian__Civ6_.png\",\"leader\":\"Cleopatra (Egyptian)\",\"leader_key\":\"Cleopatra__Civ6_.png\",\"ability\":\"International  Trade Routes grant +4  Gold.  Trade Routes sent to Egypt from other civilizations provide +2  Food for them and +2  Gold for Egypt. +100% Alliance Points from trading with allies.\",\"unique_units\":\"Maryannu Chariot Archer\",\"unit_keys\":\"Maryannu_Chariot_Archer__Civ6_.png\",\"unique_infrastructure\":\"Sphinx\",\"infra_keys\":\"Sphinx__Civ6_.png\",\"civilization_bonus\":\"+15%  Production towards districts and wonders built next to a River. Districts, improvements and units are immune to damage from floods.\"}]"));}),
"[project]/src/data/leaders.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseLeaders",
    ()=>baseLeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$data$2f$civ6leaderdata$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/supabase/data/civ6leaderdata.json (json)");
;
const BASE_CREATED_AT = '2024-01-01T00:00:00.000Z';
function slugify(value) {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}
function buildUniqueUnits(namesRaw, keysRaw, civSlug) {
    const names = namesRaw.split(',').map((name)=>name.trim()).filter(Boolean);
    const keys = keysRaw.split(',').map((key)=>key.trim()).filter(Boolean);
    if (!names.length || !keys.length) {
        return [];
    }
    if (names.length !== keys.length) {
        return [
            {
                id: `unit-${civSlug}-${slugify(names[0])}`,
                name: namesRaw.trim(),
                image_key: keys[0] ?? keysRaw.trim()
            }
        ];
    }
    return names.map((name, index)=>({
            id: `unit-${civSlug}-${slugify(name)}`,
            name,
            image_key: keys[index]
        }));
}
function buildUniqueInfrastructure(namesRaw, keysRaw, civSlug) {
    const names = namesRaw.split(',').map((name)=>name.trim()).filter(Boolean);
    const keys = keysRaw.split(',').map((key)=>key.trim()).filter(Boolean);
    if (!names.length || !keys.length) {
        return [];
    }
    if (names.length !== keys.length) {
        return [
            {
                id: `infra-${civSlug}-${slugify(names[0])}`,
                name: namesRaw.trim(),
                image_key: keys[0] ?? keysRaw.trim()
            }
        ];
    }
    return names.map((name, index)=>({
            id: `infra-${civSlug}-${slugify(name)}`,
            name,
            image_key: keys[index]
        }));
}
const baseLeaders = __TURBOPACK__imported__module__$5b$project$5d2f$supabase$2f$data$2f$civ6leaderdata$2e$json__$28$json$29$__["default"].map((row, index)=>{
    const civSlug = slugify(row.civilization);
    const civilization = {
        id: `civ-${civSlug}`,
        name: row.civilization,
        image_key: row.civilization_key,
        civilization_bonus: row.civilization_bonus,
        unique_units: buildUniqueUnits(row.unique_units ?? '', row.unit_keys ?? '', civSlug),
        unique_infrastructure: buildUniqueInfrastructure(row.unique_infrastructure ?? '', row.infra_keys ?? '', civSlug)
    };
    const leaderSlug = slugify(row.leader);
    const leader = {
        id: `leader-${leaderSlug}-${index}`,
        name: row.leader,
        image_key: row.leader_key,
        ability: row.ability,
        created_at: BASE_CREATED_AT,
        civilization
    };
    return leader;
});
}),
"[project]/src/utils/lobbyStateStorage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadLobbyState",
    ()=>loadLobbyState,
    "saveLobbyState",
    ()=>saveLobbyState
]);
const STORAGE_PREFIX = 'civ6picker:lobby:v1:';
function getStorageKey(lobbyCode) {
    return `${STORAGE_PREFIX}${lobbyCode}`;
}
function loadLobbyState(lobbyCode) {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
}
function saveLobbyState(lobbyCode, leaders) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    const payload = undefined;
}
}),
"[project]/src/utils/reconnectionManager.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReconnectionManager",
    ()=>ReconnectionManager,
    "createReconnectionManager",
    ()=>createReconnectionManager
]);
class ReconnectionManager {
    config;
    attempt;
    timeoutId;
    isRetrying;
    constructor(config = {}){
        this.config = config;
        this.attempt = 0;
        this.timeoutId = null;
        this.isRetrying = false;
        this.config = {
            maxRetries: 10,
            baseDelay: 1000,
            maxDelay: 30000,
            jitterFactor: 0.1,
            ...config
        };
    }
    calculateDelay(attempt) {
        // Exponential backoff: baseDelay * 2^attempt
        const exponentialDelay = this.config.baseDelay * Math.pow(2, attempt);
        // Cap at maxDelay
        const cappedDelay = Math.min(exponentialDelay, this.config.maxDelay);
        // Add jitter to prevent thundering herd
        const jitter = cappedDelay * this.config.jitterFactor * Math.random();
        return Math.floor(cappedDelay + jitter);
    }
    scheduleRetry(callback) {
        if (this.isRetrying || this.attempt >= this.config.maxRetries) {
            if (this.attempt >= this.config.maxRetries) {
                this.config.onMaxRetriesReached?.();
            }
            return;
        }
        this.isRetrying = true;
        const delay = this.calculateDelay(this.attempt);
        this.config.onRetry?.(this.attempt + 1, delay);
        this.timeoutId = setTimeout(()=>{
            this.attempt++;
            this.isRetrying = false;
            callback();
        }, delay);
    }
    reset() {
        this.attempt = 0;
        this.isRetrying = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
    cancel() {
        this.reset();
    }
    getAttempt() {
        return this.attempt;
    }
    isRetryingNow() {
        return this.isRetrying;
    }
}
function createReconnectionManager(config) {
    return new ReconnectionManager(config);
}
}),
"[project]/src/hooks/useLeaders.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLeaders",
    ()=>useLeaders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$leaders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/leaders.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyStateStorage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/lobbyStateStorage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$reconnectionManager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/reconnectionManager.ts [app-rsc] (ecmascript)");
;
;
;
;
function mergeBaseWithState(base, stateMap) {
    return base.map((leader)=>{
        const state = stateMap.get(leader.id);
        return {
            ...leader,
            is_banned: state?.is_banned ?? false,
            banned_by: state?.banned_by ?? null,
            banned_at: state?.banned_at ?? null
        };
    });
}
function toLeaderStates(leaders) {
    return leaders.map((leader)=>({
            id: leader.id,
            is_banned: leader.is_banned,
            banned_by: leader.banned_by,
            banned_at: leader.banned_at
        }));
}
function useLeaders(lobbyCode) {
    const [leaders, setLeaders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(()=>mergeBaseWithState(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$leaders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseLeaders"], new Map()));
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isReconnecting, setIsReconnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const leadersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(leaders);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastRequestIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectionManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$reconnectionManager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createReconnectionManager"])({
        maxRetries: 12,
        baseDelay: 1500,
        maxDelay: 45000,
        jitterFactor: 0.2,
        onRetry: (attempt, delay)=>{
            console.log(`Reconnecting leader socket (attempt ${attempt}/${12}) in ${delay}ms`);
            setIsReconnecting(true);
            setError(new Error(`Leader updates connection lost. Reconnecting... (attempt ${attempt})`));
        },
        onMaxRetriesReached: ()=>{
            console.error('Max reconnection attempts reached for leader channel');
            setIsReconnecting(false);
            setError(new Error('Failed to reconnect to leader updates after multiple attempts. Please refresh the page.'));
        }
    }));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        leadersRef.current = leaders;
    }, [
        leaders
    ]);
    const initialLeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const stored = lobbyCode ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyStateStorage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadLobbyState"])(lobbyCode) : null;
        if (!stored || !stored.leaders.length) {
            return mergeBaseWithState(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$leaders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseLeaders"], new Map());
        }
        const stateMap = new Map();
        for (const state of stored.leaders){
            stateMap.set(state.id, state);
        }
        return mergeBaseWithState(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$leaders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseLeaders"], stateMap);
    }, [
        lobbyCode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLeaders(initialLeaders);
        setLoading(false);
    }, [
        initialLeaders
    ]);
    async function toggleBanLeader(leaderId, userName) {
        const currentLeader = leadersRef.current.find((l)=>l.id === leaderId);
        if (!currentLeader) {
            throw new Error('Leader not found');
        }
        const nextIsBanned = !currentLeader.is_banned;
        const timestamp = new Date().toISOString();
        setLeaders((prevLeaders)=>{
            const updated = prevLeaders.map((leader)=>leader.id === leaderId ? {
                    ...leader,
                    is_banned: nextIsBanned,
                    banned_by: nextIsBanned ? userName : null,
                    banned_at: nextIsBanned ? timestamp : null
                } : leader);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyStateStorage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveLobbyState"])(lobbyCode, toLeaderStates(updated));
            return updated;
        });
        const socket = socketRef.current;
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            return;
        }
        const event = {
            type: 'ban_toggled',
            lobbyCode,
            leaderId,
            userName,
            isBanned: nextIsBanned,
            timestamp
        };
        try {
            socket.send(JSON.stringify(event));
        } catch (e) {
            console.error('Failed to broadcast ban toggle:', e);
            setError(e instanceof Error ? e : new Error('Failed to broadcast ban toggle'));
        }
    }
    const setupSocket = ()=>{
        if (!lobbyCode) {
            return null;
        }
        if (socketRef.current) {
            try {
                socketRef.current.close();
            } catch  {
            // ignore
            }
            socketRef.current = null;
        }
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const ws = new WebSocket(`${protocol}://${window.location.host}/api/ws`);
        ws.addEventListener('open', ()=>{
            setIsReconnecting(false);
            setError(null);
            reconnectionManagerRef.current.reset();
            // Identify the lobby on the server
            const initMessage = {
                type: 'init',
                lobbyCode
            };
            try {
                ws.send(JSON.stringify(initMessage));
            } catch (e) {
                console.error('Failed to send init message:', e);
            }
            // Ask existing clients for a snapshot if we do not have local state
            const hasLocalState = ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyStateStorage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadLobbyState"])(lobbyCode)?.leaders.length ?? 0) > 0;
            if (!hasLocalState) {
                const requestId = crypto.randomUUID();
                lastRequestIdRef.current = requestId;
                const requestEvent = {
                    type: 'state_request',
                    lobbyCode,
                    requestId,
                    requester: lobbyCode
                };
                try {
                    ws.send(JSON.stringify(requestEvent));
                } catch (e) {
                    console.error('Failed to send state request:', e);
                }
            }
        });
        ws.addEventListener('message', (eventMessage)=>{
            let event;
            try {
                event = JSON.parse(String(eventMessage.data));
            } catch  {
                return;
            }
            if (event.lobbyCode !== lobbyCode) {
                return;
            }
            if (event.type === 'ban_toggled') {
                setLeaders((prevLeaders)=>{
                    const updated = prevLeaders.map((leader)=>leader.id === event.leaderId ? {
                            ...leader,
                            is_banned: event.isBanned,
                            banned_by: event.isBanned ? event.userName : null,
                            banned_at: event.isBanned ? event.timestamp : null
                        } : leader);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyStateStorage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveLobbyState"])(lobbyCode, toLeaderStates(updated));
                    return updated;
                });
            }
            if (event.type === 'state_request') {
                // Respond with our current snapshot
                try {
                    const snapshot = {
                        type: 'state_snapshot',
                        lobbyCode,
                        requestId: event.requestId,
                        leaders: toLeaderStates(leadersRef.current),
                        sentBy: event.requester,
                        timestamp: new Date().toISOString()
                    };
                    ws.send(JSON.stringify(snapshot));
                } catch (e) {
                    console.error('Failed to send state snapshot:', e);
                }
            }
            if (event.type === 'state_snapshot') {
                if (!lastRequestIdRef.current) {
                    return;
                }
                if (event.requestId !== lastRequestIdRef.current) {
                    return;
                }
                const stateMap = new Map();
                for (const state of event.leaders){
                    stateMap.set(state.id, state);
                }
                setLeaders(()=>{
                    const merged = mergeBaseWithState(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$leaders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["baseLeaders"], stateMap);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyStateStorage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveLobbyState"])(lobbyCode, toLeaderStates(merged));
                    return merged;
                });
                lastRequestIdRef.current = null;
            }
        });
        ws.addEventListener('error', (err)=>{
            console.error('Leader socket error:', err);
            setIsReconnecting(true);
            reconnectionManagerRef.current.scheduleRetry(()=>{
                setupSocket();
            });
        });
        ws.addEventListener('close', ()=>{
            setIsReconnecting(true);
            reconnectionManagerRef.current.scheduleRetry(()=>{
                setupSocket();
            });
        });
        socketRef.current = ws;
        return ws;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (lobbyCode) {
            setupSocket();
        }
        return ()=>{
            reconnectionManagerRef.current.cancel();
            if (socketRef.current) {
                try {
                    socketRef.current.close();
                } catch  {
                // ignore
                }
                socketRef.current = null;
            }
        };
    }, [
        lobbyCode
    ]);
    return {
        leaders,
        loading,
        error,
        toggleBanLeader,
        isReconnecting
    };
}
}),
"[project]/src/hooks/useUserPresence.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUserPresence",
    ()=>useUserPresence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$reconnectionManager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/reconnectionManager.ts [app-rsc] (ecmascript)");
;
;
function useUserPresence(userId, name, lobbyCode) {
    const [connectedUsers, setConnectedUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isReconnecting, setIsReconnecting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reconnectionManagerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$reconnectionManager$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createReconnectionManager"])({
        maxRetries: 15,
        baseDelay: 1000,
        maxDelay: 30000,
        jitterFactor: 0.15,
        onRetry: (attempt, delay)=>{
            console.log(`Reconnecting to presence socket (attempt ${attempt}/${15}) in ${delay}ms`);
            setIsReconnecting(true);
            setError(new Error(`Connection lost. Reconnecting... (attempt ${attempt})`));
        },
        onMaxRetriesReached: ()=>{
            console.error('Max reconnection attempts reached for presence socket');
            setIsReconnecting(false);
            setError(new Error('Failed to reconnect after multiple attempts. Please refresh the page.'));
        }
    }));
    const sendPresenceEvent = (event)=>{
        const socket = socketRef.current;
        if (!socket || socket.readyState !== WebSocket.OPEN) return;
        try {
            socket.send(JSON.stringify(event));
        } catch (e) {
            console.error('Failed to send presence event:', e);
        }
    };
    const setupSocket = ()=>{
        if (!lobbyCode) return null;
        if (socketRef.current) {
            try {
                socketRef.current.close();
            } catch  {
            // ignore
            }
            socketRef.current = null;
        }
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const ws = new WebSocket(`${protocol}://${window.location.host}/api/ws`);
        ws.addEventListener('open', ()=>{
            setIsConnected(true);
            setIsReconnecting(false);
            setError(null);
            reconnectionManagerRef.current.reset();
            // Identify the lobby
            const initMessage = {
                type: 'init',
                lobbyCode
            };
            try {
                ws.send(JSON.stringify(initMessage));
            } catch (e) {
                console.error('Failed to send presence init message:', e);
            }
            // Announce our presence
            const joinEvent = {
                type: 'presence_join',
                lobbyCode,
                userId,
                name,
                online_at: new Date().toISOString()
            };
            sendPresenceEvent(joinEvent);
        });
        ws.addEventListener('message', (eventMessage)=>{
            let event;
            try {
                event = JSON.parse(String(eventMessage.data));
            } catch  {
                return;
            }
            if (event.lobbyCode !== lobbyCode) {
                return;
            }
            if (event.type === 'presence_join') {
                setConnectedUsers((prev)=>{
                    const existing = prev.find((u)=>u.id === event.userId);
                    if (existing) {
                        return prev.map((u)=>u.id === event.userId ? {
                                ...u,
                                name: event.name,
                                online_at: event.online_at
                            } : u);
                    }
                    return [
                        ...prev,
                        {
                            id: event.userId,
                            name: event.name,
                            online_at: event.online_at
                        }
                    ];
                });
            }
            if (event.type === 'presence_leave') {
                setConnectedUsers((prev)=>prev.filter((u)=>u.id !== event.userId));
            }
        });
        ws.addEventListener('error', (err)=>{
            console.error('Presence socket error:', err);
            setIsConnected(false);
            setIsReconnecting(true);
            reconnectionManagerRef.current.scheduleRetry(()=>{
                setupSocket();
            });
        });
        ws.addEventListener('close', ()=>{
            setIsConnected(false);
            setIsReconnecting(true);
            reconnectionManagerRef.current.scheduleRetry(()=>{
                setupSocket();
            });
        });
        socketRef.current = ws;
        return ws;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleUnload = ()=>{
            const leaveEvent = {
                type: 'presence_leave',
                lobbyCode,
                userId
            };
            sendPresenceEvent(leaveEvent);
            if (socketRef.current) {
                try {
                    socketRef.current.close();
                } catch  {
                // ignore
                }
                socketRef.current = null;
            }
        };
        window.addEventListener('pagehide', handleUnload);
        if (lobbyCode) {
            setupSocket();
        }
        return ()=>{
            window.removeEventListener('pagehide', handleUnload);
            reconnectionManagerRef.current.cancel();
            if (socketRef.current) {
                try {
                    const leaveEvent = {
                        type: 'presence_leave',
                        lobbyCode,
                        userId
                    };
                    sendPresenceEvent(leaveEvent);
                    socketRef.current.close();
                } catch  {
                // ignore
                }
                socketRef.current = null;
            }
        };
    }, [
        userId,
        name,
        lobbyCode
    ]);
    return {
        connectedUsers,
        isConnected,
        error,
        isReconnecting
    };
}
}),
"[project]/src/components/ConfirmationDialog.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmationDialog",
    ()=>ConfirmationDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/alert-triangle.js [app-rsc] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-rsc] (ecmascript) <export default as X>");
;
;
function ConfirmationDialog({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) {
    if (!isOpen) return null;
    const getVariantStyles = ()=>{
        switch(variant){
            case 'danger':
                return {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        className: "w-6 h-6 text-red-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConfirmationDialog.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
                    border: 'border-red-500/20'
                };
            case 'warning':
                return {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        className: "w-6 h-6 text-yellow-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConfirmationDialog.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    confirmButton: 'bg-yellow-600 hover:bg-yellow-700 text-black',
                    border: 'border-yellow-500/20'
                };
            default:
                return {
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$triangle$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                        className: "w-6 h-6 text-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ConfirmationDialog.tsx",
                        lineNumber: 43,
                        columnNumber: 17
                    }, this),
                    confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
                    border: 'border-blue-500/20'
                };
        }
    };
    const styles = getVariantStyles();
    const handleConfirm = ()=>{
        onConfirm();
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `bg-gray-800 rounded-xl border-2 ${styles.border} p-6 max-w-sm w-full shadow-2xl`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-4",
                children: [
                    styles.icon,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-white",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ConfirmationDialog.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "text-gray-400 hover:text-white transition-colors duration-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ConfirmationDialog.tsx",
                                            lineNumber: 69,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ConfirmationDialog.tsx",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ConfirmationDialog.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-300 text-sm mb-6",
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/src/components/ConfirmationDialog.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200",
                                        children: cancelText
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ConfirmationDialog.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleConfirm,
                                        className: `flex-1 px-4 py-2 rounded-lg transition-colors duration-200 ${styles.confirmButton}`,
                                        children: confirmText
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ConfirmationDialog.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ConfirmationDialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ConfirmationDialog.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ConfirmationDialog.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ConfirmationDialog.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ConfirmationDialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/BanStageHeader.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BanStageHeader",
    ()=>BanStageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-rsc] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-rsc] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-rsc] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-rsc] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-rsc] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-rsc] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-rsc] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ConfirmationDialog$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ConfirmationDialog.tsx [app-rsc] (ecmascript)");
;
;
;
;
function BanStageHeader({ userName, lobbyCode, connectedUsers, isConnected, isReconnecting = false, isLeaderReconnecting = false, onSignOut, onChangeName }) {
    const [showUserMenu, setShowUserMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSignOutConfirm, setShowSignOutConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const userMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Sort connected users by who joined first (online_at timestamp)
    const sortedConnectedUsers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].useMemo(()=>{
        return [
            ...connectedUsers
        ].sort((a, b)=>{
            const timeA = new Date(a.online_at).getTime();
            const timeB = new Date(b.online_at).getTime();
            return timeA - timeB; // Sort by earliest first
        });
    }, [
        connectedUsers
    ]);
    const getConnectionStatus = ()=>{
        if (isReconnecting || isLeaderReconnecting) {
            return {
                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                    className: "w-3 h-3 sm:w-4 sm:h-4 animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/components/BanStageHeader.tsx",
                    lineNumber: 55,
                    columnNumber: 15
                }, this),
                text: 'Reconnecting...',
                color: 'text-yellow-500',
                bgColor: 'bg-yellow-500'
            };
        }
        if (isConnected) {
            return {
                icon: null,
                text: 'Connected',
                color: 'text-gray-400',
                bgColor: 'bg-green-500'
            };
        }
        return {
            icon: null,
            text: 'Disconnected',
            color: 'text-gray-400',
            bgColor: 'bg-red-500'
        };
    };
    const handleCopyLobbyCode = async ()=>{
        try {
            await navigator.clipboard.writeText(lobbyCode);
        // You could add a toast notification here if desired
        } catch (err) {
            console.error('Failed to copy lobby code:', err);
        }
    };
    const connectionStatus = getConnectionStatus();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto my-1 sm:my-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3 sm:mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                                    className: "w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 flex-shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white truncate",
                                            children: "Civ6 Leader Ban Stage"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs sm:text-sm lg:text-base text-gray-400",
                                                    children: "Playing as:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative",
                                                    ref: userMenuRef,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setShowUserMenu(!showUserMenu),
                                                            className: "flex items-center gap-1 text-yellow-500 font-medium hover:text-yellow-400 transition-colors duration-200 rounded px-2 py-1 hover:bg-yellow-500/10",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "truncate max-w-[120px] sm:max-w-[200px]",
                                                                    children: userName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                    lineNumber: 107,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                    className: `w-3 h-3 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                    lineNumber: 108,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                                            lineNumber: 103,
                                                            columnNumber: 19
                                                        }, this),
                                                        showUserMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute top-full left-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "px-3 py-2 text-xs text-gray-400 border-b border-gray-700 mb-1",
                                                                            children: "Signed in as"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                            lineNumber: 115,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "px-3 py-1 text-sm text-white font-medium truncate",
                                                                            children: userName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                            lineNumber: 118,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                    lineNumber: 114,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                setShowUserMenu(false);
                                                                                onChangeName();
                                                                            },
                                                                            className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors duration-200",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                                    className: "w-4 h-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                                    lineNumber: 130,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                "Change Name"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                            lineNumber: 123,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                setShowUserMenu(false);
                                                                                setShowSignOutConfirm(true);
                                                                            },
                                                                            className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors duration-200",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                                                    className: "w-4 h-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                                    lineNumber: 140,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                "Sign Out"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                            lineNumber: 133,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                    lineNumber: 122,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                                            lineNumber: 113,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-gray-400",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs sm:text-sm lg:text-base",
                                                            children: "Lobby:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                                            lineNumber: 150,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1 bg-gray-700/50 px-2 py-1 rounded",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs sm:text-sm font-mono text-yellow-500",
                                                                    children: lobbyCode
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                    lineNumber: 152,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleCopyLobbyCode,
                                                                    className: "p-1 text-gray-400 hover:text-white transition-colors",
                                                                    title: "Copy lobby code",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                        className: "w-3 h-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                        lineNumber: 158,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                                    lineNumber: 153,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BanStageHeader.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-700 p-2 sm:p-3 flex-shrink-0 w-full sm:w-[280px] sm:max-w-[400px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-gray-300 mb-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            className: "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-xs sm:text-sm lg:text-base truncate",
                                            children: [
                                                connectedUsers.length,
                                                " Online"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 ml-auto flex-shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-2 h-2 rounded-full ${connectionStatus.bgColor}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                    lineNumber: 172,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-xs ${connectionStatus.color} hidden sm:inline flex items-center gap-1`,
                                                    children: [
                                                        connectionStatus.icon,
                                                        connectionStatus.text
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                            lineNumber: 171,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1 max-h-12 sm:max-h-16 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent",
                                    children: sortedConnectedUsers.map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs sm:text-sm text-gray-400 bg-gray-700/50 px-1 sm:px-2 py-1 rounded flex-shrink-0",
                                            title: u.name ?? undefined,
                                            children: u.name ?? 'Unknown'
                                        }, u.id, false, {
                                            fileName: "[project]/src/components/BanStageHeader.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageHeader.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BanStageHeader.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BanStageHeader.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BanStageHeader.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ConfirmationDialog$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConfirmationDialog"], {
                isOpen: showSignOutConfirm,
                onClose: ()=>setShowSignOutConfirm(false),
                onConfirm: onSignOut,
                title: "Sign Out",
                message: "Are you sure you want to sign out? You'll need to enter your name again when you return.",
                confirmText: "Sign Out",
                cancelText: "Cancel",
                variant: "danger"
            }, void 0, false, {
                fileName: "[project]/src/components/BanStageHeader.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/BanStageManagement.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BanStageManagement",
    ()=>BanStageManagement
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-rsc] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-rsc] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-rsc] (ecmascript) <export default as X>");
;
;
;
function BanStageManagement({ sortBy, setSortBy, showSortDropdown, setShowSortDropdown, searchQuery, setSearchQuery, showAutocomplete, setShowAutocomplete, activeFilter, setActiveFilter, autocompleteSuggestions, handleSearchSelect, handleClearSearch, normalizeText, totalCount, bannedCount }) {
    const searchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Handle clicking outside to close autocomplete
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowAutocomplete(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [
        setShowAutocomplete
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto my-1 sm:my-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-row items-center gap-2 sm:gap-3 min-w-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 sm:gap-3 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm sm:text-base text-white font-medium",
                                    children: "Sort by:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowSortDropdown(!showSortDropdown),
                                            className: "flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 text-sm sm:text-base text-white hover:bg-gray-700/80 transition-colors min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate",
                                                    children: sortBy === 'civilization' ? 'Civilization' : sortBy === 'leader' ? 'Leader' : 'Last Updated'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: `w-4 h-4 flex-shrink-0 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BanStageManagement.tsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, this),
                                        showSortDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-full left-0 mt-1 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-10 min-w-[150px]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSortBy('civilization');
                                                        setShowSortDropdown(false);
                                                    },
                                                    className: `w-full text-left px-4 py-2 hover:bg-gray-700/80 transition-colors ${sortBy === 'civilization' ? 'text-yellow-500 bg-gray-700/50' : 'text-white'}`,
                                                    children: "Civilization"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSortBy('leader');
                                                        setShowSortDropdown(false);
                                                    },
                                                    className: `w-full text-left px-4 py-2 hover:bg-gray-700/80 transition-colors ${sortBy === 'leader' ? 'text-yellow-500 bg-gray-700/50' : 'text-white'}`,
                                                    children: "Leader"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSortBy('lastUpdated');
                                                        setShowSortDropdown(false);
                                                    },
                                                    className: `w-full text-left px-4 py-2 hover:bg-gray-700/80 transition-colors ${sortBy === 'lastUpdated' ? 'text-yellow-500 bg-gray-700/50' : 'text-white'}`,
                                                    children: "Last Updated"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                                    lineNumber: 101,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/BanStageManagement.tsx",
                                            lineNumber: 78,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BanStageManagement.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex-1 min-w-0",
                            ref: searchRef,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BanStageManagement.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: searchQuery,
                                            onChange: (e)=>{
                                                setSearchQuery(e.target.value);
                                                setShowAutocomplete(true);
                                            },
                                            onFocus: ()=>setShowAutocomplete(true),
                                            placeholder: activeFilter === 'all' ? "Search..." : activeFilter === 'banned' ? "Search banned..." : "Search available...",
                                            className: "bg-transparent text-white placeholder-gray-400 outline-none flex-1 min-w-0 text-sm sm:text-base"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BanStageManagement.tsx",
                                            lineNumber: 121,
                                            columnNumber: 15
                                        }, this),
                                        searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleClearSearch,
                                            className: "ml-2 text-gray-400 hover:text-white transition-colors flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BanStageManagement.tsx",
                                                lineNumber: 143,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BanStageManagement.tsx",
                                            lineNumber: 139,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                showAutocomplete && autocompleteSuggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-full left-0 right-0 mt-1 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto",
                                    children: autocompleteSuggestions.map((suggestion)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleSearchSelect(suggestion.name),
                                            className: "w-full text-left px-4 py-3 hover:bg-gray-700/80 transition-colors border-b border-gray-700 last:border-b-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-white font-medium text-sm sm:text-base",
                                                    children: suggestion.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-xs sm:text-sm text-gray-400",
                                                    children: suggestion.civilization
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, suggestion.id, true, {
                                            fileName: "[project]/src/components/BanStageManagement.tsx",
                                            lineNumber: 152,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BanStageManagement.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BanStageManagement.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BanStageManagement.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto mt-1 sm:mt-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-3 gap-2 sm:gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveFilter('all'),
                            className: `
              backdrop-blur-sm rounded-lg border p-2 sm:p-3 text-center transition-all duration-200 relative
              ${activeFilter === 'all' ? 'bg-yellow-900/80 border-yellow-500 shadow-lg shadow-yellow-500/20' : 'bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 hover:border-gray-600'}
            `,
                            children: [
                                activeFilter === 'all' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-gray-900"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-base sm:text-xl font-bold ${activeFilter === 'all' ? 'text-yellow-200' : 'text-white'}`,
                                    children: totalCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-xs sm:text-sm ${activeFilter === 'all' ? 'text-yellow-300' : 'text-gray-400'}`,
                                    children: "Total"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BanStageManagement.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveFilter('banned'),
                            className: `
              backdrop-blur-sm rounded-lg border p-2 sm:p-3 text-center transition-all duration-200 relative
              ${activeFilter === 'banned' ? 'bg-red-900/80 border-red-500 shadow-lg shadow-red-500/20' : 'bg-red-900/80 border-red-700 hover:bg-red-800/80 hover:border-red-600'}
            `,
                            children: [
                                activeFilter === 'banned' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 202,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-base sm:text-xl font-bold ${activeFilter === 'banned' ? 'text-red-200' : 'text-red-200'}`,
                                    children: bannedCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-xs sm:text-sm ${activeFilter === 'banned' ? 'text-red-300' : 'text-red-300'}`,
                                    children: "Banned"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BanStageManagement.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveFilter('available'),
                            className: `
              backdrop-blur-sm rounded-lg border p-2 sm:p-3 text-center transition-all duration-200 relative
              ${activeFilter === 'available' ? 'bg-green-900/80 border-green-500 shadow-lg shadow-green-500/20' : 'bg-green-900/80 border-green-700 hover:bg-green-800/80 hover:border-green-600'}
            `,
                            children: [
                                activeFilter === 'available' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-base sm:text-xl font-bold ${activeFilter === 'available' ? 'text-green-200' : 'text-green-200'}`,
                                    children: totalCount - bannedCount
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-xs sm:text-sm ${activeFilter === 'available' ? 'text-green-300' : 'text-green-300'}`,
                                    children: "Available"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageManagement.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BanStageManagement.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BanStageManagement.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BanStageManagement.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/components/LeaderCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeaderCard",
    ()=>LeaderCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ban.js [app-rsc] (ecmascript) <export default as Ban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-rsc] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-rsc] (ecmascript) <export default as RotateCcw>");
;
;
;
function LeaderCard({ leader, onToggleBan, disabled }) {
    const [failedImages, setFailedImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const handleImageError = (imagePath, fallbackPath)=>(e)=>{
            const img = e.currentTarget;
            // If this image has already failed, don't try to set a fallback again
            if (failedImages.has(img.src)) {
                return;
            }
            // Mark this image as failed
            setFailedImages((prev)=>new Set(prev).add(img.src));
            // Only set fallback if we're not already trying to load the fallback
            if (img.src !== fallbackPath) {
                img.src = fallbackPath;
            }
        };
    const handleClick = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            onToggleBan(leader.id);
        }
    };
    const abilityText = (leader.ability || '').split('.').map((s)=>s.trim()).filter(Boolean); // remove empty strings
    const civilizationBonusText = (leader.civilization?.civilization_bonus || '').split('.').map((s)=>s.trim()).filter(Boolean); // remove empty strings
    const uniqueUnits = leader.civilization?.unique_units || [];
    const uniqueInfrastructure = leader.civilization?.unique_infrastructure || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `
        w-full h-[600px] sm:h-[700px] lg:h-[800px]    /* responsive height and width */
        relative group transition-all duration-300
        transform hover:scale-105 hover:z-10
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        overflow-hidden
      `,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `
          h-full flex flex-col                                 /* stretch + column */
          bg-gray-800 rounded-lg border-2 divide-y divide-gray-700
          transition-all duration-300
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${leader.is_banned ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-gray-700 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/20'}
        `,
            onClick: handleClick,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full flex justify-center items-center p-3 sm:p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 relative overflow-hidden rounded-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: `/images/leaders/${leader.image_key}`,
                                alt: leader.name,
                                loading: "lazy",
                                className: `
                w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover transition-all duration-300
                ${leader.is_banned ? 'grayscale brightness-50' : ''}
              `,
                                onError: handleImageError(`/images/leaders/${leader.image_key}`, '/images/leaders/placeholder.png')
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderCard.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            leader.is_banned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-br from-red-500/40 to-red-600/60 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center group-hover:scale-110 transform transition-transform duration-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                                            className: "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-100 mx-auto mb-1 drop-shadow-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 96,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-red-100 font-bold text-xs bg-red-600/80 px-2 py-1 rounded",
                                            children: "BANNED"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 97,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 95,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderCard.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this),
                            !disabled && !leader.is_banned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-600/0 group-hover:from-red-500/30 group-hover:to-red-600/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center transform scale-90 group-hover:scale-100 transition-transform duration-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                                            className: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-100 mx-auto mb-1 drop-shadow-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 108,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-red-100 font-bold text-xs bg-red-600/90 px-2 sm:px-3 py-1 rounded-full border border-red-400/50",
                                            children: "CLICK TO BAN"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 109,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 107,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderCard.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this),
                            !disabled && leader.is_banned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-600/0 group-hover:from-green-500/40 group-hover:to-green-600/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center transform scale-90 group-hover:scale-100 transition-transform duration-200",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                            className: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-100 mx-auto mb-1 drop-shadow-lg animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 119,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-green-100 font-bold text-xs bg-green-600/90 px-2 sm:px-3 py-1 rounded-full border border-green-400/50",
                                            children: "CLICK TO UNBAN"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 120,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/LeaderCard.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/LeaderCard.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/LeaderCard.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `
            p-3 sm:p-4 flex flex-col items-center text-center gap-1
            ${leader.is_banned ? 'bg-red-900/20' : ''}
          `,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: `
              font-bold text-sm sm:text-base truncate
              ${leader.is_banned ? 'text-red-200' : 'text-white'}
            `,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: leader.name.split('(')[0]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                leader.name.includes('(') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs sm:text-sm text-gray-400",
                                    children: [
                                        "(",
                                        leader.name.split('(')[1]
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/LeaderCard.tsx",
                                        lineNumber: 147,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LeaderCard.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: `text-xs sm:text-sm truncate
              ${leader.is_banned ? 'text-red-300' : 'text-gray-400'}
            `,
                            children: leader.civilization?.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderCard.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LeaderCard.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-3 py-1 sm:px-4 sm:py-1.5 flex flex-col items-center gap-1",
                    children: [
                        uniqueUnits.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1 w-full",
                            children: uniqueUnits.map((unit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5 text-blue-400 bg-blue-900/30 rounded px-2 py-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: `/images/units/${unit.image_key}`,
                                            alt: unit.name,
                                            className: "w-5 h-5 sm:w-6 sm:h-6",
                                            onError: handleImageError(`/images/units/${unit.image_key}`, '/images/units/placeholder.png')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 164,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate text-xs sm:text-sm",
                                            children: unit.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 170,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, unit.id, true, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 163,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderCard.tsx",
                            lineNumber: 161,
                            columnNumber: 13
                        }, this),
                        uniqueInfrastructure.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1 w-full",
                            children: uniqueInfrastructure.map((infra, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5 text-green-400 bg-green-900/30 rounded px-2 py-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: `/images/infrastructure/${infra.image_key}`,
                                            alt: infra.name,
                                            className: "w-5 h-5 sm:w-6 sm:h-6",
                                            onError: handleImageError(`/images/infrastructure/${infra.image_key}`, '/images/infrastructure/placeholder.png')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 179,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "truncate text-xs sm:text-sm",
                                            children: infra.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/LeaderCard.tsx",
                                            lineNumber: 185,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, infra.id, true, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 178,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderCard.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LeaderCard.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-grow flex flex-col",
                    children: [
                        leader.civilization?.civilization_bonus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 sm:p-4 text-sm sm:text-base text-gray-300 bg-gray-900/50 overflow-hidden text-left flex-grow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold text-yellow-400 mb-2",
                                    children: "Civilization Bonus:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group-hover:animate-scroll-text absolute w-full pb-4",
                                        children: civilizationBonusText.map((sentence, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "list-none mb-1",
                                                children: [
                                                    sentence,
                                                    "."
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/LeaderCard.tsx",
                                                lineNumber: 201,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeaderCard.tsx",
                                        lineNumber: 199,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LeaderCard.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 sm:p-4 flex-grow text-xs sm:text-sm text-gray-300 bg-gray-900/50 text-left overflow-hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold text-yellow-400 mb-2",
                                    children: "Leader Ability:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative h-full overflow-hidden",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group-hover:animate-scroll-text absolute w-full pb-4",
                                        children: abilityText.map((sentence, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "list-none mb-1",
                                                children: [
                                                    sentence,
                                                    "."
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/components/LeaderCard.tsx",
                                                lineNumber: 214,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LeaderCard.tsx",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LeaderCard.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LeaderCard.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LeaderCard.tsx",
                    lineNumber: 193,
                    columnNumber: 9
                }, this),
                leader.is_banned && leader.banned_by && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-center gap-1 text-xs text-red-300 bg-red-900/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                            className: "w-3 h-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LeaderCard.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate",
                            children: [
                                "Banned by ",
                                leader.banned_by
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/LeaderCard.tsx",
                            lineNumber: 225,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/LeaderCard.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/LeaderCard.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/LeaderCard.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/BanStageLeadersGrid.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BanStageLeadersGrid",
    ()=>BanStageLeadersGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-rsc] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeaderCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LeaderCard.tsx [app-rsc] (ecmascript)");
;
;
;
function BanStageLeadersGrid({ filteredLeaders, activeFilter, searchQuery, onToggleBan }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto py-2 sm:py-3 grid-container overflow-visible",
        children: [
            filteredLeaders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-1 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400 text-sm",
                    children: [
                        "Showing ",
                        filteredLeaders.length,
                        " ",
                        activeFilter === 'all' ? '' : activeFilter,
                        " leader",
                        filteredLeaders.length !== 1 ? 's' : '',
                        searchQuery.trim() && ` matching "${searchQuery}"`
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BanStageLeadersGrid.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BanStageLeadersGrid.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this),
            filteredLeaders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                        className: "w-16 h-16 text-gray-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BanStageLeadersGrid.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 text-lg",
                        children: searchQuery.trim() ? `No ${activeFilter === 'all' ? '' : activeFilter} leaders found matching "${searchQuery}"` : `No ${activeFilter === 'all' ? '' : activeFilter} leaders available`
                    }, void 0, false, {
                        fileName: "[project]/src/components/BanStageLeadersGrid.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BanStageLeadersGrid.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-visible",
                children: filteredLeaders.map((leader)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LeaderCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LeaderCard"], {
                        leader: leader,
                        onToggleBan: onToggleBan
                    }, leader.id, false, {
                        fileName: "[project]/src/components/BanStageLeadersGrid.tsx",
                        lineNumber: 46,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/BanStageLeadersGrid.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BanStageLeadersGrid.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/BanStageFooter.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BanStageFooter",
    ()=>BanStageFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function BanStageFooter({ windowWidth, isScrolled, totalCount, bannedCount }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "footer bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 shadow-lg",
        children: windowWidth < 640 ? // Mobile: stacked, animated, compact
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-2",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center w-full gap-1",
                children: [
                    !isScrolled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-gray-900/70 border border-gray-700 rounded-lg px-2 py-0.5 flex items-center justify-center text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-sm text-white mr-2",
                                        children: "How to use:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BanStageFooter.tsx",
                                        lineNumber: 29,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-300",
                                        children: "Click to ban/unban leaders"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BanStageFooter.tsx",
                                        lineNumber: 30,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 28,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-gray-900/70 border border-gray-700 rounded-lg px-2 py-0.5 flex items-center justify-center text-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-sm text-white",
                                    children: [
                                        "Created by ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://github.com/nickbenthem",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-yellow-500 hover:text-yellow-400 transition-colors font-bold",
                                            children: "NickBenthem"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BanStageFooter.tsx",
                                            lineNumber: 34,
                                            columnNumber: 81
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BanStageFooter.tsx",
                                    lineNumber: 34,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 33,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BanStageFooter.tsx",
                        lineNumber: 26,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-gray-900/70 border border-gray-700 rounded-lg flex items-center justify-center text-center transition-all duration-300 ease-out",
                        style: {
                            padding: isScrolled ? '8px 12px' : '4px 8px',
                            borderRadius: isScrolled ? '8px' : '6px',
                            transform: isScrolled ? 'scale(1.05)' : 'scale(1)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-sm text-white mr-2",
                                children: "Stats"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-300 mr-2",
                                children: [
                                    "Total: ",
                                    totalCount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-300 mr-2",
                                children: [
                                    "Banned: ",
                                    bannedCount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-300",
                                children: [
                                    "Available: ",
                                    totalCount - bannedCount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BanStageFooter.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BanStageFooter.tsx",
                lineNumber: 23,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/BanStageFooter.tsx",
            lineNumber: 22,
            columnNumber: 9
        }, this) : // Desktop: single horizontal bar with three sections
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto p-2 sm:p-3",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-row items-stretch w-full gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 bg-gray-900/70 border border-gray-700 rounded-lg px-3 py-1 flex items-center justify-center text-center min-h-[48px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-base text-white mr-2",
                                children: "How to use:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-300",
                                children: "Click to ban/unban leaders"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BanStageFooter.tsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-1.5 flex items-center justify-center text-center min-h-[48px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-semibold text-base text-white",
                            children: [
                                "Created by ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://github.com/nickbenthem",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "text-yellow-500 hover:text-yellow-400 transition-colors font-bold",
                                    children: "NickBenthem"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BanStageFooter.tsx",
                                    lineNumber: 65,
                                    columnNumber: 79
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BanStageFooter.tsx",
                            lineNumber: 65,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/BanStageFooter.tsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-1.5 flex items-center justify-center text-center min-h-[48px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-semibold text-base text-white mr-3",
                                children: "Stats"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-300 mr-3",
                                children: [
                                    "Total: ",
                                    totalCount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-300 mr-3",
                                children: [
                                    "Banned: ",
                                    bannedCount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-300",
                                children: [
                                    "Available: ",
                                    totalCount - bannedCount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/BanStageFooter.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BanStageFooter.tsx",
                        lineNumber: 68,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BanStageFooter.tsx",
                lineNumber: 57,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/BanStageFooter.tsx",
            lineNumber: 56,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/BanStageFooter.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/BanStage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BanStage",
    ()=>BanStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/crown.js [app-rsc] (ecmascript) <export default as Crown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLeaders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useLeaders.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUserPresence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useUserPresence.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStageHeader$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BanStageHeader.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStageManagement$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BanStageManagement.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStageLeadersGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BanStageLeadersGrid.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStageFooter$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BanStageFooter.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
function BanStage({ userName, lobbyCode, onBack }) {
    const { leaders, loading, toggleBanLeader, isReconnecting: isLeaderReconnecting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useLeaders$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useLeaders"])(lobbyCode);
    const { connectedUsers, isConnected, isReconnecting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useUserPresence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useUserPresence"])(userName, userName, lobbyCode);
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])('leader');
    const [showSortDropdown, setShowSortDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])('');
    const [showAutocomplete, setShowAutocomplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])('all');
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(false);
    const [windowWidth, setWindowWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(0);
    const [scrollContainer, setScrollContainer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    // Reset viewport when component mounts to fix mobile zoom issues
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Simple scroll reset
        window.scrollTo(0, 0);
        // Basic mobile fixes without aggressive manipulation
        if (window.innerWidth <= 768) {
            document.body.style.overflowX = 'hidden';
            document.documentElement.style.overflowX = 'hidden';
        }
        // Ensure the viewport meta tag is properly applied
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
        }
    }, []);
    // Function to normalize text by removing diacritics
    const normalizeText = (text)=>{
        return text.normalize('NFD') // Decompose characters into base + diacritic
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .toLowerCase();
    };
    // Handle window resize and initial width
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const updateWidth = ()=>setWindowWidth(window.innerWidth);
        updateWidth(); // Set initial width
        window.addEventListener('resize', updateWidth);
        return ()=>window.removeEventListener('resize', updateWidth);
    }, []);
    // Handle scrolling for mobile footer visibility with smooth transitions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!scrollContainer) {
            return;
        }
        const handleScroll = ()=>{
            const containerScrollTop = scrollContainer.scrollTop;
            const windowScrollTop = window.scrollY;
            // Use container scroll as primary, fallback to window scroll
            const shouldBeScrolled = containerScrollTop > 5 || windowScrollTop > 5;
            setIsScrolled(shouldBeScrolled);
        };
        // Listen to scroll events on both window and the container
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });
        scrollContainer.addEventListener('scroll', handleScroll, {
            passive: true
        });
        return ()=>{
            window.removeEventListener('scroll', handleScroll);
            scrollContainer.removeEventListener('scroll', handleScroll);
        };
    }, [
        scrollContainer
    ]); // Only run when scrollContainer changes
    const handleToggleBan = (leaderId)=>{
        console.log('BanStage handleToggleBan called for:', leaderId, 'by:', userName);
        toggleBanLeader(leaderId, userName);
    };
    const sortedLeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return [
            ...leaders
        ].sort((a, b)=>{
            if (sortBy === 'civilization') {
                const civA = a.civilization?.name || '';
                const civB = b.civilization?.name || '';
                return civA.localeCompare(civB);
            } else if (sortBy === 'lastUpdated') {
                // Sort by banned_at timestamp (most recent first)
                // If banned_at is null, use created_at as fallback
                const timeA = a.banned_at ? new Date(a.banned_at).getTime() : new Date(a.created_at).getTime();
                const timeB = b.banned_at ? new Date(b.banned_at).getTime() : new Date(b.created_at).getTime();
                return timeB - timeA; // Descending order (most recent first)
            } else {
                return a.name.localeCompare(b.name);
            }
        });
    }, [
        leaders,
        sortBy
    ]);
    const filteredLeaders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        // First apply the active filter
        let filtered = sortedLeaders;
        if (activeFilter === 'banned') {
            filtered = filtered.filter((leader)=>leader.is_banned);
        } else if (activeFilter === 'available') {
            filtered = filtered.filter((leader)=>!leader.is_banned);
        }
        // 'all' filter shows everyone, so no additional filtering needed
        // Then apply search query if present
        if (!searchQuery.trim()) {
            return filtered;
        }
        const query = normalizeText(searchQuery);
        return filtered.filter((leader)=>{
            const leaderName = normalizeText(leader.name);
            const civName = normalizeText(leader.civilization?.name || '');
            return leaderName.includes(query) || civName.includes(query);
        });
    }, [
        sortedLeaders,
        searchQuery,
        activeFilter
    ]);
    const autocompleteSuggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!searchQuery.trim() || searchQuery.length < 2) {
            return [];
        }
        const query = normalizeText(searchQuery);
        // For autocomplete, we want to search through all leaders regardless of filter
        // but respect the current filter for the suggestions
        let searchableLeaders = leaders;
        if (activeFilter === 'banned') {
            searchableLeaders = searchableLeaders.filter((leader)=>leader.is_banned);
        } else if (activeFilter === 'available') {
            searchableLeaders = searchableLeaders.filter((leader)=>!leader.is_banned);
        }
        const suggestions = searchableLeaders.filter((leader)=>{
            const leaderName = normalizeText(leader.name);
            const civName = normalizeText(leader.civilization?.name || '');
            return leaderName.includes(query) || civName.includes(query);
        }).slice(0, 5) // Limit to 5 suggestions
        .map((leader)=>({
                id: leader.id,
                name: leader.name,
                civilization: leader.civilization?.name || ''
            }));
        return suggestions;
    }, [
        leaders,
        searchQuery,
        activeFilter
    ]);
    const handleSearchSelect = (leaderName)=>{
        setSearchQuery(leaderName);
        setShowAutocomplete(false);
    };
    const handleClearSearch = ()=>{
        setSearchQuery('');
        setShowAutocomplete(false);
    };
    const bannedCount = leaders.filter((leader)=>leader.is_banned).length;
    const totalCount = leaders.length;
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$crown$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Crown$3e$__["Crown"], {
                        className: "w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BanStage.tsx",
                        lineNumber: 189,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-white text-lg",
                        children: "Loading leaders..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/BanStage.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BanStage.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/BanStage.tsx",
            lineNumber: 187,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col",
        style: {
            height: '100vh'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 p-4 overflow-y-auto overflow-x-visible pb-10 md:pb-4",
                ref: setScrollContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStageHeader$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BanStageHeader"], {
                        userName: userName,
                        lobbyCode: lobbyCode,
                        connectedUsers: connectedUsers,
                        isConnected: isConnected,
                        isReconnecting: isReconnecting,
                        isLeaderReconnecting: isLeaderReconnecting,
                        onSignOut: onBack,
                        onChangeName: onBack
                    }, void 0, false, {
                        fileName: "[project]/src/components/BanStage.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStageManagement$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BanStageManagement"], {
                        sortBy: sortBy,
                        setSortBy: setSortBy,
                        showSortDropdown: showSortDropdown,
                        setShowSortDropdown: setShowSortDropdown,
                        searchQuery: searchQuery,
                        setSearchQuery: setSearchQuery,
                        showAutocomplete: showAutocomplete,
                        setShowAutocomplete: setShowAutocomplete,
                        activeFilter: activeFilter,
                        setActiveFilter: setActiveFilter,
                        autocompleteSuggestions: autocompleteSuggestions,
                        handleSearchSelect: handleSearchSelect,
                        handleClearSearch: handleClearSearch,
                        normalizeText: normalizeText,
                        totalCount: totalCount,
                        bannedCount: bannedCount
                    }, void 0, false, {
                        fileName: "[project]/src/components/BanStage.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStageLeadersGrid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BanStageLeadersGrid"], {
                        filteredLeaders: filteredLeaders,
                        activeFilter: activeFilter,
                        searchQuery: searchQuery,
                        onToggleBan: handleToggleBan
                    }, void 0, false, {
                        fileName: "[project]/src/components/BanStage.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BanStage.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStageFooter$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BanStageFooter"], {
                    windowWidth: windowWidth,
                    isScrolled: isScrolled,
                    totalCount: totalCount,
                    bannedCount: bannedCount
                }, void 0, false, {
                    fileName: "[project]/src/components/BanStage.tsx",
                    lineNumber: 248,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BanStage.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BanStage.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/utils/userPersistence.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearUser",
    ()=>clearUser,
    "getUserExpirationTime",
    ()=>getUserExpirationTime,
    "loadLastLobbyCode",
    ()=>loadLastLobbyCode,
    "loadUser",
    ()=>loadUser,
    "saveUser",
    ()=>saveUser
]);
const USER_STORAGE_KEY = 'civ6_user';
const EXPIRATION_HOURS = 2400;
function saveUser(name, lobbyCode) {
    const userData = {
        name,
        timestamp: Date.now(),
        ...lobbyCode && {
            lastLobbyCode: lobbyCode
        }
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
}
function loadUser() {
    try {
        const stored = localStorage.getItem(USER_STORAGE_KEY);
        if (!stored) return null;
        const userData = JSON.parse(stored);
        const now = Date.now();
        const expirationTime = userData.timestamp + EXPIRATION_HOURS * 60 * 60 * 1000;
        // Check if the stored data has expired
        if (now > expirationTime) {
            localStorage.removeItem(USER_STORAGE_KEY);
            return null;
        }
        return userData.name;
    } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem(USER_STORAGE_KEY);
        return null;
    }
}
function loadLastLobbyCode() {
    try {
        const stored = localStorage.getItem(USER_STORAGE_KEY);
        if (!stored) return null;
        const userData = JSON.parse(stored);
        const now = Date.now();
        const expirationTime = userData.timestamp + EXPIRATION_HOURS * 60 * 60 * 1000;
        // Check if the stored data has expired
        if (now > expirationTime) {
            localStorage.removeItem(USER_STORAGE_KEY);
            return null;
        }
        return userData.lastLobbyCode || null;
    } catch (error) {
        console.error('Error loading last lobby code:', error);
        return null;
    }
}
function clearUser() {
    localStorage.removeItem(USER_STORAGE_KEY);
}
function getUserExpirationTime() {
    try {
        const stored = localStorage.getItem(USER_STORAGE_KEY);
        if (!stored) return null;
        const userData = JSON.parse(stored);
        return new Date(userData.timestamp + EXPIRATION_HOURS * 60 * 60 * 1000);
    } catch (error) {
        return null;
    }
}
}),
"[project]/src/App.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router-dom/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LobbySetup$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LobbySetup.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BanStage.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/userPersistence.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/lobbyUtils.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
// Component to handle lobby routes with proper parameter extraction
function LobbyRouteHandler() {
    const { lobbyCode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useParams"])();
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useLocation"])();
    const [userName, setUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentLobby, setCurrentLobby] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(true);
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useNavigate"])();
    // Extract lobby code from URL path as fallback
    const extractLobbyCodeFromPath = (pathname)=>{
        const pathParts = pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
            const code = pathParts[0];
            if (code.includes('-') && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(code)) {
                return code;
            }
        }
        return null;
    };
    // Initialize lobby route
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeLobby = ()=>{
            // Load user from localStorage
            const savedUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadUser"])();
            if (savedUser) {
                setUserName(savedUser);
            }
            // Try to get lobby code from params first, then fallback to URL path
            let finalLobbyCode = null;
            if (lobbyCode && lobbyCode.trim() !== '' && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(lobbyCode)) {
                finalLobbyCode = lobbyCode;
            } else {
                // Fallback to extracting from URL path
                const pathCode = extractLobbyCodeFromPath(location.pathname);
                if (pathCode) {
                    finalLobbyCode = pathCode;
                }
            }
            // Always set the lobby code (even if invalid) so LobbySetup can show error message
            if (finalLobbyCode) {
                setCurrentLobby(finalLobbyCode);
            } else if (lobbyCode && lobbyCode.trim() !== '') {
                // If we have an invalid lobby code from params, pass it through
                setCurrentLobby(lobbyCode);
            } else {
                setCurrentLobby(null);
            }
            setIsLoading(false);
        };
        initializeLobby();
    }, [
        lobbyCode,
        location.pathname
    ]);
    const handleReady = (lobbyCode, name)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveUser"])(name, lobbyCode);
        setUserName(name);
        setCurrentLobby(lobbyCode);
        navigate(`/${lobbyCode}`);
    };
    const handleLeaveSession = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clearUser"])();
        setUserName(null);
        setCurrentLobby(null);
        navigate('/');
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 83,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/App.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this);
    }
    // Validate lobby code before showing BanStage
    const isValidCurrentLobby = currentLobby && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(currentLobby);
    return userName && isValidCurrentLobby ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BanStage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BanStage"], {
        userName: userName,
        lobbyCode: currentLobby,
        onBack: handleLeaveSession
    }, void 0, false, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LobbySetup$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LobbySetup"], {
        onReady: handleReady,
        initialLobbyCode: currentLobby || undefined
    }, void 0, false, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
function App() {
    const [userName, setUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentLobby, setCurrentLobby] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useState"])(true);
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useNavigate"])();
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useLocation"])();
    // Extract lobby code from URL path
    const extractLobbyCodeFromPath = (pathname)=>{
        const pathParts = pathname.split('/').filter(Boolean);
        if (pathParts.length > 0) {
            const lobbyCode = pathParts[0];
            if (lobbyCode.includes('-')) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(lobbyCode)) {
                    return lobbyCode;
                }
            }
        }
        return null;
    };
    // Initialize app state on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initializeApp = ()=>{
            // Load user from localStorage
            const savedUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadUser"])();
            if (savedUser) {
                setUserName(savedUser);
            }
            // Extract lobby code from current URL
            const lobbyCode = extractLobbyCodeFromPath(location.pathname);
            if (lobbyCode) {
                setCurrentLobby(lobbyCode);
            } else {
                // If no lobby code in URL, try to load the last lobby code from localStorage
                const lastLobbyCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadLastLobbyCode"])();
                if (lastLobbyCode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(lastLobbyCode)) {
                    setCurrentLobby(lastLobbyCode);
                }
            }
            setIsLoading(false);
        };
        initializeApp();
    }, []); // Only run on mount
    // Handle URL changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoading) {
            const lobbyCode = extractLobbyCodeFromPath(location.pathname);
            if (lobbyCode) {
                setCurrentLobby(lobbyCode);
            } else {
                // If no lobby code in URL, try to load the last lobby code from localStorage
                const lastLobbyCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["loadLastLobbyCode"])();
                if (lastLobbyCode && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$lobbyUtils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isValidLobbyCode"])(lastLobbyCode)) {
                    setCurrentLobby(lastLobbyCode);
                } else {
                    setCurrentLobby(null);
                }
            }
        }
    }, [
        location.pathname,
        isLoading
    ]);
    const handleReady = (lobbyCode, name)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveUser"])(name, lobbyCode);
        setUserName(name);
        setCurrentLobby(lobbyCode);
        navigate(`/${lobbyCode}`);
    };
    const handleLeaveSession = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$userPersistence$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clearUser"])();
        setUserName(null);
        setCurrentLobby(null);
        navigate('/');
    };
    // Show loading state while checking localStorage
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-white",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 186,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/App.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Routes"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Route"], {
                path: "/",
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LobbySetup$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["LobbySetup"], {
                    onReady: handleReady,
                    initialLobbyCode: currentLobby || undefined
                }, void 0, false, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 197,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Route"], {
                path: "/:lobbyCode",
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(LobbyRouteHandler, {}, void 0, false, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 204,
                    columnNumber: 18
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Route"], {
                path: "*",
                element: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-white text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl mb-4",
                                children: "Page Not Found"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 213,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-4",
                                children: "The requested page could not be found."
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 214,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>navigate('/'),
                                className: "bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded",
                                children: "Go Home"
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 215,
                                columnNumber: 15
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 212,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 211,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 192,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = App;
}),
"[project]/src/AppShell.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router-dom/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$App$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/App.tsx [app-rsc] (ecmascript)");
;
;
;
;
function AppShell() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["StrictMode"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2d$dom$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BrowserRouter"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$App$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/AppShell.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/AppShell.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/AppShell.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/AppShell.tsx [app-rsc] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/AppShell.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__74d07c89._.js.map