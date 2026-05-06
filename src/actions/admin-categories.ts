'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getCategories() {
    await requireAdmin();
    const { data, error } = await supabaseAdmin
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
}

export async function createCategory(formData: FormData) {
    await requireAdmin();
    
    const name = formData.get('name') as string;
    const icon = formData.get('icon') as string;
    const slug = formData.get('slug') as string || name.toLowerCase().replace(/ /g, '-');
    const image = formData.get('image') as string;
    const description = formData.get('description') as string;
    const parent_id = formData.get('parent_id') as string || null;
    const bgColor = formData.get('bg_color') as string;

    const { data, error } = await supabaseAdmin.from('categories').insert({
        name,
        slug,
        icon: icon || '📁',
        image,
        description,
        parent_id,
        bg_color: bgColor || '#fafafa'
    }).select().single();

    if (error) {
        console.error("Create Category Error:", error);
        return { error: "Failed to create category. Database might be missing columns like 'image' or 'parent_id'." };
    }

    revalidatePath('/admin/categories');
    return { success: true, data };
}

export async function updateCategory(id: string, formData: FormData) {
    await requireAdmin();
    
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const icon = formData.get('icon') as string;
    const image = formData.get('image') as string;
    const description = formData.get('description') as string;
    const parent_id = formData.get('parent_id') as string || null;
    const bgColor = formData.get('bg_color') as string;

    const { error } = await supabaseAdmin.from('categories').update({
        name,
        slug,
        icon,
        image,
        description,
        parent_id,
        bg_color: bgColor
    }).eq('id', id);

    if (error) {
        console.error("Update Category Error:", error);
        return { error: "Failed to update category." };
    }

    revalidatePath('/admin/categories');
    return { success: true };
}

export async function deleteCategory(id: string) {
    await requireAdmin();
    const { error } = await supabaseAdmin.from('categories').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/categories');
    return { success: true };
}
