import { Tag as ArticleTag } from '@/entities/tag';

interface TagProps {
  tag: ArticleTag;
}

const Tag = ({ tag }: TagProps) => (
  <small
    key={tag.id}
    className='h-max cursor-pointer rounded-sm bg-[#faebd7] px-2 py-[2px] text-xs font-light uppercase transition-colors hover:bg-[#ffd090]'
  >
    # {tag.name}
  </small>
);

export default Tag;
