'use client';

import React, { useState } from 'react';
import { updateCustomer, deleteCustomer, createCustomer } from '@/actions/admin-customers';
import { useToast } from '@/lib/toast-store';

interface CustomersTableProps {
    initialCustomers: any[];
    currentUserRole: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}

export default function CustomersTable({ initialCustomers, currentUserRole }: CustomersTableProps) {
    const { addToast } = useToast();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: '', role: '' });

    const [showAddForm, setShowAddForm] = useState(false);
    const [newUserData, setNewUserData] = useState({ name: '', email: '', password: '', role: 'USER' });
    const [isCreating, setIsCreating] = useState(false);

    // Permission check helper
    const canManageUser = (targetUser: any) => {
        if (currentUserRole === 'SUPER_ADMIN') return true;
        if (currentUserRole === 'ADMIN') {
            // Admin can only manage USERS, not other Admins or Super Admins
            return targetUser.role === 'USER';
        }
        return false;
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Final security check: Admin cannot create another Admin or Super Admin
        if (currentUserRole === 'ADMIN' && (newUserData.role === 'ADMIN' || newUserData.role === 'SUPER_ADMIN')) {
            addToast("Administrators can only create regular users.", "info");
            return;
        }

        setIsCreating(true);
        const formData = new FormData();
        formData.append('name', newUserData.name);
        formData.append('email', newUserData.email);
        formData.append('password', newUserData.password);
        formData.append('role', newUserData.role);

        const res = await createCustomer(formData);
        if (res?.success) {
            addToast("User created successfully!", "success");
            setShowAddForm(false);
            setNewUserData({ name: '', email: '', password: '', role: 'USER' });
        } else if (res?.error) {
            addToast(res.error, "error");
        }
        setIsCreating(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        setIsDeleting(id);
        const res = await deleteCustomer(id);
        if (res?.error) {
            addToast(res.error, "error");
        } else {
            addToast("User deleted successfully", "success");
        }
        setIsDeleting(null);
    };

    const handleEditStart = (customer: any) => {
        setEditingId(customer.id);
        setEditForm({ name: customer.name || '', role: customer.role });
    };

    const handleUpdate = async (e: React.FormEvent, id: string) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editForm.name);
        formData.append('role', editForm.role);

        const res = await updateCustomer(id, formData);
        if (res?.success) {
            addToast("User updated successfully!", "success");
            setEditingId(null);
        } else if (res?.error) {
            addToast(res.error, "error");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-slate-50">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight leading-none">Customer List</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">Manage user accounts and roles</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center gap-3 active:scale-95 border border-white/5"
                >
                    {showAddForm ? 'Cancel' : '+ Add New Customer'}
                </button>
            </div>

            {showAddForm && (
                <div className="bg-slate-50/50 p-10 rounded-[3rem] border border-slate-100 animate-in fade-in slide-in-from-top-6 duration-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[60px] pointer-events-none" />
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-end relative z-10">
                        <div className="space-y-3">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-4">Full Name</label>
                            <input
                                required
                                value={newUserData.name}
                                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                                placeholder="Ex: Jaisil Mohammed"
                                className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none shadow-sm"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-4">Email Address</label>
                            <input
                                required
                                type="email"
                                value={newUserData.email}
                                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                                placeholder="customer@email.com"
                                className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none shadow-sm"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-4">Password</label>
                            <input
                                required
                                type="password"
                                value={newUserData.password}
                                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none shadow-sm"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] pl-4">User Role</label>
                            <select
                                value={newUserData.role}
                                onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                                className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none shadow-sm appearance-none cursor-pointer"
                            >
                                <option value="USER">Customer</option>
                                {currentUserRole === 'SUPER_ADMIN' && <option value="ADMIN">Admin</option>}
                                {currentUserRole === 'SUPER_ADMIN' && <option value="SUPER_ADMIN">Super Admin</option>}
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="bg-emerald-500 text-white py-4.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-emerald-400 transition-all disabled:opacity-50 shadow-xl shadow-emerald-500/20 active:scale-95"
                        >
                            {isCreating ? 'Saving...' : 'Create Customer'}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-[3rem] border border-slate-50 shadow-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.01] blur-[80px] pointer-events-none" />
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 border-b border-slate-50">
                            <tr>
                                <th className="p-8 font-bold uppercase text-[9px] text-slate-400 tracking-[0.3em]">Customer</th>
                                <th className="p-8 font-bold uppercase text-[9px] text-slate-400 tracking-[0.3em]">Joined Date</th>
                                <th className="p-8 font-bold uppercase text-[9px] text-slate-400 tracking-[0.3em]">Orders</th>
                                <th className="p-8 font-bold uppercase text-[9px] text-slate-400 tracking-[0.3em]">Role</th>
                                <th className="p-8 font-bold uppercase text-[9px] text-slate-400 tracking-[0.3em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {initialCustomers.length > 0 ? (
                                initialCustomers.map((customer: any) => (
                                    <tr key={customer.id} className="hover:bg-slate-50/30 transition-all group/row">
                                        <td className="p-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl border border-slate-100 bg-slate-50 p-1 shrink-0 group-hover/row:scale-110 transition-transform duration-500 shadow-sm">
                                                    <img src={customer.image || `https://ui-avatars.com/api/?name=${customer.name || 'User'}&background=f8fafc&color=0f172a`} alt={customer.name} className="w-full h-full rounded-xl object-cover grayscale group-hover/row:grayscale-0 transition-all duration-700" />
                                                </div>
                                                <div className="space-y-1 min-w-0">
                                                    {editingId === customer.id ? (
                                                        <input
                                                            className="font-bold text-slate-900 border border-slate-200 rounded-lg px-4 py-2 text-sm bg-white focus:ring-4 focus:ring-slate-900/5 outline-none"
                                                            value={editForm.name}
                                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <p className="font-bold text-slate-900 text-sm tracking-tight group-hover/row:text-emerald-600 transition-colors uppercase truncate pr-4">{customer.name || 'Guest User'}</p>
                                                    )}
                                                    <p className="text-[9px] text-slate-400 font-bold tracking-[0.2em] mt-1.5 lowercase opacity-70 group-hover/row:opacity-100 transition-opacity truncate max-w-[200px]">{customer.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8 text-xs text-slate-500 font-bold tracking-tight">
                                            {new Date(customer.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="p-8">
                                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 shadow-inner group-hover/row:bg-emerald-50 group-hover/row:border-emerald-100 transition-all">
                                                <span className="text-[9px] font-bold text-slate-400 group-hover/row:text-emerald-600 tracking-widest uppercase">
                                                    {customer.orders?.[0]?.count || 0} Orders
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            {editingId === customer.id ? (
                                                <select
                                                    className="text-[9px] font-bold uppercase tracking-widest border border-slate-200 rounded-lg px-4 py-2 bg-white focus:ring-4 focus:ring-slate-900/5 outline-none appearance-none cursor-pointer"
                                                    value={editForm.role}
                                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                                >
                                                    <option value="USER">Customer</option>
                                                    {currentUserRole === 'SUPER_ADMIN' && <option value="ADMIN">Admin</option>}
                                                    {currentUserRole === 'SUPER_ADMIN' && <option value="SUPER_ADMIN">Super Admin</option>}
                                                </select>
                                            ) : (
                                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${customer.role === 'SUPER_ADMIN' ? 'bg-slate-900 text-emerald-400 border-emerald-500/20 shadow-xl shadow-slate-900/20' :
                                                    customer.role === 'ADMIN' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                                    }`}>
                                                    {customer.role.replace('_', ' ')}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                                                {canManageUser(customer) ? (
                                                    editingId === customer.id ? (
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={(e) => handleUpdate(e, customer.id)}
                                                                className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest hover:text-emerald-500 transition-colors"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingId(null)}
                                                                className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={() => handleEditStart(customer)}
                                                                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-200 rounded-xl transition-all shadow-sm"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(customer.id)}
                                                                disabled={isDeleting === customer.id}
                                                                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-200 rounded-xl transition-all shadow-sm disabled:opacity-50"
                                                            >
                                                                {isDeleting === customer.id ? '...' : (
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                )}
                                                            </button>
                                                        </div>
                                                    )
                                                ) : (
                                                    <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100 opacity-50 grayscale">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em]">Admin Only</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-32 text-center">
                                        <div className="flex flex-col items-center justify-center gap-6">
                                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-4xl border border-slate-100 grayscale opacity-30">👥</div>
                                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] leading-relaxed">No customers found in the database.</p>
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
