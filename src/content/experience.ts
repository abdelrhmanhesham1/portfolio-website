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
      "Explored CubeSat development, satellite subsystems, and space technologies—my first hands-on exposure to aerospace systems engineering.",
  },
  {
    period: "Aug 2023",
    title: "Software Intern",
    org: "EgyptAir",
    detail:
      "Built a web and database system while gaining practical insight into airline operations and workflows.",
  },
  {
    period: "Sep 2023",
    title: "Air Navigation Intern",
    org: "National Air Navigation Services Company (NANSC)",
    detail:
      "Studied radar systems, air navigation technologies, and air traffic management through technical training and an on-site visit to the Cairo Air Traffic Control (ATC) Tower.",
  },
  {
    period: "2024 – 2025",
    title: "Machine Learning Intern",
    org: "Digital Egypt Pioneers Initiative (DEPI)",
    detail:
      "Completed an intensive 6-month ML/DL/NLP program working with datasets exceeding 50,000 rows. Built Jobotic's recommendation engine and CV extraction — **1st rank** out of ~300 graduation projects.",
  },
  {
    period: "2025",
    title: "Software Fundamentals Instructor",
    org: "ZNU Robotics Community",
    detail:
      "Authored and taught a 16-week backend track — Node.js, Express, and MongoDB — taking students from setup guides through projects to certification prep.",
  },
  {
    period: "2025",
    title: "Backend Instructor",
    org: "ZNU Robotics Community",
    detail:
      "Authored and taught a 16-week backend engineering track for 25 students, covering Node.js, Express, and MongoDB while guiding students from backend fundamentals to production-ready REST APIs and project development.",
  },
  {
    period: "2025 – 2026",
    title: "Graduation Project - Team Leader & Backend Lead",
    org: "Gate Buddy · Zagazig University",
    detail:
      "Led an 8-person team and engineered the backend, delivering 40+ REST APIs, IATA BCBP parsing, geospatial wayfinding with Dijkstra + MongoDB 2dsphere, and a FastAPI recommendation microservice.",
  },
  {
    period: "Apr 2026",
    title: "Research Methodology Trainee",
    org: "ZNU Robotics Community – Scientific Research Team",
    detail:
      "Completed a 64-hour Research Methodology program, developing a research proposal while building practical skills in experimental design, literature review, scientific writing, and R&D workflows.",
  },
  {
    period: "Jul 2026",
    title: "AI Intern",
    org: "CodeAlpha (Remote)",
    detail:
      "Built a real-time object detection and tracking pipeline (YOLOv8 + ByteTrack) with persistent IDs across 80 COCO classes, plus a multilingual translation tool supporting 100+ languages, abbreviation expansion, and text-to-speech.",
  },
  {
    period: "2026 – Present",
    title: "Co-Founder & AI Manager",
    org: "Nowarha",
    detail:
      "Lead AI development for an AI-powered home electricity intelligence platform (IoT + AI) with an 8-person founding team — load forecasting, bill prediction, and anomaly detection in production focus.",
  },
]);
