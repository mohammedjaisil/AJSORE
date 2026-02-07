import React from 'react';
import PageLayout from '@/components/PageLayout';

export default function FAQPage() {
    const faqs = [
        { q: 'How long does shipping take?', a: 'Standard shipping usually takes 5-10 business days depending on your location. We process orders within 24-48 hours.' },
        { q: 'Do you offer international shipping?', a: 'Yes! We ship to over 50 countries worldwide including UK, Canada, Australia, and EU.' },
        { q: 'Can I track my order?', a: 'Absolutely. Once your order is processed, you will receive a tracking number via email within 3 business days.' },
        { q: 'What is your return policy?', a: 'We offer a 30-day return policy for most items in their original condition. See our Return Policy for details.' }
    ];

    return (
        <PageLayout title="Common Questions">
            <div className="space-y-4">
                {faqs.map((item, i) => (
                    <details key={i} className="border rounded-[2rem] p-8 bg-white group cursor-pointer hover:border-[#005d32]/20 transition-all">
                        <summary className="font-black text-gray-900 list-none flex justify-between items-center text-lg">
                            {item.q}
                            <span className="text-[#005d32] group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-6 pt-6 border-t border-gray-100 text-gray-500 font-medium leading-relaxed">{item.a}</p>
                    </details>
                ))}
            </div>
        </PageLayout>
    );
}
