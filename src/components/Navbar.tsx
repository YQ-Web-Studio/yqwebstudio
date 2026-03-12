"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { useContact } from "@/context/ContactContext";

const MobileFlyoutMenu = dynamic(() => import("./MobileFlyoutMenu").then(m => m.MobileFlyoutMenu), { ssr: false });
const DesktopPortfolioDropdown = dynamic(() => import("./DesktopPortfolioDropdown").then(m => m.DesktopPortfolioDropdown), { ssr: false });

export const Navbar = () => {
  const [isHovered, setIsHovered]     = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const portfolioBtnRef = useRef<HTMLButtonElement>(null);
  const isPortfolioOpenRef = useRef(false);
  const { openContact } = useContact();

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsMinimized(false);
    timeoutRef.current = setTimeout(() => {
      if (!isHovered && !isPortfolioOpenRef.current && window.scrollY > 100) {
        setIsMinimized(true);
      }
    }, 2000);
  }, [isHovered]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
      resetTimer();
    };
    
    const handleMouseMove = () => {
      if (window.innerWidth >= 768) resetTimer();
    };
    const handleTouchStart = () => {
      if (window.innerWidth < 768) resetTimer();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Defer the initial scroll check to avoid blocking the first paint
    const timer = setTimeout(() => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
        resetTimer();
      }
    }, 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [resetTimer]);

  const isShrunk = isMinimized && hasScrolled;

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  useEffect(() => {
    // Only enable interactive layout logic after the page is stable
    const timer = setTimeout(() => setIsDropdownActive(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const updateDropdownPos = useCallback(() => {
    // Prevent layout thrashing during main-thread blocking windows
    if (typeof window === "undefined" || !portfolioBtnRef.current || !isDropdownActive) return;
    
    // RequestAnimationFrame ensures we read only after the next frame, 
    // avoiding the "forced reflow" during hydration.
    requestAnimationFrame(() => {
      if (portfolioBtnRef.current) {
        const rect = portfolioBtnRef.current.getBoundingClientRect();
        setDropdownPos({
          x: rect.left + rect.width / 2,
          y: rect.bottom,
        });
      }
    });
  }, [isDropdownActive]);

  const handlePortfolioEnter = () => {
    if (!isDropdownActive) return;
    updateDropdownPos();
    setIsPortfolioOpen(true);
    isPortfolioOpenRef.current = true;
  };

  const handlePortfolioLeave = () => {
    setIsPortfolioOpen(false);
    isPortfolioOpenRef.current = false;
  };

  return (
    <>
      <div className="fixed top-3 md:top-6 left-0 right-0 z-[60] flex justify-center pointer-events-none">
        <motion.div
          layout
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative overflow-hidden flex items-center rounded-full ${
            hasScrolled 
              ? "bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-2xl px-5" 
              : "bg-transparent border-transparent px-5"
          } ${
            isShrunk
              ? "w-[80px] md:w-[88px] h-[48px]"
              : "w-auto md:w-[390px] h-[48px]"
          } mx-auto`}
          onMouseEnter={() => {
            if (typeof window !== "undefined" && window.innerWidth < 768) return;
            setIsHovered(true);
            setIsMinimized(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={() => {
            if (typeof window !== "undefined" && window.innerWidth < 768) return;
            setIsHovered(false);
            resetTimer();
          }}
          onClick={() => {
            if (typeof window !== "undefined" && window.innerWidth < 768) {
              setIsMinimized(false);
              resetTimer();
            }
          }}
        >
          <div
            className={`flex items-center h-full w-full relative ${
              isShrunk ? "justify-center px-0" : "flex-row justify-between gap-6 md:justify-start md:gap-3"
            }`}
          >
            <motion.a
              layout="position"
              href="#"
              aria-label="YQ Web Studio - Return to Top"
              className="font-bold tracking-tight text-white shrink-0 hover:-translate-y-[1px] transition-transform duration-300 z-10 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              YQ<span className="text-purple-500">.</span>
            </motion.a>

            <AnimatePresence>
              {!isShrunk && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center shrink-0"
                >
                  <div className="flex md:hidden items-center justify-end z-0">
                    <button
                      onClick={() => setIsMenuOpen(true)}
                      aria-label="Open Navigation Menu"
                      className="text-white hover:text-purple-400 transition-colors shrink-0 outline-none"
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="hidden md:flex items-center gap-7 z-0 ml-8">
                    <a href="#services" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 whitespace-nowrap">
                      Services
                    </a>
                    <a href="#about" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 whitespace-nowrap">
                      About
                    </a>
                    <div onMouseEnter={handlePortfolioEnter} onMouseLeave={handlePortfolioLeave}>
                      <button
                        ref={portfolioBtnRef}
                        className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 whitespace-nowrap"
                      >
                        Portfolio
                        <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-300 ${isPortfolioOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    <button 
                      onClick={openContact}
                      className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 whitespace-nowrap"
                    >
                      Contact
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <DesktopPortfolioDropdown 
        isPortfolioOpen={isPortfolioOpen} 
        dropdownPos={dropdownPos} 
        handlePortfolioEnter={() => { setIsPortfolioOpen(true); isPortfolioOpenRef.current = true; }} 
        handlePortfolioLeave={handlePortfolioLeave} 
      />

      <MobileFlyoutMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
    </>
  );
};

