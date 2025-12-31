const MarqueeSlider = () => {
  const items = [
    'Branding',
    'Web Design',
    'Development',
    'UI/UX',
    'Strategy',
    'Marketing',
    'Motion',
    'Identity',
  ];

  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="relative">
        <div className="slider-track flex">
          {/* Duplicate items for seamless loop */}
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center gap-8 px-8"
            >
              <span className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-outline whitespace-nowrap">
                {item}
              </span>
              <span className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSlider;
