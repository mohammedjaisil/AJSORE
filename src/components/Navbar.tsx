'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';

import { PRODUCTS, CURRENCIES } from '@/lib/constants';
import { Product, Currency } from '@/types';

const Navbar: React.FC<{ branding?: any }> = ({ branding }) => {
    const { cart, setIsMiniCartOpen } = useCartStore();
    const cartCount = cart.length;
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const siteName = branding?.site_name || 'BUYKKO';
    const logoUrl = branding?.logo_url;

    const navLinks = [
        { href: '/shop?category=men', label: 'Men' },
        { href: '/shop?category=women', label: 'Women' },
        { href: '/shop?category=children', label: 'Children' },
        { href: '/shop?category=sports', label: 'Sports' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] w-full bg-white border-b border-gray-100">
            <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
                
                {/* LEFT: Menu (Mobile) / Dropdowns & Search (Desktop) */}
                <div className="flex items-center gap-6 flex-1 lg:flex-[2]">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>

                    <div className="hidden xl:flex items-center gap-6">
                        <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:opacity-60 transition-all">
                            Categories
                            <svg className="w-2.5 h-2.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest hover:opacity-60 transition-all whitespace-nowrap">
                            New Product
                            <svg className="w-2.5 h-2.5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                    </div>

                    <form onSubmit={handleSearch} className="relative flex-1 max-w-[240px] hidden md:block">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#F6F6F6] rounded-full py-2 pl-10 pr-4 text-[11px] font-medium placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black/5"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </form>
                </div>

                {/* CENTER: Logo */}
                <Link href="/" className="group shrink-0">
                    {logoUrl ? (
                        <img src={logoUrl} alt={siteName} className="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
                    ) : (
                        <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-lg font-bold transition-all group-hover:scale-105 active:scale-95 shadow-xl shadow-black/10">
                            {siteName.charAt(0)}
                        </div>
                    )}
                </Link>

                {/* RIGHT: Navigation & Icons */}
                <div className="flex items-center justify-end gap-8 flex-1 lg:flex-[2]">
                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map(link => (
                            <Link key={link.label} href={link.href} className="text-[11px] font-bold uppercase tracking-widest text-black hover:opacity-60 transition-all">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMiniCartOpen(true)} className="relative p-2 hover:bg-gray-50 rounded-full transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-black text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <Link href="/account" className="p-2 hover:bg-gray-50 rounded-full transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div className={`lg:hidden fixed inset-0 z-[110] transition-all duration-500 ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
                <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)} />
                <div className={`absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-10 space-y-12">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <div className="flex flex-col gap-8">
                            {navLinks.map(link => (
                                <Link key={link.label} href={link.href} className="text-xl font-bold uppercase tracking-[0.2em] text-text-main" onClick={() => setIsMobileMenuOpen(false)}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
