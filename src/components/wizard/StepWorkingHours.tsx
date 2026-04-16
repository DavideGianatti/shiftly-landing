"use client";

import { useTranslations } from "next-intl";
import { WorkingHoursValue } from "./types";
import { inputXsClass } from "@/lib/classes";

interface Props {
  value: WorkingHoursValue;
  onChange: (v: WorkingHoursValue) => void;
}

export function StepWorkingHours({ value, onChange }: Props) {
  const t = useTranslations("SchedulingWidget");

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepWorkingHours.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">
        {t("stepWorkingHours.description")}
      </p>

      {/* Week / Month toggle */}
      <div className="mb-4 flex gap-2">
        {(["week", "month"] as const).map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => onChange({ ...value, window: w })}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              value.window === w
                ? "border-coral-500 bg-coral-50 text-coral-700"
                : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
            }`}
          >
            {t(`stepWorkingHours.${w}`)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <label className="w-[80px] text-xs font-medium text-stone-600">
            {t("stepWorkingHours.minLabel")}
          </label>
          <input
            type="number"
            value={value.min}
            onChange={(e) => onChange({ ...value, min: e.target.value })}
            placeholder={t("stepWorkingHours.optional")}
            min="0"
            className={`${inputXsClass} w-[80px]`}
          />
          <span className="text-xs text-stone-400">{t("stepWorkingHours.hoursUnit")}</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="w-[80px] text-xs font-medium text-stone-600">
            {t("stepWorkingHours.maxLabel")}
          </label>
          <input
            type="number"
            value={value.max}
            onChange={(e) => onChange({ ...value, max: e.target.value })}
            placeholder={t("stepWorkingHours.optional")}
            min="0"
            className={`${inputXsClass} w-[80px]`}
          />
          <span className="text-xs text-stone-400">{t("stepWorkingHours.hoursUnit")}</span>
        </div>
      </div>

    </div>
  );
}
