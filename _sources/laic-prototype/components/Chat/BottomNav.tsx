"use client";

import {
  Home as HomeIcon,
  Wallet,
  CalendarDays,
  Compass,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { LaicIcon } from "@/components/icons/LaicIcon";

const ITEMS: { label: string; Icon: React.FC<{ size: number; strokeWidth: number }>; href?: string }[] = [
  { label: "Home", Icon: HomeIcon, href: "/" },
  { label: "Card", Icon: Wallet },
  { label: "L•AI•C", Icon: LaicIcon, href: "/chat" },
  { label: "Schedule", Icon: CalendarDays },
  { label: "Explore", Icon: Compass },
];

import React from "react";

type Props = {
  activeLabel?: string;
};

export default function BottomNav({ activeLabel = "L•AI•C" }: Props) {
  const router = useRouter();

  return (
    <nav className="h-[83px] pb-[20px] bg-bg grid grid-cols-5 px-2 pt-2 border-t border-white/5 shrink-0">
      {ITEMS.map(({ label, Icon, href }) => {
        const active = label === activeLabel;
        return (
          <button
            key={label}
            onClick={() => href && router.push(href)}
            className={`flex flex-col items-center justify-center gap-1 ${
              active ? "text-fg" : "text-fg-dim"
            } active:opacity-60`}
          >
            <Icon size={22} strokeWidth={1.6} />
            <span className="text-[10px]">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
