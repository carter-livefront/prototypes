"use client";

import { Dumbbell, X } from "lucide-react";

type Props = {
  title: string;
  onRemove: () => void;
};

export default function WorkoutContextChip({ title, onRemove }: Props) {
  return (
    <div className="inline-flex items-center gap-2 pl-1.5 pr-1.5 py-1 rounded-full bg-[#2a2a2c] text-fg text-[13px]">
      <span className="w-6 h-6 rounded-md bg-[#1c1c1e] grid place-items-center text-fg">
        <Dumbbell size={14} strokeWidth={1.8} />
      </span>
      <span className="truncate max-w-[140px]">{title}</span>
      <button
        aria-label="Remove workout context"
        onClick={onRemove}
        className="w-5 h-5 grid place-items-center rounded-full bg-white/10"
      >
        <X size={12} strokeWidth={2.2} />
      </button>
    </div>
  );
}
