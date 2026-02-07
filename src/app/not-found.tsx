import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-6">
            <h1 className="text-9xl font-extrabold text-[#005d32]/10">404</h1>
            <h2 className="text-3xl font-bold uppercase tracking-tighter">Page Not Found</h2>
            <p className="text-gray-500 max-w-sm mx-auto">The tech you're looking for has been decommissioned or moved elsewhere.</p>
            <Link href="/" className="inline-block bg-[#005d32] text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest shadow-xl shadow-[#005d32]/20 btn-haptic">
                Back to Base
            </Link>
        </div>
    );
}
