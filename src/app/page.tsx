import React from 'react';
import { getProducts } from '@/actions/products';
import HomeClient from './HomeClient';

export const revalidate = 3600; // Revalidate every hour


export default async function Home() {
    const products = await getProducts();

    return (
        <HomeClient featuredProducts={products} />
    );
}
