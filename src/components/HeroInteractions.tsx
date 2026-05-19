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
    
    // Set initial center coordinates
    const initialX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
    const initialY = typeof window !== "undefined" ? window.innerHeight / 2 : 500;
    mouseX.set(initialX);
    mouseY.set(initialY);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Highly responsive, snappy spring physics for fast cursor-following actions
  const springConfig1 = { damping: 22, stiffness: 140, mass: 0.25 }; // Main Primary Purple (fast and tight)
  const springConfig2 = { damping: 28, stiffness: 100, mass: 0.45 }; // Accent Violet (slightly behind for rich fluid trails)
  const springConfig3 = { damping: 16, stiffness: 180, mass: 0.15 }; // Accent Lavender/Purple (extremely snappy highlight)

  const smoothX1 = useSpring(mouseX, springConfig1);
  const smoothY1 = useSpring(mouseY, springConfig1);

  const smoothX2 = useSpring(mouseX, springConfig2);
  const smoothY2 = useSpring(mouseY, springConfig2);

  const smoothX3 = useSpring(mouseX, springConfig3);
  const smoothY3 = useSpring(mouseY, springConfig3);

  // Translate coordinates, centering each orb of different size over the cursor
  const orb1X = useTransform(smoothX1, (x) => x - 300);
  const orb1Y = useTransform(smoothY1, (y) => y - 300);

  const orb2X = useTransform(smoothX2, (x) => x - 250);
  const orb2Y = useTransform(smoothY2, (y) => y - 250);

  const orb3X = useTransform(smoothX3, (x) => x - 200);
  const orb3Y = useTransform(smoothY3, (y) => y - 200);

  // Prevent Framer Motion physics calculations during initial TBT window
  if (!isHydrated) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-orb animate-float pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* Base slow-pulsing background light (Enlarged and deepened to 38% opacity for more baseline purple) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full opacity-[0.38] blur-[120px] pointer-events-none animate-pulse duration-[10000ms]"
        style={{
          background: "radial-gradient(circle, hsl(271 91% 30% / 0.18) 0%, transparent 70%)"
        }}
      />

      {/* Top-Right Ambient Purple Light (Static, separate from cursor) */}
      <div className="absolute top-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full opacity-[0.25] blur-[110px] pointer-events-none animate-pulse duration-[14000ms] delay-1000"
        style={{
          background: "radial-gradient(circle, hsl(292 84% 61% / 0.14) 0%, transparent 75%)"
        }}
      />

      {/* Bottom-Left Ambient Indigo Light (Static, separate from cursor) */}
      <div className="absolute bottom-[-15%] left-[-10%] w-[650px] h-[650px] rounded-full opacity-[0.30] blur-[120px] pointer-events-none animate-pulse duration-[12000ms] delay-3000"
        style={{
          background: "radial-gradient(circle, hsl(271 91% 65% / 0.14) 0%, transparent 75%)"
        }}
      />

      {/* Interactive Orb 1: Primary Purple (Large, smooth, deep ambient glow) */}
      <motion.div 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[90px] pointer-events-none opacity-50"
        style={{
          x: orb1X,
          y: orb1Y,
          background: "radial-gradient(circle, hsl(271 91% 65% / 0.20) 0%, hsl(262 80% 50% / 0.05) 50%, transparent 70%)"
        }}
      />

      {/* Interactive Orb 2: Accent Violet (Medium size, paints trailing deep violet gradients) */}
      <motion.div 
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none opacity-45"
        style={{
          x: orb2X,
          y: orb2Y,
          background: "radial-gradient(circle, hsl(292 84% 61% / 0.16) 0%, hsl(310 80% 50% / 0.03) 50%, transparent 70%)"
        }}
      />

      {/* Interactive Orb 3: Accent Lavender/Purple (Small, highly responsive micro-glow) */}
      <motion.div 
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none opacity-35"
        style={{
          x: orb3X,
          y: orb3Y,
          background: "radial-gradient(circle, hsl(280 85% 60% / 0.12) 0%, transparent 70%)"
        }}
      />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent"
        />
      </motion.div>
    </div>
  );
};
