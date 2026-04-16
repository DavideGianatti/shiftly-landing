"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { HardTransitionsValue, ShiftDef, TransitionPair } from "./types";
import { TransitionPairsEditor } from "./TransitionPairsEditor";
import { inputXsClass } from "@/lib/classes";

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function computeAutoForbidden(shifts: ShiftDef[], minRestHours: string): { from: string; to: string }[] {
  const minMin = parseFloat(minRestHours) * 60;
  if (!minMin || isNaN(minMin)) return [];
  const result: { from: string; to: string }[] = [];
  const timed = shifts.filter((s) => s.start && s.end && s.name);
  for (const a of timed) {
    for (const b of timed) {
      const endA = toMinutes(a.end);
      const startB = toMinutes(b.start);
      const rest = (startB - endA + 1440) % 1440;
      if (rest < minMin) {
        result.push({ from: a.name, to: b.name });
      }
    }
  }
  return result;
}

interface Props {
  value: HardTransitionsValue;
  onChange: (v: HardTransitionsValue) => void;
  shifts: ShiftDef[];
}

export function StepHardTransitions({ value, onChange, shifts }: Props) {
  const t = useTranslations("SchedulingWidget");

  function handlePairsChange(pairs: TransitionPair[]) {
    onChange({ ...value, pairs });
  }

  const autoPairs = computeAutoForbidden(shifts, value.minRestHours);

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepHardTransitions.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">
        {t("stepHardTransitions.description")}
      </p>

      <div className="mb-3 flex items-center gap-2">
        <label className="text-xs font-medium text-stone-600 whitespace-nowrap">
          {t("stepHardTransitions.minRestLabel")}
        </label>
        <input
          type="number"
          value={value.minRestHours}
          onChange={(e) =>
            onChange({ ...value, minRestHours: e.target.value })
          }
          min="0"
          max="24"
          step="0.5"
          className={`${inputXsClass} w-[60px]`}
        />
        <span className="text-xs text-stone-400">{t("stepHardTransitions.hoursUnit")}</span>
      </div>

      {autoPairs.length > 0 && (
        <div className="mb-3">
          <p className="mb-1.5 text-xs font-medium text-stone-500">
            {t("stepHardTransitions.autoLabel")}
          </p>
          <div className="flex flex-col gap-1">
            {autoPairs.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-lg bg-stone-50 px-2.5 py-1.5">
                <span className="text-xs text-stone-400">{p.from}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-stone-300" />
                <span className="text-xs text-stone-400">{p.to}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mb-1.5 text-xs font-medium text-stone-600">
        {t("stepHardTransitions.pairsTitle")}
      </p>
      <TransitionPairsEditor
        pairs={value.pairs}
        onChange={handlePairsChange}
        shifts={shifts}
      />

    </div>
  );
}
