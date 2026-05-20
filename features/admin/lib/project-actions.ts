'use server';

import { revalidatePath } from 'next/cache';
import { sql } from '@/features/shared/lib/db';
import { dbToProject, type DbProject, type Project } from '@/features/shared/types';

export const getProjects = async (): Promise<Project[]> => {
  const rows = await sql`
    SELECT * FROM projects ORDER BY created_at DESC
  `;
  return (rows as DbProject[]).map(dbToProject);
};

export const createProject = async (
  data: Omit<Project, 'id'>,
): Promise<{ error?: string }> => {
  try {
    await sql`
      INSERT INTO projects (title, description, tech_stack, github_url, demo_url, badge, featured, category)
      VALUES (
        ${data.title},
        ${data.description},
        ${data.techStack},
        ${data.githubUrl ?? null},
        ${data.demoUrl ?? null},
        ${data.badge ?? null},
        ${data.featured},
        ${data.category}
      )
    `;
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return {};
  } catch {
    return { error: 'Failed to create project.' };
  }
};

export const updateProject = async (
  id: string,
  data: Omit<Project, 'id'>,
): Promise<{ error?: string }> => {
  try {
    await sql`
      UPDATE projects SET
        title       = ${data.title},
        description = ${data.description},
        tech_stack  = ${data.techStack},
        github_url  = ${data.githubUrl ?? null},
        demo_url    = ${data.demoUrl ?? null},
        badge       = ${data.badge ?? null},
        featured    = ${data.featured},
        category    = ${data.category}
      WHERE id = ${id}
    `;
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return {};
  } catch {
    return { error: 'Failed to update project.' };
  }
};

export const deleteProject = async (id: string): Promise<{ error?: string }> => {
  try {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    revalidatePath('/admin/projects');
    revalidatePath('/');
    return {};
  } catch {
    return { error: 'Failed to delete project.' };
  }
};
