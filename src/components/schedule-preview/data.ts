import {
  Coffee,
  Sun,
  Moon,
  Home,
  Bed,
  Stethoscope,
  TreePalm,
  type LucideIcon,
} from "lucide-react";

export type ShiftCode =
  | "morning"
  | "afternoon"
  | "night"
  | "dayOff"
  | "rest"
  | "sick"
  | "vacation";

export interface ShiftStyle {
  bg: string;
  text: string;
  border: string;
  icon: LucideIcon;
  short: string;
}

export const shiftStyles: Record<ShiftCode, ShiftStyle> = {
  morning: {
    bg: "bg-sky-100",
    text: "text-sky-700",
    border: "border-sky-200",
    icon: Coffee,
    short: "M",
  },
  afternoon: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    border: "border-orange-200",
    icon: Sun,
    short: "A",
  },
  night: {
    bg: "bg-indigo-900",
    text: "text-indigo-100",
    border: "border-indigo-700",
    icon: Moon,
    short: "N",
  },
  dayOff: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: Home,
    short: "O",
  },
  rest: {
    bg: "bg-indigo-900",
    text: "text-indigo-100",
    border: "border-indigo-700",
    icon: Bed,
    short: "R",
  },
  sick: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    icon: Stethoscope,
    short: "S",
  },
  vacation: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: TreePalm,
    short: "V",
  },
};

// Pattern: M, M, A, A, N, N, R, O, O — each nurse starts at a different offset
const ROTATION: ShiftCode[] = [
  "morning", "morning", "afternoon", "afternoon",
  "night", "night", "rest", "dayOff", "dayOff",
];
const DAYS_IN_MONTH = 31; // March 2026

// Varied offsets per nurse (not sequential) so rows look organic, not like a diagonal wave.
// Constraints: nurse 3 → offset 5 (morning on day 4), nurse 2 → offset 3 (dayOff on day 4),
// nurse 6 → offset 4 (dayOff on day 4) — required by the swap preview.
const NURSE_OFFSETS = [0, 7, 3, 5, 1, 8, 4, 2];

export const scheduleData: (ShiftCode | null)[][] = Array.from(
  { length: 8 },
  (_, nurseIdx) =>
    Array.from({ length: DAYS_IN_MONTH }, (_, dayIdx) =>
      ROTATION[(dayIdx + NURSE_OFFSETS[nurseIdx]) % ROTATION.length]
    )
);

// Swap preview: Diana (index 3) calls in sick on March 5 (day index 4, a morning)
// Charlie (index 2) and Grace (index 6) both have dayOff that day — good candidates
export const SICK_NURSE_INDEX = 3;
export const SICK_DAY_INDEX = 4;

export const swapCandidateIndices = [2, 6];

export const swapSuggestions = [
  { nurseIndex: 2, descriptionKey: "suggestion1Desc" },
  { nurseIndex: 6, descriptionKey: "suggestion2Desc" },
];
