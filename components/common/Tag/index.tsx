import { useRouter } from 'next/router';
import { Tag as ArticleTag } from '@/entities/tag';

interface TagProps {
  tag: ArticleTag;
}

const Tag = ({ tag }: TagProps) => {
  const router = useRouter();
  return (
    <small
      tabIndex={-1}
      role='button'
      key={tag.id}
      className='h-max cursor-pointer rounded-sm bg-[#faebd7] px-2 py-[2px] text-xs font-light uppercase transition-colors hover:bg-[#ffd090]'
      onClick={() => router.push(`/tag/${tag.path}`)}
    >
      # {tag.name}
    </small>
  );
};

export default Tag;
