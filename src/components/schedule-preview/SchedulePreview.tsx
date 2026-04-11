"use client";

import { useLocale, useTranslations } from "next-intl";
import { scheduleData, shiftStyles } from "./data";

const START_DATE = new Date(2026, 2, 1); // March 1, 2026
const DAYS_IN_MONTH = 31;
const NURSE_KEYS = ["nurse1", "nurse2", "nurse3", "nurse4", "nurse5", "nurse6", "nurse7", "nurse8"] as const;

export function SchedulePreview() {
  const locale = useLocale();
  const t = useTranslations("SchedulePreview");

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
    <div className="overflow-x-auto bg-white">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-20 md:w-36 bg-white border-b border-r border-stone-200 px-2 py-2 text-left text-xs font-medium text-stone-400">
              &nbsp;
            </th>
            {days.map((d, i) => (
              <th
                key={i}
                className={`border-b border-stone-200 px-0 py-1.5 text-center w-12 min-w-12 ${
                  d.isSunday ? "bg-stone-50" : ""
                }`}
              >
                <div className="text-[10px] font-medium text-stone-400">
                  {d.narrow}
                </div>
                <div className="text-xs font-semibold text-stone-700">
                  {d.day}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scheduleData.map((row, nurseIdx) => (
            <tr key={nurseIdx}>
              <td className="sticky left-0 z-10 bg-white border-r border-stone-200 px-2 md:px-3 py-0.5 whitespace-nowrap">
                <span className="text-xs md:text-sm font-medium text-stone-700 truncate block w-16 md:w-32">
                  {t(NURSE_KEYS[nurseIdx])}
                </span>
              </td>
              {row.map((shift, dayIdx) => {
                if (!shift) {
                  return (
                    <td key={dayIdx} className={`p-px ${days[dayIdx]?.isSunday ? "bg-stone-50" : ""}`}>
                      <div className="h-8 w-11 rounded border border-stone-100" />
                    </td>
                  );
                }
                const style = shiftStyles[shift];
                const Icon = style.icon;
                return (
                  <td key={dayIdx} className={`p-px ${days[dayIdx]?.isSunday ? "bg-stone-50" : ""}`}>
                    <div
                      className={`h-8 w-11 rounded border flex items-center justify-center ${style.bg} ${style.text} ${style.border}`}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
