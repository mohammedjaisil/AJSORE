'use server';

import { supabaseAdmin } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function updateInventory(updates: { id: string, stock: number }[]) {
    await requireAdmin();
    
    // We can't do a bulk update with different values easily in Supabase/PostgREST 
    // without a custom RPC or running multiple queries. 
    // For small batches, multiple queries are fine.
    
    const results = await Promise.all(updates.map(u => 
        supabaseAdmin.from('products').update({ stock: u.stock }).eq('id', u.id)
    ));

    const error = results.find(r => r.error);
    if (error) throw new Error("Some updates failed");

    revalidatePath('/admin/inventory');
    revalidatePath('/admin/products');
    return { success: true };
}
