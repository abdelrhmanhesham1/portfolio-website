# PORTFOLIO MASTER PLAN v3 — Abdelrhman Hesham Galal
### Professional, content-first portfolio with an aviation-precision design accent

> **This document is the single source of truth for building the portfolio.**
> Hand this file to the implementing agent (Claude Code); it contains everything —
> role, research, architecture, design system, page-by-page specs, project data,
> asset inventory, QA automation, and acceptance criteria.
>
> **Changelog**
> - **v2:** removed v1's airport-metaphor roleplay copy (research: enterprise recruiters
>   value substance over theming). Aviation now lives in positioning + visual craft only.
> - **v3 (senior audit pass):** fixed a `next/image`-vs-static-export incompatibility;
>   fixed stale availability copy (graduated June 2026 — it is now July 2026); cut GSAP
>   (single animation library); mandated TypeScript strict + content-as-data architecture;
>   added security headers, CI quality gates (links/a11y/Lighthouse), GitHub-profile
>   funnel workstream, custom 404, favicon set, full-name SEO; upgraded custom domain
>   from optional to recommended; documented deliberate trade-offs (§14).
> - **v3.1:** hosting switched to **Netlify** (Abdelrhman's decision). Verified: the official
>   Netlify Next.js adapter serves `next/image` through Netlify Image CDN automatically, so
>   the architecture is unchanged. Web3Forms confirmed over Netlify Forms (which needs a
>   static-HTML workaround with the modern Next.js adapter and locks the form to the host).
>   Analytics swapped from Vercel Analytics to a host-independent option. All code stays
>   host-agnostic — moving hosts again would cost ~zero code changes.

---

## 0. ROLE & MISSION (prompt persona for the implementation phase)

You are simultaneously:
- **A senior UI/UX designer** — latest design principles, trends, and research; intuitive,
  beautiful, conversion-driven interfaces. Every pixel earns its place.
- **A senior React engineer** — performant, accessible, scalable code, current with the
  latest React ecosystem.
- **A long-term technical co-founder** — every decision weighs scalability, cost,
  maintainability, and growth. Prefer automation over vigilance, data over decoration.

**Mission:** Convince recruiters and engineering managers at **Emirates, Honeywell Aerospace,
Collins Aerospace, SITA, Qatar Airways, Cirium, IBS Software, EgyptAir** and similar
aviation-technology employers — within 60 seconds — that Abdelrhman is a serious, dependable
engineer with rare domain expertise. The portfolio is the first work sample they see:
flawless execution, zero broken links, fast load, and professional tone ARE the pitch.

**Rules of engagement for the implementer:**
1. Before implementing any part, re-read the relevant section of this plan.
2. **You may run code in the local project folders and extract screenshots/photos yourself**
   (paths in §9). If an asset can't be generated or found, **ask Abdelrhman and he will
   provide it** — never ship a placeholder in the final build.
3. Never invent facts. All content comes from §3 and §8. The authoritative CV source is
   `D:\projects code\cv-portfolio\cv\build_cv.py` (CONTENT block).
4. Obey the copy rules in §7 — the audience is enterprise recruiters.
5. Research before deciding. Where this plan is silent, evaluate the globally available
   options and pick the absolute best — not the most common.

---

## 1. WHAT ACTUALLY ATTRACTS TOP COMPANIES (research that shapes this plan)

From hiring-manager surveys and portfolio-review studies (2024–2026):
- Recruiters scan a portfolio in **30–60 seconds**. Structure and scannability beat cleverness.
- **~73%** of hiring managers weight a strong portfolio over a perfect resume; **~84%** want
  **working applications / live demos**, not just repos.
- **Quality over quantity:** 3–5 polished, well-documented projects beat 10 shallow ones.
- Recruiters respond to **real problems solved with measurable results**, presented plainly.
- Themed experiences win design awards, not engineering jobs. Personality comes through
  **craft** (color, typography, motion polish), never gimmick copy.

**Design consequences adopted throughout:**
1. Content-first: name, role, proof, projects, contact — in that order, no friction.
2. Every project leads with its **outcome metric** (93.5% accuracy, 40+ endpoints, 1st of ~300).
3. Aviation is expressed as **domain expertise** (his actual degree, internships, systems) and
   as a restrained **visual accent** — never as a theme the visitor must decode.
4. Animation is restrained and purposeful: it demonstrates frontend competence, never delays
   or obscures content.
5. **The portfolio is one node in the hiring funnel** — GitHub and LinkedIn must match its
   quality (§12), because recruiters always click through.

---

## 2. TECH STACK (options evaluated globally → recommendation)

Constraint: **the code is written in React.**

### 2.1 Framework & hosting
| Option | Verdict |
|---|---|
| **Next.js 15+ (App Router) on Netlify via the official Next.js adapter, SSG** | ✅ **RECOMMENDED** — Abdelrhman's host of choice. The adapter is zero-config and routes `next/image` through **Netlify Image CDN** automatically (AVIF/WebP, resizing, lazy placeholders). Free tier (~300 credits ≈ 100GB bandwidth / 300 build minutes per month) is ample for a portfolio. Every page is still statically generated at build time. |
| Next.js with `output: 'export'` + `next-image-export-optimizer` | Documented fallback if the Netlify adapter ever misbehaves: pure static files, build-time image optimization, runs on any host. Not the default — extra dependency, slightly altered image usage. |
| Vite + React SPA | Fallback only — weak SEO, manual meta |
| Astro / Gatsby | Split mental model / legacy |

**Host-agnostic rule:** no Netlify-specific APIs in application code (no Netlify Functions,
no Netlify Forms, no platform imports). The site must build and run identically on Vercel,
Cloudflare, or a plain static host — hosting is a deploy target, never a dependency. (This
rule already paid for itself once: the plan survived the Vercel→Netlify switch untouched.)

### 2.2 Language & code quality — **TypeScript, `strict: true`** (non-negotiable)
ESLint (`next/core-web-vitals`) + Prettier. A portfolio pitching dependability cannot ship `any`.

### 2.3 Styling
✅ **Tailwind CSS v4 + CSS custom properties** for design tokens. ❌ runtime CSS-in-JS.

### 2.4 Animation — ONE library (v3 correction)
✅ **Motion for React** (`motion` package, formerly framer-motion), loaded via **`LazyMotion` +
`domAnimation`** with `m` components (~⅓ of full bundle).
- Scroll-linked signature line: Motion `useScroll` + `motion.path` `pathLength` — **GSAP is cut
  entirely** (v2 carried two animation systems for one effect: bundle weight + two mental
  models = anti-pattern).
- ⚠️ React Three Fiber evaluated and rejected (payload vs. 60-second recruiter scan).
- Lightbox/carousel: **`yet-another-react-lightbox`** — battle-tested keyboard/focus/ARIA
  handling. Hand-rolling an accessible lightbox is a classic self-inflicted a11y bug.

### 2.5 Contact form (static site, no own server)
✅ **Web3Forms** free tier: 250 submissions/mo, honeypot + server-side spam checks,
**zero-config hCaptcha available if spam appears** (enable only then — CAPTCHAs cost
conversion). Validation: **react-hook-form + zod**. 
Known trade-off: the access key is public by design; worst abuse = spam to his own inbox;
key is rotatable. Fallback path on failure: visible direct email. 
(Evaluated: **Netlify Forms** — native to the chosen host, but with the modern Next.js
adapter it requires a static-HTML form-definition workaround because pages aren't written
as static HTML files at deploy, and it welds the contact form to the hosting vendor —
rejected on both grounds. Formspree 50/mo limit; EmailJS exposes template IDs;
own API = overkill.)

### 2.6 Supporting choices
- **Fonts** via `next/font` (self-hosted, zero CLS), subsetted weights only:
  `Space Grotesk` 600/700 (headings) · `Inter` 400/500 (body) · `JetBrains Mono` 400/500
  (metrics, labels, gate refs).
- **Icons:** `lucide-react`.
- **Domain:** **free `*.netlify.app` subdomain, permanently** (v3.2 — zero-cost constraint,
  see §14: Abdelrhman will not pay for anything or enter a card anywhere, ever). Pick a
  clean, professional slug: `abdelrhman-hesham.vercel.app` (or closest available).
  A custom domain remains a documented future upgrade only if he ever chooses to pay ~$10/yr.
- **Analytics:** host-independent, privacy-friendly script — **Umami Cloud free tier**
  (recommended) or Cloudflare Web Analytics (also free). Netlify's own Analytics is $9/mo —
  not worth it here; Vercel Analytics doesn't apply off-Vercel. Conversion signals that
  matter — contact submissions arrive by email (Web3Forms) and CV downloads show as
  `/cv/...` pageviews; no paid event tracking needed at this stage.

---

## 3. WHO ABDELRHMAN IS (content source — verified from CV & GitHub)

- **Name:** Abdelrhman Hesham Galal — Cairo, Egypt
- **Identity line:** AI/ML & Backend Engineer specializing in **Aviation Information Systems**
- **Education:** B.A.Sc. Computer Science (Aviation Information Systems), Zagazig National
  University, Sept 2022 – June 2026 — **GPA 3.922/4.0, ranked 6th of 108** — **graduated**
  (portfolio copy must reflect graduate status, not "student"; see §7 availability rule)
- **Now:** Co-Founder & AI Manager @ **Nowarha** (AI-powered home electricity intelligence,
  IoT + AI); AI Intern @ CodeAlpha (July 2026, remote)
- **Signature achievements (hero stats / awards):**
  - 1st Place — CLS/DEPI Graduation Competition (Jobotic, 1st of ~300 projects)
  - 1st Place — Creativa Zagazig University (Nowarha)
  - 1st Place — Sumo Robotics Competition (32-team bracket)
  - 3rd Place — NextGen Hackathon (200+ projects)
  - Top 25% globally — Energy Mentors Competition (231 teams)
  - 93.5% accuracy / 89.18% Macro-F1 — DistilBERT airline sentiment research
  - 40+ REST endpoints — Gate Buddy backend, engineered single-handedly
- **Aviation credibility (the differentiator):** internships at **EGSA (Egyptian Space
  Agency), EgyptAir, NANSC** (radar systems, CNS/ATM, on-site at Cairo ATC tower) + a degree
  specialized in aviation information systems.
- **Skills:** Python, JavaScript, C++, SQL · PyTorch, HuggingFace, Scikit-learn, NLP ·
  Node.js, Express, MongoDB, REST, JWT/OAuth · Pandas/NumPy/Matplotlib · Git, Postman
- **Links (must appear in header, contact & footer):**
  - GitHub: https://github.com/abdelrhmanhesham1
  - LinkedIn: https://www.linkedin.com/in/abdelrhman-hesham11/
  - Email: abdelrhmanhesham030@gmail.com
  - Phone: +20 1000107202
  - CV: regenerate fresh via `python build_cv.py`, copy to `/public/cv/Abdelrhman-Hesham-Galal-CV.pdf`
    (**hyphenated filename** — no `%20` in shared URLs)

**Positioning statement (drives all copy):**
> *"An engineer who speaks both languages: aviation operations and production AI."*

---

## 4. CODE & CONTENT ARCHITECTURE (v3 — maintainability as a feature)

**Content is data, never hard-coded in components.** Updating a fact must be a one-file edit.

```
src/
  content/
    profile.ts      # name, links, availability, stats — typed
    projects.ts     # the §8 manifest as Project[] — typed, zod-validated at build
    experience.ts   # timeline entries
  components/       # presentational, consume content via props
  app/
    page.tsx        # single page composition
    work/[slug]/    # case-study pages (MDX or typed sections)
    not-found.tsx   # custom 404 — same design system, links home (v3 addition)
    opengraph-image / icon assets
```

- `Project` type carries the §8 schema (title, type, gate, status, summary, metric, photos,
  links). A build-time zod parse fails CI on malformed content — content bugs caught before deploy.
- Case studies as MDX (rich text + images) for the top 3 projects.
- Why it matters long-term: after hiring season he updates `projects.ts`/MDX only —
  the design layer never rots from content edits.

---

## 5. DESIGN SYSTEM (colorful — explicitly NOT black & white)

### 5.1 Concept: "Aviation-grade precision"
Modern flight-deck instrument clarity + premium airline brand polish: deep confident blues,
precise typography, disciplined spacing, saturated accent gradients. Professional first,
distinctive second. **The theme is felt, not announced.**

### 5.2 Color palette
Base is rich navy (never pure black); accents saturated, layered with gradients.

```css
:root {
  /* Base — deep aviation blues (NOT black) */
  --navy-950: #0A1128;   /* page background */
  --navy-900: #12204A;   /* card/surface base */
  --navy-800: #1B3A6B;   /* elevated surfaces, borders */

  /* Primary accent — avionics cyan */
  --cyan-400: #22D3EE;  --cyan-500: #06B6D4;

  /* Secondary accent — amber/orange (CTAs, highlights) */
  --amber-400: #FFB454;  --amber-500: #FF8A3D;  --amber-600: #F4572E;

  /* Tertiary — violet (gradient depth) */
  --violet-400: #A78BFA;  --violet-600: #7C3AED;

  /* Success — green (availability, form success) */
  --green-400: #34D399;

  /* Text */
  --text-primary: #F3F7FC;  --text-secondary: #B8C7DE;

  /* Gradients — the visual signature */
  --grad-hero:    linear-gradient(135deg, #0A1128 0%, #12204A 45%, #7C3AED22 100%);
  --grad-cta:     linear-gradient(90deg, #FF8A3D 0%, #F4572E 100%);
  --grad-accent:  linear-gradient(135deg, #06B6D4 0%, #7C3AED 100%);
  --grad-card:    linear-gradient(160deg, #1B3A6B66 0%, #12204A 60%);
  --grad-text:    linear-gradient(90deg, #22D3EE, #A78BFA 55%, #FF8A3D);
}
```

Usage rules:
- One or two headline keywords get `--grad-text` (`background-clip: text`) — never whole sentences.
- Primary CTAs: `--grad-cta` + soft glow (`box-shadow: 0 8px 32px #FF8A3D40`).
- Cards: `--grad-card` + 1px `--navy-800` border + subtle backdrop blur.
- Sections alternate depth (`--navy-950` ↔ faint radial violet/cyan glows at 8–12% opacity).
- Contrast: every text pair passes **WCAG AA** (verified: `--text-secondary` on `--navy-950`
  ≈ 10:1 ✓; `--amber-500` on `--navy-950` ≈ 4.6:1 — CTA/large text only).

### 5.3 Typography
- `Space Grotesk` 600/700 — H1–H3, nav; tight tracking at large sizes.
- `Inter` 400/500 — body 16–18px, line-height 1.7.
- `JetBrains Mono` — metrics, small-caps labels, gate refs.
- Fluid scale via `clamp()` (H1: `clamp(2.5rem, 6vw, 4.25rem)`).

### 5.4 Texture & signature accents (subtle — each earns its place)
- Faint dotted grid background (radial-gradient dots ~3% opacity) — engineering graph paper.
- **One signature motion accent:** a thin dashed SVG line drawing itself down the page on
  scroll, threading the sections (Motion `useScroll` + `pathLength`). Evokes a flight path /
  technical drawing without a caption saying so.
- Section dividers: precise 1px rules with a short gradient segment.

### 5.5 Motion language (global rules)
- Springs, not linear tweens (`type: "spring", stiffness ~100, damping ~20`).
- Scroll-reveal: rise 24px + fade, stagger 60–80ms, trigger once.
- Hover: cards lift 4–6px, border glow strengthens; buttons scale 1.02–1.03.
- Numbers count up once on first view — with the final value present for screen readers
  (`aria-label` or static fallback; see §11).
- **`prefers-reduced-motion`: everything collapses to simple fades. Non-negotiable.**
- No preloader, no scroll-jacking, nothing > 600ms on content, extra restraint on mobile.

---

## 6. PAGE-BY-PAGE SPECIFICATION

Architecture: single page (`/`) with anchor nav + `/work/[slug]` case studies + custom 404.

### 6.1 — Header (sticky, glassmorphic)
- Left: wordmark `Abdelrhman Hesham Galal` (Space Grotesk 600) with a small gradient-stroked
  `AH` roundel monogram. No clip-art.
- Center nav: `About · Work · Contact` — sliding active underline (Motion layout animation).
- Right: GitHub + LinkedIn icon buttons + **`Download CV`** gradient pill (direct PDF download).
- Transparent at top → scrolled: backdrop-blur, `--navy-900/70`, hairline bottom border,
  height 80→64px. Mobile: hamburger → full-screen overlay, staggered links.
- All external links: `target="_blank" rel="noopener noreferrer"`.

### 6.2 — Hero
Full viewport; dotted grid; faint radial glows (violet top-right, cyan bottom-left).
1. Status line (mono, small): `● Open to full-time roles` (green pulse) · `Cairo, Egypt (UTC+2)`.
   *(v3 fix: he graduated June 2026 — no "available from June 2026" anywhere. Confirm final
   availability wording with Abdelrhman at build time.)*
2. H1: `Abdelrhman Hesham Galal` — **full name** (recruiters search the exact CV name);
   one keyword may carry the gradient text.
3. H2 role line: `AI/ML & Backend Engineer — Aviation Information Systems`.
   Optional detail: the specialization words rotate with a precise character-flip
   micro-effect — a typographic nod to flight-information displays, no themed wording.
   Screen readers get one static line (`aria-hidden` on the animated element). If it tests
   even slightly gimmicky, ship the static line. Content never depends on it.
4. Subline: *"I build production AI and backend systems for the aviation industry — from
   airport passenger platforms to airline sentiment intelligence."*
5. CTAs: `View my work ↓` (gradient) · `Get in touch` (ghost).
6. **Proof strip** (mono, count-up once):
   `3.922/4.0 GPA` · `Ranked 6th of 108` · `4× competition wins` · `40+ API endpoints shipped`
   · `93.5% model accuracy`.
7. The signature SVG line begins here.

### 6.3 — About
Two columns (stack on mobile):

**Left — profile card:** professional headshot (**ASK — required asset**), gradient border,
subtle 3D tilt ≤ 6° (pointer only; off for touch/reduced-motion). Beneath, mono fact list:
`B.A.Sc. CS — Aviation Information Systems` · `ZNU, 2022–2026 — GPA 3.922/4.0, 6th of 108` ·
`Co-Founder & AI Manager, Nowarha`.

**Right — story (3 short paragraphs):**
1. Who: CS graduate (June 2026), Aviation Information Systems specialization, top of class.
2. Differentiator: real industry exposure — EGSA, EgyptAir, NANSC (radar, CNS/ATM, Cairo ATC
   tower) — combined with production engineering (Gate Buddy's 40+ endpoint API, DistilBERT
   airline sentiment research).
3. Now: Co-founder & AI Manager at Nowarha; DEPI ML graduate; repeated competition wins.

**Experience timeline** (vertical): 2022 ZNU → 2023 EGSA·EgyptAir·NANSC → 2024–25 DEPI ML
Intern → 2025 Gate Buddy Team Lead → 2026 Nowarha Co-Founder + CodeAlpha AI Intern.
Nodes sit on the signature line and light up on scroll.

**Skills grid:** five cards (Languages · ML/AI · Backend · Data · Tools), real chips from §3,
no invented proficiency bars.

**Awards row:** five compact cards (year · competition · placing), gradient left border.

### 6.4 — Featured Work (core section)
Header: `Featured Work` + *"Selected projects — aviation platforms, applied ML research, and
production backends."*

**Interaction model:** project index rows → click expands in place into a case card
(Motion `layoutId` shared-element transition; on expand, scroll the card fully into view and
move focus to it). Evaluated: uniform grid (weak hierarchy), horizontal showcase (a11y harm) — rejected.

**Collapsed row:** title · type · **gate ref** (small mono badge `A1` — quiet index-code
aesthetic; §7 allows renaming/dropping at Abdelrhman's word) · one-line outcome · status dot.

**Expanded card (fixed schema):** title · type · gate · **summary** (2–3 sentences,
outcome-first) · **photos** (yet-another-react-lightbox) · **key metric callout** (large mono)
· tech chips · links (`Live demo` / `Source code` / `Case study →`) — omit a link rather than
link to nothing.

Case-study pages for the top 3 minimum: problem → role → architecture → results.
Below: **"More projects"** compact grid (same schema, photos optional).

### 6.5 — Contact
Header: `Get in touch` + *"Open to software & AI engineering roles in aviation technology —
based in Cairo, available globally."*

**Left — direct channels:** phone `+20 1000107202` (tel: + copy button) · email (mailto +
copy) · GitHub · LinkedIn · `Download CV (PDF)` · availability badge (green pulse).
Note: plain-text email/phone invites scraper spam — accepted trade-off for recruiter
friction-zero (§14); revisit only if spam becomes real.

**Right — form:** **First name · Last name · Email · Message** (exact required fields).
Floating labels; cyan focus ring; RHF + zod inline validation (`aria-describedby`); honeypot;
Web3Forms submit. Button `Send message`. Success: check micro-animation + *"Thanks — I'll
reply within 24 hours."* Failure: clear error + direct email fallback. Never a dead end.
hCaptcha stays OFF until spam is observed (conversion first), then enable zero-config.

### 6.6 — Footer
Thin top rule with short gradient segment (the signature line ends here). Three columns:
wordmark + one-liner · nav links · GitHub/LinkedIn/Email/CV. Bottom (mono):
`© 2026 Abdelrhman Hesham Galal · Cairo, Egypt` + back-to-top chevron. Quietly perfect.

### 6.7 — 404 page (v3 addition)
Same design system; short line ("This page doesn't exist."), links to Home / Work / Contact.
Any shared deep link that rots must land somewhere useful.

---

## 7. COPY & TONE RULES (critical)

**Voice:** confident, factual, first-person, zero fluff. Every sentence states a fact, shows
a result, or invites contact.

**Banned:** themed roleplay copy — "Now boarding", "Departures", "Landed", "Request
clearance", "Control tower", fake flight numbers/tickers, metaphor-addressed recruiters.
If a phrase requires decoding a theme, cut it.

**Allowed aviation presence:** factual domain language ("Aviation Information Systems",
"IATA BCBP boarding-pass parsing", "CNS/ATM", "flight tracking" — his actual work), the §5.4
visual accents, and the small **gate ref badge** (kept per Abdelrhman's requirement, executed
as a minimal mono index code; **confirm label `GATE` vs `REF` vs none at build time**).

**Facts discipline (v3):** he **graduated June 2026** — copy says graduate/available now,
never "student" or "available from June 2026". Full name `Abdelrhman Hesham Galal` in H1,
`<title>`, OG, JSON-LD (recruiters search the exact CV name).

**Formatting:** sentence case (no SHOUTING headers), metrics in mono, paragraphs ≤ 3 sentences.
Section names plain: About · Featured Work · Contact. Statuses plain: Live · Shipped · In development.

---

## 8. PROJECT DATA — AUTHORITATIVE CONTENT (→ `src/content/projects.ts`)

| # | Gate | Project title | Type | Status | Summary (draft) | Links | Photos |
|---|---|---|---|---|---|---|---|
| 1 | A1 | **Gate Buddy** — AI-Powered Airport Companion | Full-Stack Aviation Platform | Live | Led an 8-person team and single-handedly engineered a 40+ endpoint Node.js/Express/MongoDB backend: IATA BCBP boarding-pass parsing, live flight tracking with weather and FCM alerts, geospatial terminal navigation (MongoDB 2dsphere + Dijkstra routing), and a FastAPI recommendation microservice. | [Live](https://gate-buddy-frontend.vercel.app/) · [Code](https://github.com/abdelrhmanhesham1/gate-buddy-backend) | Screenshot live app (desktop + mobile); ask for app shots |
| 2 | A2 | **Airline Brand Loyalty AI** — Transformer Sentiment & Causal Inference | AI/NLP Research | Shipped | Fine-tuned DistilBERT on 7,277 airline reviews across four service dimensions — 93.5% accuracy, 89.18% Macro-F1 — then applied causal inference (PSM, TWFE, causal impact) to quantify which service factors drive passenger loyalty. | Code link — **ask** (likely `projects` repo) | Render charts from notebooks, or ask |
| 3 | A3 | **Aviation Safety Hub** — Pre-Flight Risk Assessment | Desktop App (React + Electron + Gemini) | Shipped | Digitizes the IMSAFE, PAVE and DECIDE pre-flight frameworks with a cumulative risk-scoring engine, GRM risk matrix, and an AI advisor generating personalized go/no-go insights for pilots. | [Code](https://github.com/abdelrhmanhesham1/Flight-assessment) | Run `win-unpacked` exe → screenshots |
| 4 | B1 | **Jobotic** — AI Career Advisor Platform | AI Platform — 1st of ~300 (CLS/DEPI) | Shipped | Built the recommendation engine and CV extraction: TF-IDF/cosine candidate–job matching, Random Forest fit scoring, spaCy resume parsing — 1st among ~300 DEPI graduation projects. | Repo — ask | `main page.jpeg`, logos; convert `project video.mp4` → 8s muted loop (poster + lazy) |
| 5 | B2 | **Nowarha** — Home Electricity Intelligence | AI + IoT Startup — Co-Founder | In development | Co-founded; leads AI: three-model pipeline for load forecasting, bill prediction, energy anomaly detection. 1st @ Creativa ZU; 3rd @ NextGen Hackathon (200+). | [Facebook](https://www.facebook.com/profile.php?id=61589414485071) | **Ask** for dashboard shots + logo |
| 6 | B3 | **CodeAlpha AI Suite** — Vision, Translation, Music Gen | Computer Vision / NLP | Shipped | Real-time YOLOv8 + ByteTrack detection & tracking (80 COCO classes, persistent IDs); 100+ language Streamlit translator with slang-expansion + gTTS; FAQ chatbot; music generation. | [Code](https://github.com/abdelrhmanhesham1/codealpha_tasks) | `code_alpha/*/photos/*.png`; run YOLO for a frame |

**More projects (secondary grid):**
| Gate | Project | Type | Note |
|---|---|---|---|
| C1 | SMS Safety Manual Hub | Aviation Safety Documentation Site | **confirm scope** |
| C2 | Crop Recommendation ML | ML + Dashboard | 4 result PNGs available |
| C3 | FestFlow | Node.js REST Backend | confirm showcase-ready |
| C4 | Brolog | Full-Stack Blog Platform | confirm |

> Feature only what he is proud to defend in an interview. Quality over quantity (§1).

---

## 9. ASSET INVENTORY

**On disk now:** CV PDF source (`cv/` — regenerate before launch) · Jobotic
(`main page.jpeg`, logos, `project video.mp4`) · CodeAlpha photos (translator, chatbot) ·
Crop-recommendation PNGs ×4 · `safety-policy-signed.jpg`.

**To generate (implementer may run code):** Gate Buddy live-site screenshots (desktop +
mobile viewports) · Aviation Safety Hub via `D:\github, linkedin projects to be uploaded\pilot assessment exe\win-unpacked`
· sentiment-model charts from notebooks · YOLOv8 detection frame.

**To create (implementer):** favicon + app icon set from the AH monogram (SVG →
`icon.svg`, `apple-icon.png`) · OG image 1200×630 (clean card: full name, role, 2–3 metrics
on the navy/gradient system — professional, not themed).

**Must request from Abdelrhman (ask, never fake):**
1. **Professional headshot** — the single most important missing asset
2. Nowarha dashboard screenshots + logo
3. Jobotic repo URL (if public)
4. Airline-sentiment code link
5. Preferred free Netlify slug (default: `abdelrhman-hesham.vercel.app`)
6. Secondary project list confirmation + gate-badge label (`GATE` / `REF` / none)
7. Final availability wording (§6.2)

Pipeline: all raster → WebP/AVIF via `next/image`; hero stays free of heavy imagery.

---

## 10. SEO, META, SECURITY HEADERS

- `<title>`: `Abdelrhman Hesham Galal — AI/ML & Backend Engineer · Aviation Information Systems`
  (full name — v3). Meta description ≤ 155 chars (aviation AI, Gate Buddy, 93.5% accuracy).
- `metadataBase` set; OG image per §9; JSON-LD `Person` (name, alternateName
  "Abdelrhman Hesham", jobTitle, alumniOf, sameAs: GitHub/LinkedIn).
- Sitemap + robots via App Router conventions; one h1; semantic h1→h2→h3.
- **Security headers (v3, via `next.config` headers — host-agnostic; `netlify.toml`
  `[[headers]]` is the fallback if the adapter ignores any):** `X-Content-Type-Options:
  nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `X-Frame-Options: DENY` ·
  `Permissions-Policy: camera=(), microphone=(), geolocation=()` · CSP kept pragmatic
  (Next inline runtime + the analytics script origin + Web3Forms endpoint allowed; nothing
  else third-party). A static site's attack surface is small; these cost nothing and
  Best Practices audits check them. Verify headers on the deployed URL, not just locally.
- Conversion paths: recruiter always ≤ 1 click from contact — header CV button, hero CTA,
  quiet `Get in touch` link at each expanded card's end, contact section, footer. Phone +
  email copyable everywhere.

## 11. RESPONSIVE, ACCESSIBILITY & PERFORMANCE BUDGET

- Breakpoints 360/768/1024/1440, mobile-first; project rows restack below 768px (no
  horizontal-scroll tables). Touch targets ≥ 44px; pointer-only effects off on touch.
- Max content width 1200px; one idea per viewport.
- Keyboard: full tab order, visible cyan focus rings, skip-to-content, `Esc` collapses
  expanded card/lightbox, `aria-expanded` + focus management, focus moved into expanded card.
- Rotating hero text: static line for screen readers, animation `aria-hidden` (§6.2).
  Count-ups expose final values to AT (§5.5).
- Meaningful `alt` everywhere; semantic landmarks.
- **Budget (mobile, deployed URL):** Lighthouse Performance ≥ 90, Accessibility ≥ 95,
  Best Practices ≥ 95, SEO ≥ 95 · LCP < 2.0s · CLS < 0.05 · INP < 200ms · initial JS
  < 200KB gzipped (LazyMotion keeps Motion ~⅓ size; no GSAP; no 3D).
- Fonts preloaded; animations `transform/opacity` only; `content-visibility: auto` below fold.

## 12. THE SURROUNDING FUNNEL (v3 — the portfolio is not an island)

Recruiters click from the portfolio to GitHub/LinkedIn within seconds. Current GitHub state
(audited 2026-07-14): **no pinned repos**, a fork (`gate_buddy_app`) mixed into the list,
generic ML-only bio. Workstream (do alongside P6):
1. Pin 6 repos in §8 order: gate-buddy-backend, gate-buddy-frontend, Flight-assessment,
   codealpha_tasks, projects (sentiment), + Jobotic if public.
2. Bio → match portfolio identity line: "AI/ML & Backend Engineer — Aviation Information
   Systems. Built Gate Buddy (40+ endpoint airport platform) & DistilBERT airline sentiment
   research (93.5% acc)." + portfolio URL in the profile website field.
3. Each pinned repo: README with one screenshot, stack, outcome metric, live/demo link.
   Profile README (`abdelrhmanhesham1` repo) mirrors the hero proof strip.
4. LinkedIn: same headline, portfolio in featured section, banner exported from the design system.
5. CV (`build_cv.py`): add the portfolio URL to the header links, regenerate.

## 13. QUALITY AUTOMATION & IMPLEMENTATION PHASES (v3 — reliability as a process)

**CI on every push (GitHub Actions):** typecheck + ESLint → build (zod content validation
fails the build on malformed data) → **lychee** link check (every external link — a dead link
on a "dependable engineer" portfolio is disqualifying, and links rot *after* launch too) →
**Playwright smoke tests** (nav anchors, project expand/collapse, form validation errors,
form success path with mocked endpoint, 404 page) → **Lighthouse CI** against §11 budget.
Netlify Deploy Previews per PR; `main` branch protected with required CI checks so red never
merges — production deploys only from green main. (Free tier has one concurrent build;
irrelevant at solo-project pace.)

| Phase | Deliverable | Gate check |
|---|---|---|
| **P0 — Setup** | Next.js + TS strict + Tailwind v4 + Motion(LazyMotion); tokens; fonts; repo; Netlify pipeline (official Next.js adapter); CI skeleton | Deployed `*.netlify.app` URL + green CI + `next/image` verified serving via Netlify Image CDN |
| **P1 — Structure** | Layout, Header, Footer, 404, section shells, signature-line scaffold, content schema (`content/` + zod) | All breakpoints clean |
| **P2 — Hero** | Headline, role line (+ optional flip detail), proof strip, CTAs | Reduced-motion + SR verified; reads professional |
| **P3 — About** | Profile card, story, timeline, skills, awards | Content matches §3 exactly |
| **P4 — Work** | Index + expanding cards, lightbox, case studies ×3 | All 6 featured projects complete, real assets |
| **P5 — Contact** | Form (Web3Forms + RHF + zod), copy buttons, channels | Real submission received (check spam folder too) |
| **P6 — Launch** | SEO/OG/JSON-LD, security headers, analytics, favicon set, custom domain, §12 funnel workstream, cross-browser + real phone | §11 budget met on prod URL; §15 checklist green |

During any phase: run local project code for screenshots where possible; otherwise ask
Abdelrhman and continue other work while waiting.

## 14. DECISION LOG — deliberate trade-offs (so they're never re-litigated by accident)

| Decision | Rationale | Revisit when |
|---|---|---|
| **Zero-cost constraint: every service must be free-tier with NO credit card required, indefinitely** | Abdelrhman's explicit requirement. Verified stack cost = $0: Netlify free (no card), Web3Forms free (no card), Umami Cloud free (no card), Google Fonts, GitHub free. No service that free-trials into billing may be introduced | Never — any future addition must pass the no-card test first |
| Free `*.vercel.app` subdomain instead of custom domain | Zero-cost constraint above | Only if Abdelrhman ever opts to pay ~$10/yr himself |
| **Hosting moved Netlify → Vercel (2026-07-14)** | `*.netlify.app` is unreachable from Egyptian ISPs (connection timeouts in Abdelrhman's own browser while Netlify status showed all-operational; DNS resolved fine — consistent with regional blocking of bulk-hosting domains). He couldn't demo the site in Cairo and Egypt-based recruiters (EgyptAir) would hit the same wall. `*.vercel.app` is proven reachable from his network (Gate Buddy already runs there) and Vercel Hobby is free with no card. The §2.1 host-agnostic rule made this a URL-string-only change — zero code changes | Only if vercel.app becomes blocked too — then Cloudflare Pages, same playbook |
| Web3Forms over Netlify Forms | Netlify Forms needs a static-HTML workaround with the modern Next.js adapter and welds the form to the host; Web3Forms works anywhere, 250/mo free | If Web3Forms shuts down or spam exceeds its protections |
| Single dark theme, no light mode | One theme executed perfectly > two half-tested; dark navy is the brand; AA verified | If analytics show heavy mobile-daylight usage or a recruiter complains |
| English only | Target companies recruit engineering in English (incl. EgyptAir tech) | Applying to Arabic-first roles |
| No blog in v1 | Ship the portfolio; don't block on writing | v2: one strong technical article (e.g., "Parsing IATA BCBP boarding passes in Node.js") for SEO + credibility |
| Plain-text email/phone | Zero recruiter friction beats scraper obfuscation | If spam becomes real (then obfuscate render, keep copy buttons) |
| hCaptcha off by default | Conversion first; honeypot + server-side checks in place | First spam wave (zero-config enable) |
| No 3D/WebGL | 60-second scan + performance budget | Never for v1; maybe a v2 flourish |
| No testimonials section | Unverified quotes look like filler | If Abdelrhman obtains 1–2 real named quotes (professor/DEPI mentor) — then add to About |

## 15. ACCEPTANCE CHECKLIST (definition of done)
- [ ] All required sections: Header · Hero · About · Featured Work · Contact · Footer (+404)
- [ ] Every project shows title, type, gate ref, summary, photos
- [ ] Contact: phone + form (first name, last name, email, message) — real email delivery verified
- [ ] GitHub, LinkedIn, email, CV links in header, contact, footer — all verified by CI
- [ ] Colorful: gradients and layered shades throughout; never black-and-white
- [ ] Tone (§7): zero roleplay copy; graduate status correct; full name everywhere it counts
- [ ] Animations restrained, all reduced-motion fallbacks verified
- [ ] Mobile equals desktop in quality
- [ ] Lighthouse budget (§11) met on production URL; CI green (links, smoke, budget)
- [ ] Security headers present; external links `noopener noreferrer`
- [ ] §12 funnel done: pinned repos, bios, READMEs, CV carries portfolio URL
- [ ] Zero placeholders, zero broken links, zero console errors
- [ ] A recruiter from Emirates/Honeywell/SITA can, within 60 seconds: understand who he is,
      see his best aviation work with measurable results, and download his CV or contact him

---

*Plan v3 authored 2026-07-14 after senior audit of v2. Source of truth for personal data:
`cv/build_cv.py`. When in doubt: research globally, choose the best, keep the tone
professional, and ask Abdelrhman.*
