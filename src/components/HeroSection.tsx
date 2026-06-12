"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { HeroButtons } from "./HeroInteractions";

const HeroDecorations = dynamic(() => import("./HeroInteractions").then((mod) => mod.HeroDecorations), { ssr: false });

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[100svh] md:min-h-screen items-center justify-center pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden">
      <HeroDecorations />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full pointer-events-none pt-12 md:pt-20">
        <motion.span
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-zinc-400 mb-4 sm:mb-6 pointer-events-auto font-syne"
        >
          Welcome to
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] text-zinc-50 pointer-events-auto select-none"
        >
          <motion.span
            className="inline-block cursor-default"
            whileHover={{
              scale: 1.05,
              y: -5,
              textShadow: "0 0 25px rgba(255,255,255,0.4)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            YQ
          </motion.span>{" "}
          <motion.span
            className="inline-block font-serif italic font-normal text-gradient cursor-default"
            whileHover={{
              scale: 1.05,
              y: -5,
              rotate: -1.5,
              filter: "brightness(1.1) drop-shadow(0 0 20px rgba(147,51,234,0.45))"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Web
          </motion.span>{" "}
          <motion.span
            className="inline-block font-serif italic font-normal text-gradient cursor-default"
            whileHover={{
              scale: 1.05,
              y: -5,
              rotate: 1.5,
              filter: "brightness(1.1) drop-shadow(0 0 20px rgba(236,72,153,0.45))"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Studio
          </motion.span>
        </motion.h1>

        <div className="overflow-hidden mt-6">
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto pointer-events-auto font-syne"
          >
            Premium Web Solutions Designed For Business Growth.
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
