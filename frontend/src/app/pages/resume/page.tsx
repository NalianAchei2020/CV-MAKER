'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ResumeForm } from '@/components/resume-form';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'grey.50',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <ResumeForm />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
