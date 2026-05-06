'use client';

import React, { useState, useEffect } from 'react';
import { updateInventory } from '@/actions/admin-inventory';
import { useToast } from '@/lib/toast-store';

export default function InventoryPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');
    const { addToast } = useToast();

    // Fetch products on load
    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            addToast('Failed to load products', 'error');
        } finally {
            setLoading(false);
        }
    }

    const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    const handleStockChange = (id: string, value: number) => {
        setProducts(products.map(p => p.id === id ? { ...p, stock: value } : p));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateInventory(products.map(p => ({ id: p.id, stock: p.stock })));
            addToast('Inventory updated successfully', 'success');
        } catch (e) {
            addToast('Update failed', 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-heading">Inventory</h1>
                    <p className="text-label mt-1">Manage stock levels for all your products.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors disabled:opacity-50"
                >
                    {saving ? 'Saving...' : 'Save Inventory'}
                </button>
            </div>

            <div className="bg-white rounded-xl border border-[#e5e5e5] shadow-sm overflow-hidden">
                <div className="p-3 border-b border-[#f0f0f0]">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f6f6f7] border border-[#e5e5e5] rounded-lg group focus-within:border-[#1a1a1a] transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9c9c9c]"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <input 
                            placeholder="Filter Products" 
                            className="bg-transparent text-sm text-[#1a1a1a] outline-none w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#fcfcfc] border-b border-[#f0f0f0]">
                            <tr>
                                <th className="px-6 py-2.5 text-left text-label">Product</th>
                                <th className="px-6 py-3 text-left text-label">SKU</th>
                                <th className="px-6 py-3 text-left text-label">Status</th>
                                <th className="px-6 py-3 text-right text-label">Available</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f6f6f7]">
                            {loading ? (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-sm text-[#9c9c9c]">Loading Products...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-sm text-[#9c9c9c]">No Products Found.</td></tr>
                            ) : (
                                filtered.map((p) => (
                                    <tr key={p.id} className="hover:bg-[#fafafa] transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#f6f6f7] rounded border border-[#e5e5e5] overflow-hidden shrink-0">
                                                <img src={p.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-[#1a1a1a]">{p.name}</p>
                                                <p className="text-[10px] text-[#6c6c6c]">{p.category_name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-[#1a1a1a] font-mono">{p.sku || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${p.stock > 10 ? 'bg-[#f0faf5] text-[#1a8a4f]' : 'bg-[#fff5ea] text-[#8a611a]'}`}>
                                                {p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <input 
                                                type="number" 
                                                value={p.stock} 
                                                onChange={(e) => handleStockChange(p.id, Number(e.target.value))}
                                                className="w-20 px-2 py-1 rounded border border-[#e5e5e5] text-xs font-medium text-right focus:border-[#1a1a1a] outline-none transition-all"
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
