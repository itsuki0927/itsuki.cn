import { Clock, MousePointerClick } from 'lucide-react';
import prettifyNumber from '@/utils/prettifyNumber';
import { formatDate } from '@/utils/formatDate';

interface BlogPageHeaderProps {
  blogViews: number;
  publishedAt?: Date;
  createdAt?: Date;
}

const BlogPageHeaderUI = ({
  blogViews,
  publishedAt,
  createdAt,
}: BlogPageHeaderProps) => {
  return (
    <div className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50">
      <span
        className="inline-flex items-center space-x-1.5"
        title={blogViews?.toString()}
      >
        <MousePointerClick className="animate-bounce" size={14} />
        <span>{prettifyNumber(blogViews ?? 0, true)} 次点击</span>
      </span>

      <span className="inline-flex items-center space-x-1.5">
        <Clock size={14} />
        <span>
          {formatDate(publishedAt || createdAt || Date.now(), 'YMDHm')}
        </span>
      </span>
    </div>
  );
};

export default BlogPageHeaderUI;
