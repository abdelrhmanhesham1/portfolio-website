import Image from "next/image";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Highlight from "@/components/Highlight";
import TiltCard from "@/components/TiltCard";

const SKILL_ACCENTS = [
  { heading: "text-cyan-400", border: "border-t-cyan-500/60" },
  { heading: "text-violet-400", border: "border-t-violet-500/60" },
  { heading: "text-amber-400", border: "border-t-amber-500/60" },
  { heading: "text-green-400", border: "border-t-green-400/60" },
  { heading: "text-cyan-400", border: "border-t-cyan-500/60" },
];

const NODE_ACCENTS = ["border-cyan-400", "border-violet-400", "border-amber-400", "border-green-400", "border-cyan-400"];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-24 overflow-hidden py-24">
      <div aria-hidden="true" className="glow-violet absolute -left-40 top-10 size-[30rem]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="01" title="About" headingId="about-heading" accent="cyan" />

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(260px,340px)_1fr]">
          <Reveal delay={0.08}>
            <TiltCard className="bg-grad-card rounded-2xl border border-navy-800 p-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-navy-800 bg-navy-950/60">
                <Image
                  src="/photos/abdelrhman-hesham.jpeg"
                  alt="Abdelrhman Hesham Galal in a suit beside the Egyptian flag"
                  fill
                  sizes="(min-width: 768px) 340px, 90vw"
                  className="object-cover object-top"
                  priority={false}
                />
              </div>
              <dl className="mt-6 space-y-3">
                {profile.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[86px_1fr] items-baseline gap-3"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                      {fact.label}
                    </dt>
                    <dd className="text-xs leading-relaxed text-muted">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="space-y-5 text-[17px] leading-relaxed text-muted">
              {profile.story.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>
                  <Highlight text={paragraph} className="font-medium text-foreground" />
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Experience timeline */}
        <Reveal delay={0.08}>
          <h3 className="mt-20 font-display text-2xl font-semibold">
            Experience <span aria-hidden="true" className="text-gradient">/</span>
          </h3>
        </Reveal>
        <ol className="mt-8 border-l border-navy-800 pl-0">
          {experience.map((entry, i) => (
            <li key={entry.period + entry.org} className="relative pb-10 pl-8 last:pb-0">
              <Reveal delay={0.05 * i}>
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-1.5 size-2.5 rounded-full border ${NODE_ACCENTS[i % NODE_ACCENTS.length]} bg-navy-950`}
                />
                <p className={`font-mono text-xs ${SKILL_ACCENTS[i % SKILL_ACCENTS.length].heading}`}>
                  {entry.period}
                </p>
                <p className="mt-1 font-display font-semibold">
                  {entry.title}{" "}
                  <span className="font-sans text-sm font-normal text-muted">· {entry.org}</span>
                </p>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{entry.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Skills */}
        <Reveal delay={0.08}>
          <h3 className="mt-20 font-display text-2xl font-semibold">
            Skills <span aria-hidden="true" className="text-gradient">/</span>
          </h3>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group, i) => {
            const accent = SKILL_ACCENTS[i % SKILL_ACCENTS.length];
            return (
              <Reveal key={group.group} delay={0.05 * i}>
                <div
                  className={`bg-grad-card h-full rounded-xl border border-navy-800 border-t-2 ${accent.border} p-5 transition-shadow hover:shadow-[0_0_28px_rgba(6,182,212,0.1)]`}
                >
                  <p className={`font-mono text-xs uppercase tracking-wider ${accent.heading}`}>
                    {group.group}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-navy-800 bg-navy-950/50 px-3 py-1 text-xs text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Awards */}
        <Reveal delay={0.08}>
          <h3 className="mt-20 font-display text-2xl font-semibold">
            Awards <span aria-hidden="true" className="text-gradient">/</span>
          </h3>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.awards.map((award, i) => (
            <li key={award.title} className="h-full">
              <Reveal
                delay={0.05 * i}
                className="bg-grad-card h-full rounded-xl border-l-2 border-amber-500 p-5 transition-shadow hover:shadow-[0_0_28px_rgba(255,138,61,0.12)]"
              >
                <p className="font-mono text-xs text-amber-400">{award.year}</p>
                <p className="mt-2 font-display text-sm font-semibold leading-snug">
                  {award.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{award.detail}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
