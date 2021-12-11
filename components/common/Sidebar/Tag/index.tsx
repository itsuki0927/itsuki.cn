import { ArticleTag } from '@/components/article';
import { Card } from '@/components/ui';
import { SiteInfo } from '@/entities/siteInfo';
import styles from './style.module.scss';

const cardBodyStyle = {
  paddingBottom: 12,
};

interface SidebarTagProps {
  tags: SiteInfo['tags'];
}

const SidebarTag = ({ tags }: SidebarTagProps) => (
  <Card className={styles.tag} bodyStyle={cardBodyStyle}>
    {tags?.map(item => (
      <ArticleTag key={item.id} className={styles.btn} tag={item} />
    ))}
  </Card>
);

export default SidebarTag;
