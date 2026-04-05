"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useContact } from "@/context/ContactContext";

const MagneticButton = ({ children, href, onClick, className }: { children: React.ReactNode, href?: string, onClick?: () => void, className: string }) => {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rectRef = useRef<DOMRect | null>(null);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseEnter = () => {
    if (ref.current) rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!rectRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = rectRef.current;
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // Limit radius
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
      style={{ x: springX, y: springY }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
      <span className="relative z-10 block">{children}</span>
    </motion.button>
  );
};

export const HeroButtons = () => {
  const { openContact } = useContact();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pb-20 pointer-events-auto"
    >
      <MagneticButton
        href="#case-studies"
        className="inline-flex items-center justify-center px-8 py-4 rounded-[2rem] bg-zinc-900 border border-zinc-800 text-white font-medium text-sm transition-colors"
        onClick={() => {
          const el = document.getElementById('case-studies');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        View Portfolio
      </MagneticButton>
      <MagneticButton
        onClick={openContact}
        className="inline-flex items-center justify-center px-8 py-4 rounded-[2rem] bg-zinc-900 border border-zinc-800 text-white font-medium text-sm transition-colors"
      >
        Start a Project
      </MagneticButton>
    </motion.div>
  );
};

export const HeroDecorations = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    let width = typeof window !== "undefined" ? window.innerWidth : 1000;
    let height = typeof window !== "undefined" ? window.innerHeight : 1000;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const xPct = e.clientX / width - 0.5;
      const yPct = e.clientY / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const backgroundX = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
  const backgroundY = useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]);

  // Prevent Framer Motion physics calculations during initial TBT window
  if (!isHydrated) {
    return (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-orb animate-float pointer-events-none" />
      </>
    );
  }

  return (
    <>
      <motion.div 
        style={{ x: backgroundX, y: backgroundY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-orb animate-float pointer-events-none" 
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden pointer-events-none"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent"
        />
      </motion.div>
    </>
  );
};
