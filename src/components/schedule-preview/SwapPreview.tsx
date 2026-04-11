"use client";

import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle, ArrowRightLeft } from "lucide-react";
import {
  scheduleData,
  shiftStyles,
  swapSuggestions,
  swapCandidateIndices,
  SICK_NURSE_INDEX,
  SICK_DAY_INDEX,
} from "./data";

const NURSE_KEYS = ["nurse1", "nurse2", "nurse3", "nurse4", "nurse5", "nurse6", "nurse7", "nurse8"] as const;
const START_DATE = new Date(2026, 2, 1);

const DAYS_IN_MONTH = 31;

// Reorder nurses like the real app: sick nurse, then candidates, then dimmed rest
const RELEVANT_SET = new Set([SICK_NURSE_INDEX, ...swapCandidateIndices]);
const orderedNurseIndices = [
  SICK_NURSE_INDEX,
  ...swapCandidateIndices,
  ...Array.from({ length: 8 }, (_, i) => i).filter((i) => !RELEVANT_SET.has(i)),
];

export function SwapPreview() {
  const locale = useLocale();
  const t = useTranslations("SwapPreview");
  const tSchedule = useTranslations("SchedulePreview");

  const days = Array.from({ length: DAYS_IN_MONTH }, (_, i) => {
    const d = new Date(START_DATE);
    d.setDate(d.getDate() + i);
    return {
      narrow: d.toLocaleDateString(locale, { weekday: "narrow" }),
      day: d.getDate(),
      isSunday: d.getDay() === 0,
    };
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-stretch">
      {/* Swap sidebar */}
      <div className="w-full md:w-72 shrink-0 rounded-xl border border-stone-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-stone-100 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
            <AlertTriangle className="h-4.5 w-4.5 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">{t("title")}</p>
            <p className="text-xs text-stone-500">
              {t("sickNurse")} &middot; {t("days")}
            </p>
          </div>
        </div>

        {/* Date section */}
        <div className="p-4">
          <p className="mb-3 text-xs font-medium text-stone-400 uppercase tracking-wide">
            {t("date")}
          </p>

          {/* Suggestion cards */}
          <div className="flex flex-col gap-2">
            {swapSuggestions.map((s, i) => (
              <div
                key={i}
                className="rounded-lg border border-stone-200 p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-stone-900 truncate">
                    {t(`suggestion${i + 1}`)}
                  </p>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-md bg-stone-900 px-2.5 py-1 text-[11px] font-medium text-white">
                    {t("swap")}
                    <ArrowRightLeft className="h-3 w-3" />
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-stone-500">
                  {t(s.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule grid — reordered like real app */}
      <div className="flex-1 md:ml-4 rounded-xl border border-stone-200 bg-white shadow-sm overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-20 md:w-36 bg-white border-b border-r border-stone-200 px-2 py-2 text-left text-xs font-medium text-stone-400">
                &nbsp;
              </th>
              {days.map((d, i) => {
                const isHighlightedCol = i === SICK_DAY_INDEX;
                return (
                  <th
                    key={i}
                    className={`border-b border-stone-200 px-0 py-1.5 text-center w-12 min-w-12 relative ${
                      isHighlightedCol ? "bg-coral-100" : d.isSunday ? "bg-stone-50" : ""
                    }`}
                  >
                    <div className={`text-[10px] font-medium ${isHighlightedCol ? "text-coral-700" : "text-stone-400"}`}>
                      {d.narrow}
                    </div>
                    <div className={`text-xs font-semibold ${isHighlightedCol ? "text-coral-800" : "text-stone-700"}`}>
                      {d.day}
                    </div>
                    {isHighlightedCol && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral-500" />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {orderedNurseIndices.map((nurseIdx) => {
              const isSickNurse = nurseIdx === SICK_NURSE_INDEX;
              const isDimmed = !RELEVANT_SET.has(nurseIdx);

              return (
                <tr
                  key={nurseIdx}
                  className={isDimmed ? "opacity-40 grayscale" : ""}
                >
                  <td className="sticky left-0 z-10 bg-white border-r border-stone-200 px-0 py-0.5 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* Coral accent bar for sick nurse */}
                      <div className={`w-1 self-stretch rounded-r ${isSickNurse ? "bg-coral-500" : "bg-transparent"}`} />
                      <span
                        className={`text-xs md:text-sm font-medium truncate block w-16 md:w-32 pl-2 ${
                          isSickNurse ? "text-coral-900 font-semibold" : "text-stone-700"
                        }`}
                      >
                        {tSchedule(NURSE_KEYS[nurseIdx])}
                      </span>
                    </div>
                  </td>
                  {scheduleData[nurseIdx].map((shift, dayIdx) => {
                    if (!shift) {
                      return (
                        <td key={dayIdx} className={`p-px ${days[dayIdx]?.isSunday ? "bg-stone-50" : ""}`}>
                          <div className="h-8 w-11 rounded border border-stone-100" />
                        </td>
                      );
                    }
                    const style = shiftStyles[shift];
                    const Icon = style.icon;
                    const isPendingSick = isSickNurse && dayIdx === SICK_DAY_INDEX;

                    return (
                      <td key={dayIdx} className={`p-px ${!isPendingSick && days[dayIdx]?.isSunday ? "bg-stone-50" : ""}`}>
                        <div
                          className={`h-8 w-11 rounded border flex items-center justify-center ${
                            isPendingSick
                              ? "bg-coral-100 text-coral-900 border-coral-400 ring-2 ring-coral-500 z-10 shadow-md"
                              : `${style.bg} ${style.text} ${style.border}`
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
