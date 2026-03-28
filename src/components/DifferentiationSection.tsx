"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/SectionWrapper";

export function DifferentiationSection() {
  const t = useTranslations("Differentiation");

  return (
    <SectionWrapper id="differentiation" className="bg-muted/30">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </div>
    </SectionWrapper>
  );
}
