'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllTemplates, deleteTemplate } from '@/services/templateService';
import AdminLayout from '@/components/admin/AdminLayout';

interface Template {
  _id: string;
  name: string;
  description: string;
  previewImage?: string; // ✅ Image is optional
  structure: { html: string };
  cssStyles: string;
  defaultData: any; // ✅ Includes saved default data
}

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getAllTemplates();
        setTemplates(data);
      } catch (err: any) {
        setError(err?.response?.data?.error || 'Failed to load templates.');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // ✅ Function to replace placeholders in HTML with defaultData
  const renderPreviewContent = (template: Template) => {
    let renderedHtml = template.structure.html;

    Object.keys(template.defaultData).forEach((key) => {
      if (Array.isArray(template.defaultData[key])) {
        // Handle arrays (skills, languages, etc.)
        const listItems = template.defaultData[key]
          .map((item: string) => `<li>${item}</li>`)
          .join('');
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'g'),
          `<ul>${listItems}</ul>`
        );
      } else if (typeof template.defaultData[key] === 'object') {
        // Handle objects (workExperience, education, etc.)
        const sectionContent = template.defaultData[key]
          .map(
            (entry: any) =>
              `<p><strong>${entry.jobTitle || entry.degree}</strong> - ${
                entry.company || entry.institution
              } (${entry.startDate} - ${entry.endDate})</p><p>${
                entry.description
              }</p>`
          )
          .join('');
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'g'),
          sectionContent
        );
      } else {
        // Handle regular text fields
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'g'),
          template.defaultData[key] || `{{${key}}}`
        );
      }
    });

    return renderedHtml;
  };

  // ✅ Pass template ID instead of full object
  const handleEditTemplate = (templateId: string) => {
    router.push(`/admin/editor?templateId=${templateId}`);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold">Manage Templates</h1>
      {loading && <p>Loading templates...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-4 mt-6">
        {templates.map((template) => (
          <div key={template._id} className="border p-4">
            {template.previewImage ? (
              <img
                src={template.previewImage}
                alt={template.name}
                className="w-full h-32 object-cover"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            <h2 className="text-lg font-bold mt-2">{template.name}</h2>
            <p className="text-gray-600">{template.description}</p>

            {/* ✅ Live Preview with data-filled placeholders */}
            <div className="border p-2 mt-4 bg-gray-100">
              <style>{template.cssStyles}</style>
              <div
                dangerouslySetInnerHTML={{
                  __html: renderPreviewContent(template),
                }}
              />
            </div>

            {/* ✅ Edit & Delete Buttons */}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEditTemplate(template._id)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTemplate(template._id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default TemplatesPage;
