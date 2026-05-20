# SEO & Performance Reference Guide — 2026

> Reusable reference for Next.js (App Router) projects.
> Covers all PageSpeed / Core Web Vitals issues encountered and the full set of 2026 best practices.

---

## Table of Contents

1. [Changes Applied in This Project](#changes-applied-in-this-project)
2. [Core Web Vitals](#core-web-vitals)
3. [LCP — Largest Contentful Paint](#lcp--largest-contentful-paint)
4. [INP — Interaction to Next Paint](#inp--interaction-to-next-paint)
5. [CLS — Cumulative Layout Shift](#cls--cumulative-layout-shift)
6. [JavaScript Performance](#javascript-performance)
7. [Image Optimization](#image-optimization)
8. [CSS & Render-Blocking Resources](#css--render-blocking-resources)
9. [Fonts](#fonts)
10. [Technical SEO](#technical-seo)
11. [Structured Data (JSON-LD)](#structured-data-json-ld)
12. [Next.js App Router — SEO Checklist](#nextjs-app-router--seo-checklist)
13. [Mobile SEO](#mobile-seo)
14. [Security Headers (ranking signal)](#security-headers-ranking-signal)
15. [Preload / Preconnect Strategy](#preload--preconnect-strategy)

---

## Changes Applied in This Project

Record of PageSpeed findings and the fixes applied, starting from mobile score 65.

### Round 1 — Mobile 65 → 87

| Issue                        | Root Cause                                                                                                                      | Fix Applied                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Element render delay 3,700ms | LCP image wrapped in `motion.div` with `initial={{ opacity: 0 }}` — browser waits for JS to set opacity > 0 before counting LCP | Removed `opacity` from `initial`/`animate` props on hero image wrapper       |
| 13.7 KiB legacy polyfills    | No `.browserslistrc` → Next.js/SWC transpiles `Array.flat`, `Object.fromEntries`, etc. for all browsers                         | Created `.browserslistrc` with `chrome >= 87` targets                        |
| ~24 KiB unused framer-motion | Full `import { motion }` loads entire package at bundle init                                                                    | Migrated all components to `import { m }` + `LazyMotion` with `domAnimation` |

**Files changed:**

- `features/home/components/HeroSection.tsx` — removed `opacity: 0/1` from right-column `motion.div`
- `.browserslistrc` — created with modern targets
- `features/shared/components/MotionProvider.tsx` — created `<LazyMotion features={domAnimation}>`
- `app/layout.tsx` — wrapped body children with `<MotionProvider>`
- `features/home/components/CTABanner.tsx` — `motion.*` → `m.*`
- `features/home/components/AboutSection.tsx` — `motion.*` → `m.*`
- `features/projects/components/ProjectsList.tsx` — `motion.*` → `m.*`
- `features/projects/components/ProjectCard.tsx` — `motion.*` → `m.*`

---

### Round 2 — Mobile 87 → target 92+

| Issue                            | Root Cause                                                                                                                           | Fix Applied                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Element render delay 1,710ms     | LCP image inside `<m.div initial={{ scale: 0.92 }}>` — LazyMotion defers hydration, browser can't confirm stable paint until JS runs | Replaced `<m.div>` with plain `<div>` on hero image column                     |
| `fetchpriority=high` missing     | Same animation wrapper prevented Next.js Image's `priority` prop from injecting `fetchpriority` cleanly in SSR HTML                  | Fixed by removing the wrapper                                                  |
| Image 29.3 KiB (WebP only)       | Next.js defaults to WebP; AVIF saves 20–50% at same visual quality                                                                   | Added `images: { formats: ['image/avif', 'image/webp'] }` to `next.config.ts`  |
| 13.7 KiB polyfills still present | `.browserslistrc` targeted Chrome 87; `Array.prototype.at` needs 92+, `Object.hasOwn` needs 93+                                      | Updated `.browserslistrc` to `chrome >= 93`, `firefox >= 92`, `safari >= 15.4` |

**Files changed:**

- `features/home/components/HeroSection.tsx` — right column `<m.div>` → `<div>`
- `next.config.ts` — `images.formats` added
- `.browserslistrc` — tightened to Chrome 93+ / Firefox 92+ / Safari 15.4+

---

## Core Web Vitals

Google's ranking signals since 2021. Measured on real users via Chrome UX Report.

| Metric  | Good    | Needs Improvement | Poor    | Notes                                         |
| ------- | ------- | ----------------- | ------- | --------------------------------------------- |
| **LCP** | < 2.5s  | 2.5–4s            | > 4s    | Largest image or text block above fold        |
| **INP** | < 200ms | 200–500ms         | > 500ms | Replaced FID in March 2024                    |
| **CLS** | < 0.1   | 0.1–0.25          | > 0.25  | Visual stability; avoid late-injected content |

> Check field data at: `https://pagespeed.web.dev/` and `https://search.google.com/search-console`

---

## LCP — Largest Contentful Paint

### Critical Rules

```
NEVER do:
  initial={{ opacity: 0 }}   on the LCP element or its parent
  visibility: hidden          on the LCP element or its parent
  display: none               on the LCP element
  animate from opacity 0      using CSS or JS animations

ALWAYS do:
  fetchpriority="high"        on the LCP <img>
  priority                    on Next.js <Image> when it is the LCP
  No JS-animated wrapper      on the LCP element
  Server-render the LCP       use Server Components when possible
```

### LCP Breakdown (PageSpeed)

```
Time to first byte        → Improve server response time (CDN, edge runtime)
Resource load delay       → Eliminate render-blocking CSS/JS above the fold
Resource load duration    → Compress image (AVIF/WebP), use CDN
Element render delay      → Eliminate JS that must run before the element paints
```

### Next.js Image — LCP Best Practice

```tsx
// CORRECT — LCP image
<Image
  src='/images/hero.png'
  alt='Descriptive alt text'
  width={560}
  height={420}
  priority                    // adds fetchpriority="high" + <link rel="preload">
  className='...'
/>

// WRONG — wrapping in animated container
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  <Image src='...' priority />    // fetchpriority is blocked, LCP is hidden
</motion.div>

// ALSO WRONG — scale animation on LCP wrapper
<m.div initial={{ scale: 0.92 }} animate={{ scale: 1 }}>
  <Image src='...' priority />    // LazyMotion defers init → element render delay
</m.div>
```

### Framer Motion + LCP

When using framer-motion for page entrance animations:

- Animate **text** and **non-LCP elements** freely
- The **LCP element** (hero image, h1, etc.) must render immediately
- Replace `motion.div` / `m.div` around the LCP with a plain `<div>`
- Apply `LazyMotion` + `domAnimation` to defer the non-critical animation bundle

---

## INP — Interaction to Next Paint

Measures responsiveness. Replaced FID (First Input Delay) in Google ranking signals in March 2024.

### Causes of High INP

- Long JavaScript tasks (> 50ms) blocking the main thread
- Heavy event handlers (sort, filter, re-render large lists)
- Unoptimized React state updates causing excessive re-renders
- Third-party scripts running on the main thread

### Fixes

```ts
// Break long tasks with scheduler.yield() (Chrome 115+)
async function longTask() {
  for (const item of items) {
    processItem(item);
    await scheduler.yield(); // yield to browser between items
  }
}

// Use useTransition for non-urgent state updates (React 18+)
const [isPending, startTransition] = useTransition();
startTransition(() => setFilter(newFilter));

// Virtualize long lists
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## CLS — Cumulative Layout Shift

Visual stability. Caused by content that moves after initial paint.

### Common Causes & Fixes

```tsx
// PROBLEM: Image without dimensions shifts layout when it loads
<img src='/hero.png' />

// FIX: Always specify width + height (or use aspect-ratio CSS)
<Image src='/hero.png' width={560} height={420} />

// PROBLEM: Font swap causes text reflow
// FIX: Use next/font which applies font-display: swap automatically
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

// PROBLEM: Dynamic content injected above existing content
// FIX: Reserve space with min-height / skeleton placeholders
<div className='min-h-50'>
  {data ? <Content /> : <Skeleton />}
</div>

// PROBLEM: Ads / embeds without dimensions
// FIX: Always wrap in a fixed-aspect container
<div className='aspect-video'>
  <iframe ... />
</div>
```

---

## JavaScript Performance

### Bundle Size

```ts
// next.config.ts — analyze bundle
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
export default withBundleAnalyzer(nextConfig);

// Run: ANALYZE=true npm run build
```

### Framer Motion — LazyMotion Pattern

```tsx
// features/shared/components/MotionProvider.tsx
'use client';
import { LazyMotion, domAnimation } from 'framer-motion';

const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={domAnimation}>{children}</LazyMotion>
);
export default MotionProvider;

// app/layout.tsx
import MotionProvider from '@/features/shared/components/MotionProvider';
// Wrap body content: <MotionProvider>{children}</MotionProvider>

// In components: import { m } from 'framer-motion' — NOT motion
import { m } from 'framer-motion';
// <m.div animate={...} />  — uses the lazily loaded features
```

> `domAnimation` supports: `animate`, `initial`, `exit`, `variants`, `whileHover`, `whileTap`, `whileInView`.
> For drag or layout animations use `domMax` instead.

### Browser Targets — Remove Unnecessary Polyfills

Create `.browserslistrc` in the project root:

```ini
[production]
chrome >= 93
firefox >= 92
safari >= 15.4
edge >= 93

[development]
last 1 chrome version
last 1 firefox version
last 1 safari version
```

**Browser feature support reference:**

| Feature                | Chrome | Firefox | Safari |
| ---------------------- | ------ | ------- | ------ |
| `Array.prototype.flat` | 69     | 62      | 12     |
| `Object.fromEntries`   | 73     | 63      | 12.1   |
| `String.trimStart/End` | 66     | 61      | 12     |
| `Array.prototype.at`   | 92     | 90      | 15.4   |
| `Object.hasOwn`        | 93     | 92      | 15.4   |
| `structuredClone`      | 98     | 94      | 15.4   |

> Target the **highest** minimum needed to eliminate all polyfills. Chrome 93 / Firefox 92 / Safari 15.4 eliminates all of the above.

### Dynamic Imports (code splitting)

```tsx
import dynamic from 'next/dynamic';

// Defer heavy components that are not above the fold
const HeavyChart = dynamic(
  () => import('@/features/analytics/components/Chart'),
  {
    loading: () => <Skeleton className='h-64' />,
    ssr: false, // skip server render for client-only libs
  },
);
```

### Avoid Long Main Thread Tasks

- Keep event handlers under 50ms
- Use `requestIdleCallback` for non-critical work
- Split large data processing into chunks
- Avoid synchronous localStorage access on render

---

## Image Optimization

### Next.js Configuration

```ts
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF first (25-50% smaller than WebP)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // for fill/layout
  },
};
```

**Format comparison at same quality:**

| Format | Size (example) | Support                             |
| ------ | -------------- | ----------------------------------- |
| JPEG   | 100 KiB        | Universal                           |
| WebP   | 65 KiB         | Chrome 32+, Firefox 65+, Safari 14+ |
| AVIF   | 40 KiB         | Chrome 85+, Firefox 93+, Safari 16+ |

### Checklist

- `priority` on all above-fold images (adds `fetchpriority="high"` + `<link rel="preload">`)
- Never wrap LCP image in an animation container
- Always set `width` and `height` (prevents CLS)
- Use descriptive `alt` text (SEO + accessibility)
- Compress source images before uploading (aim for < 500 KiB source)
- Use `fill` prop + parent `position: relative` for flexible containers
- Use `sizes` prop for responsive images outside of fixed-width containers

```tsx
// Responsive full-width image
<div className='relative w-full aspect-video'>
  <Image
    src='/images/cover.png'
    alt='Project screenshot'
    fill
    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    className='object-cover'
  />
</div>
```

---

## CSS & Render-Blocking Resources

### What Causes Render Blocking

CSS files in `<head>` block first paint until fully downloaded and parsed. JavaScript with no `defer`/`async` blocks HTML parsing.

### Next.js — What You Can Control

```tsx
// next.config.ts — experimental CSS optimization (Next.js 15+)
const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true, // inlines critical CSS, defers non-critical
  },
};
```

> `optimizeCss` uses `critters` to inline above-the-fold CSS. Use with caution — test thoroughly.

### Third-Party Scripts

```tsx
// Use next/script with strategy
import Script from 'next/script';

// After page is interactive — analytics, chat widgets
<Script src='https://analytics.example.com/script.js' strategy='afterInteractive' />

// When browser is idle — lower priority scripts
<Script src='https://widget.example.com/embed.js' strategy='lazyOnload' />

// Inline critical scripts only
<Script id='schema-org' type='application/ld+json' strategy='beforeInteractive'>
  {JSON.stringify(structuredData)}
</Script>
```

---

## Fonts

```tsx
// app/layout.tsx — use next/font (zero CLS, no render blocking)
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',           // font-display: swap
  variable: '--font-inter',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

// Apply to <html>:
<html className={`${inter.variable} ${mono.variable}`}>

// Local fonts
import localFont from 'next/font/local';
const myFont = localFont({ src: './fonts/MyFont.woff2', display: 'swap' });
```

**Rules:**

- Always use `next/font` — self-hosts fonts, eliminates external font request
- Never `@import` Google Fonts in CSS (render-blocking)
- If using external fonts, add `<link rel="preconnect" href="https://fonts.googleapis.com">`

---

## Technical SEO

### Metadata — Next.js App Router

```tsx
// app/page.tsx or app/[slug]/page.tsx

import { Metadata } from 'next';

// Static
export const metadata: Metadata = {
  title: 'Page Title — Site Name', // < 60 chars
  description: 'Page description here.', // < 160 chars
  keywords: ['keyword1', 'keyword2'], // low signal but harmless
  authors: [{ name: 'Your Name' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://yourdomain.com/page',
  },
  openGraph: {
    title: 'Page Title — Site Name',
    description: 'Page description here.',
    url: 'https://yourdomain.com/page',
    siteName: 'Site Name',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title — Site Name',
    description: 'Page description here.',
    images: ['/og-image.png'],
    creator: '@yourhandle',
  },
};

// Dynamic
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await fetchData(params.slug);
  return {
    title: data.title,
    description: data.description,
    openGraph: { images: [data.imageUrl] },
  };
}
```

### Open Graph Image — Auto-Generated

```tsx
// app/opengraph-image.tsx — Next.js generates OG image automatically
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Site Name';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#09090b',
        color: '#e6e0e9',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 48,
      }}
    >
      Your Site Name
    </div>,
  );
}
```

### Sitemap

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://yourdomain.com/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://yourdomain.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
```

### robots.txt

```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

### Semantic HTML — Required Structure

```tsx
// Every page must follow this hierarchy:
<html lang='en'>
  <body>
    <header>
      {' '}
      // site header + nav
      <nav>...</nav>
    </header>
    <main>
      {' '}
      // main content — exactly ONE per page
      <h1>...</h1> // exactly ONE h1 per page
      <section>
        {' '}
        // logical sections
        <h2>...</h2>
        <article>...</article>
      </section>
    </main>
    <footer>...</footer>
  </body>
</html>
```

**Rules:**

- One `<h1>` per page (the primary topic)
- Never skip heading levels (`h1` → `h2` → `h3`, not `h1` → `h3`)
- Use `<main>` for the primary content region
- Use `<nav>` for navigation landmarks
- Use `<article>` for self-contained content (blog posts, cards)
- Use `<section>` for thematic groupings with a heading

### Canonical URL

Prevents duplicate content penalties when the same page is accessible via multiple URLs.

```tsx
// In metadata:
alternates: {
  canonical: 'https://yourdomain.com/page';
}

// Or in layout for all pages:
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};
```

---

## Structured Data (JSON-LD)

Helps Google understand your content and enables rich results in search.

### Person (portfolio site)

```tsx
// app/page.tsx — add to a Server Component
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Your Name',
  url: 'https://yourdomain.com',
  jobTitle: 'Web Developer & AI Engineer',
  email: 'you@example.com',
  sameAs: [
    'https://github.com/yourusername',
    'https://linkedin.com/in/yourprofile',
    'https://twitter.com/yourhandle',
  ],
};

// Inject in Server Component:
<script
  type='application/ld+json'
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
/>;
```

### WebSite (enables sitelinks search box)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Site Name",
  "url": "https://yourdomain.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yourdomain.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### SoftwareApplication (for project pages)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Project Name",
  "description": "Project description.",
  "applicationCategory": "WebApplication",
  "operatingSystem": "All",
  "url": "https://project-demo-url.com",
  "author": {
    "@type": "Person",
    "name": "Your Name"
  }
}
```

---

## Next.js App Router — SEO Checklist

```
Layout & Pages
  [ ] <html lang="en"> set in root layout
  [ ] <meta name="viewport"> in root layout (Next.js adds automatically)
  [ ] metadata export on every page (title, description, og, twitter)
  [ ] generateMetadata for dynamic pages
  [ ] One <h1> per page component
  [ ] Semantic HTML structure in all pages

Images
  [ ] next/image for all images
  [ ] priority on LCP image (above-fold hero)
  [ ] width + height on every Image (prevents CLS)
  [ ] descriptive alt text on every Image
  [ ] images.formats: ['image/avif', 'image/webp'] in next.config.ts
  [ ] LCP image NOT wrapped in animation container

Fonts
  [ ] next/font for all fonts (no Google Fonts @import in CSS)
  [ ] display: 'swap' on all font configs

Links & Navigation
  [ ] next/link for all internal navigation
  [ ] rel="noopener noreferrer" on external links with target="_blank"

Performance
  [ ] .browserslistrc with modern targets (Chrome 93+)
  [ ] LazyMotion + domAnimation for framer-motion
  [ ] Dynamic imports for heavy below-fold components
  [ ] No long main thread tasks (> 50ms)

Technical
  [ ] app/sitemap.ts
  [ ] app/robots.ts
  [ ] app/opengraph-image.tsx
  [ ] canonical URL in metadata
  [ ] JSON-LD structured data on homepage and key pages
  [ ] HTTPS enforced
```

---

## Mobile SEO

Google uses mobile-first indexing — the mobile version of your site is the primary version for ranking.

```tsx
// Viewport — Next.js App Router adds this automatically via root layout
// Ensure it is NOT overridden anywhere

// Touch targets — minimum 44×44px
<button className='min-h-11 min-w-11 p-3'>...</button>

// Avoid intrusive interstitials (pop-ups that block content on mobile)
// Never use full-screen modals on page load on mobile

// Text readability — minimum 16px body text, 4.5:1 contrast ratio
```

### Testing

- Chrome DevTools → Toggle device toolbar
- `https://pagespeed.web.dev/` → mobile tab
- `https://search.google.com/test/mobile-friendly`

---

## Security Headers (ranking signal)

Google uses HTTPS as a ranking signal. Other headers protect users and build trust.

```ts
// next.config.ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};
```

---

## Preload / Preconnect Strategy

```tsx
// app/layout.tsx — add in <head> via metadata.other or manually

// Preconnect — establish connection early for external origins
<link rel='preconnect' href='https://fonts.googleapis.com' />
<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />

// DNS-Prefetch — lighter than preconnect, for origins used later
<link rel='dns-prefetch' href='https://analytics.example.com' />

// Preload — force high-priority download for critical resources
// Note: Next.js <Image priority> handles this automatically for images
<link rel='preload' href='/fonts/MyFont.woff2' as='font' type='font/woff2' crossOrigin='' />
```

### Priority Hints

```html
<!-- LCP image — fetch with highest priority -->
<img src="/hero.png" fetchpriority="high" />

<!-- Below-fold image — explicitly deprioritize -->
<img src="/footer-bg.png" fetchpriority="low" loading="lazy" />
```

> In Next.js: `<Image priority />` automatically adds `fetchpriority="high"`. **Only use `priority` on the LCP image** — overusing it defeats its purpose.

---

## PageSpeed Score Reference

| Score  | Rating            | Color  |
| ------ | ----------------- | ------ |
| 90–100 | Good              | Green  |
| 50–89  | Needs Improvement | Orange |
| 0–49   | Poor              | Red    |

**Realistic mobile targets for a Next.js portfolio/SaaS:**

| Metric               | Target  |
| -------------------- | ------- |
| LCP                  | < 2.5s  |
| INP                  | < 200ms |
| CLS                  | < 0.05  |
| FCP                  | < 1.8s  |
| TTFB                 | < 600ms |
| Overall mobile score | 90+     |

---

_Last updated: May 2026_
