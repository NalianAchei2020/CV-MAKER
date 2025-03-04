'use client';

import AdminLayout from '@/components/admin/AdminLayout';

const ManageTemplatesPage = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Manage Templates</h1>
      <p className="text-gray-600 mt-2">
        View, edit, or remove existing templates.
      </p>
      {/* Template list will go here */}
    </AdminLayout>
  );
};

export default ManageTemplatesPage;
