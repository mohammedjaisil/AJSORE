'use client';

import React, { useState } from 'react';
import { updateOrderDates } from '@/actions/admin-orders';
import { useToast } from '@/lib/toast-store';

interface Props {
    orderId: string;
    shippedAt?: string | null;
    deliveredAt?: string | null;
}

export default function OrderDateManager({ orderId, shippedAt, deliveredAt }: Props) {
    const { addToast } = useToast();
    const [loading, setLoading] = useState<string | null>(null);

    const handleDateChange = async (type: 'shipped' | 'delivered', value: string) => {
        setLoading(type);
        try {
            const dateValue = value ? new Date(value).toISOString() : null;
            await updateOrderDates(orderId, type, dateValue);
            addToast(`${type.charAt(0).toUpperCase() + type.slice(1)} date updated`, 'success');
        } catch (error) {
            addToast(`Failed to update ${type} date`, 'error');
        } finally {
            setLoading(null);
        }
    };

    const formatDateForInput = (dateStr?: string | null) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().split('T')[0];
    };

    return (
        <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 mt-4">
            <div className="flex items-center justify-between gap-4">
                <label className="text-xs font-bold text-gray-500 whitespace-nowrap">Shipped Date:</label>
                <input
                    type="date"
                    disabled={loading === 'shipped'}
                    defaultValue={formatDateForInput(shippedAt)}
                    onChange={(e) => handleDateChange('shipped', e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl text-xs py-1.5 px-3 font-semibold text-gray-600 outline-none focus:ring-4 focus:ring-[#005d32]/10 focus:border-[#005d32] transition-all disabled:opacity-50 cursor-pointer"
                />
            </div>
            <div className="flex items-center justify-between gap-4">
                <label className="text-xs font-bold text-gray-500 whitespace-nowrap">Delivered Date:</label>
                <input
                    type="date"
                    disabled={loading === 'delivered'}
                    defaultValue={formatDateForInput(deliveredAt)}
                    onChange={(e) => handleDateChange('delivered', e.target.value)}
                    className="bg-white border border-gray-200 rounded-xl text-xs py-1.5 px-3 font-semibold text-gray-600 outline-none focus:ring-4 focus:ring-[#005d32]/10 focus:border-[#005d32] transition-all disabled:opacity-50 cursor-pointer"
                />
            </div>
        </div>
    );
}
