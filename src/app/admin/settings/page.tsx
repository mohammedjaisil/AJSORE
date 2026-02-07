import React from 'react';
import { getCategories } from '@/actions/admin-categories';
import { deleteCategory, createCategory } from '@/actions/admin-categories';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Store Settings</h2>

            {/* Categories Management */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Categories</h3>
                        <p className="text-gray-400 text-sm font-medium">Manage product collections</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: cat.bg_color || '#f3f9f6' }}>
                                    {cat.icon || '📁'}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{cat.name}</p>
                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">{cat.slug}</p>
                                </div>
                            </div>
                            <form action={async () => {
                                'use server';
                                await deleteCategory(cat.id);
                            }}>
                                <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">🗑️</button>
                            </form>
                        </div>
                    ))}

                    <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-100 p-6 rounded-[2rem] flex items-center justify-center hover:bg-emerald-50 transition-colors">
                        <AddCategoryButton />
                    </div>
                </div>
            </section>

            {/* Global Rules (Currencies, Taxes - Placeholder logic for future expansion) */}
            <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-gray-900 capitalize">Global Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Store Currency</label>
                        <select className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-gray-700 focus:outline-emerald-500">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Tax Rate (%)</label>
                        <input type="number" defaultValue={20} className="w-full bg-gray-50 border border-transparent rounded-2xl px-6 py-4 text-sm font-bold text-gray-700 focus:outline-emerald-500" />
                    </div>
                </div>
                <div className="pt-4">
                    <button className="bg-[#005d32] text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-[11px] shadow-xl shadow-[#005d32]/20 hover:scale-105 active:scale-95 transition-all">Save Global Settings</button>
                </div>
            </section>
        </div>
    );
}

function AddCategoryButton() {
    return (
        <form action={async (formData: FormData) => {
            'use server';
            const name = formData.get('name') as string;
            if (name) await createCategory(name);
        }} className="flex gap-2">
            <input name="name" placeholder="Category name..." className="bg-transparent border-b border-emerald-200 focus:border-emerald-500 outline-none px-2 py-1 text-sm font-bold text-emerald-900 placeholder:text-emerald-300" />
            <button className="text-emerald-600 font-bold text-lg">+</button>
        </form>
    );
}
