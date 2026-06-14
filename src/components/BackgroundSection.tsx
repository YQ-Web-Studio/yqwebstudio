"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  SiTypescript, SiJavascript, SiPython, SiCplusplus, SiDart, SiPhp,
  SiReact, SiNextdotjs, SiFlutter, SiTailwindcss,
  SiNodedotjs, SiPostgresql, SiMysql, SiStrapi, SiFirebase,
  SiGooglecloud, SiDocker, SiNginx, SiLinux,
  SiWordpress, SiWoocommerce, SiCloudflare, SiCloudinary, SiGraphql
} from "react-icons/si";
import { Coffee, Server, Cloud, Network } from "lucide-react"; // Java, AWS, Oracle Cloud fallbacks
import { InteractiveGlassCard } from "@/components/InteractiveGlassCard";

const TelemetryTypewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "50px" }); // Trigger BEFORE entering viewport

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <div ref={ref} className="relative min-h-[5rem]">
      {/* Invisible placeholder to reserve layout height/wrap */}
      <p className="text-sm font-mono leading-relaxed max-w-lg opacity-0 pointer-events-none select-none">
        {text}
      </p>
      {/* Absolute overlay for the actual typing animation */}
      <p className="absolute inset-0 text-zinc-400 font-mono text-sm leading-relaxed max-w-lg">
        {displayedText}
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-1.5 h-3.5 ml-1 bg-purple-500 align-middle"
        />
      </p>
    </div>
  );
};

const credentials = [
  {
    title: "BSc (Hons) Computer Science",
    subtitle: "City St George's, University of London",
    icon: (
      <Image 
        src="/uni-logo.png" 
        alt="University Logo" 
        width={24} 
        height={24} 
        className="object-contain"
        unoptimized
      />
    ),
  },
  {
    title: "Google Cloud Certified",
    subtitle: "Cloud Digital Leader",
    icon: (
      <Image 
        src="/google-cloud.png" 
        alt="Google Cloud Logo" 
        width={24} 
        height={24} 
        className="object-contain"
      />
    ),
  },
];

const stack = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "Dart", "PHP"],
  },
  {
    category: "Web & Mobile",
    items: ["React", "Next.js", "WordPress", "WooCommerce", "React Native", "Flutter", "Tailwind CSS"],
  },
  {
    category: "Backend & Database",
    items: ["Node.js", "PostgreSQL", "MySQL", "Strapi", "Firebase", "REST API", "GraphQL"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Oracle Cloud", "AWS", "Google Cloud", "Cloudflare", "Cloudinary", "Docker", "Nginx", "Linux"],
  },
];

