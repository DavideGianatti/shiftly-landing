"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export function BrandStatement() {
  const t = useTranslations("BrandStatement");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeIn}
      className="bg-indigo-50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </div>
    </motion.section>
  );
}
