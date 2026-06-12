"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Deterministic durations — no Math.random() to avoid SSR/client hydration mismatch
const DURATIONS = Array.from({ length: 36 }, (_, i) => 20 + (i % 10));

// On mobile the SVG scales down (~0.56×) making strokes sub-pixel thin.
// These multipliers compensate so lines stay visible below the md breakpoint.
const MOBILE_WIDTH_MULTIPLIER = 2.2;
const MOBILE_OPACITY_MULTIPLIER = 1.3;

export function FloatingPaths({ position }: { position: number }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const widthMul = isMobile ? MOBILE_WIDTH_MULTIPLIER : 1;
  const opacityMul = isMobile ? MOBILE_OPACITY_MULTIPLIER : 1;

  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: (0.3 + i * 0.03) * widthMul,
    opacity: Math.min((0.05 + i * 0.016) * opacityMul, 0.9),
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMin meet">
        {/* Slow drift of the whole group conveys "flow" while every curve's
            endpoints stay well off-screen (paths run from -380,-189 to 684,875). */}
        <motion.g
          initial={{ x: 0, y: 0 }}
          animate={{ x: [0, 14 * position, 0], y: [0, 9, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="#c94f23"
              strokeWidth={path.width}
              initial={{ strokeOpacity: path.opacity }}
              animate={{
                strokeOpacity: [path.opacity * 0.5, path.opacity, path.opacity * 0.5],
              }}
              transition={{
                duration: DURATIONS[path.id],
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
