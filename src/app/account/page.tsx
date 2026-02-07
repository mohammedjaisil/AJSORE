'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import ProductCard from '@/components/ProductCard';

type Tab = 'orders' | 'wishlist' | 'settings';

const Account: React.FC = () => {
    const { user, orders, wishlist, logout, reorder, cart } = useCartStore();
    const [activeTab, setActiveTab] = useState<Tab>('orders');
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null; // Don't render anything while redirecting
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Shipped': return 'bg-blue-100 text-blue-700';
            case 'Processing': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const statusTimeline = [
        { label: 'Ordered', icon: '📝', date: 'Oct 28' },
        { label: 'Processing', icon: '⚙️', date: 'Oct 29' },
        { label: 'Shipped', icon: '🚚', date: 'Oct 30' },
        { label: 'Delivered', icon: '🎁', date: '--' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Profile Card */}
                <aside className="w-full lg:w-80 space-y-6">
                    <div className="bg-white border rounded-[2.5rem] p-8 text-center space-y-6 shadow-sm">
                        <div className="relative inline-block">
                            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto border-4 border-[#f3f9f6]" />
                            <button className="absolute bottom-0 right-0 bg-[#005d32] text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                            </button>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900">{user.name}</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{user.email}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                                <Link
                                    href="/admin"
                                    className="w-full py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-left flex items-center gap-3 bg-purple-50 text-purple-600 hover:bg-purple-100 mb-2"
                                >
                                    <span>📊</span> Admin Dashboard
                                </Link>
                            )}
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-left flex items-center gap-3 ${activeTab === 'orders' ? 'bg-[#005d32] text-white shadow-lg shadow-[#005d32]/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                                <span>📦</span> My Orders
                            </button>
                            <button
                                onClick={() => setActiveTab('wishlist')}
                                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-left flex items-center gap-3 ${activeTab === 'wishlist' ? 'bg-[#005d32] text-white shadow-lg shadow-[#005d32]/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                                <span>❤️</span> Wishlist
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`w-full py-3.5 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all text-left flex items-center gap-3 ${activeTab === 'settings' ? 'bg-[#005d32] text-white shadow-lg shadow-[#005d32]/20' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                            >
                                <span>👤</span> Account Settings
                            </button>
                        </div>
                        <button
                            onClick={async () => {
                                logout(); // Clear zustand store
                                await signOut({ callbackUrl: '/' });
                            }}
                            className="w-full text-center text-xs font-black uppercase text-red-500 hover:underline pt-4 border-t"
                        >
                            Log Out
                        </button>
                    </div>

                    <div className="bg-[#f3f9f6] p-8 rounded-[2.5rem] border border-[#005d32]/5 space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#005d32]">Premium Benefits</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                <span className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">✨</span>
                                Free Shipping on all orders
                            </div>
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-600">
                                <span className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">🎁</span>
                                Exclusive Early Access
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 space-y-12">
                    {activeTab === 'orders' && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-end justify-between">
                                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Order History</h1>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{orders.length} Orders total</p>
                            </div>

                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white border rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-8 border-b bg-gray-50/50 flex flex-wrap items-center justify-between gap-6">
                                            <div className="flex flex-wrap gap-8">
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                                                    <p className="font-black text-gray-900">{order.id}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Placed</p>
                                                    <p className="font-black text-gray-900">{order.date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                                    <p className="font-black text-[#005d32]">${order.total.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                                <button
                                                    onClick={() => reorder(order.id)}
                                                    className="bg-white border-2 border-[#005d32] text-[#005d32] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#005d32] hover:text-white transition-all shadow-sm"
                                                >
                                                    Reorder All
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-8 space-y-8">
                                            {/* Tracking Timeline */}
                                            {order.status !== 'Delivered' && (
                                                <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-gray-100">
                                                    <div className="flex items-center justify-between max-w-xl mx-auto relative mb-2">
                                                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2" />
                                                        <div className="absolute top-1/2 left-0 h-0.5 bg-[#005d32] -translate-y-1/2" style={{ width: '66%' }} />
                                                        {statusTimeline.map((s, i) => (
                                                            <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shadow-md border-2 ${i < 3 ? 'bg-[#005d32] text-white border-[#005d32]' : 'bg-white text-gray-400 border-gray-100'}`}>
                                                                    {s.icon}
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className={`text-[9px] font-black uppercase tracking-tighter ${i < 3 ? 'text-[#005d32]' : 'text-gray-400'}`}>{s.label}</p>
                                                                    <p className="text-[8px] text-gray-400 font-bold">{s.date}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="divide-y">
                                                {order.items.map((item, i) => (
                                                    <div key={i} className="py-4 flex items-center gap-6 first:pt-0 last:pb-0 group">
                                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl p-3 flex items-center justify-center shrink-0">
                                                            <img src={item.image} alt={item.name} className="max-h-full mix-blend-multiply group-hover:scale-110 transition-transform" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                                                            <p className="text-[10px] text-gray-400 font-black uppercase">Qty: {item.quantity} • ${item.price.toFixed(2)}</p>
                                                        </div>
                                                        <Link
                                                            href={`/product/${item.id}`}
                                                            className="text-[10px] font-black text-[#005d32] uppercase hover:underline"
                                                        >
                                                            Track Item
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === 'wishlist' && (
                        <section className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-end justify-between">
                                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Your Wishlist</h1>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{wishlist.length} Items saved</p>
                            </div>

                            {wishlist.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
                                </div>
                            ) : (
                                <div className="text-center py-24 bg-white border-2 border-dashed border-gray-100 rounded-[2.5rem]">
                                    <span className="text-5xl block mb-4">✨</span>
                                    <p className="text-gray-400 font-bold">Your wishlist is currently empty.</p>
                                    <Link href="/shop" className="text-[#005d32] font-black uppercase text-xs mt-4 inline-block hover:underline">Explore Products</Link>
                                </div>
                            )}
                        </section>
                    )}

                    {activeTab === 'settings' && (
                        <section className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="flex items-end justify-between">
                                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Account Details</h1>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Saved Addresses */}
                                <div className="bg-white border rounded-[2.5rem] p-8 space-y-6">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <h3 className="font-black text-gray-900 uppercase tracking-tighter">Saved Addresses</h3>
                                        <button className="text-[10px] font-black text-[#005d32] uppercase hover:underline">+ Add New</button>
                                    </div>
                                    <div className="space-y-4">
                                        {user.addresses.map(addr => (
                                            <div key={addr.id} className="p-4 bg-gray-50 rounded-2xl flex items-start gap-4 hover:border-[#005d32] border border-transparent transition-all group">
                                                <span className="text-xl">🏠</span>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black text-[#005d32] uppercase tracking-widest">{addr.type}</p>
                                                    <p className="text-sm font-medium text-gray-600 leading-snug">{addr.address}</p>
                                                </div>
                                                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <svg className="w-4 h-4 text-gray-400 hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="bg-white border rounded-[2.5rem] p-8 space-y-6">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <h3 className="font-black text-gray-900 uppercase tracking-tighter">Payment Methods</h3>
                                        <button className="text-[10px] font-black text-[#005d32] uppercase hover:underline">+ Add New</button>
                                    </div>
                                    <div className="space-y-4">
                                        {user.payments.map(pay => (
                                            <div key={pay.id} className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4 hover:border-[#005d32] border border-transparent transition-all group">
                                                <span className="text-xl">{pay.type === 'Visa' ? '💳' : '🏦'}</span>
                                                <div className="flex-1">
                                                    <p className="text-sm font-black text-gray-900">{pay.type} Card</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ending in {pay.last4}</p>
                                                </div>
                                                <div className="bg-white px-3 py-1 rounded-lg text-[8px] font-black uppercase text-gray-400 border">Default</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Account Security */}
                            <div className="bg-gray-900 text-white rounded-[2.5rem] p-12 space-y-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#005d32] opacity-20 blur-[100px] pointer-events-none" />
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black uppercase tracking-tighter">Account Security</h3>
                                        <p className="text-gray-400 text-sm font-medium">Keep your account safe by updating your password regularly.</p>
                                    </div>
                                    <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-gray-100 transition-all transform active:scale-95">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Account;
