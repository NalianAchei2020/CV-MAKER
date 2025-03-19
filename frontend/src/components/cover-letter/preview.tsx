'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';

interface PreviewProps {
  data: {
    recipientName: string;
    companyName: string;
    jobTitle: string;
    experience: string;
    writerName: string;
    jobDescription?: string;
  };
  onBack: () => void;
  onGenerate: () => void;
}

export const CoverLetterPreview = ({
  data,
  onBack,
  onGenerate,
}: PreviewProps) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview Cover Letter</CardTitle>
        <CardDescription>
          Review your information before generating the cover letter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none">
          <div className="mb-8 text-right">{currentDate}</div>

          <div className="mb-8">
            <p>{data.recipientName}</p>
            <p>{data.companyName}</p>
          </div>

          <p className="mb-4">Dear {data.recipientName},</p>

          <p className="mb-4">
            I am writing to express my strong interest in the {data.jobTitle}{' '}
            position at {data.companyName}.
          </p>

          <div className="mb-4 whitespace-pre-line">{data.experience}</div>

          <p className="mb-8">
            Thank you for considering my application. I look forward to
            discussing how I can contribute to {data.companyName}.
          </p>

          <div>
            <p>Sincerely,</p>
            <p>{data.writerName}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Button>
          <Button onClick={onGenerate}>
            <FileText className="mr-2 h-4 w-4" />
            Generate AI Version
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
