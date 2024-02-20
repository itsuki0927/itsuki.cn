import MyImage from '@/components/common/MyImage';
import SmallTag from '@/components/common/SmallTag';
import { Blog } from '@/types/blog';
import { formatDate } from '@/utils/formatDate';
import getReadMinutes from '@/utils/getReadMinutes';
import prettifyNumber from '@/utils/prettifyNumber';
import { Clock, FolderOpen, Hourglass, MousePointerClick } from 'lucide-react';
import Link from 'next/link';

export interface BlogCardProps {
  blog: Blog;
  displayCategory?: boolean;
}

export const BlogCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg w-full aspect-w-16 aspect-h-9"></div>
  );
};

const BlogCard = ({ blog, displayCategory = true }: BlogCardProps) => {
  const href = `/blog/${blog.slug}` as const;
  return (
    <div className="group relative overflow-hidden z-0 rounded-xl">
      <Link
        className="block w-full h-0 pt-[75%] sm:pt-[55%]  rounded-xl overflow-hidden z-0"
        href={href}
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <MyImage
            alt={`${blog.title} cover`}
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            fill
            src={blog.cover}
          />
        </div>
        <div className="absolute top-4 left-4" />
      </Link>
      <Link
        className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-black/50"
        href={href}
      />
      <div className="absolute z-10 inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col items-start">
        <Link className="absolute inset-0" href={href} />
        {displayCategory && (
          <SmallTag
            href={`/category/${blog.category.slug}`}
            className="flex items-center space-x-1 "
          >
            <FolderOpen size={12} />
            <span>{blog.category.title}</span>
          </SmallTag>
        )}

        <div className="flex flex-wrap space-x-3 items-center mt-1">
          <span className="text-xs text-zinc-300 flex items-center space-x-1">
            <Clock size={12} />
            <span>{formatDate(blog.createdAt || Date.now())}</span>
          </span>
          <span className="text-xs text-zinc-300 flex items-center space-x-1">
            <MousePointerClick size={12} />
            <span>{prettifyNumber(blog?.views ?? 0, true)} 次点击</span>
          </span>
          <span className="text-xs text-zinc-300 flex items-center space-x-1">
            <Hourglass size={12} />
            <span>
              需阅读
              <span className="mx-1">
                {getReadMinutes(blog?.content || '')}
              </span>
              分钟
            </span>
          </span>
        </div>
        <h3 className="mt-1 relative block font-semibold text-white text-lg sm:text-xl nc-card-title">
          <Link className="line-clamp-2 " href={href} title={blog.title}>
            {blog.title}
          </Link>
        </h3>
        <div className="hidden sm:block mt-3">
          <span className="text-neutral-200 text-sm line-clamp-2">
            <p>{blog.description}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
