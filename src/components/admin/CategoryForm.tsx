'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory, updateCategory } from '@/actions/admin-categories';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/lib/toast-store';

interface Props {
    initialData?: any;
    categories?: any[];
    onSuccess?: () => void;
}

export default function CategoryForm({ initialData, categories, onSuccess }: Props) {
    const { addToast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    async function action(formData: FormData) {
        const res = initialData?.id
            ? await updateCategory(initialData.id, formData)
            : await createCategory(formData);

        if (res?.error) {
            addToast("Error: " + res.error, 'error');
        } else {
            addToast(initialData?.id ? "Category updated!" : "Category created!", 'success');
            if (!initialData?.id) formRef.current?.reset();
            if (onSuccess) onSuccess();
        }
    }

    const inputClass = "w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-[#005d32]/5 focus:border-[#005d32] transition-all outline-none font-bold text-xs uppercase tracking-tight text-slate-800 placeholder:font-medium placeholder:tracking-normal";
    const labelClass = "text-label mb-1.5 block px-1";

    return (
        <form ref={formRef} action={action} className="space-y-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.02] blur-[60px] pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="card-title">{initialData ? 'Edit Category' : 'Create Category'}</h3>
                    {initialData && <button type="button" onClick={() => router.refresh()} className="text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Cancel</button>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className={labelClass}>Category Name</label>
                        <input name="name" defaultValue={initialData?.name} required className={inputClass} placeholder="Ex: LED Lights" />
                    </div>
                    <div>
                        <label className={labelClass}>Icon</label>
                        <input name="icon" defaultValue={initialData?.icon} className={`${inputClass} text-center text-lg`} placeholder="💡" />
                    </div>
                    <div>
                        <label className={labelClass}>Category Color</label>
                        <input name="bg_color" type="color" defaultValue={initialData?.bg_color || '#005d32'} className="w-full h-10 rounded-xl cursor-pointer bg-slate-50 border border-slate-100 p-1" />
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Parent Category</label>
                    <select name="parent_id" defaultValue={initialData?.parent_id || ''} className={inputClass}>
                        <option value="">Root Level</option>
                        {categories?.filter(c => c.id !== initialData?.id).map(c => (
                            <option key={c.id} value={c.id}>↳ {c.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Category Image URL</label>
                    <input name="image" defaultValue={initialData?.image} className={inputClass} placeholder="https://images.unsplash.com/..." />
                </div>

                <div>
                    <label className={labelClass}>SEO Description</label>
                    <textarea name="description" defaultValue={initialData?.description} rows={3} className={`${inputClass} resize-none`} placeholder="Search engine snippet..." />
                </div>

                <SubmitButton isUpdate={!!initialData} />
            </div>
        </form>
    );
}

function SubmitButton({ isUpdate }: { isUpdate: boolean }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#005d32] text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#004a28] transition-all shadow-lg shadow-[#005d32]/20 disabled:opacity-50 active:scale-[0.98]"
        >
            {pending ? '⏳ Saving...' : isUpdate ? 'Update Category' : 'Create Category'}
        </button>
    );
}
