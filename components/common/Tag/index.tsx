import Link from 'next/link';
import { Tag as ArticleTag } from '@/entities/tag';
import { getTagUrl } from '@/utils/url';

interface TagProps {
  tag: ArticleTag;
}

const Tag = ({ tag }: TagProps) => (
  <small
    tabIndex={-1}
    role='button'
    key={tag.id}
    className='h-max cursor-pointer rounded-sm bg-[#faebd7] px-2 py-[2px] text-xs font-light uppercase transition-colors hover:bg-[#ffd090]  '
  >
    <Link href={getTagUrl(tag.path)}>
      <># {tag.name}</>
    </Link>
  </small>
);

export default Tag;
