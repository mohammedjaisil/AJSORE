'use client';

import React, { useState } from 'react';
import { updateOrderShipment } from '@/actions/admin-orders';
import { useToast } from '@/lib/toast-store';

interface Props {
    orderId: string;
    initialTracking?: string;
    initialCourier?: string;
}

export default function ShipmentManager({ orderId, initialTracking, initialCourier }: Props) {
    const { addToast } = useToast();
    const [tracking, setTracking] = useState(initialTracking || '');
    const [courier, setCourier] = useState(initialCourier || '');
    const [isPending, setIsPending] = useState(false);

    const handleUpdate = async () => {
        setIsPending(true);
        try {
            const res = await updateOrderShipment(orderId, { tracking_number: tracking, courier });
            if ((res as any).error) throw new Error((res as any).error);
            addToast("Shipping details updated!", "success");
        } catch (err) {
            addToast("Failed to update shipping details", "error");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Shipping Details</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Add tracking and courier info</p>
                </div>
                <span className="text-lg">🚚</span>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1">Selected Courier</label>
                    <select 
                        value={courier} 
                        onChange={(e) => setCourier(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:ring-4 focus:ring-[#005d32]/5 transition-all"
                    >
                        <option value="">Select Courier</option>
                        <option value="Shiprocket">Shiprocket (Multi-Courier)</option>
                        <option value="Delhivery">Delhivery Direct</option>
                        <option value="BlueDart">BlueDart Express</option>
                        <option value="IndianPost">India Post</option>
                    </select>
                </div>

                <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block px-1">Tracking Number</label>
                    <input 
                        value={tracking}
                        onChange={(e) => setTracking(e.target.value)}
                        placeholder="Ex: AW129938810"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:ring-4 focus:ring-[#005d32]/5 placeholder:text-slate-300 transition-all font-mono"
                    />
                </div>

                <div className="pt-2">
                    <button 
                        onClick={handleUpdate}
                        disabled={isPending || !tracking || !courier}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#005d32] transition-all shadow-xl disabled:opacity-50 active:scale-95"
                    >
                        {isPending ? '⏳ Updating...' : '🚀 Save Shipping Info'}
                    </button>
                    <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-widest mt-4">Setting tracking info will auto-update status to "Shipped"</p>
                </div>
            </div>
        </div>
    );
}
