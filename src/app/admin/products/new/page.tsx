import React from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { getSuppliers } from '@/actions/admin-suppliers';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
    const suppliers = await getSuppliers();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-heading">Add product</h1>
                <p className="text-label mt-1">Define the details and sourcing for your new product.</p>
            </div>
            <ProductForm suppliers={suppliers} />
        </div>
    );
}
