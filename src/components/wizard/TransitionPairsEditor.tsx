"use client";

import { useTranslations } from "next-intl";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { TransitionPair, ShiftDef, nextId } from "./types";
import { inputXsClass } from "@/lib/classes";

interface Props {
  pairs: TransitionPair[];
  onChange: (pairs: TransitionPair[]) => void;
  shifts: ShiftDef[];
}

export function TransitionPairsEditor({ pairs, onChange, shifts }: Props) {
  const t = useTranslations("SchedulingWidget");

  const shiftNames = shifts.map((s) => s.name).filter(Boolean);

  function addPair() {
    onChange([
      ...pairs,
      { id: nextId(), from: shiftNames[0] ?? "", to: shiftNames[1] ?? shiftNames[0] ?? "" },
    ]);
  }

  function updatePair(id: string, field: "from" | "to", val: string) {
    onChange(pairs.map((p) => (p.id === id ? { ...p, [field]: val } : p)));
  }

  function removePair(id: string) {
    onChange(pairs.filter((p) => p.id !== id));
  }

  if (shiftNames.length < 2) {
    return (
      <p className="rounded-lg bg-stone-50 px-3 py-2.5 text-xs text-stone-400">
        {t("stepHardTransitions.needShiftsHint")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {pairs.map((pair) => (
        <div key={pair.id} className="flex items-center gap-1.5">
          <select
            value={pair.from}
            onChange={(e) => updatePair(pair.id, "from", e.target.value)}
            className={`${inputXsClass} flex-1`}
          >
            {shiftNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-stone-400" />
          <select
            value={pair.to}
            onChange={(e) => updatePair(pair.id, "to", e.target.value)}
            className={`${inputXsClass} flex-1`}
          >
            {shiftNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => removePair(pair.id)}
            className="p-1 text-stone-300 hover:text-red-400 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addPair}
        className="flex items-center gap-1 text-xs font-medium text-coral-500 hover:text-coral-600 transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
        {t("stepHardTransitions.addPair")}
      </button>
    </div>
  );
}
