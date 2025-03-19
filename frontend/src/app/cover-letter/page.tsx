'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { generateCoverLetter } from '@/services/generateCover';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, FileText, Download, Edit2 } from 'lucide-react';
import { CoverLetterEdit } from '@/components/cover-letter/edit';
import { CoverLetterDownload } from '@/components/cover-letter/download';
import { Steps } from '@/components/cover-letter/steps';

const formSchema = z.object({
  recipientName: z.string().min(2, 'Recipient name is required'),
  companyName: z.string().min(2, 'Company name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  experience: z
    .string()
    .min(100, 'Experience should be at least 100 characters'),
  writerName: z.string().min(2, 'Your name is required'),
  jobDescription: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CoverLetterPage = () => {
  const [coverLetter, setCoverLetter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: '',
      companyName: '',
      jobTitle: '',
      experience: '',
      writerName: '',
      jobDescription: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const {
      jobTitle,
      experience,
      recipientName,
      companyName,
      writerName,
      jobDescription,
    } = values;

    const prompt = `Create a professional cover letter for a ${jobTitle} position. Include relevant experience: ${experience}, 
      and address it to ${recipientName} as the hiring manager. The company is ${companyName}. My name is ${writerName}, 
      job description is ${
        jobDescription || 'not provided'
      }. Format it professionally with proper spacing 
      and structure. Keep it concise and impactful. Please keep it concise and avoid any additional 
      instructions or explanations. Do not leave any spaces with comments for the user to adjust`;

    try {
      const result = await generateCoverLetter.sendMessage(prompt);
      const response = await result.response.text();
      setCoverLetter(response);
      setCurrentStep(2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(coverLetter);

  const handleEditComplete = (editedContent: string) => {
    setCoverLetter(editedContent);
    setCurrentStep(3);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto py-8">
        <Steps currentStep={currentStep} />

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Create Cover Letter</CardTitle>
              <CardDescription>
                Fill out the form below to generate your professional cover
                letter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="recipientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Mr. John Smith"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The name of the hiring manager or recruiter
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Acme Corporation"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Senior Software Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relevant Experience and Skills</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your relevant experience and key skills..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Highlight your most relevant experience and skills for
                          this position
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="writerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the job description here..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Adding the job description helps in generating a more
                          targeted cover letter
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <FileText className="mr-2 h-4 w-4" />
                      )}
                      Generate Cover Letter
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <CoverLetterEdit
            content={coverLetter}
            onComplete={handleEditComplete}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <CoverLetterDownload
            content={coverLetter}
            formData={form.getValues()}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
};

export default CoverLetterPage;
