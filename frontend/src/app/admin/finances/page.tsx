'use client';

import AdminLayout from '@/components/admin/AdminLayout';

const FinancesPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Finances Management</h1>
      <p className="text-gray-600 mt-2">
        Track and manage financial transactions.
      </p>
      {/* Finance details will go here */}
    </AdminLayout>
  );
};

export default FinancesPage;
