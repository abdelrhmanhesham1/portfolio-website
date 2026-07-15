"use client";

import { useCallback, useRef, useState } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Plane } from "lucide-react";

// The signature motion accent (plan §5.4): a dashed vertical line on the left
// edge that fills with the brand gradient as the visitor scrolls, with a small
// plane tracking the progress. The plane doubles as a scrollbar thumb — drag
// it (or click anywhere on the track) to fly through the page. Desktop only;
// disabled for reduced motion.
export default function FlightPath() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });
  const planeTop = useTransform(smooth, (v) => `${Math.min(v * 100, 99)}%`);
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const scrollToPointer = useCallback(
    (clientY: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const fraction = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // "instant" overrides the html { scroll-behavior: smooth } rule — a
      // smooth-animated scroll would trail the pointer on every move.
      window.scrollTo({ top: fraction * max, behavior: "instant" });
      // Snap the spring too, so the plane sticks to the pointer instead of
      // springing after it.
      smooth.jump(fraction);
    },
    [smooth]
  );

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      // Above the header (z-50) like a real scrollbar — otherwise the header
      // swallows drags near the top of the track and hides the plane there.
      className="pointer-events-none fixed inset-y-0 left-6 z-[60] hidden xl:block"
    >
      <div ref={trackRef} className="relative h-full w-px border-l border-dashed border-navy-800">
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

        {/* Invisible widened hit strip over the track — the actual scrollbar
            control. Mouse-only convenience (the page scrolls natively), so it
            stays out of the accessibility tree with its decorative parent. */}
        <div
          className={`pointer-events-auto absolute inset-y-0 -left-3 w-6 touch-none select-none ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onPointerDown={(e) => {
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            setDragging(true);
            scrollToPointer(e.clientY);
          }}
          onPointerMove={(e) => {
            if (dragging) scrollToPointer(e.clientY);
          }}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
        />
      </div>
    </div>
  );
}
