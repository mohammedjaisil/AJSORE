import React from 'react';
import { getOrders } from '@/actions/admin-orders';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Orders</h2>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Order ID</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Customer</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Date</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Total</th>
                                <th className="p-6 font-black uppercase text-xs text-gray-400 tracking-widest">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6">
                                            <p className="font-bold text-gray-900">#{order.id.slice(0, 8)}</p>
                                        </td>
                                        <td className="p-6">
                                            <p className="font-medium text-gray-700">{order.user_email}</p>
                                        </td>
                                        <td className="p-6 text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-6">
                                            <p className="font-black text-gray-900">${Number(order.total).toLocaleString()}</p>
                                        </td>
                                        <td className="p-6">
                                            <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-400 font-medium">
                                        No orders found.
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
