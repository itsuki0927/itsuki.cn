import { PropsWithChildren, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Logo } from '@/components/common';
import { GithubOutlined, RssIcon } from '@/components/icons';
import ThemeSwitch from '../ThemeSwitch';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';
import MobileMenu from '../Layout/MobileMenu';
import { useTheme } from '@/hooks';

const NavbarItem = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const { asPath } = useRouter();
  const isActive = href === asPath;

  return (
    <div
      className={classNames(
        'capsize relative hidden cursor-pointer px-5 text-center tracking-widest transition-colors duration-500 hover:text-primary-hover md:inline-block',
        isActive ? 'text-primary' : 'text-dark-2'
      )}
    >
      <Link href={href}>{children}</Link>
    </div>
  );
};

const DEFAULT_NAV_LIST = [
  { path: '/blog', name: '文章' },
  { path: '/guestbook', name: '留言' },
  { path: '/archive', name: '归档' },
  { path: '/about', name: '关于' },
];

const Navbar = () => {
  const [theme, setTheme] = useTheme();
  const categoriesDom = useMemo(() => {
    // 将查询到的分类添加到首页的后面
    const navDom = DEFAULT_NAV_LIST.map(item => (
      <NavbarItem key={item.path} href={item.path}>
        {item.name}
      </NavbarItem>
    ));

    // 添加主题按钮
    return navDom;
  }, []);

  return (
    <header className='inset-x-0 z-10'>
      <nav className='container flex h-full items-center justify-between px-4'>
        <div className='relative flex flex-grow items-center justify-between md:justify-start'>
          <Logo />
          <div className='ml-5'>
            {categoriesDom}
            <MobileMenu />
          </div>
        </div>

        <div>
          <div
            tabIndex={0}
            role='button'
            key='theme'
            className='hidden px-5 text-center md:inline-block'
            onClick={() => {
              gtag.event('theme_switch', {
                category: GAEventCategories.Widget,
                label: theme,
              });
            }}
          >
            <ThemeSwitch theme={theme} onChange={setTheme} />
          </div>
          <div
            tabIndex={0}
            role='button'
            key='rss'
            className='hidden px-5 text-center md:inline-block'
            onClick={() => {
              gtag.event('rss', {
                category: GAEventCategories.Widget,
                label: 'rss',
              });
            }}
          >
            <RssIcon />
          </div>

          <div
            tabIndex={0}
            role='button'
            key='github'
            className='hidden px-5 text-center md:inline-block'
            onClick={() => {
              gtag.event('github', {
                category: GAEventCategories.Widget,
                label: 'github',
              });
            }}
          >
            <GithubOutlined className='text-xl' />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
