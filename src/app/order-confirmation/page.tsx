'use client';

import React from 'react';
import Link from 'next/link';

const SuccessPage: React.FC = () => {
    return (
        <div className="min-h-[85vh] flex flex-col items-center justify-center bg-[#F9F9F9] px-6">
            <div className="max-w-xl w-full bg-white rounded-5xl p-12 md:p-20 text-center shadow-sm border border-gray-50 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-accent-sage rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-10 shadow-xl shadow-accent-sage/20">
                    ✓
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-main mb-6 uppercase">
                    Order Confirmed
                </h1>
                
                <p className="text-[10px] font-bold text-accent-sage uppercase tracking-[0.3em] mb-10">
                    Thank you for your purchase
                </p>
                
                <p className="text-text-muted text-sm leading-relaxed mb-12">
                    Your order has been received and is now being processed by our curation team. 
                    A confirmation email with your order details has been sent to your inbox.
                </p>
                
                <div className="flex flex-col gap-4">
                    <Link href="/shop" className="w-full bg-black text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all transform active:scale-95 shadow-xl shadow-black/10">
                        Continue Shopping
                    </Link>
                    <Link href="/account" className="w-full bg-[#F9F9F9] text-text-main py-5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gray-100 hover:border-black transition-all transform active:scale-95">
                        Track Order
                    </Link>
                </div>
            </div>
            
            <p className="mt-12 text-[9px] font-bold text-text-muted uppercase tracking-widest">
                Need help? <Link href="/contact" className="text-black hover:underline">Contact Support</Link>
            </p>
        </div>
    );
};

export default SuccessPage;
