"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
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
    const onMouse = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
    };
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
            className={`rounded-md px-2 py-1 text-xs font-semibold tracking-wide transition-colors duration-150 ${
              locale === loc
                ? "bg-stone-900/10 text-stone-900"
                : "text-stone-400 hover:text-stone-700"
            }`}
          >
            {t(loc)}
          </Link>
        ))}
      </div>

      {/* Mobile: globe trigger + animated popover */}
      <div ref={ref} className="relative md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-stone-700 transition-colors duration-150 hover:bg-stone-900/5"
        >
          <Globe className="h-3.5 w-3.5" />
          {t(locale)}
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, scale: 0.95, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -6 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              style={{ transformOrigin: "top right" }}
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
                    className="rounded-md px-2 py-1.5 text-xs font-semibold text-stone-500 transition-colors duration-150 hover:bg-stone-100 hover:text-stone-900"
                  >
                    {t(loc)}
                  </Link>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
