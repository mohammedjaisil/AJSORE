'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/lib/toast-store';

import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

interface ProductDetailsContentProps {
    product: Product;
    related: Product[];
}

const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({ product, related }) => {
    const router = useRouter();
    const { addToCart, formatPrice } = useCartStore();
    const { addToast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
    const [customText, setCustomText] = useState('');
    const [activeImage, setActiveImage] = useState(product?.image);
    const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'returns'>('desc');
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

    const handleAddToCart = () => {
        if (!isOutOfStock) {
            addToCart(product, quantity, selectedColor);
            addToast(`${product.name} added to cart!`, 'success');
        }
    };

    const handleBuyNow = () => {
        if (!isOutOfStock) {
            addToCart(product, quantity, selectedColor);
            router.push('/checkout');
        }
    };

    const faqs = [
        { q: 'Is this product genuine?', a: 'Yes, all our products are 100% authentic and come directly from authorized distributors.' },
        { q: 'What is the warranty period?', a: 'This product comes with a 1-year manufacturer warranty against any defects.' },
        { q: "Can I return it if I'm not satisfied?", a: "We offer a 30-day easy return policy for a full refund if the item is in its original condition." },
    ];

    const sampleReviews = [
        { user_name: 'Rahul Sharma', comment: 'Absolutely stunning quality. Real premium feel, delivered super fast. Highly recommend!', rating: 5, created_at: new Date('2025-02-01').toISOString(), isVerified: true },
        { user_name: 'Priya Patel', comment: 'Loved the packaging and build quality. Exactly as described. Will buy again!', rating: 5, created_at: new Date('2025-01-15').toISOString(), isVerified: true },
        { user_name: 'Arjun Singh', comment: 'Great value for money. Customer support was very responsive when I had a question.', rating: 4, created_at: new Date('2024-12-20').toISOString(), isVerified: true },
    ];

    const reviews = product.detailedReviews && product.detailedReviews.length > 0
        ? product.detailedReviews.slice(0, 3)
        : sampleReviews;

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mb-12">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-black">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Gallery Column */}
                    <div className="space-y-6">
                        <div className="relative aspect-square rounded-5xl overflow-hidden bg-white shadow-sm group">
                            <Image
                                src={activeImage}
                                alt={product.name}
                                fill
                                priority
                                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            {isOutOfStock && (
                                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center">
                                    <span className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest">Out of Stock</span>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(img)}
                                    className={`relative aspect-square rounded-3xl overflow-hidden bg-white border-2 transition-all ${activeImage === img ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-accent-sage text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    New Arrival
                                </span>
                                {product.oldPrice && (
                                    <span className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-main leading-[1.1]">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex text-amber-400">
                                    {'★'.repeat(Math.floor(product.rating || 5))}
                                </div>
                                <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                                    {(product.rating || 5).toFixed(1)} / 5.0 · {product.reviews || 0} Reviews
                                </span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-bold text-text-main">{formatPrice(product.price)}</span>
                            {product.oldPrice && (
                                <span className="text-2xl text-text-muted line-through font-medium">{formatPrice(product.oldPrice)}</span>
                            )}
                        </div>

                        <p className="text-text-muted text-sm leading-relaxed max-w-xl">
                            {product.description || "Experience the perfect blend of style and comfort with our premium collection. Crafted with meticulous attention to detail, this piece is designed to elevate your everyday look."}
                        </p>

                        {/* Quantity & Actions */}
                        <div className="space-y-6 pt-6 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center bg-white rounded-full px-6 py-2 border border-gray-200 gap-6">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-xl font-medium hover:text-accent-sage transition-colors">−</button>
                                    <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="text-xl font-medium hover:text-accent-sage transition-colors">+</button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                    className="flex-1 bg-black text-white rounded-full py-4 px-12 font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:bg-gray-200 disabled:text-gray-400"
                                >
                                    {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                                </button>
                            </div>
                            <button
                                onClick={handleBuyNow}
                                disabled={isOutOfStock}
                                className="w-full bg-accent-sage text-white rounded-full py-4 px-12 font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg shadow-accent-sage/20 disabled:hidden"
                            >
                                Buy It Now
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-gray-200">
                            {[
                                { icon: '🚚', label: 'Free Shipping', sub: 'Orders over ₹5,000' },
                                { icon: '🛡️', label: 'Secure Payment', sub: '100% Protected' },
                                { icon: '🔄', label: 'Easy Returns', sub: '30 Days Return' },
                                { icon: '✨', label: 'Premium Quality', sub: 'Certified Items' }
                            ].map((badge, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm border border-gray-50">
                                        {badge.icon}
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-text-main leading-tight">{badge.label}</p>
                                        <p className="text-[10px] font-medium text-text-muted mt-0.5">{badge.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-32">
                    <div className="flex gap-12 border-b border-gray-200 mb-12 overflow-x-auto no-scrollbar">
                        {['Description', 'Reviews', 'Shipping'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase() as any)}
                                className={`pb-4 text-xs font-bold uppercase tracking-[0.2em] relative transition-colors whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'text-black' : 'text-text-muted hover:text-black'}`}
                            >
                                {tab}
                                {activeTab === tab.toLowerCase() && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-4xl">
                        {activeTab === 'description' && (
                            <div className="prose prose-slate max-w-none">
                                <p className="text-text-muted leading-loose text-sm">{product.description}</p>
                                <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(product.features || ['Premium Finish', 'Ergonomic Design', 'Durable Build']).map((f, i) => (
                                        <li key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-text-main bg-white p-4 rounded-2xl border border-gray-50">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent-sage" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="space-y-8">
                                {reviews.map((review, i) => (
                                    <div key={i} className="bg-white p-8 rounded-4xl border border-gray-50 shadow-sm space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-accent-nude flex items-center justify-center text-xs font-bold uppercase">
                                                    {(review as any).user_name?.[0]}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-tight">{(review as any).user_name}</p>
                                                    <p className="text-[10px] text-accent-sage font-bold uppercase tracking-widest">Verified Buyer</p>
                                                </div>
                                            </div>
                                            <div className="flex text-amber-400 text-xs">
                                                {'★'.repeat(review.rating ?? 5)}
                                            </div>
                                        </div>
                                        <p className="text-text-muted text-sm leading-relaxed">&quot;{review.comment}&quot;</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <div className="bg-white p-10 rounded-4xl border border-gray-50 shadow-sm">
                                <h3 className="text-lg font-bold mb-4">Shipping Information</h3>
                                <p className="text-text-muted text-sm leading-relaxed mb-6">
                                    We offer free shipping on all orders over ₹5,000. For orders below this amount, a flat shipping fee applies. Orders are typically processed within 24-48 hours and delivered within 3-5 business days.
                                </p>
                                <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-3xl">
                                    <span className="text-2xl">🗓️</span>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest">Estimated Delivery</p>
                                        <p className="text-sm font-bold text-black mt-1">Expected by {deliveryEstimate}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-40">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold tracking-tight">Related products</h2>
                            <Link href="/shop" className="text-xs font-bold uppercase tracking-widest hover:underline">View All Products →</Link>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsContent;
