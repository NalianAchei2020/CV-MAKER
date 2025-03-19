'use client';

import { FileText, Edit2, Download } from 'lucide-react';

interface StepsProps {
  currentStep: number;
}

export const Steps = ({ currentStep }: StepsProps) => {
  const steps = [
    { title: 'Generate', icon: FileText },
    { title: 'Edit', icon: Edit2 },
    { title: 'Download', icon: Download },
  ];

  return (
    <div className="mb-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > index + 1;
            const isCurrent = currentStep === index + 1;

            return (
              <div key={index} className="flex flex-1 items-center">
                <div
                  className={`flex items-center ${
                    index !== steps.length - 1 ? 'w-full' : ''
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      isCompleted
                        ? 'border-green-500 bg-green-50'
                        : isCurrent
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isCompleted
                          ? 'text-green-500'
                          : isCurrent
                          ? 'text-blue-500'
                          : 'text-gray-400'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <div
                    className={`ml-4 ${
                      index !== steps.length - 1 ? 'w-full' : ''
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        isCurrent ? 'text-blue-500' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`h-0.5 w-full ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
