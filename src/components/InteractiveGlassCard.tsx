"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveGlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const InteractiveGlassCard = ({ children, className, delay = 0 }: InteractiveGlassCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseOpacity = useMotionValue(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.2, 0.2], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.2, 0.2], ["-10deg", "10deg"]);

  const rectRef = useRef<DOMRect | null>(null);

  const handlePointerEnter = () => {
    if (!divRef.current) return;
    rectRef.current = divRef.current.getBoundingClientRect();
    mouseOpacity.set(1);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore touch movements to prevent sticky physics on mobile scroll
    if (e.pointerType === "touch") return;
    
    const rect = rectRef.current;
    if (!rect) return;
    
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    mouseOpacity.set(0);
    setIsActive(false);
    rectRef.current = null;
    x.set(0); 
    y.set(0);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only apply tap-to-toggle logic for touch devices
    if (e.pointerType !== "touch") return;
    
    if (isActive) {
      // Tap again to reset
      mouseOpacity.set(0);
      setIsActive(false);
      x.set(0);
      y.set(0);
      rectRef.current = null;
    } else {
      // Tap to tilt
      if (!divRef.current) return;
      rectRef.current = divRef.current.getBoundingClientRect();
      const rect = rectRef.current;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
      mouseOpacity.set(1);
      setIsActive(true);
    }
  };

  return (
    <div style={{ perspective: "2000px" }} className="w-full h-full">
      <motion.div
        ref={divRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onFocus={() => { setIsFocused(true); mouseOpacity.set(1); }}
        onBlur={() => { setIsFocused(false); mouseOpacity.set(0); }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative overflow-hidden bg-zinc-950/80 backdrop-blur-md border rounded-3xl transition-colors duration-300 group",
          // Use dynamic state for border/shadow instead of aggressive hover pseudo-classes that get stuck on mobile
          isActive 
            ? "border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.1)]" 
            : "border-zinc-800 md:hover:border-purple-500/30 md:hover:shadow-[0_0_30px_rgba(147,51,234,0.1)]",
          className
        )}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-3xl z-0"
          style={{
            opacity: mouseOpacity,
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(147, 51, 234, 0.15), transparent 40%)`
            ),
          }}
        />
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
