import { featuredProjects } from "@/content/projects";
import ProjectList from "@/components/ProjectList";
import Reveal from "@/components/Reveal";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 id="work-heading" className="font-display text-3xl font-bold">
            Featured Work
          </h2>
          <p className="mt-3 text-muted">
            Selected projects — aviation platforms, applied ML research, and production
            backends. Click a row for details.
          </p>
        </Reveal>

        <ProjectList projects={featuredProjects} />
      </div>
    </section>
  );
}
