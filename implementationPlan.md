# Implementation Plan — Krasimir Hristov Personal Website

## Overview

Portfolio + Admin Dashboard site for Krasimir Hristov (Web Developer & AI Engineer).
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Supabase (pgvector — Phase 6), Vercel AI SDK v5, OpenRouter, Resend.

---

## Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| Framework  | Next.js 16 (App Router)                                |
| Language   | TypeScript                                             |
| Styling    | Tailwind CSS + shadcn/ui                               |
| Animation  | Framer Motion                                          |
| Auth       | NextAuth.js (credentials — admin only)                 |
| LLM / AI   | OpenRouter (via Vercel AI SDK v5) — Phase 6            |
| Embeddings | OpenRouter — `openai/text-embedding-3-small` — Phase 6 |
| Vector DB  | Supabase (pgvector) — Phase 6                          |
| Email      | Resend — Phase 5                                       |
| Deployment | Vercel                                                 |

---

## Pages

| Route         | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `/`           | Home — Hero, About, Tech Stack, Projects preview, CTAs     |
| `/projects`   | Projects — cards with details, demo + GitHub links         |
| `/contact`    | Contact form → email to Krasimir via Resend                |
| `/admin`      | Admin Dashboard — protected, site content management       |
| `/playground` | AI Playground — Image Gen, TTS, STT, Mini RAG (later)      |
| `/chatbot`    | RAG Chatbot — talk to AI about Krasimir's projects (later) |

---

## Environment Variables (`.env.local`)

