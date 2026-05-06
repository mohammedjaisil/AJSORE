'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getNotifications() {
    await requireAdmin();
    const { data } = await supabaseAdmin
        .from('admin_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
    return data || [];
}

export async function markAsRead(id: string) {
    await requireAdmin();
    await supabaseAdmin.from('admin_notifications').update({ is_read: true }).eq('id', id);
    revalidatePath('/admin');
    return { success: true };
}

export async function createAdminNotification(title: string, message: string, type: 'Order' | 'Payment' | 'Stock' | 'System') {
    // This can be called from other actions (e.g. order creation)
    await supabaseAdmin.from('admin_notifications').insert({
        title,
        message,
        type,
        is_read: false,
        created_at: new Date().toISOString()
    });
}
