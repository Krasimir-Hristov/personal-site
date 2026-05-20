import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const password = credentials?.password;
        if (!password || typeof password !== 'string') return null;

        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminPassword) return null;

        if (password !== adminPassword) return null;

        return { id: '1', name: 'Admin', email: 'admin@local' };
      },
    }),
  ],
});
