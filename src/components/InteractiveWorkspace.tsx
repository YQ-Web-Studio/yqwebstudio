"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface InteractiveWorkspaceProps {
  url: string;
  title?: string;
  screenshotUrl?: string;
}

/** How long to wait for the iframe before falling back to the screenshot (ms) */
const IFRAME_TIMEOUT_MS = 10_000;

/** Virtual viewport the iframe renders at before being scaled down */
const DESKTOP_VIRTUAL_WIDTH = 1366;
const DESKTOP_VIRTUAL_HEIGHT = 854;

export default function InteractiveWorkspace({
  url,
  title = "Live Preview",
  screenshotUrl,
}: InteractiveWorkspaceProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [bezelWidth, setBezelWidth] = useState(1024);
  const [loadCount, setLoadCount] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeError, setIframeError] = useState(false);

  const bezelScreenRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Use a ref so the timeout callback can read the latest screenshotUrl without
  // being listed as an effect dependency (we only want to re-arm on iframeKey).
  const screenshotUrlRef = useRef(screenshotUrl);
  screenshotUrlRef.current = screenshotUrl;

  // ── Bezel width observer ──────────────────────────────────────────────────
  useEffect(() => {
    const updateSize = () => {
      if (bezelScreenRef.current) {
        setBezelWidth(bezelScreenRef.current.clientWidth);
      }
    };
    updateSize();

    const observer = new ResizeObserver(updateSize);
    if (bezelScreenRef.current) observer.observe(bezelScreenRef.current);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // ── Iframe load-failure timeout ───────────────────────────────────────────
  // Every time the iframe (re-)mounts we reset the error state and start a
  // fresh countdown. If the iframe fires onLoad first the timeout is cancelled.
  // If no onLoad arrives before the deadline we fall back to the screenshot.
  useEffect(() => {
    setIframeError(false);
    setIsLoading(true);

    if (!screenshotUrlRef.current) return; // no fallback available, skip

    timeoutRef.current = setTimeout(() => {
      setIframeError(true);
      setIsLoading(false);
    }, IFRAME_TIMEOUT_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeKey]);

  // ── Iframe load handler ───────────────────────────────────────────────────
  const handleIframeLoad = useCallback(() => {
    // Cancel the fallback timeout — iframe loaded successfully
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setLoadCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount > 1) {
        // User navigated away inside the iframe — reset back to the home page
        setIframeKey((k) => k + 1);
        setIsLoading(true);
        return 0;
      }
      setIsLoading(false);
      return nextCount;
    });
  }, []); // all dependencies are stable refs or setter functions

  // ── Scale factor ──────────────────────────────────────────────────────────
  const desktopScale = bezelWidth / DESKTOP_VIRTUAL_WIDTH;

  return (
    <div className="w-full flex items-center justify-center px-2 pb-0 pt-0">
      <div className="w-full max-w-4xl flex flex-col items-center transition-all duration-500 ease-in-out origin-top">

        {/* ── Screen Bezel ────────────────────────────────────────────────── */}
        <div
          ref={bezelScreenRef}
          className="relative w-full aspect-[16/10] bg-zinc-950 rounded-t-[1.5rem] border-[12px] border-zinc-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Webcam & mic indicators */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-850" />
            <span className="w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          {/* Loading spinner — only shown when there is no screenshot to act as a placeholder */}
          {isLoading && !screenshotUrl && !iframeError && (
            <div className="absolute inset-0 bg-zinc-950 z-20 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
            </div>
          )}

          {/* ── Content area ────────────────────────────────────────────── */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">

            {iframeError && screenshotUrl ? (
              /* ── Screenshot fallback (iframe timed-out / blocked) ──── */
              <div className="w-full h-full flex flex-col bg-zinc-950">
                {/* Mock browser chrome */}
                <div className="w-full h-6 bg-zinc-900 border-b border-zinc-800/80 flex items-center px-2.5 gap-2 shrink-0 select-none pointer-events-none">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 max-w-[160px] mx-auto h-3.5 rounded bg-zinc-950 border border-zinc-850/50 flex items-center justify-center">
                    <span className="text-[8px] text-zinc-500 font-sans tracking-wide truncate">
                      {url.replace("https://", "").replace("www.", "")}
                    </span>
                  </div>
                </div>

                {/* Screenshot image */}
                <div className="flex-1 w-full overflow-hidden bg-zinc-950 relative">
                  <img
                    src={screenshotUrl}
                    alt={`${title} Preview`}
                    className="w-full h-full object-cover object-top select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Compact status bar */}
                <div className="w-full h-3.5 bg-zinc-950 flex items-center justify-between px-2.5 border-t border-zinc-900/40 shrink-0 select-none pointer-events-none">
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  </div>
                  <div className="text-[6px] text-zinc-500 font-mono">17:59</div>
                </div>
              </div>

            ) : (
              /* ── Live interactive iframe (all devices) ─────────────── */
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
                title={`${title} View`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}
          </div>
        </div>

        {/* ── Laptop base / deck ──────────────────────────────────────────── */}
        <div className="relative w-[106%] h-3.5 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 rounded-b-xl border-t border-zinc-500/30 shadow-lg z-20 flex justify-center">
          <div className="w-20 h-1.5 bg-zinc-800 rounded-b-md" />
        </div>
        <div className="w-[96%] h-1.5 bg-zinc-950/40 blur-sm rounded-full -mt-0.5" />
      </div>
    </div>
  );
}
