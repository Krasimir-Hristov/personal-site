import type { Metadata } from 'next';
import LoginForm from '@/features/admin/components/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

const AdminLoginPage = () => {
  return (
    <main className='min-h-screen flex items-center justify-center bg-[#09090b]'>
      <div className='w-full max-w-sm px-8 py-10 rounded-2xl border border-[#494551] bg-white/03'>
        <h1 className='text-xl font-semibold text-[#e6e0e9] mb-8 text-center'>
          Admin
        </h1>
        <LoginForm />
      </div>
    </main>
  );
};

export default AdminLoginPage;
