import React from 'react';
import { supabaseAdmin } from "@/lib/supabase";
import Link from 'next/link';
import { deleteProduct } from '@/actions/admin-products';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const { data: products } = await supabaseAdmin.from('products').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Products</h2>
                <Link
                    href="/admin/products/new"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                    <span>+</span> New Product
                </Link>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Product</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Category</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Stock</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Price</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Type</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products && products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden">
                                                    <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 line-clamp-1">{product.name}</p>
                                                    <p className="text-xs text-gray-400 font-medium">ID: {product.id.toString().slice(0, 4)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-600">{product.category_name}</span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                <span className={`font-bold text-sm ${product.stock < 5 ? 'text-red-500' : 'text-gray-900'}`}>
                                                    {product.stock} in stock
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <p className="font-black text-gray-900">${product.price}</p>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${product.type === 'VARIABLE' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                {product.type || 'SIMPLE'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link href={`/admin/products/${product.id}`} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                                                    ✏️
                                                </Link>
                                                <DeleteButton id={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400 font-medium">
                                        No products found. Add one to get started.
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
            <button type="submit" className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                🗑️
            </button>
        </form>
    );
}
