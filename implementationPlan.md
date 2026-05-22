# Implementation Plan � Krasimir Hristov Personal Website

## Overview

Portfolio + Admin Dashboard site for Krasimir Hristov (Web Developer & AI Engineer).
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Neon (pgvector � Phase 6), Vercel AI SDK v5, OpenRouter, Resend.

---

## Tech Stack

| Layer      | Technology                                                  |
| ---------- | ----------------------------------------------------------- |
| Framework  | Next.js 16 (App Router)                                     |
| Language   | TypeScript                                                  |
| Styling    | Tailwind CSS + shadcn/ui                                    |
| Animation  | Framer Motion (LazyMotion + domAnimation)                   |
| Auth       | NextAuth.js (credentials � admin only, no external service) |
| LLM / AI   | OpenRouter (via Vercel AI SDK v5) � Phase 6                 |
| Embeddings | OpenRouter � `openai/text-embedding-3-small` � Phase 6      |
| Vector DB  | Neon (pgvector) � Phase 6                                   |
| Email      | Resend                                                      |
| Deployment | Vercel                                                      |

---

## Pages

| Route         | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| `/`           | Home � Hero, About, Specializations, Projects, CTABanner, Contact |
| `/contact`    | Standalone contact page (same form + info, direct URL)            |
| `/admin`      | Admin Dashboard � protected, site content management              |
| `/playground` | AI Playground � Image Gen, TTS, STT, Mini RAG (Phase 6)           |
| `/chatbot`    | RAG Chatbot � talk to AI about Krasimir's projects (Phase 6)      |

---

## Environment Variables (`.env.local`)

