export interface NavLink {
  href: string;
  label: string;
  isActive: (pathname: string, hash: string) => boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  badge?: string;
  featured: boolean;
  category: string[];
}

export interface SiteSettings {
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}

// Raw row from Neon `projects` table (snake_case)
export interface DbProject {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  badge: string | null;
  featured: boolean;
  category: string[];
  created_at: string;
  updated_at: string;
}

export const dbToProject = (row: DbProject): Project => ({
  id: row.id,
  title: row.title,
  description: row.description,
  techStack: row.tech_stack,
  githubUrl: row.github_url ?? undefined,
  demoUrl: row.demo_url ?? undefined,
  badge: row.badge ?? undefined,
  featured: row.featured,
  category: row.category,
});

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// Raw row from Neon `documents` table
export interface DbDocument {
  id: number;
  content: string;
  metadata: { title?: string } | null;
  created_at?: string;
}
