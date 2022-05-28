import { useRouter } from 'next/router';
import { SiteInfo } from '@/entities/siteInfo';
import { Widget } from '@/components/ui';

interface TagsProps {
  tags: SiteInfo['tags'];
}

const Tags = ({ tags }: TagsProps) => {
  const router = useRouter();
  return (
    <Widget>
      <Widget.Header>垃圾分类</Widget.Header>
      {tags?.map(item => (
        <button
          type='button'
          key={item.path}
          onClick={() => router.push(`/tag/${item.path}`)}
          className='capsize mb-3 mr-3 rounded-sm bg-white-1 py-[6px] px-4 text-sm hover:bg-white-2'
        >
          {item.name} ({item.count})
        </button>
      ))}
    </Widget>
  );
};

export default Tags;
