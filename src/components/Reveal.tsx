"use client";

import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";

// Fail-open scroll reveal (plan §5.5 + §11): server HTML is fully visible —
// no-JS, slow networks, and crawlers always see content. After hydration,
// only elements still below the viewport opt into the rise-and-fade entrance;
// anything already on screen stays untouched. Reduced motion disables it all.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const probeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const node = probeRef.current;
    if (!node || reduceMotion) return;
    if (node.getBoundingClientRect().top > window.innerHeight) {
      setAnimated(true);
    }
  }, [reduceMotion]);

  if (!animated) {
    return (
      <div ref={probeRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      {children}
    </m.div>
  );
}
