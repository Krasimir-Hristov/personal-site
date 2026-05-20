import type { Metadata } from 'next';
import AdminSettingsClient from '@/features/admin/components/AdminSettingsClient';

export const metadata: Metadata = {
  title: 'Settings',
  robots: { index: false, follow: false },
};

const AdminSettingsPage = () => <AdminSettingsClient />;

export default AdminSettingsPage;
