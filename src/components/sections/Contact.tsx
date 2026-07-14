import { Download, Mail, Phone } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 id="contact-heading" className="font-display text-3xl font-bold">
            Get in touch
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Open to software & AI engineering roles in aviation technology — based in Cairo,
            available globally.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(280px,380px)_1fr]">
          <Reveal delay={0.08}>
            <div className="space-y-5">
              <p className="font-mono text-sm text-green-400">
                <span
                  className="mr-2 inline-block size-2 animate-pulse rounded-full bg-green-400 align-middle"
                  aria-hidden="true"
                />
                {profile.availability}
              </p>

              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-cyan-400" aria-hidden="true" />
                <a
                  href={`tel:${profile.phone.replace(/ /g, "")}`}
                  className="font-mono text-sm hover:text-cyan-400"
                >
                  {profile.phone}
                </a>
                <CopyButton value={profile.phone} label="phone number" />
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-cyan-400" aria-hidden="true" />
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all font-mono text-sm hover:text-cyan-400"
                >
                  {profile.email}
                </a>
                <CopyButton value={profile.email} label="email address" />
              </div>

              <div className="flex items-center gap-3">
                <GitHubIcon className="size-4 shrink-0 text-cyan-400" />
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm hover:text-cyan-400"
                >
                  github.com/abdelrhmanhesham1
                </a>
              </div>

              <div className="flex items-center gap-3">
                <LinkedInIcon className="size-4 shrink-0 text-cyan-400" />
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm hover:text-cyan-400"
                >
                  linkedin.com/in/abdelrhman-hesham11
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Download className="size-4 shrink-0 text-cyan-400" aria-hidden="true" />
                <a href={profile.links.cv} download className="font-mono text-sm hover:text-cyan-400">
                  Download CV (PDF)
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
