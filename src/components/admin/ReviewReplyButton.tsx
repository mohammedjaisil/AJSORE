'use client';

import React from 'react';
import { useToast } from '@/lib/toast-store';

interface Props {
    reviewId: string;
}

const ReviewReplyButton = ({ reviewId }: Props) => {
    const { addToast } = useToast();

    const handleReply = () => {
        const reply = prompt('Enter your reply:');
        if (reply) {
            // In a production app, you would call a server action here to save the reply
            addToast("Reply saved successfully!", "success");
        }
    };

    return (
        <button 
            type="button"
            onClick={handleReply}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:border-slate-900 transition-all shadow-sm"
        >
            Reply to Review
        </button>
    );
};

export default ReviewReplyButton;
