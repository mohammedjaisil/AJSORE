import React from 'react';
import { getSuppliers } from '@/actions/admin-suppliers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);

const ExternalLinkIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

export default async function SuppliersPage() {
    const suppliers = await getSuppliers();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-heading">Suppliers</h1>
                    <p className="text-label mt-1">Manage your dropshipping partners and vendors.</p>
                </div>
                <Link
                    href="/admin/suppliers/new"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors"
                >
                    <PlusIcon />
                    Add Supplier
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-[#f0f0f0]">
                                <th className="px-6 py-3 text-left text-label">Supplier</th>
                                <th className="px-6 py-3 text-left text-label">Contact</th>
                                <th className="px-6 py-3 text-left text-label">Website</th>
                                <th className="px-6 py-3 text-left text-label">Status</th>
                                <th className="px-6 py-3 text-right text-label">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f6f6f7]">
                            {suppliers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#9c9c9c]">
                                        No Suppliers Added Yet. Click &quot;Add Supplier&quot; to get started.
                                    </td>
                                </tr>
                            ) : (
                                suppliers.map((supplier: any) => (
                                    <tr key={supplier.id} className="hover:bg-[#fafafa] transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-[#1a1a1a] uppercase tracking-tight">{supplier.name}</p>
                                            <p className="text-label mt-1 lowercase opacity-60 tracking-normal">{supplier.address || 'No address'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-bold text-[#1a1a1a] uppercase tracking-tight">{supplier.contact_person || 'N/A'}</p>
                                            <p className="text-label lowercase opacity-60 tracking-normal">{supplier.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {supplier.website ? (
                                                <a href={supplier.website} target="_blank" className="text-xs text-[#5c5fc8] hover:underline flex items-center gap-1">
                                                    Visit <ExternalLinkIcon />
                                                </a>
                                            ) : (
                                                <span className="text-xs text-[#9c9c9c]">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${
                                                supplier.status === 'ACTIVE' 
                                                    ? 'bg-[#f0faf5] text-[#1a8a4f] border-[#c3e9d1]' 
                                                    : 'bg-[#f6f6f7] text-[#6c6c6c] border-[#e5e5e5]'
                                            }`}>
                                                {supplier.status.toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link 
                                                href={`/admin/suppliers/${supplier.id}`}
                                                className="text-[11px] font-medium text-[#5c5fc8] hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
