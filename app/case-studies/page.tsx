"use client";

import React, { useState } from "react";
import InteractiveWorkspace from "@/components/InteractiveWorkspace";
import { ArrowLeft, Sparkles, Code2, Globe, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: "faizane-madina",
    title: "Faizane Madina Masjid Southend",
    description:
      "A complete custom-engineered web platform built for Faizane Madina Masjid Southend (Dawat-e-Islami). Features precise daily prayer times scheduling, event registration, dynamic media galleries, and cloud-backed content management systems.",
    url: "https://faizanemadinasouthend.co.uk",
    technologies: ["Next.js", "Strapi CMS", "PostgreSQL", "Cloudinary", "Oracle Cloud"],
  },
  {
    id: "discount-products",
    title: "Discount Products UK",
    description:
      "A highly optimized e-commerce platform and storefront designed for rapid product discovery, filtering, and responsive catalog browsing with clean user flows.",
    url: "https://www.discountproducts.co.uk",
    technologies: ["React", "Next.js", "Tailwind CSS", "E-commerce Engine"],
  }
];

export default function CaseStudiesDemoPage() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-16 md:py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col gap-12 relative z-10">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            <span>Interactive Demo Workspace</span>
          </div>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-900 pb-4">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mr-2">
            Select Project:
          </span>
          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all ${
                selectedProjectId === proj.id
                  ? "bg-zinc-900 text-white border-zinc-700 shadow-sm"
                  : "bg-transparent text-zinc-400 border-zinc-900 hover:text-zinc-200 hover:border-zinc-800"
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        {/* Project Intro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-50 bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              {activeProject.title}
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-3xl">
              {activeProject.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-200 uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Project Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
              <Globe className="w-3.5 h-3.5" />
              <span>Live deployment preview below</span>
            </div>
          </div>
        </div>

        {/* Interactive Workspace Component */}
        <div className="mt-4 border border-zinc-900 rounded-3xl bg-zinc-900/10 p-2 md:p-6 backdrop-blur-[2px]">
          <InteractiveWorkspace key={activeProject.id} url={activeProject.url} title={activeProject.title} />
        </div>

        {/* Security / CSP Notice */}
        <div className="mt-8 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex flex-col md:flex-row gap-4 items-start">
          <ShieldAlert className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm font-bold text-amber-400">Security & Iframe Sandboxing</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              To preview any target site (e.g., `discountproducts.co.uk`) inside the workspace frame, make sure to add the `Content-Security-Policy: frame-ancestors 'self' https://yqwebstudio.com https://*.yqwebstudio.com` header to the target site's deployment.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
