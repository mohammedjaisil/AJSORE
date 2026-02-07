'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";

export async function getAdminStats() {
    await requireAdmin();

    try {
        const { count: usersCount, error: usersError } = await supabaseAdmin.from('users').select('*', { count: 'exact', head: true });
        const { count: productsCount, error: prodsError } = await supabaseAdmin.from('products').select('*', { count: 'exact', head: true });
        const { count: ordersCount, error: ordersError } = await supabaseAdmin.from('orders').select('*', { count: 'exact', head: true });

        // Fetch low stock items
        const { data: lowStockProducts } = await supabaseAdmin.from('products').select('*').lt('stock', 5).limit(5);

        // Calculate revenue
        const { data: revenueData } = await supabaseAdmin.from('orders').select('total');
        const totalRevenue = revenueData?.reduce((acc, order) => acc + (Number(order.total) || 0), 0) || 0;

        // Recent orders
        const { data: recentOrders } = await supabaseAdmin
            .from('orders')
            .select('id, user_email, total, status, created_at')
            .order('created_at', { ascending: false })
            .limit(5);

        return {
            usersCount: usersCount || 0,
            productsCount: productsCount || 0,
            ordersCount: ordersCount || 0,
            totalRevenue,
            lowStockProducts: lowStockProducts || [],
            recentOrders: recentOrders || []
        };
    } catch (error) {
        console.error("Admin Stats Error:", error);
        return {
            usersCount: 0, productsCount: 0, ordersCount: 0, totalRevenue: 0, lowStockProducts: [], recentOrders: []
        };
    }
}
