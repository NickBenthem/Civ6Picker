module.exports = [
"[project]/src/AppShell.tsx [ssr] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[root-of-the-server]__e5c73f8b._.js",
  "server/chunks/ssr/node_modules_lucide-react_dist_esm_8a6e7f37._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/AppShell.tsx [ssr] (ecmascript, next/dynamic entry)");
    });
});
}),
];