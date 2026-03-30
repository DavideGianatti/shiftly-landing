"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { buttonVariants } from "@/components/ui/button";
import { useContactModal } from "@/components/ContactModalProvider";
import { cn } from "@/lib/utils";

const perkKeys = ["perk1", "perk2", "perk3", "perk4"] as const;

export function EarlyAccessSection() {
  const t = useTranslations("EarlyAccess");
  const { openContactModal } = useContactModal();

  return (
    <section id="early-access" className="relative overflow-hidden bg-background py-24 md:py-32">
      <DottedSurface className="z-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="rounded-3xl border border-stone-200 bg-white px-10 py-14 text-center shadow-sm md:px-16 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral-500">Early Access</p>
          <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-stone-900 md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-stone-500">
            {t("description")}
          </p>

          <button
            onClick={openContactModal}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-10 rounded-full bg-coral-600 px-10 text-white hover:bg-coral-700 font-semibold gap-2"
            )}
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </button>

          <ul className="mt-10 flex flex-col items-start gap-3 text-left sm:mx-auto sm:max-w-xs">
            {perkKeys.map((key) => (
              <li key={key} className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral-100">
                  <Check className="h-3 w-3 text-coral-600" />
                </div>
                <span className="text-sm text-stone-600">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
