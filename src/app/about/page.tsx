import React from 'react';
import PageLayout from '@/components/PageLayout';

export default function AboutPage() {
    return (
        <PageLayout title="About AJ Store">
            <p>AJ Store is a premium tech destination founded on the belief that high-quality technology should be accessible to everyone. We carefully curate our collection of electronics, accessories, and gadgets from top manufacturers worldwide.</p>
            <p>Our mission is to bridge the gap between innovation and the consumer, providing a seamless shopping experience backed by dedicated customer support and rapid shipping.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" className="rounded-[2.5rem] shadow-xl w-full h-auto object-cover" alt="Our Team" />
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" className="rounded-[2.5rem] shadow-xl w-full h-auto object-cover" alt="Our Office" />
            </div>
        </PageLayout>
    );
}
