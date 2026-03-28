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
import { CTAButton } from "@/components/CTAButton";

export function Header() {
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-white/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold text-primary">
          {t("logo")}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("features")}
          </a>
          <a
            href="#early-access"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("earlyAccess")}
          </a>
          <LanguageSwitcher />
          <CTAButton size="default">{t("cta")}</CTAButton>
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="sm" />}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="text-lg font-bold text-primary">
                {t("logo")}
              </SheetTitle>
              <nav className="mt-8 flex flex-col gap-4">
                <a
                  href="#features"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("features")}
                </a>
                <a
                  href="#early-access"
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("earlyAccess")}
                </a>
                <div className="pt-4">
                  <CTAButton size="default" className="w-full">
                    {t("cta")}
                  </CTAButton>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
