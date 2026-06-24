"use client";

import Image from "next/image";
import { motion, useInView, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { SiReact, SiFirebase, SiGooglemaps, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { Layers, Github, Globe } from "lucide-react";

const features = [
  {
    title: "Real-time crowdsourcing",
    description: "A custom voting system that lets the community verify and update map locations so the data never goes stale."
  },
  {
    title: "Native AI search",
    description: "A built-in chat assistant that pings the live web to instantly fill in any missing database gaps for the user."
  },
  {
    title: "Hardware-level precision",
    description: "Direct integration with the phone's magnetometer for an offline, highly accurate compass."
  }
];

const TelemetryTypewriter = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasTyped = useRef(false);

  useEffect(() => {
    if (!isInView || hasTyped.current) return;
    hasTyped.current = true;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, text, onComplete]);

  return (
    <div ref={ref} className="min-h-[5rem] flex flex-col">
      <div className="text-[10px] font-mono text-primary mb-3 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live Feed
      </div>
      <div className="relative flex-grow">
        {/* Invisible placeholder to reserve layout height/wrap */}
        <p className="text-sm font-mono leading-relaxed opacity-0 pointer-events-none select-none">
          {text}
        </p>
        {/* Absolute overlay for the actual typing animation */}
        <p className="absolute inset-0 text-sm text-muted-foreground font-mono leading-relaxed">
          {displayedText}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1.5 h-3.5 ml-1 bg-primary align-middle"
          />
        </p>
      </div>
    </div>
  );
};

const MagneticLinkButton = ({ children, href, className }: { children: React.ReactNode; href: string; className: string }) => {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
      className={`relative overflow-hidden group font-unbounded ${className}`}
    >
      <span className="absolute inset-0 bg-primary translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rounded-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
};

const screenshots = [
  "/images/muslim-atlas/home-page.png",
  "/images/muslim-atlas/mosque-map.png",
  "/images/muslim-atlas/mosque-info.png",
  "/images/muslim-atlas/food-map.png",
  "/images/muslim-atlas/food-info.png"
];

const LabsSection = () => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreenshotIndex((prev) => (prev + 1) % screenshots.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.1),
      transparent 80%
    )
  `;

  return (
    <section id="in-development" className="pt-16 pb-0 md:py-24 bg-zinc-950 relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.08)_0%,transparent_50%)]">
      {/* Ambient Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none -ml-48 -mt-48 z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none -mr-48 -mb-48 z-0" />

      <div className="container mx-auto max-w-7xl px-6 mb-12 relative z-10">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          04 // Current Engineering
        </p>
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 heading-glow font-syne"
          >
            In Development.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-xs sm:text-base md:text-xl max-w-6xl mt-4 font-sans md:font-unbounded"
        >
          Aside from client projects for YQ Web Studio, here is a look behind the scenes at other software applications I am currently engineering.
        </motion.p>
      </div>

      <div className="w-full max-w-7xl mx-auto md:px-6">
        <div className="glass rounded-none border-x-0 md:rounded-[2.5rem] md:border-x p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            {/* Phone mockup */}
            <div className="flex items-center justify-center relative flex-col" style={{ perspective: "1200px" }}>
              
              {/* Virtual Spotlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-[-10%] left-0 right-0 mx-auto w-[800px] h-[400px] opacity-100 z-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at top, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)"
                }}
              />

              <motion.div 
                className="group relative w-[240px] h-[490px] rounded-[3rem] bg-zinc-950 border-[4px] border-zinc-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] p-2 flex flex-col items-center z-10"
                onMouseMove={handleMouseMove}
                animate={{ y: [0, -20, 0], rotateX: [5, -5, 5], rotateY: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              >
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 z-0 rounded-[3rem] overflow-hidden"
                  style={{ background }}
                />
                
                {/* Dynamic Island / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-950 rounded-full z-20 flex items-center justify-between px-2 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {/* Speaker */}
                  <div className="w-8 h-1 rounded-full bg-zinc-900/50 mix-blend-screen" />
                  {/* Camera lens */}
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-800/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-white/5" />
                </div>

                {/* The Screen */}
                <motion.div 
                  initial={{ backgroundColor: "#000000" }}
                  whileInView={{ backgroundColor: "#ffffff" }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="w-full h-full rounded-[2.5rem] overflow-hidden relative border border-zinc-900/50 bg-black"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-[2.2rem]">
                    {screenshots.map((src, index) => (
                      <motion.div
                        key={src}
                        initial={{ opacity: index === 0 ? 1 : 0 }}
                        animate={{ opacity: index === currentScreenshotIndex ? 1 : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute w-full h-[calc(100%+24px)] -top-6 left-0"
                        style={{
                          pointerEvents: index === currentScreenshotIndex ? "auto" : "none",
                          zIndex: index === currentScreenshotIndex ? 10 : 0
                        }}
                      >
                        <Image
                          src={src}
                          alt={`Muslim Atlas App Screenshot ${index + 1}`}
                          fill
                          className="object-cover object-top"
                          sizes="220px"
                          priority={index === 0}
                        />
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Glass Glare Sweep */}
                  <motion.div
                    initial={{ x: "-100%", y: "-100%", rotate: 45, z: 50 }}
                    whileInView={{ x: "150%", y: "150%", rotate: 45, z: 50 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/50 to-transparent w-[200%] h-[200%] -top-1/2 -left-1/2"
                  />
                </motion.div>

                {/* Home Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-zinc-700/60 rounded-full z-20" />
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.4)] border border-zinc-800/30">
                  <Image
                    src="/images/muslim-atlas/logo.png"
                    alt="Muslim Atlas Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground font-unbounded">
                    Muslim Atlas
                  </h3>
                  <p className="text-[10px] font-mono text-primary uppercase tracking-widest mt-1">Mobile App</p>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-muted-foreground font-mono leading-relaxed"
              >
                A premium, comprehensive lifestyle app designed for the Muslim community. Beyond core essentials like a full digital Quran and dynamic prayer tracking, the app features a community-driven map to instantly locate mosques and find verified halal food. Learn more and download the app at muslimatlas.app.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <SiReact className="w-3.5 h-3.5 shrink-0" style={{ color: "#61DAFB" }} /> React Native
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <SiNextdotjs className="w-3.5 h-3.5 shrink-0" style={{ color: "#ffffff" }} /> Next.js
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <SiTailwindcss className="w-3.5 h-3.5 shrink-0" style={{ color: "#06B6D4" }} /> Tailwind CSS
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <SiFirebase className="w-3.5 h-3.5 shrink-0" style={{ color: "#FFCA28" }} /> Firebase
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <SiGooglemaps className="w-3.5 h-3.5 shrink-0" style={{ color: "#4285F4" }} /> Google Maps API
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex justify-start">
                  <MagneticLinkButton
                    href="https://www.muslimatlas.app/"
                    className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-6 py-3 rounded-[2rem] transition-colors"
                  >
                    <Globe size={16} className="group-hover:rotate-12 transition-transform" />
                    <span>Visit Website</span>
                  </MagneticLinkButton>
                </div>

                <span className="text-xs text-muted-foreground/60 font-mono italic">
                  ✦ website designed & built by YQ Web Studio 😉
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
