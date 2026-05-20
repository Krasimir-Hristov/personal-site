import type { Metadata } from 'next';
import AdminProjectsClient from '@/features/admin/components/AdminProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
};

const AdminProjectsPage = () => <AdminProjectsClient />;

export default AdminProjectsPage;
