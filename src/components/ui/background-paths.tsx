"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Deterministic durations — no Math.random() to avoid SSR/client hydration mismatch
const DURATIONS = Array.from({ length: 36 }, (_, i) => 20 + (i % 10));

// Desktop fits the full coordinate space; mobile crops to a centered ~2× zoom
// (half width × half height, same 2.2 aspect ratio) so the lines don't render
// tiny and sub-pixel thin on narrow screens.
const DESKTOP_VIEWBOX = "0 0 696 316";
const MOBILE_VIEWBOX = "174 79 348 158";


export function FloatingPaths({ position }: { position: number }) {
  // Defaults to desktop for SSR, then switches on the client to avoid hydration mismatch.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.3 + i * 0.03,
    opacity: 0.05 + i * 0.016,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full" viewBox={isMobile ? MOBILE_VIEWBOX : DESKTOP_VIEWBOX} fill="none" preserveAspectRatio="xMidYMin meet">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#c94f23"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: DURATIONS[path.id],
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
