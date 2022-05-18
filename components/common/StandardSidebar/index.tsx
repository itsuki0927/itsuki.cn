import { SiteInfo } from '@/entities/siteInfo';
import { Widget } from '@/components/ui';
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

    <Widget>
      <Widget.Header>设置</Widget.Header>

      <p>侧边栏</p>
    </Widget>
  </aside>
);

export default StandardSidebar;
