'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES } from '@/lib/constants';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/lib/toast-store';
import ProductCard from '@/components/ProductCard';

const SearchPage: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQ = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQ);
    const [inputVal, setInputVal] = useState(initialQ);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCat, setSelectedCat] = useState('All');
    const [sort, setSort] = useState('relevance');
    const [minRating, setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000);
    const inputRef = useRef<HTMLInputElement>(null);
    const { addToCart } = useCartStore();
    const { addToast } = useToast();

    useEffect(() => {
        if (initialQ) setQuery(initialQ);
    }, [initialQ]);

    // Autocomplete suggestions
    const suggestions = useMemo(() => {
        if (!inputVal || inputVal.length < 2) return [];
        const q = inputVal.toLowerCase();
        return PRODUCTS
            .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
            .slice(0, 6);
    }, [inputVal]);

    // Filtered results
    const results = useMemo(() => {
        if (!query) return [];
        const q = query.toLowerCase();
        let r = PRODUCTS.filter(p => {
            const match = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || (p.features || []).some(f => f.toLowerCase().includes(q));
            const catMatch = selectedCat === 'All' || p.category === selectedCat;
            const priceMatch = p.price <= maxPrice;
            const ratingMatch = p.rating >= minRating;
            return match && catMatch && priceMatch && ratingMatch;
        });

        if (sort === 'price-low') r = r.sort((a, b) => a.price - b.price);
        else if (sort === 'price-high') r = r.sort((a, b) => b.price - a.price);
        else if (sort === 'rating') r = r.sort((a, b) => b.rating - a.rating);
        else r = r.sort((a, b) => {
            const aScore = (a.name.toLowerCase().includes(q) ? 10 : 0) + (a.category.toLowerCase().includes(q) ? 5 : 0);
            const bScore = (b.name.toLowerCase().includes(q) ? 10 : 0) + (b.category.toLowerCase().includes(q) ? 5 : 0);
            return bScore - aScore;
        });
        return r;
    }, [query, selectedCat, maxPrice, minRating, sort]);

    const handleSearch = (val: string = inputVal) => {
        setQuery(val);
        setInputVal(val);
        setShowSuggestions(false);
        router.push(`/search?q=${encodeURIComponent(val)}`, { scroll: false });
    };

    const popularSearches = ['Earbuds', 'Laptop', 'Gaming Mouse', 'Wireless', 'Smartwatch', 'Headphones'];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 sm:py-16 space-y-10">

            {/* Search Bar Hero */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <div>
                    <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Search</p>
                    <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tighter">Find Your Next Favorite</h1>
                </div>

                {/* Search Input */}
                <div className="relative">
                    <div className="flex items-center bg-white border-2 border-gray-200 rounded-[2rem] px-5 sm:px-7 py-4 shadow-xl shadow-gray-900/5 focus-within:border-primary transition-all gap-3">
                        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputVal}
                            autoFocus
                            onChange={e => { setInputVal(e.target.value); setShowSuggestions(true); }}
                            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); if (e.key === 'Escape') setShowSuggestions(false); }}
                            placeholder="Search products, categories..."
                            className="flex-1 bg-transparent text-slate-900 font-medium text-base focus:outline-none placeholder:text-gray-300"
                        />
                        {inputVal && (
                            <button onClick={() => { setInputVal(''); setQuery(''); inputRef.current?.focus(); }} className="text-gray-300 hover:text-gray-600 transition-colors text-xl font-light shrink-0">✕</button>
                        )}
                        <button
                            onClick={() => handleSearch()}
                            className="bg-primary text-white px-5 sm:px-7 py-2.5 rounded-[1.5rem] font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-900 transition-all shadow-lg shadow-primary/20 active:scale-95 shrink-0"
                        >
                            Search
                        </button>
                    </div>

                    {/* Autocomplete Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-[2rem] shadow-2xl shadow-gray-900/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                            {suggestions.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => handleSearch(product.name)}
                                    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-all group text-left border-b border-gray-50 last:border-0"
                                >
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center relative shrink-0 border border-gray-100">
                                        <Image src={product.image} alt={product.name} fill className="object-contain mix-blend-multiply p-1" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-slate-900 group-hover:text-slate-900 transition-colors truncate">{product.name}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{product.category}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-200 group-hover:text-slate-900 transition-colors shrink-0 rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Popular Searches */}
                {!query && (
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Popular:</p>
                        {popularSearches.map(term => (
                            <button
                                key={term}
                                onClick={() => handleSearch(term)}
                                className="bg-gray-50 border border-gray-100 text-gray-600 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all"
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Section */}
            {query && (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full lg:w-56 shrink-0 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-6 space-y-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-tight">Filters</h3>
                                <button onClick={() => { setSelectedCat('All'); setMinRating(0); setMaxPrice(200000); }} className="text-[9px] font-bold text-slate-900 uppercase hover:underline tracking-widest">Reset</button>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</p>
                                <div className="space-y-1">
                                    {['All', ...CATEGORIES.map(c => c.name)].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCat(cat)}
                                            className={`w-full text-left py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedCat === cat ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Max Price (₹{maxPrice.toLocaleString()})</p>
                                <input type="range" className="w-full accent-black" min="0" max="200000" step="1000" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} />
                            </div>

                            {/* Rating */}
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Min Rating</p>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <button key={s} onClick={() => setMinRating(s === minRating ? 0 : s)} className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold border transition-all ${minRating >= s ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}>{s}★</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results */}
                    <main className="flex-1 space-y-6">
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <p className="text-sm font-bold text-slate-900">
                                {results.length} results for <span className="text-slate-900">&quot;{query}&quot;</span>
                            </p>
                            <select value={sort} onChange={e => setSort(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/20 shadow-sm">
                                <option value="relevance">Most Relevant</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>

                        {results.length > 0 ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {results.map(p => <ProductCard key={p.id} product={p} />)}
                            </div>
                        ) : (
                            <div className="text-center py-28 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-5">
                                <div className="text-5xl">🔍</div>
                                <h3 className="font-bold text-gray-700 text-lg">No results found</h3>
                                <p className="text-gray-400 font-medium text-sm max-w-xs mx-auto">Try a different keyword or browse our categories below.</p>
                                <div className="flex flex-wrap gap-3 justify-center pt-2">
                                    {CATEGORIES.map(cat => (
                                        <Link key={cat.name} href={`/shop?cat=${cat.name}`} className="bg-white border border-gray-200 text-gray-600 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white hover:border-primary transition-all">
                                            {cat.icon} {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            )}

            {/* No query state: show categories */}
            {!query && (
                <div className="space-y-10 pt-4">
                    <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Browse Categories</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => handleSearch(cat.name)}
                                className="group p-8 rounded-[2.5rem] text-left transition-all hover:shadow-xl duration-700"
                                style={{ backgroundColor: (cat as any).bgColor || '#f5f5f5' }}
                            >
                                <span className="text-5xl block mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700">{cat.icon}</span>
                                <h3 className="font-bold text-slate-900 text-lg tracking-tight">{cat.name}</h3>
                                <p className="text-slate-900 text-[10px] font-bold uppercase tracking-widest mt-1">{cat.count}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
