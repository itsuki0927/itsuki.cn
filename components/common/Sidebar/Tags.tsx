import { useRouter } from 'next/router';
import { SiteInfo } from '@/entities/siteInfo';
import { Widget } from '@/components/ui';

interface TagsProps {
  tags: SiteInfo['tags'];
}

const Tags = ({ tags }: TagsProps) => {
  const router = useRouter();
  return (
    <Widget className='space-x-2'>
      <Widget.Header>垃圾分类</Widget.Header>
      {tags?.map(item => (
        <button
          type='button'
          key={item.path}
          onClick={() => router.push(`/tag/${item.path}`)}
          className='mb-2 bg-white-1 py-1 px-3 text-xs uppercase tracking-widest hover:bg-white-2 dark:bg-white-1--dark dark:hover:bg-white-2--dark'
        >
          {item.name} ({item.count})
        </button>
      ))}
    </Widget>
  );
};

export default Tags;
