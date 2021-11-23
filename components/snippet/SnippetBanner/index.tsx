import React from 'react';
import { Card } from '@/components/ui';
import { SnippetCategory } from '@/entities/snippetCategory';
import styles from './style.module.scss';

interface SnippetBannerProps {
  category: SnippetCategory;
  rootCategory: SnippetCategory;
}
const SnippetBanner = ({ category, rootCategory }: SnippetBannerProps) => {
  const prefix = rootCategory.name === category.name ? '' : rootCategory.name;
  return (
    <Card className={styles.snippetBanner} bodyStyle={{ padding: 0, display: 'flex' }}>
      <div className={styles.content}>
        <h3 className={styles.title}>{`${prefix} ${category.name} 片段`}</h3>
        <p>{category.description}</p>
      </div>
    </Card>
  );
};

export default SnippetBanner;
