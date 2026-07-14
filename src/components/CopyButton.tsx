"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/http) — the value is visible as text anyway
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex items-center gap-1 rounded p-1 text-muted transition-colors hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="size-4 text-green-400" aria-hidden="true" />
          <span className="font-mono text-[10px] text-green-400">Copied</span>
        </>
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
