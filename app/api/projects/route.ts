import { NextResponse } from 'next/server';
import { getProjects } from '@/features/admin/lib/project-actions';

export const GET = async () => {
  const projects = await getProjects();
  return NextResponse.json(projects);
};
