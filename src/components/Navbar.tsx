import { useState, useEffect } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="nav-item">
          <MagneticButton>
            {/* Text shoriye image boshanu holo */}
            <img
              src="/stratix.png"
              alt="Stratix Logo"
              className="h-8 w-auto object-contain" // Height customize korte paren (e.g., h-10)
            />
          </MagneticButton>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {["Works", "Services", "Team", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-item nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <MagneticButton>{item}</MagneticButton>
            </a>
          ))}
        </div>

        <div className="nav-item">
          <MagneticButton>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Let's Talk
            </button>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
