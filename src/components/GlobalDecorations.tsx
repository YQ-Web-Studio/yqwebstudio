"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const GlobalDecorations = () => {
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
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-orb animate-float pointer-events-none z-0" />
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
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
    </div>
  );
};
