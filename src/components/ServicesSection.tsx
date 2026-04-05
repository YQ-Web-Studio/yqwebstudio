"use client";

import { motion, useInView } from "framer-motion";
import { Code, Shield } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { InteractiveGlassCard } from "@/components/InteractiveGlassCard";

const services = [
  {
    icon: Code,
    title: "Bespoke Web Design",
    features: [
      "Custom functionality & integrations",
      "Next.js-powered frontends",
      "Fully responsive design",
      "SEO optimisation & performance",
      "CMS integration",
    ],
    price: "Custom Quote",
    highlight: false,
  },
  {
    icon: Shield,
    title: "The Website Care Plan",
    features: [
      "Premium managed hosting",
      "SSL certificate & security",
      "Monthly content updates",
      "Performance monitoring",
      "Priority support",
    ],
    price: "from £10 / month",
    highlight: true,
  },
];

const TelemetryTypewriter = ({ text, skipAnimation = false, isActive = false }: { text: string; skipAnimation?: boolean; isActive?: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  useEffect(() => {
    if (skipAnimation) {
      setDisplayedText(text);
      return;
    }
    
    if (!isActive) {
      setDisplayedText("");
      return;
    }

    if (!isInView) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, text, skipAnimation, isActive]);

  return (
    <div ref={ref} className="mt-2 min-h-[5rem]">
      <div className="text-[10px] font-mono text-primary mb-3 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live Feed
      </div>
      <p className="text-sm text-muted-foreground font-mono leading-relaxed">
        {displayedText}
        {isActive && !skipAnimation && displayedText.length < text.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1.5 h-3.5 ml-1 bg-primary align-middle"
          />
        )}
      </p>
    </div>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  return (
    <InteractiveGlassCard delay={index * 0.1} className="p-8 flex flex-col justify-between">
      <div className="flex flex-col h-full">
        <service.icon className="w-8 h-8 text-primary mb-6" />
        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">{service.title}</h3>
        <div className="flex-grow">
          <TelemetryTypewriter text={service.features.join(" // ")} isActive={true} />
        </div>
        <p className="mt-8 text-lg font-semibold text-foreground border-t border-border/50 pt-6">
          {service.price}
        </p>
      </div>
    </InteractiveGlassCard>
  );
};

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedServices, setTypedServices] = useState<Set<string>>(new Set());

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (Math.abs(info.offset.x) > 60) {
      setTypedServices((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(services[currentIndex].title);
        return newSet;
      });
      
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          01 // Services &amp; Plans
        </p>
        <div className="overflow-hidden mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 heading-glow"
          >
            Built for Growth.
          </motion.h2>
        </div>

        <div className="w-full">
          {/* ── Desktop Grid (md+) ── */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* ── Mobile Swipeable Stack (< md) ── */}
          <div className="relative md:hidden mx-auto max-w-[calc(100vw-80px)] my-4" style={{ height: 500 }}>
            <p className="absolute -top-10 left-0 right-0 text-center text-xs text-zinc-400 font-mono uppercase tracking-widest select-none pointer-events-none mb-12">
              swipe to explore →
            </p>
            {services.map((service, i) => {
              let relIndex = i - currentIndex;
              if (relIndex < 0) relIndex += services.length;
              
              const isFront = relIndex === 0;
              const hasBeenTyped = typedServices.has(service.title);
              
              return (
                <motion.div
                  key={service.title}
                  className="absolute inset-x-0 w-full h-full"
                  style={{
                    zIndex: services.length - relIndex,
                  }}
                  animate={{
                    x: 0,
                    scale: 1 - relIndex * 0.05,
                    y: relIndex * 20, 
                    opacity: isFront ? 1 : 0.6,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                  }}
                  drag={isFront ? "x" : false}
                  dragSnapToOrigin={true} 
                  dragMomentum={false} 
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  whileDrag={{ scale: 1.05 }}
                  whileTap={{ cursor: "grabbing" }}
                  onDragEnd={isFront ? handleDragEnd : undefined}
                >
                  <InteractiveGlassCard 
                    disableTilt={true} 
                    className="flex flex-col justify-between h-full bg-zinc-950/90 backdrop-blur-2xl cursor-grab active:cursor-grabbing select-none shadow-2xl"
                  >
                    <div className="p-8 flex flex-col h-full">
                      <service.icon className="w-8 h-8 text-primary mb-6" />
                      <h3 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                        {service.title}
                      </h3>
                      <div className="flex-grow">
                        <TelemetryTypewriter 
                          text={service.features.join(" // ")} 
                          isActive={isFront}
                          skipAnimation={hasBeenTyped}
                        />
                      </div>
                      <p className="mt-8 text-lg font-semibold text-foreground border-t border-border/50 pt-6">
                        {service.price}
                      </p>
                    </div>
                  </InteractiveGlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* ── Mobile Stack Pagination Indicators ── */}
          <div className="flex md:hidden justify-center items-center gap-2 mt-12">
            {services.map((service, index) => {
              const isActive = index === currentIndex;
              return (
                <motion.div
                  key={`indicator-${service.title}`}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-purple-500" : "bg-zinc-700"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;