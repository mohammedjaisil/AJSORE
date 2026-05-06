'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getSiteContent() {
    const { data } = await supabaseAdmin.from('settings').select('*').eq('key', 'homepage_content').single();
    return data?.value || {};
}

export async function updateSiteContent(content: any) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('settings').upsert({
        key: 'homepage_content',
        value: content,
        updated_at: new Date().toISOString()
    });

    if (error) {
        console.error('Supabase content update error:', error);
        return { error: error.message || "Failed to update content. Database might need 'settings' table." };
    }

    revalidatePath('/');
    revalidatePath('/admin/content');
    return { success: true };
}
