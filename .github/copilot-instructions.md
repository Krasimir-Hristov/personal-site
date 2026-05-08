# GitHub Copilot Instructions — Krasimir Hristov Personal Website

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

# Krasimir Hristov Personal Website — Agent Rules

## Before Writing Any Code

1. **Always read `implementationPlan.md` first** — it is the single source of truth for architecture, features, and phases. Do not write any code without reading it.
2. Read `.github/copilot-instructions.md` for coding conventions and patterns.
3. Check which **Phase** is currently active — do not implement features from future phases.
4. When using Vercel AI SDK, always use v5 patterns (`convertToModelMessages`, `toUIMessageStreamResponse`, no `toolCallStreaming` flag).

## Project Structure Rules

- Feature code ONLY in `features/<feature-name>/`
- Pages in `app/` import ONLY from `features/`
- API routes in `app/api/` with Zod validation
- No business logic in page components

## Vercel AI SDK v5 — Critical Patterns

```typescript
// CORRECT — v5 pattern
import { streamText, convertToModelMessages, tool } from 'ai';
const result = streamText({
  model: openrouter('anthropic/claude-3.5-sonnet'),
  messages: convertToModelMessages(messages),
  tools: { myTool: tool({ description: '...', parameters: z.object({...}), execute: async () => {} }) },
});
return result.toUIMessageStreamResponse();

// WRONG — v4 pattern, do not use
import { StreamingTextResponse, OpenAIStream } from 'ai'; // deprecated
```

## RAG Workflow

1. Always embed with `text-embedding-3-small` (1536 dimensions)
2. Always use `match_documents` RPC in Supabase (defined in implementationPlan.md)
3. Inject context into system prompt, never into user messages
4. Use `SUPABASE_SERVICE_ROLE_KEY` in API routes, never in client

## shadcn/ui

- Install: `npx shadcn@latest add <component>`
- Never edit `components/ui/` files directly
- Use `cn()` from `features/shared/lib/utils.ts`

## Rate Limiting

Every public API route must call `checkRateLimit()` before processing.
Return 429 + `{ error: "Too many requests" }` when limit exceeded.

## Security Non-Negotiables

- No secrets in client code or `NEXT_PUBLIC_*` vars (except Supabase anon + URL)
- Zod validation on every API route input
- `sendEmail` tool → recipient hardcoded to `process.env.CONTACT_EMAIL` only
- Honeypot field on contact form

## React Component Style

All React components **must** be written as arrow functions assigned to a `const`. Never use `function` keyword for components.

```tsx
// CORRECT
const Home = () => {
  return <div>...</div>;
};

export default Home;

// WRONG — do not use
export default function Home() {
  return <div>...</div>;
}
```

This applies to: page components, feature components, shared components — everything.

## What NOT to Do

- Do not use `pages/` directory
- Do not use `axios`
- Do not add `any` TypeScript types
- Do not add docstrings/comments to unchanged code
- Do not implement features not in `implementationPlan.md`
- Do not run `git push --force` without explicit user confirmation
- Do not write React components with the `function` keyword

## Project Overview

This is a portfolio + AI Playground website for Krasimir Hristov (Web Developer & AI Engineer).
Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase (pgvector), Vercel AI SDK, and OpenRouter.

Always read `implementationPlan.md` in the root for full architecture context before making changes.

---

## Architecture Rules

### Feature-Based Structure

- All feature code lives in `features/<feature-name>/`
- Each feature has `components/` and optionally `lib/` and `data/`
- Shared utilities go in `features/shared/lib/`
- Shared UI components go in `features/shared/components/`
- Next.js pages in `app/` only import from `features/`

### File Naming

- React components: `PascalCase.tsx`
- Utility functions: `camelCase.ts`
- API routes: `app/api/<resource>/route.ts`
- Types: define in `features/shared/lib/types.ts` or co-locate with the feature

---

## Code Style

### TypeScript

- Always use TypeScript — no `any` types
- Use Zod for all API input validation
- Use `type` for data shapes, `interface` for component props
- Export types from dedicated type files, not from component files

### React / Next.js

- Use Server Components by default; add `"use client"` only when needed (useState, useEffect, event handlers)
- Never fetch data in client components — use Server Components or Route Handlers
- Use `next/image` for all images
- Use `next/font` for fonts
- API routes live in `app/api/` and must validate input with Zod

### Tailwind CSS

- Use Tailwind utility classes, not inline styles
- Dark mode via `class` strategy (already configured)
- Use `cn()` helper (from `features/shared/lib/utils.ts`) for conditional classes
- Color palette: dark backgrounds (`zinc-900`, `zinc-950`), accents (`violet-500`, `violet-600`)

