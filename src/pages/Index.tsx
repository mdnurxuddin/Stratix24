import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MarqueeSlider from '@/components/MarqueeSlider';
import WhyStratix from '@/components/WhyStratix';
import FeaturedWorks from '@/components/FeaturedWorks';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Team from '@/components/Team';
import Footer from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    ScrollTrigger.refresh();
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeSlider />
        <WhyStratix />
        <FeaturedWorks />
        <Services />
        <Testimonials />
        <Team />
        <Footer />
      </main>
    </SmoothScroll>
  );
};

export default Index;
