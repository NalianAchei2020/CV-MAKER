'use client';
import React from 'react';
import { FileText, ArrowRight, CheckCircle, Star } from 'lucide-react';

const TemplateSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-500 to-blue-600">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-20 sm:py-32">
          <div className="text-center">
            <div className="relative mb-8 inline-block">
              <div className="bg-[#a9c9f6] px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 text-white">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-bold text-blue-600">
                    Our Creative Templates
                  </span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Choose A Template, And Let's Create
              <br />
              Your Resume In Minutes
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/80">
              Professional templates, AI-powered suggestions, and expert tips to
              help you create a resume that stands out and gets you hired.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg bg-white text-blue-600 hover:bg-white/90 transition-colors">
                Create My Resume <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex items-center px-6 py-3 text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors">
                View Templates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateSection;
