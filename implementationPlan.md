# Implementation Plan — Krasimir Hristov Personal Website

## Overview

Portfolio + AI Playground site for Krasimir Hristov (Web Developer & AI Engineer).
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase (pgvector), Vercel AI SDK v5, OpenRouter, Resend.

---

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Framework  | Next.js 16 (App Router)                                  |
| Language   | TypeScript                                               |
| Styling    | Tailwind CSS + shadcn/ui                                 |
| LLM / AI   | OpenRouter (via Vercel AI SDK v5)                        |
| Embeddings | OpenRouter — `openai/text-embedding-3-small` (1536 dims) |
| Vector DB  | Supabase (pgvector)                                      |
| Email      | Resend                                                   |
| Deployment | Vercel                                                   |
| Image Gen  | OpenRouter — `openai/dall-e-3` (via modalities)          |
| TTS        | OpenRouter — chat completions + `modalities: ["audio"]`  |
| STT        | OpenRouter — chat completions + `input_audio`            |

---

## Pages

| Route         | Description                                            |
| ------------- | ------------------------------------------------------ |
| `/`           | Home — Hero, About, Tech Stack, Projects preview, CTAs |
| `/projects`   | Projects — cards with details, demo + GitHub links     |
| `/playground` | AI Playground — Image Gen, TTS, STT, Mini RAG          |
| `/chatbot`    | RAG Chatbot — talk to AI about Krasimir's projects     |
| `/contact`    | Contact form → email to Krasimir via Resend            |

---

## Environment Variables (`.env.local`)

| Variable                               | Purpose                              |
| -------------------------------------- | ------------------------------------ |
| `OPENROUTER_API_KEY`                   | LLM, embeddings, image gen, TTS, STT |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase project URL (client-safe)   |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon key (client-safe)      |
| `SUPABASE_SERVICE_ROLE_KEY`            | Supabase admin key (server only)     |
| `RESEND_API_KEY`                       | Email sending                        |
| `CONTACT_EMAIL`                        | Recipient email (owner only)         |

---

## Phase 1 — Foundation

- [x] Create Next.js 16 app with TypeScript, Tailwind CSS, App Router
- [x] Push to GitHub (`personal-site`)
- [ ] Create Supabase project
- [ ] Enable `pgvector` extension in Supabase
- [ ] Run database schema — create `documents` table with `vector(1536)` column
- [ ] Create `match_documents` similarity search function in Supabase
- [ ] Fill in `.env.local` with all required keys
- [ ] Initialize shadcn/ui (`npx shadcn@latest init`)
- [ ] Configure dark mode (`class` strategy in Tailwind)
- [ ] Create `features/shared/lib/utils.ts` — export `cn()` helper
- [ ] Create `features/shared/lib/supabase.ts` — Supabase client (typed)
- [ ] Create `features/shared/lib/openrouter.ts` — OpenRouter client helper
- [ ] Create `features/shared/lib/types.ts` — shared TypeScript types
- [ ] Build `Navbar` component in `features/shared/components/`
- [ ] Build `Footer` component in `features/shared/components/`
- [ ] Create root layout (`app/layout.tsx`) with Navbar + Footer + dark theme

---

## Phase 2 — Static Pages

### Home Page (`/`)

- [ ] Build `HeroSection` component — name, title, short bio, CTA buttons
- [ ] Build `AboutSection` component — short paragraph about the transition to AI
- [ ] Build `TechStack` component — tech badges (Next.js, TypeScript, Python, LangChain, OpenAI, Supabase, Docker, Tailwind)
- [ ] Build `ProjectsPreview` component — 2 project cards
- [ ] Assemble Home page in `app/(marketing)/page.tsx`
- [ ] Add SEO metadata (`title`, `description`, `openGraph`, `twitter`)
- [ ] Add JSON-LD structured data for the homepage

### Projects Page (`/projects`)

- [ ] Create project data file `features/projects/data/projects.ts` — title, description, tech stack, demo URL, GitHub URL
- [ ] Build `ProjectCard` component
- [ ] Build `ProjectDetail` component — expanded view with full description
- [ ] Assemble Projects page in `app/(marketing)/projects/page.tsx`
- [ ] Add SEO metadata

### Contact Page (`/contact`)

- [ ] Build `ContactForm` component — Name, Email, Message fields + hidden honeypot field
- [ ] Add `useOptimistic` for immediate UI feedback on submit
- [ ] Create `app/api/contact/route.ts` — validate input with Zod, check rate limit, send via Resend
- [ ] Create `features/playground/lib/rate-limiter.ts` — in-memory IP rate limiter
- [ ] Apply rate limit: 3 submissions per IP per hour
- [ ] Assemble Contact page in `app/(marketing)/contact/page.tsx`
- [ ] Add SEO metadata

