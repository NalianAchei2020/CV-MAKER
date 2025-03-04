import React from 'react';
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
import { PersonalInfoStep } from './form-steps/personal-info';
import SummaryStep from './form-steps/Summary';
import { WorkExperienceStep } from './form-steps/work-experience';
import { EducationStep } from './form-steps/education';
import { SkillsStep } from './form-steps/skills';
import { ProjectsStep } from './form-steps/projects';
import { LanguagesStep } from './form-steps/languages';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Eye } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface ResumeFormValues {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
    linkedin_profile: string;
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

const defaultValues: ResumeFormValues = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
    linkedin_profile: '',
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
  { label: 'Summary', component: SummaryStep },
  { label: 'Work Experience', component: WorkExperienceStep },
  { label: 'Education', component: EducationStep },
  { label: 'Skills', component: SkillsStep },
  { label: 'Projects', component: ProjectsStep },
  { label: 'Languages', component: LanguagesStep },
];

interface ResumeFormProps {
  selectedTemplate: string;
  setFormData: (data: ResumeFormValues) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  selectedTemplate,
  setFormData,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setLocalFormData] = useLocalStorage(
    'resumeFormData',
    defaultValues
  );
  const [activeStep, setActiveStep] = useLocalStorage('resumeActiveStep', 0);

  const form = useForm<ResumeFormValues>({
    defaultValues: formData,
  });

  // Update localStorage whenever form data changes
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      setLocalFormData(value as ResumeFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setLocalFormData]);

  const CurrentStepComponent = steps[activeStep].component;

  const handleNext = () => {
    setActiveStep(Math.min(steps.length - 1, activeStep + 1));
  };

  const handleBack = () => {
    setActiveStep(Math.max(0, activeStep - 1));
  };

  const handlePreview = () => {
    const updatedData = form.getValues();
    console.log('Previewing with data:', updatedData);
    setFormData(updatedData); // ✅ Update `Home.tsx`
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

      <Stepper activeStep={activeStep} sx={{ py: 4 }}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form>
        <Box sx={{ mt: 4, mb: 4 }}>
          <CurrentStepComponent form={form} formData={form.getValues()} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: 2,
            gap: 2,
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
              variant="contained"
              color="primary"
              startIcon={<Eye className="w-4 h-4" />}
              onClick={handlePreview}
            >
              Preview Resume
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
};
