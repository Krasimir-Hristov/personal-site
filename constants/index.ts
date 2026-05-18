import {
  FaGithub,
  FaInternetExplorer,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { NavLink, Project } from '@/features/shared/types';
import { FaWebAwesome, FaWebflow } from 'react-icons/fa6';
// Navbar links ---> used in Navbar.tsx
export const navLinks: NavLink[] = [
  { href: '/', label: 'Home', isActive: (p, h) => p === '/' && !h },
  { href: '/#about', label: 'About Me', isActive: (_, h) => h === '#about' },
  {
    href: '/#projects',
    label: 'Projects',
    isActive: (_, h) => h === '#projects',
  },
  { href: '/contact', label: 'Contact', isActive: (p) => p === '/contact' },
];

// Footer social links ---> used in Footer.tsx
export const socialLinks = [
  {
    href: 'https://github.com/Krasimir-Hristov',
    icon: FaGithub,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/krasimir-hristov/',
    icon: FaLinkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://www.youtube.com/@krasimirhristov6757',
    icon: FaYoutube,
    label: 'YouTube',
  },
  {
    href: 'https://www.krasimirxristov.com/',
    icon: FaInternetExplorer, // Replace with an appropriate icon for the personal website if desired
    label: 'Website', // This is intentional to have a "Website" label with the YouTube icon, as per the original code. Adjust if needed.
  },
];

//About section tech stack badges ---> used in AboutSection.tsx
export const techStack = [
  // Frontend
  { label: 'Next.js', color: 'text-[#e6e0e9]' }, // black/white logo
  { label: 'React', color: 'text-[#61dafb]' }, // React cyan-blue
  { label: 'TypeScript', color: 'text-[#3b82f6]' }, // TS blue
  { label: 'JavaScript', color: 'text-[#facc15]' }, // JS yellow
  { label: 'Tailwind CSS', color: 'text-[#06b6d4]' }, // Tailwind cyan
  // Backend
  { label: 'Node.js', color: 'text-[#4ade80]' }, // Node green
  { label: 'FastAPI', color: 'text-[#34d399]' }, // FastAPI teal-green
  { label: 'Python', color: 'text-[#facc15]' }, // Python yellow
  // AI / LLM
  { label: 'LangChain', color: 'text-[#a78bfa]' }, // LangChain purple
  { label: 'LangGraph', color: 'text-[#a78bfa]' },
  { label: 'LangSmith', color: 'text-[#a78bfa]' },
  { label: 'OpenRouter', color: 'text-[#06b6d4]' }, // OpenRouter teal
  // DB / Infra
  { label: 'Supabase', color: 'text-[#3ecf8e]' }, // Supabase green
  { label: 'pgvector', color: 'text-[#60a5fa]' }, // PostgreSQL blue
  { label: 'Docker', color: 'text-[#60a5fa]' }, // Docker blue
  { label: 'Vercel', color: 'text-[#e6e0e9]' }, // Vercel white
];

// Projects data
export const projects: Project[] = [
  {
    id: 'savage-ai',
    title: 'Savage AI',
    description:
      'Chat app where you pick an arrogant character — angry grandpa, cooperative shark, balkandzhiya — that roasts you constantly but actually gets things done. Supports image generation, RAG knowledge base, and voice conversations via ElevenLabs.',
    techStack: [
      'Next.js',
      'LangChain',
      'OpenRouter',
      'ElevenLabs',
      'Supabase',
      'pgvector',
    ],
    githubUrl: 'https://github.com/Krasimir-Hristov/Savage-AI',
    demoUrl: 'https://savage-ai-tau.vercel.app/',
    badge: 'AI / Chat',
    featured: true,
    category: ['AI Tools', 'Web Apps'],
  },
  {
    id: 'axon',
    title: 'AXON',
    description:
      'Personal AI assistant connected to 30+ LLM models, RAG system, YouTube transcript extraction, and text-to-speech. Built as a growing platform — new tools and sub-agents are added as needed.',
    techStack: [
      'Next.js',
      'FastAPI',
      'shadcn/ui',
      'OpenRouter',
      'Supabase',
      'pgvector',
    ],
    githubUrl: 'https://github.com/Krasimir-Hristov/AXON',
    badge: 'AI / Assistant',
    featured: true,
    category: ['AI Tools'],
  },
  {
    id: 'freelance-1',
    title: 'Internal CRM System',
    description:
      'Custom CRM solution built for a client — internal company system for managing leads, tasks, and team communication.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    badge: 'Freelance',
    featured: false,
    category: ['Web Apps'],
  },
  {
    id: 'freelance-2',
    title: 'Business Dashboard',
    description:
      'Internal analytics and reporting dashboard for a business client, providing real-time data visualization and export functionality.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    badge: 'Freelance',
    featured: false,
    category: ['Web Apps'],
  },
];
