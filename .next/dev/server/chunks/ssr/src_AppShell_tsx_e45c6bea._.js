module.exports = [
"[project]/src/AppShell.tsx [app-rsc] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[root-of-the-server]__74d07c89._.js",
  "server/chunks/ssr/node_modules_233c092a._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/AppShell.tsx [app-rsc] (ecmascript, next/dynamic entry)");
    });
});
}),
];