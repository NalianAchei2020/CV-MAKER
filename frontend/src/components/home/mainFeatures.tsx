import React from 'react';
import Link from 'next/link';
import { Box, MessageCircle, Smartphone, Cuboid as Cube } from 'lucide-react';

const features = [
  {
    icon: Cube,
    title: 'Proven CV Templates to Increase Hiring Chance',
    description:
      'Our templates are designed based on industry standards to help you stand out and get noticed by recruiters.',
    link: '/cv-templates', // Add a link for navigation
  },
  {
    icon: Box,
    title: 'Creative, Modern and Clean Templates Design',
    description:
      'Choose from a variety of visually appealing designs that showcase your professionalism and creativity.',
    link: '/designs', // Add a link for navigation
  },
  {
    icon: MessageCircle,
    title: 'Easy and Intuitive Online CV and Resume Builder',
    description:
      'Fill out your information in our simple form to create a polished resume in minutes.',
    link: '/resume-builder', // Add a link for navigation
  },
  {
    icon: Smartphone,
    title: 'Free to use. Developed by hiring professionals.',
    description:
      'Our platform is completely free and has been crafted by experts in recruitment to ensure your success.',
    link: '/about', // Add a link for navigation
  },
];

const FeaturesGrid = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-[#9ac6f7] to-white relative overflow-hidden rounded-t-[2rem]">
      {/* Top Badge */}
      <div className="flex justify-center mb-8">
        <div className="bg-blue-100 text-blue-600 px-6 py-2 rounded-lg text-sm font-bold">
          Our Main Features
        </div>
      </div>
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-900 mb-16">
          Create Your Awesome Resumes <br className=" sm:hidden" />
          and Enjoy Our Key Features
        </h2>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 mb-6 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>

              {/* View More Link */}
              <Link href={feature.link}>
                <span className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 cursor-pointer">
                  View More Details
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Link>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-50/0 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;
