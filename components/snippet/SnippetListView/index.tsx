import router from 'next/router';
import { NextSeo } from 'next-seo';
import React from 'react';
import { SnippetList } from '@/components/snippet';
import { Button } from '@/components/ui';
import { Category } from '@/entities/category';
import { SearchResponse } from '@/types/response';
import { Snippet } from '@/entities/snippet';
import SnippetBanner, { SnippetBannerTitle } from '../SnippetBanner';
import styles from './style.module.scss';

interface SnippetListViewProps {
  snippets: SearchResponse<Snippet>;
  category: Category;
  rootCategory: Category;
  paths: {
    path: string;
    name?: string | undefined;
  }[];
}

const SnippetListPage = ({
  snippets,
  category,
  rootCategory,
  paths,
}: SnippetListViewProps) => {
  const name = `${category.name === rootCategory.name ? '' : rootCategory.name} ${
    category.name
  } 片段`;

  return (
    <>
      <NextSeo title={name} description={category.description} />
      <SnippetBanner {...category} expand={rootCategory.expand}>
        <SnippetBannerTitle name={name} />
      </SnippetBanner>

      <div className={styles.category}>
        {paths.map(item => (
          <Button
            key={item.path}
            type={item.name === category.name ? 'ghost' : 'text'}
            className={styles.button}
            onClick={() => router.push(item.path)}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <SnippetList snippets={snippets} />
    </>
  );
};

export default SnippetListPage;
