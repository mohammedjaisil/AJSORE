'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';

import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

interface ProductDetailsContentProps {
    product: Product;
    related: Product[];
}

const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({ product, related }) => {
    const router = useRouter();
    const { addToCart, formatPrice } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
    const [activeImage, setActiveImage] = useState(product?.image);
    const galleryRef = useRef<HTMLDivElement>(null);

    const deliveryEstimate = useMemo(() => {
        const today = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(today.getDate() + 3);
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
        return deliveryDate.toLocaleDateString('en-US', options);
    }, []);

    const images = [product.image, product.secondaryImage || product.image, ...Array(2).fill(product.image)];
    const isOutOfStock = product.stock <= 0;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 relative">
            <button
                onClick={() => router.back()}
                className="mb-8 flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#005d32] transition-colors"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Results
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
                {/* Gallery Column (Left) */}
                <div className="space-y-6 lg:sticky lg:top-36">
                    <div
                        ref={galleryRef}
                        className="relative aspect-square bg-white border border-gray-100 rounded-[2.5rem] flex items-center overflow-x-auto snap-x snap-mandatory scrollbar-hide shadow-sm group"
                    >
                        {images.map((img, i) => (
                            <div key={i} className="min-w-full h-full flex items-center justify-center snap-center p-10 cursor-crosshair relative">
                                <Image
                                    src={img}
                                    alt={`${product.name} ${i}`}
                                    fill
                                    priority={i === 0}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-contain mix-blend-multiply transition-transform duration-500 hover:scale-150 p-10"
                                />
                            </div>
                        ))}

                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[2px] pointer-events-none z-10">
                                <span className="bg-gray-900 text-white px-6 py-2 rounded-full font-black uppercase text-sm tracking-widest rotate-12">Out of Stock</span>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:grid grid-cols-4 gap-4">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setActiveImage(img);
                                    galleryRef.current?.scrollTo({ left: galleryRef.current.clientWidth * i, behavior: 'smooth' });
                                }}
                                className={`aspect-square bg-white border rounded-2xl p-3 flex items-center justify-center transition-all relative overflow-hidden ${activeImage === img ? 'ring-2 ring-[#005d32] border-[#005d32]' : 'border-gray-100 opacity-60 hover:opacity-100'}`}
                            >
                                <Image
                                    src={img}
                                    fill
                                    sizes="100px"
                                    className="object-contain mix-blend-multiply p-2"
                                    alt={`Thumb ${i}`}
                                />
                            </button>

                        ))}
                    </div>
                </div>

                {/* Details Column (Right) */}
                <div className="space-y-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-[#f3f9f6] text-[#005d32] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-[#005d32]/10">{product.category}</span>
                            {product.oldPrice && (
                                <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-red-100">Special Offer</span>
                            )}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-[1.05]">{product.name}</h1>

                        <div className="flex items-center gap-4">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-gray-400 font-bold text-sm">{(product.rating || 0).toFixed(1)} / 5.0 Global Rating</span>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-100 space-y-3">
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl md:text-6xl font-black text-[#005d32]">{formatPrice(product.price)}</span>
                            {product.oldPrice && (
                                <span className="text-2xl text-gray-300 line-through font-bold">{formatPrice(product.oldPrice)}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400">
                            <span className={`w-2.5 h-2.5 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
                            {isOutOfStock ? 'Sold Out Globally' : `Priority Stock Available: ${product.stock} Units`}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex flex-row gap-3 sm:gap-4">
                            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full h-14 sm:h-16 px-3 sm:px-4 w-36 sm:w-auto shrink-0">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl font-black text-gray-400 hover:text-[#005d32] transition-colors">-</button>
                                <span className="w-12 sm:w-14 text-center font-black text-lg sm:text-xl">{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl font-black text-gray-400 hover:text-[#005d32] transition-colors">+</button>
                            </div>
                            <button
                                onClick={() => !isOutOfStock && addToCart(product, quantity, selectedColor)}
                                disabled={isOutOfStock}
                                className={`flex-1 h-14 sm:h-16 rounded-full font-black text-base sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] transition-all transform active:scale-95 shadow-2xl ${isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#005d32] text-white hover:bg-[#004a28] shadow-[#005d32]/30'}`}
                            >
                                {isOutOfStock ? 'Out of Stock' : 'Add to Bag'}
                            </button>
                        </div>
                    </div>

                    {/* Integrated Product Description */}
                    <div className="pt-10 border-t border-gray-100 space-y-6">
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-[#005d32] uppercase tracking-[0.4em]">Product Briefing</p>
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Engineering Specifications</h3>
                        </div>
                        <div className="prose prose-emerald prose-sm">
                            <p className="text-gray-500 font-medium text-lg leading-relaxed">
                                {product.description}
                            </p>
                            {product.features && product.features.length > 0 && (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 !list-none !pl-0">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs font-black text-gray-700 uppercase tracking-widest bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm">
                                            <span className="w-2 h-2 rounded-full bg-[#005d32]" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 gap-4 pt-10 border-t border-gray-100">
                        <div className="flex items-center gap-4 p-5 bg-[#f3f9f6] rounded-3xl border border-[#005d32]/10 transition-all hover:shadow-md">
                            <span className="text-3xl">✈️</span>
                            <div>
                                <p className="text-[10px] font-black uppercase text-[#005d32] tracking-tighter leading-none">Global Transit</p>
                                <p className="text-[9px] text-gray-400 font-bold">Standard 5-10 Days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-transparent hover:border-[#005d32]/10 transition-all hover:shadow-md">
                            <span className="text-3xl">🛡️</span>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-900 tracking-tighter leading-none">Emerald Secure</p>
                                <p className="text-[9px] text-gray-400 font-bold">256-Bit SSL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {related.length > 0 && (
                <section className="pt-24 border-t border-gray-100">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Related Drops</h2>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-1">Discover more tech from our laboratory</p>
                        </div>
                        <Link href="/shop" className="text-[#005d32] font-black text-xs uppercase tracking-widest hover:underline mb-1">See Collection &rarr;</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {related.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </section>
            )}

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
};

export default ProductDetailsContent;
