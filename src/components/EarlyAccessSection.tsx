"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { buttonVariants } from "@/components/ui/button";
import { DISCOVERY_CALL_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const perks = [
  "Direct access to the founding team",
  "Shape the product roadmap",
  "Priority onboarding & support",
  "Early partner pricing",
];

export function EarlyAccessSection() {
  const t = useTranslations("EarlyAccess");

  return (
    <section id="early-access" className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950">
          <div className="grid md:grid-cols-2">
            {/* Left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInUp}
              className="p-10 md:p-14"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-xs font-semibold text-indigo-300">Limited spots available</span>
              </div>

              <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-400">{t("description")}</p>

              <motion.a
                href={DISCOVERY_CALL_URL}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 rounded-full bg-indigo-600 px-8 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 font-semibold gap-2"
                )}
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>

            {/* Right — perks */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
              className="flex flex-col justify-center gap-4 border-t border-white/5 bg-white/[0.02] p-10 md:border-t-0 md:border-l md:p-14"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/20">
                  <Users className="h-5 w-5 text-indigo-400" />
                </div>
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">What you get</p>
              </div>

              {perks.map((perk, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  </div>
                  <p className="text-base text-slate-300">{perk}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
