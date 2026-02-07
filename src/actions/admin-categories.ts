'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getCategories() {
    await requireAdmin();
    const { data, error } = await supabaseAdmin
        .from('categories')
        .select('*')
        .order('name');

    if (error) throw error;
    return data || [];
}

export async function createCategory(name: string, icon?: string, bgColor?: string) {
    await requireAdmin();
    const slug = name.toLowerCase().replace(/ /g, '-');
    const { error } = await supabaseAdmin
        .from('categories')
        .insert({ name, slug, icon, bg_color: bgColor });

    if (error) throw error;
    revalidatePath('/admin/settings');
    return { success: true };
}

export async function deleteCategory(id: string) {
    await requireAdmin();
    const { error } = await supabaseAdmin
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/settings');
    return { success: true };
}
