"use client";

import React from "react";
import { Mail } from "lucide-react";

export const ProtectedContact = () => {
  // support@yqwebstudio.com
  const emailParts = {
    user: "support",
    domain: "yqwebstudio",
    tld: "com"
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleEmailClick}
        className="group flex items-center gap-3 text-zinc-100 sm:text-zinc-400 sm:hover:text-white transition-all duration-300 transform sm:hover:-translate-y-0.5"
      >
        <div className="p-2.5 rounded-full bg-purple-500/10 border-purple-500/50 sm:bg-zinc-900/50 sm:border-zinc-800 sm:group-hover:border-purple-500/50 sm:group-hover:bg-purple-500/10 transition-colors">
          <Mail className="w-5 h-5 text-purple-400 sm:text-zinc-400 sm:group-hover:text-purple-400 transition-colors" />
        </div>
        <span className="text-base md:text-lg font-medium tracking-wide flex items-center">
          <span>{emailParts.user}</span>
          <span className="mx-[0.1em] opacity-80">@</span>
          <span>{emailParts.domain}</span>
          <span className="mx-[0.1em] opacity-80">.</span>
          <span>{emailParts.tld}</span>
        </span>
      </button>
    </div>
  );
};
