"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/SectionWrapper";
import { CTAButton } from "@/components/CTAButton";

export function EarlyAccessSection() {
  const t = useTranslations("EarlyAccess");

  return (
    <SectionWrapper id="early-access">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
        <div className="mt-8">
          <CTAButton>{t("cta")}</CTAButton>
        </div>
      </div>
    </SectionWrapper>
  );
}
