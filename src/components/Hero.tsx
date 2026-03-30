"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { FloatingPaths } from "@/components/ui/background-paths";
import { DISCOVERY_CALL_URL } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Animated background paths */}
      <div className="absolute inset-0 opacity-40">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Text block — centered */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-coral-500">
            {t("supporting")}
          </p>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-stone-500 md:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={DISCOVERY_CALL_URL}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-stone-900 px-8 text-white hover:bg-stone-700 font-semibold gap-2"
              )}
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#features"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
            >
              {t("secondaryCta")}
            </motion.a>
          </div>
        </motion.div>

        {/* Product screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mt-16 md:mt-20"
        >
          {/* Browser chrome */}
          <div className="overflow-hidden rounded-xl border border-stone-200 shadow-xl shadow-stone-200/60">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-stone-300" />
                <div className="h-3 w-3 rounded-full bg-stone-300" />
                <div className="h-3 w-3 rounded-full bg-stone-300" />
              </div>
              <div className="ml-2 h-5 flex-1 rounded-md bg-stone-200/70 max-w-xs" />
            </div>
            <Image
              src="/screenshots/spreadsheet_with_shifts.png"
              alt="Shiftly schedule view — color-coded shifts for your whole team"
              width={1200}
              height={540}
              className="w-full"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
