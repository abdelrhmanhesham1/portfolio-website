"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

// Split-flap style rotation: each character flips into place with a slight
// stagger — a typographic nod to flight-information displays, no themed
// wording. Screen readers get the static first item; animation is decorative.
export default function RotatingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 4200);
    return () => clearInterval(id);
  }, [items.length, reduceMotion]);

  if (reduceMotion || items.length < 2) {
    return <span>{items[0]}</span>;
  }

  const chars = Array.from(items[index]);

  return (
    <>
      <span className="sr-only">{items[0]}</span>
      <span aria-hidden="true" className="inline-block" style={{ perspective: "600px" }}>
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={index}
            className="inline-block whitespace-nowrap"
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
          >
            {chars.map((char, i) => (
              <m.span
                key={`${index}-${i}`}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.028,
                  type: "spring",
                  stiffness: 240,
                  damping: 20,
                }}
                className="inline-block text-gradient"
                style={{ transformOrigin: "50% 100%" }}
              >
                {char === " " ? " " : char}
              </m.span>
            ))}
          </m.span>
        </AnimatePresence>
      </span>
    </>
  );
}
