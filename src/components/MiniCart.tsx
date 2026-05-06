'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useCartStore } from '@/lib/store';

const MiniCart: React.FC = () => {
    const { cart, getCartTotal, isMiniCartOpen, setIsMiniCartOpen, updateQuantity, removeFromCart, formatPrice } = useCartStore();
    const router = useRouter();
    const cartTotal = getCartTotal();

    if (!isMiniCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] overflow-hidden">
            <div
                className="absolute inset-0 bg-primary/60 backdrop-blur-md transition-opacity animate-in fade-in duration-700"
                onClick={() => setIsMiniCartOpen(false)}
            />

            {/* Drawer – full width on mobile, max-w-lg on desktop */}
            <div className="absolute inset-y-0 right-0 w-full sm:max-w-lg bg-white shadow-[0_0_100px_rgba(0,0,0,0.3)] flex flex-col animate-in slide-in-from-right duration-700 border-l border-gray-100">

                {/* Header */}
                <div className="p-5 sm:p-8 md:p-10 border-b border-gray-50 flex items-center justify-between sticky top-0 z-10 bg-white/90 backdrop-blur-xl">
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tighter uppercase leading-none">Your Bag</h2>
                            <div className="bg-primary text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg shadow-primary/20">
                                {cart.length}
                            </div>
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider sm:tracking-[0.2em]">Free Shipping Pan India</p>
                    </div>
                    <button
                        onClick={() => setIsMiniCartOpen(false)}
                        className="p-2.5 sm:p-3 hover:bg-gray-100 rounded-xl sm:rounded-2xl transition-all duration-300 text-gray-400 hover:text-slate-900 group active:scale-90"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-8 md:px-10 py-4 sm:py-6 hide-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 animate-in zoom-in duration-500">
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#fafafa] rounded-[2rem] sm:rounded-[3rem] flex items-center justify-center text-4xl sm:text-5xl shadow-inner border border-gray-50/50">
                                🛍️
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 uppercase tracking-tight">Empty Bag</h3>
                                <p className="font-medium text-gray-400 text-sm max-w-[200px]">Your bag is empty. Start shopping for premium tech products!</p>
                            </div>
                            <button
                                onClick={() => { setIsMiniCartOpen(false); router.push('/shop'); }}
                                className="bg-slate-900 text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-primary transition-all duration-500 shadow-xl active:scale-95"
                            >
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5 sm:space-y-8">
                            {cart.map((item, i) => (
                                <div key={`${item.id}-${item.selectedColor}-${i}`} className="flex gap-4 sm:gap-6 group animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 80}ms` }}>
                                    {/* Image */}
                                    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-[#fafafa] rounded-2xl sm:rounded-[2rem] p-3 sm:p-5 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:shadow-lg transition-all duration-500 border border-gray-50">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 640px) 80px, 112px"
                                            className="object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 py-0.5 sm:py-1 flex flex-col justify-between min-w-0">
                                        <div className="space-y-0.5 sm:space-y-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight uppercase tracking-tight group-hover:text-slate-900 transition-colors truncate">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                                                    className="text-gray-300 hover:text-red-500 transition-all active:scale-95 p-0.5 shrink-0"
                                                >
                                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                            <p className="text-[9px] sm:text-[10px] text-slate-900 font-bold uppercase tracking-widest">{item.category}</p>
                                        </div>

                                        <div className="flex items-end justify-between pt-2 sm:pt-4">
                                            <div className="flex items-center gap-2 sm:gap-4 bg-gray-50/80 border border-gray-100 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-sm">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-gray-400 hover:text-slate-900 transition-colors text-sm">-</button>
                                                <span className="w-4 sm:w-6 text-center font-bold text-[10px] sm:text-xs text-slate-900">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-gray-400 hover:text-slate-900 transition-colors text-sm">+</button>
                                            </div>
                                            <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer / Summary */}
                {cart.length > 0 && (
                    <div className="p-5 sm:p-8 md:p-10 bg-[#fafafa] border-t border-gray-100 space-y-5 sm:space-y-8 rounded-t-[2rem] sm:rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.02)]">
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex justify-between items-center text-slate-900">
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-[0.2em] text-gray-400">Tax & Shipping</span>
                                <span className="text-[10px] sm:text-xs font-bold text-slate-900 bg-primary/5 px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider sm:tracking-widest">At checkout</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-xs sm:text-sm font-bold uppercase tracking-tight sm:tracking-[0.1em] text-slate-900">Total</span>
                                <span className="text-2xl sm:text-4xl font-bold tracking-tighter text-slate-900">{formatPrice(cartTotal)}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-5">
                            <button
                                onClick={() => { setIsMiniCartOpen(false); router.push('/cart'); }}
                                className="py-3.5 sm:py-5 border border-gray-200 text-slate-900 bg-white rounded-xl sm:rounded-[1.5rem] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest hover:border-gray-900 transition-all active:scale-95 shadow-sm"
                            >
                                View Cart
                            </button>
                            <button
                                onClick={() => { setIsMiniCartOpen(false); router.push('/checkout'); }}
                                className="py-3.5 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-[1.5rem] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest hover:bg-primary shadow-2xl shadow-gray-900/10 transition-all duration-500 active:scale-95 flex items-center justify-center gap-1.5 sm:gap-2"
                            >
                                Checkout
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MiniCart;
