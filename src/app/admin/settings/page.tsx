import React from 'react';
import { getSiteSettings } from '@/actions/admin-settings';
import SettingsManager from '@/components/admin/SettingsManager';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
    const initialSettings = await getSiteSettings();

    return (
        <SettingsManager initialSettings={initialSettings} />
    );
}
