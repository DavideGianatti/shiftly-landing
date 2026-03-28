"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-slate-50 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="8" y1="4" x2="8" y2="9" />
                  <line x1="16" y1="4" x2="16" y2="9" />
                  <line x1="7" y1="13" x2="10" y2="13" strokeWidth={2} />
                  <line x1="7" y1="17" x2="10" y2="17" strokeWidth={2} />
                  <line x1="13" y1="13" x2="17" y2="13" strokeWidth={2} />
                </svg>
              </div>
              <span className="text-base font-bold text-slate-900">{t("brand")}</span>
            </div>
            <p className="mt-1.5 text-sm text-slate-500 max-w-xs">{t("tagline")}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-5 md:items-end">
            <LanguageSwitcher />
            <div className="flex items-center gap-5 text-sm text-slate-500">
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-slate-800">
                {CONTACT_EMAIL}
              </a>
              <Link
                href={`/${locale}/privacy`}
                className="transition-colors hover:text-slate-800"
              >
                {t("privacy")}
              </Link>
            </div>
            <p className="text-xs text-slate-400">
              &copy; {year} Shiftly. {t("rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
