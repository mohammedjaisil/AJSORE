'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';

import { useToast } from '@/lib/toast-store';

const QuickViewModal: React.FC = () => {
    const [mounted, setMounted] = React.useState(false);
    const { addToast } = useToast();
    const { quickViewProduct, setQuickViewProduct, addToCart, formatPrice } = useCartStore();
    const [quantity, setQuantity] = useState(1);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!quickViewProduct) return null;

    const isOutOfStock = quickViewProduct.stock <= 0;
    const discount = quickViewProduct.oldPrice ? Math.round(((quickViewProduct.oldPrice - quickViewProduct.price) / quickViewProduct.oldPrice) * 100) : 0;

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-primary/80 backdrop-blur-md transition-opacity duration-500"
                onClick={() => setQuickViewProduct(null)}
            />

            {/* Modal – full bottom sheet on mobile, centered modal on desktop */}
            <div className="relative bg-white w-full sm:max-w-5xl rounded-t-[2rem] sm:rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col sm:flex-row max-h-[90vh] sm:max-h-[92vh] animate-in slide-in-from-bottom-8 duration-500 border border-white/10">

                {/* Close Button */}
                <button
                    onClick={() => setQuickViewProduct(null)}
                    className="absolute top-4 right-4 sm:top-8 sm:right-8 p-2.5 sm:p-3 bg-gray-100 sm:bg-white/10 hover:bg-primary hover:text-white backdrop-blur-xl border border-gray-200 sm:border-white/20 rounded-xl sm:rounded-2xl transition-all duration-300 z-[110] group active:scale-95"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Product Image Section */}
                <div className="sm:w-[45%] bg-[#fafafa] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none" />

                    <div className="relative w-full h-52 sm:h-full sm:min-h-[400px] flex items-center justify-center p-8 sm:p-12 transition-transform duration-1000">
                        <Image
                            src={quickViewProduct.image}
                            alt={quickViewProduct.name}
                            fill
                            priority
                            sizes="(max-width: 640px) 100vw, 45vw"
                            className="object-contain p-10 sm:p-16 mix-blend-multiply"
                        />
                    </div>

                    {isOutOfStock && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-md text-slate-900 px-6 sm:px-10 py-2.5 sm:py-4 rounded-full font-bold uppercase text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.4em] pointer-events-none -rotate-12 shadow-2xl z-20">
                            Sold Out
                        </div>
                    )}

                    {/* Discount badge on mobile */}
                    {discount > 0 && (
                        <div className="absolute top-4 left-4 sm:bottom-10 sm:left-10 sm:top-auto flex gap-2">
                            <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full sm:rounded-2xl shadow-sm uppercase tracking-wider">
                                -{discount}% OFF
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Information Section */}
                <div className="sm:w-[55%] p-6 sm:p-12 md:p-16 overflow-y-auto bg-white flex flex-col justify-center">
                    <div className="space-y-5 sm:space-y-10">
                        <div className="space-y-2 sm:space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] sm:text-[11px] font-bold text-slate-900 uppercase tracking-wider sm:tracking-[0.3em]">{quickViewProduct.category}</span>
                                <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                    <span className="text-amber-500 text-[10px] sm:text-xs">★</span>
                                    <span className="text-[10px] sm:text-xs font-bold text-amber-700">{quickViewProduct.rating}</span>
                                    <span className="text-[9px] sm:text-[10px] text-amber-600/60 font-medium hidden sm:inline">({quickViewProduct.reviews})</span>
                                </div>
                            </div>

                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">{quickViewProduct.name}</h2>
                        </div>

                        <div className="flex items-end gap-3 sm:gap-5">
                            <div suppressHydrationWarning className="space-y-0.5 sm:space-y-1">
                                {quickViewProduct.oldPrice && (
                                    <p className="text-xs sm:text-sm text-gray-400 line-through font-bold opacity-60">
                                        {mounted ? formatPrice(quickViewProduct.oldPrice) : `₹${quickViewProduct.oldPrice}`}
                                    </p>
                                )}
                                <p className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tighter leading-none">
                                    {mounted ? formatPrice(quickViewProduct.price) : `₹${quickViewProduct.price}`}
                                </p>
                            </div>
                            {discount > 0 && !isOutOfStock && (
                                <span className="mb-1 bg-red-50 text-red-600 text-[9px] sm:text-[11px] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-red-100 uppercase tracking-wider hidden sm:inline">
                                    Save {discount}%
                                </span>
                            )}
                        </div>

                        <p className="text-gray-500 text-sm sm:text-lg font-medium leading-[1.6] max-w-md line-clamp-3 sm:line-clamp-none">
                            {quickViewProduct.description}
                        </p>

                        <div className="pt-1 sm:pt-2">
                            {!isOutOfStock ? (
                                <div className="space-y-5 sm:space-y-8">
                                    <div className="flex items-center gap-6 sm:gap-10">
                                        <div className="space-y-2 sm:space-y-3">
                                            <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:tracking-[0.2em] ml-1 sm:ml-2">Qty</p>
                                            <div className="inline-flex items-center bg-gray-50 border border-gray-100 rounded-2xl sm:rounded-3xl p-1 sm:p-1.5 shadow-sm">
                                                <button
                                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold text-gray-400 hover:text-slate-900 transition-colors"
                                                >-</button>
                                                <span className="w-10 sm:w-14 text-center font-bold text-base sm:text-lg text-slate-900">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(q => q + 1)}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-bold text-gray-400 hover:text-slate-900 transition-colors"
                                                >+</button>
                                            </div>
                                        </div>
                                        <div className="pt-4 sm:pt-6">
                                            <p className="text-[9px] sm:text-[10px] font-bold text-slate-900 uppercase tracking-wider sm:tracking-[0.2em]">
                                                {quickViewProduct.stock < 10 ? `Only ${quickViewProduct.stock} Left!` : 'In Stock'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row gap-3 sm:gap-5">
                                        <button
                                            onClick={() => {
                                                addToCart(quickViewProduct, quantity);
                                                addToast(`${quickViewProduct.name} added to cart!`, "success");
                                                setQuickViewProduct(null);
                                            }}
                                            className="flex-[1.5] bg-primary text-white py-4 sm:py-6 rounded-xl sm:rounded-[2rem] font-bold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] hover:bg-zinc-900 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/30"
                                        >
                                            Add to Cart
                                        </button>
                                        <Link
                                            href={`/product/${quickViewProduct.id}`}
                                            onClick={() => setQuickViewProduct(null)}
                                            className="flex-1 bg-slate-900 text-white text-center py-4 sm:py-6 rounded-xl sm:rounded-[2rem] font-bold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl shadow-gray-900/10"
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 sm:space-y-6">
                                    <p className="text-gray-500 font-bold text-center py-4 sm:py-6 bg-gray-50 rounded-2xl sm:rounded-3xl border border-dashed border-gray-200 uppercase tracking-widest text-[10px] sm:text-[11px]">Currently unavailable</p>
                                    <Link
                                        href={`/product/${quickViewProduct.id}`}
                                        onClick={() => setQuickViewProduct(null)}
                                        className="block w-full bg-slate-900 text-white text-center py-4 sm:py-6 rounded-xl sm:rounded-[2rem] font-bold text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] hover:bg-gray-800 transition-all"
                                    >
                                        View Full Details
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
