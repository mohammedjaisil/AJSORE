import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions — buykko',
    description: 'Read buykko\'s Terms and Conditions governing use of our website and services.',
};

const sections = [
    {
        title: '1. Acceptance of Terms',
        content: 'By accessing or using buykko\'s website (buykko.com), placing an order, or creating an account, you agree to these Terms & Conditions. If you do not agree, please refrain from using our services. These terms apply to all visitors, users, and customers.'
    },
    {
        title: '2. Use of Our Website',
        content: 'You agree to use this website only for lawful purposes. You must not: (a) attempt to gain unauthorized access to any part of our system; (b) use automated tools to scrape or collect data without permission; (c) submit false, misleading, or fraudulent information; (d) resell products purchased from buykko without prior written authorization.'
    },
    {
        title: '3. Account Responsibility',
        content: 'You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your responsibility. Notify us immediately at support@buykko.com if you suspect unauthorized access. buykko is not liable for losses arising from unauthorized use of your account.'
    },
    {
        title: '4. Orders & Pricing',
        content: 'All prices on our website are listed in Indian Rupees (INR) and include applicable GST unless otherwise stated. We reserve the right to refuse or cancel orders at our discretion, particularly in cases of pricing errors, suspected fraud, or stock unavailability. You will be fully refunded in such cases within 5–7 business days.'
    },
    {
        title: '5. Payment',
        content: 'We accept Debit/Credit Cards, UPI, Net Banking, Razorpay, PayPal, and Cash on Delivery (COD, up to ₹10,000). By providing payment information, you confirm that you are authorized to use the payment method. All transactions are processed through secure, PCI-DSS certified gateways. buykko does not store full card details.'
    },
    {
        title: '6. Shipping & Delivery',
        content: 'We deliver across all states in India. Estimated delivery times are 5–7 business days (standard) and 1–3 business days (express). Delivery timelines are estimates and may vary due to courier delays, natural events, or holidays. For detailed information, see our Shipping Policy.'
    },
    {
        title: '7. Returns & Refunds',
        content: 'We offer a 30-day return window for most products in original, unused condition with original packaging. Refunds are processed within 5–7 business days after we receive and inspect the returned item. Some products (earbuds, personal hygiene devices) are non-returnable for health reasons. See full details in our Return Policy.'
    },
    {
        title: '8. Product Descriptions',
        content: 'We strive to display product information, images, and specifications as accurately as possible. Minor variations in color may occur due to screen calibration differences. We reserve the right to correct any errors in product descriptions or pricing at any time.'
    },
    {
        title: '9. Intellectual Property',
        content: 'All content on this site — including text, images, logos, icons, and product photography — is the property of buykko or its content suppliers and is protected under Indian copyright law. Unauthorized reproduction, distribution, or modification is strictly prohibited.'
    },
    {
        title: '10. Limitation of Liability',
        content: 'buykko shall not be liable for indirect, incidental, special, or consequential damages arising from the use of our products or services. Our total liability to you shall not exceed the amount paid for the specific order giving rise to the claim. This limitation applies to the fullest extent permitted by Indian law.'
    },
    {
        title: '11. Governing Law',
        content: 'These Terms are governed by the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.'
    },
    {
        title: '12. Changes to Terms',
        content: 'We may update these Terms at any time. Changes will be posted on this page with an updated "Last modified" date. Continued use of our website after changes constitutes your acceptance of the new terms. We encourage you to review this page periodically.'
    },
];

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-12 py-16 sm:py-24">
            <div className="space-y-4 mb-14">
                <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">Legal</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tighter">Terms & Conditions</h1>
                <p className="text-gray-400 font-medium">Last updated: <span className="text-gray-600 font-semibold">March 1, 2026</span></p>
                <p className="text-gray-500 leading-relaxed">
                    These Terms and Conditions govern your use of buykko&apos;s website and services. Please read them carefully. By using our site, you agree to be bound by these terms.
                </p>
            </div>

            <div className="space-y-5">
                {sections.map((sec, i) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-7 sm:p-10 space-y-4 shadow-sm hover:border-primary/20 transition-colors">
                        <h2 className="text-base font-bold text-slate-900 tracking-tight">{sec.title}</h2>
                        <p className="text-gray-500 font-medium text-sm leading-relaxed">{sec.content}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 space-y-2">
                <p className="font-bold text-slate-900 text-sm">Questions about our Terms?</p>
                <p className="text-gray-500 text-sm font-medium">Contact us at <a href="mailto:legal@buykko.com" className="text-slate-900 hover:underline font-bold">legal@buykko.com</a> or <Link href="/contact" className="text-slate-900 hover:underline font-bold">visit our contact page</Link>.</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                <Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link>
                <Link href="/returns" className="hover:underline">Return Policy</Link>
                <Link href="/faq" className="hover:underline">FAQ</Link>
            </div>
        </div>
    );
}
