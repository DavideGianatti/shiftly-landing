"use client";

import { useTranslations } from "next-intl";
import { ChevronUp, ChevronDown } from "lucide-react";
import { RotationValue, ShiftDef } from "./types";
import { NoteField } from "./NoteField";
import { inputXsClass } from "@/lib/classes";

const PRESET_LENGTHS = ["7", "10", "14", "28"];

interface Props {
  value: RotationValue;
  onChange: (v: RotationValue) => void;
  shifts: ShiftDef[];
}

export function StepRotation({ value, onChange, shifts }: Props) {
  const t = useTranslations("SchedulingWidget");
  const shiftNames = shifts.map((s) => s.name).filter(Boolean);

  function setCycleLength(len: string) {
    const n = Math.max(1, Math.min(60, parseInt(len) || 7));
    const slots = Array.from({ length: n }, (_, i) => value.slots[i] ?? "");
    onChange({ ...value, cycleLength: String(n), slots });
  }

  function setSlot(idx: number, name: string) {
    const slots = [...value.slots];
    slots[idx] = name;
    onChange({ ...value, slots });
  }

  function moveSlot(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= value.slots.length) return;
    const slots = [...value.slots];
    [slots[idx], slots[target]] = [slots[target], slots[idx]];
    onChange({ ...value, slots });
  }

  if (shiftNames.length === 0) {
    return (
      <div>
        <p className="mb-1 text-sm font-semibold text-stone-800">
          {t("stepRotation.title")}
        </p>
        <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2.5 text-xs text-stone-400">
          {t("stepRotation.needShiftsHint")}
        </p>
        <NoteField
          value={value.note}
          onChange={(note) => onChange({ ...value, note })}
        />
      </div>
    );
  }

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepRotation.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">{t("stepRotation.description")}</p>

      {/* Cycle length picker */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-stone-600">
          {t("stepRotation.cycleLengthLabel")}
        </span>
        {PRESET_LENGTHS.map((len) => (
          <button
            key={len}
            type="button"
            onClick={() => setCycleLength(len)}
            className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
              value.cycleLength === len
                ? "border-coral-500 bg-coral-50 text-coral-700"
                : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
            }`}
          >
            {len}d
          </button>
        ))}
        <div className="flex items-center gap-1">
          <span className="text-xs text-stone-400">{t("stepRotation.custom")}</span>
          <input
            type="number"
            value={!PRESET_LENGTHS.includes(value.cycleLength) ? value.cycleLength : ""}
            onChange={(e) => setCycleLength(e.target.value)}
            placeholder="–"
            min="1"
            max="60"
            className={`${inputXsClass} w-[52px]`}
          />
        </div>
      </div>

      {/* Slot list */}
      <div className="flex flex-col gap-1">
        {value.slots.map((slot, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="w-5 shrink-0 text-right text-[10px] text-stone-400">
              {idx + 1}
            </span>
            <select
              value={slot}
              onChange={(e) => setSlot(idx, e.target.value)}
              className={`${inputXsClass} flex-1`}
            >
              <option value="">{t("stepRotation.pickShift")}</option>
              {shiftNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => moveSlot(idx, -1)}
              disabled={idx === 0}
              className="p-0.5 text-stone-300 hover:text-stone-500 disabled:opacity-30 transition-colors"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => moveSlot(idx, 1)}
              disabled={idx === value.slots.length - 1}
              className="p-0.5 text-stone-300 hover:text-stone-500 disabled:opacity-30 transition-colors"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <NoteField
        value={value.note}
        onChange={(note) => onChange({ ...value, note })}
      />
    </div>
  );
}
