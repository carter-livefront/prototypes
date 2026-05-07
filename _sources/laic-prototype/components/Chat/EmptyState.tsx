"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SUGGESTION_CHIPS } from "@/lib/canned";
import { useStore } from "@/lib/store";

export default function EmptyState() {
  const startSeed = useStore((s) => s.startSeedFromEmpty);

  return (
    <div className="flex-1 flex flex-col items-center px-6 pt-2 pb-4">
      {/* New particle image — centered in the open space */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 flex items-center justify-center"
      >
        <Image
          src="/figma/particle-animation.png"
          alt=""
          width={244}
          height={245}
          priority
          className="select-none pointer-events-none"
          draggable={false}
        />
      </motion.div>

      {/* Suggestion chips pinned to the bottom */}
      <div className="w-full flex flex-wrap gap-2 justify-center">
        {SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => startSeed()}
            className="px-3 py-1.5 rounded-full bg-[#2a2a2c] text-fg text-[13px] active:bg-[#333335]"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
