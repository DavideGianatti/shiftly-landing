"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export function DifferentiationSection() {
  const t = useTranslations("Differentiation");

  return (
    <section id="differentiation" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center"
        >
          {/* Large decorative quote mark */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100">
              <Quote className="h-6 w-6 text-indigo-600" />
            </div>
          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Our Story
          </p>

          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
            {t("title")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-slate-500">
            {t("description")}
          </p>

          {/* Divider with signature touch */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-slate-200" />
            <div className="h-2 w-2 rounded-full bg-indigo-400" />
            <div className="h-px w-16 bg-slate-200" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
