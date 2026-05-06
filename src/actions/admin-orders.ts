'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export type OrderStatus = 'Pending' | 'Paid' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';

export async function getOrders(filter?: { fulfillment?: string, status?: string }) {
    await requireAdmin();
    let query = supabaseAdmin
        .from('orders')
        .select('*');

    if (filter?.fulfillment && filter.fulfillment !== 'all') {
        const val = filter.fulfillment.toUpperCase();
        query = query.eq('fulfillment_status', val);
    }
    
    if (filter?.status && filter.status !== 'all') {
        const validStatuses: string[] = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];
        // Prevent Postgres "invalid input for enum" errors when arbitrary status filters are passed
        if (!validStatuses.includes(filter.status)) {
            // These statuses don't exist in the DB enum yet, return empty list
            return [];
        }
        query = query.eq('status', filter.status);
    }

    try {
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) {
            console.error("getOrders Error Details:", {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint
            });
            return [];
        }
        return data || [];
    } catch (e) {
        console.error("getOrders unexpected error:", e);
        return [];
    }
}

export async function markAsFulfilled(orderId: string) {
    await requireAdmin();
    const { error } = await supabaseAdmin
        .from('orders')
        .update({ 
            fulfillment_status: 'FULFILLED', 
            status: 'Processing',
            updated_at: new Date().toISOString() 
        })
        .eq('id', orderId);

    if (error) throw error;
    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    await requireAdmin();
    const { error } = await supabaseAdmin
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);

    if (error) throw error;
    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
}

export async function updateOrderShipment(orderId: string, details: { tracking_number?: string, courier?: string }) {
    await requireAdmin();
    const { error } = await supabaseAdmin
        .from('orders')
        .update({ 
            ...details, 
            status: 'Shipped',
            shipped_at: new Date().toISOString(),
            updated_at: new Date().toISOString() 
        })
        .eq('id', orderId);

    if (error) throw error;
    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${orderId}`);
    return { success: true };
}

export async function updateOrderDates(orderId: string, type: 'shipped' | 'delivered', date: string | null) {
    await requireAdmin();
    const column = type === 'shipped' ? 'shipped_at' : 'delivered_at';
    const { error } = await supabaseAdmin
        .from('orders')
        .update({ [column]: date, updated_at: new Date().toISOString() })
        .eq('id', orderId);

    if (error) throw error;
    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath('/account');
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

export async function cancelOrder(orderId: string) {
    return updateOrderStatus(orderId, 'Cancelled');
}

export async function refundOrder(orderId: string) {
    return updateOrderStatus(orderId, 'Refunded');
}

export async function bulkUpdateShipmentStatus(orderIds: string[], status: OrderStatus) {
    await requireAdmin();
    const { error } = await supabaseAdmin
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .in('id', orderIds);

    if (error) throw error;
    revalidatePath('/admin/orders');
    return { success: true };
}
