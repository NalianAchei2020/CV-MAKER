'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createTemplate,
  getTemplateById,
  updateTemplate,
} from '@/services/templateService';
import AdminLayout from '@/components/admin/AdminLayout';

const placeholders = [
  'fullName',
  'email',
  'phone',
  'job_title',
  'summary',
  'address',
  'skills',
  'languages',
  'workExperience',
  'education',
];

// ✅ Default placeholder values
const DEFAULT_DATA = {
  fullName: '',
  email: '',
  phone: '',
  job_title: '',
  summary: '',
  address: '',
  skills: [''],
  languages: [''],
  workExperience: [
    { jobTitle: '', company: '', startDate: '', endDate: '', description: '' },
  ],
  education: [
    {
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ],
};

// ✅ Default CV HTML template
const DEFAULT_CV_STRUCTURE = {
  html: `
    <div class="cv-container">
      <div class="header">
        <h1>{{fullName}}</h1>
        <p>{{job_title}}</p>
      </div>
      <div class="contact">
        <p>Email: {{email}}</p>
        <p>Phone: {{phone}}</p>
        <p>Address: {{address}}</p>
      </div>
      <div class="section">
        <h2>Summary</h2>
        <p>{{summary}}</p>
      </div>
      <div class="section">
        <h2>Work Experience</h2>
        {{workExperience}}
      </div>
      <div class="section">
        <h2>Education</h2>
        {{education}}
      </div>
      <div class="section">
        <h2>Skills</h2>
        <ul>{{skills}}</ul>
      </div>
    </div>
  `,
};

// ✅ Default CV CSS styles
const DEFAULT_CV_CSS = `
  .cv-container {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 2px solid #333;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.1);
  }
  .header {
    text-align: center;
    background: #333;
    color: white;
    padding: 10px;
  }
  .contact, .section {
    margin: 10px 0;
  }
  .section h2 {
    border-bottom: 2px solid #333;
    padding-bottom: 5px;
  }
`;

const TemplateEditor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId'); // ✅ Fetch template ID from URL

  const [template, setTemplate] = useState({
    name: '',
    description: '',
    previewImage: '',
    structure: DEFAULT_CV_STRUCTURE,
    cssStyles: DEFAULT_CV_CSS,
    defaultData: DEFAULT_DATA,
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  // ✅ Fetch existing template if editing
  useEffect(() => {
    if (templateId) {
      const fetchTemplate = async () => {
        try {
          const token = localStorage.getItem('token') || '';
          const existingTemplate = await getTemplateById(token, templateId);

          // ✅ Merge default data with existing data to prevent missing fields
          setTemplate({
            ...existingTemplate,
            defaultData: { ...DEFAULT_DATA, ...existingTemplate.defaultData },
          });
        } catch (err) {
          setError('Failed to load template.');
        }
      };

      fetchTemplate();
    }
  }, [templateId]);

  // ✅ Function to replace placeholders with entered default values
  const renderPreviewContent = () => {
    let renderedHtml = template.structure.html;

    Object.keys(template.defaultData).forEach((key) => {
      if (Array.isArray(template.defaultData[key])) {
        const listItems = template.defaultData[key]
          .map((item) => `<li>${item}</li>`)
          .join('');
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'g'),
          `<ul>${listItems}</ul>`
        );
      } else if (typeof template.defaultData[key] === 'object') {
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
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'g'),
          template.defaultData[key] || `{{${key}}}`
        );
      }
    });

    return renderedHtml;
  };

  // ✅ Handle Save or Update
  const handleSaveOrUpdate = async () => {
    setMessage(null);
    setError(null);

    try {
      const token = localStorage.getItem('token') || '';

      if (templateId) {
        await updateTemplate(token, templateId, template);
        setMessage('Template updated successfully!');
      } else {
        await createTemplate(token, template);
        setMessage('Template saved successfully!');
      }
    } catch (err) {
      console.error('Error saving/updating template:', err);
      setError('Failed to save template. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          {templateId ? 'Edit Template' : 'Create Template'}
        </h1>
        {message && <p className="text-green-600 font-semibold">{message}</p>}
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <input
          type="text"
          placeholder="Template Name"
          value={template.name}
          onChange={(e) => setTemplate({ ...template, name: e.target.value })}
          className="w-full p-2 border rounded mt-2"
        />

        <button
          onClick={handleSaveOrUpdate}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {templateId ? 'Update Template' : 'Save Template'}
        </button>

        {/* ✅ HTML & CSS Editor */}
        <h3 className="mt-4">HTML Code</h3>
        <textarea
          value={template.structure.html}
          onChange={(e) =>
            setTemplate({ ...template, structure: { html: e.target.value } })
          }
          className="w-full h-40 border mt-2 p-2 rounded"
        />

        <h3 className="mt-4">CSS Styles</h3>
        <textarea
          value={template.cssStyles}
          onChange={(e) =>
            setTemplate({ ...template, cssStyles: e.target.value })
          }
          className="w-full h-20 border mt-2 p-2 rounded"
        />

        {/* ✅ Default Data Input Fields */}
        <h3 className="mt-4">Default Data</h3>
        {/** ✅ Your default data fields are here **/}
        {Object.keys(DEFAULT_DATA).map((key) => (
          <div key={key} className="mt-2">
            <label className="font-medium">{key}</label>
            <input
              type="text"
              placeholder={`Enter ${key}`}
              value={template.defaultData[key]}
              onChange={(e) =>
                setTemplate({
                  ...template,
                  defaultData: {
                    ...template.defaultData,
                    [key]: e.target.value,
                  },
                })
              }
              className="w-full p-2 border rounded mt-1"
            />
          </div>
        ))}

        {/* ✅ Live Preview */}
        <div ref={previewRef} className="mt-6 bg-gray-100 p-6 rounded border">
          <h2 className="text-xl font-bold mb-4">Live Preview</h2>
          <style>{template.cssStyles}</style>
          <div dangerouslySetInnerHTML={{ __html: renderPreviewContent() }} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default TemplateEditor;
