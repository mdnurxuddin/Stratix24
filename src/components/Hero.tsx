import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "./MagneticButton";
import stratixMockup from "@/assets/stratix-mockup.png";

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const mockup = mockupRef.current;

    if (!heading || !subheading) return;

    // Split text into characters
    const splitHeading = new SplitType(heading, { types: "chars,words" });
    const splitSubheading = new SplitType(subheading, { types: "words" });

    // Create timeline
    const tl = gsap.timeline({ delay: 0.2 });

    // Animate heading characters
    tl.fromTo(
      splitHeading.chars,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.015,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    // Animate subheading
    tl.fromTo(
      splitSubheading.words,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Only animate mockup if it exists and is visible
    if (mockup) {
      tl.fromTo(
        mockup,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Floating animation for mockup
      gsap.to(mockup, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Mouse parallax - only on desktop
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return;

        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(mockup, {
          x: -xPos,
          rotateY: xPos * 0.3,
          rotateX: -yPos * 0.2,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        splitHeading.revert();
        splitSubheading.revert();
      };
    }

    return () => {
      splitHeading.revert();
      splitSubheading.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center pt-24 pb-16 overflow-hidden relative"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <div className="overflow-visible">
              <h1
                ref={headingRef}
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight [&_.char]:inline-block [&_.char]:will-change-transform"
              >
                Your Partner in <span className="text-[#d244cd]">Digital</span>{" "}
                Transformation
              </h1>
            </div>

            <div className="overflow-hidden">
              <p
                ref={subheadingRef}
                className="text-lg md:text-xl text-muted-foreground max-w-lg"
              >
                We craft exceptional digital experiences that elevate brands and
                drive meaningful connections with your audience.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton>
                <button
                  onClick={() => {
                    // 'works' holo apnar FeaturedWorks section-er ID
                    const target = document.getElementById("works");
                    if (target) {
                      // Lenis ba Smooth Scroll-er sathe mil rekhe niche scroll hobe
                      const targetPosition =
                        target.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({
                        top: targetPosition - 80, // Navbar-er jonno ektu jayga rakha hoyeche
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="group px-8 py-4 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all duration-300 flex items-center gap-2"
                >
                  View Our Work
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://www.facebook.com/stratix24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="px-8 py-4 border border-border text-foreground rounded-full text-sm font-medium hover:bg-secondary transition-all duration-300">
                    Get in Touch
                  </button>
                </a>
              </MagneticButton>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              {[
                { value: "50+", label: "Projects" },
                { value: "80+", label: "Clients" },
                { value: "3+", label: "Years" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-display text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Mockup - visible on all screens */}
          <div
            ref={mockupRef}
            className="relative perspective-1000 flex justify-center items-center order-first lg:order-last"
          >
            <div className="relative preserve-3d">
              <img
                src={stratixMockup}
                alt="Stratix Dashboard"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg drop-shadow-2xl"
              />
              {/* Glow behind mockup */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 md:w-80 h-60 md:h-80 bg-primary/30 rounded-full blur-[80px] -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
