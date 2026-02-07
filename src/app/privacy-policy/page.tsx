import React from 'react';
import PageLayout from '@/components/PageLayout';

export default function PrivacyPolicyPage() {
    return (
        <PageLayout title="Privacy Policy">
            <p>Last Updated: October 2024</p>
            <p>At AJ Store, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
            <h3 className="font-black text-xl text-gray-900">Information We Collect</h3>
            <p>We collect information you provide directly to us when you create an account, make a purchase, or contact support. This includes name, email, and shipping address.</p>
            <h3 className="font-black text-xl text-gray-900">Data Security</h3>
            <p>We use industry-standard 256-bit SSL encryption to protect your data during transmission and never store your full credit card details on our servers.</p>
        </PageLayout>
    );
}
