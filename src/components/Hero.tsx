"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { DISCOVERY_CALL_URL } from "@/lib/constants";
import { ScheduleGridMockup } from "@/components/ScheduleGridMockup";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-20 h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full bg-indigo-900/20 blur-[80px]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pt-32 pb-24 md:grid-cols-2 md:pt-40 md:pb-32">
        {/* Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
          className="max-w-xl"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">
              {t("supporting")}
            </span>
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[4.25rem]">
            {t("title")}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-400 md:text-xl">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href={DISCOVERY_CALL_URL}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-indigo-600 px-8 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 font-semibold gap-2"
              )}
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#solution"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {t("secondaryCta")}
              <ChevronDown className="h-4 w-4" />
            </motion.a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8 border-t border-white/10 pt-8">
            {[
              { value: "100%", label: "Rule compliance" },
              { value: "–80%", label: "Planning time" },
              { value: "Fair", label: "Shift distribution" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="mt-0.5 text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mockup */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInRight}
          className="hidden md:block"
        >
          <ScheduleGridMockup />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2"
        >
          <div className="h-2 w-0.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
