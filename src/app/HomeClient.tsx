'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

import { Product } from '@/types';

interface HomeClientProps {
    featuredProducts: Product[];
}

const HomeClient: React.FC<HomeClientProps> = ({ featuredProducts }) => {
    const [scrollY, setScrollY] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeReview, setActiveReview] = useState(0);
    const heroRef = useRef<HTMLElement>(null);


    const reviewsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsLoaded(true);
        const handleScroll = () => setScrollY(window.scrollY);
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) - 0.5,
                y: (e.clientY / window.innerHeight) - 0.5
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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



    const layers = {
        back: { x: mousePos.x * -15, y: mousePos.y * -15 + (scrollY * 0.1) },
        mid: { x: mousePos.x * -30, y: mousePos.y * -30 + (scrollY * 0.15) },
        front: { x: mousePos.x * 50, y: mousePos.y * 50 + (scrollY * -0.05) },
        overlay: { x: mousePos.x * 70, y: mousePos.y * 70 }
    };

    const heroOpacity = Math.max(0, 1 - scrollY / 700);

    // Reliable Tech Community Image IDs
    const communityImages = [
        '1505740420928-5e560c06d30e',
        '1523275335684-37898b6baf30',
        '1546435770-a3e426bf472b',
        '1572635196237-14b3f281503f',
        '1583394838336-acd977736f90'
    ];


    return (
        <div className="pb-12 overflow-hidden bg-white">
            <style jsx global>{`
        @keyframes revealUp { from { opacity: 0; transform: translateY(40px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-reveal { animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .smooth-transform { transition: transform 0.25s cubic-bezier(0.1, 0, 0.2, 1); will-change: transform; }
        @keyframes softPulse { 0% { box-shadow: 0 0 0 0 rgba(0, 93, 50, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(0, 93, 50, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 93, 50, 0); } }
        .urgency-pulse { animation: softPulse 2s infinite; }
      `}</style>

            {/* 1. HERO SECTION */}
            <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-8 md:pt-0">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-5%] w-[110%] h-[110%] bg-[#f3f9f6] opacity-30 skew-y-3 smooth-transform" style={{ transform: `translate(${layers.back.x}px, ${layers.back.y}px)` }} />
                    <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#005d32]/5 rounded-full blur-[140px] smooth-transform" style={{ transform: `translate(${layers.back.x * 1.5}px, ${layers.back.y * 0.5}px)` }} />
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-12 w-full relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 space-y-12 text-center lg:text-left order-2 lg:order-1" style={{ opacity: heroOpacity }}>
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-[#005d32] text-[10px] font-black uppercase tracking-[0.3em] rounded-full animate-reveal shadow-sm border border-[#005d32]/5">
                                    <span className="flex h-2 w-2 rounded-full bg-[#005d32] animate-pulse" />
                                    Limited Release Drop
                                </div>
                                <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-gray-900 leading-[0.92] tracking-tighter animate-reveal" style={{ animationDelay: '200ms' }}>
                                    Acoustic <br /> <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#005d32] via-[#005d32] to-emerald-400">Zenith.</span>
                                </h1>
                                <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed animate-reveal" style={{ animationDelay: '400ms' }}>
                                    Where pure engineering meets ethereal design. The flagship AJ-1 Wireless is more than audio—it's an emotional resonance.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-reveal" style={{ animationDelay: '600ms' }}>
                                <Link href="/shop" className="group relative w-full sm:w-auto bg-[#005d32] text-white px-14 py-6 rounded-full font-black uppercase tracking-[0.15em] text-[11px] overflow-hidden shadow-2xl shadow-[#005d32]/20 hover:scale-[1.03] transition-all active:scale-95 urgency-pulse btn-haptic">
                                    <span className="relative z-10">Order Yours Today</span>
                                    <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                </Link>
                                <div className="flex items-center gap-4 text-gray-400 font-black text-[10px] uppercase tracking-widest">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-gray-50 overflow-hidden ring-4 ring-[#f3f9f6] relative">
                                                <Image
                                                    src={`https://i.pravatar.cc/100?u=user${i + 20}`}
                                                    alt="User"
                                                    fill
                                                    sizes="36px"
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="pl-2 text-[10px]">Rated 4.9/5 By Critics</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative order-1 lg:order-2 w-full">
                            <div className="relative smooth-transform" style={{ transform: `translate(${layers.front.x}px, ${layers.front.y}px)` }}>
                                <div className="absolute inset-4 md:inset-10 bg-[#005d32]/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
                                <div className={`relative w-full aspect-square md:aspect-[4/3] max-w-2xl mx-auto rounded-[2.5rem] md:rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] md:shadow-[0_80px_150px_-30px_rgba(0,0,0,0.15)] border border-white/60 overflow-hidden z-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1400&auto=format&fit=crop"
                                        alt="Flagship Audio Product"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div className="space-y-32 mt-32">
                {/* 2. TRUST & SOCIAL PROOF */}
                <section className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="bg-[#f3f9f6]/40 backdrop-blur-sm rounded-[3rem] p-8 md:p-10 flex flex-wrap justify-around items-center gap-8 border border-white shadow-sm">
                        {[
                            { text: 'Global Shipping', icon: '🌍' },
                            { text: 'Secure Payments', icon: '🛡️' },
                            { text: '30 Day Trial', icon: '🔄' },
                            { text: '4.9/5 Rating', icon: '⭐' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 group">
                                <span className="text-xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
                                <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. TRENDING PRODUCTS */}
                <section className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Trending Tech</h2>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em]">Most loved drops this month</p>
                        </div>
                        <Link href="/shop" className="text-[#005d32] font-black uppercase text-xs tracking-widest flex items-center gap-3 group btn-haptic">
                            Shop Everything
                            <div className="w-10 h-10 rounded-full border border-[#005d32]/20 flex items-center justify-center group-hover:bg-[#005d32] group-hover:text-white transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </div>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
                        {featuredProducts.slice(0, 4).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                </section>

                {/* 4. PROBLEM -> SOLUTION */}
                <section className="max-w-7xl mx-auto px-4 md:px-12">
                    <div className="bg-[#005d32] rounded-[4rem] p-12 md:p-32 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400 opacity-10 blur-[120px] rounded-full pointer-events-none" />
                        <div className="flex-1 space-y-10 relative z-10 text-center lg:text-left">
                            <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase">Sick of <br /> <span className="text-emerald-400 opacity-50">Tangled Tech?</span></h2>
                            <p className="text-emerald-100/70 text-lg font-medium max-w-xl leading-relaxed">Most gadgets sacrifice beauty for utility. Our Wireless Series eliminates the mess while elevating your aesthetic.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-sm">
                                    <span className="text-red-400 font-black block mb-2 uppercase text-[10px] tracking-widest">The Problem</span>
                                    <p className="text-white font-bold text-sm">Cheap plastic parts that break in months.</p>
                                </div>
                                <div className="p-8 bg-emerald-400/10 border border-emerald-400/20 rounded-[2.5rem] backdrop-blur-sm">
                                    <span className="text-emerald-400 font-black block mb-2 uppercase text-[10px] tracking-widest">Our Solution</span>
                                    <p className="text-white font-bold text-sm">Aerospace-grade alloys built for a lifetime.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 shrink-0 scale-110 lg:rotate-6 relative w-full aspect-video lg:aspect-square">
                            <Image
                                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="rounded-[3rem] shadow-2xl object-cover"
                                alt="Lifestyle Tech"
                            />
                        </div>
                    </div>
                </section>

                {/* 6. HOW IT WORKS */}
                <section className="max-w-7xl mx-auto px-4 md:px-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-24">The AJ Experience</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative">
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-gray-100" />
                        {[
                            { step: '01', title: 'Curated Selection', desc: 'Browse our laboratory-tested tech drops.', icon: '🛒' },
                            { step: '02', title: 'Secured Payment', desc: 'End-to-end encryption for every transaction.', icon: '🔐' },
                            { step: '03', title: 'Priority Dispatch', desc: 'Real-time tracking to your doorstep.', icon: '✈️' }
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center group">
                                <div className="w-24 h-24 bg-white border-4 border-[#f3f9f6] rounded-full flex items-center justify-center text-4xl shadow-xl mb-8 group-hover:scale-110 group-hover:shadow-[#005d32]/10 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <p className="text-[10px] font-black text-[#005d32] uppercase tracking-[0.4em] mb-2">Step {item.step}</p>
                                <h3 className="text-lg font-black uppercase text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-400 font-medium max-w-[200px] text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. REVIEWS & UGC */}
                <section className="bg-gray-50 py-32 overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-4 md:px-12">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                            <div className="space-y-3">
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">AJ Community</h2>
                                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4em]">Real Stories from Real Owners</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        if (window.innerWidth < 768) {
                                            setActiveReview(prev => (prev === 0 ? communityImages.length - 1 : prev - 1));
                                        } else {
                                            scrollReviews('left');
                                        }
                                    }}
                                    className="flex w-14 h-14 rounded-full border border-gray-200 items-center justify-center bg-white hover:bg-[#005d32] hover:text-white hover:border-[#005d32] transition-all shadow-sm active:scale-90"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.innerWidth < 768) {
                                            setActiveReview(prev => (prev === communityImages.length - 1 ? 0 : prev + 1));
                                        } else {
                                            scrollReviews('right');
                                        }
                                    }}
                                    className="flex w-14 h-14 rounded-full border border-gray-200 items-center justify-center bg-white hover:bg-[#005d32] hover:text-white hover:border-[#005d32] transition-all shadow-sm active:scale-90"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile: Single Card Carousel | Desktop: Free Slider */}
                        <div
                            ref={reviewsRef}
                            className="relative"
                        >
                            {/* Mobile View (One at a time) */}
                            <div className="md:hidden">
                                {communityImages.map((imgId, i) => (
                                    <div
                                        key={i}
                                        className={`w-full bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6 border border-white transition-all duration-500 ${activeReview === i ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none'}`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="relative w-14 h-14 rounded-full border-2 border-[#f3f9f6] overflow-hidden">
                                                <Image
                                                    src={`https://i.pravatar.cc/100?u=rev${i}`}
                                                    fill
                                                    sizes="64px"
                                                    className="object-cover"
                                                    alt="Customer"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-base">Owner #{i + 1042}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Verified Tech Critic</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-yellow-400 gap-1.5 text-sm">
                                            {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                                        </div>
                                        <p className="text-gray-500 font-medium leading-relaxed italic text-base">
                                            "{i % 2 === 0 ? 'Exceeded every expectation. The noise cancellation is ethereal.' : 'The minimalist design fits my setup perfectly. Best investment in audio I have made.'}"
                                        </p>
                                        <div className="w-full h-48 bg-gray-100 rounded-[1.5rem] overflow-hidden group/img relative">
                                            <Image
                                                src={`https://images.unsplash.com/photo-${imgId}?q=80&w=600&auto=format&fit=crop`}
                                                fill
                                                sizes="100vw"
                                                className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                alt="UGC"
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="flex justify-center gap-2 mt-8">
                                    {communityImages.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${activeReview === i ? 'w-8 bg-[#005d32]' : 'w-2 bg-gray-200'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Desktop View (Horizontal Slider) */}
                            <div className="hidden md:flex gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-10">
                                {communityImages.map((imgId, i) => (
                                    <div
                                        key={i}
                                        className="min-w-[420px] bg-white p-10 rounded-[3rem] shadow-sm space-y-8 shrink-0 border border-white snap-center hover:shadow-2xl hover:shadow-[#005d32]/5 transition-all duration-500"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="relative w-16 h-16 rounded-full border-2 border-[#f3f9f6] overflow-hidden">
                                                <Image
                                                    src={`https://i.pravatar.cc/100?u=rev${i}`}
                                                    fill
                                                    sizes="64px"
                                                    className="object-cover"
                                                    alt="Customer"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 text-lg">Owner #{i + 1042}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Verified Tech Critic</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-yellow-400 gap-1.5 text-sm">
                                            {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                                        </div>
                                        <p className="text-gray-500 font-medium leading-relaxed italic text-lg">
                                            "{i % 2 === 0 ? 'Exceeded every expectation. The noise cancellation is ethereal.' : 'The minimalist design fits my setup perfectly. Best investment in audio I have made.'}"
                                        </p>
                                        <div className="w-full h-56 bg-gray-100 rounded-[2rem] overflow-hidden group/img relative">
                                            <Image
                                                src={`https://images.unsplash.com/photo-${imgId}?q=80&w=600&auto=format&fit=crop`}
                                                fill
                                                sizes="(max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                alt="UGC"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* 10. FINAL CTA SECTION */}
                <section className="max-w-7xl mx-auto px-4 md:px-12 pb-20 md:pb-0">
                    <div className="bg-gray-900 rounded-[4rem] p-12 md:p-32 relative overflow-hidden text-center lg:text-left mb-20">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#005d32] opacity-20 blur-[180px] pointer-events-none smooth-transform" />
                        <div className="flex-col lg:flex-row items-center gap-20 relative z-10">
                            <div className="flex-1 space-y-10">
                                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[1] max-w-xl">The Future <br /> Is <span className="text-[#005d32]">Acoustic.</span></h2>
                                <p className="text-gray-400 text-xl font-medium max-w-2xl leading-relaxed">Experience sound without boundaries. Join our inner circle for priority access to the next generation of tech.</p>
                                <div className="flex flex-col sm:flex-row gap-6 max-w-lg">
                                    <input type="email" placeholder="Drop your email here" className="flex-1 bg-white/5 border border-white/10 rounded-full px-10 py-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#005d32] transition-all font-medium" />
                                    <button className="bg-[#005d32] text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-emerald-500 transition-all shadow-2xl shadow-[#005d32]/40 active:scale-95 btn-haptic">Get Notified</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomeClient;
