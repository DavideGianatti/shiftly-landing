"use client";

import { useTranslations } from "next-intl";
import { SoftTransitionsValue, ShiftDef, TransitionPair } from "./types";
import { TransitionPairsEditor } from "./TransitionPairsEditor";

interface Props {
  value: SoftTransitionsValue;
  onChange: (v: SoftTransitionsValue) => void;
  shifts: ShiftDef[];
}

export function StepSoftTransitions({ value, onChange, shifts }: Props) {
  const t = useTranslations("SchedulingWidget");

  function handlePairsChange(pairs: TransitionPair[]) {
    onChange({ ...value, pairs });
  }

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepSoftTransitions.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">
        {t("stepSoftTransitions.description")}
      </p>

      <TransitionPairsEditor
        pairs={value.pairs}
        onChange={handlePairsChange}
        shifts={shifts}
      />

    </div>
  );
}
