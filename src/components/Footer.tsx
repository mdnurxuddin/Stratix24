import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    // Animate each letter with fill effect
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-letter",
        {
          backgroundSize: "0% 100%",
        },
        {
          backgroundSize: "100% 100%",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: textElement,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    // Scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const letters = "LET'S CREATE".split("");

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Main CTA */}
        <div className="text-center mb-24">
          <MagneticButton>
            <h2
              ref={textRef}
              className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold inline-block"
            >
              {letters.map((letter, index) => (
                <span
                  key={index}
                  className="footer-letter inline-block"
                  style={{
                    background:
                      letter === " "
                        ? "transparent"
                        : "linear-gradient(90deg, hsl(302, 63%, 55%) 0%, hsl(260, 70%, 60%) 100%)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "0% 100%",
                    WebkitBackgroundClip: letter === " " ? "unset" : "text",
                    WebkitTextFillColor:
                      letter === " " ? "transparent" : "transparent",
                    WebkitTextStroke:
                      letter === " "
                        ? "none"
                        : "2px hsl(var(--muted-foreground) / 0.4)",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h2>
          </MagneticButton>

          <p className="mt-8 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Ready to transform your digital presence? Let's collaborate and
            create something extraordinary together.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <a
                href="https://www.facebook.com/stratix24"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
              >
                Start a Project
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="https://www.facebook.com/stratix24"
                className="inline-flex items-center gap-3 px-10 py-5 border border-border text-foreground rounded-full text-lg font-medium hover:bg-secondary transition-all duration-300"
              >
                Schedule a Call
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Footer links */}
        <div className="border-t border-border pt-12">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <MagneticButton>
                {/* Text shoriye image boshanu holo */}
                <img
                  src="/stratix.png"
                  alt="Stratix Logo"
                  className="h-8 w-auto object-contain" // Height customize korte paren (e.g., h-10)
                />
              </MagneticButton>
              <p className="mt-4 text-muted-foreground text-sm">
                Your Partner in Digital Transformation
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-display font-bold mb-4">Navigation</h4>
              <ul className="space-y-3">
                {["Works", "Services", "Team", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display font-bold mb-4">Services</h4>
              <ul className="space-y-3">
                {[
                  "Web Development",
                  "UI/UX Design",
                  "Graphics Design",
                  "Product Design",
                  "Social Media Management",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#services"
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  stratix24@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +8801830170084
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Mirpur, Dhaka, Bangladesh
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
  {[
    { id: "linkedin", url: "https://www.linkedin.com/company/stratix24/" },
    { id: "instagram", url: "https://www.instagram.com/stra_tix/" }, // Apnar link ti ekhane boshann
  ].map((social) => (
    <MagneticButton key={social.id}>
      <a
        href={social.url}
        target="_blank"             // Notun tab-e open hobar jonno
        rel="noopener noreferrer"   // Security-r jonno
        className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary-foreground hover:bg-primary hover:border-primary transition-all duration-300"
      >
        <SocialIcon platform={social.id} />
      </a>
    </MagneticButton>
  ))}
</div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Stratix. All rights reserved.
            </p>

            {/* Back to top */}
            <MagneticButton>
              <button
                onClick={scrollToTop}
                className="relative w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                <svg
                  className="absolute inset-0 w-14 h-14 -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                  />
                  <circle
                    ref={progressRef}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(302, 63%, 55%)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 283,
                      strokeDashoffset: 283 - 283 * scrollProgress,
                      transition: "stroke-dashoffset 0.1s linear",
                    }}
                  />
                </svg>
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, JSX.Element> = {
    twitter: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    instagram: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
    dribbble: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
      </svg>
    ),
  };

  return icons[platform] || null;
};

export default Footer;
