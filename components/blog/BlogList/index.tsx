import SearchSvg from '@/components/icons/SearchSvg';
import Status from '@/components/ui/Status';
import { Blog } from '@/entities/blog';
import { SearchResponse } from '@/types/response';
import BlogCard from '../BlogCard';

type BlogListProps = {
  data: SearchResponse<Blog>;
};

const BlogList = ({ data }: BlogListProps) => {
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
