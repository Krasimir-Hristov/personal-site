import { cn } from '@/lib/utils';

const BADGE_THEMES: Record<
  string,
  { bg: string; blob1: string; blob2: string; blob3: string; accent: string }
> = {
  'AI / Chat': {
    bg: 'bg-[#020d10]',
    blob1: 'bg-cyan-500/30',
    blob2: 'bg-cyan-700/20',
    blob3: 'bg-teal-400/15',
    accent: 'text-cyan-300',
  },
  'AI / Assistant': {
    bg: 'bg-[#07040f]',
    blob1: 'bg-violet-500/30',
    blob2: 'bg-violet-700/20',
    blob3: 'bg-purple-400/15',
    accent: 'text-violet-300',
  },
  Freelance: {
    bg: 'bg-[#0f0a02]',
    blob1: 'bg-amber-500/30',
    blob2: 'bg-amber-700/20',
    blob3: 'bg-yellow-400/15',
    accent: 'text-amber-300',
  },
  'Full-Stack': {
    bg: 'bg-[#02060f]',
    blob1: 'bg-blue-500/30',
    blob2: 'bg-blue-700/20',
    blob3: 'bg-sky-400/15',
    accent: 'text-blue-300',
  },
  'Open Source': {
    bg: 'bg-[#020f06]',
    blob1: 'bg-emerald-500/30',
    blob2: 'bg-emerald-700/20',
    blob3: 'bg-green-400/15',
    accent: 'text-emerald-300',
  },
};

const DEFAULT_THEME = {
  bg: 'bg-[#09090b]',
  blob1: 'bg-zinc-500/20',
  blob2: 'bg-zinc-700/15',
  blob3: 'bg-zinc-400/10',
  accent: 'text-zinc-300',
};

interface ProjectBannerProps {
  title: string;
  badge?: string;
  className?: string;
}

const ProjectBanner = ({ title, badge, className }: ProjectBannerProps) => {
  const theme =
    (badge ? BADGE_THEMES[badge] : undefined) ??
    Object.entries(BADGE_THEMES).find(([key]) =>
      badge?.toLowerCase().includes(key.toLowerCase()),
    )?.[1] ??
    DEFAULT_THEME;

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden rounded-xl',
        theme.bg,
        className,
      )}
    >
      {/* animated blobs */}
      <div
        className={cn(
          'banner-blob-1 absolute -top-1/4 -left-1/4 w-3/4 h-3/4 rounded-full blur-3xl',
          theme.blob1,
        )}
      />
      <div
        className={cn(
          'banner-blob-2 absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-3xl',
          theme.blob2,
        )}
      />
      <div
        className={cn(
          'banner-blob-3 absolute top-1/4 right-1/3 w-1/2 h-1/2 rounded-full blur-2xl',
          theme.blob3,
        )}
      />

      {/* noise overlay */}
      <div
        className='absolute inset-0 opacity-[0.03] mix-blend-overlay'
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* title */}
      <span
        className={cn(
          'relative z-10 font-black tracking-tight select-none text-center px-6 leading-none',
          theme.accent,
          'text-4xl md:text-5xl drop-shadow-lg',
        )}
      >
        {title}
      </span>
    </div>
  );
};

export default ProjectBanner;
