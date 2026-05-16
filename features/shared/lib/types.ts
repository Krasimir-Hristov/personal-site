export interface NavLink {
  href: string;
  label: string;
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
}

export interface SiteSettings {
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
}
