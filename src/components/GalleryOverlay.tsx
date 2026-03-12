"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryOverlayProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

const GalleryOverlay = ({ images, isOpen, onClose }: GalleryOverlayProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setDirection(0);
    }
  }, [isOpen]);

  const handleNext = useCallback((e?: React.MouseEvent | any) => {
    e?.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handlePrev = useCallback((e?: React.MouseEvent | any) => {
    e?.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const dragVariant: Variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 300 : dir < 0 ? -300 : 0,
      opacity: 0,
      scale: 0.95
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : dir > 0 ? -300 : 0,
      opacity: 0,
      scale: 1.05,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const overlayContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          // CHANGED: bg-zinc-950 forces a fully solid, pitch-black background on mobile.
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-zinc-950 md:bg-zinc-950/95 backdrop-blur-2xl p-0 md:p-12"
          onClick={onClose}
        >
          {/* Header Controls */}
          <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex items-center justify-between z-[10001] pointer-events-none">
            <div className="text-zinc-400 font-mono text-xs tracking-widest bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-800 pointer-events-auto shadow-xl">
              {currentIndex + 1} / {images.length}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-3 bg-zinc-900/80 backdrop-blur-md hover:bg-zinc-800 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors pointer-events-auto shadow-xl"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Arrows (Hidden on Mobile) */}
          {images.length > 1 && (
            <div className="hidden md:contents">
              <button
                onClick={handlePrev}
                className="absolute left-12 top-1/2 -translate-y-1/2 p-4 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors z-[10001] shadow-2xl pointer-events-auto"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-4 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors z-[10001] shadow-2xl pointer-events-auto"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}

          {/* Main Image Container */}
          <div 
            className="relative w-full max-w-7xl h-full flex items-center justify-center p-0 md:p-4 pointer-events-none"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Screenshot ${currentIndex + 1}`}
                custom={direction}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 50) handlePrev();
                  else if (info.offset.x < -50) handleNext();
                }}
                variants={dragVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="relative w-full md:w-auto max-w-full max-h-full md:max-h-[85vh] object-contain rounded-none md:rounded-2xl shadow-none md:shadow-2xl border-none md:border md:border-white/5 cursor-grab active:cursor-grabbing pointer-events-auto select-none bg-transparent md:bg-zinc-950/20"
                draggable={false}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(overlayContent, document.body);
};

export default GalleryOverlay;