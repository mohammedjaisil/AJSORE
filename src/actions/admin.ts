'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";

export async function getAdminStats() {
    await requireAdmin();

    try {
        const { count: usersCount } = await supabaseAdmin.from('users').select('*', { count: 'exact', head: true });
        const { count: productsCount } = await supabaseAdmin.from('products').select('*', { count: 'exact', head: true });
        const { count: ordersCount } = await supabaseAdmin.from('orders').select('*', { count: 'exact', head: true });

        // Fetch low stock items
        const { data: lowStockProducts } = await supabaseAdmin.from('products').select('*').lt('stock', 10).order('stock', { ascending: true }).limit(5);

        // Revenue & Pending
        const { data: allOrders } = await supabaseAdmin.from('orders').select('total, status, created_at');
        const totalRevenue = allOrders?.reduce((acc, order) => acc + (Number(order.total) || 0), 0) || 0;
        const pendingOrders = allOrders?.filter(o => o.status === 'Pending' || o.status === 'Processing').length || 0;

        // Sales Today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const salesToday = allOrders?.filter(o => new Date(o.created_at) >= startOfToday).reduce((acc, o) => acc + Number(o.total), 0) || 0;

        // Sales History (Last 7 Days)
        const salesHistory = Array.from({ length: 7 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            date.setHours(0, 0, 0, 0);
            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const daySales = allOrders?.filter(o => {
                const od = new Date(o.created_at);
                return od >= date && od < nextDate;
            }).reduce((acc, o) => acc + Number(o.total), 0) || 0;

            return {
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                sales: daySales
            };
        });

        // Top Products (by name/occurrence in order logs if we had them, using stock/price as proxy for demo for now)
        const { data: topProducts } = await supabaseAdmin.from('products').select('*').order('stock', { ascending: false }).limit(4);

        // Recent orders
        const { data: recentOrders } = await supabaseAdmin
            .from('orders')
            .select('id, user_email, total, status, created_at')
            .order('created_at', { ascending: false })
            .limit(10);

        return {
            usersCount: usersCount || 0,
            productsCount: productsCount || 0,
            ordersCount: ordersCount || 0,
            totalRevenue,
            pendingOrders,
            salesToday,
            salesHistory,
            lowStockProducts: lowStockProducts || [],
            recentOrders: recentOrders || [],
            topProducts: topProducts || [],
            traffic: 1240 // Mocked for UI
        };
    } catch (error) {
        console.error("Admin Stats Error:", error);
        return {
            usersCount: 0, productsCount: 0, ordersCount: 0, totalRevenue: 0, pendingOrders: 0, salesToday: 0, salesHistory: [], lowStockProducts: [], recentOrders: [], topProducts: [], traffic: 0
        };
    }
}
