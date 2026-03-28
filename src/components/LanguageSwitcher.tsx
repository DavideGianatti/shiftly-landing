"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  function switchLocale(newLocale: string) {
    // pathname is like /en/... or /it/... — replace the first segment
    const segments = pathname.split("/");
    const firstSegment = segments[1];
    const hasLocalePrefix = routing.locales.includes(
      firstSegment as (typeof routing.locales)[number]
    );
    if (hasLocalePrefix) {
      segments[1] = newLocale;
      router.push(segments.join("/") || "/");
    } else {
      router.push(`/${newLocale}${pathname === "/" ? "" : pathname}`);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`rounded-md px-2 py-1 text-sm font-medium transition-colors ${
            locale === loc
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
