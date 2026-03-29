"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!ref.current) return;
      ref.current.style.setProperty("--sx", e.clientX.toFixed(2));
      ref.current.style.setProperty("--sy", e.clientY.toFixed(2));
    };
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} data-spotlight-card className={className}>
      {children}
    </div>
  );
}
