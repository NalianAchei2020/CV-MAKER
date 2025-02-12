'use client';

import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import HowItWorks from './howItWorks';

const AboutUs = () => {
  const features = [
    'Proven CV Templates to increase Hiring Chance',
    'Creative and Clean Templates Design',
    'Easy and Intuitive Online CV Builder',
    'Free to use. Developed by hiring professionals.',
    'Fast Easy CV and Resume Formatting',
    'Recruiter Approved Phrases.',
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#9ac6f7] to-white rounded-t-3xl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          {/* First Column - Image */}
          <div className="lg:col-span-4 relative">
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              <Image
                src="/Images/resume.png"
                alt="Resume Template"
                fill
                className="object-contain"
                priority
              />
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="absolute top-1/2 -right-4 w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center text-white">
                <span className="text-xl">⭐</span>
              </div>
            </div>
          </div>

          {/* Second Column - Content */}
          <div className="lg:col-span-5 space-y-8">
            {/* Top Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-blue-100 text-blue-600 px-6 py-2 rounded-lg text-sm font-bold">
                Learn about us
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 leading-tight">
              Remove Headache of Creating a Resume!
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our intuitive platform simplifies the resume creation process.
              With professional templates and expert guidance, you can create a
              standout resume that captures attention and highlights your unique
              value proposition.
            </p>
            <button className="bg-[#3e94e4] hover:bg-blue-700 text-white px-6 py-3 border-2 border-blue-600 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg">
              LET'S BUILD YOUR CV
            </button>
          </div>

          {/* Third Column - Features */}
          <div className="lg:col-span-3 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <HowItWorks />
    </section>
  );
};

export default AboutUs;
