"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  function switchLocale(newLocale: string) {
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
    <div className="flex items-center gap-0.5">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`rounded-md px-2 py-1 text-xs font-semibold tracking-wide transition-colors ${
            locale === loc
              ? dark
                ? "bg-white/15 text-white"
                : "bg-primary/10 text-primary"
              : dark
              ? "text-slate-400 hover:text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
