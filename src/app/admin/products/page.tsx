import React from 'react';
import { supabaseAdmin } from "@/lib/supabase";
import Link from 'next/link';
import { deleteProduct } from '@/actions/admin-products';
import BulkUploadButton from '@/components/admin/BulkUploadButton';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage(props: { searchParams: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    let query = supabaseAdmin.from('products').select('*');
    if (searchParams.q) {
        query = query.ilike('name', `%${searchParams.q}%`);
    }
    const { data: products } = await query.order('created_at', { ascending: false });

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 border-b border-gray-100 pb-12">
                <div className="space-y-3">
                    <h1 className="text-5xl font-bold tracking-tighter uppercase text-text-main">Collections</h1>
                    <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Curation & Asset Management</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <BulkUploadButton />
                    <Link
                        href="/admin/products/new"
                        className="bg-black text-white px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl shadow-black/10 hover:bg-zinc-800 transition-all flex items-center gap-3 active:scale-95"
                    >
                        <span>NEW COLLECTION</span>
                    </Link>
                </div>
            </div>

            {/* Utility Bar */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <form className="relative w-full md:w-[400px]">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted opacity-50 text-sm">🔎</span>
                    <input 
                        name="q" 
                        defaultValue={searchParams.q}
                        placeholder="Search assets..." 
                        className="w-full bg-white border border-gray-50 rounded-full pl-14 pr-8 py-4 text-[10px] font-bold uppercase tracking-widest focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all shadow-sm"
                    />
                </form>
                <div className="flex gap-4">
                    <div className="bg-white px-8 py-4 rounded-full border border-gray-50 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {products?.length || 0} Assets Identified
                    </div>
                </div>
            </div>

            {/* Assets Table */}
            <div className="bg-white rounded-5xl border border-gray-50 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-sage/5 blur-[100px] pointer-events-none" />
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F9F9F9] border-b border-gray-50">
                                <th className="px-10 py-6 text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Asset Detail</th>
                                <th className="px-10 py-6 text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Classification</th>
                                <th className="px-10 py-6 text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Inventory</th>
                                <th className="px-10 py-6 text-[9px] font-bold text-text-muted uppercase tracking-[0.2em]">Valuation</th>
                                <th className="px-10 py-6 text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-[#F9F9F9] transition-all group/row">
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-8">
                                                <div className="w-20 h-20 bg-[#F9F9F9] rounded-3xl overflow-hidden border border-gray-100 flex-shrink-0 group-hover/row:scale-105 transition-all duration-500 shadow-sm">
                                                    <img src={product.image} className="w-full h-full object-contain p-2 group-hover/row:scale-110 transition-transform duration-1000" alt={product.name} />
                                                </div>
                                                <div className="min-w-0 space-y-1.5">
                                                    <p className="font-bold text-text-main text-sm tracking-tight uppercase leading-tight">{product.name}</p>
                                                    <div className="flex gap-2">
                                                        <span className="text-[8px] text-text-muted font-bold tracking-widest uppercase px-2.5 py-1 bg-white rounded-lg border border-gray-50">REF: {product.id.slice(-6).toUpperCase()}</span>
                                                        {product.type === 'VARIABLE' && <span className="text-[8px] text-accent-sage font-bold tracking-widest uppercase px-2.5 py-1 bg-accent-sage/5 rounded-lg border border-accent-sage/10">MULTIFORM</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className="px-4 py-1.5 bg-white rounded-full text-[9px] font-bold text-text-muted uppercase tracking-[0.1em] border border-gray-100 shadow-sm">{product.category_name}</span>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-black rounded-full shadow-lg shadow-black/10 border border-zinc-800">
                                                <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? (product.stock < 10 ? 'bg-amber-400 animate-pulse' : 'bg-accent-sage shadow-[0_0_10px_rgba(141,153,139,0.5)]') : 'bg-red-500'}`} />
                                                <span className={`font-bold text-[9px] uppercase tracking-widest ${product.stock === 0 ? 'text-red-400' : (product.stock < 10 ? 'text-amber-300' : 'text-accent-sage')}`}>
                                                    {product.stock} {product.stock === 1 ? 'Unit' : 'Units'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <p className="font-bold text-text-main text-sm tracking-tighter">₹{(product.price * 83.5).toLocaleString()}</p>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                                                <Link href={`/admin/products/${product.id}`} className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 text-text-muted hover:text-black hover:border-black rounded-2xl transition-all shadow-sm">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </Link>
                                                <DeleteButton id={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-40 text-center">
                                        <div className="flex flex-col items-center gap-8">
                                            <div className="w-24 h-24 bg-[#F9F9F9] rounded-[3rem] flex items-center justify-center text-4xl border border-gray-50 opacity-20 grayscale">📦</div>
                                            <p className="text-text-muted font-bold text-[10px] uppercase tracking-[0.4em]">Vault Is Empty</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function DeleteButton({ id }: { id: string }) {
    return (
        <form action={async () => {
            'use server';
            await deleteProduct(id);
        }}>
            <button type="submit" className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 text-text-muted hover:text-red-500 hover:border-red-500 rounded-2xl transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
        </form>
    );
}
