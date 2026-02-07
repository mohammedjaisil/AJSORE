import React from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getProductWithVariations(id: string) {
    const { data: product } = await supabaseAdmin
        .from('products')
        .select(`
            *,
            product_variations (*)
        `)
        .eq('id', id)
        .single();

    if (!product) return null;

    return {
        ...product,
        category: product.category_name, // Mapping to form field
        oldPrice: product.old_price,
        variations: product.product_variations || []
    };
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductWithVariations(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Edit Product</h2>
            <ProductForm initialData={product} />
        </div>
    );
}
