'use client';

import React, { useTransition } from 'react';
import { updateOrderStatus } from '@/actions/admin-orders';
import { useToast } from '@/lib/toast-store';

interface Props {
    orderId: string;
    currentStatus: string;
}

export default function OrderStatusSelect({ orderId, currentStatus }: Props) {
    const { addToast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as any;
        startTransition(async () => {
            try {
                const res = await updateOrderStatus(orderId, newStatus);
                if ((res as any)?.error) {
                    addToast((res as any).error, "error");
                } else {
                    addToast(`Order updated to ${newStatus}`, "success");
                }
            } catch (err) {
                addToast("Failed to update status", "error");
            }
        });
    };

    const statusColors: Record<string, string> = {
        'Processing': 'text-amber-600 bg-amber-50',
        'Shipped': 'text-blue-600 bg-blue-50',
        'Delivered': 'text-emerald-600 bg-emerald-50',
        'Cancelled': 'text-red-600 bg-red-50',
    };

    return (
        <select
            value={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer transition-all disabled:opacity-50 ${statusColors[currentStatus] || 'text-gray-600 bg-gray-50'}`}
        >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
        </select>
    );
}
