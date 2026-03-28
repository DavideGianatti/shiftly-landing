"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import { CTAButton } from "@/components/CTAButton";
import { ScheduleGridMockup } from "@/components/ScheduleGridMockup";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        {/* Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInLeft}
          className="max-w-lg"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTAButton>{t("cta")}</CTAButton>
            <a
              href="#solution"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              {t("secondaryCta")} &darr;
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {t("supporting")}
          </p>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInRight}
          className="hidden md:block"
        >
          <ScheduleGridMockup />
        </motion.div>
      </div>
    </section>
  );
}
