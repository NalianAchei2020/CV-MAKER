'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store';
import { fetchTemplates } from '@/redux/templateSlice';
import { saveUserCV } from '@/redux/cvSlice';

interface ResumePreviewProps {
  data: any;
  templateId: string;
  onBack: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  templateId,
  onBack,
}) => {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ✅ Get templates from Redux store
  const { templates } = useSelector((state: RootState) => state.templates);
  const template = templates.find((t) => t._id === templateId);

  if (!template)
    return <Typography color="error">No template found.</Typography>;

  // ✅ Merge user-entered data with defaultData
  const mergedData = { ...template.defaultData, ...data };

  // ✅ Replace placeholders in the template structure with merged data
  let renderedHtml = template.structure.html;
  Object.keys(mergedData).forEach((key) => {
    if (renderedHtml.includes(`{{${key}}}`)) {
      renderedHtml = renderedHtml.replace(
        new RegExp(`{{${key}}}`, 'gi'),
        mergedData[key] || ''
      );
    }
  });

  // ✅ Handle Save CV
  const handleSaveCV = async () => {
    setSaving(true);
    const token = localStorage.getItem('token') || '';

    dispatch(
      saveUserCV({ token, cvData: { selectedTemplate: templateId, ...data } })
    )
      .unwrap()
      .then(() => {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      })
      .finally(() => setSaving(false));
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button onClick={onBack}>Back to Edit</Button>
        <Typography variant="h5">Resume Preview</Typography>
      </Box>

      <Box sx={{ border: '1px solid #ddd', p: 4 }}>
        <style>{template.cssStyles}</style>
        <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: '100%' }}
        onClick={handleSaveCV}
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save CV'}
      </Button>

      {saveSuccess && (
        <Typography color="success.main" mt={2}>
          CV saved successfully!
        </Typography>
      )}
    </Paper>
  );
};
