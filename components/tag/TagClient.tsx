'use client';

import { NextSeo } from 'next-seo';
import { GAEventCategories } from '@/constants/gtag';
import { Tag } from '@/entities/tag';
import useMount from '@/hooks/useMount';
import { gtag } from '@/utils/gtag';

export interface TagClientProps {
  tag?: Tag;
}

const TagClient = ({ tag }: TagClientProps) => {
  useMount(() => {
    gtag.event('tag_view', {
      category: GAEventCategories.Tag,
      label: tag?.name,
    });
  });

  return (
    <>
      <NextSeo title={tag?.name} />
    </>
  );
};

export default TagClient;
