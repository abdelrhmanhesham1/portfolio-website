import { z } from "zod";

// Single source of truth for personal facts (PORTFOLIO_PLAN.md §3).
// Mirrors cv/build_cv.py — update both together.

const linkSchema = z.object({
  label: z.string().min(1),
  href: z.union([z.string().url(), z.string().regex(/^(mailto:|tel:|\/)/)]),
});

const statSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  // Numeric part for count-up animation; null = render statically
  countTo: z.number().nullable(),
  decimals: z.number().int().min(0).max(3).default(0),
  prefix: z.string().default(""),
  suffix: z.string().default(""),
});

const profileSchema = z.object({
  fullName: z.string().min(1),
  role: z.string().min(1),
  rotatingSpecialties: z.array(z.string().min(1)).min(1),
  tagline: z.string().min(1),
  location: z.string().min(1),
  availability: z.string().min(1),
  phone: z.string().regex(/^\+[0-9 ]+$/),
  email: z.string().email(),
  links: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    cv: z.string().startsWith("/"),
  }),
  stats: z.array(statSchema).min(3).max(6),
  story: z.array(z.string().min(1)).length(3),
  facts: z.array(z.string().min(1)),
  skills: z.array(
    z.object({ group: z.string().min(1), items: z.array(z.string().min(1)).min(1) })
  ),
  awards: z.array(
    z.object({
      year: z.string().min(4),
      title: z.string().min(1),
      detail: z.string().min(1),
    })
  ),
  extraLinks: z.array(linkSchema),
});

export type Profile = z.infer<typeof profileSchema>;
export type Stat = z.infer<typeof statSchema>;

export const profile: Profile = profileSchema.parse({
  fullName: "Abdelrhman Hesham Galal",
  role: "AI/ML & Backend Engineer — Aviation Information Systems",
  rotatingSpecialties: [
    "Aviation Information Systems",
    "Machine Learning & NLP",
    "Backend Engineering",
  ],
  tagline:
    "I build production AI and backend systems for the aviation industry — from airport passenger platforms to airline sentiment intelligence.",
  location: "Cairo, Egypt (UTC+2)",
  availability: "Open to full-time roles",
  phone: "+20 1000107202",
  email: "abdelrhmanhesham030@gmail.com",
  links: {
    github: "https://github.com/abdelrhmanhesham1",
    linkedin: "https://www.linkedin.com/in/abdelrhman-hesham11/",
    cv: "/cv/Abdelrhman-Hesham-Galal-CV.pdf",
  },
  stats: [
    { value: "3.922/4.0", label: "GPA", countTo: 3.922, decimals: 3, prefix: "", suffix: "/4.0" },
    { value: "6th of 108", label: "Class rank", countTo: null, decimals: 0, prefix: "", suffix: "" },
    { value: "4×", label: "Competition wins", countTo: 4, decimals: 0, prefix: "", suffix: "×" },
    { value: "40+", label: "API endpoints shipped", countTo: 40, decimals: 0, prefix: "", suffix: "+" },
    { value: "93.5%", label: "Model accuracy", countTo: 93.5, decimals: 1, prefix: "", suffix: "%" },
  ],
  story: [
    "I'm a computer science graduate (June 2026) from Zagazig National University, specialized in Aviation Information Systems — GPA 3.922/4.0, ranked 6th of 108.",
    "My differentiator is real aviation-industry exposure: internships at the Egyptian Space Agency, EgyptAir, and NANSC (radar systems, CNS/ATM, and the Cairo ATC tower) combined with production engineering — I single-handedly built Gate Buddy's 40+ endpoint backend and fine-tuned DistilBERT models for airline sentiment research at 93.5% accuracy.",
    "Today I'm co-founder and AI manager at Nowarha, an AI-powered home electricity intelligence startup, after graduating from the DEPI machine learning program with repeated competition wins along the way.",
  ],
  facts: [
    "B.A.Sc. CS — Aviation Information Systems",
    "ZNU, 2022–2026 — GPA 3.922/4.0, 6th of 108",
    "Co-Founder & AI Manager, Nowarha",
  ],
  skills: [
    { group: "Languages", items: ["Python", "JavaScript", "TypeScript", "C++", "SQL"] },
    {
      group: "ML / AI",
      items: [
        "PyTorch",
        "HuggingFace Transformers",
        "Scikit-learn",
        "NLP",
        "Deep Learning",
        "Model Evaluation",
      ],
    },
    {
      group: "Backend",
      items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JWT / OAuth"],
    },
    { group: "Data", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly"] },
    { group: "Tools", items: ["Git", "Postman", "React", "Next.js"] },
  ],
  awards: [
    {
      year: "2025",
      title: "1st Place — CLS/DEPI Graduation Competition",
      detail: "Jobotic AI career platform — 1st of ~300 projects",
    },
    {
      year: "2026",
      title: "1st Place — Creativa, Zagazig University",
      detail: "Nowarha — 5-judge panel",
    },
    {
      year: "2024",
      title: "1st Place — Sumo Robotics Competition",
      detail: "32-team single-elimination bracket",
    },
    {
      year: "2026",
      title: "3rd Place — NextGen Hackathon",
      detail: "Nowarha — 200+ competing projects",
    },
    {
      year: "2025",
      title: "Top 25% Globally — Energy Mentors Competition",
      detail: "231 teams",
    },
  ],
  extraLinks: [],
});
