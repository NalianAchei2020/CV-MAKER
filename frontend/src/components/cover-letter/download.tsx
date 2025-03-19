'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface DownloadProps {
  content: string;
  formData: {
    recipientName: string;
    companyName: string;
    jobTitle: string;
    writerName: string;
  };
  onBack: () => void;
}

export const CoverLetterDownload = ({
  content,
  formData,
  onBack,
}: DownloadProps) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(12);
    doc.text(new Date().toLocaleDateString(), 20, 20);

    // Add recipient info
    doc.text(formData.recipientName, 20, 40);
    doc.text(formData.companyName, 20, 50);

    // Add content
    const splitContent = doc.splitTextToSize(content, 170);
    doc.text(splitContent, 20, 70);

    // Add signature
    doc.text('Sincerely,', 20, doc.internal.pageSize.height - 40);
    doc.text(formData.writerName, 20, doc.internal.pageSize.height - 30);

    doc.save(`cover-letter-${formData.companyName.toLowerCase()}.pdf`);
  };

  const downloadWord = () => {
    const header = `
${new Date().toLocaleDateString()}

${formData.recipientName}
${formData.companyName}

Dear ${formData.recipientName},
`;

    const footer = `

Sincerely,
${formData.writerName}`;

    const fullContent = header + content + footer;

    const blob = new Blob([fullContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cover-letter-${formData.companyName.toLowerCase()}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Download Cover Letter</CardTitle>
        <CardDescription>
          Download your cover letter in your preferred format
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 bg-gray-50 p-6 rounded-lg font-serif text-base leading-relaxed whitespace-pre-line">
          {content}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Edit
          </Button>

          <div className="space-x-4">
            <Button variant="outline" onClick={downloadWord}>
              <FileText className="mr-2 h-4 w-4" />
              Download Word
            </Button>
            <Button onClick={downloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
