'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getCoupons() {
    await requireAdmin();
    const { data, error } = await supabaseAdmin.from('coupons').select('*').order('created_at', { ascending: false });
    if (error) return [];
    return data || [];
}

export async function createCoupon(formData: FormData) {
    await requireAdmin();
    const code = formData.get('code') as string;
    const type = formData.get('type') as 'PERCENT' | 'FIXED';
    const value = Number(formData.get('value'));
    const expiryDate = formData.get('expiry_date') as string;
    const usageLimit = Number(formData.get('usage_limit'));

    const { error } = await supabaseAdmin.from('coupons').insert({
        code: code.toUpperCase(),
        type,
        value,
        expiry_date: expiryDate || null,
        usage_limit: usageLimit || null,
        used_count: 0,
        is_active: true
    });

    if (error) {
        console.error(error);
        return { error: "Failed to create coupon. Database schema might need 'coupons' table." };
    }

    revalidatePath('/admin/coupons');
    return { success: true };
}

export async function deleteCoupon(id: string) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('coupons').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/coupons');
    return { success: true };
}

export async function toggleCoupon(id: string, isActive: boolean) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('coupons').update({ is_active: isActive }).eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/coupons');
    return { success: true };
}
