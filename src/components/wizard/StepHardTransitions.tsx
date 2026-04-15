"use client";

import { useTranslations } from "next-intl";
import { HardTransitionsValue, ShiftDef, TransitionPair } from "./types";
import { NoteField } from "./NoteField";
import { TransitionPairsEditor } from "./TransitionPairsEditor";
import { inputXsClass } from "@/lib/classes";

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

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepHardTransitions.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">
        {t("stepHardTransitions.description")}
      </p>

      <p className="mb-1.5 text-xs font-medium text-stone-600">
        {t("stepHardTransitions.pairsTitle")}
      </p>
      <TransitionPairsEditor
        pairs={value.pairs}
        onChange={handlePairsChange}
        shifts={shifts}
      />

      <div className="mt-4 flex items-center gap-2">
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

      <NoteField
        value={value.note}
        onChange={(note) => onChange({ ...value, note })}
      />
    </div>
  );
}
