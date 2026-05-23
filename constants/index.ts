import {
  FaGithub,
  FaInternetExplorer,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { NavLink } from '@/features/shared/types';
import { Database, Bot, BrainCircuit, Layers, Zap } from 'lucide-react';

// Navbar links ---> used in Navbar.tsx
export const navLinks: NavLink[] = [
  { href: '/', label: 'Home', isActive: (p, h) => p === '/' && !h },
  { href: '/#about', label: 'About Me', isActive: (_, h) => h === '#about' },
  {
    href: '/#specializations',
    label: 'Specializations',
    isActive: (_, h) => h === '#specializations',
  },
  {
    href: '/#projects',
    label: 'Projects',
    isActive: (_, h) => h === '#projects',
  },
  { href: '/#contact', label: 'Contact', isActive: (_, h) => h === '#contact' },
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

// Specializations data for Home page ---> used in SpecializationsSection.tsx

export const specializations = [
  {
    icon: Database,
    title: 'RAG Systems',
    description:
      'Vector search, semantic document retrieval and knowledge pipelines. Build Q&A systems that answer from your own data with precision.',
  },
  {
    icon: Bot,
    title: 'AI Chatbots',
    description:
      'Context-aware conversational AI with streaming responses, memory management, and custom personas built on modern LLMs.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Agents',
    description:
      'Autonomous agents with tool-calling, multi-step reasoning, and real-world action execution. From research bots to workflow automation.',
  },
  {
    icon: Layers,
    title: 'Full-Stack Web Apps',
    description:
      'End-to-end Next.js applications — from database schema to deployed product. TypeScript, REST APIs, authentication, and responsive UIs.',
  },
  {
    icon: Zap,
    title: 'LLM Integration',
    description:
      'Connect any LLM to your product via OpenAI, Anthropic, or OpenRouter. Streaming, function calling, and rate limiting included.',
  },
];

// Admin sidebar links ---> used in AdminSidebar.tsx
export const navItemsAdminSideBar = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/documents', label: 'Knowledge Base' },
  // { href: '/admin/settings', label: 'Settings' },
];
