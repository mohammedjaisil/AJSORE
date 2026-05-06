import React from 'react';
import { supabaseAdmin } from "@/lib/supabase";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminPaymentsPage() {
    const { data: transactions } = await supabaseAdmin
        .from('orders')
        .select('id, user_email, total, status, created_at, updated_at')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-heading">Payments</h1>
                    <p className="text-label mt-1">View and track all store transactions</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-[#e5e5e5] shadow-sm">
                    <p className="text-label text-[#1a8a4f] font-bold">Total revenue: ₹{((transactions?.reduce((acc, t) => acc + Number(t.total), 0) || 0) * 83.5).toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#fcfcfc] border-b border-[#f0f0f0]">
                            <tr>
                                <th className="px-6 py-3 text-label">Transaction ID</th>
                                <th className="px-6 py-3 text-label">Customer</th>
                                <th className="px-6 py-3 text-label">Date</th>
                                <th className="px-6 py-3 text-label">Status</th>
                                <th className="px-6 py-3 text-label text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f6f6f7]">
                            {transactions && transactions.length > 0 ? (
                                transactions.map((txn) => (
                                    <tr key={txn.id} className="hover:bg-[#fafafa] transition-all group/row">
                                        <td className="px-6 py-4">
                                            <p className="text-[11px] font-mono text-[#1a1a1a]">TXN_{txn.id.slice(-8).toUpperCase()}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs font-semibold text-[#1a1a1a]">{txn.user_email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-0.5">
                                                <p className="text-xs text-[#1a1a1a]">{new Date(txn.created_at).toLocaleDateString()}</p>
                                                <p className="text-[10px] text-[#9c9c9c]">{new Date(txn.created_at).toLocaleTimeString()}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                                                txn.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                                                txn.status === 'Refunded' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                'bg-[#f0faf5] text-[#1a8a4f] border-[#c3e9d1]'
                                            }`}>
                                                {txn.status === 'Cancelled' ? 'Cancelled' : txn.status === 'Refunded' ? 'Refunded' : 'Completed'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <p className="font-bold text-[#1a1a1a] text-xs">₹{(txn.total * 83.5).toLocaleString()}</p>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-[#9c9c9c] text-sm">No transactions found in the database.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
