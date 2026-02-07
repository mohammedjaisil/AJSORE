import React from 'react';
import { getCustomers } from '@/actions/admin-customers';
import CustomersTable from '@/components/admin/CustomersTable';
import { auth } from '@/auth';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
    const customers = await getCustomers();
    const session = await auth();

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Customers</h2>
            <CustomersTable
                initialCustomers={customers}
                currentUserRole={session?.user?.role || 'USER'}
            />
        </div>
    );
}
