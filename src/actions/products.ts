'use server';

import { supabase } from '@/lib/supabase';
import { PRODUCTS } from '@/lib/constants';

function mapProduct(item: any) {
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: Number(item.price),
        oldPrice: item.old_price ? Number(item.old_price) : undefined,
        stock: item.stock,
        image: item.image,
        secondaryImage: item.secondary_image,
        category: item.category_name,
        rating: Number(item.rating),
        reviews: item.reviews_count,
        features: item.features,
        colors: item.colors,
        isFeatured: item.is_featured,
        type: item.type || 'SIMPLE',
    };
}

export async function getProducts() {
    try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        if (!data || data.length === 0) return PRODUCTS;

        return data.map(mapProduct);
    } catch (error) {
        console.warn('Database fetch failed, falling back to constants:', error);
        return PRODUCTS;
    }
}

export async function getProductById(id: number | string) {
    try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (error) {
            // If UUID is invalid (e.g. dummy ID '1'), Supabase throws invalid input syntax for uuid usually.
            // Or just returns error. We fallback.
            throw error;
        }
        if (!data) return PRODUCTS.find(p => p.id.toString() === id.toString());

        return mapProduct(data);
    } catch (error) {
        return PRODUCTS.find(p => p.id.toString() === id.toString());
    }
}
