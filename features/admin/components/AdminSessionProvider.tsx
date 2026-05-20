'use client';

import { SessionProvider } from 'next-auth/react';

const AdminSessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AdminSessionProvider;
