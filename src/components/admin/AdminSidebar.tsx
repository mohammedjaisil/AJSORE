'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { logoutAction } from '@/actions/auth';
import { useCartStore } from '@/lib/store';

// --- SVG Icons ---
const Icons = {
    Home: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
    Orders: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
    ),
    Products: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
    ),
    Categories: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    ),
    Customers: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
    ),
    Marketing: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    ),
    Discounts: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
    ),
    Analytics: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    ),
    Content: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    ),
    Media: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    ),
    Payments: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    ),
    Supplier: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    OnlineStore: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
    ),
    Chevron: ({ open }: { open: boolean }) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}><polyline points="6 9 12 15 18 9"/></svg>
    ),
    Logout: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    ),
    Settings: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 000 14.14M4.93 4.93a10 10 0 000 14.14"/><path d="M20.1 9H22m-20 0h1.9M14.5 3.5l1 1.7M8.5 3.5l-1 1.7M14.5 20.5l1-1.7M8.5 20.5l-1-1.7M20.1 15H22M2 15h1.9"/></svg>
    ),
};

// --- Navigation Structure ---
const navGroups = [
    {
        label: null,
        items: [
            { name: 'Home', href: '/admin', icon: Icons.Home, exact: true },
        ],
    },
    {
        label: 'Store',
        items: [
            {
                name: 'Orders', href: '/admin/orders', icon: Icons.Orders,
                sub: [
                    { name: 'All Orders', href: '/admin/orders' },
                    { name: 'Unfulfilled', href: '/admin/orders?fulfillment=unfulfilled' },
                    { name: 'Abandoned', href: '/admin/orders?status=abandoned' },
                    { name: 'Returns', href: '/admin/orders?status=returns' },
                ],
            },
            {
                name: 'Products', href: '/admin/products', icon: Icons.Products,
                sub: [
                    { name: 'All Products', href: '/admin/products' },
                    { name: 'Inventory', href: '/admin/inventory' },
                    { name: 'Collections', href: '/admin/categories' },
                    { name: 'Reviews', href: '/admin/reviews' },
                ],
            },
            { name: 'Customers', href: '/admin/customers', icon: Icons.Customers },
            { name: 'Payments', href: '/admin/payments', icon: Icons.Payments },
        ],
    },
    {
        label: 'Dropshipping',
        items: [
            { name: 'Suppliers', href: '/admin/suppliers', icon: Icons.Supplier },
            { name: 'Purchase Orders', href: '/admin/suppliers/purchases', icon: Icons.Orders },
        ],
    },
    {
        label: 'Marketing & Analytics',
        items: [
            { name: 'Marketing', href: '/admin/reports', icon: Icons.Marketing },
            { name: 'Discounts', href: '/admin/coupons', icon: Icons.Discounts },
            { name: 'Analytics', href: '/admin/reports?tab=analytics', icon: Icons.Analytics },
        ],
    },
    {
        label: 'Online Store',
        items: [
            { name: 'Themes', href: '/admin/content?tab=themes', icon: Icons.OnlineStore },
            { name: 'Navigation', href: '/admin/content?tab=nav', icon: Icons.Categories },
            { name: 'Pages', href: '/admin/content', icon: Icons.Content },
            { name: 'Media', href: '/admin/media', icon: Icons.Media },
        ],
    },
];

