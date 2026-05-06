'use client';

import React from 'react';
import { createSupplier } from '@/actions/admin-suppliers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewSupplierPage() {
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        try {
            await createSupplier(formData);
            router.push('/admin/suppliers');
        } catch (error) {
            alert('Error creating supplier');
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/suppliers" className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#e5e5e5]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                </Link>
                <h1 className="text-[22px] font-semibold text-[#1a1a1a] tracking-tight">Add supplier</h1>
            </div>

            <form action={handleSubmit} className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm space-y-4">
                    <h2 className="text-sm font-semibold text-[#1a1a1a]">Supplier basics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#6c6c6c]">Supplier name</label>
                            <input name="name" required placeholder="e.g. AliExpress Tech Global" className="w-full px-3 py-2 rounded-lg border border-[#e5e5e5] text-sm focus:border-[#1a1a1a] outline-none transition-all placeholder:text-[#9c9c9c]" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#6c6c6c]">Contact person</label>
                            <input name="contact_person" placeholder="e.g. John Doe" className="w-full px-3 py-2 rounded-lg border border-[#e5e5e5] text-sm focus:border-[#1a1a1a] outline-none transition-all placeholder:text-[#9c9c9c]" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#6c6c6c]">Email address</label>
                            <input name="email" type="email" required placeholder="e.g. supplier@example.com" className="w-full px-3 py-2 rounded-lg border border-[#e5e5e5] text-sm focus:border-[#1a1a1a] outline-none transition-all placeholder:text-[#9c9c9c]" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-semibold text-[#6c6c6c]">Phone number</label>
                            <input name="phone" placeholder="e.g. +1 234 567 890" className="w-full px-3 py-2 rounded-lg border border-[#e5e5e5] text-sm focus:border-[#1a1a1a] outline-none transition-all placeholder:text-[#9c9c9c]" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#6c6c6c]">Website</label>
                        <input name="website" placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-[#e5e5e5] text-sm focus:border-[#1a1a1a] outline-none transition-all placeholder:text-[#9c9c9c]" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-[#e5e5e5] shadow-sm space-y-4">
                    <h2 className="text-sm font-semibold text-[#1a1a1a]">Address</h2>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-semibold text-[#6c6c6c]">Full address</label>
                        <textarea name="address" rows={3} placeholder="Street, City, State, Country, ZIP" className="w-full px-3 py-2 rounded-lg border border-[#e5e5e5] text-sm focus:border-[#1a1a1a] outline-none transition-all placeholder:text-[#9c9c9c]" />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                    <Link href="/admin/suppliers" className="px-5 py-2 text-sm font-semibold text-[#4a4a4a] hover:bg-white border border-transparent hover:border-[#e5e5e5] rounded-lg transition-all">Cancel</Link>
                    <button type="submit" className="px-5 py-2 bg-[#1a1a1a] text-white text-sm font-semibold rounded-lg hover:bg-[#333] transition-colors">Save supplier</button>
                </div>
            </form>
        </div>
    );
}
