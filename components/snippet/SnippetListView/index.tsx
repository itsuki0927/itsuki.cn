import router from 'next/router';
import React from 'react';
import { SnippetList } from '@/components/snippet';
import { Button } from '@/components/ui';
import { Category } from '@/entities/category';
import { SearchResponse } from '@/entities/response/base';
import { Snippet } from '@/entities/snippet';
import SnippetBanner from '../SnippetBanner';

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
}: SnippetListViewProps) => (
  <div>
    <SnippetBanner category={category} rootCategory={rootCategory} />

    <div style={{ margin: '24px 0' }}>
      {paths.map(item => (
        <Button
          key={item.path}
          type={item.name === category.name ? 'primary' : 'text'}
          onClick={() => router.push(item.path)}
        >
          {item.name}
        </Button>
      ))}
    </div>

    <SnippetList snippets={snippets} />
  </div>
);

export default SnippetListPage;
