'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/actions/auth';

const links = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '📦' },
    { name: 'Orders', href: '/admin/orders', icon: '🛒' },
    { name: 'Media', href: '/admin/media', icon: '🖼️' },
    { name: 'Customers', href: '/admin/customers', icon: '👥' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 fixed left-0 top-0 overflow-y-auto">
            <div className="mb-10 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white">AJ</div>
                <h1 className="text-xl font-bold tracking-tight">Admin</h1>
            </div>

            <nav className="space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                ? 'bg-emerald-600/20 text-emerald-400'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span>{link.icon}</span>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-8 left-6 right-6">
                <form action={async () => { await logoutAction() }}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-medium">
                        <span>🚪</span>
                        Log Out
                    </button>
                </form>
            </div>
        </aside>
    );
}
