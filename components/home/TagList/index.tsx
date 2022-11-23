import { getAllTags } from '@/api/tag';
import TagLabel from './TagLabel';

const TagList = async () => {
  const tags = await getAllTags();
  return (
    <div className='space-y-4 bg-gray-50 p-6'>
      <div className='text-xl font-medium text-gray-900'>标签</div>
      <ul className='flex flex-wrap'>
        {tags?.map(tag => (
          <TagLabel tag={tag} />
        ))}
      </ul>
    </div>
  );
};

export default TagList;
