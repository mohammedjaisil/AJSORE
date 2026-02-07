'use client';

import React, { useRef } from 'react';
import { createProduct, updateProduct } from '@/actions/admin-products';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/lib/toast-store';

export default function ProductForm({ initialData }: { initialData?: any }) {
    const { addToast } = useToast();
    const [type, setType] = React.useState<'SIMPLE' | 'VARIABLE'>(initialData?.type || 'SIMPLE');
    const [variations, setVariations] = React.useState<any[]>(initialData?.variations || []);
    const formRef = useRef<HTMLFormElement>(null);

    async function action(formData: FormData) {
        formData.append('type', type);
        if (type === 'VARIABLE') {
            formData.append('variations', JSON.stringify(variations));
        }

        const res = initialData
            ? await updateProduct(initialData.id, formData)
            : await createProduct(formData);

        if (res?.error) {
            addToast("Error: " + (typeof res.error === 'string' ? res.error : "Validation failed"), 'error');
        } else {
            addToast(initialData ? "Product updated successfully!" : "Product created successfully!", 'success');
            if (!initialData) formRef.current?.reset();
            window.location.href = '/admin/products';
        }
    }

    const addVariation = () => {
        setVariations([...variations, { sku: '', price: 0, stock: 0, attributes: [{ name: 'Label', value: '' }] }]);
    };

    const removeVariation = (index: number) => {
        setVariations(variations.filter((_, i) => i !== index));
    };

    const updateVariation = (index: number, field: string, value: any) => {
        const newVars = [...variations];
        if (field === 'label') {
            newVars[index] = { ...newVars[index], attributes: [{ name: 'Label', value: value }] };
        } else {
            newVars[index] = { ...newVars[index], [field]: value };
        }
        setVariations(newVars);
    };

    return (
        <form ref={formRef} action={action} className="space-y-8 max-w-4xl bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all">
            {/* Product Type Toggle */}
            <div className="flex bg-gray-100 p-1.5 rounded-2xl w-fit">
                <button
                    type="button"
                    onClick={() => setType('SIMPLE')}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'SIMPLE' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Simple Product
                </button>
                <button
                    type="button"
                    onClick={() => setType('VARIABLE')}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'VARIABLE' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    Variable Product
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-4">Basic Information</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Name</label>
                                <input name="name" defaultValue={initialData?.name} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" placeholder="Ex: Wireless Buds" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                                <input name="category" defaultValue={initialData?.category} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" placeholder="Ex: Headphone" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                                <textarea name="description" defaultValue={initialData?.description} rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" placeholder="Product details..." />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-4">Media & Attributes</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image URL</label>
                                <input name="image" defaultValue={initialData?.image} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" placeholder="https://..." />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Features</label>
                                    <input name="features" defaultValue={initialData?.features?.join(', ')} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" placeholder="Feature 1, Feature 2" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Colors</label>
                                    <input name="colors" defaultValue={initialData?.colors?.join(', ')} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" placeholder="Red, Blue" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {type === 'SIMPLE' ? (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 border-b pb-4">Pricing & Inventory</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price ($)</label>
                                    <input name="price" defaultValue={initialData?.price} type="number" step="0.01" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Old Price ($)</label>
                                        <input name="oldPrice" defaultValue={initialData?.oldPrice} type="number" step="0.01" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</label>
                                        <input name="stock" defaultValue={initialData?.stock} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-emerald-500 font-medium" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h3 className="text-xl font-bold text-gray-900">Variations</h3>
                                <button type="button" onClick={addVariation} className="text-xs font-black uppercase text-emerald-600 hover:underline">+ Add Variation</button>
                            </div>

                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                {variations.map((v, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-4 relative group">
                                        <button type="button" onClick={() => removeVariation(i)} className="absolute top-4 right-4 text-red-400 hover:text-red-600">✕</button>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU</label>
                                                <input value={v.sku} onChange={(e) => updateVariation(i, 'sku', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</label>
                                                <input type="number" value={v.price} onChange={(e) => updateVariation(i, 'price', Number(e.target.value))} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</label>
                                                <input type="number" value={v.stock} onChange={(e) => updateVariation(i, 'stock', Number(e.target.value))} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Label (e.g. Size/Color)</label>
                                                <input value={v.attributes?.[0]?.value || ''} onChange={(e) => updateVariation(i, 'label', e.target.value)} className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {variations.length === 0 && <div className="text-center py-8 text-gray-400 font-medium">No variations added.</div>}
                            </div>
                            {/* Hidden inputs to satisfy Zod if needed (handled in action) */}
                            <input type="hidden" name="price" value={variations[0]?.price || 0} />
                            <input type="hidden" name="stock" value={0} />
                        </div>
                    )}
                </div>
            </div>

            <SubmitButton isUpdate={!!initialData} />
        </form>
    );
}

function SubmitButton({ isUpdate }: { isUpdate: boolean }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50 uppercase text-xs tracking-widest"
        >
            {pending ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update Product' : 'Create Product')}
        </button>
    );
}
