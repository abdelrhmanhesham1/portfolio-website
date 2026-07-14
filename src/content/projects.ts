import { z } from "zod";

// Project manifest (PORTFOLIO_PLAN.md §8). Photos are added as assets are
// gathered in phase P4 — an empty array renders the card without a gallery,
// never with a placeholder.

const photoSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(8),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  gate: z.string().regex(/^[A-C][0-9]$/),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  type: z.string().min(1),
  status: z.enum(["Live", "Shipped", "In development"]),
  oneLiner: z.string().min(1),
  summary: z.string().min(40),
  metric: z.object({ value: z.string().min(1), label: z.string().min(1) }),
  tech: z.array(z.string().min(1)).min(1),
  links: z.array(
    z.object({
      label: z.enum(["Live demo", "Source code", "Case study", "Facebook page"]),
      href: z.string().url(),
    })
  ),
  photos: z.array(photoSchema),
  featured: z.boolean(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectPhoto = z.infer<typeof photoSchema>;

const projectsSchema = z.array(projectSchema).superRefine((list, ctx) => {
  const slugs = new Set<string>();
  const gates = new Set<string>();
  for (const p of list) {
    if (slugs.has(p.slug)) {
      ctx.addIssue({ code: "custom", message: `duplicate slug: ${p.slug}` });
    }
    if (gates.has(p.gate)) {
      ctx.addIssue({ code: "custom", message: `duplicate gate: ${p.gate}` });
    }
    slugs.add(p.slug);
    gates.add(p.gate);
  }
});

export const projects: Project[] = projectsSchema.parse([
  {
    slug: "gate-buddy",
    gate: "A1",
    title: "Gate Buddy",
    subtitle: "AI-Powered Airport Companion",
    type: "Full-Stack Aviation Platform",
    status: "Live",
    oneLiner: "40+ endpoint airport platform: flight tracking, boarding-pass parsing, terminal navigation.",
    summary:
      "Led an 8-person team and single-handedly engineered a 40+ endpoint Node.js/Express/MongoDB backend: IATA BCBP boarding-pass parsing, live flight tracking with weather and FCM alerts, geospatial terminal navigation (MongoDB 2dsphere + Dijkstra routing), and a FastAPI recommendation microservice.",
    metric: { value: "40+", label: "REST endpoints, engineered single-handedly" },
    tech: ["Node.js", "Express.js", "MongoDB", "FastAPI", "FCM", "JWT"],
    links: [
      { label: "Live demo", href: "https://gate-buddy-frontend.vercel.app/" },
      { label: "Source code", href: "https://github.com/abdelrhmanhesham1/gate-buddy-backend" },
    ],
    photos: [],
    featured: true,
  },
  {
    slug: "airline-brand-loyalty-ai",
    gate: "A2",
    title: "Airline Brand Loyalty AI",
    subtitle: "Transformer Sentiment & Causal Inference",
    type: "AI / NLP Research",
    status: "Shipped",
    oneLiner: "DistilBERT on 7,277 airline reviews — 93.5% accuracy — plus causal inference on loyalty drivers.",
    summary:
      "Fine-tuned DistilBERT models on 7,277 airline reviews across four service dimensions — 93.5% accuracy and 89.18% Macro-F1 — then applied causal inference methods (PSM, TWFE, causal impact analysis) to quantify which service factors actually drive passenger loyalty and recommendation behavior.",
    metric: { value: "93.5%", label: "accuracy · 89.18% Macro-F1" },
    tech: ["PyTorch", "HuggingFace", "DistilBERT", "Causal Inference", "NLP"],
    links: [],
    photos: [],
    featured: true,
  },
  {
    slug: "aviation-safety-hub",
    gate: "A3",
    title: "Aviation Safety Hub",
    subtitle: "Pre-Flight Risk Assessment",
    type: "Desktop App — React + Electron + Gemini",
    status: "Shipped",
    oneLiner: "Digitized IMSAFE/PAVE/DECIDE frameworks with risk scoring and an AI pilot advisor.",
    summary:
      "An aviation decision-support system that digitizes the IMSAFE, PAVE and DECIDE pre-flight frameworks with a cumulative risk-scoring engine, a GRM risk matrix, and an AI advisor that analyzes assessment results to generate personalized go/no-go safety insights for pilots.",
    metric: { value: "3", label: "certified aviation frameworks digitized" },
    tech: ["React", "Electron", "Gemini API", "Risk Scoring"],
    links: [
      { label: "Source code", href: "https://github.com/abdelrhmanhesham1/Flight-assessment" },
    ],
    photos: [],
    featured: true,
  },
  {
    slug: "jobotic",
    gate: "B1",
    title: "Jobotic",
    subtitle: "AI Career Advisor Platform",
    type: "AI Platform — 1st of ~300, CLS/DEPI",
    status: "Shipped",
    oneLiner: "Recommendation engine + CV extraction that took 1st place among ~300 graduation projects.",
    summary:
      "Built the recommendation engine and CV extraction module: TF-IDF and cosine similarity for candidate–job matching, a Random Forest classifier for fit scoring, and spaCy with regex for resume parsing — 1st place among roughly 300 DEPI graduation projects.",
    metric: { value: "1st", label: "of ~300 projects — CLS/DEPI competition" },
    tech: ["Python", "Scikit-learn", "spaCy", "TF-IDF", "Random Forest"],
    links: [],
    photos: [],
    featured: true,
  },
  {
    slug: "nowarha",
    gate: "B2",
    title: "Nowarha",
    subtitle: "Home Electricity Intelligence",
    type: "AI + IoT Startup — Co-Founder",
    status: "In development",
    oneLiner: "Three-model AI pipeline for load forecasting, bill prediction, and anomaly detection.",
    summary:
      "Co-founded Nowarha and lead its AI development: a three-model pipeline for load forecasting, bill prediction, and energy anomaly detection built on household consumption data. 1st place at Creativa Zagazig University and 3rd at the NextGen Hackathon among 200+ projects.",
    metric: { value: "1st", label: "Creativa ZU · 3rd of 200+ — NextGen Hackathon" },
    tech: ["Python", "Time-Series ML", "IoT", "Anomaly Detection"],
    links: [
      {
        label: "Facebook page",
        href: "https://www.facebook.com/profile.php?id=61589414485071",
      },
    ],
    photos: [],
    featured: true,
  },
  {
    slug: "codealpha-ai-suite",
    gate: "B3",
    title: "CodeAlpha AI Suite",
    subtitle: "Vision, Translation, Music Generation",
    type: "Computer Vision / NLP",
    status: "Shipped",
    oneLiner: "Real-time YOLOv8 + ByteTrack detection, a 100+ language translator, chatbot, and music gen.",
    summary:
      "A suite of applied AI tasks: real-time object detection and tracking with YOLOv8 + ByteTrack (80 COCO classes with persistent per-object IDs), a Streamlit translation tool covering 100+ languages with a custom slang-expansion preprocessor and gTTS speech, an FAQ chatbot, and music generation.",
    metric: { value: "80", label: "COCO classes tracked in real time" },
    tech: ["YOLOv8", "ByteTrack", "OpenCV", "Streamlit", "gTTS"],
    links: [
      { label: "Source code", href: "https://github.com/abdelrhmanhesham1/codealpha_tasks" },
    ],
    photos: [],
    featured: true,
  },
]);

export const featuredProjects = projects.filter((p) => p.featured);
export const secondaryProjects = projects.filter((p) => !p.featured);
