'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, usePathname } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/lib/toast-store';

interface ShopContentProps {
    products: Product[];
}

const ShopContent: React.FC<ShopContentProps> = ({ products: initialProducts }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const q = searchParams.get('q') || '';
    const catParam = searchParams.get('cat') || '';
    const isDealsPage = pathname === '/deals';

    const [selectedCat, setSelectedCat] = useState('All');
    const [sort, setSort] = useState('newest');
    const [maxPrice, setMaxPrice] = useState(200000);
    const [minRating, setMinRating] = useState(0);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        setSelectedCat(sessionStorage.getItem('shop_cat') || 'All');
        setSort(sessionStorage.getItem('shop_sort') || 'newest');
        const price = sessionStorage.getItem('shop_price');
        if (price) setMaxPrice(Number(price));
        const rating = sessionStorage.getItem('shop_rating');
        if (rating) setMinRating(Number(rating));
    }, []);

    useEffect(() => {
        sessionStorage.setItem('shop_cat', selectedCat);
        sessionStorage.setItem('shop_sort', sort);
        sessionStorage.setItem('shop_price', maxPrice.toString());
        sessionStorage.setItem('shop_rating', minRating.toString());
        setPage(1); // Reset page on filter change
    }, [selectedCat, sort, maxPrice, minRating]);

    useEffect(() => {
        if (catParam) setSelectedCat(catParam);
    }, [catParam]);

    const filteredProducts = useMemo(() => {
        let result = initialProducts.filter(p => {
            const matchCat = selectedCat === 'All' || p.category === selectedCat;
            const matchQuery = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.category?.toLowerCase().includes(q.toLowerCase());
            const matchPrice = p.price <= maxPrice;
            const matchRating = p.rating >= minRating;
            const matchDeals = !isDealsPage || (p.oldPrice && p.oldPrice > p.price);
            return matchCat && matchQuery && matchPrice && matchRating && matchDeals;
        });

        if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
        else if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
        else if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
        else if (sort === 'bestselling') result = [...result].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        else if (sort === 'newest') result = [...result].reverse();

        return result;
    }, [selectedCat, sort, maxPrice, minRating, q, isDealsPage, initialProducts]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const clearFilters = () => {
        setSelectedCat('All');
        setMaxPrice(200000);
        setMinRating(0);
        setSort('newest');
    };

    const activeBtn = 'bg-black text-white shadow-xl shadow-black/10';
    const inactiveBtn = 'bg-white text-text-muted border border-gray-100 hover:border-black hover:text-black transition-all';

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                {/* Page Title & Breadcrumbs */}
                <div className="mb-16">
                    <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-black">Shop</span>
                    </nav>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-main uppercase">
                        {isDealsPage ? 'Exclusive Deals' : 'The Collection'}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 space-y-12 shrink-0">
                        {/* Categories */}
                        <div className="space-y-6">
                            <h4 className="text-[11px] font-bold uppercase text-black tracking-[0.2em] border-b border-gray-200 pb-4">Categories</h4>
                            <ul className="space-y-2">
                                <li>
                                    <button
                                        onClick={() => setSelectedCat('All')}
                                        className={`w-full text-left py-3 px-6 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${selectedCat === 'All' ? activeBtn : 'text-text-muted hover:bg-white hover:text-black'}`}
                                    >
                                        All Products
                                    </button>
                                </li>
                                {CATEGORIES.map(cat => (
                                    <li key={cat.name}>
                                        <button
                                            onClick={() => setSelectedCat(cat.name)}
                                            className={`w-full text-left py-3 px-6 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all ${selectedCat === cat.name ? activeBtn : 'text-text-muted hover:bg-white hover:text-black'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-8">
                            <h4 className="text-[11px] font-bold uppercase text-black tracking-[0.2em] border-b border-gray-200 pb-4">Price Range</h4>
                            <div className="px-2">
                                <input
                                    type="range"
                                    className="w-full accent-black h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                                    min="0" max="200000"
                                    step="1000"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                />
                                <div className="flex justify-between mt-4">
                                    <span className="text-[10px] font-bold text-text-muted">₹0</span>
                                    <span className="text-[10px] font-bold text-black uppercase">Under ₹{maxPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="space-y-6">
                            <h4 className="text-[11px] font-bold uppercase text-black tracking-[0.2em] border-b border-gray-200 pb-4">Minimum Rating</h4>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setMinRating(star === minRating ? 0 : star)}
                                        className={`w-10 h-10 rounded-full border text-[10px] font-bold transition-all ${minRating >= star ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-text-muted hover:border-black'}`}
                                    >
                                        {star}★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button 
                            onClick={clearFilters}
                            className="w-full py-4 rounded-full border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                        >
                            Reset Filters
                        </button>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-10">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200">
                            <p className="text-[11px] font-bold text-text-muted uppercase tracking-widest">
                                Showing {paginatedProducts.length} of {filteredProducts.length} results
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center bg-white rounded-full p-1 border border-gray-100">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-black text-white shadow-md' : 'text-text-muted hover:text-black'}`}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" /></svg>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-black text-white shadow-md' : 'text-text-muted hover:text-black'}`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                    </button>
                                </div>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="bg-transparent text-[11px] font-bold uppercase tracking-widest focus:outline-none cursor-pointer"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid/List */}
                        {filteredProducts.length > 0 ? (
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8' : 'space-y-6'}>
                                {paginatedProducts.map(product => (
                                    viewMode === 'grid' ? (
                                        <ProductCard key={product.id} product={product} />
                                    ) : (
                                        <ListProductCard key={product.id} product={product} />
                                    )
                                ))}
                            </div>
                        ) : (
                            <div className="py-40 text-center space-y-6 bg-white rounded-5xl border border-gray-50 shadow-sm">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-3xl">🔍</div>
                                <h3 className="text-2xl font-bold tracking-tight">No products found</h3>
                                <p className="text-text-muted text-sm max-w-xs mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
                                <button onClick={clearFilters} className="bg-black text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">Clear All Filters</button>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-3 pt-20">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-all disabled:opacity-30 disabled:hover:border-gray-200"
                                >
                                    ←
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                                    <button
                                        key={num}
                                        onClick={() => setPage(num)}
                                        className={`w-12 h-12 rounded-full text-xs font-bold transition-all ${page === num ? 'bg-black text-white' : 'hover:bg-white hover:border-black border border-transparent'}`}
                                    >
                                        {num}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-black transition-all disabled:opacity-30 disabled:hover:border-gray-200"
                                >
                                    →
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

const ListProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart, formatPrice } = useCartStore();
    const { addToast } = useToast();
    const isOutOfStock = product.stock <= 0;

    return (
        <div className="bg-white rounded-4xl p-6 flex gap-8 items-center border border-gray-50 hover:shadow-xl hover:shadow-black/5 transition-all group">
            <Link href={`/product/${product.id}`} className="w-48 h-48 rounded-3xl overflow-hidden bg-[#F9F9F9] shrink-0 relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </Link>
            <div className="flex-1 space-y-4">
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-accent-sage uppercase tracking-widest">{product.category}</p>
                    <Link href={`/product/${product.id}`}>
                        <h3 className="text-2xl font-bold tracking-tight text-text-main group-hover:text-accent-sage transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-text-muted text-sm line-clamp-2 max-w-xl">{product.description}</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-baseline gap-3">
                        <span className="text-xl font-bold">{formatPrice(product.price)}</span>
                        {product.oldPrice && <span className="text-sm text-text-muted line-through">{formatPrice(product.oldPrice)}</span>}
                    </div>
                    <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(Math.floor(product.rating || 5))}
                    </div>
                </div>
            </div>
            <button
                onClick={() => {
                    if (!isOutOfStock) {
                        addToCart(product);
                        addToast(`${product.name} added to cart!`, 'success');
                    }
                }}
                disabled={isOutOfStock}
                className="bg-black text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all disabled:bg-gray-100 disabled:text-gray-400"
            >
                {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ShopContent;
