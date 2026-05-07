"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, SquarePen, X } from "lucide-react";
import BottomSheet from "./BottomSheet";
import { Q1, Q2, Q3 } from "@/lib/canned";
import { useStore } from "@/lib/store";

const QUESTIONS = [Q1, Q2, Q3];
const KEYS = ["q1", "q2", "q3"] as const;
const MULTI_SELECT_STEP = 2; // Q3 is multi-select

export default function ContextBuilderSheet() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  // Freeform text per question
  const [freeformValues, setFreeformValues] = useState({ q1: "", q2: "", q3: "" });

  // Q3 multi-select: track which presets are selected + whether freeform is active
  const [q3Presets, setQ3Presets] = useState<string[]>([]);
  const [q3FreeformActive, setQ3FreeformActive] = useState(false);

  const closeContextSheet = useStore((s) => s.closeContextSheet);
  const setAnswer = useStore((s) => s.setAnswer);
  const submit = useStore((s) => s.submitContextAnswers);
  const answers = useStore((s) => s.contextAnswers);

  const inputRef = useRef<HTMLInputElement>(null);

  const q = QUESTIONS[step];
  const key = KEYS[step];
  const selected = answers[key]; // used for Q1 & Q2

  // ── Q1/Q2 freeform helpers ──────────────────────────────────────────────
  const presetOptions = q.options as readonly string[];
  const isFreeformSelected =
    step !== MULTI_SELECT_STEP &&
    selected !== undefined &&
    !presetOptions.includes(selected);

  useEffect(() => {
    if (isFreeformSelected || (step === MULTI_SELECT_STEP && q3FreeformActive)) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isFreeformSelected, q3FreeformActive, step]);

  function handleFreeformTap() {
    const text = freeformValues[key];
    setAnswer(key, text);
  }

  function handleFreeformChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setFreeformValues((prev) => ({ ...prev, [key]: text }));
    if (step !== MULTI_SELECT_STEP) {
      setAnswer(key, text);
    } else {
      syncQ3Answer(q3Presets, q3FreeformActive, text);
    }
  }

  // ── Q3 multi-select helpers ─────────────────────────────────────────────
  function syncQ3Answer(presets: string[], freeformActive: boolean, freeformText: string) {
    const parts = [...presets];
    if (freeformActive && freeformText.trim()) {
      parts.push(freeformText.trim());
    }
    setAnswer("q3", parts.join(", "));
  }

  function toggleQ3Preset(opt: string) {
    const next = q3Presets.includes(opt)
      ? q3Presets.filter((s) => s !== opt)
      : [...q3Presets, opt];
    setQ3Presets(next);
    syncQ3Answer(next, q3FreeformActive, freeformValues.q3);
  }

  function toggleQ3Freeform() {
    const next = !q3FreeformActive;
    setQ3FreeformActive(next);
    syncQ3Answer(q3Presets, next, freeformValues.q3);
    if (next) setTimeout(() => inputRef.current?.focus(), 50);
  }

  // ── Navigation ──────────────────────────────────────────────────────────
  function next() {
    if (step < QUESTIONS.length - 1) {
      setDirection(1);
      setStep(step + 1);
    } else {
      submit();
    }
  }
  function back() {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  }

  const canAdvance =
    step === MULTI_SELECT_STEP
      ? q3Presets.length > 0 || (q3FreeformActive && freeformValues.q3.trim().length > 0)
      : !!selected && selected.trim().length > 0;

  return (
    <BottomSheet onClose={closeContextSheet} ariaLabel={q.title}>
      <div className="px-4 pt-3 pb-4 flex items-center justify-between">
        <h3 className="text-fg text-[16px] font-medium">{q.title}</h3>
        <button
          aria-label="Close"
          onClick={closeContextSheet}
          className="w-7 h-7 grid place-items-center text-fg-dim"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="relative px-3 pb-3 min-h-[280px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 28 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            {/* ── Q1 / Q2: single-select presets ── */}
            {step !== MULTI_SELECT_STEP &&
              q.options.map((opt, i) => {
                const isSelected = selected === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setAnswer(key, opt)}
                    className={`flex items-center gap-3 pl-2 pr-4 py-3 rounded-full text-[15px] text-left transition-colors ${
                      isSelected
                        ? "bg-[#f5f1ea] text-black"
                        : "bg-[#2a2a2c] text-fg active:bg-[#333335]"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full grid place-items-center text-[12px] ${
                        isSelected ? "bg-black text-white" : "bg-[#1c1c1e] text-fg-dim"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}

            {/* ── Q3: multi-select presets ── */}
            {step === MULTI_SELECT_STEP &&
              q.options.map((opt) => {
                const isSelected = q3Presets.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleQ3Preset(opt)}
                    className={`flex items-center gap-3 pl-3 pr-4 py-3 rounded-full text-[15px] text-left transition-colors ${
                      isSelected
                        ? "bg-[#f5f1ea] text-black"
                        : "bg-[#2a2a2c] text-fg active:bg-[#333335]"
                    }`}
                  >
                    {/* Checkbox indicator */}
                    <span
                      className={`w-7 h-7 rounded-full grid place-items-center shrink-0 ${
                        isSelected ? "bg-black" : "bg-[#1c1c1e]"
                      }`}
                    >
                      {isSelected && <Check size={13} strokeWidth={2.5} className="text-white" />}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}

            {/* ── Freeform row (all steps) ── */}
            <div
              role="button"
              tabIndex={0}
              onClick={step === MULTI_SELECT_STEP ? toggleQ3Freeform : handleFreeformTap}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (step === MULTI_SELECT_STEP ? toggleQ3Freeform() : handleFreeformTap())
              }
              className={`flex items-center gap-3 pl-3 pr-4 py-3 rounded-full text-[15px] text-left cursor-pointer transition-colors ${
                (step === MULTI_SELECT_STEP ? q3FreeformActive : isFreeformSelected)
                  ? "bg-[#f5f1ea]"
                  : "bg-[#2a2a2c] active:bg-[#333335]"
              }`}
            >
              <span
                className={`w-7 h-7 grid place-items-center shrink-0 rounded-full ${
                  step === MULTI_SELECT_STEP
                    ? q3FreeformActive
                      ? "bg-black"
                      : "bg-[#1c1c1e]"
                    : ""
                } ${
                  step === MULTI_SELECT_STEP
                    ? ""
                    : isFreeformSelected
                    ? "text-black"
                    : "text-fg-dim"
                }`}
              >
                {step === MULTI_SELECT_STEP ? (
                  q3FreeformActive ? (
                    <Check size={13} strokeWidth={2.5} className="text-white" />
                  ) : (
                    <SquarePen size={15} strokeWidth={1.6} className="text-fg-dim" />
                  )
                ) : (
                  <SquarePen size={16} strokeWidth={1.6} />
                )}
              </span>

              {(step === MULTI_SELECT_STEP ? q3FreeformActive : isFreeformSelected) ? (
                <input
                  ref={inputRef}
                  value={freeformValues[key]}
                  onChange={handleFreeformChange}
                  onClick={(e) => e.stopPropagation()}
                  placeholder={q.freeform}
                  className="flex-1 min-w-0 bg-transparent outline-none text-black placeholder:text-black/40 text-[15px]"
                />
              ) : (
                <span className={step === MULTI_SELECT_STEP ? "text-fg" : "text-fg"}>
                  {q.freeform}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-5 pb-6 flex items-center justify-between text-fg">
        <button
          aria-label="Previous"
          onClick={back}
          className={`w-10 h-10 grid place-items-center ${step === 0 ? "invisible" : ""}`}
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <span className="text-[14px] text-fg-dim">{step + 1} of {QUESTIONS.length}</span>
        <button
          aria-label="Next"
          onClick={next}
          disabled={!canAdvance}
          className="w-10 h-10 grid place-items-center disabled:opacity-30"
        >
          <ArrowRight size={22} strokeWidth={2} />
        </button>
      </div>
    </BottomSheet>
  );
}
