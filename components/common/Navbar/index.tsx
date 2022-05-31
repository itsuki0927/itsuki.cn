import { PropsWithChildren, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Logo } from '@/components/common';
import { Category } from '@/entities/category';
import { RssIcon } from '@/components/icons';
import { getCategoryRoute } from '@/utils/url';
import { shank } from '@/utils/array';
import ThemeSwitch, { ThemeSwitchProps } from '../ThemeSwitch';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

type NavbarProps = Omit<ThemeSwitchProps, 'onChange'> & {
  links?: Category[];
  onThemeChange: ThemeSwitchProps['onChange'];
};

const NavbarItem = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const { asPath } = useRouter();
  const isActive = href === asPath;

  return (
    <div
      className={classNames(
        'capsize relative cursor-pointer px-5 text-center tracking-widest transition-colors duration-500 hover:text-primary-hover',
        isActive ? 'text-primary' : 'text-dark-2'
      )}
    >
      <Link href={href}>{children}</Link>
    </div>
  );
};

const DEFAULT_NAV_LIST = [
  { path: '/', name: '首页' },
  { path: '/archive', name: '归档' },
  { path: '/about', name: '关于' },
];

const Navbar = ({ links, ...themeProps }: NavbarProps) => {
  const categoriesDom = useMemo(() => {
    const addNavList =
      links?.map(item => ({ ...item, path: getCategoryRoute(item.path) })) || [];

    // 将查询到的分类添加到首页的后面
    const navDom = shank(DEFAULT_NAV_LIST, 1, 0, ...addNavList).map(item => (
      <NavbarItem key={item.path} href={item.path}>
        {item.name}
      </NavbarItem>
    ));

    // 添加主题按钮
    return navDom.concat(
      <div
        tabIndex={0}
        role='button'
        key='theme'
        className='px-5 text-center'
        onClick={() => {
          gtag.event('theme_switch', {
            category: GAEventCategories.Widget,
            label: themeProps.theme,
          });
        }}
      >
        <ThemeSwitch theme={themeProps.theme} onChange={themeProps.onThemeChange} />
      </div>,
      <div
        tabIndex={0}
        role='button'
        key='rss'
        className='px-5 text-center'
        onClick={() => {
          gtag.event('rss', {
            category: GAEventCategories.Widget,
            label: themeProps.theme,
          });
        }}
      >
        <RssIcon />
      </div>
    );
  }, [links, themeProps]);

  return (
    <header className='fixed inset-x-0 z-10 h-20 bg-[#ffffff80] backdrop-blur-[2px] backdrop-saturate-150 dark:bg-[#0d0d1050]'>
      <div className='container flex h-full items-center justify-between'>
        <Logo />
        <nav className='flex h-full items-center'>{categoriesDom}</nav>
      </div>
    </header>
  );
};

export default Navbar;
