import { profile } from "@/content/profile";
import CountUp from "@/components/CountUp";
import RotatingText from "@/components/RotatingText";

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

      <div className="relative">
        <p className="rise-in font-mono text-sm text-muted">
          <span
            className="mr-2 inline-block size-2 animate-pulse rounded-full bg-green-400 align-middle"
            aria-hidden="true"
          />
          {profile.availability} · {profile.location}
        </p>

        <h1
          id="hero-heading"
          className="rise-in rise-in-1 mt-6 font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-tight tracking-tight"
        >
          {profile.fullName.split(" ").slice(0, 2).join(" ")}{" "}
          <span className="text-gradient">
            {profile.fullName.split(" ").slice(2).join(" ")}
          </span>
        </h1>

        <p className="rise-in rise-in-2 mt-4 font-display text-xl font-semibold text-muted sm:text-2xl">
          {roleBase} — <RotatingText items={profile.rotatingSpecialties} />
        </p>

        <p className="rise-in rise-in-3 mx-auto mt-6 max-w-2xl leading-relaxed text-muted">
          {profile.tagline}
        </p>

        <div className="rise-in rise-in-4 mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="bg-grad-cta rounded-full px-6 py-3 font-semibold text-navy-950 shadow-[0_8px_32px_rgba(255,138,61,0.25)] transition-transform hover:scale-[1.03]"
          >
            View my work ↓
          </a>
          <a
            href="#contact"
            className="rounded-full border border-navy-800 px-6 py-3 text-foreground transition-colors hover:border-cyan-400"
          >
            Get in touch
          </a>
        </div>

        <dl className="rise-in rise-in-5 mx-auto mt-16 flex max-w-4xl flex-wrap items-start justify-center gap-x-10 gap-y-6">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="min-w-28">
              <dt className="order-2 mt-1 text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </dt>
              <dd className="order-1 font-mono text-2xl font-semibold text-cyan-400">
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
