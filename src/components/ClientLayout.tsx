'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SessionProvider, useSession } from 'next-auth/react';
import { useCartStore } from '@/lib/store';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import MiniCart from '@/components/MiniCart';
import BottomNav from '@/components/BottomNav';
import QuickViewModal from '@/components/QuickViewModal';
import ToastContainer from '@/components/ToastContainer';

function SessionSync() {
    const { data: session, status } = useSession();
    const { login, logout, user } = useCartStore();

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            // Only login if (store) user is not set or different
            if (!user || user.email !== session.user.email || user.role !== (session.user as any).role) {
                login(session.user.email, (session.user as any).role);
            }
        } else if (status === 'unauthenticated' && user) {
            logout();
        }
    }, [session, status, login, logout, user]);

    return null;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }, [pathname]);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, [pathname]);


    const isAdmin = pathname?.startsWith('/admin');

    return (
        <SessionProvider>
            <SessionSync />
            <ToastContainer />
            <div className={`flex flex-col min-h-screen selection:bg-[#005d32] selection:text-white overflow-x-hidden ${isAdmin ? '' : 'pb-20 md:pb-0 pt-24 md:pt-32'}`}>
                {!isAdmin && <Navbar />}
                {!isAdmin && <Breadcrumbs />}
                <main className="flex-1">
                    <div
                        className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        {children}
                    </div>
                </main>
                {!isAdmin && <Footer />}
                {!isAdmin && <QuickViewModal />}
                {!isAdmin && <MiniCart />}
                {!isAdmin && <BottomNav />}
            </div>
        </SessionProvider>
    );
}
