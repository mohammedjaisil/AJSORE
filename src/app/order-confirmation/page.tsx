'use client';

import React from 'react';
import Link from 'next/link';

const SuccessPage: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
            <div className="w-24 h-24 bg-[#f3f9f6] rounded-full flex items-center justify-center mx-auto text-4xl shadow-xl shadow-[#005d32]/10">🎉</div>
            <h1 className="text-5xl font-black text-[#005d32] uppercase tracking-tighter">Order Received!</h1>
            <p className="text-gray-500 max-w-md mx-auto font-medium">Your premium tech is being prepared for dispatch. Expect a confirmation email in the next few minutes.</p>
            <Link href="/account" className="inline-block bg-[#005d32] text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-[#004a28] transition-all transform hover:scale-105 shadow-2xl shadow-[#005d32]/20 btn-haptic">
                View My Orders
            </Link>
        </div>
    );
};

export default SuccessPage;
