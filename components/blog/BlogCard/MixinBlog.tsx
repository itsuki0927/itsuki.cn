import classNames from 'classnames';
import Link from 'next/link';
import { MyImage, ToDate } from '@/components/common';
import { getBlogDetailRoute } from '@/utils/url';
import { BlogCardProps } from '.';

const MixinBlog = ({ blog, className, style }: BlogCardProps) => {
  if (!blog) {
    return <div>null</div>;
  }

  return (
    <article
      className={classNames(
        'group w-full self-stretch bg-gray-50 sm:max-w-sm',
        className
      )}
      style={style}
    >
      <figure className='overflow-hidden'>
        <MyImage
          width={392}
          height={220}
          src={blog?.cover ?? ''}
          alt={blog.title}
          className='object-cover transition-transform group-hover:scale-110 sm:max-h-[220px] sm:min-h-[220px]'
        />
      </figure>
      <div className='px-6 py-8'>
        <h3 className='mt-0 mb-2 cursor-pointer text-2xl font-semibold  transition-colors hover:text-primary'>
          <Link legacyBehavior href={getBlogDetailRoute(blog.path)}>
            {blog.title}
          </Link>
        </h3>
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