const iconMap: Record<string, React.ReactNode> = {
  "TypeScript":    <SiTypescript className="w-3.5 h-3.5 shrink-0" style={{ color: "#3178C6" }} />,
  "JavaScript":   <SiJavascript className="w-3.5 h-3.5 shrink-0" style={{ color: "#F7DF1E" }} />,
  "Python":       <SiPython className="w-3.5 h-3.5 shrink-0" style={{ color: "#3776AB" }} />,
  "Java":         <Coffee className="w-3.5 h-3.5 shrink-0" style={{ color: "#F89820" }} />,
  "C++":          <SiCplusplus className="w-3.5 h-3.5 shrink-0" style={{ color: "#00599C" }} />,
  "Dart":         <SiDart className="w-3.5 h-3.5 shrink-0" style={{ color: "#0175C2" }} />,
  "PHP":          <SiPhp className="w-3.5 h-3.5 shrink-0" style={{ color: "#777BB4" }} />,
  "React":        <SiReact className="w-3.5 h-3.5 shrink-0" style={{ color: "#61DAFB" }} />,
  "Next.js":      <SiNextdotjs className="w-3.5 h-3.5 shrink-0" style={{ color: "#ffffff" }} />,
  "WordPress":    <SiWordpress className="w-3.5 h-3.5 shrink-0" style={{ color: "#21759B" }} />,
  "WooCommerce":  <SiWoocommerce className="w-3.5 h-3.5 shrink-0" style={{ color: "#96588A" }} />,
  "React Native": <SiReact className="w-3.5 h-3.5 shrink-0" style={{ color: "#61DAFB" }} />,
  "Flutter":      <SiFlutter className="w-3.5 h-3.5 shrink-0" style={{ color: "#02569B" }} />,
  "Tailwind CSS": <SiTailwindcss className="w-3.5 h-3.5 shrink-0" style={{ color: "#06B6D4" }} />,
  "Node.js":      <SiNodedotjs className="w-3.5 h-3.5 shrink-0" style={{ color: "#339933" }} />,
  "PostgreSQL":   <SiPostgresql className="w-3.5 h-3.5 shrink-0" style={{ color: "#4169E1" }} />,
  "MySQL":        <SiMysql className="w-3.5 h-3.5 shrink-0" style={{ color: "#4479A1" }} />,
  "Strapi":       <SiStrapi className="w-3.5 h-3.5 shrink-0" style={{ color: "#4945FF" }} />,
  "Firebase":     <SiFirebase className="w-3.5 h-3.5 shrink-0" style={{ color: "#FFCA28" }} />,
  "REST API":     <Network className="w-3.5 h-3.5 shrink-0" style={{ color: "#a855f7" }} />,
  "GraphQL":      <SiGraphql className="w-3.5 h-3.5 shrink-0" style={{ color: "#E10098" }} />,
  "AWS":          <Server className="w-3.5 h-3.5 shrink-0" style={{ color: "#FF9900" }} />,
  "Oracle Cloud": <Cloud className="w-3.5 h-3.5 shrink-0" style={{ color: "#F80000" }} />,
  "Google Cloud": <SiGooglecloud className="w-3.5 h-3.5 shrink-0" style={{ color: "#4285F4" }} />,
  "Cloudflare":   <SiCloudflare className="w-3.5 h-3.5 shrink-0" style={{ color: "#F38020" }} />,
  "Cloudinary":   <SiCloudinary className="w-3.5 h-3.5 shrink-0" style={{ color: "#3448C5" }} />,
  "Docker":       <SiDocker className="w-3.5 h-3.5 shrink-0" style={{ color: "#2496ED" }} />,
  "Nginx":        <SiNginx className="w-3.5 h-3.5 shrink-0" style={{ color: "#009639" }} />,
  "Linux":        <SiLinux className="w-3.5 h-3.5 shrink-0" style={{ color: "#FCC624" }} />,
};

const Pill = ({ label, index }: { label: string; index: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 6 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.3, delay: index * 0.015, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -2 }}
    className="inline-flex items-center gap-1.5 cursor-default rounded-full bg-zinc-900/40 border border-zinc-800/50 text-zinc-300 text-sm px-3 py-1 hover:border-purple-600/50 hover:text-white transition-colors duration-200"
  >
    {iconMap[label] ?? null}
    {label}
  </motion.span>
);

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

