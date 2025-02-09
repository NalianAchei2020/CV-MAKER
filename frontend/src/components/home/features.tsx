import { FileEdit, Layers, Zap } from 'lucide-react';

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        {/* Top Badge */}
        <div className="flex justify-center mb-8">
          <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium">
            Try Our Creative Tool
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
            On-The-Fly Creative Resume And CV <br />
            Builder <span className="inline-block animate-bounce">✍️</span>{' '}
            Across Your Favorite Tools
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="group">
            <div className="mb-6 inline-block">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                <FileEdit className="w-8 h-8 text-violet-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-navy-900">
              Produces high-quality Resume content.
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI-powered system generates professional and tailored content
              that highlights your skills and experiences effectively.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group">
            <div className="mb-6 inline-block">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-navy-900">
              Offers Helpful Suggestions.
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Get smart recommendations for skills, achievements, and keywords
              that make your resume stand out to employers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group">
            <div className="mb-6 inline-block">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-navy-900">
              Increased Resumes Productivity
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Create and update your resume in minutes, not hours, with our
              streamlined and intuitive builder interface.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
