'use client';

import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-600 mt-2">Use the sidebar to navigate.</p>
    </AdminLayout>
  );
};

export default AdminDashboard;
