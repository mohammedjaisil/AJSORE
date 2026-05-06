'use client';

import React, { useState } from 'react';
import { markAsFulfilled } from '@/actions/admin-orders';
import { useRouter } from 'next/navigation';

export default function FulfillmentManager({ 
    orderId, 
    status 
}: { 
    orderId: string; 
    status: string;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (status === 'FULFILLED') {
        return (
            <div className="bg-[#f0faf5] border border-[#c3e9d1] rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[#1a8a4f]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <span className="text-xs font-semibold text-[#1a8a4f]">Fulfilled</span>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-wider text-[#5c5fc8] hover:underline">View tracking</button>
            </div>
        );
    }

    async function handleFulfill() {
        setLoading(true);
        try {
            await markAsFulfilled(orderId);
            router.refresh();
        } catch (error) {
            alert('Fulfillment failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="text-xs font-semibold text-[#1a1a1a]">Unfulfilled</h4>
                    <p className="text-[10px] text-[#6c6c6c]">1 item from Warehouse</p>
                </div>
                <button 
                    onClick={handleFulfill}
                    disabled={loading}
                    className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-[#333] transition-colors disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Fulfill item'}
                </button>
            </div>
        </div>
    );
}
