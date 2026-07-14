import Image from "next/image";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 id="about-heading" className="font-display text-3xl font-bold">
            About
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(260px,340px)_1fr]">
          <Reveal delay={0.08}>
            <div className="bg-grad-card rounded-2xl border border-navy-800 p-6">
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
              <ul className="mt-6 space-y-2 font-mono text-xs leading-relaxed text-muted">
                {profile.facts.map((fact) => (
                  <li key={fact} className="border-l-2 border-cyan-400/50 pl-3">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="space-y-5 leading-relaxed text-muted">
              {profile.story.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Experience timeline */}
        <Reveal delay={0.08}>
          <h3 className="mt-20 font-display text-xl font-semibold">Experience</h3>
        </Reveal>
        <ol className="mt-8 space-y-0 border-l border-navy-800 pl-0">
          {experience.map((entry, i) => (
            <li key={entry.period + entry.org} className="relative pb-10 pl-8 last:pb-0">
              <Reveal delay={0.05 * i}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border border-cyan-400 bg-navy-950"
                />
                <p className="font-mono text-xs text-cyan-400">{entry.period}</p>
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
          <h3 className="mt-20 font-display text-xl font-semibold">Skills</h3>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group, i) => (
            <Reveal key={group.group} delay={0.05 * i}>
              <div className="bg-grad-card h-full rounded-xl border border-navy-800 p-5">
                <p className="font-mono text-xs uppercase tracking-wider text-cyan-400">
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
          ))}
        </div>

        {/* Awards */}
        <Reveal delay={0.08}>
          <h3 className="mt-20 font-display text-xl font-semibold">Awards</h3>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.awards.map((award, i) => (
            <li key={award.title} className="h-full">
              <Reveal
                delay={0.05 * i}
                className="bg-grad-card h-full rounded-xl border-l-2 border-amber-500 p-5"
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
