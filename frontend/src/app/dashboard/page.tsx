"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Mail, Briefcase, Plus, Settings, LogOut, User, CreditCard } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('resumes');

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8">
            <div className="flex flex-col h-full space-y-4">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('resumes')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Resumes
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('cover-letters')}>
                  <Mail className="mr-2 h-4 w-4" />
                  Cover Letters
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('applications')}>
                  <Briefcase className="mr-2 h-4 w-4" />
                  Applications
                </Button>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground py-2">Settings</p>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
              <div className="mt-auto">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <DashboardShell>
            <Tabs defaultValue="resumes" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="resumes" className="text-sm">
                    Resumes
                  </TabsTrigger>
                  <TabsTrigger value="cover-letters" className="text-sm">
                    Cover Letters
                  </TabsTrigger>
                  <TabsTrigger value="applications" className="text-sm">
                    Applications
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center space-x-2">
                  {activeTab === 'resumes' && (
                    <Link href="/cv-builder">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Resume
                      </Button>
                    </Link>
                  )}
                  {activeTab === 'cover-letters' && (
                    <Link href="/cover-letter">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Cover Letter
                      </Button>
                    </Link>
                  )}
                  {activeTab === 'applications' && (
                    <Link href="/application-kit">
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        New Application
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              <TabsContent value="resumes" className="space-y-4 mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Software Engineer Resume</CardTitle>
                      <CardDescription>Last updated: 2 days ago</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="aspect-[3/4] rounded-md bg-muted flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                          alt="Resume preview" 
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">Download</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Product Manager Resume</CardTitle>
                      <CardDescription>Last updated: 1 week ago</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="aspect-[3/4] rounded-md bg-muted flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                          alt="Resume preview" 
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">Download</Button>
                    </CardFooter>
                  </Card>
                  <Link href="/cv-builder" className="block">
                    <Card className="border-dashed h-full">
                      <CardContent className="flex flex-col items-center justify-center h-full py-10">
                        <div className="rounded-full bg-muted p-3 mb-4">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-medium">Create New Resume</p>
                        <p className="text-sm text-muted-foreground mt-1">Choose from professional templates</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="cover-letters" className="space-y-4 mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Google Application</CardTitle>
                      <CardDescription>Last updated: 3 days ago</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="aspect-[3/4] rounded-md bg-muted flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                          alt="Cover letter preview" 
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">Download</Button>
                    </CardFooter>
                  </Card>
                  <Link href="/cover-letter" className="block">
                    <Card className="border-dashed h-full">
                      <CardContent className="flex flex-col items-center justify-center h-full py-10">
                        <div className="rounded-full bg-muted p-3 mb-4">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-medium">Create New Cover Letter</p>
                        <p className="text-sm text-muted-foreground mt-1">Tailored to your job application</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </TabsContent>
              <TabsContent value="applications" className="space-y-4 mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle>Microsoft Full Stack Developer</CardTitle>
                      <CardDescription>Created: 1 week ago</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Resume</span>
                          <span className="text-sm text-muted-foreground">Optimized</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Cover Letter</span>
                          <span className="text-sm text-muted-foreground">Customized</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Follow-up Email</span>
                          <span className="text-sm text-muted-foreground">Ready</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">View</Button>
                      <Button size="sm">Download All</Button>
                    </CardFooter>
                  </Card>
                  <Link href="/application-kit" className="block">
                    <Card className="border-dashed h-full">
                      <CardContent className="flex flex-col items-center justify-center h-full py-10">
                        <div className="rounded-full bg-muted p-3 mb-4">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-lg font-medium">Create New Application Kit</p>
                        <p className="text-sm text-muted-foreground mt-1">Tailor documents to job description</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </DashboardShell>
        </main>
      </div>
    </div>
  );
}