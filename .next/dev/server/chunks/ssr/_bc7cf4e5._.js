module.exports = [
"[project]/src/lib/supabase.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase,
    "supabaseAdmin",
    ()=>supabaseAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://pgagzknsmwdskadmcgqy.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnYWd6a25zbXdkc2thZG1jZ3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNjc2MTQsImV4cCI6MjA4NTk0MzYxNH0.zFYhdd3TzNwpN-AB9T_rAQYwmz4RQSbmaI57uMLGI74");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
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
"[project]/src/actions/products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"005efbd4a355c3930d258a0589e15b8db48c319427":"getProducts","40ca9262ea71b66aca1d8f14ab98d383e0d0831f8f":"getProductById"},"",""] */ __turbopack_context__.s([
    "getProductById",
    ()=>getProductById,
    "getProducts",
    ()=>getProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
function mapProduct(item) {
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: Number(item.price),
        oldPrice: item.old_price ? Number(item.old_price) : undefined,
        stock: item.stock,
        image: item.image,
        secondaryImage: item.secondary_image,
        category: item.category_name,
        rating: Number(item.rating),
        reviews: item.reviews_count,
        features: item.features,
        colors: item.colors,
        isFeatured: item.is_featured
    };
}
async function getProducts() {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*');
        if (error) throw error;
        if (!data || data.length === 0) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"];
        return data.map(mapProduct);
    } catch (error) {
        console.warn('Database fetch failed, falling back to constants:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"];
    }
}
async function getProductById(id) {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').eq('id', id).single();
        if (error) {
            // If UUID is invalid (e.g. dummy ID '1'), Supabase throws invalid input syntax for uuid usually.
            // Or just returns error. We fallback.
            throw error;
        }
        if (!data) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"].find((p)=>p.id.toString() === id.toString());
        return mapProduct(data);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCTS"].find((p)=>p.id.toString() === id.toString());
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getProducts,
    getProductById
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProducts, "005efbd4a355c3930d258a0589e15b8db48c319427", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProductById, "40ca9262ea71b66aca1d8f14ab98d383e0d0831f8f", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/products.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/products.ts [app-rsc] (ecmascript)");
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/products.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "005efbd4a355c3930d258a0589e15b8db48c319427",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProducts"],
    "40ca9262ea71b66aca1d8f14ab98d383e0d0831f8f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductById"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/products.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/products.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_bc7cf4e5._.js.map