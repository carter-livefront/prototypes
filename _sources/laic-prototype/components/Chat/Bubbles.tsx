"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  Dumbbell,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { LaicIcon } from "@/components/icons/LaicIcon";
import type { ChatMessage } from "@/lib/store";
import { getWorkoutById } from "@/lib/canned";

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
};

function ActionRow() {
  return (
    <div className="flex items-center gap-4 mt-2 text-fg-dim">
      <button aria-label="Copy"><Copy size={18} strokeWidth={1.6} /></button>
      <button aria-label="Like"><ThumbsUp size={18} strokeWidth={1.6} /></button>
      <button aria-label="Dislike"><ThumbsDown size={18} strokeWidth={1.6} /></button>
    </div>
  );
}

export function MessageRenderer({ msg }: { msg: ChatMessage }) {
  if (msg.role === "user") {
    if (msg.type === "text") {
      return (
        <motion.div {...fadeIn} className="flex justify-end">
          <div className="max-w-[78%] rounded-2xl rounded-tr-md bg-user-bubble text-fg px-4 py-2 text-[15px] leading-[21px]">
            {msg.text}
          </div>
        </motion.div>
      );
    }
    if (msg.type === "answers") {
      return (
        <motion.div {...fadeIn} className="flex justify-end">
          <div className="max-w-[88%] rounded-2xl rounded-tr-md bg-user-bubble text-fg px-4 py-3 text-[15px] leading-[22px] space-y-0">
            {msg.answers.map((qa, i) => (
              <div key={i}>
                <div>Q: {qa.question}</div>
                <div>A: {qa.answer}</div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }
    if (msg.type === "workoutContext") {
      return (
        <motion.div {...fadeIn} className="flex flex-col items-end gap-1">
          <div className="inline-flex items-center gap-2 max-w-[88%] pl-1.5 pr-3 py-1 rounded-full bg-user-bubble text-fg text-[13px]">
            <span className="w-6 h-6 rounded-md bg-[#1c1c1e] grid place-items-center">
              <Dumbbell size={14} strokeWidth={1.8} />
            </span>
            <span className="truncate max-w-[180px]">{msg.workoutTitle}</span>
          </div>
          <div className="max-w-[78%] rounded-2xl rounded-tr-md bg-user-bubble text-fg px-4 py-2 text-[15px] leading-[21px]">
            {msg.prompt}
          </div>
        </motion.div>
      );
    }
  }

  if (msg.role === "laic") {
    if (msg.type === "text") {
      return (
        <motion.div {...fadeIn} className="text-fg text-[16px] leading-[22px]">
          <p>{msg.text}</p>
          <ActionRow />
        </motion.div>
      );
    }
    if (msg.type === "workout") {
      return (
        <LaicWorkoutMessage
          preface={msg.preface}
          workoutId={msg.workoutId}
          thinkingSteps={msg.thinkingSteps}
        />
      );
    }
  }

  return null;
}

function LaicWorkoutMessage({
  preface,
  workoutId,
  thinkingSteps,
}: {
  preface: string;
  workoutId: string;
  thinkingSteps: string[];
}) {
  const router = useRouter();
  const wk = getWorkoutById(workoutId);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div {...fadeIn} className="text-fg space-y-3">
      {/* Thought process accordion */}
      <div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-fg-dim text-[14px] active:text-fg transition-colors"
        >
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ChevronDown size={14} strokeWidth={1.8} />
          </motion.span>
          Thought process
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="thought-steps"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-2 space-y-2">
                {thinkingSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-fg-dim text-[14px]">
                    <Check size={14} strokeWidth={2.2} className="shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Preface text */}
      <p className="text-[16px] leading-[22px]">{preface}</p>

      {/* Workout card */}
      <button
        onClick={() => router.push(`/workout/${workoutId}`)}
        className="w-full flex items-center gap-3 p-3 rounded-2xl bg-[#1c1c1e] active:bg-[#222224] text-left"
      >
        <span className="w-12 h-12 rounded-xl bg-[#0f0f10] grid place-items-center text-fg">
          <Dumbbell size={22} strokeWidth={1.8} />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[15px] leading-[19px] truncate">{wk?.title}</span>
          {wk?.subtitle && (
            <span className="block text-[15px] leading-[19px] text-fg truncate">
              {wk.subtitle}
            </span>
          )}
          <span className="block text-fg-dim text-[13px] mt-1">View Workout</span>
        </span>
        <ChevronRight size={20} strokeWidth={1.6} className="text-fg-dim mr-1" />
      </button>

      <ActionRow />
    </motion.div>
  );
}

export function ThinkingBubble({ steps }: { steps: string[] }) {
  return (
    <motion.div {...fadeIn} className="space-y-1.5">
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div
            key={i}
            className={`flex items-center gap-2 text-[16px] ${isLast ? "text-fg-dim" : "text-fg-muted"}`}
          >
            {isLast ? (
              <motion.span
                aria-hidden
                className="text-fg-dim"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <LaicIcon size={18} />
              </motion.span>
            ) : (
              <span className="w-[18px]" />
            )}
            <span>{s}</span>
          </div>
        );
      })}
    </motion.div>
  );
}
