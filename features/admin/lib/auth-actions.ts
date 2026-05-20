'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const loginAction = async (password: string) => {
  try {
    await signIn('credentials', { password, redirectTo: '/admin' });
  } catch (error) {
    // AuthError = wrong credentials
    if (error instanceof AuthError) {
      return { error: 'Incorrect password.' };
    }
    // NEXT_REDIRECT is thrown by signIn on success — must re-throw
    throw error;
  }
};
