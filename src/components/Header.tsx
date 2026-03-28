"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DISCOVERY_CALL_URL } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={2.5}>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="8" y1="4" x2="8" y2="9" />
              <line x1="16" y1="4" x2="16" y2="9" />
              <line x1="7" y1="13" x2="10" y2="13" strokeWidth={2} />
              <line x1="7" y1="17" x2="10" y2="17" strokeWidth={2} />
              <line x1="13" y1="13" x2="17" y2="13" strokeWidth={2} />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white">{t("logo")}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
            {t("features")}
          </a>
          <a href="#early-access" className="text-sm font-medium text-slate-300 transition-colors hover:text-white">
            {t("earlyAccess")}
          </a>
          <div className="h-4 w-px bg-white/20" />
          <LanguageSwitcher dark />
          <a
            href={DISCOVERY_CALL_URL}
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold px-5"
            )}
          >
            {t("cta")}
          </a>
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher dark />
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-slate-950 border-white/10">
              <SheetTitle className="text-lg font-semibold text-white">{t("logo")}</SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                <a href="#features" className="text-base font-medium text-slate-300 hover:text-white">
                  {t("features")}
                </a>
                <a href="#early-access" className="text-base font-medium text-slate-300 hover:text-white">
                  {t("earlyAccess")}
                </a>
                <div className="pt-4">
                  <a
                    href={DISCOVERY_CALL_URL}
                    className={cn(buttonVariants({ size: "default" }), "w-full rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold justify-center")}
                  >
                    {t("cta")}
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
