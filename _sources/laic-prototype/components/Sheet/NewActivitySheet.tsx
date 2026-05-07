"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  CalendarCheck,
  Dumbbell,
  PlayCircle,
  SquarePen,
  X,
  type LucideIcon,
} from "lucide-react";
import { LaicIcon } from "@/components/icons/LaicIcon";
import BottomSheet from "./BottomSheet";
import { useStore } from "@/lib/store";

type Step = "root" | "workout";

const ROOT_OPTIONS: { label: string; Icon: LucideIcon; key?: Step }[] = [
  { label: "Workout", Icon: Dumbbell, key: "workout" },
  { label: "On Demand", Icon: PlayCircle },
  { label: "Program", Icon: BookOpen },
  { label: "Reservation", Icon: CalendarCheck },
];

const WORKOUT_OPTIONS: { label: string; Icon: LucideIcon | null; primary?: boolean; manual?: boolean }[] = [
  { label: "Manually Create a Workout", Icon: SquarePen, manual: true },
  { label: "Generate a Workout with L•AI•C", Icon: null, primary: true },
  { label: "View My Workouts", Icon: Bookmark },
  { label: "View Workout Library", Icon: Dumbbell },
];

export default function NewActivitySheet({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const seedNewWorkoutChat = useStore((s) => s.seedNewWorkoutChat);
  const [step, setStep] = useState<Step>("root");
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  function goForward(next: Step) {
    setDirection(1);
    setStep(next);
  }

  function goBack() {
    setDirection(-1);
    setStep("root");
  }

  return (
    <BottomSheet
      onClose={onClose}
      ariaLabel={step === "root" ? "New Activity" : "Workout"}
    >
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <button
          aria-label="Back"
          onClick={() => step !== "root" && goBack()}
          className={`w-8 h-8 grid place-items-center text-fg ${step === "root" ? "invisible" : ""}`}
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <h2 className="text-[17px] font-medium text-fg">
          {step === "root" ? "New Activity" : "Workout"}
        </h2>
        <button
          aria-label="Close"
          onClick={onClose}
          className="w-8 h-8 grid place-items-center text-fg"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="relative px-3 pb-8 pt-1 min-h-[280px]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
              center: { opacity: 1, x: 0 },
              exit:  (dir: number) => ({ opacity: 0, x: dir * -28 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2"
          >
            {step === "root" &&
              ROOT_OPTIONS.map((o) => (
                <button
                  key={o.label}
                  onClick={() => o.key && goForward(o.key)}
                  className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-[#2a2a2c] active:bg-[#333335] text-left"
                >
                  <span className="w-6 grid place-items-center text-fg">
                    <o.Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span className="text-fg text-[16px]">{o.label}</span>
                </button>
              ))}

            {step === "workout" &&
              WORKOUT_OPTIONS.map((o) => (
                <button
                  key={o.label}
                  onClick={() => {
                    if (o.primary) {
                      seedNewWorkoutChat();
                      onClose();
                      setTimeout(() => router.push("/chat"), 220);
                    } else if (o.manual) {
                      onClose();
                      setTimeout(() => router.push("/workout/new"), 220);
                    }
                  }}
                  className="flex items-center gap-3 px-4 py-4 rounded-2xl bg-[#2a2a2c] active:bg-[#333335] text-left"
                >
                  <span className="w-6 grid place-items-center text-fg">
                    {o.Icon ? (
                      <o.Icon size={20} strokeWidth={1.6} />
                    ) : (
                      <LaicIcon size={20} />
                    )}
                  </span>
                  <span className="text-fg text-[16px]">{o.label}</span>
                </button>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </BottomSheet>
  );
}
