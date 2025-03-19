import TemplateForm from './templateForm';
import AdminLayout from '@/components/admin/AdminLayout';

export default function CreateTemplatePage() {
  return (
    <AdminLayout>
      <div>
        <h1>Create CV Template</h1>
        <TemplateForm />
      </div>
    </AdminLayout>
  );
}
