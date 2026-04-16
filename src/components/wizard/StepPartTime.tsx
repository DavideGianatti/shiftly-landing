"use client";

import { useTranslations } from "next-intl";
import { Plus, Trash2 } from "lucide-react";
import { PartTimeRow, PartTimeValue, nextId } from "./types";
import { inputXsClass } from "@/lib/classes";

interface Props {
  value: PartTimeValue;
  onChange: (v: PartTimeValue) => void;
}

export function StepPartTime({ value, onChange }: Props) {
  const t = useTranslations("SchedulingWidget");

  function setHasPartTime(v: boolean) {
    onChange({
      ...value,
      hasPartTime: v,
      rows: v && value.rows.length === 0 ? [{ id: nextId(), count: "1", percent: "50" }] : value.rows,
    });
  }

  function addRow() {
    const row: PartTimeRow = { id: nextId(), count: "1", percent: "50" };
    onChange({ ...value, rows: [...value.rows, row] });
  }

  function updateRow(id: string, field: "count" | "percent", val: string) {
    onChange({
      ...value,
      rows: value.rows.map((r) => (r.id === id ? { ...r, [field]: val } : r)),
    });
  }

  function removeRow(id: string) {
    onChange({ ...value, rows: value.rows.filter((r) => r.id !== id) });
  }

  return (
    <div>
      <p className="mb-1 text-sm font-semibold text-stone-800">
        {t("stepPartTime.title")}
      </p>
      <p className="mb-3 text-xs text-stone-500">{t("stepPartTime.description")}</p>

      {/* Yes / No */}
      <div className="mb-4 flex gap-2">
        {([true, false] as const).map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => setHasPartTime(v)}
            className={`rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors ${
              value.hasPartTime === v
                ? "border-coral-500 bg-coral-50 text-coral-700"
                : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
            }`}
          >
            {v ? t("stepPartTime.yes") : t("stepPartTime.no")}
          </button>
        ))}
      </div>

      {value.hasPartTime && (
        <div className="flex flex-col gap-1.5">
          {value.rows.map((row) => (
            <div key={row.id} className="flex items-center gap-2">
              <input
                type="number"
                value={row.count}
                onChange={(e) => updateRow(row.id, "count", e.target.value)}
                min="1"
                className={`${inputXsClass} w-[52px]`}
              />
              <span className="text-xs text-stone-500">{t("stepPartTime.workersAt")}</span>
              <input
                type="number"
                value={row.percent}
                onChange={(e) => updateRow(row.id, "percent", e.target.value)}
                min="1"
                max="99"
                className={`${inputXsClass} w-[52px]`}
              />
              <span className="text-xs text-stone-400">% FTE</span>
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="p-1 text-stone-300 hover:text-red-400 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRow}
            className="mt-1 flex items-center gap-1 text-xs font-medium text-coral-500 hover:text-coral-600 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            {t("stepPartTime.addRow")}
          </button>
        </div>
      )}

    </div>
  );
}
