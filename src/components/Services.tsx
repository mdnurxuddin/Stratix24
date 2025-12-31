import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const services = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Turning complex ideas into robust, responsive, and lightning-fast web solutions tailored to meet your unique brand goals.",
    image: "/public/web.jpg",
  },
  {
    id: 2,
    title: "UI/UX",
    description:
      "Blending psychology with design to craft purposeful user experiences that simplify complex tasks and elevate the way people interact with your brand.",
    image: "/public/uiuxx.jpg",
  },
  {
    id: 3,
    title: "Commercial Design",
    description:
      "Transforming abstract concepts into stunning visual assets that enhance your brand's professional image across all digital and print platforms.",
    image: "/public/design.jpg",
  },
  {
    id: 4,
    title: "Digital Marketing",
    description:
      "Strategic campaigns that amplify your reach and drive measurable results.",
    image: "/public/digi.jpg",
  },
  {
    id: 5,
    title: "Social Media Management",
    description:
      "Growing your digital footprint through strategic content planning, community engagement, and data-driven insights that build a loyal and active following for your brand.",
    image: "/public/why.jpg",
  },
];

const Services = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const imageFollowerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const imageFollower = imageFollowerRef.current;
    if (!imageFollower) return;

    const xSet = gsap.quickSetter(imageFollower, "x", "px");
    const ySet = gsap.quickSetter(imageFollower, "y", "px");

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      targetX = e.clientX - rect.left - 150;
      targetY = e.clientY - rect.top - 100;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      xSet(currentX);
      ySet(currentY);

      requestAnimationFrame(animate);
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove);
    }

    animate();

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Image follower */}
      <div
        ref={imageFollowerRef}
        className={`image-follower w-[300px] h-[200px] rounded-xl overflow-hidden ${
          activeService !== null ? "visible" : ""
        }`}
        style={{
          position: "absolute",
          pointerEvents: "none",
        }}
      >
        {activeService !== null && (
          <img
            src={services[activeService].image}
            alt={services[activeService].title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            Our <span className="text-outline">Services</span>
          </h2>
        </div>

        {/* Services list */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-item group py-8 md:py-12 px-4 -mx-4"
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-8">
                  <span className="text-muted-foreground text-sm font-mono">
                    0{index + 1}
                  </span>
                  <h3 className="service-title font-display text-3xl md:text-4xl lg:text-5xl font-bold">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-md md:text-right">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
