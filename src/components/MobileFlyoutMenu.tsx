"use client";

import { X, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useContact } from "@/context/ContactContext";

export const MobileFlyoutMenu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}) => {
  const [isMobilePortfolioOpen, setIsMobilePortfolioOpen] = useState(false);
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false);
  const { openContact } = useContact();

  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-zinc-950/95 backdrop-blur-2xl flex flex-col pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300 ease-out">
      <div className="flex justify-end p-8 mt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
          aria-label="Close Navigation Menu"
          className="relative z-10 text-white hover:text-purple-400 transition-colors p-2 rounded-full bg-zinc-900/50 border border-zinc-800 active:scale-95 transition-transform"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 gap-10 -mt-16 w-full px-6 font-unbounded">
        <a
          href="#services"
          onClick={() => setIsMenuOpen(false)}
          className="text-4xl font-bold tracking-tight text-white hover:text-purple-400 transition-colors whitespace-nowrap"
        >
          Services
        </a>

        <div className="flex flex-col items-center w-full">
          <button
            onClick={() => setIsMobilePortfolioOpen(!isMobilePortfolioOpen)}
            className="text-4xl font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap"
          >
            Portfolio
            <ChevronDown
              className={`w-8 h-8 opacity-50 transition-transform duration-300 ${
                isMobilePortfolioOpen ? "rotate-180 text-purple-400 opacity-100" : ""
              }`}
            />
          </button>

          {isMobilePortfolioOpen && (
            <div className="overflow-hidden flex flex-col items-center gap-5 pt-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <a
                href="#case-studies"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-zinc-400 hover:text-purple-400 transition-colors whitespace-nowrap"
              >
                Case Studies
              </a>
              <a
                href="#in-development"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-zinc-400 hover:text-purple-400 transition-colors whitespace-nowrap"
              >
                In Development
              </a>
            </div>
          )}
        </div>

        <a
          href="#about"
          onClick={() => setIsMenuOpen(false)}
          className="text-4xl font-bold tracking-tight text-white hover:text-purple-400 transition-colors whitespace-nowrap"
        >
          About
        </a>

        <div className="flex flex-col items-center w-full">
          <button
            onClick={() => setIsMobileContactOpen(!isMobileContactOpen)}
            className="text-4xl font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap"
          >
            Contact
            <ChevronDown
              className={`w-8 h-8 opacity-50 transition-transform duration-300 ${
                isMobileContactOpen ? "rotate-180 text-purple-400 opacity-100" : ""
              }`}
            />
          </button>

          {isMobileContactOpen && (
            <div className="overflow-hidden flex flex-col items-center gap-5 pt-8 animate-in fade-in slide-in-from-top-2 duration-300">
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-zinc-400 hover:text-purple-400 transition-colors whitespace-nowrap"
              >
                Support
              </a>
              <a
                href="/quote"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold text-zinc-400 hover:text-purple-400 transition-colors whitespace-nowrap"
              >
                Start a Project
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
