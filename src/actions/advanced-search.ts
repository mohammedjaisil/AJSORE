
'use server';

import { supabaseAdmin } from "@/lib/supabase";

export async function advancedSearch({
    query,
    category,
    minPrice,
    maxPrice,
    sort = 'relevance'
}: {
    query: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
}) {
    let q = supabaseAdmin.from('products').select('*');

    if (query) {
        q = q.or(`name.ilike.%${query}%,description.ilike.%${query}%,category_name.ilike.%${query}%,sku.ilike.%${query}%`);
    }

    if (category && category !== 'All') {
        q = q.eq('category_name', category);
    }

    if (minPrice !== undefined) q = q.gte('price', minPrice);
    if (maxPrice !== undefined) q = q.lte('price', maxPrice);

    if (sort === 'price-low') q = q.order('price', { ascending: true });
    else if (sort === 'price-high') q = q.order('price', { ascending: false });
    else if (sort === 'rating') q = q.order('rating', { ascending: false });
    else q = q.order('created_at', { ascending: false });

    const { data, error } = await q.limit(40);
    if (error) throw error;
    return data || [];
}
