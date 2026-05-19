"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  SiReact, SiStrapi, SiPostgresql, SiCloudinary
} from "react-icons/si";
import { Cloud } from "lucide-react"; // Oracle Cloud fallback
import React from "react";

// ── Magnetic Button (anchor) ──────────────────────────────────────────────────
const MagneticLinkButton = ({ children, href, className }: { children: React.ReactNode; href: string; className: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.2);
    y.set((clientY - (top + height / 2)) * 0.2);
  };
  return (
    <motion.a
      ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.03 }}
      transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
      style={{ x: springX, y: springY }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="absolute inset-0 bg-primary translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 rounded-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
};

// ── Magnetic Button (button / onClick) ────────────────────────────────────────
const MagneticActionButton = ({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.2);
    y.set((clientY - (top + height / 2)) * 0.2);
  };
  return (
    <motion.button
      ref={ref} onClick={onClick}
      onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.03 }}
      transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
      style={{ x: springX, y: springY }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="absolute inset-0 bg-primary translate-y-[110%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 rounded-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

const stackIconMap: Record<string, React.ReactNode> = {
  "React":       <SiReact className="w-3.5 h-3.5 shrink-0" style={{ color: "#61DAFB" }} />,
  "Strapi CMS":  <SiStrapi className="w-3.5 h-3.5 shrink-0" style={{ color: "#4945FF" }} />,
  "PostgreSQL":  <SiPostgresql className="w-3.5 h-3.5 shrink-0" style={{ color: "#4169E1" }} />,
  "Cloudinary":  <SiCloudinary className="w-3.5 h-3.5 shrink-0" style={{ color: "#3448C5" }} />,
  "Oracle Cloud":<Cloud className="w-3.5 h-3.5 shrink-0" style={{ color: "#F80000" }} />,
};

const projects = [
  {
    title: "Faizane Madina Masjid Southend | Dawat-e-Islami",
    description: "Official website of Faizane Madina Masjid Southend (Dawat-e-Islami). View daily prayer times, event details and more. Serving 200+ community members. Engineered to reduce manual workload with integrated media management.",
    stack: ["React", "Strapi CMS", "PostgreSQL", "Cloudinary", "Oracle Cloud"],
    link: "https://faizanemadinasouthend.co.uk",
    gallery: [
      "/faizane-madina-screenshots/Screenshot 2026-03-06 172800.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 172835.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 172857.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 172920.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 172935.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 172947.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 173007.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 173021.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 173112.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 173128.png",
      "/faizane-madina-screenshots/Screenshot 2026-03-06 173153.png"
    ]
  },
];

import GalleryOverlay from "./GalleryOverlay";

const VideoPlayer = ({ src }: { src: string }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fix for cached videos that never fire onLoadedData
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          
          if (entry.isIntersecting) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                // Ignore AbortError: play() interrupted by pause() due to fast scrolling
                if (error.name !== "AbortError") {
                  console.warn("Video playback failed", error);
                }
              });
            }
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.1 } // Play when just 10% is in view for better consistency
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      aria-hidden="true"
      preload="none"
      onLoadedData={() => setIsVideoLoaded(true)}
      className={`w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
        isVideoLoaded ? "opacity-100" : "opacity-0"
      }`}
      suppressHydrationWarning
    />
  );
};

const WorkSection = () => {
  const [activeGallery, setActiveGallery] = useState<string[] | null>(null);

  return (
    <section id="case-studies" className="py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          03 // Selected Work
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-50 heading-glow"
        >
          Case Studies.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mt-4 mb-12"
        >
          A showcase of custom-engineered web platforms built for real-world impact.
        </motion.p>
      </div>

      <div className="w-full max-w-6xl mx-auto md:px-6">
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-none border-x-0 md:rounded-[2rem] md:border-x overflow-hidden flex flex-col"
            >
              {/* Video showcase */}
              <motion.div
                className="relative w-full h-56 md:h-72 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                  <VideoPlayer src="/videos/faizane-madina.mp4" />
                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
              </motion.div>
              <div className="p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 mb-4">
                  {project.title}
                </h3>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-default"
                    >
                      {stackIconMap[tech] ?? null}
                      {tech}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-end gap-3">
                  {project.gallery && project.gallery.length > 0 && (
                    <MagneticActionButton
                      onClick={() => setActiveGallery(project.gallery)}
                      className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-[2rem] transition-colors"
                    >
                      View Gallery
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    </MagneticActionButton>
                  )}
                  {project.link && (
                    <MagneticLinkButton
                      href={project.link}
                      className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-white bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-[2rem] transition-colors"
                    >
                      View Live Platform
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </MagneticLinkButton>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
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
