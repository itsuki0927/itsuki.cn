import { PropsWithChildren, useMemo } from 'react';
import { Logo } from '@/components/common';
import { ActiveLink } from '@/components/ui';
import { Category } from '@/entities/category';
import { getCategoryUrl } from '@/utils/url';
import shank from '@/utils/shank';
import ThemeSwitch from '../ThemeSwitch';

interface NavbarProps {
  links?: Category[];
}

const NavbarItem = ({ href, children }: PropsWithChildren<{ href: string }>) => (
  <ActiveLink activeClassName='text-[#c9a16e] dark:text-[#cba574]' href={href}>
    <li className='relative cursor-pointer px-3 text-center tracking-widest text-dark-2 transition-colors duration-500 hover:text-[#c9a16e] dark:text-gray-2--dark hover:dark:text-[#cba574]'>
      <span className='leading-none'>{children}</span>
    </li>
  </ActiveLink>
);

const DEFAULT_NAV_LIST = [
  { path: '/', name: '首页' },
  { path: '/archive', name: '归档' },
  { path: '/about', name: '关于' },
];

const Navbar = ({ links }: NavbarProps) => {
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
      <li key='theme' className='px-3 pr-6'>
        <ThemeSwitch />
      </li>
    );
  }, [links]);

  return (
    <div className='inset-x-0 z-10 my-10 h-32'>
      <div className='container flex h-full justify-between'>
        <Logo />
        <ul className='flex h-full items-center space-x-4'>{categoriesDom}</ul>
      </div>
    </div>
  );
};

export default Navbar;
