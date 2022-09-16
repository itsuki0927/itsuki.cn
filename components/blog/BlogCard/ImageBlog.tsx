import classNames from 'classnames';
import Link from 'next/link';
import { MyImage, ToDate } from '@/components/common';
import { getBlogDetailRoute } from '@/utils/url';
import styles from './index.module.scss';
import { BlogCardProps } from '.';

const ImageBlog = ({ blog, className, style }: BlogCardProps) => {
  if (!blog) return <div>null</div>;

  return (
    <article
      className={classNames(
        'relative aspect-video w-full justify-center justify-self-center p-6 transition-all sm:max-w-sm',
        styles.imageBlog,
        className
      )}
      style={style}
    >
      <MyImage
        layout='fill'
        objectFit='cover'
        src={blog?.cover ?? ''}
        alt={blog.title}
        className='absolute top-0 left-0 right-0 bottom-0'
      />

      <Link href={getBlogDetailRoute(blog.path)}>
        <h3 className='absolute top-0 left-0 right-0 mt-0 cursor-pointer p-4 text-2xl font-semibold text-white transition-colors hover:text-primary'>
          {blog.title}
        </h3>
      </Link>

      <div className='absolute right-6 bottom-6 bg-gray-800 px-2 text-sm text-gray-300'>
        <ToDate date={blog.createAt} />
        <span className='mx-2'>/</span>
        {blog.author}
      </div>
    </article>
  );
};

export default ImageBlog;
