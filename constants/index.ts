import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

// Navbar links ---> used in Navbar.tsx
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

// Footer social links ---> used in Footer.tsx
export const socialLinks = [
  {
    href: 'https://github.com/krasimirHristov',
    icon: FaGithub,
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/krasimir-hristov',
    icon: FaLinkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://youtube.com/@krasimirHristov',
    icon: FaYoutube,
    label: 'YouTube',
  },
];
