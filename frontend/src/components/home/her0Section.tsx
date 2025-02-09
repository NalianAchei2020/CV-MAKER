import { DollarSign, BarChart3, Users } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-[#beedf2]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-12 md:pb-24 md:pt-12 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {/* Top Banner */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <DollarSign className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-500 font-medium">
                Discover The Easiest ways to Build Your CV!
              </span>
            </div>

            {/* Main Content */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight">
              Create Your Winning Resume in Minutes.
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Our Perfect resume builder takes the hassle out of resume writing.
              Choose from several templates and follow easy prompts to create
              the perfect job-ready resume.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#3e94e4] hover:bg-blue-700 text-white px-6 py-3 border-2 border-blue-600 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg">
                CHOOSE TEMPLATE
              </button>
              <button className="bg-[#3e94e4] hover:bg-blue-700 text-white px-6 py-3 border-2 border-blue-600 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg">
                CONTACT US
              </button>
            </div>
          </div>

          {/* Right Side Images */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
                alt="Professional man"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="flex items-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                  alt="Client"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <div className="text-2xl font-bold">6.2K</div>
                  <div className="text-sm text-gray-500">Satisfied Clients</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 -left-12 bg-white rounded-lg shadow-lg p-4 z-20">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Brands Worldwide</div>
                  <div className="flex gap-2 mt-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full filter blur-3xl opacity-30"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Intuitive interface that guides you through every step
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Professional Templates
            </h3>
            <p className="text-gray-600">
              Choose from our collection of ATS-friendly templates
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
            <p className="text-gray-600">
              Get your resume in PDF format instantly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
