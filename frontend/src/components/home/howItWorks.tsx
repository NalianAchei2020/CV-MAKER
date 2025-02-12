'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, MessageSquare, LayoutPanelTop, FileText } from 'lucide-react';

const steps = [
  {
    number: '#1',
    title: 'Create your Account',
    icon: Box,
  },
  {
    number: '#2',
    title: 'Choose Your Resume',
    icon: MessageSquare,
  },
  {
    number: '#3',
    title: 'Add Your Information',
    icon: LayoutPanelTop,
  },
  {
    number: '#4',
    title: 'Download Your Resume',
    icon: FileText,
  },
];

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: {
      opacity: 1,
      width: '100%',
      transition: { duration: 0.8, ease: 'easeInOut', delay: 0.3 },
    },
  };

  return (
    <section className="py-20  relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <span className="bg-blue-200 text-blue-600 px-6 py-2 rounded-lg text-sm font-bold">
            How it Works
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-16"
        >
          Easy Steps To Build Your Resume
        </motion.h2>

        {/* Steps */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
        >
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Icon Background */}
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center relative z-10"
                  >
                    <step.icon className="w-10 h-10 text-blue-600" />
                  </motion.div>
                  <div className="absolute inset-0 bg-blue-100/30 rounded-2xl transform rotate-6" />
                </div>

                {/* Step Number */}
                <motion.p
                  variants={itemVariants}
                  className="text-blue-600 font-medium"
                >
                  Step Num {step.number}
                </motion.p>

                {/* Step Title */}
                <motion.h3
                  variants={itemVariants}
                  className="text-xl font-semibold text-gray-900"
                >
                  {step.title}
                </motion.h3>
              </motion.div>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <motion.div
                  variants={arrowVariants}
                  className="hidden md:block absolute top-10 left-[calc(100%_-_1rem)] w-full h-[2px] bg-blue-200"
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 border-t-2 border-r-2 border-blue-200 rotate-45" />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
