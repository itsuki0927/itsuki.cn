import { isAdminSession } from '@/actions/session';
import ActivityExternalLink from '@/components/common/ActivityExternalLink';
import RssExternalLink from '@/components/common/RssExternalLink';
import { ROUTE_LIST } from '@/constants/route';
import Logo from '../Logo';
import NavItem from './NavItem';

const Navbar = async () => {
  const isAdmin = await isAdminSession();
  return (
    <header className="inset-x-0 h-16">
      <nav className="container flex h-full items-center justify-between">
        <Logo />
        <div className="ml-6 flex flex-1 items-center justify-end sm:justify-between">
          <ul className="flex flex-row items-center flex-1 justify-end sm:justify-start gap-2 sm:gap-4">
            {ROUTE_LIST.map((route) => (
              <NavItem key={route.path} route={route}></NavItem>
            ))}
            {isAdmin ? (
              <NavItem key="/admin" route={{ path: '/admin', name: '管理' }} />
            ) : null}
          </ul>
          <div className="flex gap-2 sm:gap-4">
            <RssExternalLink key="rss" />
            <ActivityExternalLink key="activity" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
