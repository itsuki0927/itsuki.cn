import { getBlog } from '@/actions/blog';
import SmallTag from '@/components/common/SmallTag';
import { formatDate } from '@/utils/formatDate';
import {
  Clock,
  MessageSquare,
  MousePointerClick,
  Tag,
  Type,
} from 'lucide-react';
import prettifyNumber from '@/utils/prettifyNumber';
import MyImage from '@/components/common/MyImage';

interface BlogPageHeaderProps {
  slug: string;
}

const getReadMinutes = (content: string) => {
  const minutes = Math.round(content.length / 600);
  return Math.max(1, minutes);
};

const BlogHeader = async ({ slug }: BlogPageHeaderProps) => {
  const blog = await getBlog(slug);
  return (
    <>
      <div className="w-full h-64 relative">
        <MyImage
          alt={blog?.title || slug}
          className="block rounded-lg w-full h-full object-cover"
          fill
          src={blog?.cover!}
        />
      </div>
      <header className="relative py-6 z-10 dark:bg-black">
        <div className="flex flex-wrap w-full items-center gap-2 sm:gap-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50">
          <span className="inline-flex items-center space-x-1.5">
            <Clock size={14} />
            <span>
              {formatDate(blog?.createdAt || Date.now(), 'YMDHm')}发布
            </span>
          </span>

          <span
            className="inline-flex items-center space-x-1.5"
            title={blog?.views?.toString()}
          >
            <MousePointerClick className="animate-bounce" size={14} />
            <span>{prettifyNumber(blog?.views ?? 0, true)} 次点击</span>
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
        <div className="flex flex-wrap space-x-2 mt-4">
          {blog?.tag?.map((tag) => (
            <SmallTag
              key={tag.title}
              href={`/tag/${tag.slug}`}
              className="flex items-center"
            >
              <Tag size={12} className="mr-1" />
              {tag.title}
            </SmallTag>
          ))}
        </div>
        <h1 className="font-semibold text-2xl md:text-4xl md:!leading-[120%] dark:text-zinc-100 max-w-4xl mt-4">
          {blog?.title}
        </h1>
      </header>
    </>
  );
};

export default BlogHeader;
