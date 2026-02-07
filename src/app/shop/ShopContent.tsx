'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { CATEGORIES } from '@/lib/constants'; // Can be passed as prop too if dynamic

interface ShopContentProps {
    products: Product[];
}

const ShopContent: React.FC<ShopContentProps> = ({ products: initialProducts }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const q = searchParams.get('q') || '';
    const catParam = searchParams.get('cat') || '';
    const isDealsPage = pathname === '/deals';

    // Persistent filters using sessionStorage
    const [selectedCat, setSelectedCat] = useState('All');
    const [sort, setSort] = useState('newest');
    const [maxPrice, setMaxPrice] = useState(2000);
    const [minRating, setMinRating] = useState(0);

    // Initialize state from sessionStorage on mount
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
    }, [selectedCat, sort, maxPrice, minRating]);

    // Sync category if URL parameter is present
    useEffect(() => {
        if (catParam) {
            setSelectedCat(catParam);
        }
    }, [catParam]);

    const filteredProducts = useMemo(() => {
        let result = initialProducts.filter(p => {
            const matchCat = selectedCat === 'All' || p.category === selectedCat;
            const matchQuery = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.category && p.category.toLowerCase().includes(q.toLowerCase());
            const matchPrice = p.price <= maxPrice;
            const matchRating = p.rating >= minRating;
            const matchDeals = !isDealsPage || (p.oldPrice && p.oldPrice > p.price);
            return matchCat && matchQuery && matchPrice && matchRating && matchDeals;
        });

        if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
        else if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
        else if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
        else if (sort === 'newest') result = [...result].reverse(); // Assuming initial is typically oldest first or DB order

        return result;
    }, [selectedCat, sort, maxPrice, minRating, q, isDealsPage, initialProducts]);

    const clearFilters = () => {
        setSelectedCat('All');
        setMaxPrice(2000);
        setMinRating(0);
        setSort('newest');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 flex flex-col lg:flex-row gap-12 animate-in fade-in duration-700">
            {/* Mobile Category Scroller */}
            <div className="lg:hidden -mx-4 px-4 overflow-x-auto hide-scrollbar flex gap-3 pb-2">
                <button
                    onClick={() => setSelectedCat('All')}
                    className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCat === 'All' ? 'bg-[#005d32] text-white shadow-lg' : 'bg-gray-100 text-gray-500'}`}
                >
                    All
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.name}
                        onClick={() => setSelectedCat(cat.name)}
                        className={`whitespace-nowrap px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCat === cat.name ? 'bg-[#005d32] text-white shadow-lg shadow-[#005d32]/10' : 'bg-gray-100 text-gray-500'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Sidebar Filters (Hidden on Mobile) */}
            <aside className="hidden lg:block w-full lg:w-64 space-y-10 shrink-0">

                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h3 className="font-black text-lg tracking-tight uppercase">Filters</h3>
                    <button onClick={clearFilters} className="text-[10px] font-black text-[#005d32] uppercase hover:underline transition-all">Clear All</button>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-[10px] uppercase text-gray-400 tracking-[0.2em]">Categories</h4>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setSelectedCat('All')}
                                className={`w-full text-left py-2 px-4 rounded-xl text-sm font-black transition-all ${selectedCat === 'All' ? 'bg-[#005d32] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                All Products
                            </button>
                        </li>
                        {CATEGORIES.map(cat => (
                            <li key={cat.name}>
                                <button
                                    onClick={() => setSelectedCat(cat.name)}
                                    className={`w-full text-left py-2 px-4 rounded-xl text-sm font-black transition-all ${selectedCat === cat.name ? 'bg-[#005d32] text-white shadow-lg shadow-[#005d32]/10' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-[10px] uppercase text-gray-400 tracking-[0.2em]">Price Cap (${maxPrice})</h4>
                    <input
                        type="range"
                        className="w-full accent-[#005d32] h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer"
                        min="0" max="2000"
                        step="50"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                    <div className="flex justify-between text-[10px] font-black text-gray-300 uppercase tracking-widest">
                        <span>$0</span>
                        <span>$2000+</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold text-[10px] uppercase text-gray-400 tracking-[0.2em]">Quality Score</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                onClick={() => setMinRating(star)}
                                className={`py-2 rounded-xl border-2 text-[10px] font-black transition-all ${minRating >= star ? 'bg-[#005d32] border-[#005d32] text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                            >
                                {star}★
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Main Grid */}
            <main className="flex-1 space-y-6 md:space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter uppercase">
                            {isDealsPage ? 'Exclusive Deals' : q ? `Search: "${q}"` : selectedCat === 'All' ? 'Full Collection' : selectedCat}
                        </h2>
                        <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {filteredProducts.length} Premium drops found
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-gray-50 border border-transparent rounded-xl md:rounded-2xl px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-xs font-black text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#005d32]/10 transition-all cursor-pointer uppercase tracking-widest"
                        >
                            <option value="newest">Sort: Newest</option>
                            <option value="price-low">Price: Low-High</option>
                            <option value="price-high">Price: High-Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>


                {filteredProducts.length === 0 && (
                    <div className="text-center py-40 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-200">
                        <div className="text-6xl mb-6 grayscale">📦</div>
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">No Matches Found</h3>
                        <p className="text-gray-400 font-medium max-w-xs mx-auto mt-2">Try adjusting your filters or checking back for our next tech drop.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-8 bg-[#005d32] text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#005d32]/20"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ShopContent;
