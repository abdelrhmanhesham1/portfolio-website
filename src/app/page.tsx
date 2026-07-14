import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";

// Work + Contact are shells — replaced by full implementations in P4/P5.

export default function Home() {
  return (
    <MotionProvider>
      <div id="top">
        <Header />

        <main>
          <Hero />
          <About />

          <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="work-heading" className="font-display text-3xl font-bold">
              Featured Work
            </h2>
            <p className="mt-3 text-muted">
              Selected projects — aviation platforms, applied ML research, and production backends.
            </p>
            <ul className="mt-8 space-y-4">
              {featuredProjects.map((project) => (
                <li
                  key={project.slug}
                  className="bg-grad-card rounded-xl border border-navy-800 p-6"
                >
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="rounded border border-cyan-400/40 px-2 py-0.5 font-mono text-xs text-cyan-400">
                      {project.gate}
                    </span>
                    <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                    <span className="text-sm text-muted">{project.type}</span>
                  </div>
                  <p className="mt-3 text-muted">{project.oneLiner}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 id="contact-heading" className="font-display text-3xl font-bold">
              Get in touch
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Open to software & AI engineering roles in aviation technology — based in Cairo,
              available globally.
            </p>
            <div className="mt-8 flex flex-col gap-2 font-mono text-sm">
              <a href={`tel:${profile.phone.replace(/ /g, "")}`} className="text-cyan-400 hover:underline">
                {profile.phone}
              </a>
              <a href={`mailto:${profile.email}`} className="text-cyan-400 hover:underline">
                {profile.email}
              </a>
            </div>
          </div>
        </section>
        </main>

        <Footer />
      </div>
    </MotionProvider>
  );
}
