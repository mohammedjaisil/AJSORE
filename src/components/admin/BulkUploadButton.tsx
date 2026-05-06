'use client';

import React from 'react';
import { useToast } from '@/lib/toast-store';

const BulkUploadButton = () => {
    const { addToast } = useToast();

    const handleBulkUpload = () => {
        const csv = prompt('Paste CSV Content (Headers: name, price, stock, category, image)');
        if (csv) {
            const confirmed = window.confirm('Initialize bulk synchronization?');
            if (confirmed) {
                // In a production environment, you would call a server action here
                addToast("Synchronization initialized in background", "success");
            }
        }
    };

    return (
        <button 
            type="button" 
            onClick={handleBulkUpload}
            className="bg-white text-gray-700 border border-gray-200 px-6 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:border-gray-900 transition-all flex items-center gap-2 shadow-sm"
        >
            <span>📥</span> Bulk Data Ingest
        </button>
    );
};

export default BulkUploadButton;
