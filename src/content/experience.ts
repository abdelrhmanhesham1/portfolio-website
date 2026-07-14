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
    detail:
      "Started the specialization; graduated June 2026 with GPA 3.922/4.0, ranked 6th of 108 — alongside 14 aviation subjects from Air Law to Satellite Navigation.",
  },
  {
    period: "Jul 2023",
    title: "Aerospace Intern",
    org: "Egyptian Space Agency (EGSA)",
    detail:
      "Explored CubeSat development, satellite subsystems, and space technology workflows — my first look at flight systems engineered to never fail.",
  },
  {
    period: "Aug 2023",
    title: "Software Intern",
    org: "EgyptAir",
    detail:
      "Built a web and database system inside a national carrier, absorbing how airline operational processes actually run day to day.",
  },
  {
    period: "Sep 2023",
    title: "Air Navigation Intern",
    org: "National Air Navigation Services Company (NANSC)",
    detail:
      "Studied radar systems, air navigation technologies, and CNS/ATM operations — including on-site time in the Cairo air traffic control tower.",
  },
  {
    period: "2024 – 2025",
    title: "Machine Learning Intern",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    detail:
      "6-month intensive ML/DL/NLP program working with datasets exceeding 50,000 rows; built Jobotic's recommendation engine and CV extraction — 1st of ~300 graduation projects.",
  },
  {
    period: "2025",
    title: "Team Leader & Backend Lead — Gate Buddy",
    org: "Zagazig University",
    detail:
      "Led an 8-person team building an AI-powered airport platform; owned backend architecture, database, APIs, and AI integration while coordinating frontend and mobile developers through defined API contracts.",
  },
  {
    period: "2025 – Present",
    title: "Backend Instructor",
    org: "ZNU Student Community",
    detail:
      "Authored and teach a 16-week backend track — Node.js, Express, and MongoDB — taking students from setup guides through projects to certification prep.",
  },
  {
    period: "2026 – Present",
    title: "Co-Founder & AI Manager",
    org: "Nowarha",
    detail:
      "Lead AI development for an AI-powered home electricity intelligence platform (IoT + AI) with an 8-person founding team — load forecasting, bill prediction, and anomaly detection in production focus.",
  },
  {
    period: "Jul 2026",
    title: "AI Intern",
    org: "CodeAlpha (Remote)",
    detail:
      "Shipped a real-time object detection and tracking pipeline (YOLOv8 + ByteTrack, 80 COCO classes with persistent IDs) and a 100+ language translation tool with speech output.",
  },
]);
