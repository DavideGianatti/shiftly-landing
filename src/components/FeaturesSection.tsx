"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  CalendarDays,
  PhoneCall,
  SlidersHorizontal,
  ShieldCheck,
  Share2,
  MessageSquare,
} from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Image from "next/image";

const features = [
  { key: "feature1", icon: CalendarDays },
  { key: "feature2", icon: PhoneCall },
  { key: "feature3", icon: SlidersHorizontal },
  { key: "feature4", icon: ShieldCheck },
  { key: "feature5", icon: Share2 },
  { key: "feature6", icon: MessageSquare },
] as const;

export function FeaturesSection() {
  const t = useTranslations("Features");

  return (
    <section id="features" className="bg-stone-50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-coral-500">
            Features
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-stone-900 md:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ key, icon: Icon }) => (
            <motion.div key={key} variants={fadeInUp}>
              <SpotlightCard className="relative h-full rounded-2xl border border-stone-200 bg-white p-7">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-coral-50">
                  <Icon className="h-5 w-5 text-coral-500" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-stone-900">
                  {t(`${key}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {t(`${key}Description`)}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Product screenshot — sick leave feature */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="mt-20"
        >
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="px-8 pt-10 pb-6 text-center md:px-14">
              <p className="text-sm font-semibold uppercase tracking-widest text-coral-500">
                {t("sickCallBadge")}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-stone-900 md:text-3xl">
                {t("sickCallTitle")}
              </h3>
              <p className="mt-3 text-base text-stone-500 max-w-lg mx-auto">
                {t("sickCallDescription")}
              </p>
            </div>
            <div className="px-6 pb-6 md:px-10">
              <div className="overflow-hidden rounded-xl border border-stone-200 shadow-sm">
                <Image
                  src="/screenshots/swap_sick_leave_request.png"
                  alt="Shiftly sick leave swap interface"
                  width={1200}
                  height={500}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
