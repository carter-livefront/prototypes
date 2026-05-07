"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  /** Makes the sheet fill ~92% of screen height with an internal flex column layout */
  tall?: boolean;
};

export default function BottomSheet({ onClose, children, ariaLabel, tall }: Props) {
  return (
    <>
      <motion.div
        className="absolute inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        role="dialog"
        aria-modal
        aria-label={ariaLabel}
        className={`absolute inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-[#1c1c1e] text-fg shadow-2xl ${tall ? "flex flex-col" : "overflow-hidden"}`}
        style={tall ? { maxHeight: "calc(100% - 48px)" } : undefined}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
      >
        <div className="pt-2 flex justify-center">
          <div className="w-9 h-1 rounded-full bg-white/30" />
        </div>
        {children}
      </motion.div>
    </>
  );
}
