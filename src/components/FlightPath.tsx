"use client";

import { m, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Plane } from "lucide-react";

// The signature motion accent (plan §5.4): a dashed vertical line on the left
// edge that fills with the brand gradient as the visitor scrolls, with a small
// plane tracking the progress. Desktop only; disabled for reduced motion.
export default function FlightPath() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const planeTop = useTransform(smooth, (v) => `${Math.min(v * 100, 99)}%`);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-6 z-40 hidden xl:block"
    >
      <div className="relative h-full w-px border-l border-dashed border-navy-800">
        <m.div
          className="absolute -left-px top-0 w-[3px] origin-top rounded-full"
          style={{
            height: "100%",
            scaleY: smooth,
            background:
              "linear-gradient(180deg, #22d3ee 0%, #a78bfa 55%, #ff8a3d 100%)",
          }}
        />
        <m.div className="absolute -left-[9px]" style={{ top: planeTop }}>
          <Plane className="size-[18px] rotate-[135deg] text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
        </m.div>
      </div>
    </div>
  );
}
