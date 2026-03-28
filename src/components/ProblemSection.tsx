"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Clock, RefreshCw, Phone, AlertTriangle } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SectionWrapper } from "@/components/SectionWrapper";

const bullets = [
  { key: "bullet1", icon: Clock },
  { key: "bullet2", icon: RefreshCw },
  { key: "bullet3", icon: Phone },
  { key: "bullet4", icon: AlertTriangle },
] as const;

export function ProblemSection() {
  const t = useTranslations("Problem");

  return (
    <SectionWrapper id="problem">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="mt-12 grid gap-6 sm:grid-cols-2"
      >
        {bullets.map(({ key, icon: Icon }) => (
          <motion.div
            key={key}
            variants={fadeInUp}
            className="flex items-start gap-4 rounded-xl border border-border/60 bg-muted/30 p-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-base text-foreground">{t(key)}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
