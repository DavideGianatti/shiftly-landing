"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import {
  WizardValues,
  INITIAL_WIZARD_VALUES,
} from "./wizard/types";
import { NoteField } from "./wizard/NoteField";
import { StepShifts } from "./wizard/StepShifts";
import { StepHardTransitions } from "./wizard/StepHardTransitions";
import { StepSoftTransitions } from "./wizard/StepSoftTransitions";
import { StepWorkingHours } from "./wizard/StepWorkingHours";
import { StepRotation } from "./wizard/StepRotation";
import { StepConsecutive } from "./wizard/StepConsecutive";
import { StepWeekends } from "./wizard/StepWeekends";
import { StepPartTime } from "./wizard/StepPartTime";
import { StepUpload } from "./wizard/StepUpload";

const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    x: dir * -40,
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" },
  }),
};

function isAnswered(stepIndex: number, values: WizardValues): boolean {
  switch (stepIndex) {
    case 0: return values.shifts.shifts.some((s) => s.start && s.end && s.name.trim());
    case 1: return values.hardTransitions.pairs.length > 0 || values.hardTransitions.minRestHours !== "11";
    case 2: return values.softTransitions.pairs.length > 0;
    case 3: return values.workingHours.min !== "" || values.workingHours.max !== "";
    case 4: return values.rotation.slots.some((s) => s !== "");
    case 5: return Object.values(values.consecutive.perShift).some((p) => p !== "none");
    case 6: return values.weekends.balance !== null;
    case 7: return values.partTime.hasPartTime !== null;
    case 8: return values.upload.comment !== "" || false; // file checked separately
    default: return false;
  }
}

function buildMessage(values: WizardValues, selectedFile: File | null): string {
  const lines: string[] = [];

  // Shifts
  if (values.shifts.shifts.length > 0) {
    lines.push("=== Shifts ===");
    values.shifts.shifts.forEach((s) => {
      const time = s.start && s.end ? ` (${s.start}–${s.end})` : "";
      const h = s.hours ? `, ${s.hours}h` : "";
      const cov = s.coverage ? `, coverage: ${s.coverage}` : "";
      lines.push(`${s.name}${time}${h}${cov}`);
    });
    if (values.shifts.note) lines.push(`Note: ${values.shifts.note}`);
  }

  // Hard transitions
  if (values.hardTransitions.pairs.length > 0 || values.hardTransitions.minRestHours !== "11") {
    lines.push("=== Prohibited transitions ===");
    values.hardTransitions.pairs.forEach((p) => lines.push(`${p.from} → ${p.to}`));
    lines.push(`Min rest between shifts: ${values.hardTransitions.minRestHours}h`);
    if (values.hardTransitions.note) lines.push(`Note: ${values.hardTransitions.note}`);
  }

  // Soft transitions
  if (values.softTransitions.pairs.length > 0) {
    lines.push("=== Discouraged transitions ===");
    values.softTransitions.pairs.forEach((p) => lines.push(`${p.from} → ${p.to}`));
    if (values.softTransitions.note) lines.push(`Note: ${values.softTransitions.note}`);
  }

  // Working hours
  if (values.workingHours.min !== "" || values.workingHours.max !== "") {
    lines.push("=== Working hours ===");
    const w = values.workingHours.window;
    if (values.workingHours.min) lines.push(`Min per ${w}: ${values.workingHours.min}h`);
    if (values.workingHours.max) lines.push(`Max per ${w}: ${values.workingHours.max}h`);
    if (values.workingHours.note) lines.push(`Note: ${values.workingHours.note}`);
  }

  // Rotation
  const filledSlots = values.rotation.slots.filter((s) => s !== "");
  if (filledSlots.length > 0) {
    lines.push(`=== Rotation (${values.rotation.cycleLength}-day cycle) ===`);
    values.rotation.slots.forEach((s, i) => lines.push(`Day ${i + 1}: ${s || "–"}`));
    if (values.rotation.note) lines.push(`Note: ${values.rotation.note}`);
  }

  // Consecutive
  const consEntries = Object.entries(values.consecutive.perShift).filter(([, v]) => v !== "none");
  if (consEntries.length > 0) {
    lines.push("=== Consecutive shift preferences ===");
    consEntries.forEach(([shift, pref]) => lines.push(`${shift}: ${pref.replace(/_/g, " ")}`));
    if (values.consecutive.note) lines.push(`Note: ${values.consecutive.note}`);
  }

  // Weekends
  if (values.weekends.balance !== null) {
    lines.push("=== Weekend policy ===");
    lines.push(values.weekends.balance.replace(/_/g, " "));
    if (values.weekends.note) lines.push(`Note: ${values.weekends.note}`);
  }

  // Part-time
  if (values.partTime.hasPartTime !== null) {
    lines.push("=== Part-time ===");
    if (!values.partTime.hasPartTime) {
      lines.push("No part-time staff");
    } else {
      values.partTime.rows.forEach((r) => lines.push(`${r.count} worker(s) at ${r.percent}% FTE`));
    }
    if (values.partTime.note) lines.push(`Note: ${values.partTime.note}`);
  }

  // Upload comment
  if (values.upload.comment || selectedFile) {
    lines.push("=== Existing schedule ===");
    if (selectedFile) lines.push(`Attached file: ${selectedFile.name}`);
    if (values.upload.comment) lines.push(values.upload.comment);
    if (values.upload.note) lines.push(`Note: ${values.upload.note}`);
  }

  return lines.join("\n");
}

