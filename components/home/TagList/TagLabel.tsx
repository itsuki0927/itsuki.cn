'use client';

import Link from 'next/link';
import { GAEventCategories } from '@/constants/gtag';
import { gtag } from '@/utils/gtag';
import { getTagRoute } from '@/utils/url';
import { Tag } from '@/entities/tag';

interface TagProps {
  tag: Tag;
}

const TagLabel = ({ tag }: TagProps) => {
  return (
    <span
      tabIndex={0}
      role='button'
      key={tag.path}
      className='mr-4 mb-4 rounded-sm bg-gray-100 py-1 px-4 align-bottom hover:bg-gray-200 sm:py-[6px] sm:px-6'
      onClick={() => {
        gtag.event('tag', {
          category: GAEventCategories.Tag,
          label: tag.name,
        });
      }}
    >
      <Link key={tag.path} href={getTagRoute(tag.path)}>
        {tag.name}
      </Link>
    </span>
  );
};

export default TagLabel;
