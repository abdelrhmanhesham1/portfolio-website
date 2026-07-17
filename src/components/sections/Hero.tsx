import { profile } from "@/content/profile";
import CountUp from "@/components/CountUp";
import RotatingText from "@/components/RotatingText";
import Magnetic from "@/components/Magnetic";

const STAT_COLORS = [
  "text-cyan-400",
  "text-amber-400",
  "text-violet-400",
  "text-green-400",
  "text-cyan-400",
];

// Entrance animations are pure CSS (.rise-in) — they run with the first paint,
// before hydration, and never hide content from no-JS visitors (plan §11).
export default function Hero() {
  const [roleBase] = profile.role.split(" — ");

  return (
    <section
      aria-labelledby="hero-heading"
      className="dotted-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center sm:px-6"
    >
      {/* Atmosphere glows */}
      <div aria-hidden="true" className="glow-violet absolute -top-32 right-[-10%] size-[36rem]" />
      <div aria-hidden="true" className="glow-cyan absolute bottom-[-15%] left-[-10%] size-[32rem]" />
      <div aria-hidden="true" className="glow-amber absolute bottom-[10%] right-[5%] size-[24rem]" />

      <div className="relative">
        <p className="rise-in font-mono text-sm text-muted">
          <span
            className="mr-2 inline-block size-2 animate-pulse rounded-full bg-green-400 align-middle"
            aria-hidden="true"
          />
          <span className="text-green-400">{profile.availability}</span>
          <span className="mx-2 text-navy-800">|</span>
          {profile.location}
        </p>

        {/* No entrance animation on the h1 — the name is the LCP element and
            must paint with the first frame (plan §10 budget). */}
        <h1
          id="hero-heading"
          className="mt-6 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-tight tracking-tight"
        >
          <span className="text-gradient">{profile.fullName}</span>
        </h1>

        <p className="rise-in rise-in-2 mt-4 font-display text-xl font-semibold text-foreground/90 sm:text-2xl">
          {roleBase} — <RotatingText items={profile.rotatingSpecialties} />
        </p>

        <p className="rise-in rise-in-5 mx-auto mt-6 max-w-3xl text-center leading-relaxed text-muted">
          {profile.tagline}
        </p>

        <div className="rise-in rise-in-4 mt-9 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href="#work"
              className="bg-grad-cta inline-block rounded-full px-6 py-3 font-semibold text-navy-950 shadow-[0_8px_32px_rgba(255,138,61,0.3)] transition-shadow hover:shadow-[0_8px_44px_rgba(255,138,61,0.5)]"
            >
              View my work ↓
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-block rounded-full border border-cyan-500/40 px-6 py-3 text-foreground transition-colors hover:border-cyan-400 hover:bg-cyan-500/10"
            >
              Get in touch
            </a>
          </Magnetic>
        </div>

        <dl className="rise-in rise-in-5 mx-auto mt-16 flex max-w-4xl flex-wrap items-start justify-center gap-x-10 gap-y-6">
          {profile.stats.map((stat, i) => (
            <div key={stat.label} className="min-w-28">
              <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </dt>
              <dd className={`order-1 font-mono text-2xl font-semibold ${STAT_COLORS[i % STAT_COLORS.length]}`}>
                {stat.countTo !== null ? (
                  <CountUp
                    to={stat.countTo}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                ) : (
                  stat.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
