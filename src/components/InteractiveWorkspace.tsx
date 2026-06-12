"use client";

import React, { useState, useRef, useEffect } from "react";

interface InteractiveWorkspaceProps {
  url: string;
  title?: string;
}

export default function InteractiveWorkspace({ url, title = "Live Preview" }: InteractiveWorkspaceProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [bezelWidth, setBezelWidth] = useState(1024);
  const [loadCount, setLoadCount] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  
  const bezelScreenRef = useRef<HTMLDivElement>(null);

  // Track the container clientWidth to update scale ratio
  useEffect(() => {
    const updateSize = () => {
      if (bezelScreenRef.current) {
        setBezelWidth(bezelScreenRef.current.clientWidth);
      }
    };
    
    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    if (bezelScreenRef.current) {
      observer.observe(bezelScreenRef.current);
    }

    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const handleIframeLoad = () => {
    setLoadCount((prev) => {
      const nextCount = prev + 1;
      // The first load (nextCount === 1) is the initial home page loading.
      // Any subsequent load indicates the user clicked a link to navigate away.
      if (nextCount > 1) {
        // Reset the iframe back to home page
        setIframeKey((k) => k + 1);
        setIsLoading(true);
        return 0;
      }
      setIsLoading(false);
      return nextCount;
    });
  };

  // Virtual viewport dimensions for high fidelity desktop view
  const DESKTOP_VIRTUAL_WIDTH = 1366;
  const DESKTOP_VIRTUAL_HEIGHT = 854; // Fits normal 100vh screens perfectly

  // Calculate scale factor
  const desktopScale = bezelWidth / DESKTOP_VIRTUAL_WIDTH;

  return (
    <div className="w-full flex items-center justify-center px-2 pb-0 pt-0">
      <div className="w-full max-w-4xl flex flex-col items-center transition-all duration-500 ease-in-out origin-top">
        {/* Screen Bezel / Container */}
        <div 
          ref={bezelScreenRef}
          className="relative w-full aspect-[16/10] bg-zinc-950 rounded-t-[1.5rem] border-[12px] border-zinc-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Webcam & Mic indicators */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-850" />
            <span className="w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          {/* Spinner */}
          {isLoading && (
            <div className="absolute inset-0 bg-zinc-950 z-20 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
            </div>
          )}

          {/* The Scaled Interactive Project Iframe */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              key={iframeKey}
              src={url}
              className="border-none bg-zinc-900 origin-top-left"
              style={{
                width: `${DESKTOP_VIRTUAL_WIDTH}px`,
                height: `${DESKTOP_VIRTUAL_HEIGHT}px`,
                transform: `scale(${desktopScale})`,
              }}
              onLoad={handleIframeLoad}
              title={`${title} Desktop View`}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>

        {/* Laptop Base / Deck */}
        <div className="relative w-[106%] h-3.5 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 rounded-b-xl border-t border-zinc-500/30 shadow-lg z-20 flex justify-center">
          {/* Notch for opening lid */}
          <div className="w-20 h-1.5 bg-zinc-800 rounded-b-md" />
        </div>
        {/* Glossy bottom lip drop-shadow */}
        <div className="w-[96%] h-1.5 bg-zinc-950/40 blur-sm rounded-full -mt-0.5" />
      </div>
    </div>
  );
}
