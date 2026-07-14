import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="border-t border-navy-800">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display font-semibold">{profile.fullName}</p>
          <p className="mt-2 text-sm text-muted">{profile.role}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
          <a href="#about" className="text-muted transition-colors hover:text-foreground">
            About
          </a>
          <a href="#work" className="text-muted transition-colors hover:text-foreground">
            Work
          </a>
          <a href="#contact" className="text-muted transition-colors hover:text-foreground">
            Contact
          </a>
        </nav>

        <div className="flex flex-col gap-2 text-sm">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-muted transition-colors hover:text-foreground"
          >
            {profile.email}
          </a>
          <a href={profile.links.cv} download className="text-muted transition-colors hover:text-foreground">
            Download CV (PDF)
          </a>
        </div>
      </div>

      <div className="border-t border-navy-800/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <p className="font-mono text-xs text-muted">
            © 2026 {profile.fullName} · Cairo, Egypt
          </p>
          <a
            href="#top"
            className="font-mono text-xs text-muted transition-colors hover:text-foreground"
            aria-label="Back to top"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
