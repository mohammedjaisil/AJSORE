import React from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from 'next/navigation';
import { getSuppliers } from '@/actions/admin-suppliers';

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
    const [product, suppliers] = await Promise.all([
        getProductWithVariations(id),
        getSuppliers()
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-[22px] font-semibold text-[#1a1a1a] tracking-tight">Edit product</h1>
                <p className="text-sm text-[#6c6c6c]">Update information and sourcing for {product.name}</p>
            </div>
            <ProductForm initialData={product} suppliers={suppliers} />
        </div>
    );
}
