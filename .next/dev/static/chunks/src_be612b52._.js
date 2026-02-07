(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ProductCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast-store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const ProductCard = ({ product })=>{
    _s();
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const { addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, formatPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"])();
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ProductCard.useEffect": ()=>{
            setMounted(true);
        }
    }["ProductCard.useEffect"], []);
    const wishlisted = isInWishlist(product.id);
    const isOutOfStock = product.stock <= 0;
    const discount = product.oldPrice ? Math.round((product.oldPrice - product.price) / product.oldPrice * 100) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `group relative bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out border border-transparent hover:border-gray-100 ${isOutOfStock ? 'opacity-80' : ''}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative aspect-square bg-[#f5f6f6] flex items-center justify-center p-8 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/product/${product.id}`,
                        className: "w-full h-full flex items-center justify-center relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: product.image,
                                alt: product.name,
                                fill: true,
                                sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
                                className: `object-contain mix-blend-multiply transition-all duration-700 ease-in-out ${product.secondaryImage ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-110'}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 34,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            product.secondaryImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: product.secondaryImage,
                                alt: `${product.name} hover`,
                                fill: true,
                                sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
                                className: "object-contain mix-blend-multiply opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 42,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 33,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                            addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", "success");
                        },
                        className: `absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-4 rounded-full shadow-lg border z-30 transition-all duration-300 transform active:scale-90 ${wishlisted ? 'bg-red-500 border-red-500 text-white' : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "h-4 w-4 md:h-6 md:w-6",
                            fill: wishlisted ? "currentColor" : "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 63,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 62,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto flex flex-col items-center justify-center gap-3 z-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: (e)=>{
                                e.preventDefault();
                                e.stopPropagation();
                                setQuickViewProduct(product);
                            },
                            className: "hidden md:block bg-white text-gray-900 px-8 py-3.5 rounded-full font-black text-xs shadow-xl transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#005d32] hover:text-white",
                            children: "Quick View"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 70,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 69,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductCard.tsx",
                lineNumber: 32,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 md:p-8 space-y-3 md:space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-start gap-1 md:gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-black text-gray-900 text-sm md:text-lg leading-tight truncate",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/product/${product.id}`,
                                            className: "hover:text-[#005d32] transition-colors",
                                            children: product.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ProductCard.tsx",
                                            lineNumber: 88,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductCard.tsx",
                                        lineNumber: 87,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5 md:mt-1",
                                        children: product.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductCard.tsx",
                                        lineNumber: 90,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left md:text-right shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    suppressHydrationWarning: true,
                                    className: "font-black text-base md:text-xl text-[#005d32]",
                                    children: mounted ? formatPrice(product.price) : `$${product.price.toFixed(2)}`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ProductCard.tsx",
                                    lineNumber: 93,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 92,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 85,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (!isOutOfStock) {
                                addToCart(product);
                                addToast(`${product.name} added to bag!`, "success");
                            }
                        },
                        disabled: isOutOfStock,
                        className: `w-full py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-sm ${isOutOfStock ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-[#005d32] text-white hover:bg-[#004a28] shadow-[#005d32]/10'}`,
                        children: isOutOfStock ? 'Out of Stock' : 'Add to Bag'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 99,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductCard.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductCard.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ProductCard, "WZldexjh2eka1W8FxVALi2AwIu4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCartStore"]
    ];
});
_c = ProductCard;
const __TURBOPACK__default__export__ = ProductCard;
var _c;
__turbopack_context__.k.register(_c, "ProductCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/HomeClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const HomeClient = ({ featuredProducts })=>{
    _s();
    const [scrollY, setScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeReview, setActiveReview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const heroRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const reviewsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeClient.useEffect": ()=>{
            setIsLoaded(true);
            const handleScroll = {
                "HomeClient.useEffect.handleScroll": ()=>setScrollY(window.scrollY)
            }["HomeClient.useEffect.handleScroll"];
            const handleMouseMove = {
                "HomeClient.useEffect.handleMouseMove": (e)=>{
                    setMousePos({
                        x: e.clientX / window.innerWidth - 0.5,
                        y: e.clientY / window.innerHeight - 0.5
                    });
                }
            }["HomeClient.useEffect.handleMouseMove"];
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            window.addEventListener('mousemove', handleMouseMove);
            return ({
                "HomeClient.useEffect": ()=>{
                    window.removeEventListener('scroll', handleScroll);
                    window.removeEventListener('mousemove', handleMouseMove);
                }
            })["HomeClient.useEffect"];
        }
    }["HomeClient.useEffect"], []);
    const scrollReviews = (direction)=>{
        if (reviewsRef.current) {
            const container = reviewsRef.current;
            const scrollAmount = container.offsetWidth * 0.9;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    const layers = {
        back: {
            x: mousePos.x * -15,
            y: mousePos.y * -15 + scrollY * 0.1
        },
        mid: {
            x: mousePos.x * -30,
            y: mousePos.y * -30 + scrollY * 0.15
        },
        front: {
            x: mousePos.x * 50,
            y: mousePos.y * 50 + scrollY * -0.05
        },
        overlay: {
            x: mousePos.x * 70,
            y: mousePos.y * 70
        }
    };
    const heroOpacity = Math.max(0, 1 - scrollY / 700);
    // Reliable Tech Community Image IDs
    const communityImages = [
        '1505740420928-5e560c06d30e',
        '1523275335684-37898b6baf30',
        '1546435770-a3e426bf472b',
        '1572635196237-14b3f281503f',
        '1583394838336-acd977736f90'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-68d575acca7c0ce0" + " " + "pb-12 overflow-hidden bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "68d575acca7c0ce0",
                children: "@keyframes revealUp{0%{opacity:0;transform:translateY(40px)scale(.98)}to{opacity:1;transform:translateY(0)scale(1)}}.animate-reveal{opacity:0;animation:1.2s cubic-bezier(.16,1,.3,1) forwards revealUp}.smooth-transform{will-change:transform;transition:transform .25s cubic-bezier(.1,0,.2,1)}@keyframes softPulse{0%{box-shadow:0 0 #005d3266}70%{box-shadow:0 0 0 15px #005d3200}to{box-shadow:0 0 #005d3200}}.urgency-pulse{animation:2s infinite softPulse}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: heroRef,
                className: "jsx-68d575acca7c0ce0" + " " + "relative min-h-[90vh] flex items-center pt-8 md:pt-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-68d575acca7c0ce0" + " " + "absolute inset-0 pointer-events-none overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    transform: `translate(${layers.back.x}px, ${layers.back.y}px)`
                                },
                                className: "jsx-68d575acca7c0ce0" + " " + "absolute top-[-10%] left-[-5%] w-[110%] h-[110%] bg-[#f3f9f6] opacity-30 skew-y-3 smooth-transform"
                            }, void 0, false, {
                                fileName: "[project]/src/app/HomeClient.tsx",
                                lineNumber: 86,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    transform: `translate(${layers.back.x * 1.5}px, ${layers.back.y * 0.5}px)`
                                },
                                className: "jsx-68d575acca7c0ce0" + " " + "absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#005d32]/5 rounded-full blur-[140px] smooth-transform"
                            }, void 0, false, {
                                fileName: "[project]/src/app/HomeClient.tsx",
                                lineNumber: 87,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/HomeClient.tsx",
                        lineNumber: 85,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-68d575acca7c0ce0" + " " + "max-w-7xl mx-auto px-4 md:px-12 w-full relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68d575acca7c0ce0" + " " + "flex flex-col lg:flex-row items-center gap-12 lg:gap-20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        opacity: heroOpacity
                                    },
                                    className: "jsx-68d575acca7c0ce0" + " " + "flex-1 space-y-12 text-center lg:text-left order-2 lg:order-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "space-y-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-[#005d32] text-[10px] font-black uppercase tracking-[0.3em] rounded-full animate-reveal shadow-sm border border-[#005d32]/5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "flex h-2 w-2 rounded-full bg-[#005d32] animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 94,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Limited Release Drop"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    style: {
                                                        animationDelay: '200ms'
                                                    },
                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-5xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-[0.92] tracking-tighter animate-reveal",
                                                    children: [
                                                        "Acoustic ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                            className: "jsx-68d575acca7c0ce0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 46
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "text-transparent bg-clip-text bg-gradient-to-br from-[#005d32] via-[#005d32] to-emerald-400",
                                                            children: "Zenith."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 53
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    style: {
                                                        animationDelay: '400ms'
                                                    },
                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-gray-500 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed animate-reveal",
                                                    children: "Where pure engineering meets ethereal design. The flagship AJ-1 Wireless is more than audio—it's an emotional resonance."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 92,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                animationDelay: '600ms'
                                            },
                                            className: "jsx-68d575acca7c0ce0" + " " + "flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-reveal",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/shop",
                                                    className: "group relative w-full sm:w-auto bg-[#005d32] text-white px-14 py-6 rounded-full font-black uppercase tracking-[0.15em] text-[11px] overflow-hidden shadow-2xl shadow-[#005d32]/20 hover:scale-[1.03] transition-all active:scale-95 urgency-pulse btn-haptic",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "relative z-10",
                                                            children: "Order Yours Today"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 106,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 107,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "flex items-center gap-4 text-gray-400 font-black text-[10px] uppercase tracking-widest",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "flex -space-x-3",
                                                            children: [
                                                                1,
                                                                2,
                                                                3,
                                                                4
                                                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-68d575acca7c0ce0" + " " + "w-9 h-9 rounded-full border-2 border-white bg-gray-50 overflow-hidden ring-4 ring-[#f3f9f6] relative",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: `https://i.pravatar.cc/100?u=user${i + 20}`,
                                                                        alt: "User",
                                                                        fill: true,
                                                                        sizes: "36px",
                                                                        className: "object-cover"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                                        lineNumber: 113,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, i, false, {
                                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                                    lineNumber: 112,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "pl-2 text-[10px]",
                                                            children: "Rated 4.9/5 By Critics"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 123,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 104,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 91,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68d575acca7c0ce0" + " " + "flex-1 relative order-1 lg:order-2 w-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            transform: `translate(${layers.front.x}px, ${layers.front.y}px)`
                                        },
                                        className: "jsx-68d575acca7c0ce0" + " " + "relative smooth-transform",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68d575acca7c0ce0" + " " + "absolute inset-4 md:inset-10 bg-[#005d32]/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                lineNumber: 129,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68d575acca7c0ce0" + " " + `relative w-full aspect-square md:aspect-[4/3] max-w-2xl mx-auto rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] md:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.15)] border border-white/60 overflow-hidden z-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1400&auto=format&fit=crop",
                                                    alt: "Flagship Audio Product",
                                                    fill: true,
                                                    priority: true,
                                                    sizes: "(max-width: 1024px) 100vw, 50vw",
                                                    className: "object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 131,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                lineNumber: 130,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/HomeClient.tsx",
                                        lineNumber: 128,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 127,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/HomeClient.tsx",
                            lineNumber: 90,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/HomeClient.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/HomeClient.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-68d575acca7c0ce0" + " " + "space-y-32 mt-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-68d575acca7c0ce0" + " " + "max-w-7xl mx-auto px-4 md:px-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68d575acca7c0ce0" + " " + "bg-[#f3f9f6]/40 backdrop-blur-sm rounded-[3rem] p-8 md:p-10 flex flex-wrap justify-around items-center gap-8 border border-white shadow-sm",
                            children: [
                                {
                                    text: 'Global Shipping',
                                    icon: '🌍'
                                },
                                {
                                    text: 'Secure Payments',
                                    icon: '🛡️'
                                },
                                {
                                    text: '30 Day Trial',
                                    icon: '🔄'
                                },
                                {
                                    text: '4.9/5 Rating',
                                    icon: '⭐'
                                }
                            ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68d575acca7c0ce0" + " " + "flex items-center gap-3 group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "text-xl group-hover:scale-125 transition-transform duration-300",
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 158,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "text-[11px] font-black text-gray-900 uppercase tracking-widest",
                                            children: item.text
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 159,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 157,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/app/HomeClient.tsx",
                            lineNumber: 150,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/HomeClient.tsx",
                        lineNumber: 149,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-68d575acca7c0ce0" + " " + "max-w-7xl mx-auto px-4 md:px-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-68d575acca7c0ce0" + " " + "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68d575acca7c0ce0" + " " + "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "jsx-68d575acca7c0ce0" + " " + "text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase",
                                                children: "Trending Tech"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                lineNumber: 169,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-68d575acca7c0ce0" + " " + "text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em]",
                                                children: "Most loved drops this month"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                lineNumber: 170,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/HomeClient.tsx",
                                        lineNumber: 168,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/shop",
                                        className: "text-[#005d32] font-black uppercase text-xs tracking-widest flex items-center gap-3 group btn-haptic",
                                        children: [
                                            "Shop Everything",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68d575acca7c0ce0" + " " + "w-10 h-10 rounded-full border border-[#005d32]/20 flex items-center justify-center group-hover:bg-[#005d32] group-hover:text-white transition-all",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    className: "jsx-68d575acca7c0ce0" + " " + "w-4 h-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: "3",
                                                        d: "M14 5l7 7m0 0l-7 7m7-7H3",
                                                        className: "jsx-68d575acca7c0ce0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 112
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                lineNumber: 174,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/HomeClient.tsx",
                                        lineNumber: 172,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/HomeClient.tsx",
                                lineNumber: 167,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-68d575acca7c0ce0" + " " + "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10",
                                children: featuredProducts.slice(0, 4).map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        product: product
                                    }, product.id, false, {
                                        fileName: "[project]/src/app/HomeClient.tsx",
                                        lineNumber: 181,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/app/HomeClient.tsx",
                                lineNumber: 179,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/HomeClient.tsx",
                        lineNumber: 166,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-68d575acca7c0ce0" + " " + "max-w-7xl mx-auto px-4 md:px-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68d575acca7c0ce0" + " " + "bg-[#005d32] rounded-[4rem] p-12 md:p-32 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68d575acca7c0ce0" + " " + "absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400 opacity-10 blur-[120px] rounded-full pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 190,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68d575acca7c0ce0" + " " + "flex-1 space-y-10 relative z-10 text-center lg:text-left",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "text-4xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase",
                                            children: [
                                                "Sick of ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                    className: "jsx-68d575acca7c0ce0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 136
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-emerald-400 opacity-50",
                                                    children: "Tangled Tech?"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 143
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 192,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "text-emerald-100/70 text-lg font-medium max-w-xl leading-relaxed",
                                            children: "Most gadgets sacrifice beauty for utility. Our Wireless Series eliminates the mess while elevating your aesthetic."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 193,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "grid grid-cols-1 md:grid-cols-2 gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "text-red-400 font-black block mb-2 uppercase text-[10px] tracking-widest",
                                                            children: "The Problem"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "text-white font-bold text-sm",
                                                            children: "Cheap plastic parts that break in months."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 197,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 195,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "p-8 bg-emerald-400/10 border border-emerald-400/20 rounded-[2.5rem] backdrop-blur-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "text-emerald-400 font-black block mb-2 uppercase text-[10px] tracking-widest",
                                                            children: "Our Solution"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "text-white font-bold text-sm",
                                                            children: "Aerospace-grade alloys built for a lifetime."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 201,
                                                            columnNumber: 37
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 194,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 191,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68d575acca7c0ce0" + " " + "flex-1 shrink-0 scale-110 lg:rotate-6 relative w-full aspect-video lg:aspect-square",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
                                        fill: true,
                                        sizes: "(max-width: 1024px) 100vw, 50vw",
                                        className: "rounded-[3rem] shadow-2xl object-cover",
                                        alt: "Lifestyle Tech"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/HomeClient.tsx",
                                        lineNumber: 206,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 205,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/HomeClient.tsx",
                            lineNumber: 189,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/HomeClient.tsx",
                        lineNumber: 188,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-68d575acca7c0ce0" + " " + "max-w-7xl mx-auto px-4 md:px-12 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "jsx-68d575acca7c0ce0" + " " + "text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-24",
                                children: "The AJ Experience"
                            }, void 0, false, {
                                fileName: "[project]/src/app/HomeClient.tsx",
                                lineNumber: 219,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-68d575acca7c0ce0" + " " + "grid grid-cols-1 md:grid-cols-3 gap-20 relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68d575acca7c0ce0" + " " + "hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-gray-100"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/HomeClient.tsx",
                                        lineNumber: 221,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    [
                                        {
                                            step: '01',
                                            title: 'Curated Selection',
                                            desc: 'Browse our laboratory-tested tech drops.',
                                            icon: '🛒'
                                        },
                                        {
                                            step: '02',
                                            title: 'Secured Payment',
                                            desc: 'End-to-end encryption for every transaction.',
                                            icon: '🔐'
                                        },
                                        {
                                            step: '03',
                                            title: 'Priority Dispatch',
                                            desc: 'Real-time tracking to your doorstep.',
                                            icon: '✈️'
                                        }
                                    ].map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "relative z-10 flex flex-col items-center group",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "w-24 h-24 bg-white border-4 border-[#f3f9f6] rounded-full flex items-center justify-center text-4xl shadow-xl mb-8 group-hover:scale-110 group-hover:shadow-[#005d32]/10 transition-all duration-500",
                                                    children: item.icon
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-[10px] font-black text-[#005d32] uppercase tracking-[0.4em] mb-2",
                                                    children: [
                                                        "Step ",
                                                        item.step
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-lg font-black uppercase text-gray-900 mb-4",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-gray-400 font-medium max-w-[200px] text-sm",
                                                    children: item.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 227,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/HomeClient.tsx",
                                lineNumber: 220,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/HomeClient.tsx",
                        lineNumber: 218,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-68d575acca7c0ce0" + " " + "bg-gray-50 py-32 overflow-hidden relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68d575acca7c0ce0" + " " + "max-w-7xl mx-auto px-4 md:px-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68d575acca7c0ce0" + " " + "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase",
                                                    children: "AJ Community"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em]",
                                                    children: "Real Stories from Real Owners"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 243,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "flex gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        if (window.innerWidth < 768) {
                                                            setActiveReview((prev)=>prev === 0 ? communityImages.length - 1 : prev - 1);
                                                        } else {
                                                            scrollReviews('left');
                                                        }
                                                    },
                                                    className: "jsx-68d575acca7c0ce0" + " " + "flex w-14 h-14 rounded-full border border-gray-200 items-center justify-center bg-white hover:bg-[#005d32] hover:text-white hover:border-[#005d32] transition-all shadow-sm active:scale-90",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        className: "jsx-68d575acca7c0ce0" + " " + "w-6 h-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: "2",
                                                            d: "M15 19l-7-7 7-7",
                                                            className: "jsx-68d575acca7c0ce0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 258,
                                                            columnNumber: 116
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        if (window.innerWidth < 768) {
                                                            setActiveReview((prev)=>prev === communityImages.length - 1 ? 0 : prev + 1);
                                                        } else {
                                                            scrollReviews('right');
                                                        }
                                                    },
                                                    className: "jsx-68d575acca7c0ce0" + " " + "flex w-14 h-14 rounded-full border border-gray-200 items-center justify-center bg-white hover:bg-[#005d32] hover:text-white hover:border-[#005d32] transition-all shadow-sm active:scale-90",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        className: "jsx-68d575acca7c0ce0" + " " + "w-6 h-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: "2",
                                                            d: "M9 5l7 7-7 7",
                                                            className: "jsx-68d575acca7c0ce0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 270,
                                                            columnNumber: 116
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 247,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 242,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: reviewsRef,
                                    className: "jsx-68d575acca7c0ce0" + " " + "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "md:hidden",
                                            children: [
                                                communityImages.map((imgId, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-68d575acca7c0ce0" + " " + `w-full bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6 border border-white transition-all duration-500 ${activeReview === i ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-68d575acca7c0ce0" + " " + "flex items-center gap-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-68d575acca7c0ce0" + " " + "relative w-14 h-14 rounded-full border-2 border-[#f3f9f6] overflow-hidden",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            src: `https://i.pravatar.cc/100?u=rev${i}`,
                                                                            fill: true,
                                                                            sizes: "64px",
                                                                            className: "object-cover",
                                                                            alt: "Customer"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                                            lineNumber: 289,
                                                                            columnNumber: 49
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                                        lineNumber: 288,
                                                                        columnNumber: 45
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-68d575acca7c0ce0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "jsx-68d575acca7c0ce0" + " " + "font-black text-gray-900 text-base",
                                                                                children: [
                                                                                    "Owner #",
                                                                                    i + 1042
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                                                lineNumber: 298,
                                                                                columnNumber: 49
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "jsx-68d575acca7c0ce0" + " " + "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "jsx-68d575acca7c0ce0" + " " + "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                                                        lineNumber: 300,
                                                                                        columnNumber: 53
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "jsx-68d575acca7c0ce0" + " " + "text-[9px] font-black text-gray-400 uppercase tracking-widest",
                                                                                        children: "Verified Tech Critic"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                                                        lineNumber: 301,
                                                                                        columnNumber: 53
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                                                lineNumber: 299,
                                                                                columnNumber: 49
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                                        lineNumber: 297,
                                                                        columnNumber: 45
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-68d575acca7c0ce0" + " " + "flex text-yellow-400 gap-1.5 text-sm",
                                                                children: [
                                                                    ...Array(5)
                                                                ].map((_, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-68d575acca7c0ce0",
                                                                        children: "★"
                                                                    }, j, false, {
                                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                                        lineNumber: 306,
                                                                        columnNumber: 74
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                                lineNumber: 305,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "jsx-68d575acca7c0ce0" + " " + "text-gray-500 font-medium leading-relaxed italic text-base",
                                                                children: [
                                                                    '"',
                                                                    i % 2 === 0 ? 'Exceeded every expectation. The noise cancellation is ethereal.' : 'The minimalist design fits my setup perfectly. Best investment in audio I have made.',
                                                                    '"'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                                lineNumber: 308,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-68d575acca7c0ce0" + " " + "w-full h-48 bg-gray-100 rounded-[1.5rem] overflow-hidden group/img relative",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    src: `https://images.unsplash.com/photo-${imgId}?q=80&w=600&auto=format&fit=crop`,
                                                                    fill: true,
                                                                    sizes: "100vw",
                                                                    className: "object-cover transition-transform duration-700 group-hover/img:scale-110",
                                                                    alt: "UGC"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                                    lineNumber: 312,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                                lineNumber: 311,
                                                                columnNumber: 41
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "flex justify-center gap-2 mt-8",
                                                    children: communityImages.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + `h-1.5 rounded-full transition-all duration-300 ${activeReview === i ? 'w-8 bg-[#005d32]' : 'w-2 bg-gray-200'}`
                                                        }, i, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 322,
                                                    columnNumber: 33
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 281,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-68d575acca7c0ce0" + " " + "hidden md:flex gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-10",
                                            children: communityImages.map((imgId, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-68d575acca7c0ce0" + " " + "min-w-[420px] bg-white p-10 rounded-[3rem] shadow-sm space-y-8 shrink-0 border border-white snap-center hover:shadow-2xl hover:shadow-[#005d32]/5 transition-all duration-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "flex items-center gap-5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-68d575acca7c0ce0" + " " + "relative w-16 h-16 rounded-full border-2 border-[#f3f9f6] overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        src: `https://i.pravatar.cc/100?u=rev${i}`,
                                                                        fill: true,
                                                                        sizes: "64px",
                                                                        className: "object-cover",
                                                                        alt: "Customer"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                                        lineNumber: 341,
                                                                        columnNumber: 49
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                                    lineNumber: 340,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-68d575acca7c0ce0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "jsx-68d575acca7c0ce0" + " " + "font-black text-gray-900 text-lg",
                                                                            children: [
                                                                                "Owner #",
                                                                                i + 1042
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                                            lineNumber: 350,
                                                                            columnNumber: 49
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-68d575acca7c0ce0" + " " + "flex items-center gap-2",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "jsx-68d575acca7c0ce0" + " " + "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                                                    lineNumber: 352,
                                                                                    columnNumber: 53
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "jsx-68d575acca7c0ce0" + " " + "text-[9px] font-black text-gray-400 uppercase tracking-widest",
                                                                                    children: "Verified Tech Critic"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                                                    lineNumber: 353,
                                                                                    columnNumber: 53
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                                            lineNumber: 351,
                                                                            columnNumber: 49
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                                    lineNumber: 349,
                                                                    columnNumber: 45
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 339,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "flex text-yellow-400 gap-1.5 text-sm",
                                                            children: [
                                                                ...Array(5)
                                                            ].map((_, j)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "jsx-68d575acca7c0ce0",
                                                                    children: "★"
                                                                }, j, false, {
                                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                                    lineNumber: 358,
                                                                    columnNumber: 74
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "text-gray-500 font-medium leading-relaxed italic text-lg",
                                                            children: [
                                                                '"',
                                                                i % 2 === 0 ? 'Exceeded every expectation. The noise cancellation is ethereal.' : 'The minimalist design fits my setup perfectly. Best investment in audio I have made.',
                                                                '"'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 360,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-68d575acca7c0ce0" + " " + "w-full h-56 bg-gray-100 rounded-[2rem] overflow-hidden group/img relative",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                src: `https://images.unsplash.com/photo-${imgId}?q=80&w=600&auto=format&fit=crop`,
                                                                fill: true,
                                                                sizes: "(max-width: 1200px) 50vw, 33vw",
                                                                className: "object-cover transition-transform duration-700 group-hover/img:scale-110",
                                                                alt: "UGC"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                                lineNumber: 364,
                                                                columnNumber: 45
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/HomeClient.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, i, true, {
                                                    fileName: "[project]/src/app/HomeClient.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/HomeClient.tsx",
                                            lineNumber: 333,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 276,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/HomeClient.tsx",
                            lineNumber: 241,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/HomeClient.tsx",
                        lineNumber: 240,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "jsx-68d575acca7c0ce0" + " " + "max-w-7xl mx-auto px-4 md:px-12 pb-20 md:pb-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-68d575acca7c0ce0" + " " + "bg-gray-900 rounded-[4rem] p-12 md:p-32 relative overflow-hidden text-center lg:text-left mb-20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68d575acca7c0ce0" + " " + "absolute top-0 right-0 w-[800px] h-[800px] bg-[#005d32] opacity-20 blur-[180px] pointer-events-none smooth-transform"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 383,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-68d575acca7c0ce0" + " " + "flex-col lg:flex-row items-center gap-20 relative z-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-68d575acca7c0ce0" + " " + "flex-1 space-y-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "jsx-68d575acca7c0ce0" + " " + "text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[1] max-w-xl",
                                                children: [
                                                    "The Future ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                        className: "jsx-68d575acca7c0ce0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 151
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Is ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-68d575acca7c0ce0" + " " + "text-[#005d32]",
                                                        children: "Acoustic."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 161
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                lineNumber: 386,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-68d575acca7c0ce0" + " " + "text-gray-400 text-xl font-medium max-w-2xl leading-relaxed",
                                                children: "Experience sound without boundaries. Join our inner circle for priority access to the next generation of tech."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                lineNumber: 387,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-68d575acca7c0ce0" + " " + "flex flex-col sm:flex-row gap-6 max-w-lg",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        placeholder: "Drop your email here",
                                                        className: "jsx-68d575acca7c0ce0" + " " + "flex-1 bg-white/5 border border-white/10 rounded-full px-10 py-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#005d32] transition-all font-medium"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                        lineNumber: 389,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "jsx-68d575acca7c0ce0" + " " + "bg-[#005d32] text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-emerald-500 transition-all shadow-2xl shadow-[#005d32]/40 active:scale-95 btn-haptic",
                                                        children: "Get Notified"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/HomeClient.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/HomeClient.tsx",
                                                lineNumber: 388,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/HomeClient.tsx",
                                        lineNumber: 385,
                                        columnNumber: 29
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/HomeClient.tsx",
                                    lineNumber: 384,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/HomeClient.tsx",
                            lineNumber: 382,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/app/HomeClient.tsx",
                        lineNumber: 381,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/HomeClient.tsx",
                lineNumber: 147,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/HomeClient.tsx",
        lineNumber: 74,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(HomeClient, "2Dljp9BUeN86Gunwpn1LrYIzpm8=");
_c = HomeClient;
const __TURBOPACK__default__export__ = HomeClient;
var _c;
__turbopack_context__.k.register(_c, "HomeClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_be612b52._.js.map