"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
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

  function handleToggle() {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    const firstUnanswered = QUESTIONS.findIndex((_, i) => !answers[i]);
    setDirection(1);
    setCurrentQuestion(firstUnanswered === -1 ? 0 : firstUnanswered);
    setIsOpen(true);
  }

  function handleSelectOption(questionIdx: number, value: string) {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    setAnswers((prev) => ({ ...prev, [questionIdx]: value }));

    if (questionIdx === QUESTIONS.length - 1) {
      autoAdvanceTimer.current = setTimeout(() => setIsOpen(false), 400);
    } else {
      autoAdvanceTimer.current = setTimeout(() => {
        setDirection(1);
        setCurrentQuestion(questionIdx + 1);
      }, 300);
    }
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

      <div className="overflow-hidden rounded-xl border border-stone-200">
        {/* Header — always visible */}
        <button
          type="button"
          onClick={handleToggle}
          className={`w-full p-4 text-left transition-colors ${
            isOpen
              ? "border-b border-stone-100 bg-white"
              : "bg-stone-50 hover:bg-stone-100"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-stone-600">
              {t("label")}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 text-stone-400"
            >
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-stone-200">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-coral-500"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <span className="shrink-0 text-xs text-stone-400">
              {allAnswered
                ? t("progressComplete")
                : t("progress", { answered: answeredCount, total: totalCount })}
            </span>
          </div>
        </button>

        {/* Expandable panel */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="panel"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="bg-white px-4 pb-4 pt-3">
                {/* Question slide area */}
                <div className="relative min-h-[168px] overflow-hidden">
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
                <div className="mt-3 flex items-center justify-between">
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
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      !selectedAnswer ||
                      currentQuestion === QUESTIONS.length - 1
                    }
                    className="text-xs font-medium text-stone-400 transition-colors hover:text-stone-600 disabled:invisible"
                  >
                    {t("next")} →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
