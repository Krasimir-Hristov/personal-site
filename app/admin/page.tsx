import type { Metadata } from 'next';
import { auth } from '@/auth';
import { projects } from '@/constants';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const AdminDashboardPage = async () => {
  const session = await auth();

  return (
    <div>
      <h1 className='text-2xl font-semibold text-[#e6e0e9] mb-1'>Dashboard</h1>
      <p className='text-sm text-[#cbc4d2] mb-10'>
        Welcome back, {session?.user?.name ?? 'Admin'}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <StatCard label='Total Projects' value={projects.length} />
        <StatCard
          label='Featured'
          value={projects.filter((p) => p.featured).length}
        />
        <StatCard
          label='Categories'
          value={[...new Set(projects.flatMap((p) => p.category))].length}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className='rounded-xl border border-[#494551] bg-white/03 px-6 py-5'>
    <p className='text-3xl font-bold text-[#e6e0e9]'>{value}</p>
    <p className='text-sm text-[#cbc4d2] mt-1'>{label}</p>
  </div>
);

export default AdminDashboardPage;
