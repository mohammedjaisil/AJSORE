
'use server';

import { supabaseAdmin } from "@/lib/supabase";

export async function liveSearch(query: string) {
    if (!query || query.length < 2) return [];

    // Search in products table
    const { data: products, error: pError } = await supabaseAdmin
        .from('products')
        .select('id, name, image, category_name, price, sku')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category_name.ilike.%${query}%,sku.ilike.%${query}%`)
        .limit(10);

    // Filter results or fetch categories if needed
    // For now, products search is high priority.

    if (pError) {
        console.error('Search error:', pError);
        return [];
    }

    return products || [];
}