export default function AdminSidebar({ branding }: { branding?: any }) {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 w-[280px] bg-white border-r border-gray-100 flex flex-col z-[60] shadow-sm">
            {/* Logo Section */}
            <div className="h-24 px-8 flex items-center shrink-0 border-b border-gray-50/50">
                <Link href="/admin" className="flex items-center gap-3 group">
                    {branding?.logo_url ? (
                        <img src={branding.logo_url} alt={branding?.site_name || 'Admin'} className="h-9 w-auto object-contain transition-transform group-hover:scale-105" />
                    ) : (
                        <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center text-white font-bold transition-all group-hover:scale-105 active:scale-95 shadow-xl shadow-black/10">
                            {(branding?.site_name || 'BUYKKO').charAt(0)}
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-sm font-bold tracking-tighter uppercase text-text-main">{branding?.site_name || 'BUYKKO'}</span>
                        <span className="text-[9px] font-bold text-accent-sage uppercase tracking-[0.2em] -mt-0.5">Control Panel</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-8 scrollbar-hide">
                <React.Suspense fallback={<div className="h-24 flex items-center justify-center text-[10px] text-text-muted uppercase tracking-widest animate-pulse">Loading...</div>}>
                    <SidebarNav pathname={pathname} />
                </React.Suspense>
            </nav>

            {/* Footer Utilities */}
            <div className="p-6 border-t border-gray-50 space-y-2">
                <Link
                    href="/admin/settings"
                    className={`flex items-center gap-4 px-6 py-4 rounded-3xl text-[10px] font-bold uppercase tracking-widest transition-all ${pathname.startsWith('/admin/settings') ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-text-muted hover:bg-[#F9F9F9] hover:text-black'}`}
                >
                    <Icons.Settings />
                    <span>Settings</span>
                </Link>
                <form action={async () => { await logoutAction(); }}>
                    <button
                        type="submit"
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all"
                    >
                        <Icons.Logout />
                        <span>Sign Out</span>
                    </button>
                </form>
            </div>
        </aside>
    );
}

function SidebarNav({ pathname }: { pathname: string }) {
    const searchParams = useSearchParams();
    return (
        <>
            {navGroups.map((group, gi) => (
                <div key={gi} className="space-y-3">
                    {group.label && (
                        <p className="px-6 text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] mb-4">
                            {group.label}
                        </p>
                    )}
                    <ul className="space-y-1">
                        {group.items.map((item) => (
                            <NavItem key={item.href + item.name} item={item} pathname={pathname} searchParams={searchParams} />
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
}

function NavItem({ item, pathname, searchParams }: NavItemProps & { searchParams: URLSearchParams }) {
    const fullCurrent = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
    
    const activeSubIndex = useMemo(() => {
        if (!item.sub) return -1;
        return item.sub.findIndex(s => {
            if (s.href === fullCurrent) return true;
            if (!searchParams.toString() && s.href === pathname) return true;
            return false;
        });
    }, [item.sub, fullCurrent, pathname, searchParams]);

    const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
    const hasSub = item.sub && item.sub.length > 0;
    const isSubActive = activeSubIndex !== -1;
    
    const [open, setOpen] = useState(isSubActive || isActive);
    const Icon = item.icon;

    return (
        <li>
            {hasSub ? (
                <button
                    onClick={() => setOpen(!open)}
                    className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-3xl text-[10px] font-bold uppercase tracking-widest transition-all group ${
                        isActive || isSubActive
                            ? 'bg-black text-white shadow-xl shadow-black/10'
                            : 'text-text-muted hover:bg-[#F9F9F9] hover:text-black'
                    }`}
                >
                    <span className="shrink-0"><Icon /></span>
                    <span className="flex-1 text-left">{item.name}</span>
                    <Icons.Chevron open={open} />
                </button>
            ) : (
                <Link
                    href={item.href}
                    className={`flex items-center gap-4 px-6 py-3.5 rounded-3xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                        isActive
                            ? 'bg-black text-white shadow-xl shadow-black/10'
                            : 'text-text-muted hover:bg-[#F9F9F9] hover:text-black'
                    }`}
                >
                    <span className="shrink-0"><Icon /></span>
                    <span className="flex-1">{item.name}</span>
                </Link>
            )}

            {hasSub && open && (
                <ul className="mt-2 ml-10 space-y-1 border-l-2 border-gray-50 pl-4">
                    {item.sub!.map((s, idx) => {
                        const sActive = idx === activeSubIndex;
                        return (
                            <li key={s.href}>
                                <Link
                                    href={s.href}
                                    className={`block py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                        sActive ? 'text-accent-sage' : 'text-text-muted hover:text-black'
                                    }`}
                                >
                                    {s.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}
