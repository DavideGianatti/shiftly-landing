"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  UserRoundSearch,
  Scale,
  ShieldCheck,
  FileDown,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const features = [
  {
    key: "feature1",
    icon: CalendarCheck,
    gradient: "from-indigo-500 to-indigo-700",
    glow: "shadow-indigo-200",
  },
  {
    key: "feature2",
    icon: UserRoundSearch,
    gradient: "from-violet-500 to-violet-700",
    glow: "shadow-violet-200",
  },
  {
    key: "feature3",
    icon: Scale,
    gradient: "from-sky-500 to-sky-700",
    glow: "shadow-sky-200",
  },
  {
    key: "feature4",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-emerald-700",
    glow: "shadow-emerald-200",
  },
  {
    key: "feature5",
    icon: FileDown,
    gradient: "from-orange-500 to-orange-700",
    glow: "shadow-orange-200",
  },
] as const;

export function FeaturesSection() {
  const t = useTranslations("Features");

  return (
    <section id="features" className="bg-slate-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-600">Features</p>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ key, icon: Icon, gradient, glow }) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${glow} shadow-md`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {t(`${key}Title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {t(`${key}Description`)}
              </p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-start justify-between rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-7 text-white"
          >
            <p className="text-lg font-bold leading-snug">
              See it in action for your team
            </p>
            <a
              href="#early-access"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              Join early access →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
