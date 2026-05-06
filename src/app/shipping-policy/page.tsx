import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shipping Policy — buykko',
    description: 'Learn about buykko\'s shipping rates, delivery timelines, carriers, and international shipping options.',
};

const shippingOptions = [
    { name: 'Standard Delivery', time: '5–7 Business Days', price: 'FREE above ₹499', note: 'Pan India' },
    { name: 'Express Delivery', time: '1–3 Business Days', price: '₹149', note: 'Metro cities only' },
    { name: 'Same-Day Delivery', time: 'Today (order by 12 PM)', price: '₹249', note: 'Bengaluru, Mumbai, Delhi only' },
    { name: 'International', time: '10–21 Business Days', price: 'From $9.99', note: 'UAE, UK, USA, Singapore' },
];

const carriers = ['BlueDart', 'Delhivery', 'FedEx', 'DTDC', 'India Post'];

export default function ShippingPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-12 py-16 sm:py-24 space-y-14">
            <div className="space-y-4">
                <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">Policies</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">Shipping Policy</h1>
                <p className="text-gray-400 font-medium">Last updated: <span className="text-gray-600 font-semibold">March 1, 2026</span></p>
                <p className="text-gray-500 leading-relaxed">
                    We know you&apos;re excited to receive your order! Here&apos;s everything you need to know about how we ship and deliver your products.
                </p>
            </div>

            {/* Shipping options table */}
            <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="bg-gray-50 p-5 border-b border-gray-100">
                    <h2 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Delivery Options</h2>
                </div>
                <div className="divide-y divide-gray-50">
                    {shippingOptions.map((opt, i) => (
                        <div key={i} className="p-6 sm:p-8 flex flex-wrap items-center gap-4 sm:gap-0 justify-between hover:bg-gray-50/50 transition-colors">
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-slate-900 text-sm">{opt.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{opt.note}</p>
                            </div>
                            <div className="text-center px-4 hidden sm:block">
                                <p className="text-xs font-bold text-gray-500">{opt.time}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900 text-sm">{opt.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
                {[
                    { title: 'Order Processing', content: 'Orders are processed within 24–48 hours of placement (Monday–Saturday). Orders placed on Sundays or public holidays are processed the next business day. You will receive an email confirmation with your order details immediately after purchase, and a shipping confirmation with tracking link once dispatched.' },
                    { title: 'Tracking Your Order', content: 'Once your order is dispatched, you will receive an SMS and email with a tracking link. You can also track your order anytime from your Account Dashboard → My Orders → Track Order, or visit our Order Tracking page at buykko.com/track.' },
                    { title: 'Delivery Attempts', content: 'Our courier partners will attempt delivery up to 3 times. If delivery fails after 3 attempts (e.g. no one home, wrong address), the package is returned to us. You will be notified and can arrange re-delivery for a small fee, or receive a full refund for the product.' },
                    { title: 'Damaged / Missing Items', content: 'If your order arrives damaged or items are missing, please report within 48 hours of delivery by emailing support@buykko.com with your Order ID and photos of the packaging and item. We will arrange a free replacement or full refund immediately.' },
                    { title: 'International Shipping', content: 'International shipping is currently available to UAE, United Kingdom, USA, and Singapore via FedEx and DHL. Import duties and customs charges are the buyer\'s responsibility. buykko is not responsible for delays caused by customs clearance. Estimated transit time: 10–21 business days.' },
                    { title: 'Delivery Partners', content: 'We partner with ' + carriers.join(', ') + ' to ensure reliable and timely delivery. The carrier assigned to your order depends on your location and the selected shipping option.' },
                ].map((sec, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-7 sm:p-10 space-y-4 shadow-sm">
                        <h2 className="font-bold text-slate-900 tracking-tight">{sec.title}</h2>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed">{sec.content}</p>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div>
                    <p className="font-bold text-slate-900 text-sm">Still have a shipping question?</p>
                    <p className="text-gray-500 text-sm font-medium mt-1">Our team replies within 2 hours on business days.</p>
                </div>
                <Link href="/contact" className="bg-primary text-white px-7 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-900 transition-all shrink-0">
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
