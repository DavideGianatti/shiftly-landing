export interface ShiftDef {
  id: string;
  name: string;
  start: string;
  end: string;
  hours: string;
  coverage: string;
}

export interface TransitionPair {
  id: string;
  from: string;
  to: string;
}

export interface ShiftsValue {
  shifts: ShiftDef[];
  note: string;
}

export interface HardTransitionsValue {
  pairs: TransitionPair[];
  minRestHours: string;
  note: string;
}

export interface SoftTransitionsValue {
  pairs: TransitionPair[];
  note: string;
}

export interface WorkingHoursValue {
  window: "week" | "month";
  min: string;
  max: string;
  note: string;
}

export interface RotationValue {
  cycleLength: string;
  slots: string[];
  note: string;
}

export type ConsecutivePreference =
  | "none"
  | "prefer_different"
  | "prefer_pairs"
  | "max_2"
  | "max_3";

export interface ConsecutiveValue {
  perShift: Record<string, ConsecutivePreference>;
  note: string;
}

export type WeekendBalance = "balance" | "minimize" | "not_relevant";

export interface WeekendValue {
  balance: WeekendBalance | null;
  note: string;
}

export interface PartTimeRow {
  id: string;
  count: string;
  percent: string;
}

export interface PartTimeValue {
  hasPartTime: boolean | null;
  rows: PartTimeRow[];
  note: string;
}

export interface UploadValue {
  comment: string;
  note: string;
}

export interface WizardValues {
  shifts: ShiftsValue;
  hardTransitions: HardTransitionsValue;
  softTransitions: SoftTransitionsValue;
  workingHours: WorkingHoursValue;
  rotation: RotationValue;
  consecutive: ConsecutiveValue;
  weekends: WeekendValue;
  partTime: PartTimeValue;
  upload: UploadValue;
}

export const INITIAL_WIZARD_VALUES: WizardValues = {
  shifts: { shifts: [], note: "" },
  hardTransitions: { pairs: [], minRestHours: "11", note: "" },
  softTransitions: { pairs: [], note: "" },
  workingHours: { window: "week", min: "", max: "", note: "" },
  rotation: { cycleLength: "7", slots: Array(7).fill(""), note: "" },
  consecutive: { perShift: {}, note: "" },
  weekends: { balance: null, note: "" },
  partTime: { hasPartTime: null, rows: [], note: "" },
  upload: { comment: "", note: "" },
};

let _idCounter = 0;
export function nextId(): string {
  return `w${++_idCounter}`;
}
