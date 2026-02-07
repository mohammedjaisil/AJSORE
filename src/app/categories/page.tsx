'use client';

import React from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

const Categories: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 space-y-16">
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">Collections</h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">Browse our laboratory-tested tech by category</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {CATEGORIES.map((cat, i) => (
                    <Link
                        key={i}
                        href={`/shop?cat=${cat.name}`}
                        className="group relative h-[520px] rounded-[3.5rem] overflow-hidden transition-all duration-700 hover:shadow-2xl flex flex-col items-center p-10 text-center"
                        style={{ backgroundColor: (cat as any).bgColor || '#f3f4f6' }}
                    >
                        {/* Soft Overlay */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Top Content: Icon - Optimized Size */}
                        <div className="relative z-10 flex-1 flex items-center justify-center">
                            <span className="text-[100px] inline-block transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 drop-shadow-2xl">
                                {cat.icon}
                            </span>
                        </div>

                        {/* Middle Content: Title & Count - Precisely matched to screenshot */}
                        <div className="relative z-10 space-y-4 flex flex-col items-center mb-8">
                            <h2 className="text-4xl font-black text-[#002e47] uppercase tracking-tighter leading-none">
                                {cat.name}
                            </h2>
                            <div className="bg-white px-6 py-2.5 rounded-full shadow-sm">
                                <p className="text-[10px] font-black text-[#005d32] uppercase tracking-[0.2em]">
                                    {cat.count}
                                </p>
                            </div>
                        </div>

                        {/* Bottom Content: Fixed Button Container to prevent clipping */}
                        <div className="relative z-10 w-full shrink-0">
                            <div className="bg-[#005d32] text-white py-4 px-8 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-[#005d32]/20 transform transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                                Explore Collection
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Specialty Drop Banner */}
            <div className="bg-gray-900 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#005d32] opacity-20 blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                    <div className="space-y-4">
                        <h3 className="text-4xl font-black text-white uppercase tracking-tighter">Limited Series</h3>
                        <p className="text-gray-400 max-w-sm font-medium leading-relaxed">Rare collaborations and engineering marvels. Available only while stocks last.</p>
                    </div>
                    <Link href="/deals" className="bg-[#005d32] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-[#005d32]/20 hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all btn-haptic">
                        View Active Drops
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Categories;
