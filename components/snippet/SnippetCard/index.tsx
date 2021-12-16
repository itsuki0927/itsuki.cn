import Link from 'next/link';
import React from 'react';
import { Icon } from '@/components/icons';
import { Card } from '@/components/ui';
import { Snippet } from '@/entities/snippet';
import getExpandsValue from '@/utils/expands';
import { getSnippetDetailUrl } from '@/utils/url';
import SnippetExpertise from '../SnippetExpertise';
import styles from './style.module.scss';

export enum RanksState {
  Easy = 0, // 简单
  Medium = 1, // 中等
  Hard = 2, // 困难
}

interface SnippetCardProps {
  snippet: Snippet;
}

const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const rootCategory = snippet.categories.find(v => v.parentId === 0)!;
  const expandValues = getExpandsValue(rootCategory.expand);

  return (
    <Card className={styles.snippet}>
      <div className={styles.header}>
        <span className={styles.category}>
          <Icon
            className={styles.icon}
            name={expandValues.icon}
            style={{
              color: expandValues.color,
              background: expandValues.background,
            }}
          />
          <SnippetExpertise ranks={snippet.ranks} className={styles.rank} />
        </span>
        <div className={styles.data}>
          <Link href={getSnippetDetailUrl(rootCategory.path, snippet.id)}>
            <h3 className={styles.name}>{snippet.name}</h3>
          </Link>
          <span className={styles.tag}>
            {snippet.categories.map(category => category.name).join(', ')}
          </span>
        </div>
      </div>
      <p className={styles.description}>{snippet.description}</p>
    </Card>
  );
};

export default SnippetCard;
