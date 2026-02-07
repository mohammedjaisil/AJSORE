import React, { Suspense } from 'react';
import { getProducts } from '@/actions/products';
import ShopContent from './ShopContent';

import Loading from '@/components/Loading';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <Suspense fallback={<Loading />}>
            <ShopContent products={products} />
        </Suspense>
    );
}
