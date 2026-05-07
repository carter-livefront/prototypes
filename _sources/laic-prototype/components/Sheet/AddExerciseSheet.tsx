"use client";

import { useState, useRef } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import BottomSheet from "./BottomSheet";
import { getAllExerciseNames } from "@/lib/workout-generator";

const FILTER_PILLS = ["Focus", "Difficulty", "Equipment", "Muscle", "Type"];

function groupByLetter(names: string[]): { letter: string; names: string[] }[] {
  const map = new Map<string, string[]>();
  for (const name of names) {
    const letter = /^[a-zA-Z]/.test(name) ? name[0].toUpperCase() : "#";
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(name);
  }
  return [...map.entries()]
    .sort(([a], [b]) => {
      if (a === "#") return -1;
      if (b === "#") return 1;
      return a.localeCompare(b);
    })
    .map(([letter, names]) => ({ letter, names }));
}

export default function AddExerciseSheet({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const allNames = getAllExerciseNames();
  const filtered = query.trim()
    ? allNames.filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    : allNames;
  const groups = groupByLetter(filtered);
  const letters = groups.map((g) => g.letter);

  function scrollToLetter(letter: string) {
    const el = letterRefs.current[letter];
    if (el && listRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <BottomSheet onClose={onClose} ariaLabel="Add Exercise" tall>
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-3 py-1">
        <div className="w-10 h-10" />
        <h2 className="text-fg text-[16px] font-medium tracking-[0.16px]">Add Exercise</h2>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-10 h-10 grid place-items-center text-fg"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Search bar */}
      <div className="shrink-0 px-4 pb-2">
        <div className="flex items-center gap-2 bg-[#464646] rounded-full px-3 h-10">
          <Search size={18} strokeWidth={1.8} className="text-fg-dim shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Exercise Name"
            className="flex-1 bg-transparent outline-none text-fg text-[16px] placeholder:text-fg/50 tracking-[0.16px]"
          />
          {query.length > 0 && (
            <button onClick={() => setQuery("")} className="text-fg-dim shrink-0">
              <X size={14} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="shrink-0 flex items-center gap-2 px-4 pb-3 overflow-x-auto scroll-hide">
        {/* All Filters icon button */}
        <button className="w-10 h-10 rounded-full border border-white/15 grid place-items-center shrink-0 active:bg-white/10">
          <SlidersHorizontal size={16} strokeWidth={1.8} className="text-fg" />
        </button>
        {/* Named filter pills */}
        {FILTER_PILLS.map((f) => (
          <button
            key={f}
            className="flex items-center gap-1 px-4 h-10 rounded-full border border-white/15 shrink-0 active:bg-white/10"
          >
            <span className="text-fg text-[11px] font-medium tracking-[0.96px] uppercase">{f}</span>
            <ChevronDown size={14} strokeWidth={2} className="text-fg" />
          </button>
        ))}
      </div>

      {/* Exercise list + A-Z index */}
      <div className="flex-1 min-h-0 relative">
        <div ref={listRef} className="h-full overflow-y-auto scroll-hide px-4 pr-8 pb-8">
          {groups.length === 0 && (
            <p className="text-fg-dim text-[15px] text-center pt-12">No exercises found</p>
          )}
          {groups.map(({ letter, names }) => (
            <div
              key={letter}
              ref={(el) => { letterRefs.current[letter] = el; }}
            >
              {/* Letter header */}
              <p className="text-fg text-[13px] font-medium py-2 sticky top-0 bg-[#1c1c1e] z-10">
                {letter}
              </p>
              {names.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                >
                  {/* Thumbnail placeholder */}
                  <div className="w-[80px] h-[100px] rounded-xl bg-[#2a2a2c] shrink-0" />
                  {/* Exercise name */}
                  <p className="flex-1 text-fg text-[16px] leading-snug tracking-[0.16px]">{name}</p>
                  {/* Radio / select button */}
                  <button
                    aria-label={`Select ${name}`}
                    className="w-10 h-10 grid place-items-center shrink-0"
                  >
                    <div className="w-6 h-6 rounded-full border-[1.5px] border-white/50" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* A-Z index strip */}
        <div className="absolute right-1 top-0 bottom-0 flex flex-col items-center justify-start py-2 gap-px pointer-events-none">
          {letters.map((l) => (
            <button
              key={l}
              onClick={() => scrollToLetter(l)}
              className="text-fg-dim text-[10px] font-medium uppercase leading-none px-1 py-[2px] pointer-events-auto active:text-fg"
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}
