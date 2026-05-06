'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getSiteSettings() {
    const { data } = await supabaseAdmin.from('settings').select('*').eq('key', 'site_settings').single();
    return data?.value || {};
}

export async function updateSiteSettings(settings: any) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('settings').upsert({
        key: 'site_settings',
        value: settings,
        updated_at: new Date().toISOString()
    });

    if (error) {
        console.error('Supabase settings update error:', error);
        return { error: error.message || "Failed to update settings." };
    }

    revalidatePath('/');
    return { success: true };
}
