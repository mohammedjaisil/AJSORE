'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/lib/toast-store';

interface ProductCardProps {
    product: Product;
    showDetails?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showDetails = false }) => {
    const [mounted, setMounted] = React.useState(false);
    const { addToast } = useToast();
    const { toggleWishlist, isInWishlist, formatPrice } = useCartStore();

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const wishlisted = isInWishlist(product.id);

    return (
        <div className="group flex flex-col gap-4 h-full font-sans">
            {/* Image Container */}
            <div className="relative flex-1 rounded-[3rem] bg-[#F3F3F3] overflow-hidden min-h-[300px]">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                    }}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm active:scale-90"
                >
                    <svg className="w-5 h-5" fill={mounted && wishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Info */}
            <div className="space-y-1.5 px-1">
                <h3 className="text-sm md:text-base font-bold text-black tracking-tight leading-tight">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                
                {showDetails && product.rating && (
                    <div className="flex items-center gap-2">
                        <div className="flex text-[#FFC107] text-sm">
                            {'★'.repeat(Math.floor(product.rating))}
                        </div>
                        <span className="text-xs font-medium text-gray-400">{product.rating}.0/5</span>
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-black tracking-tight">
                        {mounted ? formatPrice(product.price) : `₹${product.price}`}
                    </span>
                    {showDetails && product.oldPrice && (
                        <>
                            <span className="text-xs font-medium text-gray-300 line-through">
                                {mounted ? formatPrice(product.oldPrice) : `₹${product.oldPrice}`}
                            </span>
                            <span className="bg-[#FFEBEB] text-[#FF5B5B] text-[9px] font-bold px-2 py-0.5 rounded-full">
                                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                            </span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
