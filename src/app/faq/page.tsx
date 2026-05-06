import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ — buykko',
    description: 'Find answers to frequently asked questions about buykko orders, shipping, returns, payments, and more.',
};

const categories = [
    {
        label: 'Orders & Shipping',
        icon: '📦',
        faqs: [
            { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days across India. Express (1–3 days) is available in metro cities. Same-day delivery is offered in Bengaluru, Mumbai, and Delhi for orders placed before 12 PM.' },
            { q: 'Can I track my order in real time?', a: 'Yes! Once dispatched, you\'ll get a tracking link via SMS and email. You can also visit buykko.com/track and enter your Order ID for live updates.' },
            { q: 'Do you offer free shipping?', a: 'Yes — standard shipping is free on all orders above ₹499. For orders below that, a flat delivery fee of ₹49 applies.' },
            { q: 'Do you ship outside India?', a: 'Currently we ship to UAE, UK, USA, and Singapore. International shipping via FedEx/DHL starts from $9.99. More countries coming soon.' },
        ]
    },
    {
        label: 'Returns & Refunds',
        icon: '↩️',
        faqs: [
            { q: 'What is your return policy?', a: 'We offer a hassle-free 30-day return window for most products. Items must be unused and in original packaging. Free pickup is arranged from your doorstep.' },
            { q: 'How long does a refund take?', a: 'Refunds are processed within 5–7 business days after we receive and inspect the item. UPI refunds are generally faster (1–3 days).' },
            { q: 'Can I exchange a product instead of returning it?', a: 'Yes! Initiate a return for the original item and place a new order for the replacement. Any price difference will be charged or refunded accordingly.' },
            { q: 'What items cannot be returned?', a: 'In-ear earbuds (for hygiene), software/digital products, items marked "Final Sale", and products returned after 30 days are not eligible for return.' },
        ]
    },
    {
        label: 'Payments',
        icon: '💳',
        faqs: [
            { q: 'What payment methods do you accept?', a: 'We accept Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, Razorpay, PayPal, and Cash on Delivery (COD up to ₹10,000).' },
            { q: 'Is it safe to pay online?', a: 'Absolutely. All payments are processed through PCI-DSS certified gateways. We never store your full card details on our servers. All transactions use 256-bit SSL encryption.' },
            { q: 'Can I use a coupon code?', a: 'Yes! Enter your coupon code in the "Coupon" field during checkout. Current codes: SAVE10 (10% off), WELCOME15 (15% off new users), buykko20 (20% off orders above ₹999).' },
            { q: 'What do I do if my payment fails?', a: 'Don\'t worry — failed payments are not charged. Try again with a different payment method or contact your bank. If the amount was debited but order not placed, it will be auto-refunded within 5–7 business days.' },
        ]
    },
    {
        label: 'Products & Account',
        icon: '🛍️',
        faqs: [
            { q: 'Are your products genuine?', a: 'Yes, 100%. All products are sourced directly from authorized distributors and come with manufacturer warranties. We do not sell refurbished or counterfeit products.' },
            { q: 'How do I create an account?', a: 'Click "Sign Up" on the top navigation, enter your name, email, and password. You can also sign in with Google or Apple ID for one-click access.' },
            { q: 'How do I cancel my order?', a: 'Orders can be cancelled within 2 hours of placement from your Account → My Orders dashboard. After dispatch, cancellation is not possible, but you can initiate a return after delivery.' },
            { q: 'Can I save items for later?', a: 'Yes! Click the ❤️ heart icon on any product to add it to your Wishlist. You can view all saved items at buykko.com/wishlist or from your Account page.' },
        ]
    },
];

export default function FAQPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 md:px-12 py-16 sm:py-24 space-y-16">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/5 text-slate-900 px-5 py-2 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Help Center</p>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">Frequently Asked Questions</h1>
                <p className="text-gray-400 font-medium max-w-md mx-auto">
                    Can't find what you're looking for?{' '}
                    <Link href="/contact" className="text-slate-900 font-bold hover:underline">
                        Contact our support team
                    </Link>
                    .
                </p>
            </div>

            {/* FAQ Categories */}
            {categories.map((cat, ci) => (
                <section key={ci} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="text-3xl">{cat.icon}</span>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">{cat.label}</h2>
                    </div>
                    <div className="space-y-3">
                        {cat.faqs.map((item, i) => (
                            <details key={i} className="bg-white border border-gray-100 rounded-[1.5rem] p-6 sm:p-7 group cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all">
                                <summary className="font-bold text-slate-900 list-none flex justify-between items-start gap-4 text-sm">
                                    <span>{item.q}</span>
                                    <span className="text-slate-900 text-base group-open:rotate-180 transition-transform duration-300 shrink-0 mt-0.5">▼</span>
                                </summary>
                                <p className="mt-5 pt-5 border-t border-gray-100 text-gray-500 font-medium leading-relaxed text-sm">{item.a}</p>
                            </details>
                        ))}
                    </div>
                </section>
            ))}

            {/* Still need help */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-[80px] pointer-events-none" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">Still Need Help?</p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter">We're here for you</h2>
                <p className="text-gray-400 font-medium max-w-sm mx-auto text-sm">Our friendly support team is available Mon–Sat, 9 AM – 9 PM IST.</p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link href="/contact" className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-200 shadow-xl shadow-primary/20 transition-all active:scale-95">
                        Contact Support
                    </Link>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                        💬 WhatsApp Chat
                    </a>
                </div>
            </div>
        </div>
    );
}
