'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/lib/toast-store';

const faqs = [
    { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days across India. Express delivery (1–3 days) is available in metro cities. Orders placed before 2 PM are dispatched the same day.' },
    { q: 'Do you offer COD (Cash on Delivery)?', a: 'Yes! COD is available for all orders up to ₹10,000. Simply select "Cash on Delivery" at checkout. A small convenience fee of ₹30 applies.' },
    { q: 'What is your return policy?', a: 'We offer a hassle-free 30-day return policy. Products must be in original condition with packaging. Raise a return request from your account dashboard and we\'ll pick it up for free.' },
    { q: 'Is my payment information secure?', a: 'Absolutely. All payments are processed through PCI-DSS compliant gateways (Razorpay, Stripe, PayPal). We never store your card details on our servers.' },
    { q: 'Can I track my order?', a: 'Yes! Once dispatched, you\'ll receive a tracking link via SMS and email. You can also track anytime from your account page or by visiting /track and entering your Order ID.' },
    { q: 'Do you ship internationally?', a: 'Currently, we ship to all states across India. International shipping to UAE, UK, USA, and Singapore is coming soon. Sign up for our newsletter to be notified.' },
    { q: 'How do I cancel my order?', a: 'Orders can be cancelled within 2 hours of placement from your account dashboard. After dispatch, you can initiate a return once the product is delivered.' },
    { q: 'Are your products genuine?', a: 'Yes, 100%. All products are sourced directly from authorized manufacturers and distributors. Every item comes with a manufacturer warranty.' },
];

const contactMethods = [
    { icon: '📞', label: 'Phone / WhatsApp', value: '+91 98765 43210', sub: 'Mon–Sat, 9 AM – 9 PM IST', href: 'tel:+919876543210' },
    { icon: '📧', label: 'Email Support', value: 'support@buykko.com', sub: 'Response within 24 hours', href: 'mailto:support@buykko.com' },
    { icon: '💬', label: 'Live Chat', value: 'Chat with us', sub: 'Available during business hours', href: '#' },
    { icon: '📍', label: 'Head Office', value: 'Bengaluru, Karnataka', sub: 'India — 560001', href: '#' },
];

export default function ContactPage() {
    const { addToast } = useToast();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', orderId: '' });
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        await new Promise(r => setTimeout(r, 1200));
        setSending(false);
        setForm({ name: '', email: '', subject: '', message: '', orderId: '' });
        addToast('Message sent! We\'ll get back to you within 24 hours.', 'success');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 sm:py-24">

            {/* Header */}
            <div className="text-center space-y-4 mb-16 sm:mb-24">
                <div className="inline-flex items-center gap-2 bg-primary/5 text-slate-900 px-5 py-2 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]">We&apos;re Here to Help</p>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tighter">Contact Us</h1>
                <p className="text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
                    Got a question, feedback, or need help with an order? We&apos;re always happy to assist.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-16">
                {/* Left — Contact Methods */}
                <div className="lg:col-span-2 space-y-5">
                    {contactMethods.map((c, i) => (
                        <a key={i} href={c.href} className="flex items-start gap-5 p-6 sm:p-7 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-lg hover:shadow-gray-900/5 hover:-translate-y-0.5 transition-all group">
                            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary/10 transition-colors">
                                {c.icon}
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{c.label}</p>
                                <p className="font-bold text-slate-900 text-sm">{c.value}</p>
                                <p className="text-[10px] text-gray-400 font-medium">{c.sub}</p>
                            </div>
                        </a>
                    ))}

                    {/* FAQ shortcut */}
                    <div className="bg-primary text-white rounded-[2rem] p-7 space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Quick Answers</p>
                        <p className="font-bold text-xl tracking-tight">Check our FAQ first!</p>
                        <p className="text-sm font-medium opacity-70">Most questions are answered there instantly.</p>
                        <a href="#faq" className="inline-block bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all mt-2">
                            View FAQ →
                        </a>
                    </div>
                </div>

                {/* Right — Contact Form */}
                <div className="lg:col-span-3">
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 sm:p-12 space-y-6 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Send us a Message</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Your Name</label>
                                <input type="text" required placeholder="John Doe" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-primary focus:bg-white transition-all" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                                <input type="email" required placeholder="you@example.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-primary focus:bg-white transition-all" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Subject</label>
                                <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-primary focus:bg-white transition-all" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                                    <option value="">Select a topic...</option>
                                    <option>Order Issue</option>
                                    <option>Product Question</option>
                                    <option>Return / Refund</option>
                                    <option>Payment Problem</option>
                                    <option>Shipping Delay</option>
                                    <option>General Inquiry</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Order ID (Optional)</label>
                                <input type="text" placeholder="e.g. ORD-12345" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-primary focus:bg-white transition-all" value={form.orderId} onChange={e => setForm({ ...form, orderId: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Message</label>
                            <textarea required rows={5} placeholder="Tell us how we can help you..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-primary focus:bg-white transition-all resize-none" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                        </div>

                         <button type="submit" disabled={sending} className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.25em] text-xs hover:bg-zinc-900 shadow-xl shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]">
                            {sending ? '⏳ Sending...' : '✉️ Send Message'}
                        </button>
                    </form>
                </div>
            </div>

            {/* FAQ Section */}
            <section id="faq" className="mt-24 sm:mt-32 space-y-10">
                 <div className="text-center space-y-3">
                    <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">FAQ</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tighter">Frequently Asked Questions</h2>
                    <p className="text-gray-400 font-medium text-sm">Can&apos;t find your answer here? <Link href="/contact" className="text-slate-900 hover:underline font-bold">Contact us directly.</Link></p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {faqs.map((item, i) => (
                         <details key={i} className="bg-white border border-gray-100 rounded-[1.5rem] p-6 sm:p-7 group cursor-pointer hover:border-primary/20 hover:shadow-sm transition-all">
                            <summary className="font-bold text-slate-900 list-none flex justify-between items-start gap-4 text-sm">
                                <span>{item.q}</span>
                                <span className="text-slate-900 group-open:rotate-180 transition-transform duration-300 shrink-0 mt-0.5">▼</span>
                            </summary>
                            <p className="mt-5 pt-5 border-t border-gray-100 text-gray-500 font-medium leading-relaxed text-sm">{item.a}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
