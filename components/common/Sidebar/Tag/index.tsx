import { ArticleTag } from '@/components/article';
import { Card } from '@/components/ui';
import { SiteInfo } from '@/entities/siteInfo';
import styles from './style.module.scss';

const cardBodyStyle = {
  paddingBottom: 12,
};

const buttonProps = {
  className: styles.btn,
};

interface SidebarTagProps {
  tags: SiteInfo['tags'];
}

const SidebarTag = ({ tags }: SidebarTagProps) => (
  <Card title='Tag' className={styles.tag} bodyStyle={cardBodyStyle}>
    {tags?.map(item => (
      <ArticleTag key={item.id} buttonProps={buttonProps} tag={item} />
    ))}
  </Card>
);

export default SidebarTag;
