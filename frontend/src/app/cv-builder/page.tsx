'use client';

import { useState, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Templates from './templates';
import PreviewTemplate from './previewTemplate';
import { AIchatSession } from '@/hooks/generateTextFromAI';

// Schema definitions
const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  jobTitle: z.string().min(2, { message: 'Job title is required.' }),
  linkedin_profile: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(5, { message: 'Phone number is required.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  website: z.string().optional(),
  summary: z
    .string()
    .min(10, { message: 'Summary should be at least 10 characters.' }),
});

const workExperienceSchema = z.object({
  experiences: z.array(
    z.object({
      jobTitle: z.string().min(2, { message: 'Job title is required.' }),
      company: z.string().min(2, { message: 'Company name is required.' }),
      location: z.string().min(2, { message: 'Location is required.' }),
      startDate: z.string().min(2, { message: 'Start date is required.' }),
      endDate: z.string().min(2, { message: 'End date is required.' }),
      description: z
        .string()
        .min(10, { message: 'Description should be at least 10 characters.' }),
    })
  ),
});

const educationSchema = z.object({
  education: z.array(
    z.object({
      degree: z.string().min(2, { message: 'Degree is required.' }),
      institution: z.string().min(2, { message: 'Institution is required.' }),
      location: z.string().min(2, { message: 'Location is required.' }),
      startDate: z.string().min(2, { message: 'Start date is required.' }),
      endDate: z.string().min(2, { message: 'End date is required.' }),
      description: z.string().optional(),
    })
  ),
});

const projectsSchema = z.object({
  projects: z.array(
    z.object({
      title: z.string().min(2, { message: 'Project title is required.' }),
      url: z
        .string()
        .url({ message: 'Please enter a valid URL.' })
        .optional()
        .or(z.literal('')),
      description: z
        .string()
        .min(10, { message: 'Description should be at least 10 characters.' }),
    })
  ),
});

const languagesSchema = z.object({
  languages: z.array(
    z.object({
      language: z.string().min(2, { message: 'Language name is required.' }),
      proficiency: z
        .string()
        .min(2, { message: 'Proficiency level is required.' }),
    })
  ),
});

const skillsSchema = z.object({
  skills: z.array(z.string().min(1, { message: 'Skill cannot be empty.' })),
});

// cv data interface
interface CVData {
  personalInfo: z.infer<typeof personalInfoSchema>;
  workExperience: z.infer<typeof workExperienceSchema>;
  education: z.infer<typeof educationSchema>;
  projects: z.infer<typeof projectsSchema>;
  languages: z.infer<typeof languagesSchema>;
  skills: z.infer<typeof skillsSchema>;
}

export default function CVBuilderPage() {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 'templates', label: 'Choose Template' },
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'languages', label: 'Languages' },
    { id: 'skills', label: 'Skills' },
    { id: 'preview', label: 'Preview & Download' },
  ];

  const proficiencyLevels = [
    { value: 'Native', label: 'Native' },
    { value: 'Fluent', label: 'Fluent' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Basic', label: 'Basic' },
  ];

  // Personal Info Form
  const personalInfoForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: '',
      jobTitle: '',
      linkedin_profile: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: '',
    },
  });

  // Work Experience Form with Field Array
  const workExperienceForm = useForm<z.infer<typeof workExperienceSchema>>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      experiences: [
        {
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    },
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: workExperienceForm.control,
    name: 'experiences',
  });

  // Education Form with Field Array
  const educationForm = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: [
        {
          degree: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: educationForm.control,
    name: 'education',
  });

  // Projects Form with Field Array
  const projectsForm = useForm<z.infer<typeof projectsSchema>>({
    resolver: zodResolver(projectsSchema),
    defaultValues: {
      projects: [
        {
          title: '',
          url: '',
          description: '',
        },
      ],
    },
  });

  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: projectsForm.control,
    name: 'projects',
  });

  // Languages Form with Field Array
  const languagesForm = useForm<z.infer<typeof languagesSchema>>({
    resolver: zodResolver(languagesSchema),
    defaultValues: {
      languages: [
        {
          language: '',
          proficiency: 'Intermediate',
        },
      ],
    },
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control: languagesForm.control,
    name: 'languages',
  });

  // Skills Form with Field Array
  const skillsForm = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: [''],
    },
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: skillsForm.control,
    name: 'skills',
  });

  // Consolidate all form data into a single object
  const getCVData = (): CVData => {
    return {
      personalInfo: personalInfoForm.getValues(),
      workExperience: workExperienceForm.getValues(),
      education: educationForm.getValues(),
      projects: projectsForm.getValues(),
      languages: languagesForm.getValues(),
      skills: skillsForm.getValues(),
    };
  };

  // Memoized handlers
  const handleSelectTemplate = useCallback((templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentStep(1);
    setActiveTab('personal');
  }, []);

  const handleAddExperience = useCallback(() => {
    appendExperience({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  }, [appendExperience]);

  const handleAddEducation = useCallback(() => {
    appendEducation({
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  }, [appendEducation]);

  const handleAddProject = useCallback(() => {
    appendProject({
      title: '',
      url: '',
      description: '',
    });
  }, [appendProject]);

  const handleAddLanguage = useCallback(() => {
    appendLanguage({
      language: '',
      proficiency: 'Intermediate',
    });
  }, [appendLanguage]);

  const handleAddSkill = useCallback(() => {
    appendSkill('');
  }, [appendSkill]);

  // Form submission handlers
  const onPersonalInfoSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    console.log(data);
    setCurrentStep(2);
    setActiveTab('experience');
  };

  const onWorkExperienceSubmit = (
    data: z.infer<typeof workExperienceSchema>
  ) => {
    console.log(data);
    setCurrentStep(3);
    setActiveTab('education');
  };

  const onEducationSubmit = (data: z.infer<typeof educationSchema>) => {
    console.log(data);
    setCurrentStep(4);
    setActiveTab('projects');
  };

  const onProjectsSubmit = (data: z.infer<typeof projectsSchema>) => {
    console.log(data);
    setCurrentStep(5);
    setActiveTab('languages');
  };

  const onLanguagesSubmit = (data: z.infer<typeof languagesSchema>) => {
    console.log(data);
    setCurrentStep(6);
    setActiveTab('skills');
  };

  const onSkillsSubmit = (data: z.infer<typeof skillsSchema>) => {
    console.log(data);
    setCurrentStep(7);
    setActiveTab('preview');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1">
        <DashboardShell>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">CV Builder</h1>
              <p className="text-muted-foreground">
                Create a professional CV that stands out and gets you noticed.
              </p>
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                        currentStep >= index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 w-8 ${
                          currentStep > index ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm font-medium">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-8">
                {steps.map((step) => (
                  <TabsTrigger
                    key={step.id}
                    value={step.id}
                    disabled={
                      (step.id === 'personal' && !selectedTemplate) ||
                      (step.id === 'experience' && currentStep < 1) ||
                      (step.id === 'education' && currentStep < 2) ||
                      (step.id === 'projects' && currentStep < 3) ||
                      (step.id === 'languages' && currentStep < 4) ||
                      (step.id === 'skills' && currentStep < 5) ||
                      (step.id === 'preview' && currentStep < 6)
                    }
                  >
                    {step.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="templates" className="mt-6">
                <Templates
                  handleSelectTemplate={handleSelectTemplate}
                  selectedTemplate={selectedTemplate}
                />
              </TabsContent>

              <TabsContent value="personal" className="mt-6">
                <Form {...personalInfoForm}>
                  <form
                    onSubmit={personalInfoForm.handleSubmit(
                      onPersonalInfoSubmit
                    )}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={personalInfoForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Software Engineer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john.doe@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 (555) 123-4567"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="New York, NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={personalInfoForm.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://johndoe.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={personalInfoForm.control}
                        name="linkedin_profile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn Profile</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://www.linkedin.com/in/john-doe"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={personalInfoForm.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Summary</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Experienced software engineer with a passion for developing innovative solutions..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setCurrentStep(0);
                          setActiveTab('templates');
                        }}
                      >
                        Back
                      </Button>
                      <Button type="submit">Continue</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <Form {...workExperienceForm}>
                  <form
                    onSubmit={workExperienceForm.handleSubmit(
                      onWorkExperienceSubmit
                    )}
                    className="space-y-6"
                  >
                    {experienceFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-6 p-6 border rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">
                            Work Experience {index + 1}
                          </h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeExperience(index)}
                            disabled={experienceFields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={workExperienceForm.control}
                            name={`experiences.${index}.jobTitle`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Software Engineer"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={workExperienceForm.control}
                            name={`experiences.${index}.company`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                  <Input placeholder="Acme Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={workExperienceForm.control}
                            name={`experiences.${index}.location`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="San Francisco, CA"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={workExperienceForm.control}
                              name={`experiences.${index}.startDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Jan 2020" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={workExperienceForm.control}
                              name={`experiences.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Present" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <FormField
                          control={workExperienceForm.control}
                          name={`experiences.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="• Developed and maintained web applications using React and Node.js
  • Improved application performance by 40% through code optimization
  • Collaborated with cross-functional teams to deliver features on time"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddExperience}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Experience
                    </Button>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setCurrentStep(1);
                          setActiveTab('personal');
                        }}
                      >
                        Back
                      </Button>
                      <Button type="submit">Continue</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <Form {...educationForm}>
                  <form
                    onSubmit={educationForm.handleSubmit(onEducationSubmit)}
                    className="space-y-6"
                  >
                    {educationFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-6 p-6 border rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Education {index + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEducation(index)}
                            disabled={educationFields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={educationForm.control}
                            name={`education.${index}.degree`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Bachelor of Science in Computer Science"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={educationForm.control}
                            name={`education.${index}.institution`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Institution</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="University of California, Berkeley"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={educationForm.control}
                            name={`education.${index}.location`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Berkeley, CA"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={educationForm.control}
                              name={`education.${index}.startDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Sep 2016" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={educationForm.control}
                              name={`education.${index}.endDate`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="May 2020" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <FormField
                          control={educationForm.control}
                          name={`education.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="• GPA: 3.8/4.0
  • Relevant coursework: Data Structures, Algorithms, Database Systems
  • Senior project: Developed a machine learning model for image recognition"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddEducation}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Education
                    </Button>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setCurrentStep(2);
                          setActiveTab('experience');
                        }}
                      >
                        Back
                      </Button>
                      <Button type="submit">Continue</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <Form {...projectsForm}>
                  <form
                    onSubmit={projectsForm.handleSubmit(onProjectsSubmit)}
                    className="space-y-6"
                  >
                    {projectFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-6 p-6 border rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Project {index + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProject(index)}
                            disabled={projectFields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={projectsForm.control}
                            name={`projects.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="E-commerce Platform"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={projectsForm.control}
                            name={`projects.${index}.url`}
                            render={({ field }) => (
                              <FormItem className="col-span-2">
                                <FormLabel>Project URL (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://github.com/username/project"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={projectsForm.control}
                          name={`projects.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="• Developed a full-stack e-commerce platform using React, Node.js, and MongoDB
  • Implemented secure payment processing with Stripe integration
  • Designed responsive UI that increased mobile conversions by 35%"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddProject}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Project
                    </Button>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setCurrentStep(3);
                          setActiveTab('education');
                        }}
                      >
                        Back
                      </Button>
                      <Button type="submit">Continue</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="languages" className="mt-6">
                <Form {...languagesForm}>
                  <form
                    onSubmit={languagesForm.handleSubmit(onLanguagesSubmit)}
                    className="space-y-6"
                  >
                    {languageFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-4 p-6 border rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Language {index + 1}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLanguage(index)}
                            disabled={languageFields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={languagesForm.control}
                            name={`languages.${index}.language`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Language</FormLabel>
                                <FormControl>
                                  <Input placeholder="English" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={languagesForm.control}
                            name={`languages.${index}.proficiency`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Proficiency Level</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select proficiency level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {proficiencyLevels.map((level) => (
                                      <SelectItem
                                        key={level.value}
                                        value={level.value}
                                      >
                                        {level.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddLanguage}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Language
                    </Button>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setCurrentStep(4);
                          setActiveTab('projects');
                        }}
                      >
                        Back
                      </Button>
                      <Button type="submit">Continue</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <Form {...skillsForm}>
                  <form
                    onSubmit={skillsForm.handleSubmit(onSkillsSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      {skillFields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-center space-x-2"
                        >
                          <FormField
                            control={skillsForm.control}
                            name={`skills.${index}`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder={`Skill ${
                                      index + 1
                                    } (e.g., JavaScript, Project Management)`}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSkill(index)}
                            disabled={skillFields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddSkill}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Skill
                    </Button>
                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setCurrentStep(5);
                          setActiveTab('languages');
                        }}
                      >
                        Back
                      </Button>
                      <Button type="submit">Continue</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div>
                    <PreviewTemplate
                      setCurrentStep={setCurrentStep}
                      setActiveTab={setActiveTab}
                      cvData={getCVData()}
                      selectedTemplate={selectedTemplate}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DashboardShell>
      </div>
    </div>
  );
}
