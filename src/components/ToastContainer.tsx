'use client';

import React from 'react';
import { useToast, ToastType } from '@/lib/toast-store';

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        pointer-events-auto
                        flex items-center gap-4 px-6 py-4 rounded-3xl shadow-2xl border min-w-[320px] max-w-md
                        animate-in slide-in-from-right-full duration-500
                        ${toast.type === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                            toast.type === 'error' ? 'bg-red-50 border-red-100 text-red-800' :
                                'bg-blue-50 border-blue-100 text-blue-800'}
                    `}
                >
                    <div className="text-xl">
                        {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-black uppercase tracking-widest opacity-50 mb-0.5">
                            {toast.type}
                        </p>
                        <p className="text-sm font-bold leading-snug">{toast.message}</p>
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="p-1 hover:bg-black/5 rounded-lg transition-colors text-lg"
                    >
                        ✕
                    </button>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 w-full animate-toast-progress origin-left" />
                </div>
            ))}

            <style jsx>{`
                @keyframes toast-progress {
                    from { transform: scaleX(1); }
                    to { transform: scaleX(0); }
                }
                .animate-toast-progress {
                    animation: toast-progress 5s linear forwards;
                }
            `}</style>
        </div>
    );
}
