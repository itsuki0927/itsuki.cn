import router from 'next/router';
import React from 'react';
import { Card, Input } from '@/components/ui';
import { SearchResponse } from '@/entities/response/base';
import { Snippet } from '@/entities/snippet';
import { SnippetCategory } from '@/entities/snippetCategory';
import SnippetCard from '../SnippetCard';
import SnippetCategoryCard from '../SnippetCategoryCard';
import styles from './style.module.scss';

const SnippetCategoryList = ({
  snippetCategories,
}: Pick<SnippetViewProps, 'snippetCategories'>) => (
  <div className={styles.snippetCategory}>
    {snippetCategories.data.map(category => (
      <SnippetCategoryCard
        key={category.id}
        category={category}
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
    <SnippetCategoryList snippetCategories={snippetCategories} />

    <Card style={{ marginBottom: 24 }} bodyStyle={{ padding: '12px 24px' }}>
      <Input
        size='lg'
        placeholder='Search Code'
        onPressEnter={e => {
          router.push(`/snippet/search?keyword=${e.currentTarget.value}`);
        }}
      />
    </Card>

    {snippets.data.map(snippet => (
      <SnippetCard snippet={snippet} key={snippet.id} />
    ))}
  </div>
);

export default SnippetView;
