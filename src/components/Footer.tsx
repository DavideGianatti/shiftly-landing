"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/30 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-foreground">{t("brand")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("tagline")}</p>
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:items-end">
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition-colors hover:text-foreground"
            >
              {CONTACT_EMAIL}
            </a>
            <Link
              href={`/${locale}/privacy`}
              className="transition-colors hover:text-foreground"
            >
              {t("privacy")}
            </Link>
          </div>
          <p>
            &copy; {year} Shiftly. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