| Variable                               | Purpose                                   |
| -------------------------------------- | ----------------------------------------- |
| `ADMIN_PASSWORD`                       | Hashed admin password for dashboard login |
| `NEXTAUTH_SECRET`                      | NextAuth.js secret                        |
| `NEXTAUTH_URL`                         | App base URL (e.g. http://localhost:3000) |
| `RESEND_API_KEY`                       | Email sending (Phase 5)                   |
| `CONTACT_EMAIL`                        | Recipient email, owner only (Phase 5)     |
| `OPENROUTER_API_KEY`                   | LLM, embeddings, image gen (Phase 6)      |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase project URL (Phase 6)            |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key (Phase 6)               |
| `SUPABASE_SERVICE_ROLE_KEY`            | Supabase admin key, server only (Phase 6) |

---

## Phase 1 — Foundation ✅ Complete

- [x] Create Next.js 16 app with TypeScript, Tailwind CSS, App Router
- [x] Push to GitHub (`personal-site`)
- [x] Clean up default Next.js boilerplate
- [x] Initialize shadcn/ui (`npx shadcn@latest init`)
- [x] Install Framer Motion (`npm install framer-motion`)
- [x] Configure Tailwind with design system colors and fonts (from design files)
- [x] Create `lib/utils.ts` — export `cn()` helper (shadcn, used via `@/lib/utils`)
- [x] Create `features/shared/types.ts` — shared TypeScript types
- [x] Build `Navbar` component in `features/shared/components/`
- [x] Build `Footer` component in `features/shared/components/`
- [x] Create root layout (`app/layout.tsx`) with Navbar + Footer + dark theme

---

## Phase 2 — Home Page

- [x] Build `HeroSection` component — name, title, short bio, CTA buttons, Framer Motion entrance animation
- [x] Build `AboutSection` component — about text + tech stack badges, stagger animation
- [x] Build `ProjectsPreview` component — 2 featured project cards with hover animation
- [ ] Build `CTABanner` component — "Want to know more?" section
- [ ] Assemble Home page in `app/page.tsx`
- [ ] Add SEO metadata (`title`, `description`, `openGraph`, `twitter`)
- [ ] Add JSON-LD structured data for homepage

---

## Phase 3 — Static Pages

### Projects Page (`/projects`)

- [ ] Create project data file `features/projects/data/projects.ts` — title, description, tech stack, demo URL, GitHub URL
- [ ] Build `ProjectCard` component with Framer Motion hover effects
- [ ] Assemble Projects page in `app/projects/page.tsx`
- [ ] Add SEO metadata

### Contact Page (`/contact`)

- [ ] Build `ContactForm` component — Name, Email, Message fields + hidden honeypot field
- [ ] Add `useOptimistic` for immediate UI feedback on submit
- [ ] Create `app/api/contact/route.ts` — validate input with Zod, check rate limit, send via Resend
- [ ] Create `features/shared/lib/rate-limiter.ts` — in-memory IP rate limiter
- [ ] Apply rate limit: 3 submissions per IP per hour
- [ ] Assemble Contact page in `app/contact/page.tsx`
- [ ] Add SEO metadata

---

## Phase 4 — Admin Dashboard

### Auth

- [ ] Install NextAuth.js (`npm install next-auth`)
- [ ] Create `app/api/auth/[...nextauth]/route.ts` — credentials provider, validate against `ADMIN_PASSWORD` (bcrypt)
- [ ] Create `middleware.ts` — protect all `/admin/*` routes, redirect to `/admin/login` if unauthenticated
- [ ] Build `AdminLoginPage` at `app/admin/login/page.tsx`

### Dashboard

- [ ] Build `AdminLayout` at `app/admin/layout.tsx` — sidebar nav, logout button
- [ ] Build `AdminDashboardPage` at `app/admin/page.tsx` — overview stats
- [ ] Build `AdminProjectsPage` at `app/admin/projects/page.tsx` — list, add, edit, delete projects (JSON file or in-memory store, Supabase later)
- [ ] Build `ProjectForm` component — title, description, tech stack, demo URL, GitHub URL, featured flag
- [ ] Build `AdminSettingsPage` at `app/admin/settings/page.tsx` — update site metadata (bio, social links)

---

## Phase 5 — Contact & Email

- [ ] Set up Resend account, add `RESEND_API_KEY` and `CONTACT_EMAIL` to `.env.local`
- [ ] Wire up contact form API route (`app/api/contact/route.ts`) to Resend
- [ ] Test contact form end-to-end

---

## Phase 6 — Supabase + AI Features

### Supabase Setup

- [ ] Create Supabase project
- [ ] Enable `pgvector` extension
- [ ] Run database schema — create `documents` table with `vector(1536)` column
- [ ] Create `match_documents` similarity search function
- [ ] Create `features/shared/lib/supabase.ts` — typed Supabase client
- [ ] Migrate projects data from JSON to Supabase

### RAG Chatbot

- [ ] Write project knowledge base in `data/projects/` (markdown files)
- [ ] Create `scripts/ingest.ts` — chunk, embed via OpenRouter, upsert into Supabase
- [ ] Create `app/api/chat/route.ts` — `streamText` with `searchProjects`, `sendEmail`, `getContactInfo` tools
- [ ] Build chatbot UI (`ChatWindow`, `ChatMessage`, `ChatInput`)
- [ ] Assemble `/chatbot` page
- [ ] Rate limit chat route: 5 req/IP/hour

### AI Playground

- [ ] Image Generator — `/api/playground/image` + `ImageGen` component
- [ ] Text to Speech — `/api/playground/tts` + `TTSPlayer` component
- [ ] Speech to Text — `/api/playground/stt` + `STTRecorder` component
- [ ] Mini RAG Demo — `/api/playground/rag` + `MiniRAG` component
- [ ] Assemble `/playground` page with tabs
- [ ] Rate limit all playground routes: 5 req/IP/hour

### Admin: pgvector Management

- [ ] Build `AdminDocumentsPage` at `app/admin/documents/page.tsx` — view, add, delete knowledge base documents
- [ ] Build document upload / re-ingest UI

---

## Phase 7 — Polish & Launch

### Assets

- [ ] Generate favicon (`favicon.ico`, `icon.png` 32×32, 192×192, 512×512)
- [ ] Generate OG image (`og-image.png` 1200×630)
- [ ] Add tech logo icons to `public/images/tech/`

### SEO & Performance

- [ ] Review all pages have correct `metadata` exports
- [ ] Verify each page has exactly one `<h1>`
- [ ] Verify all images have descriptive `alt` text
- [ ] Add JSON-LD structured data for project pages
- [ ] Run Lighthouse audit — target 90+ on all metrics
- [ ] Check mobile responsiveness on all pages

### Final

- [ ] Review security checklist
- [ ] Deploy to Vercel and verify production build

---

## Database Schema Reference (Phase 6)

**Table:** `documents`

- `id` — bigserial primary key
- `content` — text (the chunk)
- `metadata` — jsonb (project name, source, etc.)
- `embedding` — vector(1536)

**Function:** `match_documents(query_embedding, match_threshold, match_count)`

- Returns rows ordered by cosine similarity
- Threshold default: 0.7 — Count default: 5

---

## Security Checklist

- [ ] All API keys only in `.env.local`, never in client code
- [ ] `SUPABASE_SERVICE_ROLE_KEY` only used in server-side API routes
- [ ] `ADMIN_PASSWORD` stored as bcrypt hash in `.env.local`
- [ ] Admin routes protected by NextAuth middleware
- [ ] Rate limiting applied to all public API routes
- [ ] Zod validation on all API route inputs
- [ ] Honeypot field present on contact form
- [ ] `sendEmail` tool: recipient hardcoded to `process.env.CONTACT_EMAIL` only
