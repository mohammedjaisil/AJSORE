'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';

import { PRODUCTS, CURRENCIES } from '@/lib/constants';
import { Product, Currency } from '@/types';

const Navbar: React.FC = () => {
    const { cart, setIsMiniCartOpen, currency, setCurrency } = useCartStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchRef = useRef<HTMLDivElement>(null);
    const currencyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) setRecentSearches(JSON.parse(saved));

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
            if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
                setIsCurrencyOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery.length > 1) {
                const filtered = PRODUCTS.filter(p =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 5);
                setSuggestions(filtered);
            } else {
                setSuggestions([]);
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);


    const handleSearch = (e: React.FormEvent, term?: string) => {
        e.preventDefault();
        const query = term || searchQuery;
        if (query.trim()) {
            const updatedRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
            setRecentSearches(updatedRecent);
            localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
            setShowSuggestions(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const handleCurrencyChange = (c: Currency) => {
        setCurrency(c);
        setIsCurrencyOpen(false);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500">
            {/* Top Info Bar (Emerald - Shrinks on scroll) */}
            <div className={`bg-[#005d32] text-white px-4 md:px-12 flex justify-between items-center text-[10px] md:text-xs font-medium tracking-wide relative z-[60] transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-10 opacity-100'}`}>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        +00 123 456 789
                    </span>
                    <span className="hidden sm:block">Concierge Support Available</span>
                </div>
                <div className="flex gap-6 items-center h-full">
                    <span className="hidden lg:inline opacity-90 animate-pulse uppercase">Flash Sale: 25% Off Storewide</span>
                    <span className="opacity-80">FREE GLOBAL SHIPPING ON ALL ORDERS</span>
                </div>
            </div>

            {/* Main Nav Bar (Always visible) */}
            <nav className={`bg-white/95 backdrop-blur-xl transition-all duration-500 py-3 md:py-4 z-50 ${isScrolled ? 'shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b border-gray-100' : 'border-b border-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between gap-4 md:gap-8">
                    <Link href="/" className="flex items-center gap-2 group shrink-0 btn-haptic">
                        <div className="bg-[#005d32] p-2 rounded-xl text-white group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[#005d32]/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <span className="text-xl md:text-2xl font-black text-[#005d32] tracking-tighter">AJ STORE</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8 font-black text-gray-500 text-[11px] uppercase tracking-widest">
                        <Link href="/shop" className={`transition-all hover:text-[#005d32] relative py-1 ${isActive('/shop') ? 'text-[#005d32]' : ''}`}>Shop</Link>
                        <Link href="/categories" className={`transition-all hover:text-[#005d32] relative py-1 ${isActive('/categories') ? 'text-[#005d32]' : ''}`}>Collections</Link>
                        <Link href="/deals" className={`transition-all hover:text-[#005d32] relative py-1 ${isActive('/deals') ? 'text-[#005d32]' : ''}`}>Deals</Link>
                        <Link href="/blog" className={`transition-all hover:text-[#005d32] relative py-1 ${isActive('/blog') ? 'text-[#005d32]' : ''}`}>Blog</Link>
                    </div>

                    {/* Search (Desktop only) */}
                    <div className="flex-1 max-w-xs relative hidden lg:block" ref={searchRef}>
                        <form onSubmit={handleSearch} className="relative group">
                            <input
                                type="text"
                                placeholder="Search premium tech..."
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-2 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 focus:bg-white transition-all text-sm font-medium"
                                value={searchQuery}
                                onFocus={() => setShowSuggestions(true)}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#005d32] transition-colors btn-haptic">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </form>
                        {showSuggestions && (
                            <div className="absolute top-full mt-2 w-full bg-white rounded-3xl border shadow-2xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
                                {suggestions.length > 0 && (
                                    <div className="py-2">
                                        {suggestions.map(p => (
                                            <Link
                                                key={p.id}
                                                href={`/product/${p.id}`}
                                                onClick={() => { setShowSuggestions(false); setSearchQuery(''); }}
                                                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="w-10 h-10 bg-gray-100 rounded-xl p-2 flex items-center justify-center shrink-0 relative overflow-hidden">
                                                    <Image
                                                        src={p.image}
                                                        alt={p.name}
                                                        fill
                                                        sizes="40px"
                                                        className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <div className="flex-1 overflow-hidden text-left">
                                                    <p className="text-xs font-bold text-gray-900 truncate">{p.name}</p>
                                                    <p className="text-[9px] text-gray-400 uppercase font-black">{p.category}</p>
                                                </div>
                                            </Link>

                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Icons + Currency Switcher */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* NEW: Permanent Currency Switcher in Main Nav */}
                        <div className="relative" ref={currencyRef}>
                            <button
                                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                className="flex items-center gap-2 bg-gray-50 border border-gray-100 hover:border-[#005d32]/20 px-3 py-2 rounded-xl transition-all btn-haptic"
                            >
                                <span className="text-sm md:text-base leading-none">{currency.flag}</span>
                                <span className="hidden sm:inline font-black text-[#005d32] text-[10px] uppercase tracking-widest">{currency.code}</span>
                                <svg className={`w-3 h-3 text-[#005d32] transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                            </button>

                            {isCurrencyOpen && (
                                <div className="absolute top-full right-0 mt-3 w-64 bg-white text-gray-900 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300 z-[120]">
                                    <div className="p-5 border-b bg-gray-50/50">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Select Shipping Region</p>
                                    </div>
                                    <div className="py-2 hide-scrollbar overflow-y-auto">
                                        {CURRENCIES.map((c) => (
                                            <button
                                                key={c.code}
                                                onClick={() => handleCurrencyChange(c)}
                                                className={`w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors ${currency.code === c.code ? 'bg-emerald-50' : ''}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xl leading-none">{c.flag}</span>
                                                    <div className="text-left">
                                                        <p className={`text-xs font-black uppercase tracking-wider ${currency.code === c.code ? 'text-[#005d32]' : 'text-gray-900'}`}>{c.code}</p>
                                                        <p className="text-[9px] text-gray-400 font-bold">{c.name}</p>
                                                    </div>
                                                </div>
                                                {currency.code === c.code && (
                                                    <div className="w-5 h-5 rounded-full bg-[#005d32] flex items-center justify-center">
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link href="/account" className="hidden sm:flex p-2.5 text-gray-600 hover:text-[#005d32] hover:bg-gray-100 rounded-xl transition-all btn-haptic">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>

                        <button
                            onClick={() => setIsMiniCartOpen(true)}
                            className="p-2.5 text-gray-600 hover:text-[#005d32] hover:bg-gray-100 rounded-xl transition-all relative btn-haptic"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cart.length > 0 && (
                                <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
