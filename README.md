# Abdelrhman Hesham Galal — Portfolio

**Live: [abdelrhman-hesham.vercel.app](https://abdelrhman-hesham.vercel.app)**

Personal portfolio of an AI/ML & Backend Engineer specializing in Aviation
Information Systems. Featured work includes Gate Buddy (a 40+ endpoint
airport platform), DistilBERT airline sentiment research (93.5% accuracy),
and an aviation pre-flight risk assessment desktop app.

## Stack

- **Next.js 16** (App Router, static generation) + **TypeScript** (strict)
- **Tailwind CSS v4** with a custom aviation-precision design system
- **Motion** (LazyMotion) — fail-open scroll animations with full
  `prefers-reduced-motion` support
- **react-hook-form + zod** contact form via Web3Forms
- Deployed on **Netlify** (host-agnostic code — no platform APIs)

## Architecture notes

- All personal/project facts live in `src/content/*.ts`, validated by zod at
  build time — malformed content fails the build instead of shipping.
- Server HTML is always fully visible; animations are a post-hydration
  enhancement only.
- Lighthouse: 100 accessibility · 100 best practices · 100 SEO.

## Develop

```bash
npm install
npm run dev
```

Content edits: `src/content/profile.ts`, `projects.ts`, `experience.ts`.