---

## Phase 3 — RAG Chatbot

### Data Ingestion

- [ ] Write project knowledge base — create `data/projects/` markdown files for each project (description, tech decisions, challenges, outcomes)
- [ ] Create `scripts/ingest.ts` — read markdown files, chunk into ~500 token pieces, embed via OpenRouter, upsert into Supabase

### API Route

- [ ] Create `app/api/chat/route.ts` — POST handler with Vercel AI SDK `streamText`
- [ ] Implement `searchProjects` tool — embed query via OpenRouter, call `match_documents` RPC in Supabase, return context
- [ ] Implement `sendEmail` tool — validate input, send via Resend to `CONTACT_EMAIL` only
- [ ] Implement `getContactInfo` tool — return public contact details
- [ ] Inject retrieved RAG context into system prompt
- [ ] Apply rate limiting on chat route (5 req/IP/hour)

### Chatbot UI

- [ ] Build `ChatWindow` component — message list with streaming support
- [ ] Build `ChatMessage` component — user and assistant message styles
- [ ] Build `ChatInput` component — text input + send button
- [ ] Add `useOptimistic` for instant message display before server response
- [ ] Wire up `useChat` hook from `ai/react`
- [ ] Assemble Chatbot page in `app/chatbot/page.tsx`
- [ ] Add SEO metadata

---

## Phase 4 — AI Playground

### Setup

- [ ] Apply rate limiting to all Playground routes (5 req/IP/hour)
- [ ] Create `app/playground/page.tsx` with tabs or sections for each tool

### Image Generator

- [ ] Create `app/api/playground/image/route.ts` — validate prompt with Zod, call OpenRouter image generation endpoint
- [ ] Build `ImageGen` component — prompt input, generate button, image display
- [ ] Show loading state while generating

### Text to Speech (TTS)

- [ ] Create `app/api/playground/tts/route.ts` — validate input, call OpenRouter with audio modality
- [ ] Build `TTSPlayer` component — text input, generate button, audio player

### Speech to Text (STT)

- [ ] Create `app/api/playground/stt/route.ts` — accept base64 audio, send to OpenRouter with `input_audio`
- [ ] Build `STTRecorder` component — record button, waveform/timer display, transcription result

### Mini RAG Demo

- [ ] Create `app/api/playground/rag/route.ts` — accept text snippet + question, embed both via OpenRouter, compute similarity in-memory (no DB)
- [ ] Build `MiniRAG` component — paste text area, question input, answer display
- [ ] Add SEO metadata for Playground page

---

## Phase 5 — Polish & Launch

### Assets

- [ ] Generate favicon (`favicon.ico`, `icon.png` 32x32, 192x192, 512x512)
- [ ] Generate OG image (`og-image.png` 1200x630)
- [ ] Add tech logo icons to `public/images/tech/`

### SEO & Performance

- [ ] Review all pages have correct `metadata` exports
- [ ] Verify each page has exactly one `<h1>`
- [ ] Verify all images have descriptive `alt` text
- [ ] Add JSON-LD structured data for project pages
- [ ] Run Lighthouse audit — target 90+ on all metrics
- [ ] Check mobile responsiveness on all pages

### Animations

- [ ] Install `framer-motion`
- [ ] Add entrance animations to Hero section
- [ ] Add hover animations to Project cards and Tech badges

### Final

- [ ] Review security checklist (no secrets in client, Zod on all routes, honeypot, rate limits)
- [ ] Test full chatbot flow end-to-end
- [ ] Test contact form end-to-end
- [ ] Test all Playground tools
- [ ] Deploy to Vercel and verify production build

---

## Database Schema Reference

**Table:** `documents`

- `id` — bigserial primary key
- `content` — text (the chunk)
- `metadata` — jsonb (project name, source, etc.)
- `embedding` — vector(1536)

**Function:** `match_documents(query_embedding, match_threshold, match_count)`

- Returns rows from `documents` ordered by cosine similarity
- Threshold default: 0.7 — Count default: 5

---

## Security Checklist

- [ ] All API keys only in `.env.local`, never in client code
- [ ] `SUPABASE_SERVICE_ROLE_KEY` only used in server-side API routes
- [ ] Rate limiting applied to all public API routes
- [ ] Zod validation on all API route inputs
- [ ] Honeypot field present on contact form
- [ ] `sendEmail` tool: recipient hardcoded to `process.env.CONTACT_EMAIL` only
