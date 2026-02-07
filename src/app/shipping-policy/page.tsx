import React from 'react';
import PageLayout from '@/components/PageLayout';

export default function ShippingPolicyPage() {
    return (
        <PageLayout title="Shipping Policy">
            <h3 className="font-black text-xl text-gray-900">1. Delivery Timelines</h3>
            <p>We work with global logistics partners to bring you the best tech at the lowest prices. Our standard shipping window is 5-12 business days for North America and 7-15 business days for other international regions.</p>
            <h3 className="font-black text-xl text-gray-900">2. Tracking Your Order</h3>
            <p>All orders are provided with a tracking number once the item leaves our distribution hub. Please allow 3-5 days for tracking information to update in the carrier system.</p>
            <h3 className="font-black text-xl text-gray-900">3. Customs and Duties</h3>
            <p>While we strive to cover customs fees in most regions, international customers are responsible for any local import duties or taxes applicable in their country.</p>
        </PageLayout>
    );
}
