import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { Icon } from '@/components/icons';
import { Card } from '@/components/ui';
import { SnippetCategory } from '@/entities/snippetCategory';
import { getExpandsValue } from '@/transformers/expands';
import styles from './style.module.scss';
import { getSnippetRootCategoryUrl } from '@/transformers/url';

interface SnippetCategoryCardProps {
  category: SnippetCategory;
  className?: string;
}

type SnippetCategoryExpands = {
  icon: string;
  color: string;
  background: string;
};

const SnippetCategoryCard = ({ category, className }: SnippetCategoryCardProps) => {
  const expandValues = getExpandsValue<SnippetCategoryExpands>(category.expand!);

  return (
    <Card
      key={category.id}
      className={classNames(styles.snippetCategory, className)}
      bodyStyle={{ padding: 0, display: 'flex', alignItems: 'center' }}
    >
      <Icon
        className={styles.icon}
        name={expandValues.icon}
        style={{
          color: expandValues.color,
          background: expandValues.background,
        }}
      />
      <Link href={getSnippetRootCategoryUrl(category.path)}>
        <h2 className={styles.name}>{category.name}</h2>
      </Link>
    </Card>
  );
};
export default SnippetCategoryCard;
