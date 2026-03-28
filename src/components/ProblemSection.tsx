"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, RefreshCw, Phone, AlertTriangle } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const bullets = [
  { key: "bullet1", icon: Clock,          color: "text-amber-400",  bg: "bg-amber-400/10",  border: "border-amber-400/20" },
  { key: "bullet2", icon: RefreshCw,       color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
  { key: "bullet3", icon: Phone,           color: "text-rose-400",   bg: "bg-rose-400/10",   border: "border-rose-400/20" },
  { key: "bullet4", icon: AlertTriangle,   color: "text-red-400",    bg: "bg-red-400/10",    border: "border-red-400/20" },
] as const;

export function ProblemSection() {
  const t = useTranslations("Problem");

  return (
    <section id="problem" className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
      {/* Subtle bottom fade from hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-rose-400">The Problem</p>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg text-slate-400">{t("description")}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-16 grid gap-4 sm:grid-cols-2"
        >
          {bullets.map(({ key, icon: Icon, color, bg, border }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className={`flex items-start gap-4 rounded-2xl border ${border} ${bg} p-6 backdrop-blur-sm`}
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} border ${border}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="text-base leading-relaxed text-slate-300">{t(key)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
