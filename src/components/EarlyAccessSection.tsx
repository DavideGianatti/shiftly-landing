"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { DottedSurface } from "@/components/ui/dotted-surface";
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
    <section id="early-access" className="relative overflow-hidden bg-background py-24 md:py-32">
      <DottedSurface className="z-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="px-10 py-14 text-center md:px-16 md:py-20"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-coral-500">Early Access</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-stone-900 md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-500">
            {t("description")}
          </p>

          <a
            href={DISCOVERY_CALL_URL}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-10 rounded-full bg-stone-900 px-10 text-white hover:bg-stone-700 font-semibold gap-2"
            )}
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </a>

          <ul className="mt-10 flex flex-col items-start gap-3 text-left sm:mx-auto sm:max-w-xs">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral-100">
                  <Check className="h-3 w-3 text-coral-600" />
                </div>
                <span className="text-sm text-stone-600">{perk}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
