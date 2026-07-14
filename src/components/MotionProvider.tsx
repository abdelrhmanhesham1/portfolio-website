"use client";

import { LazyMotion, domAnimation } from "motion/react";

// Single LazyMotion provider — all animated components use `m.*` (strict mode
// enforces this), keeping the motion bundle at ~1/3 of the full library.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
