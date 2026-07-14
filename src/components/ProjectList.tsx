"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Project } from "@/content/projects";

const STATUS_STYLES: Record<Project["status"], string> = {
  Live: "bg-green-400",
  Shipped: "bg-cyan-400",
  "In development": "bg-amber-400",
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ slug: string; index: number } | null>(null);
  const rowRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const reduceMotion = useReducedMotion();

  // Esc collapses the expanded card and returns focus to its row (plan §11)
  useEffect(() => {
    if (!expanded || lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        rowRefs.current.get(expanded)?.focus();
        setExpanded(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, lightbox]);

  const lightboxProject = lightbox
    ? projects.find((p) => p.slug === lightbox.slug)
    : undefined;

  return (
    <>
      <ul className="mt-10 space-y-4">
        {projects.map((project) => {
          const isOpen = expanded === project.slug;
          const panelId = `project-panel-${project.slug}`;
          return (
            <li key={project.slug}>
              <m.div
                layout={!reduceMotion}
                className={`bg-grad-card overflow-hidden rounded-2xl border transition-colors ${
                  isOpen ? "border-cyan-400/50" : "border-navy-800 hover:border-navy-800/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.08)]"
                }`}
              >
                <button
                  type="button"
                  ref={(node) => {
                    if (node) rowRefs.current.set(project.slug, node);
                    else rowRefs.current.delete(project.slug);
                  }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setExpanded(isOpen ? null : project.slug)}
                  className="flex w-full items-center gap-4 p-6 text-left"
                >
                  <span className="shrink-0 rounded border border-cyan-400/40 px-2 py-1 font-mono text-xs text-cyan-400">
                    {project.gate}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-lg font-semibold sm:text-xl">
                        {project.title}
                      </h3>
                      <span className="text-xs text-muted sm:text-sm">{project.type}</span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {project.oneLiner}
                    </span>
                  </span>
                  <span className="hidden shrink-0 items-center gap-2 font-mono text-xs text-muted sm:flex">
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-full ${STATUS_STYLES[project.status]} ${
                        project.status === "Live" ? "animate-pulse" : ""
                      }`}
                    />
                    {project.status}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-5 shrink-0 text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={panelId}
                      key="panel"
                      initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div className="border-t border-navy-800 p-6">
                        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(200px,240px)]">
                          <div>
                            <p className="max-w-3xl leading-relaxed text-muted">
                              {project.summary}
                            </p>

                            <ul className="mt-5 flex flex-wrap gap-2">
                              {project.tech.map((t) => (
                                <li
                                  key={t}
                                  className="rounded-full border border-navy-800 bg-navy-950/50 px-3 py-1 text-xs text-muted"
                                >
                                  {t}
                                </li>
                              ))}
                            </ul>

                            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
                              {project.links.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-cyan-400 underline-offset-4 hover:underline"
                                >
                                  {link.label} ↗
                                </a>
                              ))}
                              <a
                                href="#contact"
                                className="text-muted underline-offset-4 hover:text-foreground hover:underline"
                              >
                                Get in touch →
                              </a>
                            </div>
                          </div>

                          <div className="rounded-xl border border-navy-800 bg-navy-950/50 p-5 text-center lg:self-start">
                            <p className="font-mono text-4xl font-bold text-gradient">
                              {project.metric.value}
                            </p>
                            <p className="mt-2 text-xs leading-relaxed text-muted">
                              {project.metric.label}
                            </p>
                          </div>
                        </div>

                        {project.photos.length > 0 && (
                          <ul className="mt-7 flex flex-wrap gap-3">
                            {project.photos.map((photo, index) => (
                              <li key={photo.src}>
                                <button
                                  type="button"
                                  onClick={() => setLightbox({ slug: project.slug, index })}
                                  className="block overflow-hidden rounded-lg border border-navy-800 transition-transform hover:scale-[1.02]"
                                  aria-label={`Open screenshot: ${photo.alt}`}
                                >
                                  <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={photo.width}
                                    height={photo.height}
                                    sizes="(min-width: 640px) 220px, 45vw"
                                    className="h-28 w-auto object-cover object-top"
                                  />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            </li>
          );
        })}
      </ul>

      <Lightbox
        open={lightbox !== null}
        close={() => setLightbox(null)}
        index={lightbox?.index ?? 0}
        slides={
          lightboxProject?.photos.map((p) => ({
            src: p.src,
            width: p.width,
            height: p.height,
            alt: p.alt,
          })) ?? []
        }
      />
    </>
  );
}
