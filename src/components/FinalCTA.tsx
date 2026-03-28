"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DISCOVERY_CALL_URL, CONTACT_EMAIL } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const t = useTranslations("FinalCTA");

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            {t("title")}
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-lg text-slate-500">
            One conversation is all it takes to get started.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href={DISCOVERY_CALL_URL}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full bg-indigo-600 px-10 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-200 font-semibold gap-2"
              )}
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm font-medium text-slate-400 underline-offset-4 hover:text-slate-700 hover:underline transition-colors"
            >
              or send us an email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
