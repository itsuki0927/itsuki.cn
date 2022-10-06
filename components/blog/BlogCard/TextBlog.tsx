import classNames from 'classnames';
import Link from 'next/link';
import { ToDate } from '@/components/common';
import { Blog } from '@/entities/blog';
import { getBlogDetailRoute } from '@/utils/url';
import styles from './index.module.scss';
import { BlogCardProps } from '.';

type TextBlogProps = BlogCardProps & {
  blog?: Blog;
  bgStyle?: 'gray' | 'ptn';
};

const TextBlog = ({ blog, bgStyle, style, className }: TextBlogProps) => {
  if (!blog) return <div>null</div>;

  return (
    <article
      className={classNames(
        'flex w-full flex-col justify-center self-stretch p-6 sm:max-w-sm',
        className,
        bgStyle === 'gray' ? 'bg-gray-50' : styles.ptn
      )}
      style={style}
    >
      <div className='mb-3'>
        {blog?.tags.map(tag => (
          <span>{tag.name}</span>
        ))}
      </div>
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
    </article>
  );
};

export default TextBlog;
