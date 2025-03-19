import React, { useEffect } from 'react';
import { useDispatch, useAppSelector } from '@/redux/store';
import { fetchTemplate } from '@/redux/templateSlice';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  handleSelectTemplate: (id: string) => void; // Ensure the function takes an id
  selectedTemplate: string | null; // Type for selectedTemplate
}

export default function Templates({
  handleSelectTemplate,
  selectedTemplate,
}: Props) {
  const dispatch = useDispatch();
  const templates = useAppSelector((state) => state.template.templates);

  useEffect(() => {
    dispatch(fetchTemplate());
  }, [dispatch]);

  const renderPreviewContent = (template: any) => {
    let renderedHtml = template.structure?.html || ''; // Ensure there's a fallback

    // Check if defaultData is defined
    if (template.defaultData) {
      // Replace placeholders with actual data
      Object.entries(template.defaultData).forEach(([key, value]) => {
        if (typeof value === 'string') {
          renderedHtml = renderedHtml.replace(
            new RegExp(`{{${key}}}`, 'g'),
            value
          );
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'string') {
              renderedHtml = renderedHtml.replace(
                new RegExp(`{{${key}.${index}}}`, 'g'),
                item
              );
            } else if (typeof item === 'object') {
              Object.entries(item).forEach(([nestedKey, nestedValue]) => {
                if (typeof nestedValue === 'string') {
                  renderedHtml = renderedHtml.replace(
                    new RegExp(`{{${key}.${index}.${nestedKey}}}`, 'g'),
                    nestedValue
                  );
                }
              });
            }
          });
        }
      });
    }

    return renderedHtml;
  };

  // Flatten the templates array if needed
  const flatTemplates = templates.flat();

  // Use a Set to avoid duplicates
  const uniqueTemplates = Array.from(
    new Set(flatTemplates.map((item) => item._id))
  ).map((id) => flatTemplates.find((item) => item._id === id));

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {uniqueTemplates.length > 0 ? (
          uniqueTemplates.map((template: any) => (
            <Card
              key={template._id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template._id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleSelectTemplate(template._id)} // Use _id instead of id
            >
              <CardContent className="p-4">
                <div className="aspect-[3/4] rounded-md overflow-hidden mb-4">
                  <div
                    className="px-2 mb-4 overflow-auto"
                    style={{
                      backgroundColor: template.backgroundColor,
                      fontFamily: template.fontFamily,
                      color: template.fontColor,
                      width: '210mm', // A4 width
                      height: '297mm', // A4 height
                    }}
                  >
                    <style
                      dangerouslySetInnerHTML={{ __html: template.cssStyles }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: renderPreviewContent(template),
                      }}
                    />
                  </div>
                </div>
                <h3 className="font-medium">{template.name}</h3>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No templates available.</p>
        )}
      </div>
    </div>
  );
}
