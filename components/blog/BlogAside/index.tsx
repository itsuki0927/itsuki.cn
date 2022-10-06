import classNames from 'classnames';
import { Container } from '@/components/ui';
import { ArticleDetailResponse } from '@/entities/article';
import { useArticle } from '@/hooks/article';
import { ArticleHeading } from '@/hooks/article/useArticle';
import { useScrollTo } from '@/hooks';
import { ARTICLE_ACTIONS_ELEMENT_ID, getElementId } from '@/constants/anchor';
import { gtag } from '@/utils/gtag';
import { GAEventCategories } from '@/constants/gtag';

const getHeadingArchorIndent = (level: number) => `ml-${(level - 1) * 4}`;

const HeadingArchor = ({
  heading,
  onClick,
}: {
  heading: ArticleHeading;
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
  article: ArticleDetailResponse;
}

const BlogAside = ({ article }: BlogAsideProps) => {
  const articleId = article.id;
  const articlePath = article.path;
  const { data, isLoading, isFetching } = useArticle(articlePath);
  const { scrollTo } = useScrollTo();

  if (Number.isNaN(articleId) || !articlePath) return <div>Error</div>;
  if (isFetching || isLoading) return <BlogAsideSkeleton />;

  const handleScrollTo = (id: string) => {
    gtag.event('article_aside', {
      category: GAEventCategories.Article,
    });
    scrollTo(getElementId(id), id === ARTICLE_ACTIONS_ELEMENT_ID ? -200 : 0);
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
