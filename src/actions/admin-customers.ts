'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function getCustomers() {
    await requireAdmin();
    const { data, error } = await supabaseAdmin
        .from('users')
        .select(`
            id,
            name,
            email,
            image,
            role,
            created_at,
            orders (count)
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

import bcrypt from "bcryptjs";

export async function createCustomer(formData: FormData) {
    await requireAdmin();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const role = formData.get('role') as string;

    if (!email || !password) return { error: "Email and password are required" };

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = await supabaseAdmin
        .from('users')
        .insert({
            email,
            password: hashedPassword,
            name: name || email.split('@')[0],
            role: role || 'USER',
            image: `https://i.pravatar.cc/150?u=${email}`
        });

    if (error) {
        console.error("Create User Error:", error);
        return { error: error.message || "Failed to create user" };
    }

    revalidatePath('/admin/customers');
    return { success: true };
}

export async function updateCustomer(id: string, formData: FormData) {
    await requireAdmin();

    const role = formData.get('role') as string;
    const name = formData.get('name') as string;

    const { error } = await supabaseAdmin
        .from('users')
        .update({ role, name })
        .eq('id', id);

    if (error) {
        console.error("Update User Error:", error);
        return { error: "Failed to update user" };
    }

    revalidatePath('/admin/customers');
    return { success: true };
}

export async function deleteCustomer(id: string) {
    await requireAdmin();

    const { error } = await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', id);

    if (error) {
        console.error("Delete User Error:", error);
        return { error: "Failed to delete user" };
    }

    revalidatePath('/admin/customers');
    return { success: true };
}
