"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { profile } from "@/content/profile";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-900/70 backdrop-blur-md border-b border-navy-800 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-display font-semibold text-foreground"
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full border border-cyan-400/60 bg-grad-card font-mono text-xs text-cyan-400"
          >
            AH
          </span>
          <span className="hidden sm:inline">Abdelrhman Hesham Galal</span>
          <span className="sr-only sm:hidden">Abdelrhman Hesham Galal — home</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="rounded-full p-2 text-muted transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="rounded-full p-2 text-muted transition-colors hover:text-foreground"
          >
            <LinkedInIcon className="size-5" />
          </a>
          <a
            href={profile.links.cv}
            download
            className="bg-grad-cta rounded-full px-4 py-2 text-sm font-semibold text-navy-950 shadow-[0_8px_32px_rgba(255,138,61,0.25)] transition-transform hover:scale-[1.03]"
          >
            Download CV
          </a>
        </div>

        <button
          type="button"
          className="p-2 md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="size-6" aria-hidden="true" />
          ) : (
            <Menu className="size-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-[57px] z-40 flex flex-col gap-2 bg-navy-950/95 p-6 backdrop-blur-md md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-4 py-4 font-display text-2xl font-semibold text-foreground hover:bg-navy-900"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex items-center gap-4 px-4">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-2 text-muted"
            >
              <GitHubIcon className="size-6" />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-2 text-muted"
            >
              <LinkedInIcon className="size-6" />
            </a>
            <a
              href={profile.links.cv}
              download
              className="bg-grad-cta rounded-full px-5 py-3 text-sm font-semibold text-navy-950"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
