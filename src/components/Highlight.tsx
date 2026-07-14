import { Fragment } from "react";

// Renders **highlight** spans inside content strings as accent-colored text.
// Server-compatible — no hooks, no client boundary.
export default function Highlight({
  text,
  className = "font-medium text-cyan-400",
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className={className}>
            {part.slice(2, -2)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
