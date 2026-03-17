"use client";

import Image from "next/image";
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { SiReact, SiFirebase, SiGooglemaps } from "react-icons/si";
import { Layers } from "lucide-react";

const features = [
  "Community-Verified Data & Trust System",
  "Privacy-First Architecture",
  "Offline-Ready Architecture (Coming Soon)",
];

const TelemetryTypewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
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
  }, [isInView, text]);

  return (
    <div ref={ref} className="min-h-[5rem]">
      <div className="text-[10px] font-mono text-primary mb-3 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live Feed
      </div>
      <p className="text-sm text-muted-foreground font-mono leading-relaxed">
        {displayedText}
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-3.5 ml-1 bg-primary align-middle"
        />
      </p>
    </div>
  );
};

const LabsSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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
    <section id="in-development" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          04 // Current Engineering
        </p>
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 heading-glow"
          >
            In Development.
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-4 mb-12"
        >
          A look behind the scenes at the platforms and applications I am currently building.
        </motion.p>
      </div>

      <div className="w-full max-w-6xl mx-auto md:px-6">
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
                style={{ transformStyle: "preserve-3d" }}
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
                  className="w-full h-full rounded-[2.5rem] overflow-hidden relative border border-zinc-900/50 pt-8 pb-6 bg-black"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    initial={{ filter: 'brightness(0) blur(10px)', scale: 1.05 }}
                    whileInView={{ filter: 'brightness(1) blur(0px)', scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/mosquemap-screenshot.png"
                      alt="MosqueMap App Screenshot"
                      fill
                      className="object-cover object-top"
                      sizes="220px"
                    />
                  </motion.div>
                  
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
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                MosqueMap Mobile App
              </h3>
              <TelemetryTypewriter 
                text="A real-time, community-verified platform functioning like Waze for the Muslim community. Instantly locate nearby mosques, verify prayer times, and find halal food." 
              />

              <div className="glass rounded-[2rem] p-6 space-y-3 mt-8">
                {features.map((f) => (
                  <div
                    key={f}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">✦</span>
                    {f}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <SiReact className="w-3.5 h-3.5 shrink-0" style={{ color: "#61DAFB" }} /> React Native
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <SiFirebase className="w-3.5 h-3.5 shrink-0" style={{ color: "#FFCA28" }} /> Firebase
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <SiGooglemaps className="w-3.5 h-3.5 shrink-0" style={{ color: "#4285F4" }} /> Google Maps API
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default">
                  <Layers className="w-3.5 h-3.5 shrink-0" style={{ color: "#a78bfa" }} /> State Management
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabsSection;
