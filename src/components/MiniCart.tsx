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
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-300"
                onClick={() => setIsMiniCartOpen(false)}
            />

            <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
                <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter">Shopping Bag</h2>
                        <span className="bg-[#005d32]/10 text-[#005d32] text-[10px] font-black px-2 py-0.5 rounded-full">{cart.length}</span>
                    </div>
                    <button
                        onClick={() => setIsMiniCartOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <span className="text-5xl">🛍️</span>
                            <p className="font-bold text-gray-400">Your bag is empty</p>
                            <button
                                onClick={() => { setIsMiniCartOpen(false); router.push('/shop'); }}
                                className="text-[#005d32] font-black uppercase text-xs hover:underline"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        cart.map((item, i) => (
                            <div key={`${item.id}-${item.selectedColor}-${i}`} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="w-24 h-24 bg-gray-50 rounded-2xl p-3 flex items-center justify-center shrink-0 relative overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="80px"
                                        className="object-contain mix-blend-multiply p-2"
                                    />
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-bold text-gray-900 leading-tight pr-4">{item.name}</h3>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.selectedColor)}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full px-1 py-0.5">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#005d32]">-</button>
                                            <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-[#005d32]">+</button>
                                        </div>
                                        <p className="text-sm font-black text-[#005d32]">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="p-6 bg-gray-50/50 border-t space-y-4">
                        <div className="flex justify-between text-gray-900 text-lg font-black pt-2 uppercase">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button onClick={() => { setIsMiniCartOpen(false); router.push('/cart'); }} className="py-4 border-2 border-[#005d32] text-[#005d32] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#005d32] hover:text-white transition-all">View Bag</button>
                            <button onClick={() => { setIsMiniCartOpen(false); router.push('/checkout'); }} className="py-4 bg-[#005d32] text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#004a28] shadow-lg shadow-[#005d32]/20 transition-all">Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MiniCart;
