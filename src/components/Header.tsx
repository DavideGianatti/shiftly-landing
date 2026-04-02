"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useContactModal } from "@/components/ContactModalProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("Header");
  const { openContactModal } = useContactModal();
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
          <button
            onClick={openContactModal}
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full bg-stone-900 text-white hover:bg-stone-700 font-semibold px-5"
            )}
          >
            {t("cta")}
          </button>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
