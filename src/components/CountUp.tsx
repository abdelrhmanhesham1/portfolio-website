"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// Counts up once when scrolled into view. The final value is rendered in the
// markup from the start (SEO / no-JS / screen readers always see the real
// number); the animation only ever runs on top of it.
export default function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-48px" });
  const reduceMotion = useReducedMotion();
  const finalText = `${prefix}${to.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, decimals, prefix, suffix]);

  return (
    <span ref={ref} aria-label={finalText}>
      {finalText}
    </span>
  );
}
