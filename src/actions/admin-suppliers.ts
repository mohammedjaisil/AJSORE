'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getSuppliers() {
    const { data, error } = await supabaseAdmin
        .from('suppliers')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching suppliers:', error);
        return [];
    }
    return data;
}

export async function createSupplier(formData: FormData) {
    const name = formData.get('name') as string;
    const contact_person = formData.get('contact_person') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const website = formData.get('website') as string;
    const address = formData.get('address') as string;

    const { error } = await supabaseAdmin
        .from('suppliers')
        .insert([{ name, contact_person, email, phone, website, address }]);

    if (error) throw new Error(error.message);
    
    revalidatePath('/admin/suppliers');
    return { success: true };
}

export async function deleteSupplier(id: string) {
    const { error } = await supabaseAdmin.from('suppliers').delete().eq('id', id);
    if (error) throw new Error(error.message);
    
    revalidatePath('/admin/suppliers');
    return { success: true };
}
