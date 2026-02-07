import React from 'react';
import PageLayout from '@/components/PageLayout';

export default function ReturnPolicyPage() {
    return (
        <PageLayout title="Returns & Refunds">
            <h3 className="font-black text-xl text-gray-900">1. 30-Day Guarantee</h3>
            <p>Not in love? Return any product within 30 days of delivery for a full refund. The item must be in its original packaging and in new condition.</p>
            <h3 className="font-black text-xl text-gray-900">2. Damaged or Defective Items</h3>
            <p>If your order arrives damaged, please contact support@ajstore.com within 48 hours with photos of the package. We will ship a replacement immediately at no cost to you.</p>
            <h3 className="font-black text-xl text-gray-900">3. Refund Process</h3>
            <p>Once your return is received and inspected, we will notify you and process your refund to your original payment method within 5-7 business days.</p>
        </PageLayout>
    );
}
