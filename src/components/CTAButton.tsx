"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useContactModal } from "@/components/ContactModalProvider";
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
  const { openContactModal } = useContactModal();
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <button
        onClick={openContactModal}
        className={cn(buttonVariants({ variant, size }), className)}
      >
        {children}
      </button>
    </motion.div>
  );
}
