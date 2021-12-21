import Link from 'next/link';
import { ArticleTag } from '@/components/article';
import { CommentProfileType } from '@/components/comment/CommentForm';
import { SnippetExpertise } from '@/components/snippet';
import { Card } from '@/components/ui';
import { initialCommentProfile, USER_COMMENT_PROFILE } from '@/constants/comment';
import { SiteInfo } from '@/entities/siteInfo';
import { useLocalStorage } from '@/hooks';
import { zhDayName } from '@/utils/date';
import { getArticleDetailUrl } from '@/utils/url';
import styles from './style.module.scss';

interface SidebarProps {
  tags: SiteInfo['tags'];
  hotArticles: SiteInfo['hotArticles'];
}

const Sidebar = ({ tags = [], hotArticles = [] }: SidebarProps) => {
  const [commentProfile] = useLocalStorage<CommentProfileType>(
    USER_COMMENT_PROFILE,
    initialCommentProfile
  );

  return (
    <aside className={styles.sidebar}>
      <Card className={styles.hello}>
        今天
        {zhDayName(new Date())},{' '}
        <span className={styles.nickname}>
          <strong>{commentProfile.nickname || '旅客'}</strong>
        </span>
      </Card>

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
};

export default Sidebar;
