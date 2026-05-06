import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Return & Refund Policy — buykko',
    description: 'Learn about buykko\'s easy 30-day return policy, refund timelines, and how to initiate a return.',
};

const steps = [
    { icon: '📦', step: '01', title: 'Initiate Return', desc: 'Go to My Orders in your account, select the item, and click "Return Item". Or email us at returns@buykko.com within 30 days of delivery.' },
    { icon: '🏷️', step: '02', title: 'Get Return Label', desc: 'We\'ll email you a prepaid return shipping label within 24 hours. Stick it on the package and drop it at the nearest courier center.' },
    { icon: '🔍', step: '03', title: 'Quality Check', desc: 'Once we receive your return (3–5 business days), our team inspects the item to confirm it\'s in original condition.' },
    { icon: '💸', step: '04', title: 'Refund Issued', desc: 'Upon approval, your refund is processed within 5–7 business days to your original payment method. UPI refunds are faster — 1–2 days.' },
];

const eligibility = [
    { label: 'Eligible for Return', items: ['Products in original, unused condition', 'Products with original packaging and all accessories', 'Delivered within the last 30 days', 'Defective or damaged products (any time window)', 'Wrong item shipped by us'] },
    { label: 'Not Eligible for Return', items: ['Used, damaged, or modified products', 'Products without original packaging', 'In-ear earbuds / earphones (hygiene reasons)', 'Software, digital products, or vouchers', 'Products marked "Final Sale" or "Non-Returnable"', 'Items returned after 30 days of delivery'] },
];

const refundMethods = [
    { method: 'Credit / Debit Card', time: '5–7 business days' },
    { method: 'UPI / Net Banking', time: '1–3 business days' },
    { method: 'Razorpay / PayPal', time: '3–5 business days' },
    { method: 'Cash on Delivery (COD)', time: 'Bank transfer within 7 days' },
    { method: 'buykko Wallet Credit', time: 'Instant' },
];

export default function ReturnPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-12 py-16 sm:py-24 space-y-14">
            {/* Header */}
            <div className="space-y-4">
                <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">Policies</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">Return & Refund Policy</h1>
                <p className="text-gray-400 font-medium">Last updated: <span className="text-gray-600 font-semibold">March 1, 2026</span></p>
                <p className="text-gray-500 leading-relaxed">
                    Not happy with your purchase? No worries. We offer a simple, hassle-free 30-day return process with free pickup from your doorstep.
                </p>
            </div>

            {/* 30-day badge */}
            <div className="flex items-center gap-6 bg-primary text-white p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-4xl shrink-0">🛡️</div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70">Our Promise</p>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">30-Day Free Returns</h2>
                    <p className="text-sm font-medium opacity-70 mt-2">No questions asked. Free pickup from your doorstep. Full refund guaranteed.</p>
                </div>
            </div>

            {/* How to Return */}
            <div className="space-y-7">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tighter">How to Return in 4 Easy Steps</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {steps.map((step, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-7 space-y-4 shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 duration-500">
                            <div className="flex items-center justify-between">
                                <span className="text-3xl">{step.icon}</span>
                                <span className="text-[10px] font-bold text-gray-200 uppercase tracking-widest">{step.step}</span>
                            </div>
                            <h3 className="font-bold text-slate-900">{step.title}</h3>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Eligibility */}
            <div className="space-y-7">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tighter">Return Eligibility</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {eligibility.map((block, i) => (
                        <div key={i} className={`rounded-[2rem] p-7 space-y-5 border ${i === 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                            <h3 className={`font-bold text-sm uppercase tracking-widest ${i === 0 ? 'text-emerald-700' : 'text-red-700'}`}>{block.label}</h3>
                            <ul className="space-y-3">
                                {block.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2.5 text-sm font-medium text-gray-700">
                                        <span className={`shrink-0 mt-0.5 font-bold ${i === 0 ? 'text-emerald-600' : 'text-red-500'}`}>{i === 0 ? '✓' : '✗'}</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Refund timelines */}
            <div className="space-y-7">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tighter">Refund Timelines</h2>
                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                    {refundMethods.map((r, i) => (
                        <div key={i} className={`flex justify-between items-center px-7 py-5 ${i !== refundMethods.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50/50 transition-colors`}>
                             <p className="font-bold text-gray-700 text-sm">{r.method}</p>
                            <p className="text-slate-900 font-bold text-sm">{r.time}</p>
                        </div>
                    ))}
                </div>
                <p className="text-gray-400 font-medium text-xs">Refund timelines begin after quality inspection is complete. Bank processing times may vary.</p>
            </div>

            {/* Exchange */}
            <div className="bg-white border border-gray-100 rounded-[2rem] p-7 sm:p-10 space-y-4 shadow-sm">
                <h2 className="font-bold text-slate-900">Product Exchange</h2>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                    Want a different size, color, or model? We offer direct exchanges within 30 days of delivery. Initiate a return for the original item and place a new order for the desired product. If the price difference applies, you will be charged or refunded accordingly.
                </p>
            </div>

             <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div>
                    <p className="font-bold text-slate-900 text-sm">Need help with a return?</p>
                    <p className="text-gray-500 text-sm font-medium mt-1">Email: <a href="mailto:returns@buykko.com" className="text-slate-900 font-bold hover:underline">returns@buykko.com</a> · WhatsApp: +91 98765 43210</p>
                </div>
                <Link href="/contact" className="bg-primary text-white px-7 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-900 transition-all shrink-0">
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
