import { z } from "zod";

// Experience timeline (PORTFOLIO_PLAN.md §6.3), chronological.

const entrySchema = z.object({
  period: z.string().min(4),
  title: z.string().min(1),
  org: z.string().min(1),
  detail: z.string().min(1),
});

export type ExperienceEntry = z.infer<typeof entrySchema>;

export const experience: ExperienceEntry[] = z.array(entrySchema).parse([
  {
    period: "2022",
    title: "B.A.Sc. Computer Science — Aviation Information Systems",
    org: "Zagazig National University",
    detail: "Started the specialization; graduated June 2026 with GPA 3.922/4.0, ranked 6th of 108.",
  },
  {
    period: "2023",
    title: "Aviation Systems Internships",
    org: "EGSA · EgyptAir · NANSC",
    detail:
      "CubeSat and satellite subsystems at the Egyptian Space Agency; web/database system at EgyptAir; radar systems, CNS/ATM and the Cairo ATC tower at NANSC.",
  },
  {
    period: "2024–2025",
    title: "Machine Learning Intern",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    detail:
      "6-month intensive ML/DL/NLP program; built Jobotic's recommendation engine and CV extraction — 1st of ~300 graduation projects.",
  },
  {
    period: "2025",
    title: "Team Leader & Backend Lead — Gate Buddy",
    org: "Zagazig University",
    detail:
      "Led an 8-person team building an AI-powered airport platform; owned backend architecture, database, APIs, and AI integration.",
  },
  {
    period: "2026",
    title: "Co-Founder & AI Manager",
    org: "Nowarha",
    detail:
      "Lead AI development for an AI-powered home electricity intelligence platform (IoT + AI); also AI Intern at CodeAlpha (July 2026, remote).",
  },
]);
