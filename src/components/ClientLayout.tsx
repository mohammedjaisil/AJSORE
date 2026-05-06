'use client';

import { useEffect } from 'react';
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

// Lenis smooth scroll — runs once at top level, independent of auth state
function SmoothScroll() {
    useEffect(() => {
        let rafId: number;

        // Dynamically import to avoid SSR issues
        import('lenis').then(({ default: Lenis }) => {
            const lenis = new Lenis({
                duration: 1.4,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
            } as any);

            function raf(time: number) {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            }

            rafId = requestAnimationFrame(raf);

            // Store on window for external access if needed
            (window as any).__lenis = lenis;
        });

        return () => {
            cancelAnimationFrame(rafId);
            if ((window as any).__lenis) {
                (window as any).__lenis.destroy();
                delete (window as any).__lenis;
            }
        };
    }, []); // Empty deps — runs once, never restarts

    return null;
}

// Session sync — separate from scroll, handles auth state only
function SessionSync() {
    const { data: session, status } = useSession();
    const { login, logout, user } = useCartStore();

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            if (!user || user.email !== session.user.email || user.role !== (session.user as any).role) {
                login(session.user.email, (session.user as any).role);
            }
        } else if (status === 'unauthenticated' && user) {
            logout();
        }
    }, [session, status, login, logout, user]);

    return null;
}

export default function ClientLayout({ children, branding }: { children: React.ReactNode, branding?: any }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    return (
        <SessionProvider>
            <SmoothScroll />
            <SessionSync />
            <ToastContainer />
            <div className={`flex flex-col min-h-screen selection:bg-black selection:text-white overflow-x-hidden ${isAdmin ? '' : 'pb-20 md:pb-0 pt-16'}`}>
                {!isAdmin && <Navbar branding={branding} />}
                {!isAdmin && <Breadcrumbs />}
                <main className="flex-1">
                    {children}
                </main>
                {!isAdmin && <Footer branding={branding} />}
                {!isAdmin && <QuickViewModal />}
                {!isAdmin && <MiniCart />}
                {!isAdmin && <BottomNav />}
            </div>
        </SessionProvider>
    );
}
