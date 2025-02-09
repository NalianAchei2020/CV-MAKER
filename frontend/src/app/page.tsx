import AboutUs from '@/components/home/about_us';
import FeatureSection from '@/components/home/features';
import HeroSection from '@/components/home/her0Section';

import FeaturesGrid from '@/components/home/mainFeatures';
import PricingSection from '@/components/home/pricing';
import TemplateSection from '@/components/home/templateSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeatureSection />
      <AboutUs />
      <TemplateSection />
      <PricingSection />
      <FeaturesGrid />
    </main>
  );
}
