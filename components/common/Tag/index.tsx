import Link from 'next/link';
import { Tag as ArticleTag } from '@/entities/tag';
import { getTagRoute } from '@/utils/url';

interface TagProps {
  tag: ArticleTag;
}

const Tag = ({ tag }: TagProps) => (
  <Link href={getTagRoute(tag.path)}>
    <span
      tabIndex={-1}
      role='button'
      key={tag.id}
      className='capsize cursor-pointer rounded-sm bg-[#faebd7] px-2 py-1 text-xs transition-colors hover:bg-[#ffd090] dark:bg-[#452b09] dark:hover:bg-[#764400]'
    >
      #{tag.name}
    </span>
  </Link>
);

export default Tag;
