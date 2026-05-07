"use client";

import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";
import BottomNav from "../Chat/BottomNav";
import NewActivitySheet from "../Sheet/NewActivitySheet";

export default function HomeScreen() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="absolute inset-0 bg-bg overflow-hidden flex flex-col">
      {/* Scrollable home content */}
      <div className="flex-1 overflow-y-auto scroll-hide">
        <Image
          src="/figma/home3.jpg"
          alt="L•AI•C home"
          width={375}
          height={2316}
          priority
          draggable={false}
          className="block w-full h-auto select-none pointer-events-none"
        />
      </div>

      {/* Sticky FAB — always tappable to open the sheet */}
      <button
        aria-label="Add activity"
        onClick={() => setSheetOpen(true)}
        className="absolute right-3 bottom-[100px] w-[52px] h-[52px] rounded-full bg-[#1c1c1e] text-fg grid place-items-center shadow-lg active:scale-95 transition-transform z-10 border border-white/10"
      >
        <Plus size={26} strokeWidth={2} />
      </button>

      <BottomNav activeLabel="Home" />

      <AnimatePresence>
        {sheetOpen && <NewActivitySheet onClose={() => setSheetOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
