"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Activity } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Activity className="h-5 w-5 text-coral-500" />
              <span className="text-base font-bold text-stone-900">{t("brand")}</span>
            </div>
            <p className="mt-1.5 text-sm text-stone-500 max-w-xs">{t("tagline")}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-4 md:items-end">
            <LanguageSwitcher />
            <div className="flex items-center gap-5 text-sm text-stone-500">
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-stone-800">
                {CONTACT_EMAIL}
              </a>
              <Link
                href={`/${locale}/privacy`}
                className="transition-colors hover:text-stone-800"
              >
                {t("privacy")}
              </Link>
            </div>
            <p className="text-xs text-stone-400">
              &copy; {year} Shiftly. {t("rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
