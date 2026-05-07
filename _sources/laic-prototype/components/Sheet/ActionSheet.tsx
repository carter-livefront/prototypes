"use client";

import { motion } from "framer-motion";

export type ActionItem = {
  label: string;
  destructive?: boolean;
};

type Props = {
  title?: string;
  items: ActionItem[];
  onSelect: (label: string) => void;
  onClose: () => void;
};

export default function ActionSheet({ title, items, onSelect, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
      />

      {/* Sheet */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-50 px-3 pb-8 flex flex-col gap-2"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
      >
        {/* Action group */}
        <div className="rounded-2xl bg-[#2a2a2c] overflow-hidden">
          {title && (
            <div className="px-4 py-3 border-b border-white/10 text-center">
              <p className="text-fg-dim text-[13px]">{title}</p>
            </div>
          )}
          {items.map((item, i) => (
            <button
              key={item.label}
              onClick={() => {
                onSelect(item.label);
                onClose();
              }}
              className={`w-full px-4 py-4 text-[17px] text-center active:bg-white/5 transition-colors ${
                i > 0 ? "border-t border-white/10" : ""
              } ${item.destructive ? "text-red-400" : "text-fg"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Cancel */}
        <button
          onClick={onClose}
          className="rounded-2xl bg-[#2a2a2c] py-4 text-[17px] font-semibold text-fg active:bg-white/5 transition-colors"
        >
          Cancel
        </button>
      </motion.div>
    </>
  );
}
