import React from 'react';
import { getAdminStats } from '@/actions/admin';
import Link from 'next/link';
import { getOrders } from '@/actions/admin-orders';

export const dynamic = 'force-dynamic';

const ArrowRightIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);

export default async function AdminDashboard() {
    const stats = await getAdminStats();
    const unfulfilledOrders = await getOrders({ fulfillment: 'unfulfilled' });

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric'
    });

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold tracking-tighter uppercase text-text-main">Dashboard</h1>
                    <p className="text-[10px] font-bold text-accent-sage uppercase tracking-[0.3em]">{today}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/admin/products/new" className="px-8 py-3.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-zinc-800 transition-all shadow-xl shadow-black/10 active:scale-95">
                        New Product
                    </Link>
                </div>
            </div>

            {/* Performance Overview Banner */}
            <div className="bg-white rounded-5xl border border-gray-50 p-10 md:p-12 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-sage/5 blur-[80px] -translate-y-1/2 translate-x-1/4" />
                
                <div className="space-y-6 relative z-10 max-w-md">
                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-accent-sage uppercase tracking-[0.2em]">Priority Task</p>
                        <h2 className="text-3xl font-bold tracking-tight text-text-main">Fulfillment Required</h2>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">
                        There are <span className="text-black font-bold">{unfulfilledOrders.length} collections</span> awaiting curation and shipment. Maintain your premium service standards.
                    </p>
                    <Link 
                        href="/admin/orders?fulfillment=unfulfilled" 
                        className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black hover:gap-5 transition-all"
                    >
                        Review Queue <ArrowRightIcon />
                    </Link>
                </div>

                <div className="flex-1 max-w-xl space-y-4 relative z-10">
                    <div className="flex justify-between items-end">
                        <span className="text-sm font-bold uppercase tracking-widest text-text-muted">Efficiency Rate</span>
                        <span className="text-2xl font-bold">{Math.max(100 - Math.round((unfulfilledOrders.length / (stats.ordersCount || 1)) * 100), 0)}%</span>
                    </div>
                    <div className="h-3 bg-[#F9F9F9] rounded-full overflow-hidden border border-gray-50">
                        <div 
                            className="h-full bg-black rounded-full transition-all duration-1500 ease-out"
                            style={{ width: `${Math.max(100 - (unfulfilledOrders.length / (stats.ordersCount || 1)) * 100, 5)}%` }}
                        />
                    </div>
                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] text-right">Target: 100% Excellence</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard
                    title="Revenue"
                    value={`₹${(stats.totalRevenue * 83.5).toLocaleString()}`}
                    trend="+12.5%"
                    trendUp
                    icon="💎"
                />
                <StatCard
                    title="Orders"
                    value={stats.ordersCount}
                    trend={`${unfulfilledOrders.length} pending`}
                    icon="📦"
                />
                <StatCard
                    title="Sessions"
                    value="1,284"
                    trend="+8%"
                    trendUp
                    icon="👤"
                />
                <StatCard
                    title="Conversion"
                    value="2.4%"
                    trend="Average"
                    icon="✨"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-5xl border border-gray-50 shadow-sm overflow-hidden">
                        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-xl font-bold tracking-tight uppercase">Recent Orders</h2>
                            <Link href="/admin/orders" className="text-[10px] font-bold uppercase tracking-widest text-accent-sage hover:underline">View All</Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {unfulfilledOrders.slice(0, 5).map((order) => (
                                <div key={order.id} className="px-10 py-6 flex items-center justify-between hover:bg-[#F9F9F9] transition-all group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-[#F9F9F9] border border-gray-100 flex items-center justify-center text-[10px] font-bold text-text-muted group-hover:scale-105 transition-transform">
                                            {order.user_name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-main uppercase tracking-tight">#{order.id.slice(-6).toUpperCase()}</p>
                                            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">{order.user_name}</p>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="text-sm font-bold text-text-main">₹{(Number(order.total) * 83.5).toLocaleString()}</p>
                                        <span className="inline-block px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest bg-accent-nude/10 text-accent-nude border border-accent-nude/20">Pending</span>
                                    </div>
                                </div>
                            ))}
                            {unfulfilledOrders.length === 0 && (
                                <div className="py-24 text-center space-y-4">
                                    <div className="text-4xl opacity-20">✨</div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">No pending orders. Excellence achieved.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-12">
                    {/* Inventory Alerts */}
                    <div className="bg-white p-10 rounded-5xl border border-gray-50 shadow-sm space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-lg font-bold tracking-tight uppercase">Inventory</h2>
                            <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Low stock alerts</p>
                        </div>
                        <div className="space-y-6">
                            {stats.lowStockProducts.slice(0, 4).map((p: any) => (
                                <div key={p.id} className="space-y-3 group">
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-[11px] font-bold text-text-main truncate uppercase tracking-tight">{p.name}</p>
                                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{p.stock} left</span>
                                    </div>
                                    <div className="h-1.5 bg-[#F9F9F9] rounded-full overflow-hidden border border-gray-50">
                                        <div className="h-full bg-red-500 rounded-full group-hover:scale-x-105 transition-transform origin-left" style={{ width: `${(p.stock / 10) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link href="/admin/inventory" className="block text-center py-4 text-[10px] font-bold uppercase tracking-widest text-text-main border border-gray-100 rounded-2xl hover:border-black transition-all">Manage Assets</Link>
                    </div>

                    {/* Quick Links */}
                    <div className="bg-black text-white p-10 rounded-5xl shadow-2xl shadow-black/20 space-y-8">
                        <h3 className="text-lg font-bold tracking-tight uppercase">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <Link href="/admin/products/new" className="flex items-center justify-between px-6 py-4 bg-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group">
                                Add Product <ArrowRightIcon />
                            </Link>
                            <Link href="/admin/suppliers/new" className="flex items-center justify-between px-6 py-4 bg-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group">
                                New Supplier <ArrowRightIcon />
                            </Link>
                            <Link href="/admin/coupons" className="flex items-center justify-between px-6 py-4 bg-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group">
                                Create Discount <ArrowRightIcon />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, trendUp, icon }: any) {
    return (
        <div className="bg-white p-10 rounded-5xl border border-gray-50 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#F9F9F9] flex items-center justify-center text-xl group-hover:scale-110 transition-transform">{icon}</div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${trendUp ? 'text-accent-sage' : 'text-text-muted'}`}>{trend}</span>
            </div>
            <div className="space-y-1">
                <p className="text-3xl font-bold tracking-tighter">{value}</p>
                <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">{title}</p>
            </div>
        </div>
    );
}
