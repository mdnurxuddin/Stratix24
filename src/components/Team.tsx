import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    id: 1,
    name: "Md Nur Uddin",
    role: "Founder & CEO",
    image: "/public/linkedin.jpg",
    bio: "Mern Stack Developer And Visionary Leader",
  },
  {
    id: 2,
    name: "Minhaz Alom",
    role: "Co-Founder & CTO",
    image: "/public/minhazalom.jpg",
    bio: "Full Stack Developer And Tech Strategist",
  },
];

const teamMembers = [
  {
    id: 3,
    name: "",
    role: "",
    image: "",
  },
  {
    id: 4,
    name: "",
    role: "",
    image: "",
  },
];

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        ".team-title-word",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate founder cards
      gsap.fromTo(
        ".founder-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".founders-section",
            start: "top 75%",
          },
        }
      );

      // Animate team grid
      gsap.fromTo(
        ".team-member",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            The People Behind Stratix
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold overflow-hidden">
            <span className="team-title-word inline-block">Meet</span>{" "}
            <span className="team-title-word inline-block">the</span>{" "}
            <span className="team-title-word inline-block text-gradient">
              Experts
            </span>
          </h2>
        </div>

        {/* Founders - Large Cards */}
        <div className="founders-section grid md:grid-cols-2 gap-8 mb-20">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="founder-card group relative bg-gradient-to-br from-secondary/50 to-card border border-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Large round image */}
                <div className="relative">
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-border group-hover:ring-primary/50 transition-all duration-500">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  {/* Status indicator */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-primary rounded-full border-4 border-card animate-pulse" />
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                    {founder.role.includes("Co-Founder")
                      ? "Co-Founder"
                      : "Founder"}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {founder.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{founder.bio}</p>
                  <div className="flex justify-center md:justify-start gap-3">
                    <MagneticButton>
                      <a
                        href="https://www.linkedin.com/in/mdnuruddin04/"
                        className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary-foreground transition-all duration-300"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </MagneticButton>
                    <MagneticButton>
                      <a
                        href="https://www.linkedin.com/in/minhaz-alom-a5b581286/"
                        className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center text-muted-foreground hover:text-primary-foreground transition-all duration-300"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    </MagneticButton>
                  </div>
                </div>
              </div>

              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Team label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Our Creative Team
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Team Members - Grid of circles */}
        <div className="team-grid grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="team-member group text-center hover-target"
            >
              {/* Circular image with ring */}
              <div className="relative mx-auto mb-5">
                <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden ring-2 ring-border ring-offset-4 ring-offset-background group-hover:ring-primary group-hover:ring-offset-primary/20 transition-all duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-500 -z-10 blur-xl" />
              </div>

              {/* Info */}
              <h4 className="font-display text-lg font-bold group-hover:text-primary transition-colors duration-300">
                {member.name}
              </h4>
              <p className="text-muted-foreground text-sm mt-1">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Join us CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-secondary/50 border border-border rounded-full">
            <span className="text-muted-foreground">
              Want to join our team?
            </span>
            <MagneticButton>
              <a
                href="#contact"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View Careers
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
