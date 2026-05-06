import React from 'react';
import { getSiteContent } from '@/actions/admin-content';
import ContentManager from '@/components/admin/ContentManager';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage(props: { searchParams: Promise<{ tab?: string }> }) {
    const searchParams = await props.searchParams;
    const initialContent = await getSiteContent();
    const tab = searchParams.tab || 'pages';

    return (
        <ContentManager initialContent={initialContent} initialTab={tab} />
    );
}
