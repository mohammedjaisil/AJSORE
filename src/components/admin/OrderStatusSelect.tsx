'use client';

import React, { useTransition } from 'react';
import { updateOrderStatus, OrderStatus } from '@/actions/admin-orders';
import { useToast } from '@/lib/toast-store';

interface Props {
    orderId: string;
    currentStatus: string;
}

export default function OrderStatusSelect({ orderId, currentStatus }: Props) {
    const { addToast } = useToast();
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as OrderStatus;
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
        'Pending': 'text-gray-500 bg-gray-50 border-gray-100',
        'Paid': 'text-indigo-600 bg-indigo-50 border-indigo-100',
        'Processing': 'text-amber-600 bg-amber-50 border-amber-100',
        'Shipped': 'text-blue-600 bg-blue-50 border-blue-100',
        'Delivered': 'text-emerald-600 bg-emerald-50 border-emerald-100',
        'Cancelled': 'text-red-600 bg-red-50 border-red-100',
        'Refunded': 'text-purple-600 bg-purple-50 border-purple-100',
    };

    return (
        <select
            value={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className={`px-5 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all disabled:opacity-50 outline-none border focus:ring-4 focus:ring-[#005d32]/10 h-10 ${statusColors[currentStatus] || 'text-gray-600 bg-gray-50 border-gray-200'}`}
        >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Refunded">Refunded</option>
        </select>
    );
}
