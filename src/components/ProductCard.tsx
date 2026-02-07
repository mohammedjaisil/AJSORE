'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/lib/toast-store';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [mounted, setMounted] = React.useState(false);
    const { addToast } = useToast();
    const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, formatPrice } = useCartStore();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const wishlisted = isInWishlist(product.id);
    const isOutOfStock = product.stock <= 0;

    const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

    return (
        <div className={`group relative bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out border border-transparent hover:border-gray-100 ${isOutOfStock ? 'opacity-80' : ''}`}>

            {/* Image Container */}
            <div className="relative aspect-square bg-[#f5f6f6] flex items-center justify-center p-8 overflow-hidden">
                <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center relative">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className={`object-contain mix-blend-multiply transition-all duration-700 ease-in-out ${product.secondaryImage ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-110'}`}
                    />
                    {product.secondaryImage && (
                        <Image
                            src={product.secondaryImage}
                            alt={`${product.name} hover`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-contain mix-blend-multiply opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                        />
                    )}
                </Link>

                {/* Wishlist Button - Enlarged for Mobile */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product);
                        addToast(wishlisted ? "Removed from wishlist" : "Added to wishlist!", "success");
                    }}
                    className={`absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-4 rounded-full shadow-lg border z-30 transition-all duration-300 transform active:scale-90 ${wishlisted ? 'bg-red-500 border-red-500 text-white' : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill={wishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>


                {/* Hover Action Layer */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto flex flex-col items-center justify-center gap-3 z-20">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setQuickViewProduct(product);
                        }}
                        className="hidden md:block bg-white text-gray-900 px-8 py-3.5 rounded-full font-black text-xs shadow-xl transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#005d32] hover:text-white"
                    >
                        Quick View
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 md:p-8 space-y-3 md:space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-1 md:gap-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-black text-gray-900 text-sm md:text-lg leading-tight truncate">
                            <Link href={`/product/${product.id}`} className="hover:text-[#005d32] transition-colors">{product.name}</Link>
                        </h3>
                        <p className="text-[8px] md:text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5 md:mt-1">{product.category}</p>
                    </div>
                    <div className="text-left md:text-right shrink-0">
                        <p suppressHydrationWarning={true} className="font-black text-base md:text-xl text-[#005d32]">
                            {mounted ? formatPrice(product.price) : `$${product.price.toFixed(2)}`}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (!isOutOfStock) {
                            addToCart(product);
                            addToast(`${product.name} added to bag!`, "success");
                        }
                    }}
                    disabled={isOutOfStock}
                    className={`w-full py-2.5 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-sm ${isOutOfStock ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-[#005d32] text-white hover:bg-[#004a28] shadow-[#005d32]/10'}`}
                >
                    {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
                </button>
            </div>

        </div>
    );
};

export default ProductCard;
