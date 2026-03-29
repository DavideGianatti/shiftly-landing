"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <div className="flex items-center gap-0.5">
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          className={`rounded-md px-2 py-1 text-xs font-semibold tracking-wide transition-colors ${
            locale === loc
              ? "bg-stone-900/10 text-stone-900"
              : "text-stone-400 hover:text-stone-700"
          }`}
        >
          {t(loc)}
        </Link>
      ))}
    </div>
  );
}
