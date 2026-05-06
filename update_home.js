const fs = require('fs');
let code = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

code = code.replace(
    /const \[isLoaded, setIsLoaded\] = useState\(false\);([\s\S]*?)const handleMouseLeave = \(\) => {\s*setTilt\(\{ x: 0, y: 0 \}\);\s*};/,
    "const reviewsRef = useRef<HTMLDivElement>(null);\n    const [activeTab, setActiveTab] = useState('Featured');\n    const categories = ['Featured', ...Array.from(new Set(featuredProducts.map(p => p.category)))];\n    const filteredProducts = activeTab === 'Featured' ? featuredProducts.slice(0, 4) : featuredProducts.filter(p => p.category === activeTab);"
);

code = code.replace(
    /\{\/\* 1\. HERO SECTION \*\/\}[\s\S]*?\{\/\* 3\. TOP STATS \/ TRUST BAR \*\/\}/,
    {/* 1. HERO SECTION (Redesigned) */}
            <section className="px-4 md:px-12 pt-6 sm:pt-8 max-w-7xl mx-auto">
                {/* Hero Banner Card */}
                <div className="bg-[#363636] rounded-3xl relative p-6 sm:p-10 min-h-[220px] sm:min-h-[300px] flex items-center shadow-xl mb-6 sm:mb-8 border border-white/5 overflow-visible">
                    <div className="relative z-10 w-2/3 lg:w-1/2 space-y-3 sm:space-y-4">
                        <div className="inline-flex bg-white/10 text-white/90 px-3 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                            New Arrivals
                        </div>
                        <h1 className="text-white text-3xl sm:text-5xl font-black leading-tight tracking-tight">
                            {featuredProducts[0]?.name || 'Sony WH-1000XM4'}
                        </h1>
                        <p className="text-white/60 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] max-w-[150px] sm:max-w-none">
                            Only Music. Nothing Else.
                        </p>
                        <Link href={featuredProducts[0] ? \\\/product/\\\\\\ : '/shop'} className="inline-flex items-center gap-2 bg-[#f05a3c] hover:bg-[#e04a2c] text-white px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all mt-3 shadow-lg shadow-[#f05a3c]/30">
                            Shop Now
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                    
                    {/* Overflowing Image */}
                    {featuredProducts[0] && (
                        <div className="absolute right-[-20px] sm:right-[-30px] top-[40%] sm:top-1/2 -translate-y-1/2 w-[180px] h-[180px] sm:w-[350px] sm:h-[350px] sm:scale-125 z-20 pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                            <Image
                                src={featuredProducts[0].image}
                                alt={featuredProducts[0].name}
                                fill
                                priority
                                className="object-contain"
                            />
                        </div>
                    )}
                </div>

                {/* Brands Row */}
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x">
                    {['SONI', 'camsung', 'BOSKU', 'TOSCUY'].map((brand, idx) => (
                        <div key={brand} className="bg-white rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-gray-100 min-w-[100px] sm:min-w-[140px] h-[60px] sm:h-[80px] flex items-center justify-center shrink-0 px-4 snap-center hover:bg-gray-50 transition-colors cursor-pointer">
                            <span className={\\\ont-black tracking-tighter text-slate-800 \\\\\\}>{brand}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div className="space-y-12 sm:space-y-20 mt-6 sm:mt-12">
                {/* 2. CATEGORY TABS & FILTERED PRODUCTS */}
                <section className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="flex gap-6 sm:gap-8 overflow-x-auto hide-scrollbar border-b border-gray-100 pb-0 shrink-0 select-none snap-x">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={\\\whitespace-nowrap pb-3 sm:pb-4 text-sm sm:text-base font-bold transition-all relative snap-start \\\\\\}
                            >
                                {cat}
                                {activeTab === cat && (
                                    <div className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-[#f05a3c] rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8 mt-6 sm:mt-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="col-span-full py-12 text-center text-gray-500 font-medium">
                                No products found in this category.
                            </div>
                        )}
                    </div>
                </section>

                {/* 3. TOP STATS / TRUST BAR */}

);

fs.writeFileSync('src/app/HomeClient.tsx', code);
