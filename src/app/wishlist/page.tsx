'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/lib/toast-store';
import ProductCard from '@/components/ProductCard';

const WishlistPage: React.FC = () => {
    const { wishlist, toggleWishlist, addToCart, formatPrice } = useCartStore();
    const { addToast } = useToast();

    const handleMoveAllToCart = () => {
        wishlist.forEach(p => {
            if (p.stock > 0) addToCart(p);
        });
        addToast('All available items added to cart!', 'success');
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        addToast('Wishlist link copied to clipboard!', 'success');
    };

    const totalValue = wishlist.reduce((acc, p) => acc + p.price, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-10 sm:py-16 space-y-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 border-b border-gray-100 pb-8">
                <div>
                    <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Saved Items</p>
                    <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tighter">My Wishlist</h1>
                    <p className="text-gray-400 font-medium mt-2 text-sm">
                        {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} · Total value: <span className="text-gray-700 font-bold">{formatPrice(totalValue)}</span>
                    </p>
                </div>
                {wishlist.length > 0 && (
                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 border border-gray-200 px-5 py-3 rounded-full hover:border-primary hover:text-slate-900 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            Share List
                        </button>
                        <button
                            onClick={handleMoveAllToCart}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-primary text-white px-5 py-3 rounded-full hover:bg-zinc-900 shadow-lg shadow-primary/20 transition-all active:scale-95"
                        >
                            🛒 Move All to Cart
                        </button>
                    </div>
                )}
            </div>

            {/* Wishlist Items */}
            {wishlist.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>

                    {/* Summary Bar */}
                    <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-1 text-center sm:text-left">
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">{wishlist.length} items saved</p>
                            <p className="text-2xl font-bold tracking-tight">Total Value: <span className="text-white">{formatPrice(totalValue)}</span></p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleMoveAllToCart}
                                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-900 transition-all active:scale-95 shadow-xl shadow-primary/20"
                            >
                                Add All to Cart
                            </button>
                            <Link href="/shop" className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">
                                Keep Shopping
                            </Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-32 space-y-6">
                    <div className="text-7xl mb-2">❤️</div>
                    <h2 className="text-2xl font-bold text-slate-900">Your wishlist is empty</h2>
                    <p className="text-gray-400 font-medium max-w-sm mx-auto leading-relaxed">
                        Save products you love by clicking the heart icon on any product. Find them all here!
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block bg-primary text-white px-12 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-zinc-900 shadow-xl shadow-primary/20 transition-all mt-4"
                    >
                        Start Browsing
                    </Link>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
