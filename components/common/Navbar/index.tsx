import { PropsWithChildren, useMemo } from 'react';
import { Logo } from '@/components/common';
import { Category } from '@/entities/category';
import { ActiveLink } from '@/components/ui';
import { RssIcon } from '@/components/icons';
import { getCategoryUrl } from '@/utils/url';
import shank from '@/utils/shank';
import ThemeSwitch, { ThemeSwitchProps } from '../ThemeSwitch';

type NavbarProps = Omit<ThemeSwitchProps, 'onChange'> & {
  links?: Category[];
  onThemeChange: ThemeSwitchProps['onChange'];
};

const NavbarItem = ({ href, children }: PropsWithChildren<{ href: string }>) => (
  <ActiveLink activeClassName='text-[#c9a16e] dark:text-[#cba574]' href={href}>
    <div className='relative cursor-pointer px-5 text-center tracking-widest text-dark-2 transition-colors duration-500 hover:text-[#c9a16e] dark:text-gray-2--dark hover:dark:text-[#cba574]'>
      <span className='leading-none'>{children}</span>
    </div>
  </ActiveLink>
);

const DEFAULT_NAV_LIST = [
  { path: '/', name: '首页' },
  { path: '/archive', name: '归档' },
  { path: '/about', name: '关于' },
];

const Navbar = ({ links, ...themeProps }: NavbarProps) => {
  const categoriesDom = useMemo(() => {
    const addNavList =
      links?.map(item => ({ ...item, path: getCategoryUrl(item.path) })) || [];

    // 将查询到的分类添加到首页的后面
    const navDom = shank(DEFAULT_NAV_LIST, 1, 0, ...addNavList).map(item => (
      <NavbarItem key={item.path} href={item.path}>
        {item.name}
      </NavbarItem>
    ));

    // 添加主题按钮
    return navDom.concat(
      <div key='theme' className='px-5 text-center'>
        <ThemeSwitch theme={themeProps.theme} onChange={themeProps.onThemeChange} />
      </div>,
      <div key='rss' className='px-5 text-center'>
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
