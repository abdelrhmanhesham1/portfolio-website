import { z } from "zod";
import { projects } from "./projects";
import { experience } from "./experience";

// Single source of truth for personal facts (PORTFOLIO_PLAN.md §3).
// Mirrors cv/build_cv.py — update both together.

// Derived counts so the hero stats never drift from the underlying content.
const totalProjects = projects.length;
const professionalRoles = experience.length - 1; // excludes the degree entry

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
  facts: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })),
  aviationCoursework: z.array(z.string().min(1)).min(6),
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
    "REST API Design",
    "Machine Learning & NLP",
    "Aviation Information Systems",
    "Node.js Development",
    "AI Researcher",


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
    {
      value: `27+`,
      label: "Projects shipped",
      countTo: 27,
      decimals: 0,
      prefix: "",
      suffix: "+",
    },
    {
      value: `${professionalRoles}`,
      label: "Internships & leadership roles",
      countTo: professionalRoles,
      decimals: 0,
      prefix: "",
      suffix: "",
    },
  ],
  story: [
    "Most engineers pick a lane. I built mine at the intersection of two: **aviation and artificial intelligence**. Specializing in Aviation Information Systems means I don't just write software that happens to run at airports — I understand the operations behind it, from IATA boarding-pass standards to how a control tower sequences traffic, and I graduated 6th of 108 doing it.",
    "That understanding comes from the field, not just the classroom. I've stood in **Cairo's air traffic control tower** studying radar and CNS/ATM operations with NANSC, explored satellite subsystems at the **Egyptian Space Agency**, and built internal software at **EgyptAir**. Then I turned domain knowledge into products: leading an 8-person team to ship Gate Buddy while engineering its entire 40+ endpoint backend myself, and fine-tuning transformer models on 7,277 airline reviews to show airlines exactly which service decisions win passenger loyalty.",
    "Today I co-found and lead AI at **Nowarha**, turning raw household electricity data into forecasts, bill predictions, and anomaly alerts. Everywhere I work I bring the same standard: systems that ship, numbers that survive review — and four competition wins that prove the pattern. What I want next is simple: a team building serious aviation technology, where both halves of my training compound.",
  ],
  facts: [
    { label: "Degree", value: "B.A.Sc. Computer Science — Aviation Information Systems" },
    { label: "University", value: "Zagazig National University, 2022–2026" },
    { label: "GPA", value: "3.922 / 4.0 — ranked 6th of 108" },
    { label: "Currently", value: "Co-Founder & AI Manager, Nowarha" },
  ],
  aviationCoursework: [
    "Principles of Flight",
    "Air Law",
    "Air Navigation",
    "Aviation Meteorology",
    "Instrument Systems",
    "Air Traffic Control Systems",
    "Radio Navigation",
    "Aeronautical Information Management Systems",
    "Flight Planning & Monitoring",
    "Operational Procedures",
    "Aerodromes",
    "Aviation Medicine",
    "Human Factors in Aviation",
    "Satellite Navigation",
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
