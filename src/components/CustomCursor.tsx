import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    // GSAP quickSetter for performance
    const xDot = gsap.quickSetter(dot, "x", "px");
    const yDot = gsap.quickSetter(dot, "y", "px");
    const xCircle = gsap.quickSetter(circle, "x", "px");
    const yCircle = gsap.quickSetter(circle, "y", "px");

    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xDot(mouseX);
      yDot(mouseY);
    };

    // Spring physics for circle
    const animate = () => {
      const dx = mouseX - circleX;
      const dy = mouseY - circleY;

      circleX += dx * 0.15;
      circleY += dy * 0.15;

      xCircle(circleX);
      yCircle(circleY);

      requestAnimationFrame(animate);
    };

    // Handle hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, .magnetic, .hover-target")) {
        setIsHovering(true);
        gsap.to(circle, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
          borderColor: "hsl(302, 63%, 55%)",
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      gsap.to(circle, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        borderColor: "hsl(0, 0%, 95%)",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-10 h-10 border border-foreground rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
