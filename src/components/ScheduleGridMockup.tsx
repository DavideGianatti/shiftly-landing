"use client";

import { motion } from "framer-motion";
import { staggerContainer, scaleIn } from "@/lib/animations";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const staff = ["MR", "JK", "AL", "SB", "TC"];

const shiftColors = [
  "bg-indigo-500",
  "bg-sky-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-indigo-400",
  "bg-sky-500",
  "bg-emerald-500",
];

function getShiftColor(row: number, col: number) {
  return shiftColors[(row * 7 + col) % shiftColors.length];
}

function isOff(row: number, col: number) {
  return (row + col) % 5 === 0;
}

export function ScheduleGridMockup() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="rounded-xl border border-border/60 bg-white p-4 shadow-lg shadow-indigo-100/50"
    >
      {/* Header row */}
      <div className="mb-2 grid grid-cols-8 gap-1.5">
        <div className="text-xs font-medium text-muted-foreground" />
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid rows */}
      {staff.map((name, rowIdx) => (
        <motion.div
          key={name}
          variants={staggerContainer}
          className="mb-1.5 grid grid-cols-8 gap-1.5"
        >
          <div className="flex items-center text-xs font-medium text-foreground/70">
            {name}
          </div>
          {days.map((_, colIdx) => (
            <motion.div
              key={colIdx}
              variants={scaleIn}
              className={`h-7 rounded-md ${
                isOff(rowIdx, colIdx)
                  ? "bg-muted/50"
                  : `${getShiftColor(rowIdx, colIdx)} opacity-80`
              }`}
            />
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}
