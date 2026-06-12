"use client";

import { motion } from "framer-motion";

// Deterministic durations — no Math.random() to avoid SSR/client hydration mismatch
const DURATIONS = Array.from({ length: 36 }, (_, i) => 20 + (i % 10));


export function FloatingPaths({ position }: { position: number }) {
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
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMin meet">
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
