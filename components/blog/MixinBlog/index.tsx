import Link from 'next/link';
import { MyImage, ToDate } from '@/components/common';
import { Article } from '@/entities/article';
import { getBlogDetailRoute } from '@/utils/url';

interface MixinBlogProps {
  blog?: Article;
}

const MixinBlog = ({ blog }: MixinBlogProps) => {
  if (!blog) {
    return <div>null</div>;
  }

  return (
    <article className='w-full bg-gray-50 sm:w-1/3 sm:max-w-sm'>
      <MyImage width={392} height={220} src={blog?.cover ?? ''} alt={blog.title} />
      <div className='px-6 py-8'>
        <Link href={getBlogDetailRoute(blog.path)}>
          <h3 className='mt-0 cursor-pointer text-2xl font-semibold text-gray-900 transition-colors hover:text-primary'>
            {blog.title}
          </h3>
        </Link>
        <p className='max-h-13 mb-6 text-gray-600 line-clamp-2'>{blog.description}</p>
        <div className='text-gray-400'>
          <ToDate date={blog.createAt} />
          <span className='mx-2'>/</span>
          {blog.author}
        </div>
      </div>
    </article>
  );
};

export default MixinBlog;
