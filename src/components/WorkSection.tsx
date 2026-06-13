"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  SiReact, SiStrapi, SiPostgresql, SiCloudinary, SiNextdotjs, SiTailwindcss,
  SiWordpress, SiWoocommerce, SiGraphql, SiVercel, SiCloudflare, SiPython, SiPhp, SiTypescript
} from "react-icons/si";
import { Cloud, Info, ExternalLink, Globe, Image as ImageIcon, ChevronDown, ShoppingBag, Landmark } from "lucide-react";
import React from "react";
import { toast } from "sonner";

// Lazy-load the Interactive Workspace component for high performance LCP
const InteractiveWorkspace = dynamic(
  () => import("./InteractiveWorkspace"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[16/10] bg-zinc-950/40 rounded-3xl border border-zinc-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
          <span className="text-xs text-zinc-500 font-medium tracking-wide">Loading workspace...</span>
        </div>
      </div>
    )
  }
);

// ── Magnetic Button (anchor) ──────────────────────────────────────────────────
const MagneticLinkButton = ({ children, href, className }: { children: React.ReactNode; href: string; className: string }) => {
  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
      className={`relative overflow-hidden group font-unbounded ${className}`}
    >
      <span className="absolute inset-0 bg-primary translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rounded-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
};

// ── Magnetic Button (button / onClick) ────────────────────────────────────────
const MagneticActionButton = ({ children, onClick, className, disabled }: { children: React.ReactNode; onClick: () => void; className: string; disabled?: boolean }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="absolute inset-0 bg-primary translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 rounded-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

const stackIconMap: Record<string, React.ReactNode> = {
  "React":        <SiReact className="w-3.5 h-3.5 shrink-0" style={{ color: "#61DAFB" }} />,
  "Next.js":      <SiNextdotjs className="w-3.5 h-3.5 shrink-0" style={{ color: "#FFFFFF" }} />,
  "Tailwind CSS": <SiTailwindcss className="w-3.5 h-3.5 shrink-0" style={{ color: "#06B6D4" }} />,
  "Strapi CMS":   <SiStrapi className="w-3.5 h-3.5 shrink-0" style={{ color: "#4945FF" }} />,
  "PostgreSQL":   <SiPostgresql className="w-3.5 h-3.5 shrink-0" style={{ color: "#4169E1" }} />,
  "Cloudinary":   <SiCloudinary className="w-3.5 h-3.5 shrink-0" style={{ color: "#3448C5" }} />,
  "Oracle Cloud": <Cloud className="w-3.5 h-3.5 shrink-0" style={{ color: "#F80000" }} />,
  "WordPress":    <SiWordpress className="w-3.5 h-3.5 shrink-0" style={{ color: "#21759B" }} />,
  "WooCommerce":  <SiWoocommerce className="w-3.5 h-3.5 shrink-0" style={{ color: "#96588A" }} />,
  "GraphQL":      <SiGraphql className="w-3.5 h-3.5 shrink-0" style={{ color: "#E10098" }} />,
  "Vercel":       <SiVercel className="w-3.5 h-3.5 shrink-0" style={{ color: "#FFFFFF" }} />,
  "Cloudflare":   <SiCloudflare className="w-3.5 h-3.5 shrink-0" style={{ color: "#F38020" }} />,
  "Python":       <SiPython className="w-3.5 h-3.5 shrink-0" style={{ color: "#3776AB" }} />,
  "PHP":          <SiPhp className="w-3.5 h-3.5 shrink-0" style={{ color: "#777BB4" }} />,
  "TypeScript":   <SiTypescript className="w-3.5 h-3.5 shrink-0" style={{ color: "#3178C6" }} />,
  "REST API":     <Globe className="w-3.5 h-3.5 shrink-0 text-emerald-400" />,
};

import { getCloudinaryImages } from "../../app/actions/getCloudinaryImages";

interface Project {
  id: string;
  category: string;
  categoryIcon: React.ReactNode;
  title: string;
  description: string;
  stack: string[];
  link: string;
  folder: string;
  screenshotFallback: string;
}

const projects: Project[] = [
  {
    id: "faizane-madina",
    category: "Community Mosque Platform",
    categoryIcon: <Landmark className="w-4 h-4 text-emerald-400 shrink-0" />,
    title: "Faizane Madina Masjid Southend | Dawat-e-Islami",
    description: "Official website of Faizane Madina Masjid Southend (Dawat-e-Islami). View daily prayer times, event details and more. Serving 200+ community members. Engineered to reduce manual workload with integrated media management.",
    stack: ["React", "Strapi CMS", "PostgreSQL", "Cloudinary", "Oracle Cloud", "Vercel"],
    link: "https://faizanemadinasouthend.co.uk",
    folder: "faizanemadina",
    screenshotFallback: "/faizane-madina-screenshots/Screenshot 2026-03-06 172800.png"
  },
  {
    id: "discount-products",
    category: "E-Commerce Storefront",
    categoryIcon: <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />,
    title: "Discount Quality Products",
    description: "An independent online storefront built to cleanly organize and display a vast 14,000-item inventory. By establishing a direct sales channel away from third-party marketplaces like eBay, the platform enables complete catalog ownership, avoids restrictive listing fees, and builds long-term brand equity.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WordPress", "WooCommerce", "GraphQL", "REST API", "Vercel", "Cloudflare", "PHP", "Python"],
    link: "https://www.discountproducts.co.uk",
    folder: "discountproducts",
    screenshotFallback: "/1773065951275.png"
  }
];

