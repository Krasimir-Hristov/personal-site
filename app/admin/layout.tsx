import type { Metadata } from 'next';
import AdminSessionProvider from '@/features/admin/components/AdminSessionProvider';
import AdminSidebar from '@/features/admin/components/AdminSidebar';

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s — Admin' },
  robots: { index: false, follow: false },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <AdminSessionProvider>
      <div className='min-h-screen flex bg-[#09090b]'>
        <AdminSidebar />
        <main className='flex-1 px-8 py-8'>{children}</main>
      </div>
    </AdminSessionProvider>
  );
};

export default AdminLayout;
