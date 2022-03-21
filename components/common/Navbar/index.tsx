import { FC, useMemo } from 'react';
import { Logo, Search as NavbarSearch } from '@/components/common';
import { ActiveLink } from '@/components/ui';
import { Category } from '@/entities/category';
import { getCategoryUrl } from '@/utils/url';
import shank from '@/utils/shank';

interface NavbarProps {
  links?: Category[];
  search?: boolean;
}

const NavbarItem: FC<{ href: string }> = ({ href, children }) => (
  <ActiveLink activeClassName='after:border-t-sky-500 text-primary' href={href}>
    <li className='relative h-16 cursor-pointer px-3 text-center transition-colors after:absolute after:right-3 after:bottom-0 after:left-3 after:border-t-2 after:border-transparent after:content-[""] hover:text-primary'>
      <span className='leading-16'>{children}</span>
    </li>
  </ActiveLink>
);

const DEFAULT_NAV_LIST = [
  { path: '/', name: '首页' },
  { path: '/archive', name: '归档' },
  { path: '/about', name: '关于' },
];

const Navbar = ({ links, search = true }: NavbarProps) => {
  const categoriesDom = useMemo(() => {
    const addNavList =
      links?.map(item => ({ ...item, path: getCategoryUrl(item.path) })) || [];

    const finalNavList = shank(DEFAULT_NAV_LIST, 1, 0, ...addNavList);

    return finalNavList.map(item => (
      <NavbarItem key={item.path} href={item.path}>
        {item.name}
      </NavbarItem>
    ));
  }, [links]);

  return (
    <div className='fixed inset-x-0 top-0 z-10 h-16 bg-white shadow'>
      <div className='container flex justify-between space-x-4'>
        <Logo />
        {search ? <NavbarSearch /> : null}
        <ul className='flex h-16 items-center'>{categoriesDom}</ul>
      </div>
    </div>
  );
};

export default Navbar;
