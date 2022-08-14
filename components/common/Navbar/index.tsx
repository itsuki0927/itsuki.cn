import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { Logo } from '@/components/common';
import { GithubIcon, RssIcon } from '@/components/icons';
import { GAEventCategories } from '@/constants/gtag';
import { useTheme } from '@/hooks';
import { gtag } from '@/utils/gtag';
import ExternalLink from '../ExternalLink';
import MobileMenu from '../Layout/MobileMenu';
import ThemeSwitch from '../ThemeSwitch';

const NavbarItem = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const { asPath } = useRouter();
  const isActive = href === asPath;

  return (
    <li
      className={classNames(
        'capsize relative hidden cursor-pointer px-5 text-center tracking-widest transition-colors duration-500 hover:text-primary-hover md:inline-block',
        isActive ? 'text-primary' : 'text-dark-2'
      )}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
};

const DEFAULT_NAV_LIST = [
  { path: '/blog', name: '文章' },
  { path: '/archive', name: '归档' },
  { path: '/guestbook', name: '留言' },
  { path: '/about', name: '关于' },
];

interface IconNavProps {
  className?: string;
}

export const IconNav = ({ className = '' }: IconNavProps) => {
  const [theme] = useTheme();

  const handleIconClick = (action: string, label: string) => {
    gtag.event(action, {
      category: GAEventCategories.Widget,
      label,
    });
  };

  return (
    <div className={`${className} space-x-6`}>
      <a
        tabIndex={0}
        role='button'
        key='theme'
        className='text-center'
        onClick={() => handleIconClick('theme_switch', theme)}
      >
        <ThemeSwitch />
      </a>
      <a
        tabIndex={0}
        role='button'
        key='rss'
        className='text-center'
        onClick={() => handleIconClick('rss', 'rss')}
      >
        <RssIcon />
      </a>
      <ExternalLink
        tabIndex={0}
        key='github'
        className='text-center'
        onClick={() => handleIconClick('rss', 'action')}
        href='https://github.com/itsuki0927'
      >
        <GithubIcon />
      </ExternalLink>
    </div>
  );
};

const Navbar = () => (
  <header className='inset-x-0 z-10'>
    <nav className='container flex h-full items-center justify-between px-4'>
      <div className='relative flex flex-grow items-center justify-between md:justify-start'>
        <Logo />
        <ul className='ml-5'>
          {DEFAULT_NAV_LIST.map(item => (
            <NavbarItem key={item.path} href={item.path}>
              {item.name}
            </NavbarItem>
          ))}{' '}
          <MobileMenu />
        </ul>

        <IconNav className='hidden flex-grow items-center justify-end md:flex' />
      </div>
    </nav>
  </header>
);

export default Navbar;
