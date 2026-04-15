"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const QUESTIONS = [
  {
    labelKey: "q1Label" as const,
    optionKeys: ["q1Opt1", "q1Opt2", "q1Opt3", "q1Opt4"] as const,
  },
  {
    labelKey: "q2Label" as const,
    optionKeys: ["q2Opt1", "q2Opt2", "q2Opt3", "q2Opt4"] as const,
  },
  {
    labelKey: "q3Label" as const,
    optionKeys: ["q3Opt1", "q3Opt2", "q3Opt3", "q3Opt4"] as const,
  },
];

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

export function SchedulingChallengesWidget() {
  const t = useTranslations("SchedulingWidget");
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  const answeredCount = Object.keys(answers).length;
  const totalCount = QUESTIONS.length;
  const progressPct = (answeredCount / totalCount) * 100;
  const allAnswered = answeredCount === totalCount;

  const messageValue = Object.entries(answers)
    .map(([idx, val]) => `${t(QUESTIONS[parseInt(idx)].labelKey)}: ${val}`)
    .join("\n");

  function handleOpen() {
    const firstUnanswered = QUESTIONS.findIndex((_, i) => !answers[i]);
    setDirection(1);
    setCurrentQuestion(firstUnanswered === -1 ? 0 : firstUnanswered);
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function advance(fromIdx: number) {
    if (fromIdx < QUESTIONS.length - 1) {
      autoAdvanceTimer.current = setTimeout(() => {
        setDirection(1);
        setCurrentQuestion(fromIdx + 1);
      }, 300);
    } else {
      autoAdvanceTimer.current = setTimeout(() => setIsOpen(false), 400);
    }
  }

  function handleSelectOption(questionIdx: number, value: string) {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setAnswers((prev) => ({ ...prev, [questionIdx]: value }));
    advance(questionIdx);
  }

  function handleSkip() {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    advance(currentQuestion);
  }

  function handleNext() {
    if (currentQuestion < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentQuestion((q) => q + 1);
    }
  }

  function handleBack() {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion((q) => q - 1);
    }
  }

  const selectedAnswer = answers[currentQuestion];

  return (
    <div>
      <input type="hidden" name="message" value={messageValue} />

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
              : t("progress", { answered: answeredCount, total: totalCount })}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-stone-200">
          <motion.div
            className="h-full rounded-full bg-coral-500"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </button>

      {/* Questions modal */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-[60] w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-stone-200 bg-white p-6 shadow-xl transition-all duration-200 data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <Dialog.Title className="text-base font-bold text-stone-900">
                  {t("label")}
                </Dialog.Title>
                <p className="mt-0.5 text-xs text-stone-400">
                  {allAnswered
                    ? t("progressComplete")
                    : t("progress", { answered: answeredCount, total: totalCount })}
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
            <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-stone-200">
              <motion.div
                className="h-full rounded-full bg-coral-500"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* Question slide area */}
            <div className="relative min-h-[172px] overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentQuestion}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <p className="mb-3 text-sm font-semibold text-stone-800">
                    {t(QUESTIONS[currentQuestion].labelKey)}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {QUESTIONS[currentQuestion].optionKeys.map((optKey) => {
                      const label = t(optKey);
                      const isSelected = selectedAnswer === label;
                      return (
                        <motion.button
                          key={optKey}
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            handleSelectOption(currentQuestion, label)
                          }
                          className={`rounded-lg border p-3 text-left text-xs font-medium transition-colors ${
                            isSelected
                              ? "border-coral-500 bg-coral-50 text-coral-700"
                              : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:bg-stone-100"
                          }`}
                        >
                          {label}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className={`text-xs font-medium text-stone-400 transition-colors hover:text-stone-600 ${
                  currentQuestion === 0 ? "invisible" : ""
                }`}
              >
                ← {t("back")}
              </button>
              <span className="text-xs text-stone-300">
                {currentQuestion + 1} / {QUESTIONS.length}
              </span>
              {selectedAnswer ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentQuestion === QUESTIONS.length - 1}
                  className="text-xs font-medium text-coral-500 transition-colors hover:text-coral-600 disabled:invisible"
                >
                  {t("next")} →
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
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
