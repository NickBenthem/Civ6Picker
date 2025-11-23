module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/src/utils/footerManager.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Footer height management with ResizeObserver
__turbopack_context__.s([]);
(function() {
    'use strict';
    const footer = document.querySelector('.footer');
    if (!footer) return;
    // Update CSS custom property
    function updateFooterHeight() {
        // Get the total height including padding and borders
        const rect = footer.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(footer);
        const totalHeight = rect.height + parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom);
        // Use the actual height, with no minimum
        const finalHeight = totalHeight;
        document.documentElement.style.setProperty('--footer-h', `${finalHeight}px`);
    }
    // ResizeObserver for dynamic content changes
    const resizeObserver = new ResizeObserver(()=>{
        updateFooterHeight();
    });
    resizeObserver.observe(footer);
    // Handle orientation and resize events
    function handleResize() {
        // Small delay to ensure layout is complete
        setTimeout(updateFooterHeight, 100);
    }
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    // Initial setup - wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateFooterHeight);
    } else {
        updateFooterHeight();
    }
    // Cleanup function (optional)
    window.addEventListener('beforeunload', ()=>{
        resizeObserver.disconnect();
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
    });
})();
}),
"[project]/pages/_app.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyApp
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$footerManager$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/footerManager.js [ssr] (ecmascript)");
;
;
;
function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
        ...pageProps
    }, void 0, false, {
        fileName: "[project]/pages/_app.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__81120a6b._.js.map