import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Use the edge-compatible config (no bcrypt) for the proxy runtime
const { auth } = NextAuth(authConfig);

// Next.js v16 uses proxy.ts — `middleware.ts` is deprecated
// Export named `proxy` (not `middleware`)
export const proxy = auth;

export const config = {
  matcher: ['/admin/:path*'],
};
