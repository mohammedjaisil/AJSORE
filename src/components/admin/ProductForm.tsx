'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/actions/admin-products';
import { Product } from '@/types';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/lib/toast-store';

type ExtendedProduct = Partial<Product> & { 
    variations?: any[]; 
    tags?: string[];
    sku?: string;
    meta_title?: string;
    meta_description?: string;
    slug?: string;
    supplier_id?: string;
    supplier_price?: number;
    supplier_link?: string;
    shipping_cost?: number;
};

export default function ProductForm({ 
    initialData, 
    suppliers = [] 
}: { 
    initialData?: ExtendedProduct;
    suppliers?: any[];
}) {
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState<'general' | 'inventory' | 'seo' | 'shipping'>('general');
    const [type, setType] = useState<'SIMPLE' | 'VARIABLE'>(initialData?.type || 'SIMPLE');
    const [variations, setVariations] = useState<any[]>(initialData?.variations || []);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    // Calc profit margin
    const [price, setPrice] = useState(initialData?.price || 0);
    const [supplierPrice, setSupplierPrice] = useState(initialData?.supplier_price || 0);
    const [shippingCost, setShippingCost] = useState(initialData?.shipping_cost || 0);
    const profit = price - (Number(supplierPrice) + Number(shippingCost));
    const margin = price > 0 ? (profit / price) * 100 : 0;

    async function action(formData: FormData) {
        formData.append('type', type);
        if (type === 'VARIABLE') {
            formData.append('variations', JSON.stringify(variations));
        }

        const res = initialData?.id
            ? await updateProduct(initialData.id, formData)
            : await createProduct(formData);

        if (res?.error) {
            const errorMsg = typeof res.error === 'string' ? res.error : JSON.stringify(res.error);
            addToast("Error: " + errorMsg, 'error');
        } else {
            addToast(initialData?.id ? "Product updated successfully!" : "Product created successfully!", 'success');
            if (!initialData?.id) formRef.current?.reset();
            router.push('/admin/products');
            router.refresh();
        }
    }

    const addVariation = () => setVariations([...variations, { sku: '', price: 0, stock: 0, attributes: [{ name: 'Label', value: '' }] }]);
    const removeVariation = (index: number) => setVariations(variations.filter((_, i) => i !== index));
    const updateVariation = (index: number, field: string, value: any) => {
        const newVars = [...variations];
        if (field === 'label') {
            newVars[index] = { ...newVars[index], attributes: [{ name: 'Label', value: value }] };
        } else {
            newVars[index] = { ...newVars[index], [field]: value };
        }
        setVariations(newVars);
    };

    const inputClass = "w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-tight text-[#1a1a1a] focus:border-[#1a1a1a] outline-none transition-all placeholder:text-[#9c9c9c] placeholder:font-medium";
    const labelClass = "text-label mb-1.5 block";

    const TabButton = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: string }) => (
        <button
            type="button"
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${activeTab === id ? 'text-[#1a1a1a]' : 'text-[#6c6c6c] hover:text-[#1a1a1a]'}`}
        >
            <span className="flex items-center gap-2">
                <span>{icon}</span>
                {label}
            </span>
            {activeTab === id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a1a1a]" />}
        </button>
    );

    return (
        <form ref={formRef} action={action} className="space-y-6">
            
            {/* Shopify-style Tabs */}
            <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm overflow-hidden">
                <div className="flex items-center border-b border-[#f0f0f0] px-2">
                    <TabButton id="general" label="General" icon="📝" />
                    <TabButton id="inventory" label="Inventory" icon="📦" />
                    <TabButton id="seo" label="SEO" icon="🌐" />
                    <TabButton id="shipping" label="Dropshipping" icon="🚚" />
                </div>

                <div className="p-6">
                    {/* General Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Product Name</label>
                                        <input name="name" defaultValue={initialData?.name} required className={inputClass} placeholder="Short Sleeve T-Shirt" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Category</label>
                                            <input name="category" defaultValue={initialData?.category} required className={inputClass} placeholder="Apparel" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>SKU</label>
                                            <input name="sku" defaultValue={initialData?.sku} className={inputClass} placeholder="TS-001" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Main Image URL</label>
                                        <input name="image" defaultValue={initialData?.image} required className={inputClass} placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Tags</label>
                                        <input name="tags" defaultValue={initialData?.tags?.join(', ')} className={inputClass} placeholder="Winter, New Arrival" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Description</label>
                                <textarea name="description" defaultValue={initialData?.description} rows={4} className={`${inputClass} resize-none`} placeholder="Tell customers about your product..." />
                            </div>
                        </div>
                    )}

                    {/* Inventory Tab */}
                    {activeTab === 'inventory' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex gap-4 border-b border-[#f0f0f0] pb-4">
                                <button type="button" onClick={() => setType('SIMPLE')} className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${type === 'SIMPLE' ? 'bg-[#1a1a1a] text-white' : 'bg-[#f6f6f7] text-[#4a4a4a] hover:bg-[#e5e5e5]'}`}>Simple product</button>
                                <button type="button" onClick={() => setType('VARIABLE')} className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${type === 'VARIABLE' ? 'bg-[#1a1a1a] text-white' : 'bg-[#f6f6f7] text-[#4a4a4a] hover:bg-[#e5e5e5]'}`}>Product variants</button>
                            </div>

                            {type === 'SIMPLE' ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className={labelClass}>Price (₹)</label>
                                        <input name="price" type="number" step="0.01" value={price} onChange={e => setPrice(Number(e.target.value))} className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Compare at price (₹)</label>
                                        <input name="oldPrice" defaultValue={initialData?.oldPrice} type="number" step="0.01" className={inputClass} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Quantity</label>
                                        <input name="stock" defaultValue={initialData?.stock} type="number" className={inputClass} />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="card-title">Variants</h4>
                                        <button type="button" onClick={addVariation} className="text-[10px] font-bold tracking-widest uppercase text-[#5c5fc8] hover:underline">+ Add variation</button>
                                    </div>
                                    <div className="space-y-3">
                                        {variations.map((v, i) => (
                                            <div key={i} className="p-4 bg-[#fcfcfc] rounded-xl border border-[#e5e5e5] grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                                                <button type="button" onClick={() => removeVariation(i)} className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-[#e5e5e5] rounded-full flex items-center justify-center text-[10px] shadow-sm hover:text-red-600 transition-colors">✕</button>
                                                <div className="md:col-span-1">
                                                    <label className={labelClass}>Option</label>
                                                    <input value={v.attributes?.[0]?.value || ''} onChange={(e) => updateVariation(i, 'label', e.target.value)} className={inputClass} placeholder="e.g. Black / XL" />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Price</label>
                                                    <input type="number" value={v.price} onChange={(e) => updateVariation(i, 'price', Number(e.target.value))} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>Stock</label>
                                                    <input type="number" value={v.stock} onChange={(e) => updateVariation(i, 'stock', Number(e.target.value))} className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>SKU</label>
                                                    <input value={v.sku} onChange={(e) => updateVariation(i, 'sku', e.target.value)} className={inputClass} placeholder="SKU-VAR" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="hidden" name="price" value={variations[0]?.price || 0} />
                                    <input type="hidden" name="stock" value={0} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div>
                                <label className={labelClass}>Page title</label>
                                <input name="meta_title" defaultValue={initialData?.meta_title} className={inputClass} placeholder="SEO optimized title" />
                            </div>
                            <div>
                                <label className={labelClass}>Meta description</label>
                                <textarea name="meta_description" defaultValue={initialData?.meta_description} rows={3} className={`${inputClass} resize-none`} placeholder="Brief description for search results" />
                            </div>
                            <div className="p-4 bg-[#f6f6f7] rounded-lg space-y-1">
                                <p className="text-[10px] font-bold text-[#9c9c9c] mb-1">Preview</p>
                                <p className="text-[#1a1a1a] font-semibold text-sm truncate">{initialData?.meta_title || 'Product Name'}</p>
                                <p className="text-[#1a8a4f] text-[11px] truncate">buykko.com/products/{initialData?.slug || 'preview'}</p>
                                <p className="text-[#6c6c6c] text-[11px] line-clamp-2">{initialData?.meta_description || 'SEO description will appear here...'}</p>
                            </div>
                        </div>
                    )}

                    {/* Dropshipping Tab */}
                    {activeTab === 'shipping' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClass}>Supplier</label>
                                        <select name="supplier_id" defaultValue={initialData?.supplier_id} className={inputClass}>
                                            <option value="">Select a supplier</option>
                                            {suppliers.map(s => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Supplier Link</label>
                                        <input name="supplier_link" defaultValue={initialData?.supplier_link} className={inputClass} placeholder="https://..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>Cost price (₹)</label>
                                            <input name="supplier_price" type="number" step="0.01" value={supplierPrice} onChange={e => setSupplierPrice(Number(e.target.value))} className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Shipping cost (₹)</label>
                                            <input name="shipping_cost" type="number" step="0.01" value={shippingCost} onChange={e => setShippingCost(Number(e.target.value))} className={inputClass} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="bg-[#1a1a1a] rounded-xl p-6 text-white h-full flex flex-col justify-center gap-4">
                                        <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Profit analysis</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] text-white/40 font-medium">Expected profit</p>
                                                <p className={`text-2xl font-semibold ${profit > 0 ? 'text-[#30d475]' : 'text-[#ff5252]'}`}>₹{profit.toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Margin</p>
                                                <p className={`text-2xl font-bold tracking-tighter ${margin > 20 ? 'text-[#30d475]' : 'text-[#ffb300]'}`}>{margin.toFixed(1)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
                <button type="button" onClick={() => router.push('/admin/products')} className="px-5 py-2 text-sm font-semibold text-[#4a4a4a] hover:bg-white border border-transparent hover:border-[#e5e5e5] rounded-lg transition-all">Cancel</button>
                <SubmitButton isUpdate={!!initialData?.id} />
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
            className="px-6 py-4 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-widest font-bold rounded-2xl hover:bg-[#333] transition-colors disabled:opacity-50"
        >
            {pending ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Save product' : 'Create product')}
        </button>
    );
}
