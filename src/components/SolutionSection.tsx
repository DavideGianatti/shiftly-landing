"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  { n: "1", title: "Define your rules", desc: "Set legal requirements, team constraints and employee preferences once." },
  { n: "2", title: "Generate the schedule", desc: "Shiftly creates an optimal schedule in a few clicks." },
  { n: "3", title: "Review & publish", desc: "Make adjustments if needed, then share with your team." },
];

export function SolutionSection() {
  const t = useTranslations("Solution");

  return (
    <section id="solution" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-600">The Solution</p>
          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-500">{t("description")}</p>
        </motion.div>

        {/* 3-step flow */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-16 grid gap-4 md:grid-cols-3"
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeInUp} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-full z-10 hidden h-px w-4 bg-gradient-to-r from-indigo-200 to-transparent md:block" />
              )}
              <div className="group rounded-2xl border border-slate-100 bg-slate-50 p-7 transition-shadow duration-300 hover:shadow-lg hover:shadow-indigo-50">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-black text-white shadow-md shadow-indigo-200">
                  {step.n}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-indigo-500">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Done in minutes
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
