'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className='w-56 shrink-0 flex flex-col border-r border-[#494551] bg-white/02 min-h-screen px-4 py-8'>
      <p className='text-xs font-semibold uppercase tracking-widest text-[#cbc4d2] mb-8 px-2'>
        Admin
      </p>

      <nav className='flex flex-col gap-1 flex-1'>
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'px-3 py-2 rounded-lg text-sm transition-colors',
              pathname === href
                ? 'bg-white/08 text-[#e6e0e9]'
                : 'text-[#cbc4d2] hover:bg-white/04 hover:text-[#e6e0e9]',
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className='mt-auto px-3 py-2 rounded-lg text-sm text-[#cbc4d2] hover:bg-white/04 hover:text-red-400 transition-colors text-left'
      >
        Sign out
      </button>
    </aside>
  );
};

export default AdminSidebar;
