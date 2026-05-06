'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";

export async function getSalesReport(range: '7d' | '30d' | 'all' = '30d') {
    await requireAdmin();
    
    let query = supabaseAdmin.from('orders').select('total, created_at, status');
    
    if (range === '7d') {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        query = query.gte('created_at', date.toISOString());
    } else if (range === '30d') {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        query = query.gte('created_at', date.toISOString());
    }

    const { data: orders } = await query;
    if (!orders) return { totalSales: 0, count: 0, daily: [] };

    const totalSales = orders.reduce((acc, o) => acc + Number(o.total), 0);
    
    // Group by date
    const dailyData = orders.reduce((acc: any, o) => {
        const date = new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        acc[date] = (acc[date] || 0) + Number(o.total);
        return acc;
    }, {});

    return {
        totalSales,
        count: orders.length,
        daily: Object.entries(dailyData).map(([date, sales]) => ({ date, sales }))
    };
}

export async function getProductPerformance() {
    await requireAdmin();
    const { data: items } = await supabaseAdmin.from('order_items').select('product_name, quantity, price');
    if (!items) return [];

    const performance = items.reduce((acc: any, item) => {
        if (!acc[item.product_name]) {
            acc[item.product_name] = { name: item.product_name, units: 0, revenue: 0 };
        }
        acc[item.product_name].units += item.quantity;
        acc[item.product_name].revenue += item.quantity * Number(item.price);
        return acc;
    }, {});

    return Object.values(performance).sort((a: any, b: any) => b.revenue - a.revenue);
}

export async function getRefundReport() {
    await requireAdmin();
    const { data: refunds } = await supabaseAdmin.from('orders').select('total, created_at').eq('status', 'Refunded');
    return refunds || [];
}