export function SchedulingChallengesWidget() {
  const t = useTranslations("SchedulingWidget");
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<WizardValues>(() => ({
    ...INITIAL_WIZARD_VALUES,
    shifts: {
      ...INITIAL_WIZARD_VALUES.shifts,
      shifts: [{ id: "w0", name: t("stepShifts.dayOffName"), start: "", end: "", hours: "0", coverage: "0" }],
    },
  }));
  const [direction, setDirection] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const TOTAL_STEPS = 9;

  const answeredCount = Array.from({ length: TOTAL_STEPS }, (_, i) =>
    isAnswered(i, values)
  ).filter(Boolean).length;

  // Upload step is answered if file selected or comment filled
  const uploadAnswered = selectedFile !== null || values.upload.comment !== "";

  const progressPct = (answeredCount / TOTAL_STEPS) * 100;
  const allAnswered = answeredCount === TOTAL_STEPS;

  const configJsonValue = JSON.stringify({
    ...values,
    upload: { ...values.upload }, // no File object in JSON
  });

  const messageValue = buildMessage(values, selectedFile);

  function handleOpen() {
    setDirection(1);
    setCurrentStep(0);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleNext() {
    if (currentStep < TOTAL_STEPS - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    } else {
      setIsOpen(false);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  }

  function handleSkip() {
    handleNext();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedFile(e.target.files?.[0] ?? null);
  }

  function handleClearFile() {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function setStep<K extends keyof WizardValues>(key: K, val: WizardValues[K]) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function getCurrentNote(): string {
    switch (currentStep) {
      case 0: return values.shifts.note;
      case 1: return values.hardTransitions.note;
      case 2: return values.softTransitions.note;
      case 3: return values.workingHours.note;
      case 4: return values.rotation.note;
      case 5: return values.consecutive.note;
      case 6: return values.weekends.note;
      case 7: return values.partTime.note;
      case 8: return values.upload.note;
      default: return "";
    }
  }

  function setCurrentNote(note: string) {
    switch (currentStep) {
      case 0: setStep("shifts", { ...values.shifts, note }); break;
      case 1: setStep("hardTransitions", { ...values.hardTransitions, note }); break;
      case 2: setStep("softTransitions", { ...values.softTransitions, note }); break;
      case 3: setStep("workingHours", { ...values.workingHours, note }); break;
      case 4: setStep("rotation", { ...values.rotation, note }); break;
      case 5: setStep("consecutive", { ...values.consecutive, note }); break;
      case 6: setStep("weekends", { ...values.weekends, note }); break;
      case 7: setStep("partTime", { ...values.partTime, note }); break;
      case 8: setStep("upload", { ...values.upload, note }); break;
    }
  }

  const currentIsAnswered = isAnswered(currentStep, values) ||
    (currentStep === 8 && uploadAnswered);

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <StepShifts
            value={values.shifts}
            onChange={(v) => setStep("shifts", v)}
          />
        );
      case 1:
        return (
          <StepHardTransitions
            value={values.hardTransitions}
            onChange={(v) => setStep("hardTransitions", v)}
            shifts={values.shifts.shifts}
          />
        );
      case 2:
        return (
          <StepSoftTransitions
            value={values.softTransitions}
            onChange={(v) => setStep("softTransitions", v)}
            shifts={values.shifts.shifts}
          />
        );
      case 3:
        return (
          <StepWorkingHours
            value={values.workingHours}
            onChange={(v) => setStep("workingHours", v)}
          />
        );
      case 4:
        return (
          <StepRotation
            value={values.rotation}
            onChange={(v) => setStep("rotation", v)}
            shifts={values.shifts.shifts}
          />
        );
      case 5:
        return (
          <StepConsecutive
            value={values.consecutive}
            onChange={(v) => setStep("consecutive", v)}
            shifts={values.shifts.shifts}
          />
        );
      case 6:
        return (
          <StepWeekends
            value={values.weekends}
            onChange={(v) => setStep("weekends", v)}
          />
        );
      case 7:
        return (
          <StepPartTime
            value={values.partTime}
            onChange={(v) => setStep("partTime", v)}
          />
        );
      case 8:
        return (
          <StepUpload
            value={values.upload}
            onChange={(v) => setStep("upload", v)}
            selectedFile={selectedFile}
            onChooseFile={() => fileInputRef.current?.click()}
            onClearFile={handleClearFile}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div>
      {/* Hidden inputs submitted with the form */}
      <input type="hidden" name="message" value={messageValue} />
      <input type="hidden" name="configJson" value={configJsonValue} />

      {/* File input lives inside the form (outside the portal) */}
      <input
        type="file"
        name="scheduleFile"
        ref={fileInputRef}
        accept=".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleFileChange}
      />

      {/* Trigger — progress bar header */}
      <button
        type="button"
        onClick={handleOpen}
        className="w-full rounded-xl border border-stone-200 bg-stone-50 p-4 text-left transition-colors hover:bg-stone-100"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-stone-600">
            {t("label")}
          </span>
          <span className="shrink-0 text-xs text-stone-400">
            {allAnswered
              ? t("progressComplete")
              : t("progress", { answered: answeredCount, total: TOTAL_STEPS })}
          </span>
        </div>
        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-stone-200">
          <motion.div
            className="h-full rounded-full bg-coral-500"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </button>

      {/* Wizard modal */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-[60] flex h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-stone-200 bg-white shadow-xl transition-all duration-200 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 sm:max-w-2xl">
            {/* Header */}
            <div className="shrink-0 px-6 pt-6 pb-0 sm:px-8 sm:pt-8">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-base font-bold text-stone-900">
                    {t("label")}
                  </Dialog.Title>
                  <p className="mt-0.5 text-xs text-stone-400">
                    {allAnswered
                      ? t("progressComplete")
                      : t("progress", {
                          answered: answeredCount,
                          total: TOTAL_STEPS,
                        })}
                  </p>
                </div>
                <Dialog.Close
                  className="shrink-0 rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-200"
                  aria-label="Close"
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Dialog.Close>
              </div>

              {/* Progress bar */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-stone-200">
                <motion.div
                  className="h-full rounded-full bg-coral-500"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Step content — scrollable */}
            <div className="flex flex-col flex-1 overflow-y-auto px-6 py-5 sm:px-8">
              <div className="flex-1">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
              <NoteField
                value={getCurrentNote()}
                onChange={setCurrentNote}
              />
            </div>

            {/* Navigation */}
            <div className="shrink-0 border-t border-stone-100 px-6 py-4 sm:px-8">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`text-xs font-medium text-stone-400 transition-colors hover:text-stone-600 ${
                    currentStep === 0 ? "invisible" : ""
                  }`}
                >
                  ← {t("back")}
                </button>
                <span className="text-xs font-medium text-stone-500">
                  {currentStep + 1} / {TOTAL_STEPS}
                </span>
                {currentIsAnswered ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="text-xs font-medium text-coral-500 transition-colors hover:text-coral-600"
                  >
                    {currentStep === TOTAL_STEPS - 1 ? t("done") : `${t("next")} →`}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-xs font-medium text-stone-400 transition-colors hover:text-stone-600"
                  >
                    {t("skip")} →
                  </button>
                )}
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
