import { Download, Mail, Phone } from "lucide-react";
import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden py-24"
    >
      {/* Radar sweep atmosphere — decorative, collapses under reduced motion */}
      <div
        aria-hidden="true"
        className="radar-sweep absolute -right-48 top-1/2 size-[40rem] -translate-y-1/2 opacity-70"
      />
      <div aria-hidden="true" className="glow-green absolute -left-32 bottom-0 size-[26rem]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          title="Get in touch"
          headingId="contact-heading"
          accent="green"
          intro="Open to software & AI engineering roles in aviation technology — based in Cairo, available globally. Direct lines below, or send a message and I'll reply within 24 hours."
        />

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
