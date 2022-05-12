import { useRouter } from 'next/router';
import { SiteInfo } from '@/entities/siteInfo';
import { Button, Widget } from '@/components/ui';

interface TagsProps {
  tags: SiteInfo['tags'];
}

const Tags = ({ tags }: TagsProps) => {
  const router = useRouter();
  return (
    <Widget className='space-x-2'>
      <Widget.Header>垃圾分类</Widget.Header>
      {tags?.map(item => (
        <Button
          type='ghost'
          key={item.path}
          onClick={() => router.push(`/tag/${item.path}`)}
          className='mb-2 py-1 px-3 uppercase tracking-widest'
        >
          {item.name} ({item.count})
        </Button>
      ))}
    </Widget>
  );
};

export default Tags;
