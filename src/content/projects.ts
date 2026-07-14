import { z } from "zod";

// Project manifest (PORTFOLIO_PLAN.md §8). Summaries support **highlight**
// markup rendered as accent-colored spans (see components/Highlight.tsx).
// Photos are real assets only — an empty array renders without a gallery.

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
    oneLiner:
      "A full airport companion platform — I engineered all 40+ backend endpoints solo while leading the 8-person team.",
    summary:
      "An airport in your pocket. I led an 8-person team and personally engineered the entire backend — **40+ REST endpoints** covering authentication, live flight tracking with weather synchronization, and passenger push alerts. Under the hood: **IATA BCBP boarding-pass parsing**, geospatial terminal wayfinding built on **Dijkstra routing over MongoDB 2dsphere indexes**, and a FastAPI recommendation microservice with automated scraping, ranking, and caching — the same problem space the world's airport-technology teams work in.",
    metric: { value: "40+", label: "REST endpoints — solo-built backend" },
    tech: ["Node.js", "Express.js", "MongoDB", "FastAPI", "FCM", "JWT"],
    links: [
      { label: "Live demo", href: "https://gate-buddy-frontend.vercel.app/" },
      { label: "Source code", href: "https://github.com/abdelrhmanhesham1/gate-buddy-backend" },
    ],
    photos: [
      {
        src: "/projects/gate-buddy/home-desktop.png",
        alt: "Gate Buddy landing page — Safe & Effortless Travel hero with airport services",
        width: 1440,
        height: 900,
      },
      {
        src: "/projects/gate-buddy/world-hero.png",
        alt: "Gate Buddy hero slide — Connecting You to the World",
        width: 1440,
        height: 900,
      },
      {
        src: "/projects/gate-buddy/login.png",
        alt: "Gate Buddy login page with social sign-in over an airport tarmac at dusk",
        width: 1440,
        height: 900,
      },
      {
        src: "/projects/gate-buddy/about.png",
        alt: "Gate Buddy About page — smart airport experience, all in one app",
        width: 1440,
        height: 640,
      },
      {
        src: "/projects/gate-buddy/home-mobile.png",
        alt: "Gate Buddy landing page on a mobile viewport",
        width: 414,
        height: 896,
      },
    ],
    featured: true,
  },
  {
    slug: "airline-brand-loyalty-ai",
    gate: "A2",
    title: "Airline Brand Loyalty AI",
    subtitle: "Transformer Sentiment & Causal Inference",
    type: "AI / NLP Research",
    status: "Shipped",
    oneLiner:
      "Transformers + causal inference revealing what actually makes passengers recommend an airline.",
    summary:
      "What actually makes a passenger recommend an airline? I fine-tuned **DistilBERT transformers on 7,277 airline reviews** across four service dimensions — cabin crew, in-flight entertainment, onboard retail, and overall recommendation — reaching **93.5% accuracy and 89.18% Macro-F1**. Then I went past correlation: **propensity-score matching, two-way fixed effects, and causal-impact analysis** quantify which service investments genuinely drive loyalty. The result is the kind of evidence an airline product team can put a budget behind.",
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
    oneLiner:
      "Turns a pilot's pre-flight gut feeling into a scored, AI-reviewed go/no-go decision.",
    summary:
      "Pilots make go/no-go calls under pressure; this desktop app makes those calls systematic. It digitizes the **IMSAFE, PAVE, and DECIDE** aviation frameworks into guided assessments, computes a **cumulative risk score against a GRM risk matrix**, and a **Gemini-powered AI advisor** reads the completed assessment to generate personalized safety insights and mitigations — packaged with React and Electron so it runs offline, anywhere a pilot preps.",
    metric: { value: "3", label: "certified risk frameworks — IMSAFE · PAVE · DECIDE" },
    tech: ["React", "Electron", "Gemini API", "Risk Scoring"],
    links: [
      { label: "Source code", href: "https://github.com/abdelrhmanhesham1/Flight-assessment" },
    ],
    photos: [
      {
        src: "/projects/aviation-safety-hub/assessment.png",
        alt: "Aviation Safety Hub desktop app — IMSAFE, PAVE and DECIDE assessment tabs with live risk score",
        width: 1196,
        height: 583,
      },
    ],
    featured: true,
  },
  {
    slug: "jobotic",
    gate: "B1",
    title: "Jobotic",
    subtitle: "AI Career Advisor Platform",
    type: "AI Platform — 1st of ~300, CLS/DEPI",
    status: "Shipped",
    oneLiner: "AI job matching that took 1st place among ~300 graduation projects.",
    summary:
      "A full AI career platform that won **1st place among ~300 projects** at the CLS/DEPI graduation competition. I built its intelligence: a **TF-IDF + cosine-similarity engine** that reads a candidate's CV and ranks every open job by fit, a **Random Forest classifier** scoring the match, and a **spaCy-powered resume parser** that turns any CV into structured data. It's the matching problem LinkedIn solves — built from scratch and validated by judges.",
    metric: { value: "1st", label: "of ~300 projects — CLS/DEPI competition" },
    tech: ["Python", "Scikit-learn", "spaCy", "TF-IDF", "Random Forest"],
    links: [],
    photos: [
      {
        src: "/projects/jobotic/demo-1.png",
        alt: "Jobotic job feed showing per-job matching skills computed for the logged-in candidate",
        width: 1280,
        height: 630,
      },
      {
        src: "/projects/jobotic/demo-2.png",
        alt: "Jobotic available jobs with recommendations tab and skill tags",
        width: 1280,
        height: 630,
      },
      {
        src: "/projects/jobotic/demo-3.png",
        alt: "Jobotic branded login screen",
        width: 1280,
        height: 630,
      },
      {
        src: "/projects/jobotic/main-page.jpeg",
        alt: "Jobotic main landing page",
        width: 1600,
        height: 738,
      },
    ],
    featured: true,
  },
  {
    slug: "nowarha",
    gate: "B2",
    title: "Nowarha",
    subtitle: "Home Electricity Intelligence",
    type: "AI + IoT Startup — Co-Founder",
    status: "In development",
    oneLiner: "My co-founded startup: making home electricity consumption intelligent.",
    summary:
      "The startup I co-founded and where I lead AI: Nowarha turns smart-meter readings into a home's **electricity intelligence**. I designed the **three-model pipeline** — load forecasting, bill prediction, and energy anomaly detection — trained on real household consumption data. The judges keep agreeing it works: **1st place at Creativa Zagazig University** and **3rd of 200+ projects at the NextGen Hackathon**, with an 8-person founding team building toward launch.",
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
    oneLiner:
      "Real-time object tracking, a 100+ language translator, an FAQ chatbot, and generative music.",
    summary:
      "Four applied-AI builds shipped in one internship: **real-time object detection and tracking** with YOLOv8 + ByteTrack — persistent per-object IDs across **80 COCO classes** on live video; a **100+ language Streamlit translator** with a custom slang-expansion preprocessor and gTTS speech output; an FAQ chatbot; and generative music experiments. Fast iterations, real demos, all public on GitHub.",
    metric: { value: "80", label: "COCO classes tracked in real time" },
    tech: ["YOLOv8", "ByteTrack", "OpenCV", "Streamlit", "gTTS"],
    links: [
      { label: "Source code", href: "https://github.com/abdelrhmanhesham1/codealpha_tasks" },
    ],
    photos: [
      {
        src: "/projects/codealpha-ai-suite/translator-1.png",
        alt: "Streamlit translation tool interface supporting 100+ languages",
        width: 1177,
        height: 554,
      },
      {
        src: "/projects/codealpha-ai-suite/translator-2.png",
        alt: "Translation tool output with slang expansion and text-to-speech",
        width: 1121,
        height: 499,
      },
      {
        src: "/projects/codealpha-ai-suite/chatbot-1.png",
        alt: "FAQ chatbot interface answering a user question",
        width: 1261,
        height: 567,
      },
      {
        src: "/projects/codealpha-ai-suite/chatbot-2.png",
        alt: "FAQ chatbot conversation view with matched answers",
        width: 1265,
        height: 567,
      },
    ],
    featured: true,
  },

  // ---- Secondary projects ("More projects" grid) ----
  {
    slug: "crop-recommendation",
    gate: "C1",
    title: "Crop Recommendation ML",
    subtitle: "Precision Agriculture Classifier",
    type: "Machine Learning + Dashboard",
    status: "Shipped",
    oneLiner: "Soil and climate data in, optimal crop out — end-to-end ML with a dashboard.",
    summary:
      "End-to-end machine learning on agricultural data: cleaned and analyzed **soil and climate features** (correlation studies, outlier treatment before/after), trained a classifier that recommends the **optimal crop for given conditions**, and presented results in a **dashboard** — from raw CSV to a decision a farmer can act on.",
    metric: { value: "E2E", label: "data cleaning → model → dashboard" },
    tech: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
    links: [],
    photos: [
      {
        src: "/projects/crop-recommendation/dashboard.png",
        alt: "Crop recommendation dashboard with prediction results",
        width: 844,
        height: 486,
      },
      {
        src: "/projects/crop-recommendation/model-accuracy.png",
        alt: "Model accuracy comparison chart",
        width: 600,
        height: 511,
      },
      {
        src: "/projects/crop-recommendation/correlation.png",
        alt: "Feature correlation heatmap of soil and climate variables",
        width: 599,
        height: 516,
      },
    ],
    featured: false,
  },
  {
    slug: "festflow",
    gate: "C2",
    title: "FestFlow",
    subtitle: "Event Management REST API",
    type: "Node.js Backend",
    status: "Shipped",
    oneLiner: "Event sessions and services API with an integrated chatbot endpoint.",
    summary:
      "A clean **MVC-structured REST API** for event management: full CRUD for **sessions and services** plus an integrated **chatbot endpoint** — built on Node.js, Express, and MongoDB with environment-based configuration and the patterns production backends actually use.",
    metric: { value: "MVC", label: "controllers · models · routes, cleanly separated" },
    tech: ["Node.js", "Express.js", "MongoDB", "Mongoose"],
    links: [],
    photos: [],
    featured: false,
  },
  {
    slug: "brolog",
    gate: "C3",
    title: "Brolog",
    subtitle: "Blogging Platform",
    type: "Full-Stack Web App",
    status: "Shipped",
    oneLiner: "Posts, comments, users, and portfolios behind an Express REST API.",
    summary:
      "A full-stack blogging platform: **posts, comments, users, and portfolio modules**, each with its own controller/model/route stack behind an Express REST API, with a separate front-end project consuming it — the fundamentals of content platforms, done properly.",
    metric: { value: "4", label: "domain modules: posts, comments, users, portfolios" },
    tech: ["Node.js", "Express.js", "REST", "JavaScript"],
    links: [],
    photos: [],
    featured: false,
  },
  {
    slug: "sms-safety-manual",
    gate: "C4",
    title: "Airport SMS Manual",
    subtitle: "Safety Management System Documentation",
    type: "Aviation Safety Engineering",
    status: "Shipped",
    oneLiner: "A complete Safety Management System manual for a model international airport.",
    summary:
      "Authored a complete **Safety Management System (SMS) manual** for a model international airport: safety policy statement, **hazard identification and safety risk management**, assurance and promotion chapters — benchmarked against **Singapore Airlines' published SMS documentation**. The regulatory-documentation side of aviation that most engineers never touch.",
    metric: { value: "11", label: "page ICAO-style SMS manual, signed safety policy" },
    tech: ["Aviation SMS", "Risk Management", "ICAO Framework"],
    links: [],
    photos: [],
    featured: false,
  },
]);

export const featuredProjects = projects.filter((p) => p.featured);
export const secondaryProjects = projects.filter((p) => !p.featured);
