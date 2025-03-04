'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchTemplates } from '@/redux/templateSlice';
import { CircularProgress, Typography, Box, Button } from '@mui/material';

const AllTemplatesPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  // ✅ Get templates from Redux store
  const { templates, loading, error } = useAppSelector(
    (state) => state.templates
  );

  console.log('Templates from Redux:', templates); // ✅ Debugging

  // ✅ Fetch templates on mount if not already loaded
  useEffect(() => {
    if (templates.length === 0) {
      setIsFetching(true);
      dispatch(fetchTemplates()).finally(() => setIsFetching(false));
    } else {
      setIsFetching(false);
    }
  }, [dispatch, templates]);

  // ✅ Function to replace placeholders with backend default data
  const renderTemplateContent = (template: any) => {
    if (!template.structure?.html) return '';

    let renderedHtml = template.structure.html;

    // ✅ Merge default data into placeholders
    Object.entries(template.defaultData).forEach(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number') {
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'gi'),
          value.toString()
        );
      } else if (Array.isArray(value)) {
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'gi'),
          value.join(', ')
        );
      } else if (typeof value === 'object' && value !== null) {
        const formattedEntries = Object.values(value)
          .map((entry: any) => Object.values(entry).join(' - '))
          .join('<br/>');
        renderedHtml = renderedHtml.replace(
          new RegExp(`{{${key}}}`, 'gi'),
          formattedEntries
        );
      }
    });

    return renderedHtml;
  };

  // ✅ Handle template selection
  const handleSelectTemplate = (templateId: string) => {
    router.push(`/pages/resume?templateId=${templateId}`);
  };

  // ✅ Handle loading states
  if (loading || isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
        <Typography ml={2}>Loading templates...</Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box className="min-h-screen bg-gray-100 p-6">
      <Typography variant="h3" align="center" gutterBottom>
        All CV Templates
      </Typography>

      {/* ✅ Grid Layout: Display All Templates */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template, index) => (
          <Box
            key={template._id}
            className="border rounded-lg shadow-lg p-6 bg-white"
            sx={{ position: 'relative' }}
          >
            {/* ✅ Wrap each template in a uniquely scoped container */}
            <div id={`template-${index}`} className="template-container">
              {/* ✅ Inject scoped CSS using a unique container ID */}
              <style>{`#template-${index} { ${template.cssStyles} }`}</style>

              {/* ✅ Render each template’s structure with default data */}
              <div
                dangerouslySetInnerHTML={{
                  __html: renderTemplateContent(template),
                }}
              />
            </div>

            {/* ✅ Select Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => handleSelectTemplate(template._id)}
            >
              Choose This Template
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AllTemplatesPage;
