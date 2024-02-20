import ActivityExternalLink from '@/components/common/ActivityExternalLink';
import RssExternalLink from '@/components/common/RssExternalLink';
import Logo from '../Logo';
import NavItem from './NavItem';
import { getAllCategories } from '@/actions/category';

const Navbar = async () => {
  const data = await getAllCategories();
  return (
    <header className="inset-x-0 h-16">
      <nav className="container flex h-full items-center justify-between">
        <Logo />
        <div className="ml-6 flex flex-1 items-center justify-end sm:justify-between">
          <ul className="flex flex-row items-center flex-1 justify-end sm:justify-start gap-2 sm:gap-4">
            {data?.map((item) => (
              <NavItem
                key={item.slug}
                slug={`/category/${item.slug}`}
                title={item.title}
              />
            ))}
            <NavItem key="/guestbook" slug="/guestbook" title="留言" />
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
