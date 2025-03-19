'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface EditProps {
  content: string;
  onComplete: (content: string) => void;
  onBack: () => void;
}

export const CoverLetterEdit = ({ content, onComplete, onBack }: EditProps) => {
  const [editedContent, setEditedContent] = useState(content);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Edit Cover Letter</CardTitle>
        <CardDescription>
          Make any necessary adjustments to your cover letter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[400px] font-serif text-base leading-relaxed"
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button onClick={() => onComplete(editedContent)}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
