import { featuredProjects, secondaryProjects } from "@/content/projects";
import ProjectList from "@/components/ProjectList";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative scroll-mt-24 overflow-hidden py-24"
    >
      <div aria-hidden="true" className="glow-cyan absolute -right-40 top-24 size-[32rem]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          title="Featured Work"
          headingId="work-heading"
          accent="violet"
          intro="Selected projects — aviation platforms, applied ML research, and production backends. Click a row to open the full story, metrics, and screenshots."
        />

        <ProjectList projects={featuredProjects} />

        <Reveal delay={0.08}>
          <h3 className="mt-20 font-display text-2xl font-semibold">
            More projects <span aria-hidden="true" className="text-gradient">/</span>
          </h3>
          <p className="mt-2 text-justify text-sm text-muted">
            Smaller builds that round out the picture — data science, backends, and aviation
            safety documentation.
          </p>
        </Reveal>

        <ProjectList projects={secondaryProjects} />
      </div>
    </section>
  );
}
