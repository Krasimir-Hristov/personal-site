import type { NextAuthConfig } from 'next-auth';

// Edge-compatible config — no Node.js-only imports (no bcrypt here)
// Used by proxy.ts (Edge runtime) to check session and protect routes
export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: '/admin/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isLoginPage = nextUrl.pathname === '/admin/login';

      if (isLoginPage) {
        // Already logged in → redirect to dashboard
        if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl));
        return true;
      }

      if (isAdminRoute) {
        // Not logged in → NextAuth redirects to pages.signIn automatically
        return isLoggedIn;
      }

      return true;
    },
  },
};
