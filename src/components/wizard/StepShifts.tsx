"use client";

import { useTranslations } from "next-intl";
import { Plus, Trash2 } from "lucide-react";
import { ShiftsValue, ShiftDef, nextId } from "./types";
import { NoteField } from "./NoteField";
import { inputXsClass } from "@/lib/classes";

function computeHours(start: string, end: string): string {
  if (!start || !end) return "";
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  const diff =
    endMin > startMin ? endMin - startMin : 24 * 60 - startMin + endMin;
  const h = diff / 60;
  return h % 1 === 0 ? String(h) : h.toFixed(1);
}

function newShift(): ShiftDef {
  return { id: nextId(), name: "", start: "", end: "", hours: "", coverage: "1" };
}

interface Props {
  value: ShiftsValue;
  onChange: (v: ShiftsValue) => void;
}

export function StepShifts({ value, onChange }: Props) {
  const t = useTranslations("SchedulingWidget");

  function updateShift(id: string, field: keyof ShiftDef, val: string) {
    const updated = value.shifts.map((s) => {
      if (s.id !== id) return s;
      const next = { ...s, [field]: val };
      if (field === "start" || field === "end") {
        const start = field === "start" ? val : s.start;
        const end = field === "end" ? val : s.end;
        const auto = computeHours(start, end);
        if (auto) next.hours = auto;
      }
      return next;
    });
    onChange({ ...value, shifts: updated });
  }

  function addShift() {
    onChange({ ...value, shifts: [...value.shifts, newShift()] });
  }

  function removeShift(id: string) {
    onChange({ ...value, shifts: value.shifts.filter((s) => s.id !== id) });
  }

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepShifts.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">{t("stepShifts.description")}</p>

      <div className="flex flex-col gap-2">
        {value.shifts.map((shift) => (
          <div
            key={shift.id}
            className="rounded-lg border border-stone-200 p-2.5 flex flex-col gap-2"
          >
            {/* Row 1: name + remove */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shift.name}
                onChange={(e) => updateShift(shift.id, "name", e.target.value)}
                placeholder={t("stepShifts.namePlaceholder")}
                className={`${inputXsClass} flex-1`}
              />
              <button
                type="button"
                onClick={() => removeShift(shift.id)}
                className="p-1 text-stone-300 hover:text-red-400 transition-colors"
                aria-label={t("stepShifts.removeShift")}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            {/* Row 2: start / end / hours / coverage */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-400 whitespace-nowrap">
                  {t("stepShifts.startLabel")}
                </span>
                <input
                  type="time"
                  value={shift.start}
                  onChange={(e) => updateShift(shift.id, "start", e.target.value)}
                  className={`${inputXsClass} w-[100px]`}
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-400 whitespace-nowrap">
                  {t("stepShifts.endLabel")}
                </span>
                <input
                  type="time"
                  value={shift.end}
                  onChange={(e) => updateShift(shift.id, "end", e.target.value)}
                  className={`${inputXsClass} w-[100px]`}
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-400 whitespace-nowrap">
                  {t("stepShifts.hoursLabel")}
                </span>
                <input
                  type="number"
                  value={shift.hours}
                  onChange={(e) => updateShift(shift.id, "hours", e.target.value)}
                  placeholder="h"
                  min="0"
                  max="24"
                  step="0.5"
                  className={`${inputXsClass} w-[52px]`}
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-stone-400 whitespace-nowrap">
                  {t("stepShifts.coverageLabel")}
                </span>
                <input
                  type="number"
                  value={shift.coverage}
                  onChange={(e) =>
                    updateShift(shift.id, "coverage", e.target.value)
                  }
                  placeholder="#"
                  min="1"
                  className={`${inputXsClass} w-[48px]`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addShift}
        className="mt-2 flex items-center gap-1 text-xs font-medium text-coral-500 hover:text-coral-600 transition-colors"
      >
        <Plus className="h-3.5 w-3.5" />
        {t("stepShifts.addShift")}
      </button>

      <NoteField
        value={value.note}
        onChange={(note) => onChange({ ...value, note })}
      />
    </div>
  );
}
