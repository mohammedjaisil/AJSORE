import React from 'react';
import PageLayout from '@/components/PageLayout';

export default function TermsPage() {
    return (
        <PageLayout title="Terms & Conditions">
            <h3 className="font-black text-xl text-gray-900">1. Use of Website</h3>
            <p>By accessing AJ Store, you agree to comply with all local laws and regulations. You may not use our platform for any illegal or unauthorized purpose.</p>
            <h3 className="font-black text-xl text-gray-900">2. Product Descriptions</h3>
            <p>We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content are error-free or complete.</p>
            <h3 className="font-black text-xl text-gray-900">3. Limitation of Liability</h3>
            <p>AJ Store shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
        </PageLayout>
    );
}
