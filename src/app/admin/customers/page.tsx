import React from 'react';
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage(props: { searchParams: Promise<{ q?: string, email?: string }> }) {
    const searchParams = await props.searchParams;
    let query = supabaseAdmin.from('users').select('*');
    
    if (searchParams.email) {
        query = query.eq('email', searchParams.email);
    } else if (searchParams.q) {
        query = query.ilike('name', `%${searchParams.q}%`);
    }

    const { data: users } = await query.order('created_at', { ascending: false });

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-gray-100 pb-12">
                <div className="space-y-3">
                    <h1 className="text-5xl font-bold tracking-tighter uppercase text-text-main">Audience</h1>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Clientele & Member Management</p>
                </div>
                <div className="bg-white px-8 py-4 rounded-full border border-gray-50 shadow-sm flex items-center gap-4">
                    <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-sm">👥</div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-main">{users?.length || 0} Registered Clients</span>
                </div>
            </div>

            {/* Utility Bar */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <form className="relative w-full md:w-[400px]">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted opacity-50 text-sm">🔎</span>
                    <input 
                        name="q" 
                        defaultValue={searchParams.q}
                        placeholder="Search client directory..." 
                        className="w-full bg-white border border-gray-50 rounded-full pl-14 pr-8 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all shadow-sm"
                    />
                </form>
            </div>

            {/* Client Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="bg-white p-10 rounded-5xl border border-gray-50 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-nude/5 blur-[40px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                            
                            <div className="relative z-10 space-y-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-xl text-white font-bold group-hover:scale-105 transition-all duration-500 shadow-xl shadow-black/10">
                                        {user.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="min-w-0 space-y-1">
                                        <p className="font-bold text-text-main text-sm tracking-tight uppercase truncate">{user.name || 'Private Client'}</p>
                                        <p className="text-[10px] text-text-muted font-bold tracking-widest truncate">{user.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-50">
                                    <div className="space-y-1.5">
                                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Designation</p>
                                        <p className="text-[10px] font-bold text-accent-sage uppercase tracking-widest">{user.role || 'Member'}</p>
                                    </div>
                                    <div className="space-y-1.5 text-right">
                                        <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Induction</p>
                                        <p className="text-[10px] font-bold text-text-main uppercase tracking-widest">{new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-[#F9F9F9] text-text-muted rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all border border-transparent shadow-sm active:scale-95">
                                    Client Profile
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-40 text-center bg-white rounded-5xl border border-dashed border-gray-100">
                        <div className="text-4xl opacity-20 mb-6">👤</div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">Directory Is Empty</p>
                    </div>
                )}
            </div>
        </div>
    );
}
