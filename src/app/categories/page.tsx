'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

const Categories: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 sm:py-24 space-y-16 sm:space-y-32">
            {/* Header */}
            <div className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 border border-primary/20 text-slate-900 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.3em] rounded-full bg-primary/5 mb-2 sm:mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Browse Categories
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter uppercase leading-none">Collections</h1>
                <p className="text-gray-400 font-medium text-sm sm:text-lg leading-relaxed">Browse our curated categories for the perfect tech.</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
                {CATEGORIES.map((cat, i) => (
                    <Link
                        key={i}
                        href={`/shop?cat=${cat.name}`}
                        className="group relative h-[280px] sm:h-[420px] md:h-[600px] rounded-2xl sm:rounded-[3rem] overflow-hidden transition-all duration-1000 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] flex flex-col items-center p-4 sm:p-8 md:p-12 text-center border border-gray-50"
                        style={{ backgroundColor: (cat as any).bgColor || '#fafafa' }}
                    >
                        {/* High-end ambient glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Division Icon */}
                        <div className="relative z-10 flex-1 flex items-center justify-center">
                            <span className="text-[60px] sm:text-[80px] md:text-[120px] inline-block transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-1000 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                                {cat.icon}
                            </span>
                        </div>

                        {/* Textual Identity */}
                        <div className="relative z-10 space-y-3 sm:space-y-6 flex flex-col items-center mb-4 sm:mb-10 w-full">
                            <div className="space-y-1 sm:space-y-2">
                                <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-tighter leading-none group-hover:text-slate-900 transition-colors duration-500">
                                    {cat.name}
                                </h2>
                                <div className="hidden sm:flex items-center justify-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                    <div className="h-px w-6 sm:w-8 bg-slate-900" />
                                    <p className="text-[8px] sm:text-[10px] font-bold text-slate-900 uppercase tracking-wider sm:tracking-[0.4em]">Category</p>
                                    <div className="h-px w-6 sm:w-8 bg-slate-900" />
                                </div>
                            </div>

                            <div className="bg-white/90 backdrop-blur-xl px-4 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm border border-white/50 group-hover:shadow-md transition-all">
                                <p className="text-[9px] sm:text-[11px] font-bold text-slate-900 uppercase tracking-wider sm:tracking-[0.3em]">
                                    {cat.count} PRODUCTS
                                </p>
                            </div>
                        </div>

                        {/* Interactive Trigger */}
                        <div className="relative z-10 w-full shrink-0">
                            <div className="bg-slate-900 text-white py-3 sm:py-5 px-4 sm:px-8 rounded-xl sm:rounded-[1.8rem] font-bold uppercase text-[9px] sm:text-[10px] tracking-wider sm:tracking-[0.3em] shadow-2xl shadow-gray-900/10 transform transition-all duration-500 group-hover:bg-primary group-hover:scale-[1.02] flex items-center justify-center gap-2 sm:gap-3">
                                Shop Now
                                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Premium Callout Banner */}
            <div className="bg-slate-900 rounded-2xl sm:rounded-[4rem] p-8 sm:p-16 md:p-28 relative overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.15)] sm:shadow-[0_50px_100px_rgba(0,0,0,0.2)]">
                <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-white opacity-5 blur-[120px] sm:blur-[150px] group-hover:scale-150 transition-transform duration-[2000ms]" />
                <div className="absolute -bottom-20 -left-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-white opacity-3 blur-[80px] sm:blur-[100px]" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-20 text-center lg:text-left">
                    <div className="space-y-4 sm:space-y-8 max-w-xl">
                        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 border border-white/10 text-white/50 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider sm:tracking-[0.3em] rounded-full bg-white/5">
                            Featured Collection
                        </div>
                        <h3 className="text-2xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-[1.1]">Limited <br /><span className="text-gray-500">Edition Drops.</span></h3>
                        <p className="text-gray-400 font-medium leading-relaxed text-sm sm:text-lg">Exclusive collaborations and limited-run products. Get them before they're gone!</p>
                    </div>
                    <div className="shrink-0">
                        <Link href="/shop" className="bg-white text-slate-900 px-8 sm:px-16 py-4 sm:py-6 rounded-xl sm:rounded-[2rem] font-bold uppercase tracking-wider sm:tracking-[0.2em] text-[10px] sm:text-[11px] shadow-2xl hover:bg-primary hover:text-white hover:scale-[1.05] active:scale-95 transition-all duration-500 flex items-center gap-3 sm:gap-4">
                            Explore Drops
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
