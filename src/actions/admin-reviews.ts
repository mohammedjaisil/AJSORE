'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getReviews() {
    await requireAdmin();
    const { data, error } = await supabaseAdmin
        .from('reviews')
        .select('*, products(name)')
        .order('created_at', { ascending: false });

    if (error) return [];
    return data || [];
}

export async function deleteReview(id: string) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('reviews').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/reviews');
    return { success: true };
}

export async function toggleReviewApproval(id: string, isApproved: boolean) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('reviews').update({ is_verified: isApproved }).eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/reviews');
    return { success: true };
}

export async function replyToReview(id: string, reply: string) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('reviews').update({ admin_reply: reply }).eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/reviews');
    return { success: true };
}
