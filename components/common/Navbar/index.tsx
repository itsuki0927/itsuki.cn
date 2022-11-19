import classNames from 'classnames';
import Logo from '@/components/common/Logo';
import MobileMenu from '../Layout/MobileMenu';
import IconContent from './IconContent';
import NavbarItem from './NavbarItem';
import { DEFAULT_ROUTE_LIST } from '@/constants/value';

interface HeaderProps {
  theme?: 'white' | 'gray';
}
const Header = ({ theme = 'white' }: HeaderProps) => (
  <header
    className={classNames(
      'sticky inset-x-0 top-0 z-50 h-16 shadow-sm backdrop-blur-[20px] backdrop-saturate-150',
      theme === 'white' ? 'bg-white' : 'bg-gray-50 '
    )}
  >
    <nav className='container flex h-full items-center justify-between'>
      <div className='relative flex flex-grow items-center justify-between md:justify-start'>
        <Logo />
        <ul className='ml-5'>
          {DEFAULT_ROUTE_LIST.map(item => (
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
