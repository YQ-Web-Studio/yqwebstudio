"use client";

import React from "react";
import { ProtectedContact } from "./ProtectedContact";
import { motion } from "framer-motion";
import Image from "next/image";

const QuestionsSection = () => {
  return (
    <section id="contact" className="relative w-full pt-12 pb-28 md:py-40 overflow-hidden bg-zinc-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/support-bg.png"
          alt="Technical Support background"
          fill
          className="object-cover opacity-40 filter grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-zinc-950" />
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-purple-500/5 blur-[100px] rounded-full z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-2 sm:mb-8 pb-1 sm:pb-2 font-unbounded">
              Have a <span className="text-gradient font-serif italic font-extrabold px-2 text-[1.2em] inline-block leading-normal pb-3 -mb-3 relative z-10 overflow-visible">question?</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-base md:text-2xl mb-8 sm:mb-16 max-w-3xl mx-auto leading-relaxed">
              Need more info or looking for something specific? Reach out to our support desk. We&apos;re here to help you move forward.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <ProtectedContact />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
