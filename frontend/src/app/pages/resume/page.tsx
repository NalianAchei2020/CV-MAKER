'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ResumeForm } from '@/components/resume-form';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSearchParams } from 'next/navigation';
import type { ResumeFormValues } from '@/components/resume-form';
import { useState } from 'react';
import { ResumePreview } from '@/components/resume-preview';

const theme = createTheme();

export default function Home() {
  const searchParams = useSearchParams();
  const selectedTemplateId = searchParams.get('templateId') || '';
  const [formData, setFormData] = useState<ResumeFormValues | null>(null);

  console.log('Selected Template ID in Home:', selectedTemplateId);

  if (!selectedTemplateId) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        Please select a template first.
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4 }}>
        <Container maxWidth="md">
          {/* ✅ Pass setFormData so ResumeForm can update the data */}
          <ResumeForm
            selectedTemplate={selectedTemplateId}
            setFormData={setFormData}
          />
        </Container>
        <Container maxWidth="md">
          {/* ✅ Render preview only when formData exists */}
          {formData && (
            <ResumePreview
              data={formData}
              templateId={selectedTemplateId}
              onBack={() => setFormData(null)} // Allow going back to edit
            />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
