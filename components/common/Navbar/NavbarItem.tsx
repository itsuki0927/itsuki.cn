'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

const NavbarItem = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const pathname = usePathname();
  /* const { asPath } = useRouter(); */
  const isActive = href === pathname;

  return (
    <li
      className={classNames(
        'capsize relative hidden cursor-pointer px-5 text-center leading-8 tracking-widest transition-colors duration-500 hover:text-primary-hover md:inline-block',
        isActive ? 'text-primary' : 'text-dark-2'
      )}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default NavbarItem;
