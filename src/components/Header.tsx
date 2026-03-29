"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Menu, Activity } from "lucide-react";
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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-stone-200 bg-white/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-coral-500" />
          <span className="text-lg font-semibold text-stone-900">{t("logo")}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-stone-500 transition-colors hover:text-stone-900">
            {t("features")}
          </a>
          <a href="#early-access" className="text-sm font-medium text-stone-500 transition-colors hover:text-stone-900">
            {t("earlyAccess")}
          </a>
          <div className="h-4 w-px bg-stone-200" />
          <LanguageSwitcher />
          <a
            href={DISCOVERY_CALL_URL}
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full bg-stone-900 text-white hover:bg-stone-700 font-semibold px-5"
            )}
          >
            {t("cta")}
          </a>
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="sm" className="text-stone-600 hover:bg-stone-100 hover:text-stone-900" />}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white border-stone-200">
              <SheetTitle className="flex items-center gap-2 text-lg font-semibold text-stone-900">
                <Activity className="h-5 w-5 text-coral-500" />
                {t("logo")}
              </SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                <a href="#features" className="text-base font-medium text-stone-600 hover:text-stone-900">
                  {t("features")}
                </a>
                <a href="#early-access" className="text-base font-medium text-stone-600 hover:text-stone-900">
                  {t("earlyAccess")}
                </a>
                <div className="pt-4">
                  <a
                    href={DISCOVERY_CALL_URL}
                    className={cn(buttonVariants({ size: "default" }), "w-full rounded-full bg-stone-900 text-white hover:bg-stone-700 font-semibold justify-center")}
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
