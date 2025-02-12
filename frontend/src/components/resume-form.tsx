'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  MobileStepper,
} from '@mui/material';
import { PersonalInfoStep } from '@/components/form-steps/personal-info';
import { WorkExperienceStep } from '@/components/form-steps/work-experience';
import { EducationStep } from '@/components/form-steps/education';
import { SkillsStep } from '@/components/form-steps/skills';
import { ProjectsStep } from '@/components/form-steps/projects';
import { LanguagesStep } from '@/components/form-steps/languages';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveIcon from '@mui/icons-material/Save';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface ResumeFormValues {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
  };
  job_title: string;
  summary: string;
  workExperience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
}

const STORAGE_KEYS = {
  FORM_DATA: 'resumeFormData',
  ACTIVE_STEP: 'resumeActiveStep',
} as const;

const defaultValues: ResumeFormValues = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
  },
  job_title: '',
  summary: '',
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  languages: [],
};

const steps = [
  { label: 'Personal Info', component: PersonalInfoStep },
  { label: 'Work Experience', component: WorkExperienceStep },
  { label: 'Education', component: EducationStep },
  { label: 'Skills', component: SkillsStep },
  { label: 'Projects', component: ProjectsStep },
  { label: 'Languages', component: LanguagesStep },
];

export function ResumeForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [savedFormData, setSavedFormData] = useLocalStorage<ResumeFormValues>(
    STORAGE_KEYS.FORM_DATA,
    defaultValues
  );

  const [activeStep, setActiveStep] = useLocalStorage(
    STORAGE_KEYS.ACTIVE_STEP,
    0
  );

  const form = useForm<ResumeFormValues>({
    defaultValues: savedFormData,
  });

  // Update localStorage when form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      setSavedFormData(value as ResumeFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setSavedFormData]);

  const CurrentStepComponent = steps[activeStep].component;

  const handleNext = () => {
    setActiveStep(Math.min(steps.length - 1, activeStep + 1));
  };

  const handleBack = () => {
    setActiveStep(Math.max(0, activeStep - 1));
  };

  const onSubmit = (data: ResumeFormValues) => {
    console.log(data);
    setSavedFormData(data);
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 3 }}
      >
        Create Your Resume
      </Typography>

      {isMobile ? (
        <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
          <MobileStepper
            variant="text"
            steps={steps.length}
            position="static"
            activeStep={activeStep}
            sx={{
              backgroundColor: 'transparent',
              mb: 3,
              '.MuiMobileStepper-dot': {
                width: 8,
                height: 8,
              },
              '.MuiMobileStepper-dotActive': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
            nextButton={
              <Typography variant="body2" color="primary">
                {steps[activeStep]?.label}
              </Typography>
            }
            backButton={
              <Typography variant="body2" color="text.secondary">
                Step {activeStep + 1}/{steps.length}
              </Typography>
            }
          />
        </Box>
      ) : (
        <Stepper
          activeStep={activeStep}
          sx={{
            py: 4,
            '& .MuiStepLabel-label': {
              typography: 'body2',
            },
          }}
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box sx={{ mt: 4, mb: 4 }}>
          <CurrentStepComponent form={form} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: 2,
            gap: 2,
            flexDirection: 'row',
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<NavigateBeforeIcon />}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save Resume
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<NavigateNextIcon />}
            >
              Next
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
}
