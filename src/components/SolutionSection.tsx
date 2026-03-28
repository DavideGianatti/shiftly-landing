"use client";

import { useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/SectionWrapper";

export function SolutionSection() {
  const t = useTranslations("Solution");

  return (
    <SectionWrapper id="solution" className="bg-muted/30">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {t("description")}
        </p>
      </div>
    </SectionWrapper>
  );
}
