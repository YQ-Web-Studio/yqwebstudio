"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useContact } from "@/context/ContactContext";
import { useRef } from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

const MagneticFooterButton = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
      style={{ x: springX, y: springY }}
      className="relative overflow-hidden group inline-flex items-center justify-center px-10 py-5 rounded-full bg-zinc-900 border border-zinc-800 text-white font-medium text-lg transition-colors font-unbounded"
    >
      {/* Sliding background layer */}
      <span className="absolute inset-0 bg-purple-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0" />
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <motion.span 
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  );
};

const Footer = () => {
  const { openContact } = useContact();
  return (
    <motion.footer
      id="footer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="pt-8 pb-32 md:py-24 border-t border-border/50 bg-zinc-950 relative z-10"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column: Slogan and Magnetic Call to Action Button */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="overflow-visible mb-4 md:mb-6 w-full flex flex-col items-center text-center md:items-start md:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-50 px-4 md:px-16 py-4 md:py-8 md:-ml-16 text-center md:text-left font-syne leading-normal pb-8 overflow-visible isolate"
                style={{ filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.4)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.15))' }}
              >
                <span 
                  style={{ position: 'relative', zIndex: 50, transform: 'translate3d(0, 0, 10px)' }}
                  className="inline-block whitespace-nowrap pb-3 pt-1 leading-[1.3] overflow-visible"
                >
                  Ready to digitalise
                </span>
                <br />
                <span 
                  style={{ position: 'relative', zIndex: 10, transform: 'translate3d(0, 0, 0)' }}
                  className="text-gradient font-serif italic font-normal inline-block whitespace-nowrap px-6 md:pl-0 md:pr-12 pb-4 overflow-visible -top-4 md:-top-7"
                >
                  your business?
                </span>
              </motion.h2>
            </div>
            
            <div className="mt-2 flex justify-center md:justify-start">
              <MagneticFooterButton onClick={openContact}>
                Start a Project
              </MagneticFooterButton>
            </div>
          </div>

          {/* Right Column: Premium YQ. Web Studio Brandmark */}
          <div className="flex flex-col items-center justify-center md:items-end pt-8 md:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex flex-col items-center pointer-events-none select-none md:-mr-4"
            >
              {/* Signature YQ. Mark */}
              <span className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-white leading-none relative">
                YQ<span className="text-purple-500 animate-pulse duration-[3000ms]">.</span>
              </span>
              
              {/* Serif italic Web Studio slogan matching header style & color */}
              <span className="text-xl sm:text-2xl font-serif italic font-normal text-gradient mt-2 block">
                Web Studio
              </span>
            </motion.div>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center w-full gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} YQ Web Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/YQ-Web-Studio" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/company/yqwebstudio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <Link 
              href="/privacy-policy" 
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
