'use client';

import { Route } from '@/constants/route';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  route: Route;
}

const NavItem = ({ route }: NavItemProps) => {
  const params = usePathname();

  return (
    <li
      className={clsx(
        'capsize relative cursor-pointer px-2 sm:px-4 text-center leading-8 tracking-widest transition-colors duration-500 hover:text-primary-hover',
        params === route.path ? 'text-primary' : 'text-zinc-900',
      )}
    >
      <Link href={route.path}>{route.name}</Link>
    </li>
  );
};

export default NavItem;
