'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import ProductCard from '@/components/ProductCard';
import { getUserOrders } from '@/actions/orders';
import { Order } from '@/types';
import { useToast } from '@/lib/toast-store';

type Tab = 'orders' | 'wishlist' | 'addresses' | 'payment' | 'settings';

const TABS: { id: Tab; label: string; icon: string }[] = [
    { id: 'orders', label: 'My Orders', icon: '📦' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
    { id: 'addresses', label: 'Saved Addresses', icon: '📍' },
    { id: 'payment', label: 'Payment Methods', icon: '💳' },
    { id: 'settings', label: 'Profile Settings', icon: '⚙️' },
];

const Account: React.FC = () => {
    const { user, wishlist, logout, formatPrice } = useCartStore();
    const { data: session, status } = useSession();
    const { addToast } = useToast();
    const [dbOrders, setDbOrders] = useState<Order[]>([]);
    const [isLoadingOrders, setIsLoadingOrders] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('orders');
    const [editName, setEditName] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }

        if (status === 'authenticated' && user) {
            setEditName(user.name);
            const fetchOrders = async () => {
                setIsLoadingOrders(true);
                const data = await getUserOrders();
                setDbOrders(data as Order[]);
                setIsLoadingOrders(false);
            };
            fetchOrders();
        }
    }, [user, router, status]);

    if (status === 'loading' || (status === 'authenticated' && !user)) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin" />
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest animate-pulse">Checking Session...</p>
            </div>
        );
    }

    if (!user) return null;

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-accent-sage/10 text-accent-sage border-accent-sage/20';
            case 'Shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Processing': return 'bg-accent-nude/20 text-accent-nude border-accent-nude/30';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-text-muted border-gray-100';
        }
    };

    const getTimelineProgress = (status: string) => {
        switch (status) {
            case 'Processing': return '33%';
            case 'Shipped': return '66%';
            case 'Delivered': return '100%';
            default: return '0%';
        }
    };

    const timelineSteps = [
        { label: 'Placed', icon: '📝' },
        { label: 'Processing', icon: '⚙️' },
        { label: 'Shipped', icon: '🚚' },
        { label: 'Delivered', icon: '✨' },
    ];

    const handleShareWishlist = () => {
        navigator.clipboard.writeText(window.location.origin + '/wishlist');
        addToast('Wishlist link copied!', 'success');
    };

    return (
        <div className="bg-[#F9F9F9] min-h-screen">
            <div className="max-w-[1400px] mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0 space-y-8 lg:sticky lg:top-32">
                        {/* Profile Info */}
                        <div className="bg-white rounded-5xl p-10 text-center space-y-6 border border-gray-50 shadow-sm">
                            <div className="relative inline-block">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#F9F9F9] shadow-sm mx-auto">
                                    <img
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=000&color=fff&size=128`}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent-sage rounded-full flex items-center justify-center text-white text-[10px] border-2 border-white">✓</div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold tracking-tight uppercase">{user.name}</h2>
                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{user.email}</p>
                            </div>

                            <div className="pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xl font-bold">{dbOrders.length}</p>
                                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Orders</p>
                                </div>
                                <div>
                                    <p className="text-xl font-bold">{wishlist.length}</p>
                                    <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Saved</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="bg-white rounded-4xl p-4 space-y-1 border border-gray-50 shadow-sm">
                            {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                                <Link href="/admin" className="flex items-center gap-4 px-6 py-4 rounded-3xl text-[10px] font-bold uppercase tracking-widest bg-accent-nude/10 text-accent-nude hover:bg-accent-nude/20 transition-all mb-2">
                                    📊 Admin Panel
                                </Link>
                            )}
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-text-muted hover:bg-[#F9F9F9] hover:text-black'}`}
                                >
                                    <span>{tab.icon}</span> {tab.label}
                                </button>
                            ))}
                            <button
                                onClick={async () => { logout(); await signOut({ callbackUrl: '/' }); }}
                                className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all mt-4 border-t border-gray-50 pt-6"
                            >
                                🚪 Sign Out
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        {/* ORDERS TAB */}
                        {activeTab === 'orders' && (
                            <div className="space-y-12 animate-in fade-in duration-500">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                                    <div className="space-y-2">
                                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">My Orders</h1>
                                        <p className="text-text-muted text-sm">{dbOrders.length} collections curated for you.</p>
                                    </div>
                                    <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest hover:underline">Explore More →</Link>
                                </div>

                                {isLoadingOrders ? (
                                    <div className="py-32 flex flex-col items-center justify-center gap-4">
                                        <div className="w-10 h-10 border-2 border-gray-100 border-t-black rounded-full animate-spin" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Fetching Orders...</p>
                                    </div>
                                ) : dbOrders.length > 0 ? (
                                    <div className="space-y-8">
                                        {dbOrders.map((order) => (
                                            <div key={order.id} className="bg-white rounded-5xl border border-gray-50 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                                                {/* Header */}
                                                <div className="p-8 md:p-10 bg-[#F9F9F9]/50 border-b border-gray-50 flex flex-wrap items-center justify-between gap-8">
                                                    <div className="flex flex-wrap gap-10">
                                                        <div>
                                                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted mb-2">Reference</p>
                                                            <p className="text-xs font-bold font-mono text-black">#{order.id.slice(-8).toUpperCase()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted mb-2">Date</p>
                                                            <p className="text-xs font-bold">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted mb-2">Total</p>
                                                            <p className="text-xs font-bold">{formatPrice(order.total)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusStyles(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                        <Link href={`/track?id=${order.id}`} className="px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white border border-gray-200 hover:border-black transition-all">Track</Link>
                                                    </div>
                                                </div>

                                                {/* Tracking */}
                                                <div className="px-10 py-12 max-w-2xl mx-auto relative">
                                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2" />
                                                    <div className="absolute top-1/2 left-0 h-[1px] bg-accent-sage -translate-y-1/2 transition-all duration-1000" style={{ width: getTimelineProgress(order.status) }} />
                                                    <div className="flex justify-between items-center relative z-10">
                                                        {timelineSteps.map((step, i) => {
                                                            const currentIdx = timelineSteps.findIndex(x => x.label === order.status);
                                                            const isDone = i <= (currentIdx === -1 ? 0 : currentIdx);
                                                            return (
                                                                <div key={i} className="flex flex-col items-center gap-3">
                                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${isDone ? 'bg-accent-sage text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-200'}`}>
                                                                        {isDone ? '✓' : step.icon}
                                                                    </div>
                                                                    <span className={`text-[8px] font-bold uppercase tracking-widest ${isDone ? 'text-black' : 'text-gray-300'}`}>{step.label}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* Items */}
                                                <div className="px-8 pb-10 space-y-4">
                                                    {order.items?.map((item, i) => (
                                                        <div key={i} className="flex items-center gap-6 p-6 bg-[#F9F9F9] rounded-3xl border border-transparent hover:border-gray-100 hover:bg-white transition-all">
                                                            <div className="w-16 h-16 bg-white rounded-2xl p-2 flex items-center justify-center border border-gray-50 shrink-0">
                                                                <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs font-bold uppercase tracking-tight truncate">{item.name}</p>
                                                                <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest mt-1">Qty: {item.quantity} · {formatPrice(item.price)}</p>
                                                            </div>
                                                            <Link href={`/product/${item.id}`} className="text-[9px] font-bold uppercase tracking-widest hover:underline">View</Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-32 bg-white rounded-5xl border border-gray-50 flex flex-col items-center gap-6">
                                        <div className="w-20 h-20 bg-[#F9F9F9] rounded-full flex items-center justify-center text-2xl">📦</div>
                                        <h3 className="text-xl font-bold tracking-tight">No orders yet</h3>
                                        <p className="text-text-muted text-sm max-w-xs leading-relaxed">Your journey begins with your first selection. Explore our premium curation.</p>
                                        <Link href="/shop" className="bg-black text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">Start Shopping</Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* WISHLIST TAB */}
                        {activeTab === 'wishlist' && (
                            <div className="space-y-12 animate-in fade-in duration-500">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                                    <div className="space-y-2">
                                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Wishlist</h1>
                                        <p className="text-text-muted text-sm">{wishlist.length} premium pieces saved for later.</p>
                                    </div>
                                    {wishlist.length > 0 && (
                                        <button onClick={handleShareWishlist} className="px-8 py-3 rounded-full border border-gray-200 text-[10px] font-bold uppercase tracking-widest hover:border-black transition-all">Share Link</button>
                                    )}
                                </div>

                                {wishlist.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
                                    </div>
                                ) : (
                                    <div className="text-center py-32 bg-white rounded-5xl border border-gray-50 flex flex-col items-center gap-6">
                                        <div className="w-20 h-20 bg-[#F9F9F9] rounded-full flex items-center justify-center text-2xl">❤️</div>
                                        <h3 className="text-xl font-bold tracking-tight">Your wishlist is empty</h3>
                                        <p className="text-text-muted text-sm max-w-xs leading-relaxed">Collect the pieces that speak to you. They will be waiting here.</p>
                                        <Link href="/shop" className="bg-black text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">Browse Collection</Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* SETTINGS TAB */}
                        {activeTab === 'settings' && (
                            <div className="space-y-12 animate-in fade-in duration-500">
                                <div className="border-b border-gray-100 pb-8">
                                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Settings</h1>
                                    <p className="text-text-muted text-sm mt-2">Manage your profile and security preferences.</p>
                                </div>

                                <div className="bg-white rounded-5xl p-10 md:p-12 space-y-10 border border-gray-50 shadow-sm">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted border-b border-gray-50 pb-6">Personal Profile</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={editName}
                                                onChange={e => setEditName(e.target.value)}
                                                className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white focus:border-black transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted px-1">Email Address</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                readOnly
                                                className="w-full bg-[#F9F9F9] border border-transparent rounded-2xl px-6 py-4 text-sm font-medium text-text-muted opacity-50 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                    <button onClick={() => addToast('Profile updated!', 'success')} className="bg-black text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all transform active:scale-95 shadow-xl shadow-black/10">Update Profile</button>
                                </div>

                                <div className="bg-black text-white rounded-5xl p-10 md:p-12 space-y-10 shadow-2xl shadow-black/20">
                                    <div className="flex items-center gap-6 border-b border-white/10 pb-8">
                                        <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-3xl">🛡️</div>
                                        <div>
                                            <h3 className="text-xl font-bold tracking-tight uppercase">Security</h3>
                                            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Change your password</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {['Current Password', 'New Password', 'Confirm Password'].map((l, i) => (
                                            <div key={i} className="space-y-3">
                                                <label className="text-[9px] font-bold uppercase tracking-widest text-white/30 px-1">{l}</label>
                                                <input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium focus:bg-white/10 focus:border-white/30 transition-all outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => addToast('Password changed!', 'success')} className="bg-white text-black px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all transform active:scale-95">Update Security</button>
                                </div>

                                <div className="p-10 border border-red-100 rounded-4xl bg-red-50/20 space-y-6">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-red-600">Danger Zone</h3>
                                        <p className="text-text-muted text-xs leading-relaxed max-w-lg">Permanently deactivate your account and remove all personal data. This action is irreversible.</p>
                                    </div>
                                    <button className="text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-200 px-8 py-3 rounded-full hover:bg-red-500 hover:text-white transition-all">Deactivate Account</button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Account;
