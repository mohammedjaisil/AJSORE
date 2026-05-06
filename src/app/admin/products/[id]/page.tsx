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
        category: product.category_name,
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Product</h2>
                <p className="text-gray-400 text-xs font-semibold mt-1">ID: {id.slice(0, 12)}...</p>
            </div>
            <ProductForm initialData={product} />
        </div>
    );
}
