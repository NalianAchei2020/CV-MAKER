import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CVData } from './cvData';
import { useAppSelector } from '@/redux/store';

interface StepProps {
  cvData: CVData;
  setCurrentStep: (step: number) => void;
  setActiveTab: (tab: string) => void;
  selectedTemplate: string | null;
}

export default function PreviewTemplate({
  cvData,
  setCurrentStep,
  setActiveTab,
  selectedTemplate,
}: StepProps) {
  const templates = useAppSelector((state) => state.template.templates);
  const [renderedTemplate, setRenderedTemplate] = useState<string>('');
  const [templateStyles, setTemplateStyles] = useState<string>('');
  const [templateConfig, setTemplateConfig] = useState<any>(null);

  useEffect(() => {
    if (selectedTemplate && templates.length > 0) {
      const template = templates.flat().find((t) => t._id === selectedTemplate);
      if (template) {
        let renderedHtml = template.structure?.html || '';

        // Replace personal info placeholders
        Object.entries(cvData.personalInfo).forEach(([key, value]) => {
          if (value) {
            renderedHtml = renderedHtml.replace(
              new RegExp(`{{${key}}}`, 'g'),
              value.toString()
            );
          }
        });

        // Replace work experience placeholders
        cvData.workExperience.experiences.forEach((exp, index) => {
          Object.entries(exp).forEach(([key, value]) => {
            if (value) {
              renderedHtml = renderedHtml.replace(
                new RegExp(`{{experiences.${index}.${key}}}`, 'g'),
                value.toString()
              );
            }
          });
        });

        // Replace education placeholders
        cvData.education.education.forEach((edu, index) => {
          Object.entries(edu).forEach(([key, value]) => {
            if (value) {
              renderedHtml = renderedHtml.replace(
                new RegExp(`{{education.${index}.${key}}}`, 'g'),
                value.toString()
              );
            }
          });
        });

        // Replace projects placeholders
        cvData.projects.projects.forEach((proj, index) => {
          Object.entries(proj).forEach(([key, value]) => {
            if (value) {
              renderedHtml = renderedHtml.replace(
                new RegExp(`{{projects.${index}.${key}}}`, 'g'),
                value.toString()
              );
            }
          });
        });

        // Replace languages placeholders
        cvData.languages.languages.forEach((lang, index) => {
          Object.entries(lang).forEach(([key, value]) => {
            if (value) {
              renderedHtml = renderedHtml.replace(
                new RegExp(`{{languages.${index}.${key}}}`, 'g'),
                value.toString()
              );
            }
          });
        });

        // Replace skills placeholders
        cvData.skills.skills.forEach((skill, index) => {
          renderedHtml = renderedHtml.replace(
            new RegExp(`{{skills.${index}}}`, 'g'),
            skill
          );
        });

        setRenderedTemplate(renderedHtml);
        setTemplateStyles(template.cssStyles);
        setTemplateConfig({
          backgroundColor: template.backgroundColor,
          fontFamily: template.fontFamily,
          fontColor: template.fontColor,
        });
      }
    }
  }, [selectedTemplate, templates, cvData]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 border rounded-lg overflow-hidden">
        <div
          className="aspect-[3/4] bg-white overflow-auto p-8"
          style={{
            backgroundColor: templateConfig?.backgroundColor,
            fontFamily: templateConfig?.fontFamily,
            color: templateConfig?.fontColor,
          }}
        >
          <style>{templateStyles}</style>
          <div dangerouslySetInnerHTML={{ __html: renderedTemplate }} />
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Your CV is Ready!</h2>
          <p className="text-muted-foreground">
            Your professional CV has been created. You can download it in
            different formats or make final adjustments.
          </p>
        </div>
        <div className="space-y-4">
          <Button className="w-full">Download PDF</Button>
          <Button variant="outline" className="w-full">
            Download DOCX
          </Button>
          <Button variant="outline" className="w-full">
            Download TXT (ATS-Friendly)
          </Button>
        </div>
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">ATS Optimization Score</h3>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-[85%]"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Your CV is 85% optimized for ATS systems. Consider adding more
            industry-specific keywords to improve your score.
          </p>
        </div>
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Want to make changes?</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentStep(1);
                setActiveTab('personal');
              }}
            >
              Edit Personal Info
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentStep(2);
                setActiveTab('experience');
              }}
            >
              Edit Experience
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentStep(4);
                setActiveTab('projects');
              }}
            >
              Edit Projects
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentStep(5);
                setActiveTab('languages');
              }}
            >
              Edit Languages
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