| Variable             | Purpose                                                  |
| -------------------- | -------------------------------------------------------- |
| `ADMIN_PASSWORD`     | bcrypt hash of admin password (never plaintext)          |
| `NEXTAUTH_SECRET`    | NextAuth.js JWT signing secret                           |
| `NEXTAUTH_URL`       | App base URL (e.g. http://localhost:3000)                |
| `RESEND_API_KEY`     | Email sending via Resend                                 |
| `CONTACT_EMAIL`      | Recipient email � owner only                             |
| `OPENROUTER_API_KEY` | LLM, embeddings, image gen (Phase 6)                     |
| `DATABASE_URL`       | Neon PostgreSQL connection string (server only, Phase 6) |

---

## Phase 1 � Foundation ? Complete

- [x] Create Next.js 16 app with TypeScript, Tailwind CSS, App Router
- [x] Push to GitHub (`personal-site`)
- [x] Clean up default Next.js boilerplate
- [x] Initialize shadcn/ui (`npx shadcn@latest init`)
- [x] Install Framer Motion (`npm install framer-motion`)
- [x] Configure Tailwind with design system colors and fonts
- [x] Create `lib/utils.ts` � export `cn()` helper
- [x] Create `features/shared/types.ts` � shared TypeScript types
- [x] Build `Navbar` in `features/shared/components/` � scroll-based hash detection, smooth scroll, `isNavigating` guard for last section (Contact)
- [x] Build `Footer` in `features/shared/components/`
- [x] Create root layout (`app/layout.tsx`) with `MotionProvider` (LazyMotion), Navbar, Footer

---

## Phase 2 � Home Page ? Complete

- [x] Build `HeroSection` � name, title, bio, CTA buttons, Framer Motion entrance (LCP image is plain `<div>`, not animated)
- [x] Build `AboutSection` � bio text, tech stack badges, System Architecture card, `whileInView` animation
- [x] Build `SpecializationsSection` � 5 glass cards: RAG Systems, AI Chatbots, AI Agents, Full-Stack Web Apps, LLM Integration
- [x] Build `CTABanner` � "Want to know more?" ? link to /chatbot
- [x] Assemble Home page in `app/page.tsx` � sections: Hero ? About ? Specializations ? Projects ? CTABanner ? Contact
- [x] Add SEO metadata (`title`, `description`, `openGraph`, `twitter`) with Stuttgart location
- [x] Add JSON-LD structured data � `Person` schema with `areaServed`, `WebSite` schema

---

## Phase 3 � Static Pages ? Complete

### Projects (lives on Home as `/#projects`)

- [x] Build `ProjectCard`, `ProjectsFilter`, `ProjectsList` in `features/projects/components/`
- [x] Project data in `constants/index.ts`
- [x] No separate `/projects` page � section lives on Home

### Contact

- [x] Build `ContactForm` � Name, Email, Subject, Message + hidden honeypot field, `useOptimistic`
- [x] Build `ContactInfo` � email, location, phone, GitHub/LinkedIn links, copy-to-clipboard
- [x] Create `app/api/contact/route.ts` � Zod validation, rate limit, honeypot check, Resend
- [x] Create `features/shared/lib/rate-limiter.ts` � in-memory IP rate limiter (3 req/IP/hour)
- [x] Standalone page at `app/contact/page.tsx`
- [x] Contact section also embedded at `/#contact` on Home (bottom of page)
- [x] SEO metadata on `/contact` page

---

## Phase 4 � Email (Resend) ? Complete

- [x] Set up Resend, add `RESEND_API_KEY` + `CONTACT_EMAIL` to `.env.local`
- [x] Wire up `app/api/contact/route.ts` to Resend
- [x] Test contact form end-to-end

---

## Phase 5 � Admin Dashboard ? Next

### Auth

- [x] Install NextAuth.js (`npm install next-auth`) + bcrypt (`npm install bcryptjs @types/bcryptjs`)
- [x] Hash admin password: `node -e "require('bcryptjs').hash('your-password',12).then(console.log)"` ? put result in `ADMIN_PASSWORD`
- [x] Create `app/api/auth/[...nextauth]/route.ts` � credentials provider, `bcrypt.compare(input, ADMIN_PASSWORD)`
- [x] Create `proxy.ts` � protect `/admin/*`, redirect to `/admin/login` if no session cookie (`middleware.ts` is deprecated in Next.js v16)
- [x] Build `AdminLoginPage` at `app/admin/login/page.tsx`

### Dashboard Pages

- [x] Build `AdminLayout` at `app/admin/layout.tsx` — sidebar nav, logout button
- [x] Build `AdminDashboardPage` at `app/admin/page.tsx` — overview stats
- [x] Build `AdminProjectsPage` at `app/admin/projects/page.tsx` — list, add, edit, delete projects
- [x] Build `ProjectForm` component — title, description, tech stack, URLs, featured flag
- [x] Build `AdminSettingsPage` at `app/admin/settings/page.tsx` — bio, social links

---

## Phase 6 � Neon + AI Features

### Neon Setup

- [x] Create Neon project at neon.com (free tier � 100 projects, pgvector included)
- [x] Enable `pgvector` extension: `CREATE EXTENSION vector;`
- [x] Create `documents` table (schema below)
- [x] Create `match_documents` SQL function (schema below)
- [x] Create `features/shared/lib/db.ts` � Neon PostgreSQL client (`npm install @neondatabase/serverless`)
- [x] Add `DATABASE_URL` to `.env.local`

### RAG Chatbot

- [ ] Create `scripts/ingest.ts` � chunk, embed via OpenRouter (`openai/text-embedding-3-small`), upsert into Neon
- [ ] Create `app/api/chat/route.ts` � `streamText` with tools: `searchProjects` (RAG), `sendEmail`, `getContactInfo`
- [ ] Build chatbot UI: `ChatWindow`, `ChatMessage`, `ChatInput` in `features/chatbot/components/`
- [ ] Assemble `/chatbot` page
- [ ] Rate limit chat route: 5 req/IP/hour

### Admin: Knowledge Base Management

- [ ] Build `AdminDocumentsPage` at `app/admin/documents/page.tsx` � view, add, delete knowledge base docs
- [ ] Build document upload / re-ingest UI

---

## Phase 7 � Polish & Launch

### Assets

- [ ] Generate favicon (`favicon.ico`, `icon.png` 32�32, 192�192, 512�512)
- [ ] Generate OG image (`og-image.png` 1200�630)

### SEO & Performance

- [x] Verify each page has exactly one `<h1>`
- [x] Verify all images have descriptive `alt` text
- [x] Add JSON-LD structured data for project pages
- [x] Run Lighthouse audit � target 90+ on all metrics
- [x] Check mobile responsiveness on all pages

### Final

- [ ] Review security checklist
- [ ] Deploy to Vercel and verify production build

---

## Database Schema Reference (Phase 6 � Neon)

**Table:** `documents`

```sql
CREATE TABLE documents (
  id        bigserial PRIMARY KEY,
  content   text NOT NULL,
  metadata  jsonb,
  embedding vector(1536)
);
```

**Function:** `match_documents`

```sql
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count     int   DEFAULT 5
)
RETURNS TABLE (id bigint, content text, metadata jsonb, similarity float)
LANGUAGE sql STABLE AS $$
  SELECT id, content, metadata,
         1 - (embedding <=> query_embedding) AS similarity
  FROM   documents
  WHERE  1 - (embedding <=> query_embedding) > match_threshold
  ORDER  BY similarity DESC
  LIMIT  match_count;
$$;
```

---

## Security Checklist

- [ ] All API keys only in `.env.local`, never in client code
- [ ] `DATABASE_URL` only used in server-side code, never in client
- [ ] `ADMIN_PASSWORD` stored as bcrypt hash in `.env.local`
- [ ] Admin routes protected by `proxy.ts` (NextAuth session check)
- [ ] Rate limiting applied to all public API routes
- [ ] Zod validation on all API route inputs
- [ ] Honeypot field present on contact form
- [ ] `sendEmail` tool: recipient hardcoded to `process.env.CONTACT_EMAIL` only
