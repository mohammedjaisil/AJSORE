'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { PRODUCTS } from '@/lib/constants';
import ProductCard from '@/components/ProductCard';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, savedForLater, moveToSaved, moveToCart, removeFromSaved, formatPrice } = useCartStore();
    const router = useRouter();
    const cartTotal = getCartTotal();

    const cartIds = new Set(cart.map(item => item.id));
    const recommendations = PRODUCTS.filter(product => !cartIds.has(product.id)).slice(0, 4);

    if (cart.length === 0 && savedForLater.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F9F9F9] px-6">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm mb-8">🛒</div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">Your cart is empty</h1>
                <p className="text-text-muted text-sm max-w-xs text-center mb-10 leading-relaxed">
                    Discovery is just a click away. Explore our curated collection of premium essentials.
                </p>
                <Link href="/shop" className="bg-black text-white px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
                    Start Exploring
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 py-16">
                <div className="mb-16">
                    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-black">Shopping Bag</span>
                    </nav>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-main uppercase">
                        Your Shopping Bag
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-6">
                        {cart.length > 0 ? (
                            cart.map((item, idx) => (
                                <div key={`${item.id}-${item.selectedColor}-${idx}`} className="bg-white rounded-4xl p-6 sm:p-8 flex gap-8 items-center border border-gray-50 hover:shadow-xl hover:shadow-black/5 transition-all group">
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden bg-[#F9F9F9] shrink-0 relative">
                                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-accent-sage uppercase tracking-widest">{item.category}</p>
                                                <Link href={`/product/${item.id}`}>
                                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-main hover:text-accent-sage transition-colors">{item.name}</h3>
                                                </Link>
                                                {item.selectedColor && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-[9px] font-bold uppercase text-text-muted">Color:</span>
                                                        <div className="w-3 h-3 rounded-full border border-gray-100" style={{ backgroundColor: item.selectedColor }} />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xl font-bold">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div className="flex items-center bg-[#F9F9F9] rounded-full px-4 py-1.5 border border-gray-100 gap-4">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)} className="text-lg font-medium hover:text-accent-sage transition-colors">−</button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)} className="text-lg font-medium hover:text-accent-sage transition-colors">+</button>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <button onClick={() => moveToSaved(item)} className="text-[10px] font-bold uppercase tracking-widest text-text-muted hover:text-black transition-colors">Save for later</button>
                                                <button onClick={() => removeFromCart(item.id, item.selectedColor)} className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-5xl py-20 text-center border border-gray-50">
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">Items moved to saved or empty</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                        <div className="bg-black text-white rounded-5xl p-10 space-y-10 shadow-2xl shadow-black/20">
                            <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-6">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/50">
                                    <span>Subtotal</span>
                                    <span className="text-white">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/50">
                                    <span>Shipping</span>
                                    <span className="text-accent-sage">Calculated at next step</span>
                                </div>
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/50">
                                    <span>Tax</span>
                                    <span className="text-white">{formatPrice(0)}</span>
                                </div>
                            </div>
                            <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                                <span className="text-4xl font-bold tracking-tight">{formatPrice(cartTotal)}</span>
                            </div>
                            <Link
                                href="/checkout"
                                className={`block w-full text-center py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-all transform hover:scale-[1.02] active:scale-95 ${cart.length > 0 ? 'bg-white text-black hover:bg-gray-100' : 'bg-white/10 text-white/30 cursor-not-allowed pointer-events-none'}`}
                            >
                                Checkout Now
                            </Link>
                            <div className="flex justify-center gap-6 opacity-30 invert">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Saved for Later */}
                {savedForLater.length > 0 && (
                    <div className="mt-40">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold tracking-tight uppercase">Saved for Later</h2>
                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em] mt-2">{savedForLater.length} items waiting for you</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {savedForLater.map((item, i) => (
                                <div key={i} className="bg-white rounded-4xl p-6 border border-gray-50 space-y-6 group transition-all hover:shadow-xl">
                                    <div className="aspect-square rounded-3xl overflow-hidden bg-[#F9F9F9] relative">
                                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-sm text-text-main uppercase tracking-tight line-clamp-1">{item.name}</h3>
                                        <p className="text-lg font-bold">{formatPrice(item.price)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => moveToCart(item)}
                                            className="flex-1 bg-black text-white py-3 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
                                        >
                                            Move to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromSaved(item.id, item.selectedColor)}
                                            className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <div className="mt-40 pt-20 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-bold tracking-tight uppercase">You May Also Like</h2>
                            <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest hover:underline">View All Collection →</Link>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {recommendations.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
