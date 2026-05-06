
import React from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function PurchaseOrdersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-heading">Purchase Orders</h1>
                    <p className="text-label mt-1">Track and manage inventory orders from your suppliers.</p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors">
                    Create purchase order
                </button>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm overflow-hidden p-12 text-center">
                <div className="max-w-xs mx-auto space-y-4">
                    <div className="w-16 h-16 bg-[#f6f6f7] rounded-full flex items-center justify-center mx-auto">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c9c9c]"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <h2 className="text-sm font-semibold text-[#1a1a1a]">No purchase orders yet</h2>
                    <p className="text-xs text-[#6c6c6c]">Manage your incoming inventory and track shipments from your suppliers.</p>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-[#5c5fc8] hover:underline">Learn more about purchase orders</button>
                </div>
            </div>
        </div>
    );
}
