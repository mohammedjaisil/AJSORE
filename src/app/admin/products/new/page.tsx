import React from 'react';
import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Add New Product</h2>
            <ProductForm />
        </div>
    );
}
