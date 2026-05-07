"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  ChevronDown,
  Dumbbell,
  Info,
  MoreHorizontal,
  Play,
  Plus,
} from "lucide-react";
import { LaicIcon } from "@/components/icons/LaicIcon";
import { useStore } from "@/lib/store";
import { getWorkoutById, getWorkoutDetailById } from "@/lib/canned";
import StatusBar from "../Chat/StatusBar";
import ActionSheet from "../Sheet/ActionSheet";
import AddExerciseSheet from "../Sheet/AddExerciseSheet";

type MenuState =
  | { kind: "block"; blockIdx: number }
  | { kind: "exercise"; blockIdx: number; exIdx: number }
  | null;

export default function WorkoutDetailScreen({ id }: { id: string }) {
  const router = useRouter();
  const wk = getWorkoutById(id);
  const blocks = getWorkoutDetailById(id);
  const attach = useStore((s) => s.attachWorkoutContext);

  const [openMenu, setOpenMenu] = useState<MenuState>(null);
  const [addExerciseBlockIdx, setAddExerciseBlockIdx] = useState<number | null>(null);

  const isNew = id === "new";
  const backRoute = isNew ? "/" : "/chat";

  function handleEdit() {
    if (!wk) return;
    attach(wk.id, [wk.title, wk.subtitle].filter(Boolean).join(" "));
    router.push("/chat");
  }

  if (!wk) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-bg text-fg">
        Workout not found.
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-bg">
      <StatusBar />
      <header className="relative h-[88px] pt-[44px] flex items-center px-3 gap-2 shrink-0">
        <button
          aria-label="Back"
          onClick={() => router.push(backRoute)}
          className="w-10 h-10 grid place-items-center text-fg"
        >
          <ArrowLeft size={24} strokeWidth={2} />
        </button>
        <h1 className="flex-1 text-fg text-[15px] font-medium truncate">
          {wk.title}{!isNew && " Wo…"}
        </h1>
        <button aria-label="Save" className="w-10 h-10 grid place-items-center text-fg">
          <Bookmark size={20} strokeWidth={1.8} />
        </button>
        <button aria-label="More" className="w-10 h-10 grid place-items-center text-fg">
          <MoreHorizontal size={22} strokeWidth={2} />
        </button>
      </header>

      {/* ── Empty state ── */}
      {blocks.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center pb-24">
          <div className="w-16 h-16 rounded-2xl bg-[#1c1c1e] grid place-items-center">
            <Dumbbell size={28} strokeWidth={1.4} className="text-fg-dim" />
          </div>
          <div className="space-y-2">
            <p className="text-fg text-[17px] font-semibold">No exercises yet</p>
            <p className="text-fg-dim text-[14px] leading-snug">
              Add your first exercise to start building this workout.
            </p>
          </div>
          <button
            onClick={() => setAddExerciseBlockIdx(0)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-[15px] font-medium active:opacity-75 transition-opacity"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Exercise
          </button>
        </div>
      )}

      {/* ── Populated blocks ── */}
      {blocks.length > 0 && (
        <div className="flex-1 overflow-y-auto scroll-hide pb-32">
          {blocks.map((blk, blockIdx) => (
            <section key={blk.name} className="px-4 mb-5">
              {/* Block header */}
              <div className="flex items-center justify-between py-2">
                <h2 className="text-fg text-[18px] font-medium">{blk.name}</h2>
                <button
                  onClick={() => setOpenMenu({ kind: "block", blockIdx })}
                  className="text-fg-dim active:text-fg"
                >
                  <MoreHorizontal size={18} strokeWidth={2} />
                </button>
              </div>

              {/* Block card */}
              <div className="rounded-2xl bg-[#1c1c1e] overflow-hidden">
                {/* Group/rounds header */}
                <div className="flex items-center justify-between px-4 py-3 text-fg-dim text-[13px] tracking-wider">
                  <span className="flex items-center gap-1.5">
                    GROUP <Info size={12} strokeWidth={1.8} />
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#2a2a2c] text-fg text-[11px]">
                      {blk.groupRounds} ROUND
                    </span>
                    <ChevronDown size={16} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Exercise rows */}
                <div className="divide-y divide-white/5">
                  {blk.exercises.map((ex, exIdx) => (
                    <div key={exIdx} className="flex items-center gap-3 px-4 py-3">
                      <div className="w-12 h-12 rounded-xl bg-[#2a2a2c]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-fg text-[15px] leading-[19px]">{ex.name}</p>
                        <p className="text-fg-dim text-[13px] mt-1 inline-flex items-center gap-1">
                          {ex.reps} • {ex.rir} <Info size={12} strokeWidth={1.8} />
                        </p>
                      </div>
                      <button
                        onClick={() => setOpenMenu({ kind: "exercise", blockIdx, exIdx })}
                        className="text-fg-dim px-1 active:text-fg"
                      >
                        <MoreHorizontal size={18} strokeWidth={2} />
                      </button>
                    </div>
                  ))}

                  {/* Add exercise row */}
                  <button
                    onClick={() => setAddExerciseBlockIdx(blockIdx)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-fg active:bg-white/5"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#2a2a2c] grid place-items-center">
                      <Plus size={16} strokeWidth={2} />
                    </span>
                    Add
                  </button>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* ── Bottom action bar ── */}
      <div className="absolute inset-x-0 bottom-0 p-4 pb-6 flex items-center gap-3 bg-gradient-to-t from-bg via-bg to-transparent">
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#1c1c1e] text-fg text-[16px] active:bg-[#2a2a2c]"
        >
          <LaicIcon size={18} strokeWidth={1.8} />
          Edit
        </button>
        <button
          disabled={isNew}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white text-black text-[16px] disabled:opacity-35 disabled:pointer-events-none"
        >
          <Play size={18} strokeWidth={2} fill="black" /> Start
        </button>
        <button
          aria-label="Schedule"
          className="w-12 h-12 rounded-full bg-[#1c1c1e] grid place-items-center text-fg"
        >
          <CalendarDays size={20} strokeWidth={1.8} />
        </button>
      </div>

      {/* ── Overlays ── */}
      <AnimatePresence>
        {openMenu?.kind === "block" && (
          <ActionSheet
            title={blocks[openMenu.blockIdx]?.name}
            items={[
              { label: "Rename" },
              { label: "Reorder" },
              { label: "Delete", destructive: true },
            ]}
            onSelect={() => {}}
            onClose={() => setOpenMenu(null)}
          />
        )}
        {openMenu?.kind === "exercise" && (
          <ActionSheet
            title={blocks[openMenu.blockIdx]?.exercises[openMenu.exIdx]?.name}
            items={[
              { label: "Swap" },
              { label: "Reorder" },
              { label: "Remove", destructive: true },
            ]}
            onSelect={() => {}}
            onClose={() => setOpenMenu(null)}
          />
        )}
        {addExerciseBlockIdx !== null && (
          <AddExerciseSheet onClose={() => setAddExerciseBlockIdx(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
