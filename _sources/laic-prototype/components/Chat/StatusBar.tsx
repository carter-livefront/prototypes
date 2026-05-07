"use client";

import { BatteryFull, Signal, Wifi } from "lucide-react";

export default function StatusBar() {
  return (
    <div className="absolute top-0 inset-x-0 h-[44px] z-30 px-6 flex items-center justify-between text-fg text-[15px] font-semibold pointer-events-none">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <Signal size={15} strokeWidth={2} />
        <Wifi size={15} strokeWidth={2} />
        <BatteryFull size={20} strokeWidth={1.6} />
      </span>
    </div>
  );
}
