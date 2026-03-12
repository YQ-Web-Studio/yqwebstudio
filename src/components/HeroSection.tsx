"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HeroButtons } from "./HeroInteractions";

const HeroDecorations = dynamic(() => import("./HeroInteractions").then((mod) => mod.HeroDecorations), { ssr: false });

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[100svh] md:min-h-screen items-center justify-center pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden">
      <HeroDecorations />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] text-zinc-50 pointer-events-auto"
        >
          <span className="inline-block">Engineering</span>{" "}
          <span className="inline-block">Premium</span>{" "}
          <span className="inline-block font-serif italic font-normal text-gradient">Web</span>{" "}
          <span className="inline-block font-serif italic font-normal text-gradient">Solutions.</span>
        </motion.h1>
        
        <div className="overflow-hidden mt-6">
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto pointer-events-auto"
          >
            Bespoke web applications designed to drive business growth.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-10 pointer-events-auto"
        >
          <HeroButtons />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
