'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/lib/store';

const BottomNav: React.FC = () => {
    const pathname = usePathname();
    const { cart } = useCartStore();

    const isActive = (path: string) => pathname === path;

    const NavItem = ({ to, icon, label, badgeCount }: { to: string, icon: React.ReactNode, label: string, badgeCount?: number }) => (
        <Link
            href={to}
            className={`relative flex flex-col items-center gap-1 flex-1 py-1 transition-all btn-haptic ${isActive(to) ? 'text-[#005d32]' : 'text-gray-400 hover:text-gray-600'}`}
        >
            <div className="relative">
                {icon}
                {badgeCount !== undefined && badgeCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white animate-in zoom-in">
                        {badgeCount}
                    </span>
                )}
            </div>
            <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
            {isActive(to) && (
                <div className="absolute -bottom-1 w-1 h-1 bg-[#005d32] rounded-full animate-in fade-in slide-in-from-bottom-1" />
            )}
        </Link>
    );

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-2 py-3 z-50 flex justify-around items-center shadow-[0_-8px_20px_rgba(0,0,0,0.06)] rounded-t-[2rem]">
            <NavItem
                to="/"
                label="Home"
                icon={<svg className="w-6 h-6" fill={isActive('/') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}
            />
            <NavItem
                to="/shop"
                label="Explore"
                icon={<svg className="w-6 h-6" fill={isActive('/shop') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            />
            <NavItem
                to="/cart"
                label="Bag"
                badgeCount={cart.length}
                icon={<svg className="w-6 h-6" fill={isActive('/cart') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
            />
            <NavItem
                to="/account"
                label="Profile"
                icon={<svg className="w-6 h-6" fill={isActive('/account') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
            />
        </nav>
    );
};

export default BottomNav;
