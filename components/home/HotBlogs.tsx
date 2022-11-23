import Link from 'next/link';
import { getHotBlogs } from '@/api/blog';
import { getBlogDetailRoute } from '@/utils/url';
import PtnContainer from '../ui/PtnContainer';

const HotBlogs = async () => {
  const hotBlogs = await getHotBlogs();
  return (
    <PtnContainer as='ul' className='flex flex-col space-y-2 p-6'>
      <div className='text-xl font-medium text-gray-900'>热门</div>
      {hotBlogs?.data.slice(0, 6).map(blog => (
        <Link href={getBlogDetailRoute(blog.path)}>
          <li
            key={blog.id}
            className='cursor-pointer list-inside list-square transition-colors hover:text-primary'
          >
            {blog.title}
          </li>
        </Link>
      ))}
    </PtnContainer>
  );
};

export default HotBlogs;
