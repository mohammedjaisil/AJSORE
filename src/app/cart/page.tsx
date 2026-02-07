'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { PRODUCTS } from '@/lib/constants';
// import ProductCard from '@/components/ProductCard'; // Not used in original Cart but imported? Ah, for recommendations.
import ProductCard from '@/components/ProductCard';

const Cart: React.FC = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, savedForLater, moveToSaved, moveToCart, removeFromSaved, formatPrice } = useCartStore();
    const router = useRouter();
    const cartTotal = getCartTotal();

    // Recommendations: Products not currently in the cart
    const cartIds = new Set(cart.map(item => item.id));
    const recommendations = PRODUCTS.filter(product => !cartIds.has(product.id)).slice(0, 4);

    if (cart.length === 0 && savedForLater.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
                <div className="text-7xl animate-bounce">🛒</div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Your cart is empty</h1>
                <p className="text-gray-400 text-lg max-w-md mx-auto font-medium">Looks like you haven't added any premium tech to your bag yet.</p>
                <Link href="/shop" className="inline-block bg-[#005d32] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-[#004a28] shadow-xl shadow-[#005d32]/20 transition-all transform hover:scale-105 active:scale-95">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 space-y-24">
            <div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Shopping Cart</h1>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Review your items and proceed to checkout</p>
                    </div>
                    <button
                        onClick={() => router.push('/shop')}
                        className="text-[#005d32] font-black uppercase text-xs hover:underline flex items-center gap-2"
                    >
                        &larr; Continue Shopping
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.length > 0 ? (
                            cart.map((item, idx) => (
                                <div key={`${item.id}-${item.selectedColor}-${idx}`} className="flex flex-col sm:flex-row gap-8 p-8 bg-white border rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
                                    <div className="w-full sm:w-40 aspect-square bg-gray-50 rounded-3xl p-6 flex items-center justify-center shrink-0">
                                        <img src={item.image} alt={item.name} className="max-h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Link href={`/product/${item.id}`} className="font-black text-xl text-gray-900 hover:text-[#005d32] transition-colors leading-tight block">
                                                    {item.name}
                                                </Link>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{item.category}</p>
                                            </div>
                                            <p className="font-black text-xl text-[#005d32]">{formatPrice(item.price * item.quantity)}</p>
                                        </div>

                                        {item.selectedColor && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Color:</span>
                                                <div className="w-4 h-4 rounded-full border border-gray-100 shadow-sm" style={{ backgroundColor: item.selectedColor }} />
                                            </div>
                                        )}

                                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
                                            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-2 py-1 shadow-inner">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)} className="w-10 h-10 flex items-center justify-center text-xl font-black text-gray-400 hover:text-[#005d32]">-</button>
                                                <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)} className="w-10 h-10 flex items-center justify-center text-xl font-black text-gray-400 hover:text-[#005d32]">+</button>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <button
                                                    onClick={() => moveToSaved(item)}
                                                    className="text-[10px] font-black text-gray-400 hover:text-[#005d32] uppercase tracking-widest"
                                                >
                                                    Save for Later
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                                                    className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem]">
                                <p className="text-gray-400 font-black uppercase text-xs tracking-widest">Your cart is currently empty</p>
                            </div>
                        )}
                    </div>

                    {/* Checkout Summary */}
                    <div className="space-y-6 lg:sticky lg:top-28">
                        <div className="bg-white border rounded-[2rem] p-8 space-y-8 shadow-sm">
                            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter border-b pb-4">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-400 text-xs font-black uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-xs font-black uppercase tracking-widest">
                                    <span>Standard Shipping</span>
                                    <span className="text-[#005d32]">FREE</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-xs font-black uppercase tracking-widest">
                                    <span>Estimated Taxes</span>
                                    <span className="text-gray-900">{formatPrice(0)}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-lg font-black text-gray-900 uppercase tracking-tighter">Order Total</span>
                                <span className="text-3xl font-black text-[#005d32]">{formatPrice(cartTotal)}</span>
                            </div>

                            <div className="space-y-3 pt-2">
                                <Link
                                    href="/checkout"
                                    className={`block w-full text-center py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-xl ${cart.length > 0 ? 'bg-[#005d32] text-white hover:bg-[#004a28] shadow-[#005d32]/20' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                                >
                                    Proceed to Checkout
                                </Link>
                                <div className="flex items-center justify-center gap-4 py-2 opacity-50 grayscale">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f3f9f6] p-6 rounded-[2rem] border border-[#005d32]/5 flex items-start gap-4">
                            <span className="text-2xl mt-1">🛡️</span>
                            <div>
                                <p className="text-xs font-black text-[#005d32] uppercase tracking-widest mb-1">Secure Checkout</p>
                                <p className="text-[10px] text-gray-500 font-medium">Your data is protected by industry-leading 256-bit SSL encryption for ultimate safety.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Saved for Later Section */}
            {savedForLater.length > 0 && (
                <section className="pt-24 border-t border-gray-100">
                    <div className="mb-10">
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Saved for Later</h2>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">{savedForLater.length} items waiting in your wishlist</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {savedForLater.map((item, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-6 space-y-4 group transition-all hover:shadow-lg">
                                <div className="aspect-square bg-gray-50 rounded-2xl p-6 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="max-h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                    <p className="text-sm font-black text-[#005d32]">{formatPrice(item.price)}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => moveToCart(item)}
                                        className="flex-1 bg-[#005d32]/5 text-[#005d32] py-2.5 rounded-full text-[10px] font-black uppercase hover:bg-[#005d32] hover:text-white transition-all"
                                    >
                                        Move to Bag
                                    </button>
                                    <button
                                        onClick={() => removeFromSaved(item.id, item.selectedColor)}
                                        className="p-2.5 bg-gray-50 text-gray-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Recommendations Section */}
            {recommendations.length > 0 && (
                <section className="pt-24 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Recommended for You</h2>
                        <Link href="/shop" className="text-[#005d32] font-black text-xs uppercase tracking-widest hover:underline">See All Items &rarr;</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {recommendations.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Cart;
