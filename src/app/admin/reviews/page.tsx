import React from 'react';
import { getReviews, deleteReview, toggleReviewApproval } from '@/actions/admin-reviews';
import Link from 'next/link';
import ReviewReplyButton from '@/components/admin/ReviewReplyButton';

export const dynamic = 'force-dynamic';

export default async function AdminReviewsPage() {
    const reviews = await getReviews();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-heading">Reviews</h1>
                    <p className="text-label mt-1">Moderate and reply to customer feedback</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-[#e5e5e5] shadow-sm">
                    <p className="text-label font-bold text-[#1a1a1a]">{reviews.length} Reviews Found</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="bg-white border border-[#e5e5e5] p-6 rounded-xl shadow-sm flex flex-col md:flex-row gap-8 relative overflow-hidden group">
                            
                            {/* User & Product Info */}
                            <div className="md:w-56 shrink-0 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center text-white font-bold text-xs uppercase">
                                        {review.user_name?.charAt(0) || 'A'}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-[#1a1a1a] truncate">{review.user_name}</p>
                                        <div className="flex text-amber-400 text-[10px]">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-[#f6f6f7] rounded-lg border border-[#e5e5e5] space-y-1">
                                    <p className="text-[9px] text-[#9c9c9c] font-bold uppercase tracking-wide">Product Reviewed</p>
                                    <p className="text-xs font-semibold text-[#1a1a1a] truncate">{(review as any).products?.name}</p>
                                </div>
                                <div className="text-[10px] text-[#9c9c9c]">
                                    {new Date(review.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-4">
                                <div className="p-4 bg-[#fcfcfc] rounded-lg border border-[#f0f0f0] min-h-[80px] relative">
                                    <p className="text-sm text-[#4a4a4a] leading-relaxed italic">"{review.comment}"</p>
                                    {!review.is_verified && (
                                        <span className="absolute -top-2.5 right-4 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-[9px] font-bold border border-amber-200">Pending</span>
                                    )}
                                </div>

                                {review.admin_reply && (
                                    <div className="ml-8 p-6 bg-[#005d32]/5 rounded-3xl border border-[#005d32]/10 relative group/reply">
                                        <span className="absolute -top-3 left-6 bg-[#005d32] text-white px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest">Admin Reply</span>
                                        <p className="text-xs font-bold text-[#005d32] leading-relaxed">"{review.admin_reply}"</p>
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#f0f0f0]">
                                    <div className="flex gap-2">
                                        <form action={async () => {
                                            'use server';
                                            await toggleReviewApproval(review.id, !review.is_verified);
                                        }}>
                                            <button className={`px-4 py-1.5 rounded-lg text-[10px] font-semibold transition-all border ${review.is_verified ? 'bg-[#f6f6f7] text-[#9c9c9c] border-[#e5e5e5]' : 'bg-[#f0faf5] text-[#1a8a4f] border-[#c3e9d1] hover:bg-[#1a8a4f] hover:text-white'}`}>
                                                {review.is_verified ? 'Unapprove' : 'Approve'}
                                            </button>
                                        </form>
                                        <ReviewReplyButton reviewId={review.id} />
                                    </div>
                                    
                                    <form action={async () => {
                                        'use server';
                                        await deleteReview(review.id);
                                    }}>
                                        <button className="text-red-500 hover:text-red-700 text-[10px] font-semibold transition-colors">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-24 text-center bg-[#f6f6f7] rounded-xl border border-dashed border-[#e5e5e5]">
                        <p className="text-label">No Reviews Found in the Database</p>
                    </div>
                )}
            </div>
        </div>
    );
}