import GalleryOverlay from "./GalleryOverlay";

const WorkSection = () => {
  const [activeProjectId, setActiveProjectId] = useState("discount-products");
  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const [galleries, setGalleries] = useState<Record<string, string[]>>({});
  const [loadingGallery, setLoadingGallery] = useState(false);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[1];

  // Fetch gallery images dynamically from Cloudinary when active project changes
  useEffect(() => {
    if (!activeProject.folder) return;
    if (galleries[activeProjectId] !== undefined) return;

    let active = true;
    setLoadingGallery(true);

    getCloudinaryImages(activeProject.folder)
      .then((urls) => {
        if (active) {
          setGalleries((prev) => ({ ...prev, [activeProjectId]: urls }));
          setLoadingGallery(false);
        }
      })
      .catch((err) => {
        console.error("Error fetching gallery from Cloudinary:", err);
        if (active) {
          setLoadingGallery(false);
        }
      });

    return () => {
      active = false;
    };
  }, [activeProjectId, activeProject.folder, galleries]);

  const currentGallery = galleries[activeProjectId] || [];
  const hasGallery = currentGallery.length > 0;
  const showGalleryButton = true;

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const clickedOutsideDesktop = dropdownRef.current && !dropdownRef.current.contains(e.target as Node);
      const clickedOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target as Node);
      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <section id="case-studies" className="py-16 md:py-24 relative overflow-hidden bg-zinc-950/20">
      <div className="container mx-auto max-w-7xl px-6 mb-12">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          02 // Selected Work
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 heading-glow font-syne"
        >
          Case Studies.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-sm sm:text-base md:text-xl max-w-6xl mt-4 font-sans md:font-unbounded"
        >
          Explore live previews of our custom-engineered web platforms in real-time.
        </motion.p>
      </div>

      {/* ── Mobile Layout (< lg) ── */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:hidden flex flex-col gap-6">
        {/* 1. Dropdown Platform Selector at the top */}
        <div className={`flex flex-col gap-2.5 relative ${isDropdownOpen ? "z-40" : "z-10"}`} ref={mobileDropdownRef}>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
            Select Platform
          </span>
          {/* Dropdown Trigger */}
          <button
            onClick={() => setIsDropdownOpen((o) => !o)}
            className="w-full bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 p-4 rounded-2xl flex items-center justify-between text-left transition-all duration-300 group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850">
                {activeProject.categoryIcon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-zinc-400 tracking-wider">
                  {activeProject.category}
                </span>
                <span className="text-sm font-extrabold text-white font-unbounded">
                  {activeProject.title.split("|")[0].trim()}
                </span>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Options List */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full mt-1.5 left-0 w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50"
              >
                <div className="p-2 flex flex-col gap-1">
                  {projects.map((proj) => {
                    const isSelected = proj.id === activeProjectId;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => {
                          setActiveProjectId(proj.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between transition-colors ${
                          isSelected ? "bg-zinc-900 text-white" : "hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-850">
                            {proj.categoryIcon}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-zinc-250"}`}>
                              {proj.category}
                            </span>
                            <span className={`text-[11px] font-bold font-unbounded ${isSelected ? "text-zinc-300" : "text-zinc-400"}`}>
                              {proj.title.split("|")[0].trim()}
                            </span>
                          </div>
                        </div>
                        {isSelected && <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. Interactive Workspace Mockup (Laptop with screenshot fallback, no tooltip indicator) */}
        <InteractiveWorkspace 
          key={`mobile-${activeProject.id}`} 
          url={activeProject.link} 
          title={activeProject.title} 
          screenshotUrl={currentGallery[0] || activeProject.screenshotFallback}
        />

        {/* 3. Project Details Card with Action Buttons moved below description */}
        <div className="glass rounded-3xl p-6 border border-zinc-900 bg-zinc-950/40 flex flex-col gap-5">
          <div className="border-b border-zinc-900 pb-3">
            <h3 className="text-xl font-extrabold tracking-tight text-zinc-50 leading-tight font-unbounded">
              {activeProject.title.split("|")[0].trim()}
            </h3>
          </div>
          <p className="text-zinc-200 text-sm leading-relaxed font-medium">
            {activeProject.description}
          </p>

          {/* Action buttons (underneath description) */}
          <div className="grid gap-3 w-full grid-cols-2 mt-1">
            <MagneticLinkButton
              href={activeProject.link}
              className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-3 rounded-[2rem] transition-colors w-full"
            >
              <span>Launch Site</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </MagneticLinkButton>

            {showGalleryButton && (
              <MagneticActionButton
                onClick={() => {
                  if (!loadingGallery) {
                    if (currentGallery.length > 0) {
                      setActiveGallery(currentGallery);
                    } else {
                      toast.info("Gallery screenshots for this project are currently being prepared.");
                    }
                  }
                }}
                className={`inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-3 rounded-[2rem] transition-colors w-full ${
                  loadingGallery ? "opacity-50" : ""
                }`}
                disabled={loadingGallery}
              >
                {loadingGallery ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>View Gallery</span>
                  </>
                )}
              </MagneticActionButton>
            )}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-2 pt-4 border-t border-zinc-900">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Built With</span>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.stack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-[11px] font-semibold text-zinc-300"
                >
                  {stackIconMap[tech] ?? <Globe className="w-3 h-3" />}
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop Layout (lg+) ── */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Dynamic Device Mockup Preview Workspace & Standard Info Badge */}
          <div className="lg:col-span-6 flex flex-col lg:h-full gap-4">
            
            {/* Tooltip & Laptop wrapper with reduced gap */}
            <div className="flex flex-col gap-4">
              {/* Standard Grey Tooltip Indicator */}
              <div className="flex items-center justify-start px-1">
                <div className="relative flex items-center">
                  <button
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onClick={() => setShowTooltip((p) => !p)}
                    className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-400 transition-colors cursor-help text-xs font-semibold uppercase tracking-wider"
                    title="Demo Details"
                  >
                    <Info className="w-4 h-4 text-zinc-500" />
                    <span>Interactive Demo Workspace</span>
                  </button>
                  
                  <AnimatePresence>
                    {showTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-8 w-64 p-3.5 bg-zinc-950/95 border border-zinc-850 text-[10px] text-zinc-400 rounded-xl leading-relaxed shadow-2xl z-30 pointer-events-none"
                      >
                        This loads the live homepage inside a sandboxed frame. Internal link clicks/navigation are disabled for safety. Click "Launch Live Site" to test full checkouts or inner pages.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <InteractiveWorkspace 
                key={activeProject.id} 
                url={activeProject.link} 
                title={activeProject.title} 
                screenshotUrl={currentGallery[0] || activeProject.screenshotFallback}
              />
            </div>

            {/* Under the laptop: Action Buttons */}
            <div className="w-full px-1 mt-3 lg:mt-auto">
              <div className={`grid gap-3 w-full ${
                showGalleryButton 
                  ? "grid-cols-2" 
                  : "grid-cols-1"
              }`}>
                <MagneticLinkButton
                  href={activeProject.link}
                  className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-6 py-3 rounded-[2rem] transition-colors w-full"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </MagneticLinkButton>

                {showGalleryButton && (
                  <MagneticActionButton
                    onClick={() => {
                      if (!loadingGallery) {
                        if (currentGallery.length > 0) {
                          setActiveGallery(currentGallery);
                        } else {
                          toast.info("Gallery screenshots for this project are currently being prepared.");
                        }
                      }
                    }}
                    className={`inline-flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-6 py-3 rounded-[2rem] transition-colors w-full ${
                      loadingGallery ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loadingGallery}
                  >
                    {loadingGallery ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>View Gallery</span>
                      </>
                    )}
                  </MagneticActionButton>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Project Details Card & Dropdown Platform Selector */}
          <div className="lg:col-span-6 flex flex-col lg:h-full gap-6">
            
            {/* Active Project Details Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-3xl p-8 border border-zinc-900 bg-zinc-950/40 flex flex-col gap-6 lg:h-[370px]"
              >
                {/* Heading (Project Title) at the top */}
                <div className="border-b border-zinc-900 pb-4">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-50 leading-tight font-unbounded">
                    {activeProject.title.split("|")[0].trim()}
                  </h3>
                </div>

                <p className="text-zinc-200 text-sm leading-relaxed font-medium">
                  {activeProject.description}
                </p>

                {/* Tech Stack Badge List */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Built With</span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition-colors cursor-default"
                      >
                        {stackIconMap[tech] ?? <Globe className="w-3.5 h-3.5" />}
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Scalable Dropdown Project Selector */}
            <div className="flex flex-col gap-2.5 relative lg:mt-auto" ref={dropdownRef}>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">
                Select Platform
              </span>
              
              {/* Dropdown Trigger */}
              <button
                onClick={() => setIsDropdownOpen((o) => !o)}
                className="w-full bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 p-4 rounded-2xl flex items-center justify-between text-left transition-all duration-350 group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-850 group-hover:border-zinc-850 transition-colors">
                    {activeProject.categoryIcon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-400 tracking-wider">
                      {activeProject.category}
                    </span>
                    <span className="text-sm font-extrabold text-white font-unbounded">
                      {activeProject.title.split("|")[0].trim()}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-500 group-hover:text-zinc-400 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`} />
              </button>

              {/* Dropdown Options List (Opens Upward over trigger) */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute bottom-full mb-1.5 left-0 w-full bg-zinc-950/98 border border-zinc-700/90 rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 z-20 backdrop-blur-md"
                  >
                    <div className="p-2 flex flex-col gap-1">
                      {projects.map((proj) => {
                        const isSelected = proj.id === activeProjectId;
                        return (
                          <button
                            key={proj.id}
                            onClick={() => {
                              setActiveProjectId(proj.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between transition-colors ${
                              isSelected
                                ? "bg-zinc-900 text-white"
                                : "hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-850">
                                {proj.categoryIcon}
                              </div>
                              <div className="flex flex-col">
                                <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-zinc-200"}`}>
                                  {proj.category}
                                </span>
                                <span className={`text-[11px] font-bold font-unbounded ${isSelected ? "text-zinc-300" : "text-zinc-400"}`}>
                                  {proj.title.split("|")[0].trim()}
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>

      <GalleryOverlay 
        images={activeGallery || []} 
        isOpen={activeGallery !== null}
        onClose={() => setActiveGallery(null)}
      />
    </section>
  );
};

export default WorkSection;
