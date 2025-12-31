import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Stratix transformed our digital presence completely. Their attention to detail and innovative approach exceeded all our expectations.",
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechVenture",
    logo: "TV",
  },
  {
    quote:
      "Working with Stratix was a game-changer for our brand. They delivered results that truly moved the needle for our business.",
    name: "Michael Chen",
    position: "Marketing Director",
    company: "Innovate Labs",
    logo: "IL",
  },
  {
    quote:
      "The team at Stratix brings creativity and technical excellence together seamlessly. Highly recommend their services.",
    name: "Emily Rodriguez",
    position: "Founder",
    company: "GrowthFirst",
    logo: "GF",
  },
  {
    quote:
      "Exceptional work from start to finish. Stratix understood our vision and brought it to life beautifully.",
    name: "David Park",
    position: "CTO",
    company: "NextGen Solutions",
    logo: "NG",
  },
  {
    quote:
      "Professional, creative, and results-driven. Stratix is now our go-to partner for all digital projects.",
    name: "Amanda Foster",
    position: "Brand Manager",
    company: "Elevate Co",
    logo: "EC",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Title Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 2. Optimized Slider Animation using xPercent
  useEffect(() => {
    if (!sliderRef.current) return;

    gsap.to(sliderRef.current, {
      xPercent: -activeIndex * (100 / testimonials.length),
      duration: 0.8,
      ease: "power4.out",
    });
  }, [activeIndex]);

  // 3. Robust Autoplay Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // 4. Interaction Handlers
  const handleManualInteraction = useCallback(
    (index: number | "next" | "prev") => {
      setIsAutoPlaying(false);

      if (index === "next")
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      else if (index === "prev")
        setActiveIndex(
          (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );
      else setActiveIndex(index);

      // Clear existing timeout and restart autoplay after 10s of inactivity
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = setTimeout(
        () => setIsAutoPlaying(true),
        10000
      );
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden bg-background"
    >
      {/* Visual Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16 space-y-4">
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from the businesses we have helped transform and grow.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon Background */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-primary/10 pointer-events-none">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="overflow-hidden rounded-3xl relative z-10">
            <div
              ref={sliderRef}
              className="flex touch-pan-y"
              style={{ width: `${testimonials.length * 100}%` }}
            >
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="px-4"
                  style={{ width: `${100 / testimonials.length}%` }}
                >
                  <div className="bg-gradient-to-br from-secondary/60 to-secondary/30 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-12 min-h-[350px] flex flex-col justify-center shadow-xl">
                    <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-10 text-center italic">
                      "{testimonial.quote}"
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-auto">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-lg shadow-primary/20">
                        {testimonial.logo}
                      </div>
                      <div className="text-center md:text-left">
                        <div className="font-display text-lg font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {testimonial.position} at{" "}
                          <span className="text-primary font-medium">
                            {testimonial.company}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={() => handleManualInteraction("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-16 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => handleManualInteraction("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-16 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualInteraction(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeIndex
                    ? "bg-primary w-8"
                    : "bg-primary/20 w-2 hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Client Logos */}
        <div className="mt-24">
          <p className="text-center text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {testimonials.map((testimonial, i) => (
              <button
                key={i}
                onClick={() => handleManualInteraction(i)}
                className={`group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-primary/10 border-primary/50"
                    : "bg-secondary/20 border-border hover:border-primary/30"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors ${
                    i === activeIndex
                      ? "bg-primary text-white"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  {testimonial.logo}
                </div>
                <span
                  className={`text-sm font-semibold transition-colors ${
                    i === activeIndex
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {testimonial.company}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
