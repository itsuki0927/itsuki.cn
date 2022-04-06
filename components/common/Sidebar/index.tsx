import { SiteInfo } from '@/entities/siteInfo';
import Search from './Search';
import ChickenSoup from './ChickenSoup';
import HotArticles from './HotArticles';
import Life from './Life';
import Tags from './Tags';

interface SidebarProps {
  className?: string;
  tags: SiteInfo['tags'];
  hotArticles: SiteInfo['hotArticles'];
}

const Sidebar = ({ tags = [], hotArticles = [], className }: SidebarProps) => (
  <aside className={className}>
    <Life />

    <Search />

    <ChickenSoup />

    <HotArticles hotArticles={hotArticles} />

    <Tags tags={tags} />
  </aside>
);

export default Sidebar;
