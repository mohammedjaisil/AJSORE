module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/constants.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOG_POSTS",
    ()=>BLOG_POSTS,
    "CATEGORIES",
    ()=>CATEGORIES,
    "CURRENCIES",
    ()=>CURRENCIES,
    "PRODUCTS",
    ()=>PRODUCTS,
    "THEME_COLOR",
    ()=>THEME_COLOR
]);
const THEME_COLOR = {
    primary: '#005d32',
    primaryHover: '#004a28',
    secondary: '#f3f9f6'
};
const CURRENCIES = [
    {
        code: 'USD',
        symbol: '$',
        rate: 1,
        flag: '🇺🇸',
        name: 'United States'
    },
    {
        code: 'EUR',
        symbol: '€',
        rate: 0.92,
        flag: '🇪🇺',
        name: 'European Union'
    },
    {
        code: 'GBP',
        symbol: '£',
        rate: 0.79,
        flag: '🇬🇧',
        name: 'United Kingdom'
    },
    {
        code: 'INR',
        symbol: '₹',
        rate: 83.50,
        flag: '🇮🇳',
        name: 'India'
    },
    {
        code: 'JPY',
        symbol: '¥',
        rate: 150.25,
        flag: '🇯🇵',
        name: 'Japan'
    },
    {
        code: 'AED',
        symbol: 'د.إ',
        rate: 3.67,
        flag: '🇦🇪',
        name: 'United Arab Emirates'
    }
];
const PRODUCTS = [
    {
        id: '1',
        name: 'Zenith Pro ANC Earbuds',
        description: 'Ultra-clear audio with hybrid active noise cancellation and 40-hour battery life.',
        price: 129.00,
        oldPrice: 199.00,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop',
        category: 'Headphone',
        rating: 4.9,
        reviews: 1240,
        features: [
            'Active Noise Cancellation',
            'IPX8 Waterproof',
            '40h Battery',
            'Touch Control'
        ]
    },
    {
        id: '2',
        name: 'Titanium X Laptop Pro',
        description: 'Thin, light, and powerful. Designed for creators who demand performance anywhere.',
        price: 1299.00,
        oldPrice: 1499.00,
        stock: 5,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop',
        category: 'Laptop',
        rating: 5.0,
        reviews: 89,
        features: [
            'Retina Display',
            '16GB RAM',
            '1TB SSD',
            'M2 Optimized'
        ]
    },
    {
        id: '3',
        name: 'Emerald HomePod Mini',
        description: 'Fill the room with 360-degree audio and control your entire smart home with Siri.',
        price: 99.00,
        stock: 45,
        image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1000&auto=format&fit=crop',
        category: 'Gadget',
        rating: 4.7,
        reviews: 562,
        features: [
            '360-Degree Sound',
            'Siri Integrated',
            'HomeKit Ready'
        ]
    },
    {
        id: '4',
        name: 'AJ Wireless Mechanical Keyboard',
        description: 'Satisfying tactile feedback with low-latency 2.4GHz wireless connection.',
        price: 89.00,
        oldPrice: 110.00,
        stock: 18,
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop',
        category: 'Gadget',
        rating: 4.8,
        reviews: 210,
        features: [
            'RGB Lighting',
            'Hotswappable',
            'Long Battery Life'
        ]
    },
    {
        id: '5',
        name: 'Acoustic Over-Ear 2.0',
        description: 'Premium leather finish with high-fidelity sound and deep bass response.',
        price: 249.00,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
        category: 'Headphone',
        rating: 4.6,
        reviews: 95,
        features: [
            'Hi-Res Audio',
            'Wired/Wireless',
            'Foldable'
        ]
    },
    {
        id: '6',
        name: 'Smart Vision Glasses',
        description: 'Next-gen AR experience in a familiar form factor. Stay connected effortlessly.',
        price: 399.00,
        oldPrice: 599.00,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
        category: 'Gadget',
        rating: 4.2,
        reviews: 45,
        features: [
            'AR HUD',
            'Bluetooth Calls',
            'Photo Capture'
        ]
    },
    {
        id: '7',
        name: 'Carbon Fiber Tablet',
        description: 'Lightest tablet in its class with a stunning OLED display for pure immersion.',
        price: 699.00,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop',
        category: 'Gadget',
        rating: 4.9,
        reviews: 231,
        features: [
            'OLED Screen',
            'Stylus Support',
            'Fast Charging'
        ]
    },
    {
        id: '8',
        name: 'Nexus Gaming Mouse',
        description: 'Zero lag, ultra-lightweight design for competitive precision.',
        price: 65.00,
        oldPrice: 85.00,
        stock: 32,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop',
        category: 'Gadget',
        rating: 4.8,
        reviews: 780,
        features: [
            '25K DPI Sensor',
            '6 Buttons',
            'Featherlight'
        ]
    },
    {
        id: '9',
        name: 'Aura Studio Speaker',
        description: 'Ethereal design meets floor-shaking bass. The centerpiece of any room.',
        price: 320.00,
        stock: 4,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop',
        category: 'Gadget',
        rating: 5.0,
        reviews: 12,
        features: [
            '3D Audio',
            'Bluetooth 5.2',
            'Ambient Light'
        ]
    },
    {
        id: '10',
        name: 'Pulse Fitness Band',
        description: 'Track your vitals with medical-grade precision in a sleek wrist-worn device.',
        price: 49.00,
        oldPrice: 79.00,
        stock: 150,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1000&auto=format&fit=crop',
        category: 'Gadget',
        rating: 4.5,
        reviews: 3200,
        features: [
            'Heart Rate',
            'Sleep Tracking',
            'Waterproof'
        ]
    }
];
const CATEGORIES = [
    {
        name: 'Headphone',
        count: '2 Item Available',
        icon: '🎧',
        bgColor: '#dcf0ea'
    },
    {
        name: 'Laptop',
        count: '1 Item Available',
        icon: '💻',
        bgColor: '#e3f2fd'
    },
    {
        name: 'Gadget',
        count: '7 Item Available',
        icon: '🔋',
        bgColor: '#f3e5f5'
    }
];
const BLOG_POSTS = [
    {
        id: '1',
        title: 'How to Choose the Right Headphones',
        excerpt: 'Finding the perfect pair of headphones can be overwhelming. Here is our guide to help you decide.',
        date: 'Oct 24, 2023',
        image: 'https://picsum.photos/seed/blog1/800/400'
    },
    {
        id: '2',
        title: 'Top 5 Tech Gadgets for 2024',
        excerpt: 'The future is here! Check out these must-have gadgets that will revolutionize your daily routine.',
        date: 'Nov 12, 2023',
        image: 'https://picsum.photos/seed/blog2/800/400'
    }
];
}),
"[project]/src/app/blog/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-rsc] (ecmascript)");
;
;
function BlogPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-4 py-20 space-y-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-5xl font-black text-[#005d32] uppercase tracking-tighter",
                        children: "AJ Journal"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 8,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-400 font-bold uppercase text-[10px] tracking-widest",
                        children: "Insights from our tech laboratory"
                    }, void 0, false, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 9,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 7,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-12",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BLOG_POSTS"].map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "group cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "aspect-video bg-gray-100 rounded-[3rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: post.image,
                                    alt: post.title,
                                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 15,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 14,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[#005d32] font-black uppercase text-[10px] tracking-widest mb-2",
                                children: post.date
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 17,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-black text-gray-900 group-hover:text-[#005d32] transition-colors mb-4",
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 18,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 font-medium leading-relaxed line-clamp-2",
                                children: post.excerpt
                            }, void 0, false, {
                                fileName: "[project]/src/app/blog/page.tsx",
                                lineNumber: 19,
                                columnNumber: 25
                            }, this)
                        ]
                    }, post.id, true, {
                        fileName: "[project]/src/app/blog/page.tsx",
                        lineNumber: 13,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 11,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/blog/page.tsx",
        lineNumber: 6,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/app/blog/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/blog/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__cc7a34e5._.js.map