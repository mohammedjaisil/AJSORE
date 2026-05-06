'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

interface HomeClientProps {
    featuredProducts: Product[];
}

// Hook: Lenis-compatible scroll-triggered reveal using IntersectionObserver
function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

const HomeClient: React.FC<HomeClientProps> = ({ featuredProducts }) => {
    const { formatPrice } = useCartStore();
    useScrollReveal();

    const reviewsRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState('Featured');
    const categories = ['Featured', ...Array.from(new Set(featuredProducts.map(p => p.category)))];
    const filteredProducts = activeTab === 'Featured' ? featuredProducts.slice(0, 4) : featuredProducts.filter(p => p.category === activeTab);

    const scrollReviews = (direction: 'left' | 'right') => {
        if (reviewsRef.current) {
            const container = reviewsRef.current;
            const scrollAmount = container.offsetWidth * 0.9;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const reviews = [
        { name: 'Rahul Sharma', city: 'Mumbai', rating: 5, text: 'Amazing quality! Delivered in 4 days, packaging was top-notch. Will definitely buy again!' },
        { name: 'Priya Patel', city: 'Ahmedabad', rating: 5, text: "Best earbuds I've ever used. Sound quality is outstanding and the support team was very helpful." },
        { name: 'Arjun Singh', city: 'Delhi', rating: 5, text: 'Ordered the laptop and got it faster than expected. Build quality is excellent. Highly recommend!' },
        { name: 'Meera Nair', city: 'Bangalore', rating: 5, text: 'Great prices compared to other sites. The product is exactly as described. Very satisfied!' },
        { name: 'Vikram Reddy', city: 'Hyderabad', rating: 5, text: 'Superb experience from ordering to delivery. Product is premium quality. 5 stars!' },
    ];

    return (
        <div className="pb-20 overflow-hidden bg-[#F9F9F9]">
            {/* 1. HERO SECTION */}
            <section className="px-4 md:px-8 pt-1 max-w-[1600px] mx-auto reveal">
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-[3rem] overflow-hidden group">
                    <Image
                        src="/hero_editorial.png"
                        alt="Summer Arrival"
                        fill
                        priority
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
                        <h1 className="text-white text-5xl md:text-[6.5rem] font-bold tracking-tighter mb-4 md:mb-2 drop-shadow-2xl uppercase max-w-[1200px] leading-[0.8]">
                            Summer Arrival of Outfit
                        </h1>
                        <p className="text-white text-xs md:text-[11px] font-bold uppercase tracking-[0.4em] max-w-lg mb-8 md:mb-12 leading-relaxed">
                            Discover our latest collection for your stylish and vibrant summer wardrobe.
                        </p>
                        <Link href="/shop" className="group flex items-center gap-4 bg-white text-black pl-8 pr-3 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500 shadow-2xl">
                            Explore Product
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. SUB BANNERS */}
            <section className="px-4 md:px-8 py-8 md:py-12 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
                <div className="relative aspect-[16/8] rounded-[3rem] overflow-hidden group">
                    <Image src="/banner_couture.png" alt="Couture" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[300px] leading-tight mb-6 md:mb-8 uppercase tracking-tighter">Where dreams meet couture</h2>
                        <button className="w-fit bg-white text-black px-10 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">Shop Now</button>
                    </div>
                </div>
                <div className="relative aspect-[16/8] rounded-[3rem] overflow-hidden group">
                    <Image src="/banner_women.png" alt="Styles" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white max-w-[300px] leading-tight mb-6 md:mb-8 uppercase tracking-tighter">Enchanting styles for every woman</h2>
                        <button className="w-fit bg-white text-black px-10 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">Shop Now</button>
                    </div>
                </div>
            </section>

            {/* 3. POPULAR PRODUCTS */}
            <section className="px-4 md:px-8 py-20 max-w-[1600px] mx-auto reveal">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-black">Popular products</h2>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
                        {['ALL', 'SHORTS', 'JACKETS', 'SHOES', 'T-SHIRT'].map(filter => (
                            <button
                                key={filter}
                                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                                    filter === 'ALL' ? 'bg-black text-white' : 'bg-white text-black border border-gray-100 hover:border-black'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.slice(0, 7).map((product, index) => (
                        <div key={product.id} className={`${index === 1 ? 'md:col-span-2' : ''}`}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. EXCLUSIVE OFFERS BANNER */}
            <section className="px-4 md:px-8 py-12 max-w-[1600px] mx-auto reveal">
                <div className="relative h-[300px] md:h-[400px] bg-[#E5CDC5] rounded-[3rem] overflow-hidden flex flex-col items-center justify-center text-center p-8">
                    <div className="absolute top-8 px-6 py-1.5 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest">Offers</div>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-black max-w-2xl leading-tight mb-8 uppercase">
                        EXCLUSIVE FASHION OFFERS AWAIT FOR YOUR
                    </h2>
                    <button className="group flex items-center gap-3 bg-white px-8 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">
                        CHECK IT NOW
                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </div>
                    </button>
                </div>
            </section>

            {/* 5. CUSTOMER REVIEWS (6 Circles Layout) */}
            <section className="px-4 md:px-8 py-20 max-w-[1600px] mx-auto text-center overflow-hidden reveal">
                <h2 className="text-3xl md:text-6xl font-normal tracking-tight text-black mb-16 leading-tight max-w-5xl mx-auto">
                    Over 350+ Customer <br/> reviews form our client
                </h2>
                <div className="relative h-[400px] md:h-[550px] flex items-center justify-center">
                    <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-7xl">
                        {/* Left Side Group */}
                        <div className="flex flex-col gap-8 -mt-12">
                            <div className="w-24 h-24 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-xl rotate-[-10deg]">
                                <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600" alt="Reviewer" fill className="object-cover" />
                            </div>
                            <div className="w-28 h-28 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-white shadow-xl translate-x-4">
                                <Image src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600" alt="Reviewer" fill className="object-cover" />
                            </div>
                        </div>

                        {/* Center Left */}
                        <div className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white shadow-2xl relative z-10 scale-110 -mx-4 md:-mx-8">
                            <Image src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=800" alt="Reviewer" fill className="object-cover" />
                        </div>

                        {/* Center Right */}
                        <div className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white shadow-2xl relative z-10 -mx-4 md:-mx-8">
                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800" alt="Reviewer" fill className="object-cover" />
                        </div>

                        {/* Right Side Group */}
                        <div className="flex flex-col gap-8 mt-12">
                            <div className="w-24 h-24 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white shadow-xl rotate-[10deg]">
                                <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600" alt="Reviewer" fill className="object-cover" />
                            </div>
                            <div className="w-28 h-28 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-white shadow-xl -translate-x-4">
                                <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600" alt="Reviewer" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. YOU MIGHT ALSO LIKE */}
            <section className="px-4 md:px-8 py-20 max-w-[1600px] mx-auto reveal">
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-black text-center mb-16">You might also like</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.slice(7, 11).map((product) => (
                        <ProductCard key={product.id} product={product} showDetails />
                    ))}
                </div>
            </section>

            {/* 7. NEWSLETTER */}
            <section className="px-4 md:px-8 py-12 max-w-[1600px] mx-auto reveal">
                <div className="bg-[#94A37D] rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white max-w-md leading-tight uppercase tracking-tight">
                        STAY UPTO DATE ABOUT OUR LATEST OFFERS
                    </h2>
                    <div className="w-full max-w-md space-y-4">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email here"
                                className="w-full bg-white rounded-full py-5 pl-16 pr-8 text-sm placeholder-gray-400 focus:outline-none"
                            />
                            <div className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                        </div>
                        <button className="w-full bg-white text-black py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">
                            Subscribe to Newsletter
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeClient;

