"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DISCOVERY_CALL_URL } from "@/lib/constants";

export function FinalCTA() {
  const t = useTranslations("FinalCTA");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      className="bg-gradient-to-br from-indigo-600 to-indigo-800 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          {t("title")}
        </h2>
        <div className="mt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <a
              href={DISCOVERY_CALL_URL}
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-indigo-700 hover:bg-indigo-50"
              )}
            >
              {t("cta")}
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
