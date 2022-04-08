import { FC, useMemo } from 'react';
import { Logo } from '@/components/common';
import { ActiveLink } from '@/components/ui';
import { Category } from '@/entities/category';
import { getCategoryUrl } from '@/utils/url';
import shank from '@/utils/shank';

interface NavbarProps {
  links?: Category[];
}

const NavbarItem: FC<{ href: string }> = ({ href, children }) => (
  <ActiveLink activeClassName='text-[#c9a16e]' href={href}>
    <li className='relative cursor-pointer px-3 text-center  tracking-widest text-dark-2 transition-colors duration-500 hover:text-[#c9a16e]'>
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

    const finalNavList = shank(DEFAULT_NAV_LIST, 1, 0, ...addNavList);

    return finalNavList.map(item => (
      <NavbarItem key={item.path} href={item.path}>
        {item.name}
      </NavbarItem>
    ));
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
