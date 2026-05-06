import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { requireAdmin } from '@/lib/auth-utils';
import AdminHeader from '@/components/admin/AdminHeader';
import { getSiteSettings } from '@/actions/admin-settings';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireAdmin();
    const settings = await getSiteSettings();

    return (
        <div className="min-h-screen bg-[#F9F9F9] font-outfit">
            <AdminSidebar branding={settings?.branding} />
            <main className="ml-[280px] min-h-screen flex flex-col">
                <AdminHeader />
                <div className="flex-1 px-10 py-10 w-full max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
