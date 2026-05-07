"use client";

import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  bg?: string;
  bgAlt?: string;
  bgWidth?: number;
  bgHeight?: number;
  children?: ReactNode;
};

/**
 * Renders a screen-sized container with an optional Figma screenshot
 * background. Children are positioned absolutely on top.
 */
export default function PhoneScreen({
  bg,
  bgAlt = "",
  bgWidth = 375,
  bgHeight = 812,
  children,
}: Props) {
  return (
    <div className="absolute inset-0 bg-bg select-none">
      {bg && (
        <Image
          src={bg}
          alt={bgAlt}
          width={bgWidth}
          height={bgHeight}
          priority
          draggable={false}
          className="block w-full h-full object-cover pointer-events-none"
        />
      )}
      {children}
    </div>
  );
}
