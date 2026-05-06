import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy — buykko',
    description: 'Read buykko\'s Privacy Policy to understand how we collect, use, and protect your personal data.',
};

const sections = [
    {
        title: '1. Information We Collect',
        content: [
            'When you create an account: Name, email address, phone number, and password (stored encrypted).',
            'When you place an order: Shipping address, billing details, and payment method (last 4 digits only — we never store full card numbers).',
            'Automatically: IP address, browser type, pages visited, device information, and cookies for session management and analytics.',
            'Communications: If you contact us via email, chat, or the contact form, we store your messages to resolve your query.',
        ]
    },
    {
        title: '2. How We Use Your Information',
        content: [
            'To process and deliver your orders and send order confirmation emails and SMS.',
            'To personalize your shopping experience and show relevant product recommendations.',
            'To send promotional emails and offers (only if you opt in; you can unsubscribe any time).',
            'To detect and prevent fraud, unauthorized access, and other harmful activities.',
            'To improve our website, products, and services through aggregated analytics.',
        ]
    },
    {
        title: '3. Sharing Your Information',
        content: [
            'We do NOT sell your personal data to third parties. Period.',
            'Logistics partners (BlueDart, Delhivery, etc.) receive your name and address solely to fulfill delivery.',
            'Payment processors (Razorpay, Stripe, PayPal) handle transactions in their own secure, PCI-DSS compliant environment.',
            'Legal compliance: We may disclose information if required by law or court order.',
        ]
    },
    {
        title: '4. Cookies & Tracking',
        content: [
            'We use essential cookies for session management, login persistence, and cart state.',
            'Analytics cookies (Google Analytics) help us understand usage patterns. These are anonymized.',
            'You can disable non-essential cookies in your browser settings at any time.',
        ]
    },
    {
        title: '5. Data Security',
        content: [
            'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.',
            'Access to your data within our company is strictly role-based and audited.',
            'We conduct regular security audits and penetration testing to protect your data.',
        ]
    },
    {
        title: '6. Your Rights',
        content: [
            'Access: Request a copy of all personal data we hold about you.',
            'Correction: Update or correct inaccurate personal information via your account settings.',
            'Deletion: Request deletion of your account and all associated personal data.',
            'Portability: Export your order history and personal data in a machine-readable format.',
            'To exercise any of these rights, email us at: privacy@buykko.com',
        ]
    },
    {
        title: '7. Data Retention',
        content: [
            'Account data is retained while your account is active.',
            'Order records are retained for 7 years to comply with GST and financial regulations.',
            'Marketing preferences and email logs are retained for 2 years from last interaction.',
        ]
    },
    {
        title: '8. Contact Us',
        content: [
            'For any privacy-related questions or requests, contact our Data Protection Officer:',
            'Email: privacy@buykko.com | Phone: +91 98765 43210',
            'buykko, Bengaluru, Karnataka — 560001, India.',
        ]
    },
];

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-12 py-16 sm:py-24">
            <div className="space-y-4 mb-14">
                <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">Legal</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">Privacy Policy</h1>
                <p className="text-gray-400 font-medium">Last updated: <span className="text-gray-600 font-semibold">March 1, 2026</span></p>
                <p className="text-gray-500 leading-relaxed">
                    At buykko, your privacy matters deeply. This policy explains clearly what data we collect, why we collect it, and how we protect it. We keep this document jargon-free so you can actually understand it.
                </p>
            </div>

            <div className="space-y-8">
                {sections.map((sec, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-7 sm:p-10 space-y-5 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">{sec.title}</h2>
                        <ul className="space-y-3">
                            {sec.content.map((item, j) => (
                                <li key={j} className="flex gap-3 text-gray-500 font-medium text-sm leading-relaxed">
                                    <span className="text-slate-900 shrink-0 font-bold mt-0.5">→</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4 text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
                <Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link>
                <Link href="/returns" className="hover:underline">Return Policy</Link>
                <Link href="/contact" className="hover:underline">Contact Us</Link>
            </div>
        </div>
    );
}
