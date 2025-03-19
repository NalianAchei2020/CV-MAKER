"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { FileText, Mail, MessageSquare, Wand2, CheckCircle2, AlertCircle } from 'lucide-react';

const applicationSchema = z.object({
  jobTitle: z.string().min(2, { message: "Job title is required." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  jobDescription: z.string().min(10, { message: "Job description should be at least 10 characters." }),
  resumeText: z.string().min(10, { message: "Resume text should be at least 10 characters." }),
});

export default function ApplicationKitPage() {
  const [activeTab, setActiveTab] = useState('input');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobDescription: "",
      resumeText: "",
    },
  });

  const [keywordMatches, setKeywordMatches] = useState<{
    keyword: string;
    found: boolean;
    importance: 'high' | 'medium' | 'low';
  }[]>([]);

  const [optimizedDocuments, setOptimizedDocuments] = useState({
    resume: "",
    coverLetter: "",
    followUpEmail: "",
  });

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          
          // Mock keyword analysis results
          setKeywordMatches([
            { keyword: "React", found: true, importance: 'high' },
            { keyword: "Node.js", found: true, importance: 'high' },
            { keyword: "TypeScript", found: true, importance: 'medium' },
            { keyword: "AWS", found: false, importance: 'medium' },
            { keyword: "CI/CD", found: false, importance: 'low' },
            { keyword: "Agile", found: true, importance: 'medium' },
            { keyword: "REST API", found: true, importance: 'high' },
            { keyword: "GraphQL", found: false, importance: 'low' },
            { keyword: "Team leadership", found: true, importance: 'medium' },
            { keyword: "Docker", found: false, importance: 'medium' },
          ]);
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setProgress(0);
    
    // Simulate optimization with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          setOptimizationComplete(true);
          
          // Mock optimized documents
          setOptimizedDocuments({
            resume: "# John Doe\n\nSenior Software Engineer\n\n## Summary\nExperienced software engineer with expertise in React, Node.js, TypeScript, and REST API development. Proven track record of leading teams and delivering high-quality software solutions in Agile environments.\n\n## Experience\n\n### Senior Software Engineer | Tech Solutions Inc.\n*Jan 2020 - Present*\n\n- Developed and maintained scalable web applications using React and Node.js\n- Designed and implemented RESTful APIs for microservices architecture\n- Led a team of 5 developers in an Agile environment\n- Implemented CI/CD pipelines for automated testing and deployment\n- Utilized AWS services for cloud infrastructure\n\n...",
            
            coverLetter: "Dear Hiring Manager,\n\nI am writing to express my interest in the Senior Software Engineer position at Acme Inc. With over 5 years of experience in software development, specifically with React, Node.js, and TypeScript, I am confident in my ability to contribute to your team.\n\nIn my current role at Tech Solutions Inc., I have been responsible for developing and maintaining RESTful APIs and leading a team in an Agile environment. I have a strong understanding of software development principles and best practices.\n\nI am particularly excited about the opportunity to work with your team on building innovative solutions. My experience aligns perfectly with the requirements outlined in your job description, and I am eager to bring my skills to your organization.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experiences would be an ideal fit for this position.\n\nSincerely,\nJohn Doe",
            
            followUpEmail: "Subject: Following Up on Senior Software Engineer Application\n\nDear Hiring Manager,\n\nI hope this email finds you well. I recently submitted my application for the Senior Software Engineer position at Acme Inc., and I wanted to follow up to express my continued interest in the role.\n\nAfter learning more about your company's mission and the innovative projects your team is working on, I am even more excited about the possibility of joining your organization. My experience with React, Node.js, and RESTful API development aligns well with what you're looking for, and I'm confident that I can make valuable contributions to your team.\n\nIf you need any additional information from me or would like to schedule a conversation, please don't hesitate to reach out. I appreciate your time and consideration.\n\nBest regards,\nJohn Doe\n(555) 123-4567\njohn.doe@email.com"
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const onSubmit = (data: z.infer<typeof applicationSchema>) => {
    console.log(data);
    setActiveTab('analysis');
    handleAnalyze();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1">
        <DashboardShell>
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Application Kit</h1>
              <p className="text-muted-foreground">
                Tailor your resume and cover letter to match job requirements and increase your chances of getting hired.
              </p>
            </div>
            <Separator />
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="input">Job Information</TabsTrigger>
                <TabsTrigger value="analysis" disabled={!form.formState.isSubmitted}>
                  Keyword Analysis
                </TabsTrigger>
                <TabsTrigger value="documents" disabled={!analysisComplete}>
                  Optimized Documents
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="input" className="mt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Senior Software Engineer" {...field} />
                            </FormControl>
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
                              <Input placeholder="Acme Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Paste the full job description here..." 
                              className="min-h-[200px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="resumeText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Current Resume</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Paste your current resume text here..." 
                              className="min-h-[200px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end">
                      <Button type="submit">Analyze & Optimize</Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="analysis" className="mt-6">
                <div className="space-y-8">
                  {isAnalyzing ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Analyzing your application...</h3>
                        <span className="text-sm text-muted-foreground">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          • Extracting keywords from job description
                        </p>
                        <p className="text-sm text-muted-foreground">
                          • Comparing with your resume
                        </p>
                        <p className="text-sm text-muted-foreground">
                          • Identifying skill gaps
                        </p>
                        <p className="text-sm text-muted-foreground">
                          • Preparing optimization recommendations
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Keyword Analysis Results</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Match Score</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl font-bold">70%</span>
                                <span className="text-sm text-muted-foreground">Good match</span>
                              </div>
                              <Progress value={70} className="h-2" />
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">ATS Compatibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl font-bold">85%</span>
                                <span className="text-sm text-muted-foreground">Very good</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Key Skills & Keywords</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {keywordMatches.map((item, index) => (
                            <div 
                              key={index} 
                              className={`flex items-center p-3 rounded-md border ${
                                item.found ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
                              }`}
                            >
                              {item.found ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{item.keyword}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.importance === 'high' ? 'High importance' : 
                                   item.importance === 'medium' ? 'Medium importance' : 'Low importance'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Recommendations</h3>
                        <div className="space-y-2">
                          <p className="text-sm">
                            • Add missing keywords: <span className="font-medium">AWS, CI/CD, Docker</span>
                          </p>
                          <p className="text-sm">
                            • Emphasize your experience with <span className="font-medium">React, Node.js, and REST APIs</span>
                          </p>
                          <p className="text-sm">
                            • Include specific achievements related to <span className="font-medium">team leadership and Agile methodologies</span>
                          </p>
                          <p className="text-sm">
                            • Consider adding a skills section that clearly lists all relevant technologies
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline"
                          onClick={() => setActiveTab('input')}
                        >
                          Back to Input
                        </Button>
                        <Button 
                          onClick={() => {
                            setActiveTab('documents');
                            handleOptimize();
                          }}
                        >
                          <Wand2 className="mr-2 h-4 w-4" />
                          Optimize Documents
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-6">
                <div className="space-y-8">
                  {isOptimizing ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Optimizing your documents...</h3>
                        <span className="text-sm text-muted-foreground">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          • Tailoring resume to highlight relevant experience
                        </p>
                        <p className="text-sm text-muted-foreground">
                          • Generating customized cover letter
                        </p>
                        <p className="text-sm text-muted-foreground">
                          • Creating follow-up email template
                        </p>
                        <p className="text-sm text-muted-foreground">
                          • Ensuring ATS compatibility
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Your Optimized Application Kit</h3>
                      
                      <Tabs defaultValue="resume" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="resume" className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            Resume
                          </TabsTrigger>
                          <TabsTrigger value="cover-letter" className="flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            Cover Letter
                          </TabsTrigger>
                          <TabsTrigger value="follow-up" className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Follow-up Email
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="resume" className="mt-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Optimized Resume</CardTitle>
                              <CardDescription>
                                Tailored to highlight relevant skills and experience for this position
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] whitespace-pre-line">
                                {optimizedDocuments.resume}
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                ATS-friendly format
                              </div>
                              <Button>Download Resume</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="cover-letter" className="mt-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Customized Cover Letter</CardTitle>
                              <CardDescription>
                                Personalized for {form.getValues().companyName} and the {form.getValues().jobTitle} position
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] whitespace-pre-line">
                                {optimizedDocuments.coverLetter}
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                Includes key requirements
                              </div>
                              <Button>Download Cover Letter</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="follow-up" className="mt-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Follow-up Email Template</CardTitle>
                              <CardDescription>
                                For use after submitting your application
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px] whitespace-pre-line">
                                {optimizedDocuments.followUpEmail}
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                Professional and concise
                              </div>
                              <Button>Copy to Clipboard</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex justify-between">
                        <Button 
                          variant="outline"
                          onClick={() => setActiveTab('analysis')}
                        >
                          Back to Analysis
                        </Button>
                        <Button>
                          Download All Documents
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DashboardShell>
      </div>
    </div>
  );
}