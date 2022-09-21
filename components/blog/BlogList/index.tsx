import { ArticleSkeletonList } from '@/components/article';
import SearchSvg from '@/components/icons/SearchSvg';
import Status from '@/components/ui/Status';
import { UseArticles } from '@/hooks/article/useArticles';
import BlogCard from '../BlogCard';

type ArticleListProps = UseArticles;

const BlogList = ({ data, ...rest }: ArticleListProps) => {
  if (rest.isFetching || rest.isLoading) {
    return <ArticleSkeletonList />;
  }

  if (data?.total === 0) {
    return <Status title='空空如也' icon={<SearchSvg />} description='江郎才尽' />;
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
