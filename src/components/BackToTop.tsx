"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="bg-grad-cta fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full text-navy-950 shadow-[0_8px_32px_rgba(255,138,61,0.35)] transition-transform hover:scale-110"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
