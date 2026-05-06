'use client';

import React, { useState, useEffect } from 'react';
import { getNotifications, markAsRead } from '@/actions/admin-notifications';

export default function NotificationCenter() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            const data = await getNotifications();
            setNotifications(data);
        };
        fetch();
    }, []);

    const unreadCount = notifications.filter(n => !n.is_read).length;

    const handleRead = async (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? {...n, is_read: true} : n));
        await markAsRead(id);
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center relative hover:bg-slate-50 transition-all shadow-sm"
            >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-4 w-96 bg-white rounded-[2rem] border border-slate-100 shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Intercept Alerts</h4>
                        <button className="text-[9px] font-bold text-[#005d32] uppercase tracking-widest">Mark All Read</button>
                    </div>
                    
                    <div className="max-h-[32rem] overflow-y-auto divide-y divide-slate-50">
                        {notifications.length > 0 ? (
                            notifications.map((n) => (
                                <div 
                                    key={n.id} 
                                    onClick={() => handleRead(n.id)}
                                    className={`p-6 hover:bg-slate-50 transition-all cursor-pointer relative group ${!n.is_read ? 'bg-[#005d32]/[0.02]' : ''}`}
                                >
                                    {!n.is_read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#005d32]" />}
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-900 flex items-center justify-center text-sm shadow-lg">
                                            {n.type === 'Order' ? '🛒' : n.type === 'Payment' ? '💰' : n.type === 'Stock' ? '⚠️' : '⚙️'}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">{n.title}</p>
                                            <p className="text-[10px] text-slate-500 leading-relaxed">{n.message}</p>
                                            <p className="text-[8px] text-slate-300 font-bold uppercase tracking-widest pt-1">
                                                {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • SYNCED
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-20 text-center space-y-4">
                                <span className="text-4xl grayscale opacity-20">🍃</span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">The Stream is Clear</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-slate-50 text-center">
                        <button className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">View All Signal logs</button>
                    </div>
                </div>
            )}
        </div>
    );
}
