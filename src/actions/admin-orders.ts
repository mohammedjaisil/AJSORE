'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getOrders() {
    await requireAdmin();
    const { data, error } = await supabaseAdmin
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function updateOrderStatus(orderId: string, status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled') {
    await requireAdmin();
    const { error } = await supabaseAdmin
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

    if (error) throw error;
    revalidatePath('/admin/orders');
    return { success: true };
}

export async function getOrderWithItems(orderId: string) {
    await requireAdmin();
    const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

    if (orderError) throw orderError;

    const { data: items, error: itemsError } = await supabaseAdmin
        .from('order_items')
        .select('*')
        .eq('order_id', orderId);

    if (itemsError) throw itemsError;

    return { ...order, items: items || [] };
}
