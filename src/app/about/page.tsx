import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us — buykko',
    description: 'Learn about buykko — your trusted destination for premium tech accessories, gadgets, and electronics. Delivered fast, priced right.',
};

const stats = [
    { value: '50,000+', label: 'Happy Customers' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '10,000+', label: 'Orders Delivered' },
    { value: '24/7', label: 'Customer Support' },
];

const values = [
    { icon: '🎯', title: 'Quality First', desc: 'Every product passes strict quality checks. We only sell what we believe in.' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Pan-India shipping within 5-7 business days, with express options available.' },
    { icon: '🔒', title: 'Secure Shopping', desc: 'End-to-end encrypted payments. Your data is never shared or sold.' },
    { icon: '💬', title: 'Real Support', desc: 'Talk to a real human — not a bot — when you need help with your order.' },
    { icon: '♻️', title: 'Sustainable', desc: 'Eco-friendly packaging and carbon-conscious logistics on every shipment.' },
    { icon: '🏆', title: 'Best Prices', desc: 'Price-match guarantee. We&apos;ll beat any legitimate lower price you find.' },
];

const team = [
    { name: 'Ajmal', role: 'Founder & CEO', avatar: 'https://ui-avatars.com/api/?name=Ajmal&background=000&color=fff&size=120' },
    { name: 'Priya Sharma', role: 'Head of Operations', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=222&color=fff&size=120' },
    { name: 'Rahul Nair', role: 'Lead Designer', avatar: 'https://ui-avatars.com/api/?name=Rahul+Nair&background=333&color=fff&size=120' },
];

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12">

            {/* Hero */}
            <section className="py-20 sm:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 bg-primary/5 text-slate-900 px-5 py-2 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Our Story</p>
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tighter leading-[1.05]">
                        We Make Tech<br />
                        <span className="text-slate-900">Accessible</span> to All.
                    </h1>
                    <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed max-w-xl">
                        buykko was founded with one goal: bring premium-quality tech accessories to every corner of India — at prices that don&apos;t hurt. From earbuds to laptops, we curate only the best.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/shop" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-zinc-900 shadow-xl shadow-primary/20 transition-all active:scale-95">
                            Shop Now
                        </Link>
                        <Link href="/contact" className="border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:border-gray-900 hover:text-slate-900 transition-all">
                            Contact Us
                        </Link>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-5 w-full max-w-md mx-auto">
                    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=700&auto=format&fit=crop" className="rounded-[2.5rem] shadow-2xl w-full aspect-[3/4] object-cover mt-12" alt="buykko team" />
                    <div className="space-y-5">
                        <img src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=700&auto=format&fit=crop" className="rounded-[2.5rem] shadow-2xl w-full aspect-square object-cover" alt="Products" />
                        <div className="bg-primary p-6 rounded-[2rem] text-white space-y-1">
                            <p className="text-[9px] font-bold uppercase tracking-widest opacity-70">Founded</p>
                            <p className="text-2xl font-bold tracking-tight">2022</p>
                            <p className="text-[10px] font-medium opacity-70">Bengaluru, India</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-5 py-12 border-y border-gray-100">
                {stats.map((s, i) => (
                    <div key={i} className="text-center space-y-2 p-6">
                        <p className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">{s.value}</p>
                        <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{s.label}</p>
                    </div>
                ))}
            </section>

            {/* Mission */}
            <section className="py-20 sm:py-28 space-y-5 max-w-3xl mx-auto text-center">
                <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">Our Mission</p>
                <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tighter leading-tight">
                    &ldquo;Make every Indian&apos;s tech wishlist a reality — without compromise.&rdquo;
                </h2>
                <p className="text-gray-400 font-medium text-base leading-relaxed">
                    We source directly from manufacturers, cut the middlemen, and pass those savings on to you. No compromises on quality, no surprise fees at checkout.
                </p>
            </section>

            {/* Values */}
            <section className="pb-20 sm:pb-28 space-y-12">
                <div className="text-center space-y-3">
                    <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">What We Stand For</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tighter">Our Core Values</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {values.map((v, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-8 space-y-4 hover:shadow-xl hover:shadow-gray-900/5 hover:-translate-y-1 transition-all duration-500">
                            <span className="text-4xl block">{v.icon}</span>
                            <h3 className="font-bold text-slate-900 text-lg tracking-tight">{v.title}</h3>
                            <p className="text-gray-400 font-medium text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: v.desc }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Team */}
            <section className="pb-20 sm:pb-32 space-y-12">
                <div className="text-center space-y-3">
                    <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">The Team</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tighter">People Behind buykko</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {team.map((member, i) => (
                        <div key={i} className="text-center space-y-4 group">
                            <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-500" />
                            <div>
                                <p className="font-bold text-slate-900">{member.name}</p>
                                <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mb-20 bg-slate-900 rounded-[3rem] p-12 sm:p-20 text-center text-white space-y-7 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-[80px] pointer-events-none" />
                <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em] relative z-10">Join the Family</p>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter relative z-10">Ready to upgrade your tech?</h2>
                <Link href="/shop" className="inline-block bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-200 shadow-2xl shadow-primary/20 transition-all active:scale-95 relative z-10">
                    Shop the Collection
                </Link>
            </section>
        </div>
    );
}
