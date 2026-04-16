"use client";

import { useTranslations } from "next-intl";
import { ConsecutivePreference, ConsecutiveValue, ShiftDef } from "./types";

const PREFS: ConsecutivePreference[] = [
  "none",
  "prefer_pairs",
  "max_2",
  "max_3",
];

interface Props {
  value: ConsecutiveValue;
  onChange: (v: ConsecutiveValue) => void;
  shifts: ShiftDef[];
}

export function StepConsecutive({ value, onChange, shifts }: Props) {
  const t = useTranslations("SchedulingWidget");
  const workingShifts = shifts.filter((s) => s.name.trim());

  function setPref(shiftName: string, pref: ConsecutivePreference) {
    onChange({
      ...value,
      perShift: { ...value.perShift, [shiftName]: pref },
    });
  }

  if (workingShifts.length === 0) {
    return (
      <div>
        <p className="mb-1 text-sm font-semibold text-stone-800">
          {t("stepConsecutive.title")}
        </p>
        <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2.5 text-xs text-stone-400">
          {t("stepConsecutive.needShiftsHint")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepConsecutive.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">{t("stepConsecutive.description")}</p>

      <div className="flex flex-col gap-3">
        {workingShifts.map((shift) => {
          const current = value.perShift[shift.name] ?? "none";
          return (
            <div key={shift.id}>
              <p className="mb-1 text-xs font-semibold text-stone-700">
                {shift.name}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {PREFS.map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setPref(shift.name, pref)}
                    className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      current === pref
                        ? "border-coral-500 bg-coral-50 text-coral-700"
                        : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
                    }`}
                  >
                    {t(`stepConsecutive.${pref}`)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
