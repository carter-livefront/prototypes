"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MoreHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useStore } from "@/lib/store";

const MENU_ITEMS = [
  { label: "New chat", action: "new-chat" },
  { label: "Chat History", action: "noop" },
  { label: "Manage Memory", action: "noop" },
  { label: "Provide Feedback", action: "noop" },
] as const;

export default function ChatHeader({ showBack }: { showBack: boolean }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const resetAll = useStore((s) => s.resetAll);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, [menuOpen]);

  function handleMenuAction(action: string) {
    setMenuOpen(false);
    if (action === "new-chat") {
      resetAll();
    }
  }

  return (
    <header className="relative h-[88px] pt-[44px] flex items-center justify-center shrink-0">
      <button
        aria-label={showBack ? "Back" : "Close"}
        onClick={() => router.push("/")}
        className="absolute left-3 top-[48px] w-10 h-10 grid place-items-center text-fg"
      >
        {showBack ? <ArrowLeft size={24} strokeWidth={2} /> : <X size={22} strokeWidth={2} />}
      </button>

      <Image
        src="/figma/laic-logo.svg"
        alt="L•AI•C"
        width={76}
        height={12}
        priority
        className="select-none"
      />

      <div className="absolute right-3 top-[48px]" ref={menuRef}>
        <button
          aria-label="More"
          onClick={() => setMenuOpen((o) => !o)}
          className="w-10 h-10 grid place-items-center text-fg active:opacity-60"
        >
          <MoreHorizontal size={22} strokeWidth={2} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-[44px] z-50 w-48 rounded-2xl bg-[#2a2a2c] shadow-xl overflow-hidden border border-white/8">
            {MENU_ITEMS.map((item, i) => (
              <button
                key={item.label}
                onClick={() => handleMenuAction(item.action)}
                className={`w-full text-left px-4 py-3 text-fg text-[15px] active:bg-white/10 ${
                  i < MENU_ITEMS.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
