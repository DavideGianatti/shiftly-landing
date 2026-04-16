"use client";

import { useTranslations } from "next-intl";
import { WeekendBalance, WeekendValue } from "./types";

const OPTIONS: WeekendBalance[] = ["balance", "minimize", "not_relevant"];

interface Props {
  value: WeekendValue;
  onChange: (v: WeekendValue) => void;
}

export function StepWeekends({ value, onChange }: Props) {
  const t = useTranslations("SchedulingWidget");

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepWeekends.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">{t("stepWeekends.description")}</p>

      <div className="flex flex-col gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange({ ...value, balance: opt })}
            className={`rounded-lg border p-3 text-left text-xs font-medium transition-colors ${
              value.balance === opt
                ? "border-coral-500 bg-coral-50 text-coral-700"
                : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
            }`}
          >
            {t(`stepWeekends.${opt}`)}
          </button>
        ))}
      </div>

    </div>
  );
}
