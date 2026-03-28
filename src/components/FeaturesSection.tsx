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
import { SectionWrapper } from "@/components/SectionWrapper";

const features = [
  { key: "feature1", icon: CalendarCheck },
  { key: "feature2", icon: UserRoundSearch },
  { key: "feature3", icon: Scale },
  { key: "feature4", icon: ShieldCheck },
  { key: "feature5", icon: FileDown },
] as const;

export function FeaturesSection() {
  const t = useTranslations("Features");

  return (
    <SectionWrapper id="features">
      <h2 className="text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {t("title")}
      </h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map(({ key, icon: Icon }) => (
          <motion.div
            key={key}
            variants={fadeInUp}
            className="rounded-xl border border-border/60 bg-white p-6 transition-shadow duration-200 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {t(`${key}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t(`${key}Description`)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
