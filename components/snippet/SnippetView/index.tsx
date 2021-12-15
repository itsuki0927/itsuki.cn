import router from 'next/router';
import React from 'react';
import { Card, Input } from '@/components/ui';
import { SearchResponse } from '@/entities/response/base';
import { Snippet } from '@/entities/snippet';
import { SnippetCategory } from '@/entities/snippetCategory';
import { getSnippetRootCategoryUrl } from '@/transformers/url';
import SnippetBanner from '../SnippetBanner';
import SnippetCard from '../SnippetCard';
import styles from './style.module.scss';

const SnippetCategoryList = ({
  snippetCategories,
}: Pick<SnippetViewProps, 'snippetCategories'>) => (
  <div className={styles.snippetCategory}>
    {snippetCategories.data.map(category => (
      <SnippetBanner
        key={category.id}
        name={category.name}
        description={category.description}
        path={getSnippetRootCategoryUrl(category.path)}
        expand={category.expand}
        className={styles.category}
      />
    ))}
  </div>
);

interface SnippetViewProps {
  snippets: SearchResponse<Snippet>;
  snippetCategories: SearchResponse<SnippetCategory>;
}

const SnippetView = ({ snippets, snippetCategories }: SnippetViewProps) => (
  <div className='container'>
    <Card className={styles.search}>
      <Input
        size='lg'
        placeholder='Search Code'
        onPressEnter={e => {
          router.push(`/snippet/search?keyword=${e.currentTarget.value}`);
        }}
      />
    </Card>

    <SnippetCategoryList snippetCategories={snippetCategories} />

    {snippets.data.map(snippet => (
      <SnippetCard snippet={snippet} key={snippet.id} />
    ))}
  </div>
);

export default SnippetView;
