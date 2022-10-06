import classNames from 'classnames';
import { Container } from '@/components/ui';
import { BlogDetailResponse } from '@/entities/blog';
import { useBlog } from '@/hooks/blog';
import { BlogHeading } from '@/hooks/blog/useBlog';
import { useScrollTo } from '@/hooks';
import { BLOG_ACTIONS_ELEMENT_ID, getElementId } from '@/constants/anchor';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

const getHeadingArchorIndent = (level: number) => `ml-${(level - 1) * 4}`;

const HeadingArchor = ({
  heading,
  onClick,
}: {
  heading: BlogHeading;
  onClick: () => void;
}) => (
  <li
    className={classNames(
      getHeadingArchorIndent(heading.level),
      'block cursor-pointer transition-colors line-clamp-1 hover:text-primary'
    )}
    onClick={onClick}
  >
    <span className='text-sm'>{heading.text}</span>
  </li>
);

const BlogAsideSkeleton = () => (
  <Container className='animate-pulse'>
    <div className='mx-auto mb-4 h-5 max-w-[40%] rounded-sm bg-skeleton' />
    <div className='space-y-2'>
      <div className='h-4 max-w-[80%] rounded-sm bg-skeleton' />
      <div className='ml-8 h-4 max-w-[50%] rounded-sm bg-skeleton' />
      <div className='h-4 max-w-[40%] rounded-sm bg-skeleton' />
      <div className='ml-8 h-4 max-w-[50%] rounded-sm bg-skeleton' />
      <div className='h-4 max-w-[40%] rounded-sm bg-skeleton' />
      <div className='h-4 max-w-[80%] rounded-sm bg-skeleton' />
    </div>
  </Container>
);

interface BlogAsideProps {
  blog: BlogDetailResponse;
}

const BlogAside = ({ blog }: BlogAsideProps) => {
  const blogId = blog.id;
  const blogPath = blog.path;
  const { data, isLoading, isFetching } = useBlog(blogPath);
  const { scrollTo } = useScrollTo();

  if (Number.isNaN(blogId) || !blogPath) return <div>Error</div>;
  if (isFetching || isLoading) return <BlogAsideSkeleton />;

  const handleScrollTo = (id: string) => {
    gtag.event('blog_aside', {
      category: GAEventCategories.Blog,
    });
    scrollTo(getElementId(id), id === BLOG_ACTIONS_ELEMENT_ID ? -200 : 0);
  };

  return (
    <div className='top-16 hidden p-6 text-gray-400 sm:sticky'>
      <p className='mb-4 font-medium text-primary'>目录</p>
      <ul className='max-h-[calc(100vh-148px)] space-y-1 overflow-y-scroll'>
        {data?.headings.map(heading => (
          <HeadingArchor
            onClick={() => handleScrollTo(heading.id)}
            heading={heading}
            key={heading.id}
          />
        ))}
      </ul>
    </div>
  );
};

export default BlogAside;
