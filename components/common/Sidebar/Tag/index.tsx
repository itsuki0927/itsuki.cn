import { ArticleTag } from '@/components/article';
import { SiteInfo } from '@/entities/siteInfo';
import styles from './style.module.scss';

interface SidebarTagProps {
  tags: SiteInfo['tags'];
}

const SidebarTag = ({ tags }: SidebarTagProps) => (
  <div className={styles.tag}>
    {tags?.map(item => (
      <ArticleTag key={item.id} className={styles.btn} tag={item} />
    ))}
  </div>
);

export default SidebarTag;
