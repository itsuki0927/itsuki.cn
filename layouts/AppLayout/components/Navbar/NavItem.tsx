'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  slug: string;
  title: string;
}

const NavItem = ({ slug, title }: NavItemProps) => {
  const params = usePathname();

  return (
    <li
      className={clsx(
        'capsize relative cursor-pointer px-2 sm:px-4 text-center leading-8 tracking-widest transition-colors duration-500 hover:text-primary-hover',
        params === slug ? 'text-primary' : 'text-zinc-900',
      )}
    >
      <Link href={slug}>{title}</Link>
    </li>
  );
};

export default NavItem;
