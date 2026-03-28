"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DISCOVERY_CALL_URL } from "@/lib/constants";
import { motion } from "framer-motion";

export function CTAButton({
  children,
  variant = "default",
  size = "lg",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <a
        href={DISCOVERY_CALL_URL}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {children}
      </a>
    </motion.div>
  );
}
