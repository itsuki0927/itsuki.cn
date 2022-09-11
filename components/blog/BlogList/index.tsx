import { ArticleSkeletonList } from '@/components/article';
import BlogCard from '../BlogCard';
import { Empty } from '@/components/ui';
import { UseArticles } from '@/hooks/article/useArticles';

type ArticleListProps = UseArticles;

const BlogList = ({ data, ...rest }: ArticleListProps) => {
  if (rest.isFetching || rest.isLoading) {
    return <ArticleSkeletonList />;
  }

  if (data?.total === 0) {
    return <Empty />;
  }

  return (
    <div className='flex flex-wrap items-center gap-6 sm:gap-8 sm:space-y-0'>
      {data?.data.map((blog, i) => (
        <BlogCard blog={blog} key={blog.id} style={{ animationDelay: `${0.2 * i}s` }} />
      ))}
    </div>
  );
};
export default BlogList;
