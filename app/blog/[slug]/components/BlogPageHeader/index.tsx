import { getBlog, getBlogViews } from '@/actions/blog';
import SmallTag from '@/components/common/SmallTag';
import { formatDate } from '@/utils/formatDate';
import { Clock, MessageSquare, MousePointerClick, Type } from 'lucide-react';
import prettifyNumber from '@/utils/prettifyNumber';
import MyImage from '@/components/common/MyImage';

interface BlogPageHeaderProps {
  slug: string;
}

const getReadMinutes = (content: string) => {
  const minutes = Math.round(content.length / 600);
  return minutes < 1 ? 1 : minutes;
};

const BlogHeader = async ({ slug }: BlogPageHeaderProps) => {
  const blog = await getBlog(slug);
  const blogViews = await getBlogViews(slug);
  return (
    <>
      <div className="rounded-lg">
        <MyImage
          alt={blog?.title || slug}
          className="block rounded-lg w-full h-full object-cover"
          src={blog?.cover!}
          height={1280}
          width={1920}
        />
      </div>
      <header className="relative py-6 z-10 dark:bg-black">
        <div className="flex flex-wrap my-4 w-full items-center gap-2 sm:gap-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50">
          <span className="inline-flex items-center space-x-1.5">
            <Clock size={14} />
            <span>
              {formatDate(blog?.createdAt || Date.now(), 'YMDHm')} 发布
            </span>
          </span>

          <span
            className="inline-flex items-center space-x-1.5"
            title={blogViews?.toString()}
          >
            <MousePointerClick className="animate-bounce" size={14} />
            <span>{prettifyNumber(blogViews ?? 0, true)} 次点击</span>
          </span>

          <span
            className="inline-flex items-center space-x-1.5"
            title={blog?.comments?.toString()}
          >
            <MessageSquare size={14} />
            <span>{blog?.comments} 条评论</span>
          </span>

          <span className="inline-flex items-center space-x-1.5">
            <Type size={14} />
            <span>
              需阅读
              <span className="mx-1">
                {getReadMinutes(blog?.content || '')}
              </span>
              分钟
            </span>
          </span>
        </div>
        <h1 className="font-semibold text-2xl md:text-4xl md:!leading-[120%] dark:text-zinc-100 max-w-4xl ">
          {blog?.title}
        </h1>
        {blog?.tag && (
          <div className="flex flex-wrap space-x-2 -my-1">
            {blog?.tag?.map((tag) => <SmallTag key={tag.title} tag={tag} />)}
          </div>
        )}
      </header>
    </>
  );
};

export default BlogHeader;

// export default BlogPageHeader;
