'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type TrackStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

const MOCK_ORDERS: Record<string, {
    id: string; product: string; image: string; status: TrackStatus;
    date: string; estimatedDelivery: string; carrier: string; trackingNum: string;
    steps: { label: string; icon: string; date: string; done: boolean }[];
}> = {
    'demo': {
        id: 'demo',
        product: 'Zenith Pro ANC Earbuds',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop',
        status: 'Out for Delivery',
        date: 'Mar 05, 2026',
        estimatedDelivery: 'Mar 07, 2026',
        carrier: 'BlueDart Express',
        trackingNum: 'BD1234567890IN',
        steps: [
            { label: 'Order Confirmed', icon: '✅', date: 'Mar 05, 09:24 AM', done: true },
            { label: 'Packed & Dispatched', icon: '📦', date: 'Mar 05, 04:10 PM', done: true },
            { label: 'In Transit', icon: '🚀', date: 'Mar 06, 08:00 AM', done: true },
            { label: 'Out for Delivery', icon: '🚚', date: 'Mar 07, 09:00 AM', done: true },
            { label: 'Delivered', icon: '🎁', date: 'Expected: Mar 07', done: false },
        ]
    }
};

const statusColors: Record<string, string> = {
    'Processing': 'bg-amber-50 text-amber-700 border-amber-200',
    'Shipped': 'bg-blue-50 text-blue-700 border-blue-200',
    'Out for Delivery': 'bg-primary text-white border-primary',
    'Delivered': 'bg-gray-100 text-slate-900 border-gray-200',
    'Cancelled': 'bg-red-50 text-red-700 border-red-200',
};

const OrderTrackingPage: React.FC = () => {
    const searchParams = useSearchParams();
    const initialId = searchParams.get('id') || '';
    const [trackId, setTrackId] = useState(initialId || 'demo');
    const [inputVal, setInputVal] = useState(initialId);
    const [searched, setSearched] = useState(!!initialId || true);

    const order = MOCK_ORDERS[trackId] || MOCK_ORDERS['demo'];
    const completedSteps = order.steps.filter(s => s.done).length;
    const progress = (completedSteps / order.steps.length) * 100;

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setTrackId(inputVal || 'demo');
        setSearched(true);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-12 py-10 sm:py-16 space-y-10">

            {/* Header */}
            <div className="text-center space-y-3">
                <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.3em]">Real-Time Tracking</p>
                <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tighter">Track Your Order</h1>
                <p className="text-gray-400 font-medium text-sm">Enter your Order ID to see the latest delivery status.</p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder="Enter Order ID (try: demo)"
                    className="flex-1 bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary focus:ring-4 focus:ring-black/10 transition-all shadow-sm"
                />
                <button
                    type="submit"
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-900 shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                    Track Now
                </button>
            </form>

            {/* Tracking Result */}
            {searched && order && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Order summary card */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-7 sm:p-10 shadow-sm space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 relative shrink-0 overflow-hidden">
                                    <img src={order.image} alt={order.product} className="w-full h-full object-contain mix-blend-multiply p-2" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm sm:text-base">{order.product}</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Order ID: <span className="font-mono">{order.id}</span></p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Placed: {order.date}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-2">
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border ${statusColors[order.status]}`}>
                                    {order.status}
                                </span>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Est. Delivery: <span className="text-gray-700">{order.estimatedDelivery}</span></p>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Carrier info */}
                        <div className="flex flex-wrap items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                            <span className="text-2xl">✈️</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Carrier</p>
                                <p className="font-bold text-slate-900 text-sm">{order.carrier}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tracking No.</p>
                                <p className="font-mono font-bold text-gray-700 text-xs">{order.trackingNum}</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-7 sm:p-10 shadow-sm">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 mb-8">Delivery Timeline</h2>
                        <div className="relative space-y-0">
                            {order.steps.map((step, i) => {
                                const isLast = i === order.steps.length - 1;
                                return (
                                    <div key={i} className="flex gap-5 relative">
                                        {/* Line */}
                                        {!isLast && (
                                            <div className={`absolute left-5 top-10 w-0.5 h-full -translate-x-1/2 ${step.done ? 'bg-primary' : 'bg-gray-100'} transition-colors duration-700`} />
                                        )}
                                        {/* Circle */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm border-2 shrink-0 transition-all duration-700 z-10 ${step.done ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white border-gray-200 text-gray-300'}`}>
                                            {step.done ? '✓' : step.icon}
                                        </div>
                                        {/* Content */}
                                        <div className={`pb-8 flex-1 ${isLast ? 'pb-0' : ''}`}>
                                            <p className={`font-bold text-sm uppercase tracking-tight ${step.done ? 'text-slate-900' : 'text-gray-300'}`}>{step.label}</p>
                                            <p className={`text-[10px] font-bold mt-0.5 ${step.done ? 'text-slate-900' : 'text-gray-300'}`}>{step.date}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Help / Support */}
                    <div className="bg-gray-50 border border-gray-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-5 justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">💬</span>
                            <div>
                                <p className="font-bold text-slate-900 text-sm">Need help with your order?</p>
                                <p className="text-gray-400 text-xs font-medium mt-0.5">Our support team is always ready to assist you.</p>
                            </div>
                        </div>
                        <Link href="/contact" className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shrink-0">
                            Contact Support
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTrackingPage;
