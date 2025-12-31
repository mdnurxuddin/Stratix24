import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Nova Finance',
    category: 'Branding & Web Design',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Pulse Health',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Echo Studio',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Vertex Labs',
    category: 'Digital Product',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
  },
];

const FeaturedWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const projects = projectRefs.current.filter(Boolean);

    projects.forEach((project, index) => {
      // Clip-path reveal animation
      gsap.fromTo(
        project,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Title animation
      const title = project?.querySelector('.project-title');
      const category = project?.querySelector('.project-category');
      
      gsap.fromTo(
        [title, category],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="works" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
              Featured Works
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Selected <span className="text-outline">Projects</span>
            </h2>
          </div>
          <MagneticButton>
            <a 
              href="#" 
              className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              View All Works
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="group relative hover-target"
            >
              <div className="hover-scale-container relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="mt-6 flex items-start justify-between">
                <div>
                  <MagneticButton>
                    <h3 className="project-title font-display text-2xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </MagneticButton>
                  <p className="project-category text-muted-foreground mt-1">
                    {project.category}
                  </p>
                </div>
                <MagneticButton>
                  <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <svg 
                      className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
