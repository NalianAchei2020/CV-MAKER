import React from 'react';
import { Check } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'ONE-TIME',
      description: 'Perfect to get started',
      price: '200 FCFA',
      period: '/CV',
      features: [
        'Generate 500 AI Words',
        'Multiple languages supported',
        'Writing settings control',
        '24/7 Support Service',
      ],
      highlighted: false,
      color: 'blue-600',
    },
    {
      name: 'MONTHLY',
      description: 'Best for professionals and bloggers',
      price: '2000 FCFA',
      period: '/Monthly',
      features: [
        'Generate 500 AI Words',
        'Multiple languages supported',
        'Writing settings control',
        '24/7 Support Service',
      ],
      highlighted: true,
      color: 'white',
    },
    {
      name: 'YEARLY',
      description: 'Perfect For large enterprises',
      price: '15000 FCFA',
      period: '/Monthly',
      features: [
        'Generate 500 AI Words',
        'Multiple languages supported',
        'Writing settings control',
        '24/7 Support Service',
      ],
      highlighted: false,
      color: 'blue-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Badge */}
      <div className="flex justify-center mb-8">
        <div className="bg-blue-100 text-blue-600 px-6 py-2 rounded-lg text-sm font-bold">
          Our Pricing Plans
        </div>
      </div>
      {/* Section Header */}
      <div className="text-center mb-4 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-900 mb-16">
          Ready to Start? Don't Worry, We'll Keep <br />
          You at Comfortable Budget
        </h2>
        <span className="text-gray-400">
          Get started with a 7-day trial, Cancel anytime.
        </span>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl overflow-hidden ${
                plan.highlighted ? 'bg-blue-900 text-white' : 'bg-white'
              } shadow-lg transition-all duration-300 hover:shadow-xl`}
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Header */}
                <h3 className={`text-xl font-semibold mb-2 text-${plan.color}`}>
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.highlighted ? 'text-gray-300' : 'text-gray-500'
                  } mb-8`}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline mb-8">
                  <span
                    className={`text-2xl md:text-4xl font-bold text-${plan.color}`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      plan.highlighted ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 text-${plan.color}`} />
                      <span
                        className={
                          plan.highlighted ? 'text-gray-300' : 'text-gray-600'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button
                  className={`w-full py-4 rounded-xl font-medium transition-all duration-200 ${
                    plan.highlighted
                      ? 'bg-white text-blue-900 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  SUBSCRIBE
                </button>
              </div>

              {/* Background Pattern for Standard Plan */}
              {plan.highlighted && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0">
                    <svg
                      className="absolute w-full h-full opacity-10"
                      viewBox="0 0 400 400"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="pattern"
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M0 40L40 0M-10 10L10 -10M30 50L50 30"
                            stroke="white"
                            strokeWidth="1"
                            fill="none"
                          />
                        </pattern>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="url(#pattern)"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
