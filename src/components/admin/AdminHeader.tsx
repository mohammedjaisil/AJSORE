'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import NotificationCenter from './NotificationCenter';
import Link from 'next/link';

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
);

const StoreIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

export default function AdminHeader() {
    const { user } = useCartStore();
    const [searchFocused, setSearchFocused] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const handleSearch = async (val: string) => {
        setQuery(val);
        if (val.length > 1) {
            const { liveSearch } = await import('@/actions/search');
            const results = await liveSearch(val);
            setSuggestions(results);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-50">
            {/* Search Section */}
            <div className="flex-1 max-w-2xl relative" onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setSuggestions([]);
                }
            }}>
                <div className={`flex items-center gap-4 px-6 py-4 rounded-3xl border transition-all duration-300 ${
                    searchFocused
                        ? 'border-black bg-white shadow-xl shadow-black/5'
                        : 'border-transparent bg-[#F9F9F9]'
                }`}>
                    <span className="text-text-muted shrink-0"><SearchIcon /></span>
                    <input
                        type="text"
                        placeholder="Search assets, orders, clients..."
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-text-main placeholder-text-muted outline-none flex-1 min-w-0"
                    />
                    <kbd className={`hidden sm:flex items-center gap-1 px-2 py-1 text-[9px] font-bold text-text-muted border border-gray-200 rounded-lg transition-opacity ${searchFocused ? 'opacity-0' : 'opacity-100'}`}>
                        ⌘ K
                    </kbd>
                </div>

                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-4xl border border-gray-100 shadow-2xl z-50 overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <p className="px-6 py-2 text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Quick Results</p>
                        {suggestions.map((p: any) => (
                            <Link 
                                key={p.id} 
                                href={`/admin/products/${p.id}`}
                                className="flex items-center gap-4 px-6 py-3 hover:bg-[#F9F9F9] transition-colors group"
                                onClick={() => setSuggestions([])}
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#F9F9F9] border border-gray-50 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                                    <img src={p.image} className="w-full h-full object-contain p-1" alt="" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-bold text-text-main truncate uppercase tracking-tight">{p.name}</p>
                                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{p.sku || p.category_name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-8 ml-8">
                <Link
                    href="/"
                    target="_blank"
                    className="hidden md:flex items-center gap-2 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-text-main hover:bg-[#F9F9F9] rounded-full border border-gray-100 transition-all shadow-sm active:scale-95"
                >
                    <StoreIcon />
                    <span>View Store</span>
                </Link>

                <div className="flex items-center gap-6">
                    <NotificationCenter />
                    <div className="h-10 w-[1px] bg-gray-100" />
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="text-right hidden lg:block">
                            <p className="text-[11px] font-bold text-text-main leading-tight uppercase tracking-tight">{user?.name || 'Admin'}</p>
                            <p className="text-[9px] font-bold text-accent-sage uppercase tracking-widest mt-0.5">Administrator</p>
                        </div>
                        <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-gray-50 bg-[#F9F9F9] shrink-0 group-hover:border-black transition-all shadow-sm">
                            <img
                                src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=000&color=fff&bold=true`}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
