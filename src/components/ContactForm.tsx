"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { CheckCircle, Loader2 } from "lucide-react";
import { submitContact, ContactActionState } from "@/lib/actions/contact";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/lib/constants";

const TEAM_SIZE_OPTIONS = ["1-10", "10-30", "30-100", "100+"] as const;

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("ContactForm");
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        buttonVariants({ size: "lg" }),
        "w-full rounded-full bg-stone-900 text-white hover:bg-stone-700 font-semibold gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      )}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {t("sending")}
        </>
      ) : (
        t("submit")
      )}
    </button>
  );
}

export function ContactForm({ onClose }: { onClose: () => void }) {
  const t = useTranslations("ContactForm");
  const initialState: ContactActionState = { status: "idle" };
  const [state, action] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-coral-100">
          <CheckCircle className="h-7 w-7 text-coral-600" />
        </div>
        <h3 className="text-xl font-bold text-stone-900">{t("successTitle")}</h3>
        <p className="text-stone-500">{t("successMessage")}</p>
        <button
          onClick={onClose}
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "mt-2 rounded-full"
          )}
        >
          {t("close")}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-4">
      {state.status === "error" && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline hover:text-red-900"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      )}

      {/* Honeypot — hidden from users, bots fill it */}
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute -left-[9999px] opacity-0"
        autoComplete="off"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-stone-700">
            {t("nameLabel")} <span className="text-coral-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder={t("namePlaceholder")}
            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-stone-700">
            {t("emailLabel")} <span className="text-coral-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder={t("emailPlaceholder")}
            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="organization" className="text-sm font-medium text-stone-700">
            {t("organizationLabel")}
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            maxLength={200}
            placeholder={t("organizationPlaceholder")}
            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="teamSize" className="text-sm font-medium text-stone-700">
            {t("teamSizeLabel")}
          </label>
          <select
            id="teamSize"
            name="teamSize"
            defaultValue=""
            className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
          >
            <option value="" disabled>
              {t("teamSizePlaceholder")}
            </option>
            {TEAM_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-stone-700">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={1000}
          placeholder={t("messagePlaceholder")}
          className="resize-none rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-200"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
