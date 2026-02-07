import React from 'react';
import { getProductById, getProducts } from '@/actions/products';
import ProductDetailsContent from './ProductDetailsContent';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate every hour


export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    const allProducts = await getProducts();
    const related = allProducts.filter(p => p.id !== id).slice(0, 4);

    return (
        <ProductDetailsContent product={product as any} related={related as any} />
    );
}
