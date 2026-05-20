import type { Metadata } from 'next';
import { getProjects } from '@/features/admin/lib/project-actions';
import AdminProjectsClient from '@/features/admin/components/AdminProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
};

const AdminProjectsPage = async () => {
  const projects = await getProjects();
  return <AdminProjectsClient initialProjects={projects} />;
};

export default AdminProjectsPage;
