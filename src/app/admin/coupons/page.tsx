import React from 'react';
import { getCoupons, deleteCoupon, toggleCoupon } from '@/actions/admin-coupons';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminCouponsPage() {
    const coupons = await getCoupons();

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-6 border-b border-slate-50">
                <div className="space-y-1">
                    <h2 className="text-heading">Coupons & Discounts</h2>
                    <p className="text-label">Manage discount codes and promotional offers</p>
                </div>
                <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-slate-300 transition-all cursor-default">
                    <span className="text-lg grayscale group-hover:grayscale-0 transition-all">🎟️</span>
                    <span className="text-label">{coupons.length} Coupons Found</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* List of Coupons */}
                <div className="lg:col-span-2 space-y-6">
                    {coupons.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {coupons.map((coupon) => (
                                <div key={coupon.id} className="bg-white border border-[#e5e5e5] p-6 rounded-xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                                    <div className="relative z-10 space-y-5">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1.5">
                                                <h3 className="text-lg font-bold text-[#1a1a1a] tracking-tight font-mono">{coupon.code}</h3>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                                                    coupon.is_active 
                                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                                        : 'bg-gray-100 text-gray-700 border-gray-200'
                                                }`}>
                                                    {coupon.is_active ? 'Active' : 'Disabled'}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-[#1a1a1a]">{coupon.type === 'PERCENT' ? `${coupon.value}%` : `₹${coupon.value}`}</p>
                                                <p className="text-label text-[#9c9c9c] uppercase">Off</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-label text-[#9c9c9c]">
                                            <div className="space-y-1">
                                                <p>Usage</p>
                                                <p className="text-[#1a1a1a] font-medium">{coupon.used_count} / {coupon.usage_limit || '∞'}</p>
                                            </div>
                                            <div className="space-y-1 text-right">
                                                <p>Expiry</p>
                                                <p className="text-[#1a1a1a] font-medium">{coupon.expiry_date ? new Date(coupon.expiry_date).toLocaleDateString() : 'Never'}</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 pt-1">
                                            <form action={async () => {
                                                'use server';
                                                await toggleCoupon(coupon.id, !coupon.is_active);
                                            }} className="flex-1">
                                                <button className="w-full py-2 bg-[#f6f6f7] text-[#4a4a4a] rounded-lg text-xs font-semibold hover:bg-[#ebebeb] transition-all border border-[#e5e5e5]">
                                                    {coupon.is_active ? 'Deactivate' : 'Activate'}
                                                </button>
                                            </form>
                                            <form action={async () => {
                                                'use server';
                                                await deleteCoupon(coupon.id);
                                            }}>
                                                <button className="px-3.5 py-2 bg-white text-red-500 rounded-lg text-xs font-semibold hover:bg-red-50 transition-all border border-[#e5e5e5]">
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center bg-[#fafafa] rounded-xl border border-dashed border-[#e5e5e5]">
                            <p className="text-label text-[#9c9c9c] normal-case">No coupons found</p>
                        </div>
                    )}
                </div>

                {/* Form (Right) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm space-y-6">
                        <div className="space-y-1">
                            <h3 className="card-title">Create Coupon</h3>
                            <p className="text-label text-[#9c9c9c]">Setup a new discount code</p>
                        </div>

                        <form action={async (formData) => {
                            'use server';
                            const { createCoupon } = await import('@/actions/admin-coupons');
                            await createCoupon(formData);
                        }} className="space-y-4">
                            <div>
                                <label className="text-label text-[#4a4a4a] mb-1.5 block">Coupon Code</label>
                                <input name="code" required placeholder="Ex: WELCOME50" className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium focus:border-[#1a1a1a] outline-none transition-all font-mono" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Type</label>
                                    <select name="type" className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all">
                                        <option value="PERCENT">Percentage (%)</option>
                                        <option value="FIXED">Fixed Amount (₹)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-label text-[#4a4a4a] mb-1.5 block">Value</label>
                                    <input name="value" type="number" required placeholder="10" className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="text-label text-[#4a4a4a] mb-1.5 block">Expiry Date (Optional)</label>
                                <input name="expiry_date" type="date" className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all" />
                            </div>

                            <div>
                                <label className="text-label text-[#4a4a4a] mb-1.5 block">Usage Limit</label>
                                <input name="usage_limit" type="number" placeholder="100" className="w-full bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg px-3 py-2 text-sm font-medium outline-none transition-all" />
                            </div>

                            <button type="submit" className="w-full py-2.5 bg-[#1a1a1a] text-white rounded-lg font-semibold text-xs transition-all hover:bg-black">
                                Create Coupon
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
