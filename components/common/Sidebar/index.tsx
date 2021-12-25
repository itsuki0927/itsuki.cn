import Link from 'next/link';
import { ArticleTag } from '@/components/article';
import { SnippetExpertise } from '@/components/snippet';
import { Card } from '@/components/ui';
import { SiteInfo } from '@/entities/siteInfo';
import { getArticleDetailUrl } from '@/utils/url';
import styles from './style.module.scss';

interface SidebarProps {
  tags: SiteInfo['tags'];
  hotArticles: SiteInfo['hotArticles'];
}

const Sidebar = ({ tags = [], hotArticles = [] }: SidebarProps) => (
  <aside className={styles.sidebar}>
    <Card>
      <div className={styles.snippet}>
        <Link href='https://itsuki.cn/snippet/js/s/35'>
          <span className={styles.name}>unzipWith</span>
        </Link>
        <SnippetExpertise ranks={2} />
      </div>
    </Card>

    <Card style={{ marginBottom: 24, marginTop: 24 }} className={styles.leaderboard}>
      <p>
        <strong>热门文章</strong>
      </p>
      {hotArticles.map(article => (
        <div className={styles.leaderboardItem} key={article.id}>
          <Link href={getArticleDetailUrl(article.id)}>
            <span className={styles.title}>{article.title}</span>
          </Link>
        </div>
      ))}
    </Card>

    <div className={styles.tag}>
      {tags?.map(item => (
        <ArticleTag key={item.id} className={styles.btn} tag={item} />
      ))}
    </div>
  </aside>
);

export default Sidebar;
