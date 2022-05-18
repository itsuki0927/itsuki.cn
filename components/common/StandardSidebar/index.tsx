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
  // eslint-disable-next-line react/no-unused-prop-types
  onToggle: () => void;
}

const StandardSidebar = ({ tags = [], hotArticles = [], className }: SidebarProps) => (
  <aside className={className}>
    <Life />

    <Search />

    <ChickenSoup />

    <HotArticles hotArticles={hotArticles} />

    <Tags tags={tags} />
  </aside>
);

export default StandardSidebar;
