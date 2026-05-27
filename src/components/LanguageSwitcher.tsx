"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <>
      {/* Desktop: inline pills */}
      <div className="hidden items-center gap-0.5 md:flex">
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

      {/* Mobile: globe trigger + popover */}
      <div ref={ref} className="relative md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-900/5"
        >
          <Globe className="h-3.5 w-3.5" />
          {t(locale)}
        </button>
        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-2 flex min-w-[5rem] flex-col rounded-lg border border-stone-200 bg-white p-1 shadow-lg"
          >
            {routing.locales
              .filter((loc) => loc !== locale)
              .map((loc) => (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-1.5 text-xs font-semibold text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                >
                  {t(loc)}
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
