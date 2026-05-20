import { cn } from '@/lib/utils';

const BADGE_THEMES: Record<
  string,
  { from: string; via: string; to: string; accent: string }
> = {
  'AI / Chat': {
    from: 'from-cyan-950',
    via: 'via-cyan-900/60',
    to: 'to-slate-950',
    accent: 'text-cyan-400',
  },
  'AI / Assistant': {
    from: 'from-violet-950',
    via: 'via-violet-900/60',
    to: 'to-slate-950',
    accent: 'text-violet-400',
  },
  Freelance: {
    from: 'from-amber-950',
    via: 'via-amber-900/50',
    to: 'to-slate-950',
    accent: 'text-amber-400',
  },
  'Full-Stack': {
    from: 'from-blue-950',
    via: 'via-blue-900/50',
    to: 'to-slate-950',
    accent: 'text-blue-400',
  },
  'Open Source': {
    from: 'from-emerald-950',
    via: 'via-emerald-900/50',
    to: 'to-slate-950',
    accent: 'text-emerald-400',
  },
};

const DEFAULT_THEME = {
  from: 'from-zinc-900',
  via: 'via-zinc-800/50',
  to: 'to-slate-950',
  accent: 'text-zinc-400',
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

  const initials = title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden rounded-xl',
        `bg-linear-to-br ${theme.from} ${theme.via} ${theme.to}`,
        className,
      )}
    >
      {/* grid overlay */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* initials */}
      <span
        className={cn(
          'relative z-10 font-black tracking-tight select-none',
          theme.accent,
          'text-5xl',
        )}
      >
        {initials}
      </span>

      {/* badge pill */}
      {badge && (
        <span
          className={cn(
            'relative z-10 mt-3 px-2.5 py-0.5 rounded-full text-xs font-medium',
            'bg-white/10 border border-white/10',
            theme.accent,
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export default ProjectBanner;
