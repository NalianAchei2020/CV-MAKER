'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchUserCVs, deleteCV } from '@/redux/cvSlice';
import { fetchTemplates } from '@/redux/templateSlice';
import {
  Paper,
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MyCVPage = () => {
  const dispatch = useAppDispatch();
  const {
    cvs,
    loading: cvsLoading,
    error: cvsError,
  } = useAppSelector((state) => state.cvs);
  const {
    templates,
    loading: templatesLoading,
    error: templatesError,
  } = useAppSelector((state) => state.templates);

  useEffect(() => {
    dispatch(fetchUserCVs());
    dispatch(fetchTemplates());
  }, [dispatch]);

  const handleDeleteCV = (cvId: string) => {
    dispatch(deleteCV(cvId));
  };

  if (cvsLoading || templatesLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
        <Typography ml={2}>Loading your CVs...</Typography>
      </Box>
    );
  }

  if (cvsError)
    return <Typography color="error">Error loading CVs: {cvsError}</Typography>;
  if (templatesError)
    return (
      <Typography color="error">
        Error loading templates: {templatesError}
      </Typography>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Saved CVs
      </Typography>

      {cvs.length === 0 ? (
        <Typography>No CVs found. Start creating one!</Typography>
      ) : (
        cvs.map((cv) => {
          const template = templates.find((t) => t._id === cv.selectedTemplate);
          if (!template) {
            return (
              <Typography key={cv._id} color="error">
                Template not found
              </Typography>
            );
          }

          // ✅ Merge CV Data with Template Placeholders
          let renderedHtml = template.structure.html;
          Object.keys(cv).forEach((key) => {
            if (renderedHtml.includes(`{{${key}}}`)) {
              renderedHtml = renderedHtml.replace(
                new RegExp(`{{${key}}}`, 'gi'),
                cv[key] ? cv[key].toString() : ''
              );
            }
          });

          return (
            <Paper
              key={cv._id}
              elevation={3}
              sx={{ p: 3, mb: 3, position: 'relative' }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">
                  {cv.personalInfo.fullName}'s CV
                </Typography>
                <IconButton
                  onClick={() => handleDeleteCV(cv._id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Typography variant="body1" color="text.secondary">
                {cv.job_title}
              </Typography>

              {/* ✅ Unique CSS for Each Template */}
              <style dangerouslySetInnerHTML={{ __html: template.cssStyles }} />

              {/* ✅ Render Template with CV Data */}
              <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />
            </Paper>
          );
        })
      )}
    </Box>
  );
};

export default MyCVPage;
