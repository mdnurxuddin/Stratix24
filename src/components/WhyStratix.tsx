import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: "01",
    title: "Innovation First",
    description:
      "We push boundaries with cutting-edge technologies and creative solutions that set you apart from the competition.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Result Driven",
    description:
      "Every pixel, every line of code is crafted with your business goals in mind. We measure success by your success.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Partnership",
    description:
      "We don't just build products — we build relationships. Your vision becomes our mission from day one.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "24/7 Support",
    description:
      "Round-the-clock assistance ensures your digital presence never sleeps. We're here whenever you need us.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
];

const WhyStratix = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      if (titleRef.current) {
        gsap.from(titleRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Cards Animation (Fixed rotateX conflict)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 relative overflow-hidden touch-pan-y"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase">
            Why Choose Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Why <span className="text-[#d244cd]">Stratix</span> ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We combine creativity, technology, and strategy to deliver
            exceptional digital experiences that drive real business results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-secondary/50 to-secondary/20 border border-border/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 select-none touch-pan-y"
            >
              {/* Simplified Hover Effects to prevent scroll hijack */}
              <div className="absolute inset-0 rounded-3xl bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 -z-10" />

              <div className="relative z-10 space-y-6 pointer-events-none">
                <span className="feature-number font-display text-5xl font-bold text-muted-foreground/30 transition-colors duration-300 group-hover:text-primary/40">
                  {feature.number}
                </span>

                <div className="icon-wrapper w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                  {feature.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg
                    className="w-4 h-4"
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
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-secondary/50 border border-border/50">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
                >
                  {i * 25}+
                </div>
              ))}
            </div>
            <span className="text-foreground font-medium">
              Trusted by <span className="text-primary">100+</span> businesses
              worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyStratix;
