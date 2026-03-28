"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn, fadeIn } from "@/lib/animations";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const staff = [
  { name: "Maria R.", role: "RN", avatar: "MR" },
  { name: "James K.", role: "LPN", avatar: "JK" },
  { name: "Aisha L.", role: "RN", avatar: "AL" },
  { name: "Sofia B.", role: "PA", avatar: "SB" },
  { name: "Tom C.", role: "RN", avatar: "TC" },
];

type ShiftType = "morning" | "afternoon" | "night" | "off";

const schedule: ShiftType[][] = [
  ["morning", "morning", "off",       "afternoon", "morning",   "off",       "night"],
  ["afternoon","off",    "morning",   "morning",   "afternoon", "night",     "off"],
  ["night",   "morning", "afternoon", "off",       "morning",   "morning",   "off"],
  ["off",     "afternoon","night",    "morning",   "off",       "afternoon", "morning"],
  ["morning", "night",   "morning",   "off",       "night",     "morning",   "afternoon"],
];

const shiftConfig: Record<ShiftType, { label: string; bg: string; text: string; dot: string }> = {
  morning:   { label: "07–15", bg: "bg-indigo-500/20",  text: "text-indigo-200",  dot: "bg-indigo-400" },
  afternoon: { label: "14–22", bg: "bg-violet-500/20",  text: "text-violet-200",  dot: "bg-violet-400" },
  night:     { label: "22–06", bg: "bg-slate-600/40",   text: "text-slate-300",   dot: "bg-slate-400" },
  off:       { label: "Off",   bg: "bg-transparent",    text: "text-slate-600",   dot: "" },
};

export function ScheduleGridMockup() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative"
    >
      {/* Glow behind the card */}
      <div className="absolute -inset-4 rounded-2xl bg-indigo-600/20 blur-2xl" />

      <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl shadow-2xl">
        {/* Card header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Weekly Schedule</p>
            <p className="text-xs text-slate-500">Ward B — March 2025</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">Auto-generated</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mb-4 flex items-center gap-4">
          {(["morning", "afternoon", "night"] as ShiftType[]).map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full ${shiftConfig[s].dot}`} />
              <span className="text-xs text-slate-500 capitalize">{s}</span>
            </div>
          ))}
        </div>

        {/* Day headers */}
        <div className="mb-2 grid grid-cols-8 gap-1">
          <div />
          {days.map((day) => (
            <div key={day} className="text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              {day}
            </div>
          ))}
        </div>

        {/* Schedule rows */}
        <motion.div
          variants={staggerContainer}
          className="space-y-1.5"
        >
          {staff.map((person, rowIdx) => (
            <motion.div
              key={person.name}
              variants={scaleIn}
              className="grid grid-cols-8 items-center gap-1"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-1.5 pr-1">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600/30 text-[9px] font-bold text-indigo-300">
                  {person.avatar}
                </div>
              </div>

              {/* Shift cells */}
              {schedule[rowIdx].map((shift, colIdx) => {
                const cfg = shiftConfig[shift];
                return (
                  <div
                    key={colIdx}
                    className={`flex h-8 items-center justify-center rounded-md ${cfg.bg}`}
                  >
                    {shift !== "off" ? (
                      <span className={`text-[10px] font-semibold ${cfg.text}`}>
                        {cfg.label}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-700">—</span>
                    )}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer bar */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">All constraints satisfied</span>
          </div>
          <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
            Published
          </span>
        </div>
      </div>
    </motion.div>
  );
}