const BackgroundSection = () => {
  let pillIndex = 0;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const portraitVariants: any = {
    grayscale: {
      filter: "grayscale(100%) contrast(1.25)",
      opacity: 0.6,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    },
    colorize: {
      filter: "grayscale(0%) contrast(1.0)",
      opacity: 1,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] }
    }
  };
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="about" className="pt-16 pb-8 md:py-24 relative overflow-hidden bg-zinc-950">
      
      {/* ── Section Heading ── */}
      <div className="container mx-auto max-w-7xl px-6 mb-12 relative z-20">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
          03 // About the Developer
        </p>
      </div>

      {/* ── Cinematic Portrait Layout (Background Level) ── */}
      {/* Moved back to section-level absolute to prevent "box" clipping and restore seamless blending */}
      <motion.div 
        key={isMobile ? "mobile-portrait" : "desktop-portrait"}
        style={{ y: parallaxY, willChange: "transform" }} 
        className="absolute top-18 md:top-36 left-0 w-full md:w-[60%] lg:w-[50%] h-[400px] md:h-[600px] z-0 cursor-pointer group pointer-events-auto"
        variants={isMobile ? portraitVariants : {}}
        initial={isMobile ? "grayscale" : { opacity: 0, scale: 1.02 }}
        whileInView={isMobile ? "colorize" : { opacity: 1, scale: 1 }}
        viewport={isMobile ? { once: false, amount: 0.7, margin: "0px 0px -10% 0px" } : { once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/profile.png"
          alt="Yusuf Qureshi Portrait"
          fill
          className={`object-contain object-bottom transition-all duration-700 ease-out 
            ${!isMobile ? "grayscale contrast-125 opacity-50 md:opacity-60 md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:contrast-100" : ""}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        
        {/* Layer 1: Permanent Edge Feathering (Localized solely to boundaries to keep face bright) */}
        {/* Baseline mask */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent pointer-events-none z-10" />
        {/* Right shoulder/edge mask */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none z-10" />
        {/* Left edge mask (very subtle) */}
        <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-zinc-950/20 via-transparent to-transparent pointer-events-none z-10" />

        {/* Layer 2: Atmospheric Gradients (Fades on hover for desktop, on scroll for mobile) */}
        <motion.div 
          variants={{ grayscale: { opacity: 1 }, colorize: { opacity: 0 } }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent pointer-events-none transition-opacity duration-700 ease-out z-20 
            ${!isMobile ? "md:group-hover:opacity-0" : ""}`} 
        />
        <motion.div 
          variants={{ grayscale: { opacity: 1 }, colorize: { opacity: 0 } }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute inset-0 bg-gradient-to-r from-zinc-950/20 via-transparent to-transparent pointer-events-none transition-opacity duration-700 ease-out z-20 
            ${!isMobile ? "md:group-hover:opacity-0" : ""}`} 
        />
      </motion.div>

      <div className="w-full max-w-6xl mx-auto relative z-10 pointer-events-none md:px-6">
        {/* ── Top Row: Editorial Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-end px-12 md:px-0">
          
          {/* Portrait Spacer (Left) - Hidden on mobile to collapse gap */}
          <div className="hidden md:block relative h-[600px] order-2 md:order-1" />

          {/* Text Column (Right) */}
          <div className="flex flex-col gap-8 relative z-10 order-1 md:order-2 pb-8 md:pb-12 pt-[40vh] md:pt-0 pointer-events-auto">
            <div className="text-left w-full">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-50 heading-glow font-unbounded"
              >
                Yusuf Qureshi
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-purple-400 font-medium text-xl mt-3"
              >
                Full-Stack Developer & Cloud Engineer
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-left"
            >
              <TelemetryTypewriter 
                text="I engineer premium, high-performance web and mobile applications that actually deliver results for your business. By combining robust cloud architectures with User-Centred System Design methodologies, I build scalable digital platforms that automate operations, engage users, and drive measurable business growth." 
              />
            </motion.div>

            {/* Credentials Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                  className="flex-1 rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 p-4 flex items-center gap-4 hover:border-zinc-700 transition-colors group"
                >
                  <div className="bg-zinc-950 p-2 rounded-xl border border-zinc-800 group-hover:border-purple-500/30 transition-colors">
                    {cred.icon}
                  </div>
                  <div>
                    <p className="text-zinc-50 font-bold text-xs font-unbounded">{cred.title}</p>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-wider">{cred.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-start gap-4 mt-2"
            >
              <MagneticLinkButton
                href="https://github.com/YusufQuresh1"
                className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-6 py-3 rounded-[2rem] transition-colors"
              >
                <Github size={16} className="group-hover:rotate-12 transition-transform" />
                <span>GitHub</span>
              </MagneticLinkButton>
              <MagneticLinkButton
                href="https://www.linkedin.com/in/mohammedyusufqureshi"
                className="inline-flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-6 py-3 rounded-[2rem] transition-colors"
              >
                <Linkedin size={16} className="group-hover:-rotate-12 transition-transform" />
                <span>LinkedIn</span>
              </MagneticLinkButton>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Row: The Toolkit Slab ── */}
        <div className="w-full mt-10 md:mt-20 relative z-10 pointer-events-auto px-6 md:px-0">
          <InteractiveGlassCard disableTilt={isMobile} delay={0.2} className="bg-zinc-900/40 rounded-[2rem] md:rounded-[2.5rem] py-10 px-6 sm:px-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-zinc-50 font-unbounded">The Toolkit</h3>
                <p className="text-zinc-500 text-sm mt-1 font-mono uppercase tracking-widest">Technical Proficiency & Tooling</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent hidden md:block" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {stack.map((group) => (
                <div key={group.category} className="space-y-4">
                  <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => {
                      const idx = pillIndex++;
                      return <Pill key={item} label={item} index={idx} />;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </InteractiveGlassCard>
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;
