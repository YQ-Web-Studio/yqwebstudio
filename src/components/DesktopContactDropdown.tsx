"use client";

import { ChevronRight } from "lucide-react";

export const DesktopContactDropdown = ({
  isContactOpen,
  dropdownPos,
  handleContactEnter,
  handleContactLeave,
  openContact,
}: {
  isContactOpen: boolean;
  dropdownPos: { x: number; y: number };
  handleContactEnter: () => void;
  handleContactLeave: () => void;
  openContact: () => void;
}) => {
  if (!isContactOpen) return null;

  return (
    <div
      className="fixed pointer-events-auto z-[9999] animate-in fade-in slide-in-from-top-1 duration-200 ease-out"
      style={{
        left: dropdownPos.x,
        top: dropdownPos.y,
        transform: "translateX(-50%)",
      }}
      onMouseEnter={handleContactEnter}
      onMouseLeave={handleContactLeave}
    >
      <div className="h-6" />
      <div className="w-52 rounded-2xl p-2 flex flex-col shadow-2xl bg-zinc-950/80 backdrop-blur-xl border border-zinc-800 font-unbounded">
        <a
          href="#contact"
          onClick={handleContactLeave}
          className="px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between group/link"
        >
          Support
          <ChevronRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-purple-400" />
        </a>
        <a
          href="/quote"
          onClick={handleContactLeave}
          className="px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between group/link"
        >
          Start a Project
          <ChevronRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-purple-400" />
        </a>
      </div>
    </div>
  );
};