### shadcn/ui

- Install components with: `npx shadcn@latest add <component>`
- Never modify files in `components/ui/` directly — they are generated
- Compose shadcn primitives in feature components

---

## AI / LLM Patterns

### Vercel AI SDK (v5)

- Use `streamText` from `ai` for streaming chat responses
- Use `toUIMessageStreamResponse()` to return from route handlers
- Use `useChat` hook from `ai/react` in client components
- Tool call streaming is enabled by default in v5 — do NOT pass `toolCallStreaming`
- Convert messages with `convertToModelMessages()` before passing to `streamText`

```typescript
// app/api/chat/route.ts pattern
import { streamText, convertToModelMessages } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: openrouter('anthropic/claude-3.5-sonnet'),
    messages: convertToModelMessages(messages),
    system: '...',
    tools: { ... },
  });
  return result.toUIMessageStreamResponse();
}
```

### RAG Pattern

1. Embed query via OpenRouter: `POST https://openrouter.ai/api/v1/embeddings` with model `openai/text-embedding-3-small`
2. Search Supabase: `supabase.rpc('match_documents', { query_embedding, match_threshold: 0.7, match_count: 5 })`
3. Inject results into system prompt as context
4. Never expose raw embeddings to the client

### Tools (Function Calling)

- Define tools with Zod schemas using `tool()` from `ai`
- Always include a `description` for each tool and each parameter
- `sendEmail` tool must hardcode recipient to owner email only
- `searchProjects` tool does RAG lookup — call from server side only

---

## Supabase

- Client-side: use `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Server-side (API routes): use `SUPABASE_SERVICE_ROLE_KEY` — NEVER expose to client
- Create Supabase client in `features/shared/lib/supabase.ts`
- Use typed client: `createClient<Database>(url, key)`
- Note: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is deprecated — use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

---

## Email (Resend)

- Use `resend.emails.send()` in server-only API routes
- Always validate sender input — never allow arbitrary `to` addresses
- Contact form: `from` is always `noreply@yourdomain.com`, `to` is always owner email
- Chatbot `sendEmail` tool: same constraint — only sends to owner

---

## Rate Limiting

- All public API routes must have rate limiting
- Use `features/playground/lib/rate-limiter.ts` for simple in-memory limits
- Limits: Playground tools = 5 req/IP/hour; Contact form = 3 req/IP/hour
- Return HTTP 429 with JSON `{ error: "Too many requests" }` when exceeded

---

## Security

- Never put secrets in client components or `NEXT_PUBLIC_*` variables except Supabase anon key and URL
- Validate all API inputs with Zod — return 400 on invalid input
- Honeypot field on contact form (hidden input, reject if filled)
- Sanitize all user-provided text before displaying

---

## Environment Variables

Required in `.env.local`:

```
OPENROUTER_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CONTACT_EMAIL=
```

---

## SEO

- Every page must export a `metadata` object (or `generateMetadata` for dynamic pages) using Next.js built-in `Metadata` type
- Always set `title`, `description`, `openGraph` (title, description, image), and `twitter` fields
- Use semantic HTML: `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<h1>`–`<h6>` in correct order
- Each page must have exactly one `<h1>`
- Use `next/image` with descriptive `alt` text on all images
- Use `next/link` for all internal navigation
- Structured data (JSON-LD) for the homepage and project pages

```typescript
// Example page metadata
export const metadata: Metadata = {
  title: 'Krasimir Hristov — Web Developer & AI Engineer',
  description: 'Portfolio and AI Playground of Krasimir Hristov.',
  openGraph: {
    title: 'Krasimir Hristov — Web Developer & AI Engineer',
    description: 'Portfolio and AI Playground of Krasimir Hristov.',
    images: ['/og-image.png'],
  },
};
```

## Optimistic UI

- Use React's `useOptimistic` hook for any user action that triggers a server mutation (form submits, likes, sends)
- Show optimistic state immediately — do not wait for server response to update UI
- Always handle the error case and revert optimistic state on failure

```typescript
// Pattern
const [optimisticMessages, addOptimisticMessage] = useOptimistic(
  messages,
  (state, newMessage: Message) => [...state, newMessage],
);
```

## Do NOT

- Do not use `pages/` directory — this project uses App Router exclusively
- Do not use `getServerSideProps` or `getStaticProps`
- Do not use `axios` — use native `fetch` or Vercel AI SDK helpers
- Do not use `any` in TypeScript
- Do not modify `components/ui/` files (shadcn generated)
- Do not put business logic in page components — extract to feature `lib/`
- Do not add comments or docstrings to code that was not changed
- Do not over-engineer — implement only what is described in `implementationPlan.md`
