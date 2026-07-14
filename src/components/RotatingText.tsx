"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

// Rotates specialty phrases with a precise vertical flip (plan §6.2) — a
// typographic nod to flight-information displays, no themed wording.
// Screen readers get the static first item only; the animation is decorative.
export default function RotatingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(id);
  }, [items.length, reduceMotion]);

  if (reduceMotion || items.length < 2) {
    return <span>{items[0]}</span>;
  }

  return (
    <>
      <span className="sr-only">{items[0]}</span>
      <span
        aria-hidden="true"
        className="relative inline-flex overflow-hidden align-bottom"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={index}
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            exit={{ y: "-105%" }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="inline-block whitespace-nowrap"
          >
            {items[index]}
          </m.span>
        </AnimatePresence>
      </span>
    </>
  );
}
