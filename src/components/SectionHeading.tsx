import Reveal from "@/components/Reveal";

const ACCENTS = {
  cyan: "text-cyan-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
  green: "text-green-400",
} as const;

export default function SectionHeading({
  index,
  title,
  headingId,
  intro,
  accent = "cyan",
}: {
  index: string;
  title: string;
  headingId: string;
  intro?: string;
  accent?: keyof typeof ACCENTS;
}) {
  return (
    <Reveal>
      <p className={`font-mono text-sm tracking-widest ${ACCENTS[accent]}`}>
        {index} — {title.toUpperCase()}
      </p>
      <h2 id={headingId} className="mt-3 font-display text-3xl font-bold sm:text-4xl">
        {title}
      </h2>
      <div className="heading-bar mt-4" aria-hidden="true" />
      {intro && <p className="mt-5 max-w-2xl leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
