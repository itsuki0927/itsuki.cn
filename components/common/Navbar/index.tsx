import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { Rss } from 'react-feather';
import MobileMenu from '../Layout/MobileMenu';
import CommandIcon from './CommandIcon';
import { Logo } from '@/components/common';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';

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

export const IconContent = ({ className = '' }: IconNavProps) => {
  const handleIconClick = (action: string, label: string) => {
    gtag.event(action, {
      category: GAEventCategories.Widget,
      label,
    });
  };

  return (
    <div className={`${className} space-x-6`}>
      {/* <a */}
      {/*   tabIndex={0} */}
      {/*   role='button' */}
      {/*   key='activity' */}
      {/*   className='text-center' */}
      {/*   onClick={() => handleIconClick('activity', 'activity')} */}
      {/* > */}
      {/*   <Activity size={20} /> */}
      {/* </a> */}
      <CommandIcon onClick={handleIconClick} />
      <a
        tabIndex={0}
        role='button'
        key='rss'
        className='rounded-md p-2 text-center transition-colors hover:bg-gray-100'
        href='/rss.xml'
        onClick={() => handleIconClick('rss', 'rss')}
      >
        <Rss size={18} />
      </a>
    </div>
  );
};

interface HeaderProps {
  theme?: 'white' | 'gray';
}
const Header = ({ theme = 'white' }: HeaderProps) => (
  <header
    className={classNames(
      'sticky inset-x-0 top-0 z-50 h-16 backdrop-blur-[20px] backdrop-saturate-150 ',
      theme === 'white' ? 'bg-white' : 'bg-gray-50 '
    )}
  >
    <nav className='container flex h-full items-center justify-between'>
      <div className='relative flex flex-grow items-center justify-between md:justify-start'>
        <Logo />
        <ul className='ml-5'>
          {DEFAULT_NAV_LIST.map(item => (
            <NavbarItem key={item.path} href={item.path}>
              {item.name}
            </NavbarItem>
          ))}
          <MobileMenu />
        </ul>

        <IconContent className='hidden flex-grow items-center justify-end md:flex' />
      </div>
    </nav>
  </header>
);

export default Header;
