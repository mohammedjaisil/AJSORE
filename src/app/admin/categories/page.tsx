import React from 'react';
import { getCategories, deleteCategory } from '@/actions/admin-categories';
import CategoryForm from '@/components/admin/CategoryForm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage(props: { searchParams: Promise<{ edit?: string }> }) {
    const searchParams = await props.searchParams;
    const categories = await getCategories();
    const editCategory = searchParams.edit ? categories.find(c => c.id === searchParams.edit) : null;

    // Grouping for "Subcategories" display
    const rootCategories = categories.filter(c => !c.parent_id);
    const getSubcategories = (parentId: string) => categories.filter(c => c.parent_id === parentId);

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-6 border-b border-slate-50">
                <div className="space-y-1">
                    <h2 className="text-heading">Categories</h2>
                    <p className="text-label">Organize products into categories and subcategories</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:border-slate-300 transition-all cursor-default">
                    <span className="text-lg grayscale group-hover:grayscale-0 transition-all">📂</span>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">{categories.length} Categories Found</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                {/* Taxonomy Tree (Left) */}
                <div className="lg:col-span-3 space-y-6">
                    {rootCategories.length > 0 ? (
                        <div className="space-y-4">
                            {rootCategories.map((cat) => {
                                const subs = getSubcategories(cat.id);
                                return (
                                    <div key={cat.id} className="space-y-3">
                                        <CategoryRow cat={cat} isRoot />
                                        {subs.length > 0 && (
                                            <div className="ml-10 space-y-3 border-l-2 border-slate-50 pl-6">
                                                {subs.map(sub => (
                                                    <CategoryRow key={sub.id} cat={sub} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-32 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">No Categories Found</p>
                        </div>
                    )}
                </div>

                {/* Control Panel (Right) */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24">
                        <CategoryForm key={editCategory?.id || 'new'} initialData={editCategory} categories={categories} />
                        
                        {/* Tips Card */}
                        <div className="mt-8 p-8 bg-slate-900 rounded-[2rem] text-white space-y-4 shadow-xl">
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.3em]">Pro Tips</p>
                            <h4 className="text-sm font-bold uppercase tracking-tight">Category Structure</h4>
                            <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                                Subcategories help users find products faster. Use descriptive names and metadata to improve SEO ranking.
                            </p>
                            <div className="flex gap-2 pt-2">
                                <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest text-white/70 border border-white/10">Subcategories</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest text-white/70 border border-white/10">SEO Settings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CategoryRow({ cat, isRoot }: { cat: any, isRoot?: boolean }) {
    return (
        <div className={`group/card bg-white p-5 rounded-2xl border ${isRoot ? 'border-slate-100 shadow-sm' : 'border-slate-50'} flex items-center justify-between hover:shadow-lg hover:border-emerald-200 transition-all duration-500`}>
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover/card:scale-110 transition-transform duration-500" style={{ backgroundColor: cat.bg_color || '#fafafa' }}>
                    {cat.icon || '📁'}
                </div>
                <div>
                    <h4 className={`font-bold uppercase tracking-tight ${isRoot ? 'text-slate-900 text-sm' : 'text-slate-500 text-xs'}`}>{cat.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold tracking-widest mt-1 uppercase">Slug: {cat.slug}</p>
                </div>
            </div>
            <div className="flex items-center gap-3 opacity-0 group-hover/card:opacity-100 transition-all translate-x-4 group-hover/card:translate-x-0">
                <Link href={`/admin/categories?edit=${cat.id}`} className="w-9 h-9 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 rounded-xl transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </Link>
                <form action={async () => {
                    'use server';
                    await deleteCategory(cat.id);
                }}>
                    <button className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100">
                        🗑️
                    </button>
                </form>
            </div>
        </div>
    );
}
