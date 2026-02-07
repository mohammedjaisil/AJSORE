import React from 'react';
import { getMedia } from '@/actions/media';
import MediaManager from '@/components/admin/MediaManager';

export const dynamic = 'force-dynamic';

export default async function AdminMediaPage() {
    const media = await getMedia();

    return (
        <div className="space-y-8">
            <MediaManager initialMedia={media} />
        </div>
    );
}
