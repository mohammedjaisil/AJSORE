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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setQuickViewProduct(null)}
            />

            {/* Modal Container */}
            <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in duration-300">
                {/* Close Button */}
                <button
                    onClick={() => setQuickViewProduct(null)}
                    className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-[110]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Product Image */}
                <div className="md:w-1/2 bg-[#f5f6f6] p-12 flex items-center justify-center relative min-h-[400px]">
                    <Image
                        src={quickViewProduct.image}
                        alt={quickViewProduct.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain mix-blend-multiply transition-transform hover:scale-110 duration-500 p-12"
                    />

                    {isOutOfStock && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-md text-white px-6 py-2 rounded-full font-black uppercase text-sm tracking-widest pointer-events-none rotate-12 border-2 border-white/20 shadow-2xl">
                            Sold Out
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="md:w-1/2 p-10 overflow-y-auto">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-[#005d32] font-bold text-sm uppercase tracking-widest">{quickViewProduct.category}</p>
                        {discount > 0 && !isOutOfStock && (
                            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">-{discount}%</span>
                        )}
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{quickViewProduct.name}</h2>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(quickViewProduct.rating) ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-gray-400 text-sm">({quickViewProduct.reviews} reviews)</span>
                    </div>

                    <div className="flex items-baseline gap-4 mb-6">
                        <p suppressHydrationWarning={true} className="text-3xl font-bold text-[#005d32]">
                            {mounted ? formatPrice(quickViewProduct.price) : `$${quickViewProduct.price.toFixed(2)}`}
                        </p>
                        {quickViewProduct.oldPrice && (
                            <p suppressHydrationWarning={true} className="text-lg text-gray-400 line-through font-bold">
                                {mounted ? formatPrice(quickViewProduct.oldPrice) : `$${quickViewProduct.oldPrice.toFixed(2)}`}
                            </p>
                        )}
                    </div>

                    <p className="text-gray-500 leading-relaxed mb-8">
                        {quickViewProduct.description}
                    </p>

                    <div className="space-y-6">
                        {!isOutOfStock ? (
                            <>
                                <div className="flex flex-row items-center gap-3 sm:gap-4">
                                    <div className="bg-gray-100 flex items-center rounded-full px-4 py-2.5 sm:px-5 sm:py-3 border shrink-0">
                                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 sm:p-2.5 text-xl sm:text-2xl font-bold">-</button>
                                        <span className="w-10 sm:w-12 text-center font-bold text-lg sm:text-xl">{quantity}</span>
                                        <button onClick={() => setQuantity(q => q + 1)} className="p-2 sm:p-2.5 text-xl sm:text-2xl font-bold">+</button>
                                    </div>
                                    <span className="text-xs text-gray-400 hidden sm:block">Only {quickViewProduct.stock} items left!</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <button
                                        onClick={() => {
                                            addToCart(quickViewProduct, quantity);
                                            addToast(`${quickViewProduct.name} added to bag!`, "success");
                                            setQuickViewProduct(null);
                                        }}
                                        className="flex-1 bg-[#005d32] text-white py-4 sm:py-4 rounded-full font-bold text-base sm:text-base hover:bg-[#004a28] transition-all transform active:scale-95 shadow-lg shadow-[#005d32]/20">
                                        Add to Bag
                                    </button>
                                    <Link
                                        href={`/product/${quickViewProduct.id}`}
                                        onClick={() => setQuickViewProduct(null)}
                                        className="flex-1 border-2 border-[#005d32] text-[#005d32] text-center py-4 sm:py-4 rounded-full font-bold text-base sm:text-base hover:bg-[#005d32]/5 transition-all">
                                        View Details
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-red-500 font-bold text-center py-4 bg-red-50 rounded-2xl">This item is currently out of stock.</p>
                                <Link
                                    href={`/product/${quickViewProduct.id}`}
                                    onClick={() => setQuickViewProduct(null)}
                                    className="block w-full border-2 border-[#005d32] text-[#005d32] text-center py-4 rounded-full font-bold hover:bg-[#005d32] hover:text-white transition-all"
                                >
                                    Product Details
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
