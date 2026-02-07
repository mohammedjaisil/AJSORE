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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">User Management</h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="bg-[#005d32] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#004a28] transition-all shadow-lg shadow-[#005d32]/20 pr-4 flex items-center gap-2"
                >
                    {showAddForm ? 'Close Form' : '+ Add New User'}
                </button>
            </div>

            {showAddForm && (
                <div className="bg-[#f3f9f6] p-8 rounded-[2rem] border border-[#005d32]/10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Name</label>
                            <input
                                required
                                value={newUserData.name}
                                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                                placeholder="Full Name"
                                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d32]/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email</label>
                            <input
                                required
                                type="email"
                                value={newUserData.email}
                                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                                placeholder="alex@example.com"
                                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d32]/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Password</label>
                            <input
                                required
                                type="password"
                                value={newUserData.password}
                                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                                placeholder="••••••••"
                                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d32]/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Role</label>
                            <select
                                value={newUserData.role}
                                onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                                className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d32]/10"
                            >
                                <option value="USER">USER</option>
                                {currentUserRole === 'SUPER_ADMIN' && <option value="ADMIN">ADMIN</option>}
                                {currentUserRole === 'SUPER_ADMIN' && <option value="SUPER_ADMIN">SUPER ADMIN</option>}
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={isCreating}
                            className="bg-[#005d32] text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#004a28] transition-all disabled:opacity-50"
                        >
                            {isCreating ? 'Creating...' : 'Create Account'}
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Customer</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Joined</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Orders</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Role</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {initialCustomers.length > 0 ? (
                                initialCustomers.map((customer: any) => (
                                    <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full border-2 border-gray-100 bg-gray-50 overflow-hidden shrink-0">
                                                    <img src={customer.image || `https://i.pravatar.cc/100?u=${customer.email}`} alt={customer.name} />
                                                </div>
                                                <div>
                                                    {editingId === customer.id ? (
                                                        <input
                                                            className="font-bold text-gray-900 border rounded px-2 py-1 text-sm bg-white"
                                                            value={editForm.name}
                                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                        />
                                                    ) : (
                                                        <p className="font-bold text-gray-900">{customer.name || 'No Name'}</p>
                                                    )}
                                                    <p className="text-xs text-gray-400 font-medium">{customer.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm text-gray-500 font-medium">
                                            {new Date(customer.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-6">
                                            <span className="px-3 py-1 bg-[#f3f9f6] text-[#005d32] rounded-lg text-xs font-black">
                                                {customer.orders?.[0]?.count || 0} Orders
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            {editingId === customer.id ? (
                                                <select
                                                    className="text-xs font-black uppercase tracking-widest border rounded px-2 py-1 bg-white"
                                                    value={editForm.role}
                                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                                >
                                                    <option value="USER">USER</option>
                                                    {currentUserRole === 'SUPER_ADMIN' && <option value="ADMIN">ADMIN</option>}
                                                    {currentUserRole === 'SUPER_ADMIN' && <option value="SUPER_ADMIN">SUPER ADMIN</option>}
                                                </select>
                                            ) : (
                                                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${customer.role === 'SUPER_ADMIN' ? 'bg-indigo-600 text-white shadow-sm' :
                                                    customer.role === 'ADMIN' ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-400'
                                                    }`}>
                                                    {customer.role.replace('_', ' ')}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-6 text-right space-x-2">
                                            {canManageUser(customer) ? (
                                                editingId === customer.id ? (
                                                    <>
                                                        <button
                                                            onClick={(e) => handleUpdate(e, customer.id)}
                                                            className="text-xs font-black text-emerald-600 uppercase hover:underline"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingId(null)}
                                                            className="text-xs font-black text-gray-400 uppercase hover:underline"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => handleEditStart(customer)}
                                                            className="text-xs font-black text-[#005d32] uppercase hover:underline"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(customer.id)}
                                                            disabled={isDeleting === customer.id}
                                                            className="text-xs font-black text-red-500 uppercase hover:underline disabled:opacity-50"
                                                        >
                                                            {isDeleting === customer.id ? 'Deleting...' : 'Delete'}
                                                        </button>
                                                    </>
                                                )
                                            ) : (
                                                <span className="text-[10px] font-black text-gray-300 uppercase italic">Locked</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400 font-medium">
                                        No customers found.
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
