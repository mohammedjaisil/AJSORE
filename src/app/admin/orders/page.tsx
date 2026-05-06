import React from 'react';
import { getOrders } from '@/actions/admin-orders';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const SearchIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);

const FilterIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);

export default async function AdminOrdersPage(props: { searchParams: Promise<{ fulfillment?: string, status?: string }> }) {
    const searchParams = await props.searchParams;
    
    const fulfillment = typeof searchParams.fulfillment === 'string' ? searchParams.fulfillment : undefined;
    const status = typeof searchParams.status === 'string' ? searchParams.status : undefined;

    const orders = await getOrders({ 
        fulfillment,
        status 
    });

    const activeTab = searchParams.fulfillment || 'all';

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-gray-100 pb-12">
                <div className="space-y-3">
                    <h1 className="text-5xl font-bold tracking-tighter uppercase text-text-main">Fulfillment</h1>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Order Pipeline & Operations</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest text-text-main hover:bg-[#F9F9F9] rounded-full border border-gray-100 transition-all shadow-sm active:scale-95">Export</button>
                    <button className="bg-black text-white px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl shadow-black/10 hover:bg-zinc-800 transition-all flex items-center gap-3 active:scale-95">CREATE ORDER</button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-5xl border border-gray-50 shadow-sm overflow-hidden">
                <div className="flex items-center px-8 border-b border-gray-50 bg-[#F9F9F9]/50">
                    <TabLink href="/admin/orders" active={activeTab === 'all'}>Master View</TabLink>
                    <TabLink href="/admin/orders?fulfillment=unfulfilled" active={activeTab === 'unfulfilled'}>Pending Queue</TabLink>
                    <TabLink href="/admin/orders?fulfillment=fulfilled" active={activeTab === 'fulfilled'}>Completed</TabLink>
                </div>

                {/* Filter Controls */}
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row items-center gap-4 bg-white relative z-10">
                    <div className="flex-1 flex items-center gap-4 px-6 py-4 bg-[#F9F9F9] border border-transparent rounded-full group focus-within:border-black/20 focus-within:bg-white transition-all w-full">
                        <span className="text-text-muted opacity-50"><SearchIcon /></span>
                        <input placeholder="Identify order by client or ID..." className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-text-main outline-none w-full placeholder-text-muted" />
                    </div>
                    <button className="flex items-center gap-3 px-8 py-4 border border-gray-50 rounded-full text-[10px] font-bold uppercase tracking-widest text-text-main hover:bg-[#F9F9F9] transition-all bg-white shadow-sm shrink-0">
                        <FilterIcon />
                        Filter Status
                    </button>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto relative">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-accent-sage/5 blur-[100px] pointer-events-none" />
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#F9F9F9] border-b border-gray-50">
                                <th className="px-10 py-6 text-left text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Reference</th>
                                <th className="px-10 py-6 text-left text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Timeline</th>
                                <th className="px-10 py-6 text-left text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Client</th>
                                <th className="px-10 py-6 text-left text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Valuation</th>
                                <th className="px-10 py-6 text-left text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Status</th>
                                <th className="px-10 py-6 text-left text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Fulfillment</th>
                                <th className="px-10 py-6 text-left text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Protocol</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 bg-white">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-32 text-center">
                                        <div className="flex flex-col items-center gap-6 opacity-20">
                                            <div className="text-4xl">📜</div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.4em]">Archive is currently empty</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-[#F9F9F9] transition-all group cursor-pointer">
                                        <td className="px-10 py-8">
                                            <Link href={`/admin/orders/${order.id}`} className="text-[11px] font-bold text-text-main hover:text-accent-sage transition-colors uppercase tracking-tight">
                                                #{order.id.slice(-8).toUpperCase()}
                                            </Link>
                                        </td>
                                        <td className="px-10 py-8 text-[11px] font-bold text-text-muted uppercase tracking-tight">
                                            {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="px-10 py-8">
                                            <p className="text-[11px] font-bold text-text-main uppercase tracking-tight">{order.user_name || 'Anonymous'}</p>
                                        </td>
                                        <td className="px-10 py-8 text-[11px] font-bold text-text-main tracking-tighter">
                                            ₹{(Number(order.total) * 83.5).toLocaleString()}
                                        </td>
                                        <td className="px-10 py-8">
                                            <Badge status={order.payment_status || 'Paid'} type="payment" />
                                        </td>
                                        <td className="px-10 py-8">
                                            <Badge status={order.fulfillment_status || 'UNFULFILLED'} type="fulfillment" />
                                        </td>
                                        <td className="px-10 py-8 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                                            Standard
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

function TabLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <Link 
            href={href} 
            className={`px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative ${
                active ? 'text-black' : 'text-text-muted hover:text-black'
            }`}
        >
            {children}
            {active && <div className="absolute bottom-0 left-8 right-8 h-1 bg-black rounded-t-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" />}
        </Link>
    );
}

function Badge({ status, type }: { status: string; type: 'payment' | 'fulfillment' }) {
    const s = (status || '').toLowerCase();
    let colorClass = "bg-gray-50 text-text-muted border-gray-100";
    
    if (s === 'paid' || s === 'fulfilled') colorClass = "bg-accent-sage/10 text-accent-sage border-accent-sage/20 shadow-[0_0_15px_rgba(141,153,139,0.1)]";
    if (s === 'unfulfilled' || s === 'pending') colorClass = "bg-accent-nude/10 text-accent-nude border-accent-nude/20 shadow-[0_0_15px_rgba(235,213,201,0.1)]";
    if (s === 'cancelled' || s === 'refunded') colorClass = "bg-red-50 text-red-500 border-red-100 shadow-[0_0_15px_rgba(239,68,68,0.05)]";

    return (
        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${colorClass} transition-all`}>
            {s}
        </span>
    );
}
