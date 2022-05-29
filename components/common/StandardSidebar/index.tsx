import { useRouter } from 'next/router';
import { SiteInfo } from '@/entities/siteInfo';
import Search from './Search';
import ChickenSoup from './ChickenSoup';
import HotArticles from './HotArticles';
import Life from './Life';
import Tags from './Tags';
import ArticleNav from './ArticleNav';
import { isArticleRoute } from '@/utils/url';

interface SidebarProps {
  className?: string;
  tags: SiteInfo['tags'];
  hotArticles: SiteInfo['hotArticles'];
  // eslint-disable-next-line react/no-unused-prop-types
  onToggle: () => void;
}

const StandardSidebar = ({ tags = [], hotArticles = [], className }: SidebarProps) => {
  const router = useRouter();
  const displayArticleNav = isArticleRoute(router.asPath);

  return (
    <aside className={className}>
      <Life />

      <Search />

      <ChickenSoup />

      <HotArticles hotArticles={hotArticles} />

      <Tags tags={tags} />

      {displayArticleNav && <ArticleNav />}
    </aside>
  );
};
export default StandardSidebar;
