import React from 'react';
import { getOrderWithItems } from '@/actions/admin-orders';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShipmentManager from '@/components/admin/ShipmentManager';
import OrderPrintButton from '@/components/admin/OrderPrintButton';
import FulfillmentManager from '@/components/admin/FulfillmentManager';

export const dynamic = 'force-dynamic';

export default async function AdminOrderDetailsPage({ params }: { params: { id: string } }) {
    let order;
    try {
        order = await getOrderWithItems(params.id);
    } catch (e) {
        return notFound();
    }

    if (!order) return notFound();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const conversionRate = 83.5;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#e5e5e5]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-[22px] font-semibold text-[#1a1a1a] tracking-tight">#{order.id.slice(0, 8).toUpperCase()}</h1>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                order.status === 'Paid' ? 'bg-[#f0faf5] text-[#1a8a4f] border-[#c3e9d1]' : 'bg-[#fff5ea] text-[#8a611a] border-[#ffe2c5]'
                            }`}>
                                {order.status}
                            </span>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                order.fulfillment_status === 'FULFILLED' ? 'bg-[#f0faf5] text-[#1a8a4f] border-[#c3e9d1]' : 'bg-[#fff5ea] text-[#8a611a] border-[#ffe2c5]'
                            }`}>
                                {order.fulfillment_status || 'UNFULFILLED'}
                            </span>
                        </div>
                        <p className="text-xs text-[#6c6c6c] mt-0.5">{formatDate(order.created_at)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <OrderPrintButton />
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Fulfillment Section */}
                    <FulfillmentManager orderId={order.id} status={order.fulfillment_status || 'UNFULFILLED'} />

                    {/* Items Card */}
                    <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-[#f0f0f0]">
                            <h3 className="text-sm font-semibold text-[#1a1a1a]">Items</h3>
                        </div>
                        <div className="divide-y divide-[#f6f6f7]">
                            {order.items.map((item: any, i: number) => (
                                <div key={i} className="p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#f6f6f7] rounded-lg overflow-hidden border border-[#e5e5e5] shrink-0">
                                        <img src={item.image || '/placeholder.png'} className="w-full h-full object-cover" alt={item.product_name} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-[#1a1a1a] truncate">{item.product_name}</p>
                                        <p className="text-[10px] text-[#6c6c6c]">
                                            {item.color && `Color: ${item.color}`}
                                            {item.color && item.size && ' • '}
                                            {item.size && `Size: ${item.size}`}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-[#1a1a1a]">₹{(Number(item.price) * conversionRate).toLocaleString()}</p>
                                        <p className="text-[10px] text-[#6c6c6c]">x {item.quantity}</p>
                                    </div>
                                    <div className="text-right w-20">
                                        <p className="text-xs font-semibold text-[#1a1a1a]">₹{(Number(item.price) * item.quantity * conversionRate).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-[#fafafa] border-t border-[#f0f0f0] space-y-2">
                            <div className="flex justify-between text-xs text-[#6c6c6c]">
                                <span>Subtotal</span>
                                <span className="text-[#1a1a1a]">₹{(Number(order.total) * conversionRate).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs text-[#6c6c6c]">
                                <span>Shipping (Standard)</span>
                                <span className="text-[#1a1a1a]">₹0.00</span>
                            </div>
                            <div className="pt-2 flex justify-between text-sm font-bold text-[#1a1a1a]">
                                <span>Total</span>
                                <span>₹{(Number(order.total) * conversionRate).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-[#1a1a1a]">Payment</h3>
                            <span className="text-[10px] font-bold text-[#1a8a4f] uppercase tracking-wider bg-[#f0faf5] px-2 py-0.5 rounded-full border border-[#c3e9d1]">Paid</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-xs text-[#6c6c6c]">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-[#9c9c9c] mb-1">Transaction ID</p>
                                <p className="font-mono text-[#1a1a1a]">PAY-{order.id.slice(-8).toUpperCase()}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-[#9c9c9c] mb-1">Payment Method</p>
                                <p className="text-[#1a1a1a]">Razorpay / UPI</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white p-5 rounded-xl border border-[#e5e5e5] shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-[#1a1a1a]">Customer</h3>
                            <Link href={`/admin/customers?email=${order.user_email}`} className="text-[11px] font-medium text-[#5c5fc8] hover:underline">Edit</Link>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-medium text-[#5c5fc8] truncate">{order.user_name}</p>
                            <p className="text-xs text-[#1a1a1a]">{order.user_email}</p>
                        </div>
                        <div className="border-t border-[#f0f0f0] pt-4">
                            <h4 className="text-[11px] font-semibold text-[#6c6c6c] uppercase mb-2">Shipping address</h4>
                            <p className="text-xs text-[#1a1a1a] leading-relaxed whitespace-pre-wrap">
                                {order.shipping_address || 'No address provided'}
                            </p>
                        </div>
                    </div>

                    {/* Timeline / Notes */}
                    <div className="bg-white p-5 rounded-xl border border-[#e5e5e5] shadow-sm space-y-4">
                        <h3 className="text-sm font-semibold text-[#1a1a1a]">Notes</h3>
                        <textarea 
                            className="w-full bg-[#fcfcfc] border border-[#e5e5e5] rounded-lg p-3 text-xs text-[#1a1a1a] outline-none h-24 resize-none"
                            placeholder="Add a note..."
                            defaultValue={order.notes}
                        />
                    </div>

                    {/* Tags */}
                    <div className="bg-white p-5 rounded-xl border border-[#e5e5e5] shadow-sm space-y-3">
                        <h3 className="text-sm font-semibold text-[#1a1a1a]">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-[#f6f6f7] rounded-lg text-xs text-[#4a4a4a]">Dropshipping</span>
                            <span className="px-2 py-1 bg-[#f6f6f7] rounded-lg text-xs text-[#4a4a4a]">+ Add tag</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
