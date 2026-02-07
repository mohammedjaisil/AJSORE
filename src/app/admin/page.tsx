import React from 'react';
import { getAdminStats } from '@/actions/admin';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon="💰" color="bg-emerald-50 text-emerald-600" />
                <StatCard title="Total Orders" value={stats.ordersCount} icon="🛒" color="bg-blue-50 text-blue-600" />
                <StatCard title="Active Customers" value={stats.usersCount} icon="👥" color="bg-purple-50 text-purple-600" />
                <StatCard title="Products" value={stats.productsCount} icon="📦" color="bg-orange-50 text-orange-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                        <Link href="/admin/orders" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View All</Link>
                    </div>
                    {stats.recentOrders.length > 0 ? (
                        <div className="space-y-4">
                            {stats.recentOrders.map((order: any) => (
                                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-sm border border-gray-100">🛍️</div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{order.user_email}</p>
                                            <p className="text-xs text-gray-500 font-medium">#{order.id.slice(0, 8)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">${Number(order.total).toLocaleString()}</p>
                                        <p className={`text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'text-emerald-500' : 'text-amber-500'}`}>{order.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 font-medium text-center py-8">No recent orders found.</p>
                    )}
                </div>

                {/* Low Stock Alert */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">Low Stock Alert</h3>
                        <Link href="/admin/products" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Manage Inventory</Link>
                    </div>
                    {stats.lowStockProducts.length > 0 ? (
                        <div className="space-y-4">
                            {stats.lowStockProducts.map((p: any) => (
                                <div key={p.id} className="flex items-center justify-between p-4 bg-red-50 rounded-2xl border border-red-100">
                                    <div className="flex items-center gap-4">
                                        {p.image && <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt={p.name} />}
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm truncate max-w-[150px]">{p.name}</p>
                                            <p className="text-xs text-red-500 font-bold">Only {p.stock} left</p>
                                        </div>
                                    </div>
                                    <Link href={`/admin/products/${p.id}`} className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-gray-600 shadow-sm hover:scale-105 transition-transform">Update</Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">✅</div>
                            <p className="text-gray-500 font-medium">Inventory looks healthy.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-3xl ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{title}</p>
                <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
            </div>
        </div>
    )
}
